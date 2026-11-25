import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Button, Card, useTheme, type MD3Theme } from "react-native-paper";
import { useLocation } from "../../hooks/useLocation";
import { BatteryState } from "expo-battery";

function batteryStateLabel(state: number): string {
  switch (state) {
    case BatteryState.UNKNOWN:
      return "Unknown";
    case BatteryState.UNPLUGGED:
      return "Unplugged";
    case BatteryState.CHARGING:
      return "Charging";
    case BatteryState.FULL:
      return "Full";
    default:
      return "Unknown";
  }
}
function LocationBlock({
  theme,
  location,
  error,
  isLoading,
  onStart,
  onStop,
  title,
  note,
}: {
  theme: MD3Theme;
  location: { coords: { latitude: number; longitude: number; accuracy: number | null } } | null;
  error: string | null;
  isLoading: boolean;
  onStart: () => void;
  onStop: () => void;
  title: string;
  note?: string;
}) {
  return (
    <Card style={[styles.card, { borderColor: theme.colors.outline }]}>
     
      <Card.Content>
        <Text style={styles.cardTitle}>{title}</Text>
        {note ? (
          <Text style={[styles.note, { color: theme.colors.onSurfaceVariant }]}>{note}</Text>
        ) : null}
        {isLoading && (
          <View style={styles.loadingRow}>
            <ActivityIndicator size="small" />
            <Text style={[styles.loadingText, { color: theme.colors.onSurfaceVariant }]}>Getting location…</Text>
          </View>
        )}
        {error && (
          <Text style={[styles.errorText, { color: theme.colors.error }]}>{error}</Text>
        )}
        {!isLoading && location && (
          <View style={styles.locationBlock}>
            <Text style={[styles.locationLine, { color: theme.colors.onSurface }]}>
              Lat: {location.coords.latitude.toFixed(6)}
            </Text>
            <Text style={[styles.locationLine, { color: theme.colors.onSurface }]}>
              Lng: {location.coords.longitude.toFixed(6)}
            </Text>
            <Text style={[styles.locationLine, { color: theme.colors.onSurface }]}>
              Accuracy: {location.coords.accuracy != null ? `${location.coords.accuracy.toFixed(0)} m` : "—"}
            </Text>
          </View>
        )}
        {!location && !error && !isLoading && (
          <Text style={[styles.placeholder, { color: theme.colors.onSurfaceVariant }]}>No location yet</Text>
        )}
        <View style={styles.buttonRow}>
          <Button mode="contained" onPress={onStart} style={styles.button}>
            Start {title.toLowerCase()}
          </Button>
          <Button mode="outlined" onPress={onStop} style={styles.button}>
            Stop
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
}

export default function LocationDemoScreen() {
  const theme = useTheme();
  const [permissionRequesting, setPermissionRequesting] = useState(false);

  const foreground = useLocation({ mode: "foreground" });
  const background = useLocation({ mode: "background" });


  const battery = foreground.battery;
  const batteryPct =
    battery.batteryLevel >= 0
      ? `${Math.round(battery.batteryLevel * 100)}%`
      : "—";

  const handleRequestPermissions = async () => {
    setPermissionRequesting(true);
    await foreground.requestPermissions();
    setPermissionRequesting(false);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.sectionLabel, { color: theme.colors.onSurfaceVariant }]}>BATTERY</Text>
        <Card style={[styles.card, { borderColor: theme.colors.outline }]}>
          <Card.Content>
            <Text style={[styles.batteryLine, { color: theme.colors.onSurface }]}>
              Level: {batteryPct}
            </Text>
            <Text style={[styles.batteryLine, { color: theme.colors.onSurface }]}>
              State: {batteryStateLabel(battery.batteryState)}
            </Text>
            <Text style={[styles.batteryLine, { color: theme.colors.onSurface }]}>
              Low power mode: {battery.lowPowerMode ? "On" : "Off"}
            </Text>
          </Card.Content>
        </Card>

        <Text style={[styles.sectionLabel, { color: theme.colors.onSurfaceVariant }]}>PERMISSIONS</Text>
        <Card style={[styles.card, { borderColor: theme.colors.outline }]}>
          <Card.Content>
            <Text style={[styles.permLine, { color: theme.colors.onSurface }]}>
              Status: {foreground.permissionStatus?.status ?? "—"}
            </Text>
            <Button
              mode="contained"
              onPress={handleRequestPermissions}
              loading={permissionRequesting}
              disabled={permissionRequesting}
              style={styles.permButton}
            >
              Request permissions
            </Button>
          </Card.Content>
        </Card>

        <Text style={[styles.sectionLabel, { color: theme.colors.onSurfaceVariant }]}>
          FOREGROUND TRACKING
        </Text>
        <LocationBlock
          theme={theme}
          title="Foreground tracking"
          location={foreground.location}
          error={foreground.error}
          isLoading={foreground.isLoading}
          onStart={foreground.startTracking}
          onStop={foreground.stopTracking}
        />

        <Text style={[styles.sectionLabel, { color: theme.colors.onSurfaceVariant }]}>
          BACKGROUND TRACKING
        </Text>
        <LocationBlock
          theme={theme}
          title="Background tracking"
          location={background.location}
          error={background.error}
          isLoading={background.isLoading}
          onStart={background.startTracking}
          onStop={background.stopTracking}
          note="Uses a persistent notification on Android and Always permission on iOS."
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "700",
    marginLeft: 20,
    marginBottom: 8,
    marginTop: 15,
    textTransform: "uppercase",
  },
  card: {
    marginHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  note: {
    fontSize: 12,
    marginBottom: 8,
  },
  batteryLine: {
    fontSize: 15,
    marginVertical: 2,
  },
  permLine: {
    fontSize: 15,
    marginBottom: 12,
  },
  permButton: {
    marginTop: 4,
  },
  loadingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginVertical: 8,
  },
  loadingText: {
    fontSize: 14,
  },
  errorText: {
    fontSize: 14,
    marginVertical: 8,
  },
  locationBlock: {
    marginVertical: 8,
  },
  locationLine: {
    fontSize: 14,
    marginVertical: 2,
  },
  placeholder: {
    fontSize: 14,
    marginVertical: 8,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },
  button: {
    flex: 1,
  },
});
