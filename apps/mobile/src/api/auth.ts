import axios from "axios";
import { api } from "./api";

/* The logged-in person, as returned by POST /auth/login. `role` is the
   API's role: "superadmin" or "user". */
export type AuthUser = { id: number; name: string; email: string; role: string };

type LoginResponse = { data: { access_token: string; user: AuthUser }; message?: string };

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post<LoginResponse>("/auth/login", { email, password });
    const { access_token, user } = response.data.data;
    return { token: access_token, user };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) throw new Error("Wrong email or password.");
      if (!error.response) throw new Error("Can't reach the server. Check your internet connection.");
    }
    throw new Error("Login failed. Please try again.");
  }
};
