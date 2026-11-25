import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

import UpdateList from "../../components/updates/UpdateList";
import UpdateDetailModal from "../../components/updates/UpdateDetailModal";
import { Update } from "../../types/update";
import { useNotificationStore } from "../../store/notificationStore";

export default function UpdatesScreen() {
  const theme = useTheme();
  const [selected, setSelected] = useState<Update | null>(null);
  const notifications = useNotificationStore((s) => s.notifications);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <UpdateList
        data={notifications}
        onSelect={setSelected}
      />

      <UpdateDetailModal
        selected={selected}
        onClose={() => setSelected(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
