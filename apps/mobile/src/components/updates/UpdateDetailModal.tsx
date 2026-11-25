import { Text, Chip, Button, useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";
import { Update } from "../../types/update";
import { AppBottomSheet } from "../common/AppBottomSheet";
import { spacing } from "../../theme/constants";

export default function UpdateDetailModal({
  selected,
  onClose,
}: {
  selected: Update | null;
  onClose: () => void;
}) {
  const theme = useTheme();
  return (
    <AppBottomSheet visible={!!selected} onDismiss={onClose} snapPoints={["60%"]}>
      {selected && (
        <>
          <Text variant="headlineSmall">{selected.title}</Text>

          <Chip style={styles.chip}>{selected.category}</Chip>

          <Text style={[styles.time, { color: theme.colors.onSurfaceVariant }]}>{selected.time}</Text>

          <Text style={styles.desc}>{selected.desc}</Text>

          <Button mode="contained" onPress={onClose} style={styles.btn}>
            Close
          </Button>
        </>
      )}
    </AppBottomSheet>
  );
}

const styles = StyleSheet.create({
  chip: { marginVertical: spacing.sm, alignSelf: "flex-start" },
  time: { marginVertical: spacing.sm },
  desc: { marginTop: spacing.sm, lineHeight: 22 },
  btn: { marginTop: spacing.xl, borderRadius: 12 },
});
