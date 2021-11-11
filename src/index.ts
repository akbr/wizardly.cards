import "./styles.css";
import { init } from "./init";
let { store, server, actions } = init();

/**


import W from "./WIP";
W;



window.location.hash = "#";


//@ts-ignore
window.server = server;
if (typeof server !== "string" && server.format) {
  server.format(
    '{"MNIS":{"id":"MNIS","state":{"type":"play","turn":4,"dealer":3,"activePlayer":0,"hands":[["10|c","6|h","12|h","7|s"],["14|c","5|d","7|d","2|h"],["2|j","3|j","8|s","9|s"],["8|c","9|c","9|d","10|d"]],"trumpCard":"6|s","trumpSuit":"s","trick":[],"trickLeader":0,"trickWinner":null,"bids":[0,0,0,0],"actuals":[0,0,0,0],"scores":[[0,0,0,0],[0,0,1,0],[0,0,0,0],[0,1,1,0],[0,0,0,0],[0,0,3,0]],"options":{"canadian":false},"numPlayers":4},"seats":[false,false,false,false],"spectators":[]}}'
  );
}

actions.join("MNIS");
actions.addBot();
actions.addBot();
actions.addBot();



 */
