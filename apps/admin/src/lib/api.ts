import { createApiClient } from "@diagno/api-client";

const api = createApiClient({
  /* Set VITE_API_URL in .env to point at a local API; the live API by default. */
  baseURL: import.meta.env.VITE_API_URL || "https://api.diagnoslab.in",
  getAuthToken: () => localStorage.getItem("token"),
});

export default api;
