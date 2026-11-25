import type { AxiosInstance } from "axios";

export const createAuthClient = (client: AxiosInstance) => ({
  login: async (email: string, password: string) =>
    (await client.post("/auth/login", { email, password })).data,
  refresh: async (refreshToken: string) =>
    (await client.post("/auth/refresh", { refreshToken })).data,
});
