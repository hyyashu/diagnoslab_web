import { Card, Text, Chip, useTheme } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { Update } from "../../types/update";

export default function UpdateCard({
  item,
  onPress,
}: {
  item: Update;
  onPress: () => void;
}) {
  const theme = useTheme();
  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Content>

        <View style={styles.row}>
          <Text variant="titleMedium">{item.title}</Text>
          <Chip compact>{item.category}</Chip>
        </View>

        <Text style={[styles.time, { color: theme.colors.onSurfaceVariant }]}>{item.time}</Text>
        <Text numberOfLines={2}>{item.desc}</Text>

      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { margin: 16, borderRadius: 18 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  time: { marginVertical: 6 },
});
