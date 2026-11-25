import { View, StyleSheet } from "react-native";
import { Text, Avatar, Chip, Button } from "react-native-paper";
import { AppBottomSheet } from "../common/AppBottomSheet";
import { spacing, radius } from "../../theme/constants";

type Props = {
  visible: boolean;
  onDismiss: () => void;
  visit: any;
  formatTime: (t: string) => string;
};

export default function VisitDetailsModal({
  visible,
  onDismiss,
  visit,
  formatTime,
}: Props) {
  return (
    <AppBottomSheet visible={visible} onDismiss={onDismiss} snapPoints={["60%"]}>
      {visit && (
        <>
          {/* Header */}
          <View style={styles.header}>
            <Avatar.Text
              size={48}
              label={visit.name?.[0] || "C"}
              style={styles.avatar}
            />
            <View style={{ flex: 1 }}>
              <Text variant="titleLarge" style={styles.name}>
                {visit.name}
              </Text>
              {visit.type ? (
                <Chip compact style={styles.chip}>
                  {visit.type}
                </Chip>
              ) : null}
            </View>
          </View>

          {/* Check In / Check Out */}
          <View style={styles.timeRow}>
            <View style={styles.timeBox}>
              <Text style={styles.timeLabel}>Check In</Text>
              <Text style={styles.timeValue}>
                {visit.checkIn ? formatTime(visit.checkIn) : "—"}
              </Text>
            </View>
            <View style={styles.timeBox}>
              <Text style={styles.timeLabel}>Check Out</Text>
              <Text style={styles.timeValue}>
                {visit.checkOut ? formatTime(visit.checkOut) : "—"}
              </Text>
            </View>
          </View>

          {/* Duration */}
          <View style={styles.durationBox}>
            <Text style={styles.durationText}>⏱ {visit.duration || "—"}</Text>
          </View>

          {/* Remark */}
          {visit.remark ? (
            <View style={styles.remarkBox}>
              <Text style={styles.remarkLabel}>Remark</Text>
              <Text style={styles.remarkText}>{visit.remark}</Text>
            </View>
          ) : null}

          <Button mode="contained" onPress={onDismiss} style={styles.closeBtn}>
            Close
          </Button>
        </>
      )}
    </AppBottomSheet>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  avatar: {
  },
  name: {
    fontWeight: "700",
    marginBottom: spacing.xs,
  },
  chip: {
    alignSelf: "flex-start",
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  timeBox: {
    padding: spacing.md,
    borderRadius: radius.lg,
    width: "48%",
  },
  timeLabel: {
    fontSize: 11,
    marginBottom: 4,
  },
  timeValue: {
    fontWeight: "700",
    fontSize: 15,
  },
  durationBox: {
    padding: spacing.md,
    borderRadius: radius.lg,
    alignItems: "center",
    marginBottom: spacing.md,
  },
  durationText: {
    fontWeight: "700",
    fontSize: 15,
  },
  remarkBox: {
    padding: spacing.md,
    borderRadius: radius.lg,
    marginBottom: spacing.md,
  },
  remarkLabel: {
    fontSize: 11,
    marginBottom: 4,
  },
  remarkText: {
    lineHeight: 22,
  },
  closeBtn: {
    marginTop: spacing.md,
    borderRadius: radius.lg,
  },
});
