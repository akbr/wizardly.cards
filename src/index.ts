import "./styles.css";

import { init } from "./init";
let { store, server, actions } = init();

/**
 * 
window.location.hash = "#";

//@ts-ignore
window.server = server;

if (typeof server !== "string" && server.format) {
  server.format(
    '{"HJFA":{"id":"HJFA","state":{"type":"play","turn":1,"dealer":0,"activePlayer":0,"hands":[["11|c"],[],[],[],[],[]],"trumpCard":"5|c","trumpSuit":"c","trick":["4|j","4|s","3|j","2|w","9|c"],"trickLeader":1,"trickWinner":null,"bids":[1,0,0,0,0,0],"actuals":[0,0,0,0,0,0],"scores":[],"options":{"canadian":false},"numPlayers":6},"seats":[false,false,false,false,false,false],"spectators":[]}}'
  );
}
actions.join("HJFA");
actions.addBot();
actions.addBot();
actions.addBot();
actions.addBot();
actions.addBot();
 * 
import W from "./WIP";
W;

/**
More durable dialog
Exit doesn't reboot socket
Socket state/repair?
 */
