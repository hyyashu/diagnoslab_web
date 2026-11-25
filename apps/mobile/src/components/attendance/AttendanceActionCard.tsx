import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text, Button, Chip } from "react-native-paper";

type Props = {
  isMarkedIn: boolean;
  onToggle: () => void;
};

export const AttendanceActionCard = ({
  isMarkedIn,
  onToggle,
}: Props) => {
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Card style={styles.card} mode="outlined">
      <Card.Content style={styles.content}>
        {/* <Chip icon="map-marker" style={styles.location}>
          Office Premises - Jamshedpur
        </Chip> */}

        <Text variant="displaySmall" style={styles.time}>
          {currentTime}
        </Text>

        <Text variant="bodyMedium" style={styles.date}>
          {new Date().toDateString()}
        </Text>

        {/* <Button
          mode={isMarkedIn ? "outlined" : "contained"}
          onPress={onToggle}
          style={styles.button}
          contentStyle={{ height: 55 }}
        >
          {isMarkedIn ? "Mark Out" : "Mark Attendance"}
        </Button>

        <View style={styles.statusRow}>
          <Text variant="bodyMedium">Status: </Text>
          <Text variant="titleMedium">
            {isMarkedIn
              ? "Currently Clocked In"
              : "Not Clocked In"}
          </Text>
        </View> */}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    borderRadius: 20,
    marginTop: 10,
  },
  content: {
    alignItems: "center",
    paddingVertical: 24,
  },
  location: {
    marginBottom: 20,
  },
  time: {
    fontWeight: "700",
  },
  date: {
    marginBottom: 30,
    opacity: 0.7,
  },
  button: {
    width: "100%",
    marginBottom: 20,
    borderRadius: 12,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
