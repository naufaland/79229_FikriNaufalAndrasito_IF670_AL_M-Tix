import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";

const MyMTIXScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Initialize state for user profile data
  const [userData, setUserData] = useState({
    fullName: "User",
    phoneNumber: "+620000000000",
  });

  // Update state when route params change
  useEffect(() => {
    console.log("Route params received in MyMTIX:", route.params);
    if (route.params?.fullName || route.params?.phoneNumber) {
      setUserData({
        fullName: route.params.fullName || userData.fullName,
        phoneNumber: route.params.phoneNumber || userData.phoneNumber,
      });
      console.log("Profile updated with user data");
    }
  }, [route.params]);

  // Get first letter of name for avatar
  const firstLetter = userData.fullName.charAt(0).toUpperCase();

  const handleLogout = () => {
    // Navigate to login screen
    navigation.navigate("Login");
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

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My m.tix</Text>
          <Text style={styles.versionText}>Version 8.0.0</Text>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{firstLetter}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.nameText}>{userData.fullName}</Text>
            <Text style={styles.phoneText}>{userData.phoneNumber}</Text>
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="pencil" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Quick Access Section */}
          <View style={styles.sectionContainer}>
            <TouchableOpacity style={styles.optionItem}>
              <View style={styles.iconContainer}>
                <MaterialIcons name="payment" size={24} color="#fff" />
              </View>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>Payment methods</Text>
                <Text style={styles.optionSubtitle}>
                  Manage your cards and e-wallets
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionItem}>
              <View style={styles.iconContainer}>
                <Ionicons name="star" size={24} color="#fff" />
              </View>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>Favorite cinemas</Text>
                <Text style={styles.optionSubtitle}>
                  Order from your most visited cinema
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Settings Section */}
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.sectionContainer}>
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingIconContainer}>
                <Ionicons name="key-outline" size={24} color="#fff" />
              </View>
              <Text style={styles.settingText}>Account safety</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingIconContainer}>
                <Ionicons name="globe-outline" size={24} color="#fff" />
              </View>
              <Text style={styles.settingText}>Language</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingIconContainer}>
                <Ionicons name="moon-outline" size={24} color="#fff" />
              </View>
              <Text style={styles.settingText}>Theme</Text>
            </TouchableOpacity>
          </View>

          {/* Others Section */}
          <Text style={styles.sectionTitle}>Others</Text>
          <View style={styles.sectionContainer}>
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingIconContainer}>
                <Ionicons name="document-text-outline" size={24} color="#fff" />
              </View>
              <Text style={styles.settingText}>Terms of service</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingIconContainer}>
                <Ionicons name="help-circle-outline" size={24} color="#fff" />
              </View>
              <Text style={styles.settingText}>Help center</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingIconContainer}>
                <Ionicons
                  name="information-circle-outline"
                  size={24}
                  color="#fff"
                />
              </View>
              <Text style={styles.settingText}>Privacy policy</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingIconContainer}>
                <Ionicons name="call-outline" size={24} color="#fff" />
              </View>
              <Text style={styles.settingText}>m.tix care</Text>
            </TouchableOpacity>
          </View>

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="#fff" />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>

          {/* Bottom spacing */}
          <View style={styles.bottomSpacing} />
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 10,
  },
  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  versionText: {
    color: "gray",
    fontSize: 14,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  avatarContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  profileInfo: {
    flex: 1,
    marginLeft: 15,
    position: "relative",
  },
  nameText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  phoneText: {
    color: "gray",
    fontSize: 16,
    marginTop: 3,
  },
  editButton: {
    position: "absolute",
    right: 0,
    top: 10,
  },
  scrollView: {
    flex: 1,
  },
  sectionContainer: {
    marginHorizontal: 15,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
  },
  sectionTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginBottom: 10,
    marginTop: 15,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  optionTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  optionTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  optionSubtitle: {
    color: "gray",
    fontSize: 14,
    marginTop: 3,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 1,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  settingText: {
    color: "white",
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 20,
    paddingVertical: 12,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
  bottomSpacing: {
    height: 10,
  },
});

export default MyMTIXScreen;
