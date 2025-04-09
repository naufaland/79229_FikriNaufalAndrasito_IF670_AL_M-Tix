import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface OrderHistoryButtonProps {
  onPress: () => void;
}

const OrderHistoryButton: React.FC<OrderHistoryButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Order history</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#666666",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    marginRight: 5,
  },
});

export default OrderHistoryButton;
