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
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import LocationDrawer from "../components/LocationDrawer";
import MovieCard from "../components/MovieCard";
import UpcomingMovieCard from "../components/UpcomingMovieCard";
import StudioCard from "../components/StudioCard";
import FoodCard from "../components/FoodCart";

import { featuredMovies, comingSoonMovies } from "../data/moviesData";
import { studios } from "../data/studiosData";
import { carouselBanners, promos } from "../data/promosData";

const HomeScreen = ({ navigation }) => {
  const [selectedLocation, setSelectedLocation] = useState("JAKARTA");
  const [drawerVisible, setDrawerVisible] = useState(false);

  const handleOpenDrawer = () => {
    console.log("Opening drawer");
    setDrawerVisible(true);
  };

  const handleCloseDrawer = () => {
    console.log("Closing drawer");
    setDrawerVisible(false);
  };

  const handleSelectLocation = (location) => {
    console.log("Selected location:", location);
    setSelectedLocation(location);
    setDrawerVisible(false);
  };

  // Navigation handler for "See all" buttons
  const navigateToMovies = (initialTab = "nowPlaying") => {
    navigation.navigate("Movies", { initialTab });
  };

  const navigateToFood = () => {
    navigation.navigate("Food");
  };

  const navigateToCinema = () => {
    navigation.navigate("Cinema");
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
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/mtixNavbar.png")}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.locationSearch}>
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

        <ScrollView style={styles.scrollContent}>
          {/* Carousel banners */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.carousel}
          >
            {carouselBanners.map((banner) => (
              <View key={banner.id} style={styles.carouselItem}>
                <Image source={banner.imageSource} style={styles.bannerImage} />
              </View>
            ))}
          </ScrollView>

          {/* Navigation Icons */}
          <View style={styles.navIconsContainer}>
            <TouchableOpacity
              style={styles.navIconButton}
              onPress={() => navigateToMovies()}
            >
              <Ionicons name="film-outline" size={24} color="#4ECDC4" />
              <Text style={styles.navText}>Movies</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navIconButton}
              onPress={navigateToFood}
            >
              <Ionicons name="fast-food-outline" size={24} color="#FF6B6B" />
              <Text style={styles.navText}>m.food</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navIconButton}
              onPress={navigateToCinema}
            >
              <FontAwesome name="film" size={22} color="#FFD166" />
              <Text style={styles.navText}>Cinema</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navIconButton}>
              <MaterialIcons name="event-seat" size={24} color="#4ECDC4" />
              <Text style={styles.navText}>Private Booking</Text>
            </TouchableOpacity>
          </View>

          {/* Now Playing Section */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionTitleRow}>
              <Text style={styles.sectionTitle}>Now playing</Text>
              <TouchableOpacity onPress={() => navigateToMovies("nowPlaying")}>
                <View style={styles.seeAllButton}>
                  <Text style={styles.seeAllText}>See all</Text>
                  <Ionicons name="chevron-forward" size={16} color="#4ECDC4" />
                </View>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.movieCarousel}
            >
              {featuredMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  title={movie.title}
                  imageUrl={movie.imageSource}
                  duration={movie.duration}
                  rating={movie.rating}
                  format={movie.format}
                  isAdvance={movie.isAdvance}
                />
              ))}
            </ScrollView>
          </View>

          {/* Coming Soon Section */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionTitleRow}>
              <Text style={styles.sectionTitle}>Coming soon to XXI</Text>
              <TouchableOpacity onPress={() => navigateToMovies("comingSoon")}>
                <View style={styles.seeAllButton}>
                  <Text style={styles.seeAllText}>See all</Text>
                  <Ionicons name="chevron-forward" size={16} color="#4ECDC4" />
                </View>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.movieCarousel}
            >
              {comingSoonMovies.slice(0, 4).map((movie) => (
                <UpcomingMovieCard
                  key={movie.id}
                  title={movie.title}
                  imageUrl={movie.imageSource}
                />
              ))}
            </ScrollView>
          </View>

          {/* Promos Section */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionTitleRow}>
              <Text style={styles.sectionTitle}>Promos for a great time</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Promos")}>
                <View style={styles.seeAllButton}>
                  <Text style={styles.seeAllText}>See all</Text>
                  <Ionicons name="chevron-forward" size={16} color="#4ECDC4" />
                </View>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.promoCarousel}
            >
              {promos.map((promo) => (
                <Image
                  key={promo.id}
                  source={promo.imageSource}
                  style={styles.promoImage}
                />
              ))}
            </ScrollView>
          </View>

          {/* Food Order Card */}
          <View style={styles.foodOrderContainer}>
            <Text style={styles.foodOrderTitle}>
              Get tasty snacks at m.food
            </Text>
            <FoodCard onPress={navigateToFood} />
          </View>

          {/* Studios Experience Section */}
          <View style={styles.sectionContainer}>
            <Text style={[styles.sectionTitle, { marginBottom: 15 }]}>
              Experience our studios!
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.studioCarousel}
            >
              {studios.map((studio) => (
                <StudioCard
                  key={studio.id}
                  title={studio.title}
                  description={studio.description}
                  imageUrl={studio.imageUrl}
                />
              ))}
            </ScrollView>
          </View>

          {/* End of content indicator */}
          <View style={styles.endOfContent}>
            <Ionicons name="film-outline" size={20} color="#666" />
            <Text style={styles.endOfContentText}>That's all for now</Text>
          </View>
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
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoImage: {
    width: 120,
    height: 50,
  },
  locationSearch: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationButton: {
    flexDirection: "row",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#666",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
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
  scrollContent: {
    flex: 1,
    backgroundColor: "transparent",
  },
  carousel: {
    height: 150,
  },
  carouselItem: {
    marginRight: 2,
    borderRadius: 10,
    overflow: "hidden",
    marginLeft: 15,
  },
  bannerImage: {
    width: 350,
    height: 150,
    resizeMode: "cover",
  },
  movieCardRefund: {
    backgroundColor: "#66003A",
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 15,
    borderRadius: 10,
  },
  navIconsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  navIconButton: {
    alignItems: "center",
    backgroundColor: "#222",
    borderRadius: 20,
    width: 70,
    height: 60,
    justifyContent: "center",
  },
  navText: {
    color: "white",
    marginTop: 5,
    fontSize: 12,
    textAlign: "center",
  },
  sectionContainer: {
    marginVertical: 15,
    paddingHorizontal: 15,
  },
  sectionTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  seeAllText: {
    color: "#4ECDC4",
    marginRight: 5,
  },
  movieCarousel: {
    height: 300,
  },
  promoCarousel: {
    height: 150,
  },
  promoImage: {
    width: 280,
    height: 140,
    borderRadius: 10,
    marginRight: 15,
  },
  foodOrderContainer: {
    marginVertical: 15,
  },
  foodOrderTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  studioCarousel: {
    height: 280,
  },
  studioCard: {
    width: 280,
    marginRight: 15,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#222",
  },
  studioImage: {
    width: 280,
    height: 130,
  },
  studioTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    margin: 10,
  },
  studioDescription: {
    color: "#bbb",
    fontSize: 14,
    marginHorizontal: 10,
  },
  learnMoreButton: {
    backgroundColor: "white",
    marginHorizontal: 10,
    marginTop: 15,
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  learnMoreText: {
    fontWeight: "500",
  },
  endOfContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  endOfContentText: {
    color: "#666",
    marginLeft: 5,
  },
});

export default HomeScreen;
