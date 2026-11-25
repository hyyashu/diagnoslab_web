import { StyleSheet, View } from "react-native";
import { Card, Text, Button, Chip, useTheme } from "react-native-paper";

export default function ScheduledVisitCard({ item, onStart }: any) {
  const theme = useTheme();
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.name}>{item.client.name}</Text>

        <View style={styles.row}>
          <Chip>{item.client.type}</Chip>
          <Chip>{item.date}</Chip>
          <Chip>{item.time}</Chip>
        </View>

        <Text style={[styles.location, { color: theme.colors.onSurfaceVariant }]}>{item.location}</Text>

        <Button mode="contained" onPress={onStart} style={{ marginTop: 10 }}>
          Start Visit
        </Button>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 12, marginHorizontal: 16 },
  name: { fontSize: 16, fontWeight: "700" },
  row: { flexDirection: "row", gap: 8, marginTop: 8 },
  location: { marginTop: 8 },
});