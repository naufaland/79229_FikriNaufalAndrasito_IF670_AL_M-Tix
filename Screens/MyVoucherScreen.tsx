import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Platform,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import VoucherDrawer from "../components/VoucherDrawer";

const MyVoucherScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("Movie");
  const [drawerVisible, setDrawerVisible] = useState(false);

  const goBack = () => {
    navigation.goBack();
  };

  const openDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const renderVoucherItem = (title, subtitle, expiryDate, imageSource) => (
    <View style={styles.voucherItem}>
      {imageSource && (
        <View style={styles.voucherImageContainer}>
          <Image source={imageSource} style={styles.voucherImage} />
          <View style={styles.voucherTag}>
            <Text style={styles.voucherTagText}>e-Voucher</Text>
          </View>
        </View>
      )}
      <View style={styles.voucherContent}>
        <Text style={styles.voucherTitle}>{title}</Text>
        <Text style={styles.voucherSubtitle}>{subtitle}</Text>
      </View>
      <View style={styles.voucherExpiry}>
        <View style={styles.expiryIcon}>
          <Text style={styles.clockIcon}>⏱</Text>
        </View>
        <Text style={styles.expiryText}>Valid until {expiryDate}</Text>
      </View>
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

        <View style={styles.header}>
          <TouchableOpacity onPress={goBack} style={styles.backButton}>
            {/* Replace text arrow with Ionicons */}
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My voucher</Text>
        </View>

        <TouchableOpacity style={styles.redeemButton} onPress={openDrawer}>
          <View style={styles.redeemIcon}>
            <Text style={styles.percentIcon}>%</Text>
          </View>
          <Text style={styles.redeemText}>Redeem voucher code</Text>
          <Text style={styles.arrowIcon}>→</Text>
        </TouchableOpacity>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "Movie" && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab("Movie")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Movie" && styles.activeTabText,
              ]}
            >
              Movie
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "m.food" && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab("m.food")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "m.food" && styles.activeTabText,
              ]}
            >
              m.food
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.voucherList}>
          {renderVoucherItem(
            "Jumbo-Beli 3 Bayar 2",
            "Minimum quantity 3",
            "2025-04-07 22:00:00",
            require("../assets/IMAX.jpg")
          )}
          {renderVoucherItem(
            "Komang-Buy 1 Get 1 Free",
            "Minimum quantity 2",
            "2025-04-07 22:00:00",
            require("../assets/Coklat.png")
          )}
          {renderVoucherItem(
            "Sakuku-Beli 1 Dapat 2-Film Qodrat 2",
            "Minimum quantity 2",
            "2025-04-07 22:00:00",
            require("../assets/premiere.jpg")
          )}
        </ScrollView>

        <VoucherDrawer visible={drawerVisible} onClose={closeDrawer} />
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
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    marginRight: 15,
    padding: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  redeemButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2A2A2A",
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 15,
  },
  redeemIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#444",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  percentIcon: {
    color: "white",
    fontSize: 16,
  },
  redeemText: {
    color: "white",
    fontSize: 16,
    flex: 1,
  },
  arrowIcon: {
    color: "white",
    fontSize: 18,
  },
  tabContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginVertical: 15,
  },
  tabButton: {
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginRight: 10,
    backgroundColor: "#2A2A2A",
  },
  activeTabButton: {
    backgroundColor: "white",
  },
  tabText: {
    color: "#999",
    fontSize: 16,
  },
  activeTabText: {
    color: "#121212",
    fontWeight: "bold",
  },
  voucherList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  voucherItem: {
    backgroundColor: "#2A2A2A",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    overflow: "hidden",
  },
  voucherImageContainer: {
    height: 100,
    marginBottom: 10,
    borderRadius: 5,
    overflow: "hidden",
    position: "relative",
  },
  voucherImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  voucherTag: {
    position: "absolute",
    left: 0,
    top: 10,
    backgroundColor: "#01665f",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  voucherTagText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  voucherContent: {
    marginBottom: 10,
  },
  voucherTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  voucherSubtitle: {
    color: "#999",
    fontSize: 14,
  },
  voucherExpiry: {
    flexDirection: "row",
    alignItems: "center",
  },
  expiryIcon: {
    marginRight: 10,
  },
  clockIcon: {
    color: "#999",
    fontSize: 16,
  },
  expiryText: {
    color: "#999",
    fontSize: 14,
  },
});

export default MyVoucherScreen;
