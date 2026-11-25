import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button, useTheme } from "react-native-paper";
import { spacing } from "../../theme/constants";

type Props = {
  message?: string;
  onRetry?: () => void;
};

/** Generic error state with optional retry button. */
export function ErrorState({
  message = "Something went wrong.",
  onRetry,
}: Props) {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>⚠️</Text>
      <Text variant="titleMedium" style={styles.title}>
        Oops!
      </Text>
      <Text variant="bodyMedium" style={[styles.sub, { color: theme.colors.onSurfaceVariant }]}>
        {message}
      </Text>
      {onRetry ? (
        <Button mode="contained" onPress={onRetry} style={styles.btn}>
          Retry
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
