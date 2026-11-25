import React from "react";
import {
  View,
  StyleSheet,
  Linking,
  Platform,
  Alert,
} from "react-native";
import { Card, Text, Button, useTheme } from "react-native-paper";
import type { Booking, BookingStatus } from "../../types/homeCollection";
import { BOOKING_STATUS_LABELS } from "../../types/homeCollection";
import { StatusBadge } from "./StatusBadge";

type Props = {
  booking: Booking;
  onUpdateStatus?: (booking: Booking, nextStatus: BookingStatus) => void;
};

function getNextStatus(current: BookingStatus): BookingStatus | null {
  const flow: BookingStatus[] = [
    "assigned",
    "accepted",
    "on_the_way",
    "collected",
    "completed",
  ];
  const idx = flow.indexOf(current);
  if (idx < 0 || idx >= flow.length - 1) return null;
  return flow[idx + 1];
}

function getActionButtonLabel(status: BookingStatus): string {
  switch (status) {
    case "assigned":
      return "Accept";
    case "accepted":
      return "Start Visit";
    case "on_the_way":
      return "Reached";
    case "collected":
      return "Complete";
    case "completed":
      return "Completed";
    default:
      return "Update";
  }
}

export function BookingCard({ booking, onUpdateStatus }: Props) {
  const theme = useTheme();
  const nextStatus = getNextStatus(booking.status);
  const isCompleted = booking.status === "completed";

  const handleCall = () => {
    const url = Platform.select({
      ios: `tel:${booking.phone.replace(/\s/g, "")}`,
      default: `tel:${booking.phone.replace(/\s/g, "")}`,
    });
    Linking.canOpenURL(url).then((supported) => {
      if (supported) Linking.openURL(url);
      else Alert.alert("Not supported", "Cannot open phone dialer.");
    });
  };

  const handleNavigate = () => {
    const { latitude, longitude } = booking;
    const url =
      Platform.OS === "ios"
        ? `maps://app?daddr=${latitude},${longitude}`
        : `geo:${latitude},${longitude}?q=${latitude},${longitude}`;
    Linking.openURL(url).catch(() => {
      const fallback = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      Linking.openURL(fallback);
    });
  };

  const handleUpdateStatus = () => {
    if (nextStatus) onUpdateStatus?.(booking, nextStatus);
  };

  const testsSummary =
    booking.tests.length > 2
      ? `${booking.tests.slice(0, 2).join(", ")} +${booking.tests.length - 2} more`
      : booking.tests.join(", ");
  const addressLines = booking.address.split(",").slice(0, 2).join(", ");

  return (
    <Card style={[styles.card, { backgroundColor: theme.colors.surface }]} mode="elevated" elevation={1}>
      <Card.Content style={styles.content}>
        <View style={styles.header}>
          <Text variant="titleMedium" style={styles.patientName}>
            {booking.patientName}
          </Text>
          <StatusBadge status={booking.status} />
        </View>

        <Text variant="labelSmall" style={[styles.bookingId, { color: theme.colors.onSurfaceVariant }]}>
          {booking.id}
        </Text>

        <Text variant="bodyMedium" style={[styles.tests, { color: theme.colors.onSurface }]} numberOfLines={2}>
          {testsSummary}
        </Text>

        <View style={styles.metaRow}>
          <Text variant="labelMedium" style={[styles.timeSlot, { color: theme.colors.onSurface }]}>
            🕐 {booking.timeSlot}
          </Text>
          {booking.distanceKm != null && (
            <Text variant="labelSmall" style={[styles.distance, { color: theme.colors.onSurfaceVariant }]}>
              📍 {booking.distanceKm} km
            </Text>
          )}
        </View>

        <Text variant="bodySmall" style={[styles.address, { color: theme.colors.onSurfaceVariant }]} numberOfLines={2}>
          {addressLines}
        </Text>

        <View style={styles.actions}>
          <Button
            mode="outlined"
            compact
            onPress={handleCall}
            icon="phone"
            style={styles.actionBtn}
            labelStyle={styles.actionLabel}
          >
            Call
          </Button>
          <Button
            mode="outlined"
            compact
            onPress={handleNavigate}
            icon="map-marker"
            style={styles.actionBtn}
            labelStyle={styles.actionLabel}
          >
            Navigate
          </Button>
          {!isCompleted && nextStatus && (
            <Button
              mode="contained"
              compact
              onPress={handleUpdateStatus}
              icon="play"
              style={[styles.actionBtn, { backgroundColor: theme.colors.primary }]}
              labelStyle={[styles.actionLabel, { color: theme.colors.onPrimary }]}
            >
              {getActionButtonLabel(booking.status)}
            </Button>
          )}
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
    overflow: "hidden",
  },
  content: {
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  patientName: {
    fontWeight: "700",
    fontSize: 17,
    flex: 1,
  },
  bookingId: {
    marginBottom: 6,
  },
  tests: {
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 6,
  },
  timeSlot: {},
  distance: {},
  address: {
    marginBottom: 14,
  },
  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    alignItems: "center",
  },
  actionBtn: {
    borderRadius: 10,
    minWidth: 0,
  },
  actionLabel: {
    fontSize: 13,
  },
});
