import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";
import { clients as initialClients } from "../../data/clients";
import { useState } from "react";
import { AppBottomSheet } from "../common/AppBottomSheet";
import SearchInput from "../common/SelectionModal";

export default function ClientPickerModal({
  visible,
  onDismiss,
  onSelect,
}: any) {
  const [allClients, setAllClients] = useState(initialClients);
  const [filteredClients, setFilteredClients] = useState(initialClients);



  return (
    <AppBottomSheet
      visible={visible}
      onDismiss={onDismiss}
      snapPoints={["85%"]}
    >
      {/* Search + Create client */}
      <SearchInput
        data={allClients}
        filterFn={(c: any, q: string) =>
          c.name.toLowerCase().includes(q.toLowerCase())
        }
        onFiltered={(items: any) => setFilteredClients(items)}
        onCreate={(client: any) => {
          setAllClients((prev: any) => [client, ...prev]);
          setFilteredClients((prev: any) => [client, ...prev]);
          onSelect(client);
          onDismiss();
        }}
        placeholder="Search client..."
      />




      <View style={styles.listWrap}>
        <FlashList
          data={filteredClients}
          keyExtractor={(item: any) => item.id}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <Button
              mode="outlined"
              style={styles.item}
              onPress={() => {
                onSelect(item);
                onDismiss();
              }}
            >
              {item.name}
            </Button>
          )}
        />
      </View>
    </AppBottomSheet>
  );
}

const styles = StyleSheet.create({
  listWrap: {
    height: 600,
  },
  item: {
    marginBottom: 8,
  },
});
