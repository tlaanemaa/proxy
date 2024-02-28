import url from "node:url";
import type { IncomingMessage } from "node:http";
import type { Duplex } from "node:stream";
import { TARGET_QUERY_PARAM } from "../constants";
import { proxy } from "./proxy";

/**
 * Extracts the target from http incoming request query
 */
function getTargetFromQuery(req: IncomingMessage): string | undefined {
  const { query } = url.parse(req.url ?? "", true);
  const target = query[TARGET_QUERY_PARAM];
  if (!target) return undefined;
  return Array.isArray(target) ? target[0] : target;
}

/**
 * WS proxy handler
 */
export default function proxyWs(
  req: IncomingMessage,
  socket: Duplex,
  head: Buffer
) {
  const target = getTargetFromQuery(req);
  if (!target) {
    console.error(`[WS] Missing '${TARGET_QUERY_PARAM}' query parameter!`);
    return socket.end();
  }

  console.log(`[WS] Proxying ${req.socket.remoteAddress} -> ${target}`);
  proxy.ws(req, socket, head, { target });
}
