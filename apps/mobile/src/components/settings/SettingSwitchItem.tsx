import { View, StyleSheet } from "react-native";
import { Text, Switch, useTheme } from "react-native-paper";

export default function SettingSwitchItem({
  title,
  subtitle,
  value,
  onToggle,
}: any) {
  const theme = useTheme();
  return (
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <Text variant="titleMedium">{title}</Text>
        <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
          {subtitle}
        </Text>
      </View>

      <Switch value={value} onValueChange={onToggle} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
});
