import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type ThemeMode = "light" | "dark" | "system";

interface ThemeState {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleDark: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: "system",

      setMode: (mode) => set({ mode }),

      toggleDark: () => {
        const current = get().mode;

        if (current === "dark") {
          set({ mode: "light" });
          return;
        }

        // if light or system → go dark
        set({ mode: "dark" });
      },
    }),
    {
      name: "app-theme-storage", // storage key
      storage: createJSONStorage(() => AsyncStorage),

      // only persist what we need
      partialize: (state) => ({
        mode: state.mode,
      }),
    }
  )
);