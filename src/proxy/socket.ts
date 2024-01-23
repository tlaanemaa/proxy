import type { Server } from "node:http";
import WebSocket, { WebSocketServer, createWebSocketStream } from "ws";
import { extractTargetUrl } from "../utils";

/**
 * Creates a websocket proxy server that forwards incoming requests to a target host.
 */
export default function proxy(server: Server): void {
  const wss = new WebSocketServer({ noServer: true });

  wss.on("connection", function connection(ws, request) {
    const sourceStream = createWebSocketStream(ws);
    const target = extractTargetUrl(request.headers);

    const targetSocket = new WebSocket(target);
    const targetStream = createWebSocketStream(targetSocket);
    targetStream.on("error", (...args) =>
      console.error("Error in socket!", ...args)
    );

    targetStream.pipe(sourceStream);
    sourceStream.pipe(targetStream);
  });

  server.on("upgrade", function upgrade(request, socket, head) {
    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit("connection", ws, request);
    });
  });
}
