import { IncomingHttpHeaders } from "node:http";
import { TARGET_HEADER } from "./constants";

/**
 * Extracts the target URL from the request headers.
 */
export function extractTargetUrl(headers: IncomingHttpHeaders): URL {
  const { [TARGET_HEADER]: target } = headers;

  if (!target) {
    throw new Error("Target URL is missing in the request headers.");
  }

  try {
    const targetUrl = new URL(target as string);
    return targetUrl;
  } catch (error) {
    throw new Error(`Invalid target URL: ${target}`);
  }
}
