import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { AppBottomSheet } from "../common/AppBottomSheet";
import { Text } from "react-native-paper";
import { type Lead, type LeadSource } from "./LeadCard";
import { colors } from "../../theme/constants";

function formatDate(iso: string | null): string {
  if (!iso) return "N/A";
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

/** Human-readable label for source keys (e.g. landing_page → Landing page) */
function sourceKeyLabel(key: string): string {
  return key
    .replace(/_/g, " ")
    .replace(/([A-Z])/g, " $1")
    .replace(/^\w/, (c) => c.toUpperCase())
    .trim();
}

function renderSource(source: LeadSource): React.ReactNode {
  if (source == null) return "N/A";
  if (typeof source === "string") return source.trim() || "—";
  const entries = Object.entries(source).filter(
    ([_, v]) => v != null && v !== ""
  );
  if (entries.length === 0) return "N/A";
  return (
    <View style={styles.sourceBlock}>
      {entries.map(([key, value]) => (
        <View key={key} style={styles.sourceRow}>
          <Text variant="labelSmall" style={styles.sourceLabel}>
            {sourceKeyLabel(key)}
          </Text>
          <Text variant="bodySmall" selectable numberOfLines={3}>
            {String(value)}
          </Text>
        </View>
      ))}
    </View>
  );
}

export default function LeadsDetailsModal({
  visible,
  onDismiss,
  lead,
}: {
  visible: boolean;
  onDismiss: () => void;
  lead: Lead | null;
}) {
  const display = (value: string | null) => value ?? "N/A";

  return (
    <AppBottomSheet
      visible={visible}
      onDismiss={onDismiss}
      snapPoints={["85%"]}
    >
      {lead ? (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.listWrap}>
            <Text variant="labelSmall" style={styles.label}>
              Name
            </Text>
            <Text variant="titleSmall">{display(lead.name)}</Text>
          </View>
          <View style={styles.listWrap}>
            <Text variant="labelSmall" style={styles.label}>
              Phone
            </Text>
            <Text variant="titleSmall">{display(lead.phone)}</Text>
          </View>
          <View style={styles.listWrap}>
            <Text variant="labelSmall" style={styles.label}>
              Email
            </Text>
            <Text variant="titleSmall">{display(lead.email)}</Text>
          </View>
          <View style={styles.listWrap}>
            <Text variant="labelSmall" style={styles.label}>
              Message
            </Text>
            <Text variant="titleSmall">{display(lead.message)}</Text>
          </View>
          <View style={styles.listWrap}>
            <Text variant="labelSmall" style={styles.label}>
              Status
            </Text>
            <Text variant="titleSmall">{display(lead.status)}</Text>
          </View>
          <View style={styles.listWrap}>
            <Text variant="labelSmall" style={styles.label}>
              Notes
            </Text>
            <Text variant="titleSmall">{display(lead.notes)}</Text>
          </View>
          <View style={styles.listWrap}>
            <Text variant="labelSmall" style={styles.label}>
              Source
            </Text>
            {renderSource(lead.source)}
          </View>
          <View style={styles.listWrap}>
            <Text variant="labelSmall" style={styles.label}>
              Welcome sent at
            </Text>
            <Text variant="titleSmall">
              {formatDate(lead.welcomeSentAt)}
            </Text>
          </View>
          <View style={styles.listWrap}>
            <Text variant="labelSmall" style={styles.label}>
              Created at
            </Text>
            <Text variant="titleSmall">{formatDate(lead.createdAt)}</Text>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.listWrap}>
          <Text>No lead selected</Text>
        </View>
      )}
    </AppBottomSheet>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 24 },
  listWrap: {
    paddingVertical: 12,
    marginBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  label: {
    opacity: 0.7,
    marginBottom: 4,
  },
  sourceBlock: {
    gap: 8,
  },
  sourceRow: {
    marginBottom: 6,
  },
  sourceLabel: {
    opacity: 0.8,
    marginBottom: 2,
  },
});
