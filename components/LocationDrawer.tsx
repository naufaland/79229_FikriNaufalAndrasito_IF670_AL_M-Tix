import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const DRAWER_HEIGHT = SCREEN_HEIGHT * 0.7;

const LocationDrawer = ({ visible, onClose, onSelectLocation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const animatedValue = useRef(new Animated.Value(DRAWER_HEIGHT)).current;

  const cities = [
    "AMBON",
    "BALIKPAPAN",
    "BANDUNG",
    "BANJARMASIN",
    "BATAM",
    "BEKASI",
    "BENGKULU",
    "BOGOR",
    "BONDOWOSO",
    "CIREBON",
    "DENPASAR",
    "JAKARTA",
    "JAMBI",
    "JAYAPURA",
    "MAKASSAR",
    "MALANG",
    "MANADO",
    "MEDAN",
    "PADANG",
    "PALEMBANG",
    "PEKANBARU",
    "PONTIANAK",
    "SAMARINDA",
    "SEMARANG",
    "SOLO",
    "SURABAYA",
    "TANGERANG",
    "YOGYAKARTA",
  ];

  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (visible) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: DRAWER_HEIGHT,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, animatedValue]);

  const handleSelectCity = (city) => {
    onSelectLocation(city);
    onClose();
  };

  const handleBackdropPress = () => {
    onClose();
  };

  if (!visible) {
    return null;
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[
          styles.container,
          { transform: [{ translateY: animatedValue }] },
        ]}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Pick your location</Text>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#777"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search city"
            placeholderTextColor="#777"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
          />
        </View>

        <FlatList
          data={filteredCities}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.cityItem}
              onPress={() => handleSelectCity(item)}
            >
              <Text style={styles.cityText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
  },
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: DRAWER_HEIGHT,
    backgroundColor: "#1A1A1A",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 1000,
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  closeButton: {
    marginRight: 15,
    padding: 5,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 20,
    margin: 15,
    paddingHorizontal: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    color: "white",
    fontSize: 16,
  },
  cityItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  cityText: {
    color: "white",
    fontSize: 18,
  },
});

export default LocationDrawer;
