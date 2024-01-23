export const TARGET_HEADER = "x-target";
export const PORT = 3000;

export const STATIC_HEADERS = {
  connection: "keep-alive",
  "cache-control": "max-age=0",
  "sec-ch-ua":
    '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-full-version": '"120.0.6099.225"',
  "sec-ch-ua-arch": '"x86"',
  "sec-ch-ua-platform": '"Windows"',
  "sec-ch-ua-platform-version": '"10.0.0"',
  "sec-ch-ua-model": '""',
  "sec-ch-ua-bitness": '"64"',
  "sec-ch-ua-wow64": "?0",
  "sec-ch-ua-full-version-list":
    '"Not_A Brand";v="8.0.0.0", "Chromium";v="120.0.6099.225", "Google Chrome";v="120.0.6099.225"',
  dnt: "1",
  "upgrade-insecure-requests": "1",
  "user-agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
  "sec-fetch-site": "same-origin",
  "sec-fetch-mode": "navigate",
  "sec-fetch-user": "?1",
  "sec-fetch-dest": "document",
  "accept-language": "en,et;q=0.9",
} as const;
