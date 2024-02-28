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
  res.end(message);
}

/**
 * HTTP proxy handler
 */
export default function proxyHttp(req: IncomingMessage, res: ServerResponse) {
  const target = getTargetFromHeaders(req);
  if (!target) {
    console.error(`Missing '${TARGET_HEADER}' header!`);
    return sendError(res, `Missing '${TARGET_HEADER}' header`);
  }

  console.log(`Proxying HTTP to ${req.method} ${target}${req.url}`);
  proxy.web(req, res, { target });
}
