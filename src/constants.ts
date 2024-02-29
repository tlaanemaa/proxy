/**
 * Target header to be sent to the server.
 * This is used for targeting HTTP requests can be customized from environment variables.
 */
export const TARGET_HEADER: string =
  process.env.TARGET_HEADER_NAME || "x-target";

/**
 * Target query param to be sent to the server.
 * This is used for targeting WebSocket connections and can be customized from environment variables.
 */
export const TARGET_QUERY_PARAM: string =
  process.env.TARGET_QUERY_PARAM || "target";

/**
 * Server port
 * This can be customized from environment variables
 */
export const PORT: number = parseInt(process.env.PORT!) || 3000;
