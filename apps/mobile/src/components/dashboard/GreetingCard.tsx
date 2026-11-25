import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Text, useTheme } from "react-native-paper";
import { useAuthStore } from "../../store/authStore";
import { initials } from "../../utils/initials";
import { spacing } from "../../theme/constants";

function greeting(hour: number) {
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

/* Who is logged in and today's date. */
export const GreetingCard = () => {
  const theme = useTheme();
  const name = useAuthStore((s) => s.user?.name);
  const now = new Date();
  const firstName = name?.trim().split(/\s+/)[0];

  return (
    <View style={styles.row}>
      <View style={styles.text}>
        <Text variant="headlineSmall" style={styles.title}>
          {greeting(now.getHours())}
          {firstName ? `, ${firstName}` : ""}
        </Text>
        <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
          {now.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}
        </Text>
      </View>
      <Avatar.Text size={48} label={initials(name)} style={{ backgroundColor: theme.colors.primary }} />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  text: { flex: 1, gap: 2 },
  title: { fontWeight: "700" },
});
