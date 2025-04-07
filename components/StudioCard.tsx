import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

interface StudioCardProps {
  title: string;
  description: string;
  imageUrl: any;
  features?: string[];
}

const StudioCard = ({
  title,
  description,
  imageUrl,
  features = ["Dolby Audio", "Premium Screen"],
}: StudioCardProps) => {
  return (
    <View style={styles.studioCard}>
      <View style={styles.imageContainer}>
        <Image
          source={typeof imageUrl === "string" ? { uri: imageUrl } : imageUrl}
          style={styles.studioImage}
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.7)"]}
          style={styles.imageOverlay}
        />
        <View style={styles.badgeContainer}>
          <Text style={styles.badge}>{title}</Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.studioTitle}>{title}</Text>
        <Text style={styles.studioDescription} numberOfLines={2}>
          {description}
        </Text>

        <View style={styles.featureRow}>
          {features.map((feature, index) => (
            <View key={index} style={styles.feature}>
              <Ionicons
                name={index === 0 ? "volume-high-outline" : "film-outline"}
                size={14}
                color="#4ECDC4"
              />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.learnMoreButton}>
          <Text style={styles.learnMoreText}>Details</Text>
          <Ionicons name="chevron-forward" size={14} color="#222" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  studioCard: {
    width: 280,
    marginRight: 15,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#222",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  imageContainer: {
    position: "relative",
    height: 140,
  },
  studioImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  imageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  badgeContainer: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  badge: {
    color: "#4ECDC4",
    fontSize: 12,
    fontWeight: "700",
  },
  contentContainer: {
    padding: 15,
  },
  studioTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  studioDescription: {
    color: "#bbb",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },
  featureRow: {
    flexDirection: "row",
    marginBottom: 15,
  },
  feature: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
    backgroundColor: "rgba(78, 205, 196, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  featureText: {
    color: "#ccc",
    fontSize: 11,
    marginLeft: 4,
  },
  learnMoreButton: {
    backgroundColor: "#4ECDC4",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  learnMoreText: {
    color: "#222",
    fontWeight: "600",
    marginRight: 4,
  },
});

export default StudioCard;
