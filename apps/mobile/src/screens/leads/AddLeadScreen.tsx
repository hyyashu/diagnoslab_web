import React from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import type { AdminCreateLeadInput } from "@diagno/schemas";
import LeadForm, { type LeadFormValues } from "../../components/leads/LeadForm";
import { useCreateLead } from "../../query/lead";

const emptyLead: LeadFormValues = {
  name: "",
  phone: "",
  email: "",
  message: "",
  source: "Walk-in",
  status: "new",
};

/* Opened in a bottom sheet from the leads list, so it closes through
   `onDismiss` rather than navigation. */
export default function AddLeadScreen({ onDismiss }: { onDismiss: () => void }) {
  const theme = useTheme();
  const createLead = useCreateLead();

  const handleCreate = (form: LeadFormValues) => {
    if (!form.name.trim() || !form.phone.trim()) {
      Alert.alert("Missing details", "Enter the name and phone number.");
      return;
    }
    /* Leave out empty fields: the API rejects an empty email. */
    const lead: AdminCreateLeadInput = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      ...(form.email.trim() && { email: form.email.trim() }),
      ...(form.message.trim() && { message: form.message.trim() }),
      source: { channel: form.source, added_from: "staff_app" },
      status: form.status,
    };
    createLead.mutate(lead, {
      onSuccess: onDismiss,
      onError: (e) => Alert.alert("Could not save the lead", e.message),
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LeadForm
          initialValues={emptyLead}
          onSubmit={handleCreate}
          submitLabel="Create Lead"
          submitting={createLead.isPending}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
  },
});
