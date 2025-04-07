import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  SafeAreaView,
  StatusBar,
  Platform,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { promos, carouselBanners } from "../data/promosData";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const CAROUSEL_ITEM_WIDTH = width * 0.85;

const PromosScreen = () => {
  const navigation = useNavigation();
  const [activeFilter, setActiveFilter] = useState("all");
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigateToVoucher = () => {
    navigation.navigate("MyVoucher");
  };

  const renderCarouselItem = ({ item, index }) => (
    <View style={[styles.carouselItem, { width: CAROUSEL_ITEM_WIDTH }]}>
      <Image
        source={item.imageSource}
        style={styles.bannerImage}
        resizeMode="cover"
      />
    </View>
  );

  const renderPromoItem = (item) => (
    <TouchableOpacity key={item.id} style={styles.promoCard}>
      <Image
        source={item.imageSource}
        style={styles.promoImage}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );

  // Filter promos based on active filter
  const getFilteredPromos = () => {
    if (activeFilter === "all") return promos;
    return promos.filter((promo) => promo.location === activeFilter);
  };

  const filteredPromos = getFilteredPromos();

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / CAROUSEL_ITEM_WIDTH);
    setCurrentIndex(index);
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

        <View style={styles.header}>
          <Text style={styles.headerTitle}>Promos</Text>
          <TouchableOpacity
            style={styles.voucherButton}
            onPress={navigateToVoucher}
          >
            <Text style={styles.voucherButtonText}>My voucher</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.sectionTitle}>Promos for a great time</Text>

          {/* Carousel banners */}
          <View style={styles.carouselContainer}>
            <FlatList
              ref={flatListRef}
              data={carouselBanners}
              renderItem={renderCarouselItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={CAROUSEL_ITEM_WIDTH + 10}
              snapToAlignment="center"
              decelerationRate="fast"
              contentContainerStyle={styles.carouselList}
              onScroll={handleScroll}
            />

            {/* Pagination dots */}
            <View style={styles.paginationContainer}>
              {carouselBanners.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.paginationDot,
                    currentIndex === index && styles.paginationDotActive,
                  ]}
                />
              ))}
            </View>
          </View>

          <Text style={styles.promoTitle}>Enjoy hot promos!</Text>

          {/* Filter buttons */}
          <View style={styles.filterContainer}>
            <TouchableOpacity
              style={[
                styles.filterButton,
                activeFilter === "all" && styles.filterButtonActive,
              ]}
              onPress={() => setActiveFilter("all")}
            >
              {/* Replace Image with Ionicons */}
              <Ionicons name="funnel-outline" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterButton,
                activeFilter === "mtix" && styles.filterButtonActive,
                styles.filterButtonMTix,
              ]}
              onPress={() => setActiveFilter("mtix")}
            >
              <Text style={styles.filterButtonText}>Only on m.tix</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterButton,
                activeFilter === "xxi" && styles.filterButtonActive,
                styles.filterButtonXXI,
              ]}
              onPress={() => setActiveFilter("xxi")}
            >
              <Text style={styles.filterButtonText}>Only at XXI outlets</Text>
            </TouchableOpacity>
          </View>

          {/* Promo cards */}
          <View style={styles.promoGrid}>
            {filteredPromos.map((promo) => renderPromoItem(promo))}
          </View>
        </ScrollView>
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
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  voucherButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#666",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  voucherButtonText: {
    color: "white",
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    color: "white",
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  carouselContainer: {
    marginBottom: 20,
  },
  carouselList: {
    paddingHorizontal: 10,
  },
  carouselItem: {
    height: 180,
    borderRadius: 15,
    overflow: "hidden",
    marginHorizontal: 5,
  },
  bannerImage: {
    width: "100%",
    height: "100%",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#666",
    marginHorizontal: 3,
  },
  paginationDotActive: {
    backgroundColor: "white",
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginHorizontal: 20,
    marginBottom: 15,
  },
  filterContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  filterButton: {
    borderRadius: 25,
    padding: 12,
    marginRight: 10,
    backgroundColor: "#2A2A2A",
  },
  filterButtonActive: {
    backgroundColor: "#444",
  },
  filterButtonMTix: {
    paddingHorizontal: 20,
  },
  filterButtonXXI: {
    paddingHorizontal: 20,
  },
  filterButtonText: {
    color: "white",
    fontSize: 16,
  },
  promoGrid: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  promoCard: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 15,
  },
  promoImage: {
    width: "100%",
    height: "100%",
  },
});

export default PromosScreen;
