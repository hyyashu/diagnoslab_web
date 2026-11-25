import React from "react";
import { StyleSheet } from "react-native";
import { List } from "react-native-paper";

type Props = {
  icon: string;
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  onPress?: () => void;
};

/**
 * Consistent List row with a leading icon, title, optional subtitle, and optional right element.
 * Standardises SettingNavItem, SettingSwitchItem, and ad-hoc List.Item usage.
 */
export function ListItemRow({ icon, title, subtitle, right, onPress }: Props) {
  return (
    <List.Item
      title={title}
      description={subtitle}
      left={(props) => <List.Icon {...props} icon={icon} />}
      right={right ? () => right as React.ReactElement : undefined}
      onPress={onPress}
      style={styles.item}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    paddingVertical: 4,
  },
});
