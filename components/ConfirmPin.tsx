import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const ConfirmPin = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const originalPin = route.params?.pin || "";
  const userData = route.params?.userData || {};

  const [confirmPin, setConfirmPin] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // Log received data for debugging
  useEffect(() => {
    console.log("ConfirmPin received:", { originalPin, userData });
  }, [originalPin, userData]);

  useEffect(() => {
    // Clear everything on component mount
    setConfirmPin("");
    setErrorMessage("");
    setShowSuccess(false);
  }, []);

  const handleNumberPress = (number) => {
    if (confirmPin.length < 6 && !showSuccess) {
      const newPin = confirmPin + number;
      setConfirmPin(newPin);
      setErrorMessage("");

      // If PIN is complete (6 digits), check if it matches
      if (newPin.length === 6) {
        if (newPin === originalPin) {
          setShowSuccess(true);
          setTimeout(() => {
            console.log(
              "PIN confirmed, navigating to Login with userData:",
              userData
            );
            // Navigate to Login with user data
            navigation.navigate("Login", {
              userData: {
                ...userData,
                pin: newPin,
              },
            });
          }, 1500);
        } else {
          setErrorMessage("PINs don't match. Try again.");
          setTimeout(() => {
            setConfirmPin("");
          }, 800);
        }
      }
    }
  };

  const handleDeletePress = () => {
    if (confirmPin.length > 0 && !showSuccess) {
      setConfirmPin(confirmPin.slice(0, -1));
    }
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

        {/* Header with back button as icon */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButtonContainer}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={28} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.title}>Confirm your PIN</Text>
          {errorMessage ? (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          ) : (
            <Text style={styles.subtitle}>
              Please re-enter your PIN to confirm
            </Text>
          )}

          {/* PIN dots */}
          <View style={styles.pinContainer}>
            {Array.from({ length: 6 }).map((_, index) => (
              <View
                key={index}
                style={[
                  styles.pinDot,
                  index < confirmPin.length && styles.pinDotFilled,
                  showSuccess && styles.pinDotSuccess,
                ]}
              />
            ))}
          </View>

          {showSuccess && (
            <View style={styles.successMessageContainer}>
              <Text style={styles.successMessage}>
                PIN successfully created!
              </Text>
            </View>
          )}

          {/* Number pad */}
          <View style={styles.numberPad}>
            <View style={styles.numberRow}>
              <TouchableOpacity
                style={styles.numberButton}
                onPress={() => handleNumberPress("1")}
                disabled={showSuccess}
              >
                <Text style={styles.numberText}>1</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.numberButton}
                onPress={() => handleNumberPress("2")}
                disabled={showSuccess}
              >
                <Text style={styles.numberText}>2</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.numberButton}
                onPress={() => handleNumberPress("3")}
                disabled={showSuccess}
              >
                <Text style={styles.numberText}>3</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.numberRow}>
              <TouchableOpacity
                style={styles.numberButton}
                onPress={() => handleNumberPress("4")}
                disabled={showSuccess}
              >
                <Text style={styles.numberText}>4</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.numberButton}
                onPress={() => handleNumberPress("5")}
                disabled={showSuccess}
              >
                <Text style={styles.numberText}>5</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.numberButton}
                onPress={() => handleNumberPress("6")}
                disabled={showSuccess}
              >
                <Text style={styles.numberText}>6</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.numberRow}>
              <TouchableOpacity
                style={styles.numberButton}
                onPress={() => handleNumberPress("7")}
                disabled={showSuccess}
              >
                <Text style={styles.numberText}>7</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.numberButton}
                onPress={() => handleNumberPress("8")}
                disabled={showSuccess}
              >
                <Text style={styles.numberText}>8</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.numberButton}
                onPress={() => handleNumberPress("9")}
                disabled={showSuccess}
              >
                <Text style={styles.numberText}>9</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.numberRow}>
              <View style={styles.emptyButton} />

              <TouchableOpacity
                style={styles.numberButton}
                onPress={() => handleNumberPress("0")}
                disabled={showSuccess}
              >
                <Text style={styles.numberText}>0</Text>
              </TouchableOpacity>

              {/* Delete button as icon */}
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleDeletePress}
                disabled={showSuccess}
              >
                <Ionicons name="backspace-outline" size={28} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
    padding: 20,
  },
  topSpacer: {
    height: Platform.OS === "ios" ? 10 : 25,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButtonContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -10,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
    paddingTop: 40,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    color: "#bbb",
    fontSize: 16,
    marginBottom: 40,
    textAlign: "center",
  },
  errorMessage: {
    color: "#FF6B6B",
    fontSize: 16,
    marginBottom: 40,
    textAlign: "center",
  },
  pinContainer: {
    flexDirection: "row",
    marginBottom: 50,
    justifyContent: "center",
  },
  pinDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#4ECDC4",
    marginHorizontal: 10,
  },
  pinDotFilled: {
    backgroundColor: "#4ECDC4",
    borderColor: "#4ECDC4",
  },
  pinDotSuccess: {
    backgroundColor: "#4ECDC4",
    borderColor: "#4ECDC4",
  },
  successMessageContainer: {
    position: "absolute",
    top: "40%",
    backgroundColor: "rgba(78, 205, 196, 0.2)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#4ECDC4",
  },
  successMessage: {
    color: "#4ECDC4",
    fontSize: 18,
    fontWeight: "bold",
  },
  numberPad: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 30,
  },
  numberRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  numberButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(78, 205, 196, 0.3)",
  },
  numberText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  emptyButton: {
    width: 70,
    height: 70,
  },
  deleteButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ConfirmPin;
