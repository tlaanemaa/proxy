# Proxy

_A customizable HTTP and WebSocket proxy server written in TypeScript._

## Running

Run the container

```sh
docker run -p 3000:3000 --name proxy ghcr.io/tlaanemaa/proxy:latest
```

### Configuration

You can configure the proxy server through the following environment variables:

- `TARGET_HEADER_NAME`: The name of the header containing the target host. Defaults to `x-target-host`.
- `TARGET_QUERY_PARAM`: The name of the query parameter containing the target host. Defaults to `target`.
- `PORT`: The port the server listens on. Defaults to `3000`.

## Usage

To use the proxy, simply send requests to it like you would to the target, and pass the target host as either `x-target-host` header when sending HTTP requests, or `target` query param when initiating websocket connections.

### Example HTTP proxy request, using JS fetch API:

_This is assuming that the proxy server is running at `http://localhost:3000`_

```js
fetch("http://localhost:3000/todos/1", {
  method: "GET",
  headers: {
    "x-target-host": "https://jsonplaceholder.typicode.com",
  },
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

### Example Websocket connection, using JS

_This is assuming that the proxy server is running at `http://localhost:3000`_

```js
const socket = new WebSocket(
  "ws://localhost:3000?target=ws://echo.websocket.org"
);
```
