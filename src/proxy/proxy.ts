import http from "node:http";
import httpProxy from "http-proxy";
import { TARGET_HEADER } from "../constants";

/**
 * Create proxy server with options:
 *  - secure -> false,
 *  - xfwd -> false (not adding x-forward headers),
 *  - changeOrigin -> true (changes the origin of the host header to the target URL)
 */
export const proxy = httpProxy.createProxyServer({
  secure: false,
  xfwd: false,
  changeOrigin: true,
});

// Handles errors on proxy
proxy.on("error", (error, req, res) => {
  console.error(`Proxy error: ${error.message}`);

  // Checks if the response instance is valid (it is an instance of http.ServerResponse) and headers are not sent yet
  if (res instanceof http.ServerResponse && !res.headersSent) {
    res.writeHead(502, { "Content-Type": "text/plain" });
  }
  res.end("Error encountered while proxying request.");
});

// Event handler to modify the proxy connection before data is sent
// Removes the target_header from the request being sent to the server
proxy.on("proxyReq", (proxyReq, req, res, options) => {
  proxyReq.removeHeader(TARGET_HEADER);
});
