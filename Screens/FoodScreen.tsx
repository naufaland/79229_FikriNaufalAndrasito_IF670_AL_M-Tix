import React, { useState, useEffect } from "react";
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
  Dimensions,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const FoodScreen = ({ navigation }) => {
  const { width: screenWidth } = useWindowDimensions();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(false);

  // Simulate loading when changing categories
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [selectedCategory]);

  const foodCategories: {
    id: number;
    name: string;
    icon:
      | "grid-outline"
      | "fast-food-outline"
      | "beer-outline"
      | "pizza-outline"
      | "cafe-outline";
  }[] = [
    { id: 0, name: "All", icon: "grid-outline" },
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

  const filteredItems =
    selectedCategory === "All"
      ? foodItems
      : foodItems.filter((item) => item.category === selectedCategory);

  const renderFoodItem = ({ item, index }) => {
    const itemWidth = screenWidth > 600 ? "45%" : "100%";

    return (
      <View
        style={[
          styles.foodItem,
          { width: itemWidth, margin: screenWidth > 600 ? 10 : 0 },
        ]}
      >
        <Image source={item.image} style={styles.foodImage} />
        <View style={styles.foodInfo}>
          <View style={styles.foodDetails}>
            <Text style={styles.foodName} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.foodDescription} numberOfLines={2}>
              {item.description}
            </Text>
          </View>

          {/* Price and Add Button Row */}
          <View style={styles.priceAddRow}>
            <Text style={styles.foodPrice}>{item.price}</Text>
            <TouchableOpacity style={styles.addButton} activeOpacity={0.8}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={["#121212", "#001211", "#013d39", "#01665f"]}
      style={styles.gradientContainer}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.safeAreaTop} />
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#121212" barStyle="light-content" />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>m.food Menu</Text>
          <TouchableOpacity style={styles.cartButton} activeOpacity={0.7}>
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>2</Text>
            </View>
            <Ionicons name="cart-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}
          >
            {foodCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.name &&
                    styles.selectedCategoryButton,
                ]}
                activeOpacity={0.7}
                onPress={() => setSelectedCategory(category.name)}
              >
                <Ionicons
                  name={category.icon}
                  size={20}
                  color={
                    selectedCategory === category.name ? "#01665f" : "white"
                  }
                />
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category.name &&
                      styles.selectedCategoryText,
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Food List with Loading State */}
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4ECDC4" />
          </View>
        ) : (
          <FlatList
            data={filteredItems}
            renderItem={renderFoodItem}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.foodList}
            numColumns={screenWidth > 600 ? 2 : 1}
            key={screenWidth > 600 ? "grid" : "list"}
            columnWrapperStyle={screenWidth > 600 ? styles.foodGrid : undefined}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Ionicons name="fast-food-outline" size={50} color="#4ECDC4" />
                <Text style={styles.emptyText}>
                  No items found in this category
                </Text>
              </View>
            }
          />
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  safeAreaTop: {
    flex: 0,
    backgroundColor: "#121212",
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  cartButton: {
    padding: 8,
    position: "relative",
    borderRadius: 20,
  },
  cartBadge: {
    position: "absolute",
    right: 4,
    top: 4,
    backgroundColor: "#4ECDC4",
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  cartBadgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  categoriesContainer: {
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  categoriesScroll: {
    paddingHorizontal: 12,
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(51, 51, 51, 0.8)",
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 12,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  selectedCategoryButton: {
    backgroundColor: "#4ECDC4",
  },
  categoryText: {
    color: "white",
    marginLeft: 8,
    fontWeight: "500",
  },
  selectedCategoryText: {
    color: "#01665f",
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  foodList: {
    padding: 16,
    paddingBottom: 32,
  },
  foodGrid: {
    justifyContent: "space-between",
  },
  foodItem: {
    backgroundColor: "rgba(34, 34, 34, 0.8)",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  foodImage: {
    width: "100%",
    height: 140,
    resizeMode: "cover",
  },
  foodInfo: {
    padding: 16,
  },
  foodDetails: {
    marginBottom: 12,
  },
  foodName: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 6,
  },
  foodDescription: {
    color: "#bbb",
    fontSize: 13,
    marginBottom: 10,
    lineHeight: 18,
  },
  priceAddRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  foodPrice: {
    color: "#4ECDC4",
    fontSize: 15,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#4ECDC4",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  addButtonText: {
    color: "#01665f",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    color: "white",
    fontSize: 16,
    marginTop: 12,
  },
});

export default FoodScreen;
