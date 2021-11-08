import * as express from "express";
import * as path from "path";

import { mountRoomServer } from "./lib/socket/expressMount";
import { createServer } from "./lib/server";
import { engine } from "./wizard";

const PORT = process.env.PORT || 5000;
const distPath = path.resolve("dist/");

mountRoomServer(
  //@ts-ignore
  express()
    .use(express.static(distPath))
    //@ts-ignore
    .get("/", function (_, res) {
      res.sendFile("index.html", { root: distPath });
    })
    .listen(PORT, function () {
      return console.log("Listening on " + PORT);
    })
)(createServer(engine));
