import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { Update } from "../types/update";

interface NotificationState {
  permissionStatus: Notifications.PermissionStatus | null;
  pushToken: string | null;
  notifications: Update[];
  setPermissionStatus: (status: Notifications.PermissionStatus) => void;
  setPushToken: (token: string) => void;
  addNotification: (update: Update) => void;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set) => ({
      permissionStatus: null,
      pushToken: null,
      notifications: [],
      setPermissionStatus: (status) => set({ permissionStatus: status }),
      setPushToken: (token) => set({ pushToken: token }),
      addNotification: (update) =>
        set((state) => ({ notifications: [update, ...state.notifications] })),
    }),
    {
      name: "diagnoslab-notification-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
