import http from "node:http";
import httpProxy from "./proxy/http";
import socketProxy from "./proxy/socket";
import { PORT } from "./constants";

const server = http.createServer((request, response) => {
  try {
    httpProxy(request, response);
  } catch (e) {
    response.writeHead(500, { "Content-Type": "text/plain" });
    response.end("Something went wrong!");
    console.error(e instanceof Error ? e.message : String(e));
  }
});

socketProxy(server);

server.listen(PORT, undefined, undefined, () =>
  console.log(`Proxy listening @ http://localhost:${PORT}`)
);
