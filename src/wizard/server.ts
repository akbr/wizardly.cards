import * as express from "express";
import * as path from "path";

import { mountRoomServer } from "../lib/socket/expressMount";
import { createServer } from "../lib/server";
import { engine } from "./engine";

const PORT = process.env.PORT || 5000;
const distPath = path.resolve("dist/");

//@ts-ignore
function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (
    !req.secure &&
    req.get("x-forwarded-proto") !== "https" &&
    process.env.NODE_ENV !== "development"
  ) {
    return res.redirect("https://" + req.get("host") + req.url);
  }
  next();
}

mountRoomServer(
  //@ts-ignore
  express()
    .use(express.static(distPath))
    .use(requireHTTPS)
    //@ts-ignore
    .get("/", function (_, res) {
      res.sendFile("index.html", { root: distPath });
    })
    .listen(PORT, function () {
      return console.log("Listening on " + PORT);
    })
)(createServer(engine));
