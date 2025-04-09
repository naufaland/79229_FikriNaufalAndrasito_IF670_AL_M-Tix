import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import LocationDrawer from "../components/LocationDrawer";

const CinemaScreen = () => {
  const navigation = useNavigation();
  const [selectedLocation, setSelectedLocation] = useState("TANGERANG");
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [sortOption, setSortOption] = useState("Alphabetical (A-Z)");
  const [sortDropdownVisible, setSortDropdownVisible] = useState(false);

  const handleOpenDrawer = () => {
    setDrawerVisible(true);
  };

  const handleCloseDrawer = () => {
    setDrawerVisible(false);
  };

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
    setDrawerVisible(false);
  };

  const toggleSortDropdown = () => {
    setSortDropdownVisible(!sortDropdownVisible);
  };

  const cinemas = [
    {
      id: 1,
      name: "AEON MALL BSD XXI",
      distance: "8.86 km",
      types: ["Cinema XXI", "The Premiere", "IMAX"],
    },
    {
      id: 2,
      name: "BANDARA CITY MALL XXI",
      distance: "19.8 km",
      types: ["Cinema XXI"],
    },
    {
      id: 3,
      name: "BINTARO XCHANGE 2 XXI",
      distance: "12.23 km",
      types: ["Cinema XXI", "The Premiere", "IMAX"],
    },
    {
      id: 4,
      name: "BINTARO XCHANGE XXI",
      distance: "12.03 km",
      types: ["Cinema XXI"],
    },
    {
      id: 5,
      name: "BINTARO XXI",
      distance: "13.22 km",
      types: ["Cinema XXI"],
    },
    {
      id: 6,
      name: "BSD XXI",
      distance: "5.13 km",
      types: ["Cinema XXI"],
    },
    {
      id: 7,
      name: "CBD CILEDUG XXI",
      distance: "10.17 km",
      types: ["Cinema XXI"],
    },
    {
      id: 8,
      name: "SUMMARECON MALL SERPONG XXI",
      distance: "2.50 km",
      types: ["Cinema XXI", "The Premiere", "IMAX"],
    },
    {
      id: 9,
      name: "TANGCITY MALL XXI",
      distance: "10.3 km",
      types: ["Cinema XXI"],
    },
    {
      id: 10,
      name: "THE BREEZE BSD XXI",
      distance: "15.5 km",
      types: ["Cinema XXI", "The Premiere", "IMAX"],
    },
  ];

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
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Cinema</Text>
          </View>

          {/* Location button */}
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.locationButton}
              onPress={handleOpenDrawer}
              activeOpacity={0.7}
            >
              <Ionicons name="location-sharp" size={20} color="white" />
              <Text style={styles.locationText}>{selectedLocation}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.favoriteButton}>
              <Ionicons name="star-outline" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.searchButton}>
              <Ionicons name="search" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sort option */}
        <TouchableOpacity
          style={styles.sortContainer}
          onPress={toggleSortDropdown}
        >
          <View style={styles.sortButton}>
            <Text style={styles.sortText}>{sortOption}</Text>
            <Ionicons
              name={sortDropdownVisible ? "chevron-up" : "chevron-down"}
              size={22}
              color="white"
            />
          </View>
        </TouchableOpacity>

        {/* Cinema List Content */}
        <ScrollView style={styles.content}>
          {cinemas.map((cinema) => (
            <View key={cinema.id} style={styles.cinemaItem}>
              <View style={styles.cinemaHeader}>
                <View style={styles.cinemaNameContainer}>
                  <Text style={styles.cinemaName}>{cinema.name}</Text>
                  <Text style={styles.cinemaDistance}>({cinema.distance})</Text>
                </View>
                <TouchableOpacity style={styles.favoriteIconButton}>
                  <Ionicons name="star-outline" size={22} color="#777" />
                </TouchableOpacity>
              </View>

              <View style={styles.cinemaTypes}>
                {cinema.types.map((type, index) => (
                  <View key={index} style={styles.cinemaTypeButton}>
                    <Text style={styles.cinemaTypeText}>{type}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>

        <LocationDrawer
          visible={drawerVisible}
          onClose={handleCloseDrawer}
          onSelectLocation={handleSelectLocation}
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
  },
  topSpacer: {
    height: Platform.OS === "ios" ? 10 : 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 15,
    marginTop: 30,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: 15,
    padding: 5,
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  locationButton: {
    flexDirection: "row",
    backgroundColor: "#333",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignItems: "center",
    marginRight: 8,
  },
  locationText: {
    color: "white",
    marginLeft: 5,
    fontWeight: "500",
  },
  favoriteButton: {
    marginRight: 8,
    padding: 4,
  },
  searchButton: {
    padding: 4,
  },
  sortContainer: {
    paddingHorizontal: 16,
    marginBottom: 5,
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  sortText: {
    color: "white",
    fontSize: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
  },
  cinemaItem: {
    backgroundColor: "#1a1a1a",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  cinemaHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  cinemaNameContainer: {
    flex: 1,
  },
  cinemaName: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  cinemaDistance: {
    color: "#999",
    fontSize: 14,
    marginTop: 2,
  },
  favoriteIconButton: {
    padding: 4,
  },
  cinemaTypes: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  cinemaTypeButton: {
    backgroundColor: "#333",
    borderRadius: 15,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  cinemaTypeText: {
    color: "white",
    fontSize: 12,
    fontStyle: "italic",
  },
});

export default CinemaScreen;
