import type { IncomingMessage, ServerResponse } from "node:http";
import { TARGET_HEADER } from "../constants";
import { proxy } from "./proxy";

/**
 * Extracts the target from http incoming request headers
 */
function getTargetFromHeaders(req: IncomingMessage): string | undefined {
  const target = req.headers[TARGET_HEADER];
  if (!target) return undefined;
  return Array.isArray(target) ? target[0] : target;
}

/**
 * Sends error message with provided http status code
 */
function sendError(res: ServerResponse, message: string, code = 400): void {
  res.writeHead(code, { "Content-Type": "text/plain" });
  res.end(JSON.stringify({ error: message }));
}

/**
 * Sets CORS headers on the response
 */
function setCorsHeaders(res: ServerResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
}

/**
 * HTTP proxy handler
 */
export default function proxyHttp(req: IncomingMessage, res: ServerResponse) {
  setCorsHeaders(res);
  const target = getTargetFromHeaders(req);

  if (!target) {
    console.error(`[HTTP] Missing '${TARGET_HEADER}' header!`);
    return sendError(res, `Missing '${TARGET_HEADER}' header!`);
  }

  // Respond to preflight OPTIONS request
  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  console.log(
    `[HTTP] Proxying ${req.socket.remoteAddress} -> ${req.method} ${target}${req.url}`
  );
  proxy.web(req, res, { target });
}
