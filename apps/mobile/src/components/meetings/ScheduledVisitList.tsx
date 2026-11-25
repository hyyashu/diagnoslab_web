import { FlashList } from "@shopify/flash-list";
import ScheduledVisitCard from "./ScheduledVisitCard";

/* Only `id` is needed here; ScheduledVisitCard reads the rest. */
type ScheduledVisit = { id: string | number };

export default function ScheduledVisitList<T extends ScheduledVisit>({
  data,
  onStart,
}: {
  data: T[];
  onStart: (visit: T) => void;
}) {
  return (
    <FlashList
      data={data}
      keyExtractor={(i) => String(i.id)}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <ScheduledVisitCard
          item={item}
          onStart={() => onStart(item)}
        />
      )}
      contentContainerStyle={{ paddingBottom: 40 }}
    />
  );
}
