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
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.carousel}
          >
            <View style={styles.carouselItem}>
              <Image
                source={require("../assets/MovieNight.png")}
                style={styles.bannerImage}
              />
            </View>
            <View style={styles.carouselItem}>
              <Image
                source={require("../assets/GrandOpening.png")}
                style={styles.bannerImage}
              />
            </View>
            <View style={styles.carouselItem}>
              <Image
                source={require("../assets/Coklat.png")}
                style={styles.bannerImage}
              />
            </View>
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

            <TouchableOpacity style={styles.navIconButton}>
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
              <MovieCard
                title="DEADPOOL"
                imageUrl={require("../assets/DeadPool.jpeg")}
                duration="2h 6m"
                rating="R18+"
                format="2D"
                isAdvance={true}
              />
              <MovieCard
                title="THE BATMAN"
                imageUrl={require("../assets/TheBatman.jpeg")}
                duration="2h 56m"
                rating="R13+"
                format="2D"
                isAdvance={true}
              />
              <MovieCard
                title="ROGUE ONE"
                imageUrl={require("../assets/RogueOne.jpeg")}
                duration="2h 13m"
                rating="PG-13"
                format="2D"
                isAdvance={false}
              />
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
              <UpcomingMovieCard
                title="A MINECRAFT MOVIE"
                imageUrl={require("../assets/MovieDummy.png")}
              />
              <UpcomingMovieCard
                title="ALARUM"
                imageUrl={require("../assets/MovieDummy.png")}
              />
              <UpcomingMovieCard
                title="ANAK MEDAL"
                imageUrl={require("../assets/MovieDummy.png")}
              />
              <UpcomingMovieCard
                title="MOVIE 4"
                imageUrl={require("../assets/MovieDummy.png")}
              />
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
              <Image
                source={require("../assets/MovieNight.png")}
                style={styles.promoImage}
              />
              <Image
                source={require("../assets/Coklat.png")}
                style={styles.promoImage}
              />
              <Image
                source={require("../assets/GrandOpening.png")}
                style={styles.promoImage}
              />
            </ScrollView>
          </View>

          {/* Food Order Card */}
          <View style={styles.foodOrderContainer}>
            <Text style={styles.foodOrderTitle}>
              Get tasty snacks at m.food
            </Text>

            <View style={styles.foodCard}>
              <View style={styles.foodCardTextContent}>
                <Text style={styles.foodCardTitle}>
                  Watch movies with tasty food & beverages!
                </Text>
                <TouchableOpacity
                  style={styles.orderFoodButton}
                  onPress={navigateToFood}
                >
                  <Text style={styles.orderFoodButtonText}>Order m.food</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.foodImageContainer}>
                <Image
                  source={require("../assets/mFood.jpg")}
                  style={styles.foodImage}
                  resizeMode="cover"
                />
              </View>
            </View>
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
              <StudioCard
                title="Deluxe Studio"
                description="Enjoy the movie experience with comfortable chairs at affordable prices."
                imageUrl="https://via.placeholder.com/280x150/330000/FF0000?text=DELUXE+STUDIO"
              />
              <StudioCard
                title="The Premier"
                description="Enjoy premium experience with luxurious reclining chairs."
                imageUrl="https://via.placeholder.com/280x150/330033/FF00FF?text=THE+PREMIER"
              />
              <StudioCard
                title="IMAX"
                description="Experience the ultimate movie experience with IMAX technology."
                imageUrl="https://via.placeholder.com/280x150/330066/0000FF?text=IMAX"
              />
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

