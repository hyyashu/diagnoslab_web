import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { BaseModal } from "./BaseModal";
import { spacing } from "../../theme/constants";

type Props = {
  visible: boolean;
  onDismiss: () => void;
  title: string;
  children: React.ReactNode;
};

/**
 * Generic detail modal with a title header and scrollable content area.
 * Built on BaseModal — use this instead of writing one-off modals for
 * viewing entity details (leads, bookings, doctors, etc.).
 *
 * @example
 * <DetailModal visible={open} onDismiss={() => setOpen(false)} title="Lead Details">
 *   <Text>{lead.name}</Text>
 * </DetailModal>
 */
export function DetailModal({ visible, onDismiss, title, children }: Props) {
  return (
    <BaseModal visible={visible} onDismiss={onDismiss}>
      <Text variant="titleLarge" style={styles.title}>
        {title}
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
    </BaseModal>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "700",
    marginBottom: spacing.md,
  },
});
