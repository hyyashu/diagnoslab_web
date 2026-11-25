import { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { FlashList } from "@shopify/flash-list";
import {
  Text,
  Card,
  Chip,
  Searchbar,
  SegmentedButtons,
  Avatar,
  Button,
  Divider,
  useTheme,
} from "react-native-paper";
import { AppBottomSheet } from "../../components/common/AppBottomSheet";
import { spacing } from "../../theme/constants";

const meetings = [
  {
    id: "1",
    employee: "Rahul",
    client: "ABC Pharma",
    status: "completed",
    time: "10:00 AM",
    remark: "Product demo",
  },
  {
    id: "2",
    employee: "Aman",
    client: "City Hospital",
    status: "ongoing",
    time: "11:30 AM",
    remark: "Follow up",
  },
  {
    id: "3",
    employee: "Riya",
    client: "Metro Clinic",
    status: "pending",
    time: "2:00 PM",
    remark: "Scheduled meeting",
  },
];

export default function AdminMeetingLogScreen() {
  const theme = useTheme();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<any>(null);

  const filtered = meetings.filter((m) => {
    const matchSearch =
      m.employee.toLowerCase().includes(search.toLowerCase()) ||
      m.client.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || m.status === filter;
    return matchSearch && matchFilter;
  });

  const summary = {
    total: meetings.length,
    pending: meetings.filter((m) => m.status === "pending").length,
    ongoing: meetings.filter((m) => m.status === "ongoing").length,
    completed: meetings.filter((m) => m.status === "completed").length,
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* SUMMARY */}
      <View style={styles.summaryRow}>
        <Summary label="Total" value={summary.total} theme={theme} />
        <Summary label="Pending" value={summary.pending} theme={theme} />
        <Summary label="Ongoing" value={summary.ongoing} theme={theme} />
        <Summary label="Completed" value={summary.completed} theme={theme} />
      </View>

      {/* SEARCH */}
      <Searchbar
        placeholder="Search employee or client"
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      {/* FILTER */}
      <SegmentedButtons
        value={filter}
        onValueChange={setFilter}
        buttons={[
          { value: "all", label: "All" },
          { value: "pending", label: "Pending" },
          { value: "ongoing", label: "Ongoing" },
          { value: "completed", label: "Completed" },
        ]}
        style={styles.segment}
      />

      {/* LIST */}
      <FlashList
        data={filtered}
        keyExtractor={(i) => i.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable onPress={() => setSelected(item)}>
            <MeetingCard item={item} theme={theme} />
          </Pressable>
        )}
        contentContainerStyle={{ paddingBottom: 40 }}
      />

      {/* DETAILS BOTTOM SHEET */}
      <AppBottomSheet
        visible={!!selected}
        onDismiss={() => setSelected(null)}
        snapPoints={["55%"]}
      >
        {selected && (
          <>
            <Text style={styles.sheetTitle}>{selected.client}</Text>
            <Text style={[styles.sheetSubtitle, { color: theme.colors.onSurfaceVariant }]}>{selected.employee}</Text>

            <Divider style={styles.divider} />

            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: theme.colors.onSurfaceVariant }]}>Time</Text>
              <Text>{selected.time}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: theme.colors.onSurfaceVariant }]}>Status</Text>
              <Text style={{ textTransform: "capitalize" }}>{selected.status}</Text>
            </View>

            {selected.remark ? (
              <View style={[styles.remarkBox, { backgroundColor: theme.colors.surfaceVariant }]}>
                <Text style={[styles.remarkText, { color: theme.colors.onSurface }]}>{selected.remark}</Text>
              </View>
            ) : null}

            <Button
              mode="contained"
              onPress={() => setSelected(null)}
              style={styles.closeBtn}
            >
              Close
            </Button>
          </>
        )}
      </AppBottomSheet>
    </View>
  );
}

function MeetingCard({ item, theme }: any) {
  const colors: any = {
    pending: "#6366f1",
    ongoing: "#f59e0b",
    completed: "#16a34a",
  };

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.row}>
        <View style={styles.row}>
          <Avatar.Text
            size={40}
            label={item.employee[0]}
            style={{ marginRight: 10}}
          />
          <View>
            <Text variant="titleMedium">{item.client}</Text>
            <Text style={{ color: theme.colors.onSurfaceVariant }}>{item.employee}</Text>
          </View>
        </View>
        <Chip style={{ backgroundColor: colors[item.status] + "22" }}>
          {item.status}
        </Chip>
      </Card.Content>
    </Card>
  );
}

function Summary({ label, value, theme }: any) {
  return (
    <Card style={styles.summary}>
      <Card.Content>
        <Text style={{ color: theme.colors.onSurfaceVariant }}>{label}</Text>
        <Text style={{ fontSize: 18, fontWeight: "700" }}>{value}</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 12 },
  summaryRow: { flexDirection: "row", gap: 10, padding: 16 },
  summary: { flex: 1, borderRadius: 16 },
  search: { marginHorizontal: 16 },
  segment: { margin: 16 },
  card: { marginHorizontal: 16, marginTop: 12, borderRadius: 18 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sheetTitle: { fontSize: 18, fontWeight: "700", marginBottom: spacing.xs },
  sheetSubtitle: { marginBottom: spacing.sm },
  divider: { marginBottom: spacing.md },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  detailLabel: {},
  remarkBox: {
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.md,
  },
  remarkText: {},
  closeBtn: { marginTop: spacing.sm, borderRadius: 12 },
});
