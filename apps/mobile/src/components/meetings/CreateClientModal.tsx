import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, SegmentedButtons } from "react-native-paper";
import { BaseModal } from "../common/BaseModal";
import { FormField } from "../common/FormField";
import { spacing } from "../../theme/constants";

export default function CreateClientModal({
  visible,
  onDismiss,
  onCreate,
}: any) {
  const [name, setName] = useState("");
  const [type, setType] = useState("Doctor");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const valid = name.trim().length > 2;

  const handleSave = () => {
    if (!valid) return;

    const client = {
      id: Date.now().toString(),
      name,
      type,
      phone,
      notes,
    };

    onCreate(client);

    setName("");
    setPhone("");
    setNotes("");
    setType("Doctor");
  };

  return (
    <BaseModal visible={visible} onDismiss={onDismiss}>
      <FormField
        label="Client Name"
        value={name}
        onChangeText={setName}
        error={!valid && name.length > 0 ? "Enter a valid name" : undefined}
      />

      <SegmentedButtons
        value={type}
        onValueChange={setType}
        buttons={[
          { value: "Doctor", label: "Doctor" },
          { value: "Hospital", label: "Hospital" },
          { value: "Pharmacy", label: "Pharmacy" },
        ]}
        style={{ marginBottom: spacing.md }}
      />

      <FormField
        label="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <FormField
        label="Notes"
        value={notes}
        onChangeText={setNotes}
        multiline
        numberOfLines={3}
      />

      <View style={styles.actions}>
        <Button onPress={onDismiss}>Cancel</Button>
        <Button mode="contained" onPress={handleSave} disabled={!valid}>
          Create Client
        </Button>
      </View>
    </BaseModal>
  );
}

const styles = StyleSheet.create({
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: spacing.md,
    gap: spacing.md,
  },
});
