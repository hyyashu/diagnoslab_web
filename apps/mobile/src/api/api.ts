import axios from "axios";

export const api = axios.create({
  /* Set EXPO_PUBLIC_API_URL to point at a local API; the live API by default. */
  baseURL: process.env.EXPO_PUBLIC_API_URL || "https://api.diagnoslab.in",
  headers: {
    "Content-Type": "application/json",
  },
});
