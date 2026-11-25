import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginSchema } from "../schema/auth";
import { z } from "zod";
import { api } from "../api/api";
import { login as loginRequest, type AuthUser } from "../api/auth";

interface AuthState {
  token: string;
  user: AuthUser | null;
  isLoggedIn: boolean;
  login: (loginData: z.infer<typeof loginSchema>) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: "",
      user: null,
      isLoggedIn: false,
      login: async (loginData) => {
        const { email, password } = loginSchema.parse(loginData);
        const { token, user } = await loginRequest(email.trim(), password);
        set({ token, user, isLoggedIn: true });
      },
      logout: () => set({ token: "", user: null, isLoggedIn: false }),
    }),
    {
      name: "diagnoslab-auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({ token, user, isLoggedIn }) => ({ token, user, isLoggedIn }),
    },
  ),
);

/* Every request carries the login token. */
api.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/* An expired or rejected token sends the user back to the login screen,
   except on the login call itself (a wrong password is not a logout). */
api.interceptors.response.use(undefined, (error) => {
  const url: string = error?.config?.url ?? "";
  if (error?.response?.status === 401 && !url.includes("/auth/login")) {
    useAuthStore.getState().logout();
  }
  return Promise.reject(error);
});

export const useIsLoggedIn = () => useAuthStore((s) => s.isLoggedIn);
export const useIsLoggedOut = () => !useAuthStore((s) => s.isLoggedIn);
