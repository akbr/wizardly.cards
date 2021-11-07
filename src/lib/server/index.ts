import type { Server, Socket } from "../socket/types";
import type {
  Engine,
  EngineTypesShape,
  InputsWith,
  OutputsWith,
} from "./types";

import { getRandomRoomID } from "./utils";

export type ServerApi<ET extends EngineTypesShape> = Server<
  InputsWith<ET>,
  OutputsWith<ET>
>;

type InternalSocket<ET extends EngineTypesShape> = Socket<
  OutputsWith<ET>,
  InputsWith<ET>
>;

type InternalRoom<ET extends EngineTypesShape> = {
  id: string;
  seats: (InternalSocket<ET> | false)[];
  spectators: InternalSocket<ET>[];
  state: ET["states"] | false;
};

export function createServer<ET extends EngineTypesShape>(engine: Engine<ET>) {
  type ServerSocket = InternalSocket<ET>;
  type Room = InternalRoom<ET>;

  // State
  // --------------
  let serverApi: ServerApi<ET>;
  const rooms = new Map<string, Room>();
  const sockets = new Map<ServerSocket, string | false>();
  const botSockets = new Set<ServerSocket>();

  // Logic
  // --------------
  const {
    shouldAddSeat = () => true,
    shouldRemoveSeat = () => false,
    shouldStart = () => true,
    autoStart = false,
    getInitialState,
    reducer,
    isState = (x) => true,
    adapt = (x) => x,
  } = engine;

  function createRoom(id: string) {
    rooms.set(id, {
      id,
      seats: [],
      spectators: [],
      state: autoStart ? getInitialState(0) : false,
    });
    return rooms.get(id) as Room;
  }

  function getRoom(socket: ServerSocket) {
    let id = sockets.get(socket);
    return id ? rooms.get(id) : false;
  }

  function broadcastRoomUpdate(room: Room) {
    let { id } = room;
    let seats = room.seats.map((_, idx) => String(idx));
    let spectators = room.spectators.length;

    [...room.seats, ...room.spectators].forEach((socket) => {
      if (!socket) return;
      socket.send([
        "server",
        {
          type: "room",
          data: {
            id,
            seats,
            spectators,
            seatIndex: room.seats.indexOf(socket),
            started: room.state ? true : false,
          },
        },
      ]);
    });
  }

  function createBot(id: string, options?: EngineTypesShape["botOptions"]) {
    if (!engine.createBot) return;

    let serverSocket: ServerSocket;

    let botSocket: Socket<InputsWith<ET>, OutputsWith<ET>> = {
      send: (action) => {
        serverApi.onInput(serverSocket, action);
      },
      close: () => serverApi.onClose(serverSocket),
    };

    let botFn = engine.createBot(
      {
        send: (action) => botSocket.send(["engine", action]),
        close: botSocket.close,
      },
      undefined
    );

    serverSocket = {
      send: ([type, data]) => {
        if (type !== "engine") {
          if (type === "engineMsg")
            console.warn("Bot reiceived engine error", data);
          return;
        }
        let room = getRoom(serverSocket);
        let playerIndex = room ? room.seats.indexOf(serverSocket) : undefined;
        botFn(data, playerIndex);
      },
      close: () => serverApi.onClose(serverSocket),
    };

    botSockets.add(serverSocket);

    serverApi.onInput(serverSocket, [
      "server",
      {
        type: "join",
        data: { id },
      },
    ]);
  }

  function joinRoom(
    socket: ServerSocket,
    id?: string,
    requestedPlayerIndex?: number
  ): string | void {
    let room: Room;

    if (id !== undefined) {
      id = id.toUpperCase();
      if (id.length !== 4) return `Invalid room code format.`;
      room = rooms.get(id) || createRoom(id);
    } else {
      let id = getRandomRoomID();
      while (rooms.get(id)) id = getRandomRoomID();
      room = createRoom(id);
    }

    let numSeats = room.seats.length;

    const addSocket = () => {
      sockets.set(socket, room.id);
      broadcastRoomUpdate(room);
      if (room.state) {
        socket.send([
          "engine",
          adapt(room.state, room.seats.indexOf(socket), room.seats.length),
        ]);
      }
    };

    if (requestedPlayerIndex === undefined) {
      let openSeats = room.seats.indexOf(false) > -1;
      let roomForNewSeats = shouldAddSeat(numSeats, room.state !== false);

      if (!openSeats && !roomForNewSeats) {
        room.spectators.push(socket);
        return addSocket();
      }

      let firstOpenSeat = room.seats.indexOf(false);
      if (firstOpenSeat > -1) {
        room.seats[firstOpenSeat] = socket;
      } else {
        room.seats.push(socket);
      }
    } else {
      if (requestedPlayerIndex > numSeats) {
        return `Can't skip seats. Next seat is ${numSeats}`;
      }

      let seatOpen =
        room.seats.length === 0 || room.seats[requestedPlayerIndex] === false;

      if (!seatOpen) {
        return `Seat ${requestedPlayerIndex} is occupied`;
      }
      room.seats[requestedPlayerIndex] = socket;
    }
    return addSocket();
  }

  function leaveRoom(socket: ServerSocket) {
    let room = getRoom(socket);
    if (!room) return;

    let seatIndex = room.seats.indexOf(socket);
    if (seatIndex !== -1) {
      room.seats[seatIndex] = false;
    }

    room.spectators = room.spectators.filter((x) => x !== socket);

    let roomIsEmpty =
      room.seats.filter((socket) => socket && !botSockets.has(socket))
        .length === 0;
    if (roomIsEmpty) {
      let socketsToEject = [socket, ...room.spectators];
      socketsToEject.forEach((socket) => {
        sockets.delete(socket);
        botSockets.delete(socket);
        socket.send(["server", { type: "room", data: null }]);
      });
      rooms.delete(room.id);
    } else {
      if (shouldRemoveSeat(room.seats.length, room.state !== false)) {
        room.seats = room.seats.filter((x) => x);
      }

      broadcastRoomUpdate(room);
    }
  }

  function broadcastState(room: Room) {
    room.seats.forEach((socket, seatIndex) => {
      if (socket && room.state)
        socket.send([
          "engine",
          adapt(room.state, seatIndex, room.seats.length),
        ]);
    });
  }

  function updateThroughReducer(
    room: Room,
    socket: ServerSocket,
    action: ET["actions"]
  ): void {
    if (!room.state) {
      if (socket) {
        socket.send([
          "serverMsg",
          { type: "error", data: "Game hasn't yet started." },
        ]);
      }
      return;
    }

    let nextState = reducer(
      room.state,
      { numSeats: room.seats.length },
      { action, seatIndex: room.seats.indexOf(socket) }
    );

    if (nextState === room.state) return;

    if (!isState(nextState)) {
      socket.send(["engineMsg", nextState]);
      return;
    }

    room.state = nextState;
    broadcastState(room);
  }

  function recurseThroughReducer(room: Room): void {
    if (!room.state) return;
    const nextState = reducer(room.state, { numSeats: room.seats.length });
    if (nextState === room.state) return;
    room.state = nextState;
    broadcastState(room);
    return recurseThroughReducer(room);
  }

  // API implemenation
  // -----------------
  const onInput: ServerApi<ET>["onInput"] = (socket, envelope) => {
    if (envelope[0] === "server") {
      let action = envelope[1];
      if (action.type === "join") {
        leaveRoom(socket);
        let { id, seatIndex } = action.data || {};
        let err = joinRoom(socket, id, seatIndex);
        if (err) {
          socket.send(["serverMsg", { type: "error", data: err }]);
        }
        return;
      }
    }

    let room = getRoom(socket);
    if (!room) {
      socket.send([
        "serverMsg",
        { type: "error", data: "You are not in a room." },
      ]);
      return;
    }

    if (envelope[0] === "server") {
      let action = envelope[1];

      if (action.type === "addBot") {
        if (!engine.createBot) {
          socket.send([
            "serverMsg",
            { type: "error", data: "No bot creator specified." },
          ]);
        }
        createBot(room.id, action.data);
        return;
      }

      if (action.type === "start") {
        let isPlayer0 = room.seats.indexOf(socket) === 0;
        if (!isPlayer0) {
          socket.send([
            "serverMsg",
            { type: "error", data: "You aren't the room creator." },
          ]);
        }

        if (!shouldStart(room.seats.length)) {
          socket.send([
            "serverMsg",
            {
              type: "error",
              data: "Wrong number of players.",
            },
          ]);
          return;
        }

        room.state = getInitialState(room.seats.length, action.data);

        broadcastState(room);
        recurseThroughReducer(room);
        return;
      }

      socket.send([
        "serverMsg",
        { type: "error", data: "Invalid server command." },
      ]);
    }

    // Engine ET["actions"]
    if (envelope[0] === "engine") {
      updateThroughReducer(room, socket, envelope[1]);
      recurseThroughReducer(room);
    }
  };

  serverApi = {
    onOpen: (socket) => {
      socket.send(["server", { type: "room", data: null }]);
    },
    onClose: (socket) => {
      leaveRoom(socket);
    },
    onInput,
    // ---
    dump: () => {
      let roomObj: any = {};
      rooms.forEach(({ id, state, seats }) => {
        roomObj[id] = {
          id,
          state,
          seats: seats.map(() => false),
          spectators: [],
        };
      });
      return JSON.stringify(roomObj);
    },
    format: (json: string) => {
      let roomObj = JSON.parse(json);
      Object.values(roomObj).forEach((room) => {
        //@ts-ignore
        rooms.set(room.id, room);
      });
    },
  };

  return serverApi;
}
