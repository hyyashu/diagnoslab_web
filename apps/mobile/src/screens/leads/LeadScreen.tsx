import React, { useState, useMemo } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { FAB, useTheme } from "react-native-paper";
import { LeadsHeader } from "../../components/leads/LeadHeader";
import { LeadCard, Lead } from "../../components/leads/LeadCard";
import { useLeads } from "../../query/lead";
import { LoadingState, ErrorState, EmptyState } from "../../components/common";
import LeadsDetailsModal from "../../components/leads/LeadsDetailsModal";
import { useNavigation } from "@react-navigation/native";
import AddLeadScreen from "./AddLeadScreen";
import { AppBottomSheet } from "../../components/common/AppBottomSheet";

const LeadsScreen = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const { data, isLoading, error, refetch } = useLeads();
  const theme = useTheme();
  /* Newest first, even if the API sends them in another order. */
  const leads: Lead[] = useMemo(
    () =>
      (Array.isArray(data?.data) ? [...data.data] : []).sort(
        (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt) || b.id - a.id,
      ),
    [data],
  );

  const filteredLeads = useMemo(() => {
    if (!search.trim()) return leads;
    const q = search.toLowerCase().trim();
    return leads.filter(
      (l) =>
        l.name?.toLowerCase().includes(q) ||
        l.email?.toLowerCase().includes(q) ||
        l.phone?.toLowerCase().includes(q),
    );
  }, [leads, search]);

  if (isLoading) return <LoadingState variant="skeleton" count={4} />;
  if (error) return <ErrorState message={error.message} onRetry={refetch} />;

  return (
    <>
      <FlashList
      style={[styles.container, { backgroundColor: theme.colors.background }]}
        ListHeaderComponent={
          <LeadsHeader search={search} onChange={setSearch} />
        }
        data={filteredLeads}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <LeadCard
            lead={item}
            onPress={() => {
              setSelectedLead(item);
              setShowDetailsModal(true);
            }}
          />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          <EmptyState
            icon="📋"
            title="No leads found"
            subtitle={
              search
                ? "Try a different search term."
                : "Leads will appear here once added."
            }
          />
        }
      />

      <FAB icon="plus" style={styles.fab} onPress={() => setShowAddLeadModal(true)} />

      <AppBottomSheet visible={showAddLeadModal} onDismiss={() => setShowAddLeadModal(false)} snapPoints={["85%"]}>
        <AddLeadScreen onDismiss={() => setShowAddLeadModal(false)} />
      </AppBottomSheet>
      <LeadsDetailsModal
        visible={showDetailsModal}
        onDismiss={() => setShowDetailsModal(false)}
        lead={selectedLead}
      
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 30,
  },
});

export default LeadsScreen;
