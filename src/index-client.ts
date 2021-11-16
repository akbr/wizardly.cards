import { init } from "./init";

window.location.hash = "#";

let { store, server, actions } = init();

//@ts-ignore
window.server = server;

if (typeof server !== "string" && server.format) {
  server.format(
    '{"TXNU":{"id":"TXNU","state":{"type":"bid","turn":1,"dealer":0,"activePlayer":0,"hands":[["10|s"],["11|s"],["6|d"],["2|h"],["9|s"],["12|h"]],"trumpCard":"3|c","trumpSuit":"c","trick":[],"trickLeader":1,"trickWinner":null,"bids":[null,0,0,0,0,0],"actuals":[0,0,0,0,0,0],"scores":[],"options":{"canadian":false},"numPlayers":6},"seats":[false,false,false,false,false,false],"spectators":[]}}'
  );
}

actions.join("TXNU");
actions.addBot();
actions.addBot();
actions.addBot();
actions.addBot();
actions.addBot();

/**


**/
