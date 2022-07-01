import React from "react";
import path from "path";
import { RequestHandler, Request, Response, NextFunction } from "express";
import { ChunkExtractor } from "@loadable/server";
import serialize from "serialize-javascript";
import { renderToString } from "react-dom/server";

/* Please Note: These path files need to be remade during production for the docker container*/

// The stats file maintains mapping of all the components by chunk name and its dependencies.

const nodeStatsFile = path.resolve("build/node-loadable-stats.json");

const webStatsFile = path.resolve("build/web-loadable-stats.json");

export const renderer: RequestHandler = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  // The chunk extractor creates an instance related to the statsfile argument
  const webExtractor = new ChunkExtractor({
    statsFile: webStatsFile,
    publicPath: "/static/",
  });
  // This is needed for the ssr component
  const nodeExtractor = new ChunkExtractor({
    statsFile: nodeStatsFile,
  });

  const { default: App } = nodeExtractor.requireEntrypoint();

  const jsx = webExtractor.collectChunks(<App />);

  const html = renderToString(jsx);
  let templateString = ` 
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <title>Daazzll</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Poppins:wght@400;900&display=swap" rel="stylesheet">
    ${webExtractor.getLinkTags()}
    ${webExtractor.getStyleTags()}
    <script src="https://kit.fontawesome.com/5a51695694.js" crossorigin="anonymous"></script>
  </head>
  <body>
  <script>;window.app=${serialize({ data: "hello" })}</script>
    <div id="root">${html}</div>
    <div id="modal-root" class="display--none"></div>
    ${webExtractor.getScriptTags()}
  </body>
</html>`;
  res.set("content-type", "text/html");

  templateString = templateString.replace(/(?<=>|^)\s+(?=<|$)/g, "");

  return res.status(200).send(templateString);
};
