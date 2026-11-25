import { View, StyleSheet } from "react-native";
import { Text, Surface, useTheme } from "react-native-paper";

export default function SettingsSection({ title, children }: any) {
  const theme = useTheme();
  return (
    <View style={{ marginTop: 16 }}>
      <Text style={[styles.label, { color: theme.colors.onSurfaceVariant }]}>{title}</Text>

      <Surface style={styles.card}>
        {children}
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginLeft: 20,
    marginBottom: 8,
    fontSize: 12,
    fontWeight: "700",
  },
  card: {
    marginHorizontal: 16,
    borderRadius: 16,
    paddingHorizontal: 16,
  },
});
