import { useState } from "react";
import { SectionList, View, StyleSheet, Pressable } from "react-native";
import { Card, Text, Avatar } from "react-native-paper";
import VisitDetailsModal from "./VisitDetailsModal";

/* -------- helpers -------- */

const getSectionTitle = (dateString: string) => {
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return "Other";

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isSame = (a: Date, b: Date) =>
    a.toDateString() === b.toDateString();

  if (isSame(d, today)) return "Today";
  if (isSame(d, yesterday)) return "Yesterday";

  return d.toDateString();
};

const groupVisits = (visits: any[]) => {
  const map: any = {};

  visits.forEach((v) => {
    const key = getSectionTitle(v.date);
    if (!map[key]) map[key] = [];
    map[key].push(v);
  });

  return Object.keys(map).map((title) => ({
    title,
    data: map[title],
  }));
};

/* -------- component -------- */

export default function VisitHistoryList({ visits, formatTime }: any) {
  const sections = groupVisits(visits);

  const [selected, setSelected] = useState<any>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}

        renderSectionHeader={({ section }) => (

          <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          </View>
        )}

        renderItem={({ item }) => {
          const ongoing = !item.checkOut;

          return (
            <Pressable
              onPress={() => {
                setSelected(item);
                setOpen(true);
              }}
            >
              <Card style={styles.card} mode="elevated">
                <Card.Content>

                  {/* HEADER */}
                  <View style={styles.headerRow}>
                    <Avatar.Text
                      size={42}
                      label={item.name?.[0] || "C"}
                      style={styles.avatar}
                    />

                    <View style={{ flex: 1 }}>
                      <Text variant="titleMedium">{item.name}</Text>
                      <Text style={styles.type}>{item.type}</Text>
                    </View>
                  </View>

                  {/* TIME */}
                  <View style={styles.timeRow}>
                    {item.checkIn && (
                      <View style={styles.timeBox}>
                        <Text style={styles.timeLabel}>Check In</Text>
                        <Text style={styles.timeValue}>
                          {formatTime(item.checkIn)}
                        </Text>
                      </View>
                    )}

                    {item.checkOut && (
                      <View style={styles.timeBox}>
                        <Text style={styles.timeLabel}>Check Out</Text>
                        <Text style={styles.timeValue}>
                          {formatTime(item.checkOut)}
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* DURATION */}
                  <View style={styles.durationBox}>
                    <Text style={styles.durationText}>
                      ⏱ {item.duration || "-"}
                    </Text>
                  </View>

                  {/* REMARK */}
                  {item.remark && (
                    <View style={styles.remarkBox}>
                      <Text style={styles.remarkText}>{item.remark}</Text>
                    </View>
                  )}

                </Card.Content>
              </Card>
            </Pressable>
          );
        }}
      />

      {/* ⭐ Details modal */}
      <VisitDetailsModal
        visible={open}
        onDismiss={() => setOpen(false)}
        visit={selected}
        formatTime={formatTime}
      />
    </>
  );
}

/* -------- styles -------- */

const styles = StyleSheet.create({
  sectionTitleContainer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginLeft: 0,
  },
  sectionTitle: {
    marginLeft: 0,
    marginTop: 0,
    marginBottom: 0,
    fontSize: 16,
    fontWeight: "700",
  },

  card: {
    marginHorizontal: 16,
    marginBottom: 14,
    borderRadius: 22,
    elevation: 2,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  avatar: {
    marginRight: 10,
  },

  type: {
    fontSize: 12,
  },

  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  timeBox: {
    padding: 10,
    borderRadius: 12,
    width: "48%",
  },

  timeLabel: {
    fontSize: 11,
  },

  timeValue: {
    fontWeight: "700",
    fontSize: 14,
  },

  durationBox: {
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 8,
  },

  durationText: {
    fontWeight: "700",
  },

  remarkBox: {
    padding: 12,
    borderRadius: 14,
  },

  remarkText: {
  },
});