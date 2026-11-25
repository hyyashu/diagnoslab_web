import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { radius } from "../../theme/constants";

type Props = {
  status: string;
  /** Map of status value → hex colour */
  colorMap: Record<string, string>;
  /** Optional map of status value → display label. Falls back to the status itself. */
  labelMap?: Record<string, string>;
};

/**
 * Generic status badge with coloured dot and label.
 * Pass a colorMap and optional labelMap to support any domain (bookings, visits, attendance, leads, etc.).
 *
 * @example
 * <StatusBadge
 *   status="pending"
 *   colorMap={{ pending: "#6366f1", completed: "#16a34a" }}
 *   labelMap={{ pending: "Pending", completed: "Done" }}
 * />
 */
export function StatusBadge({ status, colorMap, labelMap }: Props) {
  const color = colorMap[status] ?? "#94a3b8";
  const label = labelMap?.[status] ?? status;
  const bgColor = color + "22";

  return (
    <View style={[styles.badge, { backgroundColor: bgColor }]}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={[styles.label, { color }]} variant="labelMedium">
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.full,
    alignSelf: "flex-start",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  label: {
    fontWeight: "600",
  },
});
