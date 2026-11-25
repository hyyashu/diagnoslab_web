import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { spacing, radius } from "../../theme/constants";

type Props = {
  label: string;
  value: string | number;
  color: string;
  icon?: string;
};

/**
 * Single stat/metric card with a coloured top border.
 * Used on admin screens and the dashboard carousel.
 */
export function SummaryCard({ label, value, color, icon }: Props) {
  const theme = useTheme();
  return (
    <View style={[styles.card, { borderTopColor: color, backgroundColor: theme.colors.surface }]}>
      {icon ? <Text style={styles.icon}>{icon}</Text> : null}
      <Text variant="headlineMedium" style={[styles.value, { color }]}>
        {value}
      </Text>
      <Text variant="labelMedium" style={[styles.label, { color: theme.colors.onSurfaceVariant }]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    borderTopWidth: 4,
    padding: spacing.lg,
    alignItems: "center",
    minWidth: 100,
    elevation: 1,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  icon: { fontSize: 22, marginBottom: spacing.xs },
  value: { fontWeight: "800" },
  label: { marginTop: spacing.xs, textAlign: "center" },
});
