import React, { useState } from "react";
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
import LocationDrawer from "../components/LocationDrawer";

import { nowPlayingMovies, comingSoonMovies } from "../data/moviesData";

const MoviesScreen = ({ navigation, route }) => {
  const [selectedLocation, setSelectedLocation] = useState("JAKARTA");
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(
    route.params?.initialTab || "nowPlaying"
  );

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

  const renderNowPlayingMovieItem = ({ item }) => (
    <View style={styles.movieCard}>
      {item.isAdvance && (
        <View style={styles.advanceTag}>
          <Text style={styles.advanceTagText}>Advance ticket sales</Text>
        </View>
      )}
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={styles.moviePoster} />
      ) : (
        <Image source={item.imageSource} style={styles.moviePoster} />
      )}
      <Text style={styles.movieTitle} numberOfLines={2}>
        {item.title}
      </Text>
      <View style={styles.movieDetails}>
        <Text style={styles.movieDuration}>{item.duration}</Text>
        <Text style={styles.movieRating}>{item.rating}</Text>
        <Text style={styles.movieFormat}>{item.format}</Text>
      </View>
    </View>
  );

  const renderComingSoonMovieItem = ({ item }) => (
    <View style={styles.movieCard}>
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={styles.moviePoster} />
      ) : (
        <Image source={item.imageSource} style={styles.moviePoster} />
      )}
      <View style={styles.releaseDateContainer}>
        <Text style={styles.releaseDateText}>{item.releaseDate}</Text>
      </View>
      <Text style={styles.movieTitle} numberOfLines={2}>
        {item.title}
      </Text>
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
        <View style={styles.topSpacer} />

        {/* Fixed Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Movies</Text>
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.locationButton}
              onPress={handleOpenDrawer}
              activeOpacity={0.7}
            >
              <Ionicons name="location-sharp" size={20} color="white" />
              <Text style={styles.locationText}>{selectedLocation}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.searchButton}>
              <Ionicons name="search" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Filter Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "nowPlaying" && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab("nowPlaying")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "nowPlaying" && styles.activeTabText,
              ]}
            >
              Now Playing
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "comingSoon" && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab("comingSoon")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "comingSoon" && styles.activeTabText,
              ]}
            >
              Coming Soon
            </Text>
          </TouchableOpacity>
        </View>

        {/* Movie Grid */}
        <FlatList
          data={
            activeTab === "nowPlaying" ? nowPlayingMovies : comingSoonMovies
          }
          renderItem={
            activeTab === "nowPlaying"
              ? renderNowPlayingMovieItem
              : renderComingSoonMovieItem
          }
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.movieRow}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.movieListContainer}
        />

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
    height: Platform.OS === "ios" ? 10 : 25,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: "transparent",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },
  locationText: {
    color: "white",
    marginLeft: 5,
    fontWeight: "500",
  },
  searchButton: {
    padding: 5,
  },
  tabsContainer: {
    flexDirection: "row",
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: "#333",
  },
  activeTabButton: {
    backgroundColor: "#4ECDC4",
  },
  tabText: {
    color: "#CCC",
    fontWeight: "500",
  },
  activeTabText: {
    color: "white",
  },
  movieListContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 20,
  },
  movieRow: {
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  movieCard: {
    width: "48%",
    marginBottom: 20,
    position: "relative",
  },
  advanceTag: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#4ECDC4",
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    zIndex: 1,
  },
  advanceTagText: {
    color: "white",
    fontSize: 8,
    fontWeight: "500",
  },
  moviePoster: {
    width: "100%",
    height: 240,
    borderRadius: 10,
  },
  movieTitle: {
    color: "white",
    marginTop: 8,
    fontSize: 14,
    fontWeight: "500",
  },
  movieDetails: {
    flexDirection: "row",
    marginTop: 5,
  },
  movieDuration: {
    color: "#888",
    fontSize: 12,
    marginRight: 8,
  },
  movieRating: {
    color: "#888",
    fontSize: 12,
    marginRight: 8,
    fontWeight: "bold",
  },
  movieFormat: {
    color: "#888",
    fontSize: 12,
  },
  releaseDateContainer: {
    position: "absolute",
    bottom: 250,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  releaseDateText: {
    backgroundColor: "rgba(78, 205, 196, 0.8)",
    color: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    fontSize: 12,
    fontWeight: "500",
  },
});

export default MoviesScreen;
