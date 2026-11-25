import React from "react";
import { Linking, Pressable, StyleSheet, View } from "react-native";
import { Avatar, IconButton, Text, useTheme } from "react-native-paper";
import type { Lead } from "../leads/LeadCard";
import { initials } from "../../utils/initials";
import { radius, spacing } from "../../theme/constants";

function timeAgo(iso: string) {
  const mins = Math.max(0, Math.round((Date.now() - Date.parse(iso)) / 60000));
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours} h ago`;
  const days = Math.round(hours / 24);
  return days === 1 ? "Yesterday" : `${days} days ago`;
}

/* What the lead asked for, from the keys the website puts in `source`
   (apps/website/src/lib/leadMeta.ts and the call-back forms). */
function interest(lead: Lead) {
  const s = lead.source;
  if (s && typeof s === "object") {
    return s.test_name || s.package_name || s.radiology_name || s.contact_topic || s.channel || null;
  }
  return typeof s === "string" ? s : null;
}

type Props = { leads: Lead[]; onSeeAll: () => void };

/* The newest leads, with a one-tap call button. */
export function RecentLeads({ leads, onSeeAll }: Props) {
  const theme = useTheme();
  const recent = [...leads].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)).slice(0, 5);

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text variant="titleMedium" style={styles.title}>
          Latest leads
        </Text>
        <Pressable onPress={onSeeAll} hitSlop={8}>
          <Text variant="labelLarge" style={{ color: theme.colors.primary }}>
            See all
          </Text>
        </Pressable>
      </View>

      {recent.length === 0 ? (
        <Text style={{ color: theme.colors.onSurfaceVariant, paddingHorizontal: spacing.lg }}>No leads yet.</Text>
      ) : (
        <View style={[styles.list, { backgroundColor: theme.colors.surfaceVariant }]}>
          {recent.map((lead, i) => {
            const what = interest(lead);
            return (
              <View
                key={lead.id}
                style={[styles.row, i > 0 && { borderTopWidth: 1, borderTopColor: theme.colors.outlineVariant }]}
              >
                <Avatar.Text size={36} label={initials(lead.name)} />
                <View style={styles.info}>
                  <Text variant="titleSmall" numberOfLines={1}>
                    {lead.name?.trim() || "No name"}
                  </Text>
                  <Text variant="bodySmall" numberOfLines={1} style={{ color: theme.colors.onSurfaceVariant }}>
                    {[what, timeAgo(lead.createdAt)].filter(Boolean).join(" · ")}
                  </Text>
                </View>
                {lead.phone?.trim() ? (
                  <IconButton
                    icon="phone"
                    mode="contained"
                    size={18}
                    accessibilityLabel={`Call ${lead.name ?? "lead"}`}
                    onPress={() => Linking.openURL(`tel:${lead.phone}`)}
                  />
                ) : null}
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { paddingTop: spacing.sm, paddingBottom: spacing.xl },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  title: { fontWeight: "600" },
  list: { marginHorizontal: spacing.lg, borderRadius: radius.md, overflow: "hidden" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingLeft: spacing.md,
    paddingVertical: spacing.sm,
  },
  info: { flex: 1, gap: 2 },
});
