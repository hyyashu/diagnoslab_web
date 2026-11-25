import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { AttendanceHeader } from "../../components/attendance/AttendanceHeader";
import { AttendanceHistoryCard } from "../../components/attendance/AttendanceHistoryCard";
import { AttendanceActionCard } from "../../components/attendance/AttendanceActionCard";
import { useTheme } from "react-native-paper";

const AttendanceScreen = () => {
  const [isMarkedIn, setIsMarkedIn] = useState(false);
  const theme = useTheme();
  const attendanceHistory = [
    { day: "Mon", date: "Feb 10", status: "Present", time: "09:00 AM" },
    { day: "Tue", date: "Feb 11", status: "Present", time: "08:55 AM" },
    { day: "Wed", date: "Feb 12", status: "Absent", time: "-" },
    { day: "Thu", date: "Feb 13", status: "Present", time: "09:05 AM" },
    { day: "Fri", date: "Feb 14", status: "Present", time: "08:45 AM" },
    { day: "Sat", date: "Feb 15", status: "Half-Day", time: "10:30 AM" },
    { day: "Sun", date: "Feb 16", status: "Holiday", time: "-" },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView>
        {/* <AttendanceHeader /> */}

        {/* <AttendanceActionCard isMarkedIn={isMarkedIn} onToggle={() => setIsMarkedIn(!isMarkedIn)} /> */}

        <AttendanceHistoryCard history={attendanceHistory} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
  },
});

export default AttendanceScreen;
