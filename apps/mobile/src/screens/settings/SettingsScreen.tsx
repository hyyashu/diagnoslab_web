import { Linking, ScrollView } from "react-native";
import * as Notifications from "expo-notifications";
import { useColorScheme } from "react-native";
import { useState } from "react";

import { useAuthStore } from "../../store/authStore";

import ProfileHeader from "../../components/settings/ProfileHeader";
import SettingsSection from "../../components/settings/SettingsSection";
import SettingSwitchItem from "../../components/settings/SettingSwitchItem";
import SettingNavItem from "../../components/settings/SettingNavItem";
import { ConfirmationDialog } from "../../components/common";
import { useNotifications } from "../../hooks/useNotifications";
import { useTheme } from "react-native-paper";

export default function SettingsScreen() {
  const [logoutDialogVisible, setLogoutDialogVisible] = useState(false);

  const { logout } = useAuthStore();
  const { permissionStatus, requestPermissions } = useNotifications();
  const systemTheme = useColorScheme();
  const theme = useTheme();
  const isDark = systemTheme === "dark";

  const notificationsEnabled =
    permissionStatus === Notifications.PermissionStatus.GRANTED;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ProfileHeader />

      <SettingsSection title="PREFERENCES">
        <SettingSwitchItem
          title="Dark Mode"
          subtitle="Controlled by system settings"
          value={isDark}
          disabled   // 🔒 Prevent manual change
          onToggle={() => {}}
        />

        <SettingSwitchItem
          title="Push Notifications"
          subtitle="Receive updates"
          value={notificationsEnabled}
          onToggle={() => {
            if (!notificationsEnabled) {
              requestPermissions();
            } else {
              Linking.openSettings();
            }
          }}
        />
      </SettingsSection>

      <SettingsSection title="ACCOUNT">
        <SettingNavItem
          title="Logout"
          icon="logout"
          danger
          onPress={() => setLogoutDialogVisible(true)}
        />
      </SettingsSection>

      <ConfirmationDialog
        visible={logoutDialogVisible}
        title="Logout"
        message="Are you sure you want to log out?"
        confirmLabel="Logout"
        confirmMode="contained-tonal"
        onConfirm={() => {
          setLogoutDialogVisible(false);
          logout();
        }}
        onDismiss={() => setLogoutDialogVisible(false)}
      />
    </ScrollView>
  );
}