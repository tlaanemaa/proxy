import http from "node:http";
import https from "node:https";
import { staticHeaders } from "./headers.mjs";

const TARGET_HEADER = "x-target";

/**
 * Creates a proxy server that forwards incoming requests to a target host.
 *
 * @param {http.IncomingMessage} request - The incoming request object.
 * @param {http.ServerResponse} response - The server response object.
 * @returns {void}
 */
export default function proxy(request, response) {
  const { [TARGET_HEADER]: target, ...originalHeaders } = request.headers;

  const targetUrl = new URL(target);
  const proxy = targetUrl.protocol === "http" ? http : https;

  const options = {
    host: targetUrl.host,
    path: request.url,
    method: request.method,
    headers: {
      ...originalHeaders,
      host: targetUrl.host,
      ...staticHeaders,
    },
  };

  console.log(`Proxying: ${options.method} ${options.host}${options.path}`);
  request.pipe(proxy.request(options, (res) => res.pipe(response)));
}
