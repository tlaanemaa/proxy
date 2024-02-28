/**
 * Default target header to be sent to the server.
 * This can be customized from environment variables.
 */
export const TARGET_HEADER: string =
  process.env.TARGET_HEADER_NAME ?? "x-target-host";

/**
 * Default target query param to be sent to the server.
 * This can be customized from environment variables.
 */
export const TARGET_QUERY_PARAM: string =
  process.env.TARGET_QUERY_PARAM ?? "target";

/**
 * Default server port
 * This can be customized from environment variables
 */
export const PORT: number = parseInt(process.env.PORT!) || 3000;
