import http from "node:http";
import { PORT } from "./constants";
import proxyHttp from "./proxy/http";
import proxyWs from "./proxy/ws";

// Create server and attach HTTP and WS proxy handlers
const proxyServer = http.createServer(proxyHttp);
proxyServer.on("upgrade", proxyWs);

// Start listening to incoming requests
proxyServer.listen(PORT, () => {
  console.log(`Proxy server listening at http://localhost:${PORT}`);
});
