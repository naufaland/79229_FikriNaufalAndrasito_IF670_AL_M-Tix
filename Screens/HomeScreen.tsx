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

const HomeScreen = () => {
  const [selectedLocation, setSelectedLocation] = useState("JAKARTA");
  const [drawerVisible, setDrawerVisible] = useState(false);

  const handleOpenDrawer = () => {
    console.log("Opening drawer"); // Add this for debugging
    setDrawerVisible(true);
  };

  const handleCloseDrawer = () => {
    console.log("Closing drawer"); // Add this for debugging
    setDrawerVisible(false);
  };

  const handleSelectLocation = (location) => {
    console.log("Selected location:", location); // Add this for debugging
    setSelectedLocation(location);
    setDrawerVisible(false);
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
              activeOpacity={0.7} // Add this for better touch feedback
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
          {/* Carousel for Snow White */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.carousel}
          >
            <View style={styles.carouselItem}>
              <Image
                source={{
                  uri: "https://via.placeholder.com/350x150/660066/FFFFFF?text=Snow+White+Merchandise",
                }}
                style={styles.bannerImage}
              />
            </View>
            <View style={styles.carouselItem}>
              <Image
                source={{
                  uri: "https://via.placeholder.com/350x150/660066/FFFFFF?text=Snow+White+Movie",
                }}
                style={styles.bannerImage}
              />
            </View>
            <View style={styles.carouselItem}>
              <Image
                source={{
                  uri: "https://via.placeholder.com/350x150/660066/FFFFFF?text=Ramadan+Special",
                }}
                style={styles.bannerImage}
              />
            </View>
          </ScrollView>

          {/* Rest of your code remains the same */}
          {/* Movie Card Refund */}
          <View style={styles.movieCardRefund}>
            <Text style={styles.refundTitle}>KESEMPATAN TERAKHIR</Text>
            <Text style={styles.refundSubtitle}>
              REFUND SALDO XXI Movie Card
            </Text>
            <Text style={styles.refundPeriod}>
              Periode refund berakhir di 16 September 2025
            </Text>
            <TouchableOpacity style={styles.refundButton}>
              <Text style={styles.refundButtonText}>
                KLIK UNTUK INFO LENGKAP
              </Text>
            </TouchableOpacity>
          </View>

          {/* Navigation Icons */}
          <View style={styles.navIconsContainer}>
            <TouchableOpacity style={styles.navIconButton}>
              <Ionicons name="film-outline" size={24} color="#4ECDC4" />
              <Text style={styles.navText}>Movies</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navIconButton}>
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
              <TouchableOpacity>
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
                title="PABRIK GULA UNGU"
                imageUrl="https://via.placeholder.com/180x250/121212/FF0000?text=PABRIK+GULA+UNGU"
                duration="2h 13m"
                rating="D21+"
                format="2D"
                isAdvance={true}
              />
              <MovieCard
                title="ANIMATION MOVIE"
                imageUrl="https://via.placeholder.com/180x250/121212/4ECDC4?text=ANIMATION+MOVIE"
                duration="1h 50m"
                rating="SU"
                format="2D"
                isAdvance={true}
              />
              <MovieCard
                title="ACTION MOVIE"
                imageUrl="https://via.placeholder.com/180x250/121212/FFD166?text=ACTION+MOVIE"
                duration="2h 05m"
                rating="R13+"
                format="2D"
                isAdvance={false}
              />
            </ScrollView>
          </View>

          {/* Coming Soon Section */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionTitleRow}>
              <Text style={styles.sectionTitle}>Coming soon to XXI</Text>
              <TouchableOpacity>
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
                imageUrl="https://via.placeholder.com/150x220/0A0A0A/FFFFFF?text=MINECRAFT"
              />
              <UpcomingMovieCard
                title="ALARUM"
                imageUrl="https://via.placeholder.com/150x220/0A0A0A/FFFFFF?text=ALARUM"
              />
              <UpcomingMovieCard
                title="ANAK MEDAL"
                imageUrl="https://via.placeholder.com/150x220/0A0A0A/FFFFFF?text=ANAK+MEDAL"
              />
              <UpcomingMovieCard
                title="MOVIE 4"
                imageUrl="https://via.placeholder.com/150x220/0A0A0A/FFFFFF?text=MOVIE+4"
              />
            </ScrollView>
          </View>

          {/* Remaining code... */}
          {/* Promos Section */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionTitleRow}>
              <Text style={styles.sectionTitle}>Promos for a great time</Text>
              <TouchableOpacity>
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
                source={{
                  uri: "https://via.placeholder.com/300x150/121212/FFD700?text=Disney+Snow+White",
                }}
                style={styles.promoImage}
              />
              <Image
                source={{
                  uri: "https://via.placeholder.com/300x150/121212/4ECDC4?text=Snow+White+Movie",
                }}
                style={styles.promoImage}
              />
              <Image
                source={{
                  uri: "https://via.placeholder.com/300x150/121212/FF6B6B?text=Ramadan+Special",
                }}
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
                <TouchableOpacity style={styles.orderFoodButton}>
                  <Text style={styles.orderFoodButtonText}>Order m.food</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.foodImageContainer}>
                <Image
                  source={{
                    uri: "https://via.placeholder.com/150x150/3F3F3F/FFFFFF?text=POPCORN",
                  }}
                  style={styles.foodImage}
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
      <Image source={{ uri: imageUrl }} style={styles.moviePoster} />
      <Text style={styles.movieTitle} numberOfLines={1}>
        {title}
      </Text>
      <View style={styles.movieDetails}>
        <Text style={styles.movieDuration}>{duration}</Text>
        <Text style={styles.movieRating}>{rating}</Text>
        <Text style={styles.movieFormat}>{format}</Text>
      </View>
    </View>
  );
};

// Upcoming Movie Card Component
const UpcomingMovieCard = ({ title, imageUrl }) => {
  return (
    <View style={styles.upcomingMovieCard}>
      <Image source={{ uri: imageUrl }} style={styles.upcomingMoviePoster} />
      <Text style={styles.upcomingMovieTitle} numberOfLines={1}>
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
  // All other styles remain the same...

  // Using the rest of your styles as provided in the original code
  scrollContent: {
    flex: 1,
    backgroundColor: "transparent", // Changed from solid color to transparent
  },
  carousel: {
    height: 150,
  },
  carouselItem: {
    marginRight: 2,
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
  refundTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  refundSubtitle: {
    color: "white",
    fontSize: 16,
    marginBottom: 10,
  },
  refundPeriod: {
    color: "#ccc",
    fontSize: 14,
    marginBottom: 15,
  },
  refundButton: {
    backgroundColor: "#daa520",
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 5,
  },
  refundButtonText: {
    color: "black",
    fontWeight: "bold",
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
    height: 280,
  },
  movieCard: {
    width: 180,
    marginRight: 15,
    position: "relative",
  },
  advanceTag: {
    position: "absolute",
    top: 10,
    left: 0,
    backgroundColor: "#4ECDC4",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 1,
  },
  advanceTagText: {
    color: "white",
    fontSize: 12,
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
    height: 120,
    overflow: "hidden",
  },
  foodCardTextContent: {
    flex: 1,
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
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  orderFoodButtonText: {
    fontWeight: "500",
  },
  foodImageContainer: {
    width: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  foodImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  studioCarousel: {
    height: 250,
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
