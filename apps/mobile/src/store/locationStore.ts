import { create } from "zustand";
import type { LocationObject } from "expo-location";

interface LocationState {
  lastLocation: LocationObject | null;
  lastError: string | null;
  setLastLocation: (location: LocationObject | null) => void;
  setLastError: (error: string | null) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  lastLocation: null,
  lastError: null,
  setLastLocation: (location) => set({ lastLocation: location, lastError: null }),
  setLastError: (error) => set({ lastError: error }),
}));
