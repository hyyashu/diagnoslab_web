import { create } from "zustand";
import axios from "axios";
import type { Permission } from "@diagno/schemas";
import api from "../lib/api";

/* The signed-in person and what they may do, as POST /auth/login and
   GET /auth/me return it. Permissions only shape the screens; the API
   checks every request itself. */
export type AuthUser = { id: number; name: string; email: string; role: string; roleLabel?: string };
type Me = { user: AuthUser; permissions: Permission[] };

const TOKEN_KEY = "token"; // lib/api.ts reads this for every request
const USER_KEY = "user";
const PERMS_KEY = "permissions";

function read<T>(key: string, fallback: T): T {
  try {
    return JSON.parse(localStorage.getItem(key) ?? "null") ?? fallback;
  } catch {
    return fallback;
  }
}

interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  permissions: Permission[];
  login: (email: string, password: string) => Promise<void>;
  refresh: () => Promise<void>;
  logout: () => void;
}

function save(me: Me) {
  localStorage.setItem(USER_KEY, JSON.stringify(me.user));
  localStorage.setItem(PERMS_KEY, JSON.stringify(me.permissions));
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!localStorage.getItem(TOKEN_KEY),
  user: read<AuthUser | null>(USER_KEY, null),
  permissions: read<Permission[]>(PERMS_KEY, []),

  login: async (email, password) => {
    try {
      const res = await api.post<{ data: Me & { access_token: string } }>("/auth/login", {
        email: email.trim(),
        password,
      });
      const { access_token, ...me } = res.data.data;
      localStorage.setItem(TOKEN_KEY, access_token);
      save(me);
      set({ isAuthenticated: true, user: me.user, permissions: me.permissions ?? [] });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const msg = (error.response.data as { message?: string })?.message;
        throw new Error(
          error.response.status === 401 ? msg || "Wrong email or password." : "Check the email and password and try again.",
        );
      }
      throw new Error("Login failed. Check your connection and try again.");
    }
  },

  /* Picks up role or access changes without signing out. */
  refresh: async () => {
    if (!localStorage.getItem(TOKEN_KEY)) return;
    try {
      const res = await api.get<{ data: Me }>("/auth/me");
      save(res.data.data);
      set({ user: res.data.data.user, permissions: res.data.data.permissions });
    } catch {
      /* A 401 signs out via the interceptor below; network errors keep the cached copy. */
    }
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(PERMS_KEY);
    set({ isAuthenticated: false, user: null, permissions: [] });
  },
}));

/* True if the signed-in person has any of these permissions. */
export function useCan() {
  const role = useAuthStore((s) => s.user?.role);
  const permissions = useAuthStore((s) => s.permissions);
  return (...anyOf: Permission[]) => role === "superadmin" || anyOf.some((p) => permissions.includes(p));
}

/* An expired or rejected token sends the user back to the login page,
   except on the login call itself. */
api.interceptors.response.use(undefined, (error) => {
  const url: string = error?.config?.url ?? "";
  if (error?.response?.status === 401 && !url.includes("/auth/login")) {
    useAuthStore.getState().logout();
  }
  return Promise.reject(error);
});
