import { View, StyleSheet } from "react-native";
import { Avatar, Text, useTheme } from "react-native-paper";
import { useAuthStore } from "../../store/authStore";
import { initials } from "../../utils/initials";

const roleLabels: Record<string, string> = { superadmin: "Admin", user: "Staff" };

/* The logged-in person, at the top of the drawer and settings. */
export default function ProfileHeader() {
  const theme = useTheme();
  const user = useAuthStore((s) => s.user);
  return (
    <View style={styles.container}>
      <Avatar.Text size={72} label={initials(user?.name)} />
      <Text variant="titleLarge" style={styles.name}>
        {user?.name ?? "Staff"}
      </Text>
      <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
        {user ? `${roleLabels[user.role] ?? user.role} · ${user.email}` : ""}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 30,
  },
  name: { marginTop: 10 },
});
