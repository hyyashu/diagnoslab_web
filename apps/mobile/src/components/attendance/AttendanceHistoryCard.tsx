import React from "react";
import { StyleSheet } from "react-native";
import { Card, Text, List, Chip, Divider } from "react-native-paper";
import { colors } from "../../theme/constants";

type HistoryItem = {
  day: string;
  date: string;
  status: string;
  time: string;
};

type Props = {
  history: HistoryItem[];
};

export const AttendanceHistoryCard = ({ history }: Props) => {
  return (
    <>
      <Text
        variant="titleMedium"
        style={styles.sectionTitle}
      >
        Past 7 Days
      </Text>

      <Card style={styles.card} mode="contained">
        {history.map((item, index) => (
          <React.Fragment key={item.date}>
            <List.Item
              title={`${item.day}, ${item.date}`}
              description={item.time}
              right={() => (
                <Chip compact style={styles.chip}>
                  {item.status}
                </Chip>
              )}
            />
            {index !== history.length - 1 && (
              <Divider />
            )}
          </React.Fragment>
        ))}
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    marginLeft: 16,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "700",
  },
  card: {
    marginHorizontal: 16,
    borderRadius: 20,
  },
  chip: {
    backgroundColor: colors.status.completed,
    color: "#ffffff",
  },
});
