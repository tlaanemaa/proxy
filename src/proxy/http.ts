import type { IncomingMessage, ServerResponse } from "node:http";
import http from "node:http";
import https from "node:https";
import { STATIC_HEADERS, TARGET_HEADER } from "../constants";
import { extractTargetUrl } from "../utils";

/**
 * Proxies a request to the target host.
 */
export default function proxy(
  request: IncomingMessage,
  response: ServerResponse
): void {
  const target = extractTargetUrl(request.headers);
  const client = target.protocol === "http" ? http : https;

  // Remove the target header from the request.
  const { [TARGET_HEADER]: _, ...originalHeaders } = request.headers;

  const options = {
    host: target.host,
    path: request.url,
    method: request.method,
    headers: {
      ...originalHeaders,
      host: target.host,
      ...STATIC_HEADERS,
    },
  };

  console.log(`Proxying: ${options.method} ${options.host}${options.path}`);
  request.pipe(client.request(options, (res) => res.pipe(response)));
}
