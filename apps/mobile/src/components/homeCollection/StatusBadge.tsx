import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import type { BookingStatus } from "../../types/homeCollection";
import {
  BOOKING_STATUS_LABELS,
  BOOKING_STATUS_COLORS,
} from "../../types/homeCollection";

type Props = {
  status: BookingStatus;
};

export function StatusBadge({ status }: Props) {
  const label = BOOKING_STATUS_LABELS[status];
  const color = BOOKING_STATUS_COLORS[status];
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
    borderRadius: 20,
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
