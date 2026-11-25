import React from "react";
import { View, StyleSheet } from "react-native";
import { Searchbar, SegmentedButtons, useTheme } from "react-native-paper";
import { spacing, radius } from "../../theme/constants";

type FilterButton = {
  value: string;
  label: string;
};

type Props = {
  searchValue: string;
  onSearchChange: (text: string) => void;
  placeholder?: string;
  filters?: FilterButton[];
  selectedFilter?: string;
  onFilterChange?: (value: string) => void;
};

/**
 * Searchbar + optional SegmentedButtons filter row.
 * Used on Leads, HomeCollectionBookings, AdminMeeting, AdminAttendance screens.
 */
export function SearchFilterBar({
  searchValue,
  onSearchChange,
  placeholder = "Search…",
  filters,
  selectedFilter,
  onFilterChange,
}: Props) {
  const theme = useTheme();
  return (
    <View style={styles.wrap}>
      <Searchbar
        placeholder={placeholder}
        value={searchValue}
        onChangeText={onSearchChange}
        style={[styles.searchbar, { backgroundColor: theme.colors.surface }]}
      />
      {filters && onFilterChange ? (
        <SegmentedButtons
          value={selectedFilter ?? filters[0]?.value ?? ""}
          onValueChange={onFilterChange}
          buttons={filters}
          style={styles.segment}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    gap: spacing.md,
  },
  searchbar: {
    borderRadius: radius.md,
  },
  segment: {
    marginHorizontal: 0,
  },
});
