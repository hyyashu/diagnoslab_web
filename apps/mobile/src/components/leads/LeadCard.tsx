import { initials as getInitials } from "../../utils/initials";
import React from "react";
import { StyleSheet, View, Linking, TouchableOpacity } from "react-native";
import { Text, Avatar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { StatusBadge } from "../common/StatusBadge";
import { radius, spacing } from "../../theme/constants";
import { useTheme } from "react-native-paper";


export type LeadResponse = {
  data: Lead;
};

/** API can return source as a string or as a dynamic object e.g. { landing_page, referrer, testName, clicked_at, testPageUrl } */
export type LeadSource = string | null | Record<string, string | null | undefined>;

export type Lead = {
  id: number;
  name: string | null;
  phone: string | null;
  email: string | null;
  message: string | null;
  source: LeadSource;
  status: string | null;
  notes: string | null;
  welcomeSentAt: string | null;
  createdAt: string;
};

type Props = {
  lead: Lead;
  onPress: () => void;
};


// function getStatusStyle(status: string | null): { bg: string; text: string } {
//   switch (status?.toLowerCase()) {
//     case "new":
//       return { bg: "#dbeafe", text: "#1d4ed8" };
//     case "contacted":
//       return { bg: "#fef3c7", text: "#b45309" };
//     case "converted":
//       return { bg: "#dcfce7", text: "#15803d" };
//     case "lost":
//       return { bg: "#fee2e2", text: "#b91c1c" };
//     default:
//       return { bg: "#f1f5f9", text: "#475569" };
//   }
// }


function resolveSource(source: LeadSource): string | null {
  if (source == null) return null;
  if (typeof source === "string") return source.trim() || null;
  const first = Object.values(source)[0];
  return first != null && first !== "" ? String(first) : null;
}

export const LeadCard = ({ lead, onPress = () => {} }: Props) => {
  const displayName = lead.name && lead.name.trim() !== "" ? lead.name : "N/A";
  const initials = getInitials(lead.name);
  // const statusStyle = statusBadge.getStatusStyle(lead.status);
  const theme = useTheme();
  const handleCall = () => {
    if (lead.phone) Linking.openURL(`tel:${lead.phone}`);
  };

  const handleEmail = () => {
    if (lead.email) Linking.openURL(`mailto:${lead.email}`);
  };

  const handleWhatsapp = () => {
    if (lead.phone) Linking.openURL(`https://wa.me/${lead.phone}`);
  };


  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* Header */}
      <View style={styles.header}>
        <Avatar.Text
          size={44}
          label={initials}
         
          labelStyle={styles.avatarLabel}
        />

        <View style={styles.headerInfo}>
          <Text variant="titleSmall" style={styles.name}>
            {displayName}
          </Text>
         
        </View>

        <StatusBadge status={lead.status ?? "—"}  colorMap={{ new: "#6366f1", no_answer: "#b45309", contacted: "#7c3aed", booked: "#16a34a", completed: "#15803d", lost: "#b91c1c", spam: "#71717a" }} labelMap={{ new: "New", no_answer: "No answer", contacted: "Contacted", booked: "Booked", completed: "Completed", lost: "Lost", spam: "Spam" }}/>
      </View>

     

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.dateRow}>
          <Ionicons name="time-outline" size={12} color={theme.colors.onSurfaceVariant} />
          <Text variant="labelSmall" style={[styles.dateText, { color: theme.colors.onSurfaceVariant }]}>
            {new Date(lead.createdAt).toLocaleDateString()}
          </Text>
        </View>

        <View style={styles.actions}>
          {lead.phone && lead.phone.trim() !== "" && (
            <TouchableOpacity style={styles.actionBtn} onPress={handleCall}>
              <Ionicons name="call-outline" size={20} color="blue" />
              <Text style={styles.actionLabel}>Call</Text>
            </TouchableOpacity>
          )}

<TouchableOpacity style={styles.actionBtn} onPress={handleWhatsapp}>
              <Ionicons name="logo-whatsapp" size={20} color="green" />
              <Text style={styles.actionLabel}>Whatsapp</Text>
            </TouchableOpacity>
          {lead.email && lead.email.trim() !== "" && (
            <TouchableOpacity style={styles.actionBtn} onPress={handleEmail}>
              <Ionicons name="mail" size={20} color={theme.colors.onSurfaceVariant} />
              <Text style={styles.actionLabel}>Email</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
  
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
   
    gap: spacing.md,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },

  
  avatarLabel: {
    fontWeight: "700",
    fontSize: 15,
  },
  headerInfo: {
    flex: 1,
    gap: 3,
  },
  name: {
    fontWeight: "700",
 
  },
  sourceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  sourceText: {

  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  contactBlock: {
    gap: 5,
    paddingLeft: 2,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  contactText: {
   
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: spacing.xs,
    borderTopWidth: 1,
   
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  dateText: {
 
  },
  actions: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,

    paddingHorizontal: spacing.sm,
    paddingVertical: 5,
    borderRadius: radius.full,
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: "600",

  },
});
