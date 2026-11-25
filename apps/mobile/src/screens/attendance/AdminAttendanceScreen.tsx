import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";
import {
  Text,
  Card,
  Chip,
  Searchbar,
  SegmentedButtons,
  Avatar,
  Button,
  useTheme,
} from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const todayEmployees = [
  { id: "1", name: "Rahul Sharma", status: "present", time: "09:10 AM" },
  { id: "2", name: "Aman Kumar", status: "late", time: "10:05 AM" },
  { id: "3", name: "Riya Singh", status: "absent", time: "-" },
];

const history: any = {
  "2026-02-20": todayEmployees,
  "2026-02-19": [
    { id: "1", name: "Rahul Sharma", status: "absent", time: "-" },
    { id: "2", name: "Aman Kumar", status: "present", time: "09:00 AM" },
    { id: "3", name: "Riya Singh", status: "present", time: "09:15 AM" },
  ],
};

export default function AdminAttendanceScreen() {
  const theme = useTheme();
  const [mode, setMode] = useState("today");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);

  const dateKey = selectedDate.toISOString().slice(0, 10);
  const list = mode === "today" ? todayEmployees : history[dateKey] || [];

  const filtered = list.filter((e: any) => {
    const matchName = e.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || e.status === filter;
    return matchName && matchFilter;
  });

  const summary = {
    present: list.filter((e: any) => e.status === "present").length,
    late: list.filter((e: any) => e.status === "late").length,
    absent: list.filter((e: any) => e.status === "absent").length,
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      
      <SegmentedButtons
        value={mode}
        onValueChange={setMode}
        buttons={[
          { value: "today", label: "Today" },
          { value: "history", label: "History" },
        ]}
        style={styles.segment}
      />

      <View style={styles.topRow}>
        <Searchbar
          placeholder="Search employee..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchHalf}
        />

        {mode === "history" && (
          <Button
            mode="outlined"
            onPress={() => setCalendarOpen(true)}
            style={styles.dateHalf}
          >
            {selectedDate.toDateString()}
          </Button>
        )}
      </View>

      {mode === "today" && (
        <View style={styles.summaryRow}>
          <SummaryCard label="Present" value={summary.present} color="#16a34a" theme={theme} />
          <SummaryCard label="Late" value={summary.late} color="#f59e0b" theme={theme} />
          <SummaryCard label="Absent" value={summary.absent} color="#ef4444" theme={theme} />
        </View>
      )}

      <SegmentedButtons
        value={filter}
        onValueChange={setFilter}
        buttons={[
          { value: "all", label: "All" },
          { value: "present", label: "Present" },
          { value: "late", label: "Late" },
          { value: "absent", label: "Absent" },
        ]}
        style={styles.segment}
      />

      <FlashList
        data={filtered}
        keyExtractor={(i: any) => i.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <EmployeeCard item={item} theme={theme} />}
        contentContainerStyle={{ paddingBottom: 40 }}
      />

      <DateTimePickerModal
        isVisible={calendarOpen}
        mode="date"
        date={selectedDate}
        onConfirm={(date) => {
          setCalendarOpen(false);
          setSelectedDate(date);
        }}
        onCancel={() => setCalendarOpen(false)}
      />
    </View>
  );
}


function EmployeeCard({ item, theme }: any) {
  const colors: any = {
    present: "#16a34a",
    late: "#f59e0b",
    absent: "#ef4444",
  };

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.row}>
        <View style={styles.row}>
          <Avatar.Text
            size={42}
            label={item.name[0]}
            style={{ marginRight: 10 }}
          />

          <View>
            <Text variant="titleMedium">{item.name}</Text>
            <Text style={[styles.sub, { color: theme.colors.onSurfaceVariant }]}>Check-in: {item.time}</Text>
          </View>
        </View>

        <Chip style={{ backgroundColor: colors[item.status] + "22" }}>
          {item.status}
        </Chip>
      </Card.Content>
    </Card>
  );
}

function SummaryCard({ label, value, color, theme }: any) {
  return (
    <Card style={[styles.summaryCard, { borderTopColor: color }]}>
      <Card.Content>
        <Text style={[styles.summaryLabel, { color: theme.colors.onSurfaceVariant }]}>{label}</Text>
        <Text style={styles.summaryValue}>{value}</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 12 },
  segment: { margin: 16 },

  topRow:{
    flexDirection:"row",
    gap:10,
    paddingHorizontal:16,
    marginTop:20
  },
  searchHalf:{ flex:3, borderRadius:14 },
  dateHalf:{ flex:1, justifyContent:"center" },

  summaryRow: { flexDirection: "row", gap: 10, paddingHorizontal: 16 , marginTop: 20},
  summaryCard: { flex: 1, borderTopWidth: 4, borderRadius: 18 },
  summaryLabel: {},
  summaryValue: { fontSize: 22, fontWeight: "700" },
  card: { marginHorizontal: 16, marginTop: 12, borderRadius: 20 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  sub: { fontSize: 12 },
});