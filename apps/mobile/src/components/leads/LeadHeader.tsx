import React from "react";
import { StyleSheet } from "react-native";
import { Text, Searchbar, FAB } from "react-native-paper";

type Props = {
  search: string;
  onChange: (value: string) => void;
};

export const LeadsHeader = ({ search, onChange }: Props) => {
  return (
    <>


      <Searchbar
        placeholder="Search leads..."
        value={search}
        onChangeText={onChange}
        style={styles.search}
      />
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
    fontWeight: "700",
  },
  search: {
    marginTop: 20,
    marginHorizontal: 16,
    marginBottom: 16,
  },
});
