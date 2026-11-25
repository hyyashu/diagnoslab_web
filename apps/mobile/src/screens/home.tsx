import React from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "react-native-paper";
import { GreetingCard } from "../components/dashboard/GreetingCard";
import { LeadStats } from "../components/dashboard/LeadStats";
import { RecentLeads } from "../components/dashboard/RecentLeads";
import { ErrorState, LoadingState } from "../components/common";
import { useLeads } from "../query/lead";

/* Dashboard: greeting, today's lead numbers and the newest leads. Only real
   data from the API; attendance and other unfinished features are left out. */
const Home = () => {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const { data, isLoading, isRefetching, error, refetch } = useLeads();
  const leads = Array.isArray(data?.data) ? data.data : [];

  return (
    <SafeAreaView edges={["bottom"]} style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
      >
        <GreetingCard />
        {isLoading ? (
          <View style={styles.loading}>
            <LoadingState variant="skeleton" count={3} />
          </View>
        ) : error ? (
          <ErrorState message={error.message} onRetry={refetch} />
        ) : (
          <>
            <LeadStats leads={leads} />
            <RecentLeads leads={leads} onSeeAll={() => navigation.navigate("Leads")} />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  loading: { minHeight: 300 },
});

export default Home;
