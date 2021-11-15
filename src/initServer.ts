import { h } from "preact";
import { startServer } from "lib/socket-server/startServer";
import { engine } from "./engine";

startServer(engine);
console.log(h);
