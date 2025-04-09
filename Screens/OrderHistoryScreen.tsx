import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import OrderFilter from "../components/OrderFilter";
import MovieContent from "../components/MovieContent";
import FoodContent from "../components/FoodContent";
import HistoryFilterDrawer from "../components/HistoryFilterDrawer";

const OrderHistoryScreen: React.FC = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<"Movies" | "m.food">("Movies");
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("This month");

  const handleTabPress = (tab: "Movies" | "m.food") => {
    setActiveTab(tab);
  };

  const toggleFilterDrawer = () => {
    setShowFilterDrawer(!showFilterDrawer);
  };

  const handleSelectFilter = (filter: string) => {
    setSelectedFilter(filter);
    setShowFilterDrawer(false);
  };

  return (
    <LinearGradient
      colors={["#121212", "#001211", "#013d39", "#01665f"]}
      style={styles.gradientContainer}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#121212" />
        <View style={styles.topSpacer} />

        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.titleContainer}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Order history</Text>
          </View>

          <TouchableOpacity
            style={styles.filterButton}
            onPress={toggleFilterDrawer}
          >
            <Text style={styles.filterButtonText}>Show: {selectedFilter}</Text>
          </TouchableOpacity>
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterContainer}>
          <OrderFilter
            label="Movies"
            isActive={activeTab === "Movies"}
            onPress={() => handleTabPress("Movies")}
          />
          <OrderFilter
            label="m.food"
            isActive={activeTab === "m.food"}
            onPress={() => handleTabPress("m.food")}
          />
        </View>

        {/* Content based on active tab */}
        {activeTab === "Movies" ? (
          <MovieContent navigation={navigation} />
        ) : (
          <FoodContent navigation={navigation} />
        )}

        {/* Filter Drawer Component */}
        <HistoryFilterDrawer
          isVisible={showFilterDrawer}
          selectedFilter={selectedFilter}
          onClose={toggleFilterDrawer}
          onSelectFilter={handleSelectFilter}
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
    backgroundColor: "transparent",
    paddingHorizontal: 20,
  },
  topSpacer: {
    height: Platform.OS === "ios" ? 10 : 25,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: 10,
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
  },
  filterButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#666",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  filterButtonText: {
    color: "#FFF",
    fontSize: 12,
  },
  filterContainer: {
    flexDirection: "row",
    marginVertical: 20,
  },
});

export default OrderHistoryScreen;
