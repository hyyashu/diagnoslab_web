import React from "react";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator, useTheme, type MD3Theme } from "react-native-paper";
import { spacing, radius } from "../../theme/constants";

type SkeletonLineProps = {
  width?: number | `${number}%`;
  height?: number;
};

function SkeletonLine({ theme, width = "100%", height = 12 }: SkeletonLineProps & { theme: MD3Theme }) {
  return (
    <View
      style={[skeletonStyles.line, { width: width as any, height, backgroundColor: theme.colors.outline }]}
    />
  );
}

function CardSkeleton({ theme }: { theme: MD3Theme }) {
  return (
    <View style={[skeletonStyles.card, { backgroundColor: theme.colors.surfaceVariant }]}>
      <View style={skeletonStyles.row}>
        <SkeletonLine theme={theme} width={120} height={18} />
        <SkeletonLine theme={theme} width={80} height={24} />
      </View>
      <SkeletonLine theme={theme} width={100} height={12} />
      <SkeletonLine theme={theme} width="90%" height={14} />
      <SkeletonLine theme={theme} width={140} height={12} />
    </View>
  );
}

type Props = {
  /** "spinner" shows a centred ActivityIndicator; "skeleton" shows placeholder cards */
  variant?: "spinner" | "skeleton";
  /** Number of skeleton cards to render (only used when variant="skeleton") */
  count?: number;
};

/** Unified loading state. Use variant="skeleton" for list screens and "spinner" for detail views. */
export function LoadingState({ variant = "spinner", count = 3 }: Props) {
  const theme = useTheme();

  if (variant === "skeleton") {
    return (
      <View style={styles.skeletonWrap}>
        {Array.from({ length: count }).map((_, i) => (
          <CardSkeleton key={i} theme={theme} />
        ))}
      </View>
    );
  }

  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
  },
  skeletonWrap: {
    paddingTop: spacing.sm,
    paddingBottom: 40,
  },
});

const skeletonStyles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.lg,
    gap: spacing.sm,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },
  line: {
    borderRadius: radius.sm,
  },
});
