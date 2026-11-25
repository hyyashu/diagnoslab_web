import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button, useTheme } from "react-native-paper";
import { spacing } from "../../theme/constants";

type Props = {
  icon?: string;
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
};

/** Generic empty-list state with optional icon, subtitle, and action button. */
export function EmptyState({ icon, title, subtitle, actionLabel, onAction }: Props) {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      {icon ? <Text style={styles.icon}>{icon}</Text> : null}
      <Text variant="titleMedium" style={styles.title}>
        {title}
      </Text>
      {subtitle ? (
        <Text variant="bodyMedium" style={[styles.sub, { color: theme.colors.onSurfaceVariant }]}>
          {subtitle}
        </Text>
      ) : null}
      {actionLabel && onAction ? (
        <Button mode="contained" onPress={onAction} style={styles.btn}>
          {actionLabel}
        </Button>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
    paddingHorizontal: spacing.xxl,
  },
  icon: { fontSize: 48, marginBottom: spacing.lg },
  title: { fontWeight: "700", marginBottom: spacing.sm, textAlign: "center" },
  sub: { textAlign: "center", marginBottom: spacing.xl },
  btn: { borderRadius: 12 },
});