// Movie Card Component
const MovieCard = ({
  title,
  imageUrl,
  duration,
  rating,
  format,
  isAdvance,
}) => {
  return (
    <View style={styles.movieCard}>
      {isAdvance && (
        <View style={styles.advanceTag}>
          <Text style={styles.advanceTagText}>Advance ticket sales</Text>
        </View>
      )}
      {typeof imageUrl === "string" ? (
        <Image source={{ uri: imageUrl }} style={styles.moviePoster} />
      ) : (
        <Image source={imageUrl} style={styles.moviePoster} />
      )}
      <Text style={styles.movieTitle} numberOfLines={1}>
        {title}
      </Text>

      {/* Revised movie details section with proper text display */}
      <View style={styles.movieDetailsContainer}>
        <Text style={styles.movieInfoText}>
          {duration} • {rating} • {format}
        </Text>
      </View>
    </View>
  );
};

// Upcoming Movie Card Component
const UpcomingMovieCard = ({ title, imageUrl }) => {
  return (
    <View style={styles.upcomingMovieCard}>
      {typeof imageUrl === "string" ? (
        <Image source={{ uri: imageUrl }} style={styles.upcomingMoviePoster} />
      ) : (
        <Image source={imageUrl} style={styles.upcomingMoviePoster} />
      )}
      <Text style={styles.upcomingMovieTitle} numberOfLines={2}>
        {title}
      </Text>
    </View>
  );
};

// Studio Card Component
const StudioCard = ({ title, description, imageUrl }) => {
  return (
    <View style={styles.studioCard}>
      <Image source={{ uri: imageUrl }} style={styles.studioImage} />
      <Text style={styles.studioTitle}>{title}</Text>
      <Text style={styles.studioDescription} numberOfLines={2}>
        {description}
      </Text>
      <TouchableOpacity style={styles.learnMoreButton}>
        <Text style={styles.learnMoreText}>Learn more</Text>
      </TouchableOpacity>
    </View>
  );
};

// Keep your existing styles
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
  movieCard: {
    width: 180,
    marginRight: 15,
    position: "relative",
    marginBottom: 10,
    height: 300,
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
    width: 180,
    height: 240,
    borderRadius: 10,
  },
  movieTitle: {
    color: "white",
    marginTop: 5,
    fontSize: 14,
    fontWeight: "500",
  },
  movieDetails: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "center",
    flexWrap: "nowrap", // Prevent wrapping
  },
  movieDuration: {
    color: "#888",
    fontSize: 12,
    marginRight: 4, // Reduce margin
  },
  movieDivider: {
    color: "#888",
    fontSize: 10,
    marginHorizontal: 2,
  },
  movieRating: {
    color: "#888",
    fontSize: 12,
    marginHorizontal: 4, // Use horizontal margin instead
    fontWeight: "bold",
  },
  movieFormat: {
    color: "#888",
    fontSize: 12,
  },
  movieDetailsContainer: {
    marginTop: 5,
    paddingHorizontal: 2,
  },
  movieInfoText: {
    color: "#888",
    fontSize: 12,
    lineHeight: 16,
  },
  upcomingMovieCard: {
    width: 150,
    marginRight: 15,
  },
  upcomingMoviePoster: {
    width: 150,
    height: 220,
    borderRadius: 10,
  },
  upcomingMovieTitle: {
    color: "white",
    marginTop: 5,
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
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
  foodCard: {
    backgroundColor: "#2A4E52",
    marginHorizontal: 15,
    borderRadius: 10,
    flexDirection: "row",
    height: 150,
    overflow: "hidden",
    position: "relative",
  },
  foodCardTextContent: {
    width: "60%",
    padding: 15,
    justifyContent: "center",
  },
  foodCardTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 15,
  },
  orderFoodButton: {
    backgroundColor: "white",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 15,
    alignSelf: "flex-start",
  },
  orderFoodButtonText: {
    fontWeight: "500",
  },
  foodImageContainer: {
    width: "40%",
    height: "100%",
    overflow: "hidden",
  },
  foodImage: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
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
  bottomNavigation: {
    flexDirection: "row",
    backgroundColor: "#1A1A1A",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  navItemText: {
    color: "#777",
    fontSize: 12,
    marginTop: 5,
  },
  activeNavText: {
    color: "#4ECDC4",
  },
});

export default HomeScreen;
