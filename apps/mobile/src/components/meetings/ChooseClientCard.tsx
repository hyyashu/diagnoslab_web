import { View, StyleSheet } from "react-native";
import { Card, Text, Button, Divider, Chip, Avatar, useTheme } from "react-native-paper";

export default function ChooseClientCard({
  client,
  checkInTime,
  onChooseClient,
  onCheckIn,
  onCheckOut,
}: any) {
  const theme = useTheme();
  const getDuration = () => {
    if (!checkInTime) return "";
    const mins = Math.floor((Date.now() - checkInTime) / 60000);
    return `${mins} min`;
  };

  return (
    <Card style={styles.bigCard} mode="elevated">
      <Card.Content>
        {/* Client */}
        <View style={styles.row}>
          <Avatar.Text size={48} label={client ? client.name[0] : "C"} />

          {/* Name + Active chip */}
          <View style={styles.nameRow}>
            <Text variant="titleMedium">
              {client ? client.name : "Select Client"}
            </Text>

            {checkInTime && (
              <Chip compact style={[styles.activeChip, { backgroundColor: theme.colors.surfaceVariant }]}>
                Active
              </Chip>
            )}
          </View>
        </View>

        {/* Duration + location */}
        {checkInTime && (
          <View style={styles.infoRow}>
            <Text style={[styles.duration, { color: theme.colors.secondary }]}>⏱ {getDuration()}</Text>

            <Chip icon="map-marker" compact>
              Location
            </Chip>
          </View>
        )}

        <Divider style={{ marginVertical: 16 }} />

        {/* Actions */}
        <View style={styles.actions}>
          <Button mode="outlined" onPress={onChooseClient}>
            Choose Client
          </Button>

          {!checkInTime ? (
            <Button mode="contained" disabled={!client} onPress={onCheckIn}>
              Check In
            </Button>
          ) : (
            <Button mode="contained-tonal" onPress={onCheckOut}>
              Check Out
            </Button>
          )}
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  bigCard: {
    margin: 16,
    borderRadius: 20,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },

  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    marginLeft: 12,
  },

  activeChip: {},

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    alignItems: "center",
  },

  duration: {
    fontWeight: "600",
    fontSize: 16,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
