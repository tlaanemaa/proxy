import http from "node:http";
import proxy from "./httpProxy.mjs";

const PORT = 3000;

const server = http.createServer((request, response) => {
  try {
    proxy(request, response);
  } catch (e) {
    response.writeHead(500, { "Content-Type": "text/plain" });
    response.end("Something went wrong!");
    console.error(e.message);
  }
});

server.listen(PORT, undefined, undefined, () =>
  console.log(`Proxy listening @ http://localhost:${PORT}`)
);
