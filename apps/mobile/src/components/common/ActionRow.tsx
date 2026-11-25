import React from "react";
import { View, StyleSheet } from "react-native";
import { IconButton, ActivityIndicator, useTheme } from "react-native-paper";

type Action = {
  icon: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
};

type Props = {
  actions: Action[];
};

/**
 * A row of icon buttons used at the bottom of cards (call, email, navigate, etc.).
 * Replaces the duplicated inline IconButton rows in LeadCard, BookingCard, etc.
 */
export function ActionRow({ actions }: Props) {
  const theme = useTheme();
  return (
    <View style={styles.row}>
      {actions.map((action, index) =>
        action.loading ? (
          <ActivityIndicator
            key={index}
            size={20}
            color={theme.colors.primary}
            style={styles.spinner}
          />
        ) : (
          <IconButton
            key={index}
            icon={action.icon}
            onPress={action.onPress}
            disabled={action.disabled}
          />
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  spinner: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
