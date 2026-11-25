import React, { useMemo, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  RefreshControl,
  Pressable,
  Linking,
  Platform,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import {
  Text,
  Searchbar,
  SegmentedButtons,
  Avatar,
  IconButton,
  Button,
  ActivityIndicator,
  useTheme,
  type MD3Theme,
} from "react-native-paper";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import { fetchHomeCollectionBookings } from "../../api/homeCollectionApi";
import type { Booking, BookingStatus } from "../../types/homeCollection";
import { BookingCard } from "../../components/homeCollection/BookingCard";

type DateTab = "today" | "upcoming" | "completed";
type FilterChip = "all" | "nearby" | "urgent" | "morning" | "evening";

function filterByDateTab(bookings: Booking[], tab: DateTab): Booking[] {
  const today = new Date().toISOString().slice(0, 10);
  switch (tab) {
    case "today":
      return bookings; // mock data is "today"; in real app filter by date
    case "upcoming":
      return bookings.filter(
        (b) => b.status !== "completed" && b.status !== "collected",
      );
    case "completed":
      return bookings.filter((b) => b.status === "completed");
    default:
      return bookings;
  }
}

function filterByChip(bookings: Booking[], chip: FilterChip): Booking[] {
  if (chip === "all") return bookings;
  if (chip === "nearby")
    return bookings
      .filter((b) => b.distanceKm != null)
      .sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0));
  if (chip === "urgent") return bookings.filter((b) => b.urgent);
  if (chip === "morning")
    return bookings.filter((b) => b.slotType === "morning");
  if (chip === "evening")
    return bookings.filter((b) => b.slotType === "evening");
  return bookings;
}

function filterBySearch(bookings: Booking[], query: string): Booking[] {
  if (!query.trim()) return bookings;
  const q = query.toLowerCase().trim();
  return bookings.filter(
    (b) =>
      b.patientName.toLowerCase().includes(q) || b.id.toLowerCase().includes(q),
  );
}

// --- Loading Skeleton ---
function BookingCardSkeleton({ theme }: { theme: MD3Theme }) {
  return (
    <View style={[skeletonStyles.card, { backgroundColor: theme.colors.surfaceVariant }]}>
      <View style={skeletonStyles.header}>
        <View style={[skeletonStyles.line, { width: 120, height: 18, backgroundColor: theme.colors.outline }]} />
        <View style={[skeletonStyles.line, { width: 80, height: 24, backgroundColor: theme.colors.outline }]} />
      </View>
      <View style={[skeletonStyles.line, { width: 100, height: 12, backgroundColor: theme.colors.outline }]} />
      <View style={[skeletonStyles.line, { width: "90%", height: 14, backgroundColor: theme.colors.outline }]} />
      <View style={[skeletonStyles.line, { width: 140, height: 12, backgroundColor: theme.colors.outline }]} />
      <View style={skeletonStyles.lineRow}>
        <View style={[skeletonStyles.line, { width: 60, backgroundColor: theme.colors.outline }]} />
        <View style={[skeletonStyles.line, { width: 80, backgroundColor: theme.colors.outline }]} />
      </View>
    </View>
  );
}

const skeletonStyles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  line: {
    height: 12,
    borderRadius: 4,
    marginBottom: 8,
  },
  lineRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 4,
  },
});

// --- Empty State ---
function EmptyBookings({ theme }: { theme: MD3Theme }) {
  return (
    <View style={emptyStyles.container}>
      <Text style={emptyStyles.icon}>📋</Text>
      <Text variant="titleMedium" style={emptyStyles.title}>
        No bookings found
      </Text>
      <Text variant="bodyMedium" style={[emptyStyles.sub, { color: theme.colors.onSurfaceVariant }]}>
        Your home collection list is empty for this filter.
      </Text>
    </View>
  );
}

const emptyStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  icon: { fontSize: 48, marginBottom: 16 },
  title: { fontWeight: "700", marginBottom: 8, textAlign: "center" },
  sub: { textAlign: "center" },
});

// --- Error State ---
function ErrorState({ theme, onRetry }: { theme: MD3Theme; onRetry: () => void }) {
  return (
    <View style={errorStyles.container}>
      <Text style={errorStyles.icon}>⚠️</Text>
      <Text variant="titleMedium" style={errorStyles.title}>
        Something went wrong
      </Text>
      <Text variant="bodyMedium" style={[errorStyles.sub, { color: theme.colors.onSurfaceVariant }]}>
        Could not load bookings. Please try again.
      </Text>
      <Button mode="contained" onPress={onRetry} style={errorStyles.btn}>
        Retry
      </Button>
    </View>
  );
}

const errorStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  icon: { fontSize: 48, marginBottom: 16 },
  title: { fontWeight: "700", marginBottom: 8, textAlign: "center" },
  sub: { textAlign: "center", marginBottom: 20 },
  btn: { borderRadius: 12 },
});

