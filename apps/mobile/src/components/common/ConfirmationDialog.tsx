import React from "react";
import { Dialog, Portal, Text, Button } from "react-native-paper";

type Props = {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  /** "contained" for normal confirm, "contained-tonal" for danger actions */
  confirmMode?: "contained" | "contained-tonal";
  onConfirm: () => void;
  onDismiss: () => void;
};

/**
 * Reusable confirmation dialog (uses Paper Dialog, not Modal).
 * Use for logout, checkout, and any destructive action.
 */
export function ConfirmationDialog({
  visible,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  confirmMode = "contained",
  onConfirm,
  onDismiss,
}: Props) {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{message}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>{cancelLabel}</Button>
          <Button mode={confirmMode} onPress={onConfirm}>
            {confirmLabel}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
