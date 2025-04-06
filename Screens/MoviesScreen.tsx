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
  Platform,
  FlatList,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import LocationDrawer from "../components/LocationDrawer";
import { useNavigation } from "@react-navigation/native";

const MoviesScreen = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState("nowPlaying");
  const [selectedLocation, setSelectedLocation] = useState("JAKARTA");
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Sample movie data - in a real app, this would come from an API
  const nowPlayingMovies = [
    {
      id: 1,
      title: "PABRIK GULA UNGU",
      imageUrl:
        "https://via.placeholder.com/180x250/121212/FF0000?text=PABRIK+GULA+UNGU",
      duration: "2h 13m",
      rating: "D21+",
      format: "2D",
      isAdvance: true,
    },
    {
      id: 2,
      title: "ANIMATION MOVIE",
      imageUrl:
        "https://via.placeholder.com/180x250/121212/4ECDC4?text=ANIMATION+MOVIE",
      duration: "1h 50m",
      rating: "SU",
      format: "2D",
      isAdvance: true,
    },
    {
      id: 3,
      title: "ACTION MOVIE",
      imageUrl:
        "https://via.placeholder.com/180x250/121212/FFD166?text=ACTION+MOVIE",
      duration: "2h 05m",
      rating: "R13+",
      format: "2D",
      isAdvance: false,
    },
    {
      id: 4,
      title: "COMEDY FILM",
      imageUrl:
        "https://via.placeholder.com/180x250/121212/FF69B4?text=COMEDY+FILM",
      duration: "1h 45m",
      rating: "SU",
      format: "2D",
      isAdvance: false,
    },
    {
      id: 5,
      title: "HORROR NIGHT",
      imageUrl:
        "https://via.placeholder.com/180x250/121212/800080?text=HORROR+NIGHT",
      duration: "1h 58m",
      rating: "D17+",
      format: "2D",
      isAdvance: true,
    },
    {
      id: 6,
      title: "SCI-FI ADVENTURE",
      imageUrl:
        "https://via.placeholder.com/180x250/121212/00FFFF?text=SCI-FI+ADVENTURE",
      duration: "2h 20m",
      rating: "R13+",
      format: "2D",
      isAdvance: false,
    },
  ];

  const comingSoonMovies = [
    {
      id: 7,
      title: "A MINECRAFT MOVIE",
      imageUrl:
        "https://via.placeholder.com/150x220/0A0A0A/FFFFFF?text=MINECRAFT",
      releaseDate: "Coming Sep 15",
    },
    {
      id: 8,
      title: "ALARUM",
      imageUrl: "https://via.placeholder.com/150x220/0A0A0A/FFFFFF?text=ALARUM",
      releaseDate: "Coming Sep 20",
    },
    {
      id: 9,
      title: "ANAK MEDAL",
      imageUrl:
        "https://via.placeholder.com/150x220/0A0A0A/FFFFFF?text=ANAK+MEDAL",
      releaseDate: "Coming Oct 5",
    },
    {
      id: 10,
      title: "FUTURE BLOCKBUSTER",
      imageUrl:
        "https://via.placeholder.com/150x220/0A0A0A/FFFFFF?text=FUTURE+BLOCKBUSTER",
      releaseDate: "Coming Oct 12",
    },
  ];

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

  const renderNowPlayingMovie = ({ item }) => (
    <TouchableOpacity
      style={styles.movieCard}
      //   onPress={() => navigation.navigate("MovieDetail", { movieId: item.id })}
    >
      <View style={styles.movieCardContainer}>
        {item.isAdvance && (
          <View style={styles.advanceTag}>
            <Text style={styles.advanceTagText}>Advance ticket sales</Text>
          </View>
        )}
        <Image source={{ uri: item.imageUrl }} style={styles.moviePoster} />
        <Text style={styles.movieTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <View style={styles.movieDetails}>
          <Text style={styles.movieDuration}>{item.duration}</Text>
          <Text style={styles.movieRating}>{item.rating}</Text>
          <Text style={styles.movieFormat}>{item.format}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderComingSoonMovie = ({ item }) => (
    <TouchableOpacity
      style={styles.movieCard}
      //   onPress={() => navigation.navigate("MovieDetail", { movieId: item.id })}
    >
      <View style={styles.movieCardContainer}>
        <Image source={{ uri: item.imageUrl }} style={styles.moviePoster} />
        <View style={styles.releaseDateContainer}>
          <Text style={styles.releaseDateText}>{item.releaseDate}</Text>
        </View>
        <Text style={styles.movieTitle} numberOfLines={1}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
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

        {/* Header */}
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
              selectedTab === "nowPlaying" && styles.activeTabButton,
            ]}
            onPress={() => setSelectedTab("nowPlaying")}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === "nowPlaying" && styles.activeTabText,
              ]}
            >
              Now Playing
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === "comingSoon" && styles.activeTabButton,
            ]}
            onPress={() => setSelectedTab("comingSoon")}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === "comingSoon" && styles.activeTabText,
              ]}
            >
              Coming Soon
            </Text>
          </TouchableOpacity>
        </View>

        {/* Movie Grid */}
        <FlatList
          data={
            selectedTab === "nowPlaying" ? nowPlayingMovies : comingSoonMovies
          }
          renderItem={
            selectedTab === "nowPlaying"
              ? renderNowPlayingMovie
              : renderComingSoonMovie
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
  },
  movieCardContainer: {
    position: "relative",
  },
  advanceTag: {
    position: "absolute",
    top: 10,
    left: 0,
    backgroundColor: "#4ECDC4",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    zIndex: 1,
  },
  advanceTagText: {
    color: "white",
    fontSize: 10,
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
    bottom: 10,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  releaseDateText: {
    backgroundColor: "rgba(78, 205, 196, 0.8)", // #4ECDC4 with opacity
    color: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    fontSize: 12,
    fontWeight: "500",
  },
});

export default MoviesScreen;
