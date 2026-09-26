import { LeadFormSubmitData } from "@/components/forms/leadForm";

const BASE_URL = "http://diangos-api-jg2j3d-244a7b-91-108-111-112.traefik.me/";
// const BASE_URL = "http://localhost:3000";

/* Thrown for any non-2xx response, as axios did, so callers' catch blocks
   still fire. `data` is the parsed error body when the API sends one. */
export class ApiError extends Error {
  constructor(
    public status: number,
    public data: unknown,
  ) {
    super(`Request failed with status ${status}`);
    this.name = "ApiError";
  }
}

type RequestOptions = Omit<RequestInit, "body" | "method"> & {
  query?: Record<string, string | number | boolean | undefined>;
};

function buildUrl(path: string, query?: RequestOptions["query"]) {
  const url = new URL(path.replace(/^\//, ""), BASE_URL);
  for (const [key, value] of Object.entries(query ?? {})) {
    if (value !== undefined) url.searchParams.set(key, String(value));
  }
  return url;
}

async function parseBody(response: Response) {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

/* Thin fetch wrapper: JSON in, JSON out, relative paths against BASE_URL.
   Returns the response body directly (axios callers read `response.data`). */
export async function request<T = unknown>(
  method: string,
  path: string,
  body?: unknown,
  { query, headers, ...init }: RequestOptions = {},
): Promise<T> {
  const response = await fetch(buildUrl(path, query), {
    ...init,
    method,
    headers: {
      Accept: "application/json",
      ...(body !== undefined && { "Content-Type": "application/json" }),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const data = await parseBody(response);
  if (!response.ok) throw new ApiError(response.status, data);
  return data as T;
}

export const api = {
  get: <T = unknown>(path: string, options?: RequestOptions) =>
    request<T>("GET", path, undefined, options),
  post: <T = unknown>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>("POST", path, body, options),
  put: <T = unknown>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>("PUT", path, body, options),
  patch: <T = unknown>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>("PATCH", path, body, options),
  delete: <T = unknown>(path: string, options?: RequestOptions) =>
    request<T>("DELETE", path, undefined, options),
};

export const submitLeadForm = (data: LeadFormSubmitData) =>
  api.post("/leads", data);
