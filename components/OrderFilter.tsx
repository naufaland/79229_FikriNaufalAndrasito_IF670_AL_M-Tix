import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface OrderFilterProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
}

const OrderFilter: React.FC<OrderFilterProps> = ({
  label,
  isActive,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.filter,
        isActive ? styles.activeFilter : styles.inactiveFilter,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.filterText,
          isActive ? styles.activeFilterText : styles.inactiveFilterText,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  filter: {
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 50,
    marginRight: 10,
  },
  activeFilter: {
    backgroundColor: "#FFF",
  },
  inactiveFilter: {
    backgroundColor: "rgba(50, 50, 50, 0.8)",
  },
  filterText: {
    fontSize: 16,
    fontWeight: "500",
  },
  activeFilterText: {
    color: "#000",
  },
  inactiveFilterText: {
    color: "#FFF",
  },
});

export default OrderFilter;
