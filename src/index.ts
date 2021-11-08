import "./styles.css";

import { init } from "./init";

window.location.hash = "#";

let { store, server, actions } = init();

//@ts-ignore
window.server = server;
if (typeof server !== "string" && server.format) {
  server.format(
    '{"TEST":{"id":"TEST","state":{"type":"play","turn":1,"dealer":0,"activePlayer":0,"hands":[["11|s"],[],[],[],[],[]],"trumpCard":"8|h","trumpSuit":"h","trick":["4|d","5|h","3|h","12|h","9|s"],"trickLeader":1,"trickWinner":null,"bids":[0,0,0,0,0,0],"actuals":[0,0,0,0,0,0],"scores":[],"options":{"canadian":false},"numPlayers":6},"seats":[false,false,false,false,false,false],"spectators":[]}}'
  );
}

actions.join("TEST");
actions.addBot();
actions.addBot();
actions.addBot();
actions.addBot();
actions.addBot();

/**
import W from "./WIP";
W;


 */
