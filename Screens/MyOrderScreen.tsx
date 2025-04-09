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
import { LinearGradient } from "expo-linear-gradient";
import OrderHistoryButton from "../components/OrderHistoryButton";
import OrderFilter from "../components/OrderFilter";
import MovieContent from "../components/MovieContent";
import FoodContent from "../components/FoodContent";

interface MyOrderScreenProps {
  navigation: any;
}

const MyOrderScreen: React.FC<MyOrderScreenProps> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<"Movies" | "m.food">("Movies");

  const handleTabPress = (tab: "Movies" | "m.food") => {
    setActiveTab(tab);
  };

  const navigateToOrderHistory = () => {
    navigation.navigate("OrderHistoryScreen");
  };

  return (
    <LinearGradient
      colors={["#121212", "#001211", "#013d39", "#01665f"]}
      style={styles.gradientContainer}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#121212" barStyle="light-content" />
        <View style={styles.topSpacer} />

        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>My orders</Text>
          <OrderHistoryButton onPress={navigateToOrderHistory} />
        </View>

        {/* Section Title */}
        <Text style={styles.sectionTitle}>Active orders</Text>

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

        {activeTab === "Movies" ? (
          <MovieContent navigation={navigation} />
        ) : (
          <FoodContent navigation={navigation} />
        )}
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
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 10,
    marginBottom: 15,
  },
  filterContainer: {
    flexDirection: "row",
    marginBottom: 30,
  },
});

export default MyOrderScreen;
