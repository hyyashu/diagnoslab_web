import { List } from "react-native-paper";

export default function SettingNavItem({
  title,
  icon,
  onPress,
  danger,
}: any) {
  return (
    <List.Item
      title={title}
      titleStyle={{ color: danger ? "red" : undefined }}
      left={(props) => <List.Icon {...props} icon={icon} />}
      right={(props) => <List.Icon {...props} icon="chevron-right" />}
      onPress={onPress}
    />
  );
}
