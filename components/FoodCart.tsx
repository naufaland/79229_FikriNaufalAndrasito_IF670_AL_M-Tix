import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

interface FoodCardProps {
  onPress: () => void;
}

const FoodCard = ({ onPress }: FoodCardProps) => {
  return (
    <View style={styles.foodCard}>
      <LinearGradient
        colors={["rgba(42, 78, 82, 0.9)", "rgba(42, 78, 82, 1)"]}
        style={styles.foodCardGradient}
      />
      <View style={styles.foodCardTextContent}>
        <Text style={styles.foodCardTitle}>
          Tasty food & beverages for your movie!
        </Text>
        <TouchableOpacity
          style={styles.orderFoodButton}
          onPress={onPress}
          activeOpacity={0.8}
        >
          <Text style={styles.orderFoodButtonText}>Order m.food</Text>
          <Ionicons name="arrow-forward" size={14} color="#2A4E52" />
        </TouchableOpacity>
      </View>
      <View style={styles.foodImageContainer}>
        <Image
          source={require("../assets/mFood.jpg")}
          style={styles.foodImage}
        />
        <View style={styles.foodImageOverlay} />
        <View style={styles.iconOverlay}>
          <Ionicons name="fast-food" size={28} color="#FF6B6B" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  foodCard: {
    marginHorizontal: 15,
    borderRadius: 16,
    flexDirection: "row",
    height: 140,
    overflow: "hidden",
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  foodCardGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  foodCardTextContent: {
    width: "58%",
    padding: 16,
    justifyContent: "space-between",
  },
  foodCardTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 22,
  },
  orderFoodButton: {
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
  },
  orderFoodButtonText: {
    color: "#2A4E52",
    fontWeight: "600",
    marginRight: 4,
    fontSize: 14,
  },
  foodImageContainer: {
    width: "42%",
    height: "100%",
    overflow: "hidden",
    position: "relative",
  },
  foodImageOverlay: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "100%",
    backgroundColor: "rgba(42, 78, 82, 0.8)",
  },
  iconOverlay: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  foodImage: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
});

export default FoodCard;
