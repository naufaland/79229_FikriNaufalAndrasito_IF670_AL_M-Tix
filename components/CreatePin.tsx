import React, { useEffect, useState } from "react";
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

const CreatePin = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const userData = route.params?.userData || {};

  const [pin, setPin] = useState("");

  useEffect(() => {
    console.log("CreatePin received userData:", userData);
  }, [userData]);

  const handleNumberPress = (number) => {
    if (pin.length < 6) {
      const newPin = pin + number;
      setPin(newPin);

      if (newPin.length === 6) {
        const updatedUserData = {
          ...userData,
          pin: newPin,
        };

        console.log("Created PIN:", newPin);
        console.log("Passing user data to ConfirmPin:", updatedUserData);

        setTimeout(() => {
          navigation.navigate("ConfirmPin", {
            pin: newPin,
            userData: updatedUserData,
          });
        }, 500);
      }
    }
  };

  const handleDeletePress = () => {
    if (pin.length > 0) {
      setPin(pin.slice(0, -1));
    }
  };

  useEffect(() => {
    setPin("");
  }, []);

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

        {/* Header with back button only */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButtonContainer}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={28} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.centeredTitle}>Create a PIN</Text>

          {/* PIN dots */}
          <View style={styles.pinContainer}>
            {Array.from({ length: 6 }).map((_, index) => (
              <View
                key={index}
                style={[
                  styles.pinDot,
                  index < pin.length && styles.pinDotFilled,
                ]}
              />
            ))}
          </View>

          {/* Number pad */}
          <View style={styles.numberPad}>
            <View style={styles.numberRow}>
              <TouchableOpacity
                style={styles.numberButton}
                onPress={() => handleNumberPress("1")}
              >
                <Text style={styles.numberText}>1</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.numberButton}
                onPress={() => handleNumberPress("2")}
              >
                <Text style={styles.numberText}>2</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.numberButton}
                onPress={() => handleNumberPress("3")}
              >
                <Text style={styles.numberText}>3</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.numberRow}>
              <TouchableOpacity
                style={styles.numberButton}
                onPress={() => handleNumberPress("4")}
              >
                <Text style={styles.numberText}>4</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.numberButton}
                onPress={() => handleNumberPress("5")}
              >
                <Text style={styles.numberText}>5</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.numberButton}
                onPress={() => handleNumberPress("6")}
              >
                <Text style={styles.numberText}>6</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.numberRow}>
              <TouchableOpacity
                style={styles.numberButton}
                onPress={() => handleNumberPress("7")}
              >
                <Text style={styles.numberText}>7</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.numberButton}
                onPress={() => handleNumberPress("8")}
              >
                <Text style={styles.numberText}>8</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.numberButton}
                onPress={() => handleNumberPress("9")}
              >
                <Text style={styles.numberText}>9</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.numberRow}>
              <View style={styles.emptyButton} />

              <TouchableOpacity
                style={styles.numberButton}
                onPress={() => handleNumberPress("0")}
              >
                <Text style={styles.numberText}>0</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleDeletePress}
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
    marginTop: 10,
    marginBottom: 20,
  },
  backButtonContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -10,
  },
  headerTitle: {
    flex: 1,
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 5,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
    paddingTop: 40,
  },
  centeredTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  pinContainer: {
    flexDirection: "row",
    marginBottom: 60,
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
    fontWeight: "500",
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

export default CreatePin;
