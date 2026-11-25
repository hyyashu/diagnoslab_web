import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import type { Lead } from "../leads/LeadCard";
import { colors, radius, spacing } from "../../theme/constants";

const DAY = 24 * 60 * 60 * 1000;

/* Three numbers from the real lead list: what came in today, who still
   needs a call, and this week's total. */
export function LeadStats({ leads }: { leads: Lead[] }) {
  const theme = useTheme();
  const startOfToday = new Date().setHours(0, 0, 0, 0);
  const weekAgo = startOfToday - 6 * DAY;
  const created = leads.map((l) => Date.parse(l.createdAt));

  const stats = [
    { label: "New today", value: created.filter((t) => t >= startOfToday).length, color: theme.colors.primary },
    { label: "To call", value: leads.filter((l) => l.status === "new").length, color: colors.status.ongoing },
    { label: "Last 7 days", value: created.filter((t) => t >= weekAgo).length, color: colors.status.completed },
  ];

  return (
    <View style={styles.row}>
      {stats.map((s) => (
        <View key={s.label} style={[styles.tile, { backgroundColor: theme.colors.surfaceVariant }]}>
          <Text variant="headlineMedium" style={[styles.value, { color: s.color }]}>
            {s.value}
          </Text>
          <Text variant="labelMedium" style={{ color: theme.colors.onSurfaceVariant }}>
            {s.label}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  tile: {
    flex: 1,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    alignItems: "center",
    gap: 2,
  },
  value: { fontWeight: "800" },
});
