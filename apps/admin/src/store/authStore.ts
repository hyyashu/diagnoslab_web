import { create } from "zustand";
import axios from "axios";
import api from "../lib/api";

/* The logged-in person, as returned by POST /auth/login. */
export type AuthUser = { id: number; name: string; email: string; role: string };

const TOKEN_KEY = "token"; // lib/api.ts reads this for every request
const USER_KEY = "user";

function readUser(): AuthUser | null {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) ?? "null");
  } catch {
    return null;
  }
}

interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!localStorage.getItem(TOKEN_KEY),
  user: readUser(),
  login: async (email, password) => {
    try {
      const res = await api.post<{ data: { access_token: string; user: AuthUser } }>("/auth/login", {
        email: email.trim(),
        password,
      });
      const { access_token, user } = res.data.data;
      localStorage.setItem(TOKEN_KEY, access_token);
      localStorage.setItem(USER_KEY, JSON.stringify(user ?? null));
      set({ isAuthenticated: true, user: user ?? null });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        throw new Error("Wrong email or password.");
      }
      throw new Error("Login failed. Check your connection and try again.");
    }
  },
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    set({ isAuthenticated: false, user: null });
  },
}));

/* An expired or rejected token sends the user back to the login page,
   except on the login call itself. */
api.interceptors.response.use(undefined, (error) => {
  const url: string = error?.config?.url ?? "";
  if (error?.response?.status === 401 && !url.includes("/auth/login")) {
    useAuthStore.getState().logout();
  }
  return Promise.reject(error);
});
