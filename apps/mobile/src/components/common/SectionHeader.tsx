import React from "react";
import { StyleSheet, type ViewStyle } from "react-native";
import { Text } from "react-native-paper";
import { spacing } from "../../theme/constants";

type Props = {
  title: string;
  style?: ViewStyle;
};

/** Consistent section title used across all screens. */
export function SectionHeader({ title, style }: Props) {
  return (
    <Text variant="titleMedium" style={[styles.header, style]}>
      {title}
    </Text>
  );
}

const styles = StyleSheet.create({
  header: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
    fontWeight: "700",
  },
});
