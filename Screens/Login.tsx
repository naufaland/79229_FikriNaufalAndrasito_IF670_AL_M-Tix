import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  Dimensions,
  Platform,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import TermsModal from "../components/TermsModal";

const { height } = Dimensions.get("window");

const Login = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userData, setUserData] = useState(route.params?.userData || null);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const footerOpacity = useState(new Animated.Value(1))[0];
  const [showTerms, setShowTerms] = useState(false);

  // Log received data for debugging
  useEffect(() => {
    console.log("Login screen received userData:", route.params?.userData);
  }, [route.params]);

  // Listen for keyboard events
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === "android" ? "keyboardDidShow" : "keyboardWillShow",
      () => {
        setKeyboardVisible(true);
        // Animate the footer to hide
        Animated.timing(footerOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === "android" ? "keyboardDidHide" : "keyboardWillHide",
      () => {
        setKeyboardVisible(false);
        // Animate the footer to show
        Animated.timing(footerOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // Check for user data when component mounts or route changes
  useEffect(() => {
    if (route.params?.userData) {
      setUserData(route.params.userData);
      console.log("User data received in Login:", route.params.userData);
    }
  }, [route.params]);

  const handleLogin = () => {
    if (!phoneNumber.trim()) {
      alert("Please enter your phone number.");
      return;
    }
    setShowTerms(true);
  };

  const handleAgreeTerms = () => {
    setShowTerms(false);

    console.log("Login: Navigating to ConfirmLoginPin with:", {
      phoneNumber,
      userData,
    });

    // If we have userData from registration, pass it along
    // Otherwise just pass the phone number
    if (userData) {
      navigation.navigate("ConfirmLoginPin", {
        phoneNumber: phoneNumber,
        userData: userData,
      });
    } else {
      navigation.navigate("ConfirmLoginPin", { phoneNumber });
    }
  };

  const handleCreateAccount = () => {
    // Navigate to Register screen
    navigation.navigate("Register");
  };

  return (
    <LinearGradient
      colors={["#121212", "#001211", "#013d39", "#01665f"]}
      style={styles.gradientContainer}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <View style={styles.contentContainer}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Login</Text>
            </View>

            {/* Welcome message */}
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome, again!</Text>
            </View>

            {/* Main content */}
            <View style={styles.mainContent}>
              {/* Phone number input */}
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Phone number"
                  placeholderTextColor="#FFFFFF"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                />
              </View>

              {/* Login button */}
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
              >
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>

              {/* Create account link */}
              <View style={styles.newUserContainer}>
                <Text style={styles.newUserText}>New here? </Text>
                <TouchableOpacity onPress={handleCreateAccount}>
                  <Text style={styles.createAccountText}>Make an account</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Footer that fades out when keyboard is visible */}
          <Animated.View
            style={[styles.footer, { opacity: footerOpacity }]}
            pointerEvents={keyboardVisible ? "none" : "auto"}
          >
            <Image
              source={require("../assets/mtixNavbar.png")}
              style={styles.logoImage}
              resizeMode="contain"
            />
            <Text style={styles.version}>Version 8.0.0</Text>
          </Animated.View>
          <TermsModal
            visible={showTerms}
            onClose={() => setShowTerms(false)}
            onAgree={handleAgreeTerms}
          />
        </SafeAreaView>
      </TouchableWithoutFeedback>
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
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 40,
  },
  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 15,
  },
  welcomeContainer: {
    marginBottom: 30,
  },
  welcomeText: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
  mainContent: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    padding: 15,
    color: "white",
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: "white",
    borderRadius: 30,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  loginButtonText: {
    color: "#01665f",
    fontSize: 16,
    fontWeight: "bold",
  },
  newUserContainer: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  newUserText: {
    color: "white",
    fontSize: 16,
  },
  createAccountText: {
    color: "#4ECDC4",
    fontSize: 16,
  },
  footer: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  logoImage: {
    width: 120,
    height: 50,
    marginBottom: 5,
  },
  version: {
    color: "gray",
    fontSize: 14,
  },
});

export default Login;
