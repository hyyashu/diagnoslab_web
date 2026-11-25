import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Card, TextInput, Button, Menu, Chip, Divider } from "react-native-paper";
import { leadStatusValues } from "@diagno/schemas";

type LeadStatus = (typeof leadStatusValues)[number];

/* What the form edits. Field names match the API (`phone`, not `number`)
   so a lead created here keeps its phone number. */
export type LeadFormValues = {
  name: string;
  phone: string;
  email: string;
  message: string;
  source: string;
  status: LeadStatus;
};

type LeadFormProps = {
  initialValues: LeadFormValues;
  onSubmit: (data: LeadFormValues) => void;
  submitLabel: string;
  submitting?: boolean;
};

/* The API only accepts these statuses (see @diagno/schemas). */
const statusLabels: Record<LeadStatus, string> = {
  new: "New",
  no_answer: "No answer",
  contacted: "Contacted",
  booked: "Booked",
  completed: "Completed",
  lost: "Lost",
  spam: "Spam",
};
const sourceOptions = ["Walk-in", "Phone call", "WhatsApp", "Referral", "Website"];

const LeadForm = ({ initialValues, onSubmit, submitLabel, submitting }: LeadFormProps) => {
  const [form, setForm] = useState<LeadFormValues>(initialValues);
  const [statusMenuVisible, setStatusMenuVisible] = useState(false);
  const [sourceMenuVisible, setSourceMenuVisible] = useState(false);

  const handleChange = <K extends keyof LeadFormValues>(key: K, value: LeadFormValues[K]) => {
    setForm({ ...form, [key]: value });
  };

  return (
    <View style={styles.container}>
      <Card.Content>
        <TextInput
          label="Full Name"
          value={form.name}
          onChangeText={(v) => handleChange("name", v)}
          style={styles.input}
        />

        <TextInput
          label="Phone Number"
          value={form.phone}
          onChangeText={(v) => handleChange("phone", v)}
          keyboardType="phone-pad"
          style={styles.input}
        />

        <TextInput
          label="Email (optional)"
          value={form.email}
          onChangeText={(v) => handleChange("email", v)}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />

        <TextInput
          label="Message"
          value={form.message}
          onChangeText={(v) => handleChange("message", v)}
          multiline
          numberOfLines={4}
          style={styles.input}
        />

        <Divider style={styles.divider} />

        <Menu
          visible={sourceMenuVisible}
          onDismiss={() => setSourceMenuVisible(false)}
          anchor={
            <Chip onPress={() => setSourceMenuVisible(true)} style={styles.chip}>
              Source: {form.source}
            </Chip>
          }
        >
          {sourceOptions.map((option) => (
            <Menu.Item
              key={option}
              title={option}
              onPress={() => {
                handleChange("source", option);
                setSourceMenuVisible(false);
              }}
            />
          ))}
        </Menu>

        <Menu
          visible={statusMenuVisible}
          onDismiss={() => setStatusMenuVisible(false)}
          anchor={
            <Chip onPress={() => setStatusMenuVisible(true)} style={styles.chip}>
              Status: {statusLabels[form.status]}
            </Chip>
          }
        >
          {leadStatusValues.map((option) => (
            <Menu.Item
              key={option}
              title={statusLabels[option]}
              onPress={() => {
                handleChange("status", option);
                setStatusMenuVisible(false);
              }}
            />
          ))}
        </Menu>

        <Divider style={styles.divider} />

        <Button mode="contained" onPress={() => onSubmit(form)} loading={submitting} disabled={submitting}>
          {submitLabel}
        </Button>
      </Card.Content>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
  },
  input: {
    marginBottom: 12,
  },
  divider: {
    marginVertical: 12,
  },
  chip: {
    marginBottom: 10,
  },
});

export default LeadForm;
