import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Surface, useTheme } from "react-native-paper";

export const AttendanceHeader = () => {
  const theme = useTheme();
  const days = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <Surface style={styles.container} elevation={0}>
      <Text variant="headlineSmall" style={styles.title}>
        Attendance
      </Text>

      <View style={styles.calendarStrip}>
        {days.map((day, i) => (
          <Surface
            key={i}
            style={[
              styles.dayCircle,
              i === 1 && { backgroundColor: theme.colors.primary },
            ]}
            elevation={0}
          >
            <Text
              variant="labelLarge"
              style={[
                i === 1 && { color: theme.colors.onPrimary },
              ]}
            >
              {day}
            </Text>
          </Surface>
        ))}
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontWeight: "700",
    marginBottom: 20,
  },
  calendarStrip: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
});
