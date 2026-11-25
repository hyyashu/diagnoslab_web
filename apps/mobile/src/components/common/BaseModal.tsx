import React from "react";
import { Portal, Modal, useTheme } from "react-native-paper";
import { radius, spacing } from "../../theme/constants";

type Props = {
  visible: boolean;
  onDismiss: () => void;
  children: React.ReactNode;
};

/**
 * Shared Portal + Modal wrapper with consistent sheet styling.
 * Use this for all app modals instead of duplicating contentContainerStyle.
 */
export function BaseModal({ visible, onDismiss, children }: Props) {
  const theme = useTheme();
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={{
          backgroundColor: theme.colors.surface,
          margin: spacing.xl,
          padding: spacing.xl,
          borderRadius: radius.xl,
        }}
      >
        {children}
      </Modal>
    </Portal>
  );
}
