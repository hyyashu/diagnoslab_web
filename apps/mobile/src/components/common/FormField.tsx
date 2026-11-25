import React from "react";
import { StyleSheet } from "react-native";
import { TextInput, HelperText } from "react-native-paper";
import { spacing } from "../../theme/constants";

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: "default" | "email-address" | "phone-pad" | "numeric";
  secureTextEntry?: boolean;
  placeholder?: string;
};

/**
 * TextInput (outlined) + HelperText error row.
 * Replaces the duplicated TextInput + HelperText pattern in modals.
 */
export function FormField({
  label,
  value,
  onChangeText,
  error,
  multiline,
  numberOfLines,
  keyboardType = "default",
  secureTextEntry,
  placeholder,
}: Props) {
  return (
    <>
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        mode="outlined"
        multiline={multiline}
        numberOfLines={numberOfLines}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        error={!!error}
        style={styles.input}
      />
      <HelperText type="error" visible={!!error}>
        {error}
      </HelperText>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: spacing.xs,
  },
});
