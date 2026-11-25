import { Modal, View, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { Button, useTheme } from "react-native-paper";

export default function CalendarModal({
  visible,
  onClose,
  date,
  onSelect,
}: any) {
  const theme = useTheme();
  const key = date.toISOString().slice(0, 10);

  return (
    <Modal visible={visible} animationType="slide">
      <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
        <Calendar
          current={key}
          onDayPress={(d: any) => {
            onSelect(new Date(d.dateString));
            onClose();
          }}
          markedDates={{
            [key]: {
              selected: true,
              selectedColor: theme.colors.primary,
            },
          }}
          theme={{
            todayTextColor: theme.colors.primary,
            arrowColor: theme.colors.primary,
          }}
        />

        <Button onPress={onClose} style={{ marginTop: 20 }}>
          Close
        </Button>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
});