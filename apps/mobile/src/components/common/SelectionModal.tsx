import { useState, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Searchbar, IconButton } from "react-native-paper";

import CreateClientModal from "../meetings/CreateClientModal";

type Props<T> = {
  data: T[];
  onFiltered: (items: T[]) => void;
  filterFn: (item: T, query: string) => boolean;
  onCreate?: (item: T) => void;
  placeholder?: string;
};

export default function SearchInput<T>({
  data,
  onFiltered,
  filterFn,
  onCreate,
  placeholder = "Search...",
}: Props<T>) {
  const [query, setQuery] = useState("");
  const [createOpen, setCreateOpen] = useState(false);

  const filtered = useMemo(() => {
    if (!query) return data;
    return data.filter((item) => filterFn(item, query));
  }, [query, data, filterFn]);

  const handleChange = (text: string) => {
    setQuery(text);
    if (!text) onFiltered(data);
    else onFiltered(filtered);
  };

  return (
    <>
      <View style={styles.row}>
        <Searchbar
          placeholder={placeholder}
          value={query}
          onChangeText={handleChange}
          style={styles.search}
        />

        <IconButton
          icon="plus"
          mode="contained"
          onPress={() => setCreateOpen(true)}
        />
      </View>

      {/* ⭐ Create client modal */}
      <CreateClientModal
        visible={createOpen}
        onDismiss={() => setCreateOpen(false)}
        onCreate={(client: any) => {
          onCreate?.(client);
          setCreateOpen(false);
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  search: {
    flex: 1,
  },
});
