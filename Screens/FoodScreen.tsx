import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const FoodScreen = ({ navigation }) => {
  const foodCategories: {
    id: number;
    name: string;
    icon:
      | "fast-food-outline"
      | "beer-outline"
      | "pizza-outline"
      | "cafe-outline";
  }[] = [
    { id: 1, name: "Combos", icon: "fast-food-outline" },
    { id: 2, name: "Popcorn", icon: "beer-outline" },
    { id: 3, name: "Snacks", icon: "pizza-outline" },
    { id: 4, name: "Beverages", icon: "cafe-outline" },
  ];

  const foodItems = [
    {
      id: 1,
      name: "Combo 1",
      description: "1 Large Popcorn + 2 Regular Soft Drinks",
      price: "Rp 85.000",
      image: require("../assets/mFood.jpg"),
      category: "Combos",
    },
    {
      id: 2,
      name: "Nachos",
      description: "Crispy nachos with cheese dip",
      price: "Rp 55.000",
      image: require("../assets/mFood.jpg"),
      category: "Snacks",
    },
    {
      id: 3,
      name: "Large Popcorn",
      description: "Caramel or Salty flavors",
      price: "Rp 50.000",
      image: require("../assets/mFood.jpg"),
      category: "Popcorn",
    },
    {
      id: 4,
      name: "Soft Drink",
      description: "Coca-Cola, Sprite, or Fanta",
      price: "Rp 30.000",
      image: require("../assets/mFood.jpg"),
      category: "Beverages",
    },
  ];

  const renderFoodItem = ({ item }) => (
    <View style={styles.foodItem}>
      <Image source={item.image} style={styles.foodImage} />
      <View style={styles.foodInfo}>
        <Text style={styles.foodName}>{item.name}</Text>
        <Text style={styles.foodDescription}>{item.description}</Text>
        <Text style={styles.foodPrice}>{item.price}</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={["#121212", "#001211", "#013d39", "#01665f"]}
      style={styles.gradientContainer}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#121212" barStyle="light-content" />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>m.food Menu</Text>
          <TouchableOpacity style={styles.cartButton}>
            <Ionicons name="cart-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {foodCategories.map((category) => (
              <TouchableOpacity key={category.id} style={styles.categoryButton}>
                <Ionicons name={category.icon} size={20} color="white" />
                <Text style={styles.categoryText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Food List */}
        <FlatList
          data={foodItems}
          renderItem={renderFoodItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.foodList}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 30 : 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  cartButton: {
    padding: 5,
  },
  categoriesContainer: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginLeft: 15,
    borderRadius: 20,
  },
  categoryText: {
    color: "white",
    marginLeft: 8,
  },
  foodList: {
    padding: 15,
  },
  foodItem: {
    flexDirection: "row",
    backgroundColor: "#222",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
  },
  foodImage: {
    width: 120,
    height: 120,
  },
  foodInfo: {
    flex: 1,
    padding: 15,
    justifyContent: "space-between",
  },
  foodName: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  foodDescription: {
    color: "#bbb",
    fontSize: 14,
    marginVertical: 5,
  },
  foodPrice: {
    color: "#4ECDC4",
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
  },
  addButton: {
    backgroundColor: "#4ECDC4",
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginTop: 5,
  },
  addButtonText: {
    color: "white",
    fontWeight: "500",
  },
});

export default FoodScreen;
