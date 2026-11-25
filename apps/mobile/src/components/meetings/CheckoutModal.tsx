import { StyleSheet, View } from "react-native";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { AppBottomSheet } from "../common/AppBottomSheet";
import { Button, HelperText } from "react-native-paper";
import { spacing, radius, colors } from "../../theme/constants";

export default function CheckoutModal({
  visible,
  onDismiss,
  desc,
  setDesc,
  onSave,
}: any) {
  const hasError = !desc.trim();

  return (
    <AppBottomSheet
      visible={visible}
      onDismiss={onDismiss}
      snapPoints={["50%"]}
    >
      <View style={styles.content}>
        <BottomSheetTextInput
          placeholder="Remark"
          value={desc}
          onChangeText={setDesc}
          multiline
          style={[styles.input, hasError && styles.inputError]}
          placeholderTextColor={colors.textMuted}
        />

        <HelperText type="error" visible={hasError}>
          Description is required
        </HelperText>

        <Button mode="contained" onPress={onSave} disabled={hasError}>
          Save Visit
        </Button>
      </View>
    </AppBottomSheet>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    minHeight: 100,
    fontSize: 16,
    textAlignVertical: "top",
    marginTop: spacing.md,
    flex: 1,
  },
  inputError: {
    borderColor: colors.status.cancelled,
  },
});
