import { useEffect } from "react";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import { useNotificationStore } from "../store/notificationStore";
import { registerPushToken } from "../api/notification";
import { navigationRef } from "../navigation/navigationRef";

export function useNotifications() {
  const { permissionStatus, pushToken, setPermissionStatus, setPushToken, addNotification } =
    useNotificationStore();

  const requestPermissions = async () => {
    const result = await Notifications.requestPermissionsAsync();
    setPermissionStatus(result.status);

    if (result.status === Notifications.PermissionStatus.GRANTED && Device.isDevice) {
      try {
        const projectId = Constants.expoConfig?.extra?.eas?.projectId;
        const tokenData = await Notifications.getExpoPushTokenAsync({ projectId });
        setPushToken(tokenData.data);
        registerPushToken(tokenData.data).catch(() => {});
      } catch {
        // silently ignore token registration errors
      }
    }
  };

  useEffect(() => {
    Notifications.getPermissionsAsync().then((result) => {
      setPermissionStatus(result.status);
    });

    const receivedSub = Notifications.addNotificationReceivedListener((notification) => {
      const content = notification.request.content;
      addNotification({
        id: Date.now(),
        title: content.title ?? "Notification",
        desc: content.body ?? "",
        time: new Date().toLocaleTimeString(),
        category: (content.data?.category as string) ?? "Update",
        receivedAt: Date.now(),
      });
    });

    const responseSub = Notifications.addNotificationResponseReceivedListener(() => {
      navigationRef.current?.navigate("Updates");
    });

    return () => {
      receivedSub.remove();
      responseSub.remove();
    };
  }, []);

  return { permissionStatus, pushToken, requestPermissions };
}