// --- Filter Chips ---
const CHIPS: { value: FilterChip; label: string }[] = [
  { value: "all", label: "All" },
  { value: "nearby", label: "Nearby" },
  { value: "urgent", label: "Urgent" },
  { value: "morning", label: "Morning" },
  { value: "evening", label: "Evening" },
];

export default function CollectionScreen() {
  const theme = useTheme();
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const [dateTab, setDateTab] = useState<DateTab>("today");
  const [filterChip, setFilterChip] = useState<FilterChip>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: bookings = [],
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["collectionBookings"],
    queryFn: fetchHomeCollectionBookings,
  });

  const filteredBookings = useMemo(() => {
    let list = filterByDateTab(bookings, dateTab);
    list = filterByChip(list, filterChip);
    list = filterBySearch(list, searchQuery);
    return list;
  }, [bookings, dateTab, filterChip, searchQuery]);

  const firstUpcoming = useMemo(
    () =>
      filteredBookings.find(
        (b) =>
          b.status !== "completed" &&
          b.status !== "collected" &&
          b.latitude != null &&
          b.longitude != null,
      ),
    [filteredBookings],
  );

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleUpdateStatus = useCallback(
    (booking: Booking, nextStatus: BookingStatus) => {
      queryClient.setQueryData<Booking[]>(
        ["collectionBookings"],
        (prev) =>
          prev?.map((b) =>
            b.id === booking.id ? { ...b, status: nextStatus } : b,
          ) ?? [],
      );
    },
    [queryClient],
  );

  const handleNotification = () => {
    (navigation as any).navigate?.("Updates");
  };

  if (isError) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Header
          theme={theme}
          dateTab={dateTab}
          onDateTabChange={setDateTab}
          onNotification={handleNotification}
        />
        <ErrorState theme={theme} onRetry={() => refetch()} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header
        theme={theme}
        dateTab={dateTab}
        onDateTabChange={setDateTab}
        onNotification={handleNotification}
      />

      <Searchbar
        placeholder="Search by patient name or booking ID"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={[styles.search, { backgroundColor: theme.colors.surface }]}
      />

      <View style={styles.chipRow}>
        {CHIPS.map(({ value, label }) => (
          <Pressable
            key={value}
            onPress={() => setFilterChip(value)}
            style={[
              styles.chip,
              { backgroundColor: theme.colors.surfaceVariant },
              filterChip === value && { backgroundColor: theme.colors.primary },
            ]}
          >
            <Text
              variant="labelMedium"
              style={[
                styles.chipLabel,
                { color: theme.colors.onSurfaceVariant },
                filterChip === value && { color: theme.colors.onPrimary },
              ]}
            >
              {label}
            </Text>
          </Pressable>
        ))}
      </View>

      {isLoading ? (
        <View style={styles.listWrap}>
          {[1, 2, 3, 4].map((i) => (
            <BookingCardSkeleton key={i} theme={theme} />
          ))}
        </View>
      ) : (
        <>
          <FlashList
            data={filteredBookings}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <BookingCard booking={item} onUpdateStatus={handleUpdateStatus} />
            )}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={<EmptyBookings theme={theme} />}
            refreshControl={
              <RefreshControl
                refreshing={isRefetching && !isLoading}
                onRefresh={handleRefresh}
                colors={[theme.colors.primary]}
              />
            }
          />
        </>
      )}
    </View>
  );
}

// --- Header ---
type HeaderProps = {
  theme: MD3Theme;
  dateTab: DateTab;
  onDateTabChange: (tab: DateTab) => void;
  onNotification: () => void;
};

function Header({ theme, dateTab, onDateTabChange, onNotification }: HeaderProps) {
  return (
    <View style={[headerStyles.wrap, { backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.outline }]}>
      <SegmentedButtons
        value={dateTab}
        onValueChange={(v) => onDateTabChange(v as DateTab)}
        buttons={[
          { value: "today", label: "Today" },
          { value: "upcoming", label: "Upcoming" },
          { value: "completed", label: "Completed" },
        ]}
        style={headerStyles.segment}
      />
    </View>
  );
}

const headerStyles = StyleSheet.create({
  wrap: {
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontWeight: "700",
    fontSize: 22,
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {},
  segment: {
    marginHorizontal: 0,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search: {
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  chipLabel: {
    fontWeight: "500",
  },
  listWrap: {
    paddingTop: 8,
    paddingBottom: 40,
  },
  listContent: {
    paddingBottom: 40,
    paddingTop: 8,
  },
  fab: {
    position: "absolute",
    bottom: 24,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 28,
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  fabText: {
    fontWeight: "700",
    fontSize: 15,
  },
});
