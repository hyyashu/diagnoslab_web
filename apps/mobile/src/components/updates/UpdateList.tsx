import { FlashList } from "@shopify/flash-list";
import UpdateCard from "./UpdateCard";
import { Update } from "../../types/update";
import { EmptyState } from "../common";

export default function UpdateList({
  data,
  onSelect,
}: {
  data: Update[];
  onSelect: (u: Update) => void;
}) {
  return (
    <FlashList
      data={data}
      keyExtractor={(i) => i.id.toString()}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <UpdateCard item={item} onPress={() => onSelect(item)} />
      )}
      ListEmptyComponent={
        <EmptyState icon="🔔" title="No updates yet" />
      }
    />
  );
}
