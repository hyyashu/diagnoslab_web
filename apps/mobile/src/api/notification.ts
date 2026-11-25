import { api } from "./api";

export const registerPushToken = (token: string) =>
  api.post("/notifications/register-token", { token });
