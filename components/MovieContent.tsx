import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface MovieContentProps {
  navigation?: any;
}

const MovieContent: React.FC<MovieContentProps> = ({ navigation }) => {
  const { width } = Dimensions.get("window");
  const isLandscape = width > Dimensions.get("window").height;

  const handleSeeWhatsPlaying = () => {
    if (navigation) {
      navigation.navigate("Movies", { initialTab: "nowPlaying" });
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.contentWrapper,
          isLandscape && styles.landscapeContentWrapper,
        ]}
      >
        <View style={styles.iconContainer}>
          <Icon name="ticket-confirmation-outline" size={60} color="#4CD2C0" />
        </View>

        <View
          style={
            isLandscape ? styles.textContainerLandscape : styles.textContainer
          }
        >
          <Text style={styles.title}>Watch a movie today!</Text>
          <Text style={styles.subtitle}>
            Enjoy a break and get a movie ticket.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={handleSeeWhatsPlaying}
          >
            <Text style={styles.buttonText}>See what's playing</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 15,
    padding: 20,
  },
  contentWrapper: {
    alignItems: "center",
  },
  landscapeContentWrapper: {
    flexDirection: "row",
    justifyContent: "center",
  },
  iconContainer: {
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    alignItems: "center",
  },
  textContainerLandscape: {
    marginLeft: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#8E8E93",
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    backgroundColor: "transparent",
    borderColor: "#dfe8e7",
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
  },
  buttonText: {
    color: "#dfe8e7",
    fontSize: 16,
  },
});

export default MovieContent;
