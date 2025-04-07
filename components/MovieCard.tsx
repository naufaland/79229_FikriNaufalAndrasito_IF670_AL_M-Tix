import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface MovieCardProps {
  title: string;
  imageUrl: any;
  duration: string;
  rating: string;
  format: string;
  isAdvance: boolean;
}

const MovieCard = ({
  title,
  imageUrl,
  duration,
  rating,
  format,
  isAdvance,
}: MovieCardProps) => {
  return (
    <View style={styles.movieCard}>
      {isAdvance && (
        <View style={styles.advanceTag}>
          <Text style={styles.advanceTagText}>Advance ticket sales</Text>
        </View>
      )}
      {typeof imageUrl === "string" ? (
        <Image source={{ uri: imageUrl }} style={styles.moviePoster} />
      ) : (
        <Image source={imageUrl} style={styles.moviePoster} />
      )}
      <Text style={styles.movieTitle} numberOfLines={1}>
        {title}
      </Text>
      <View style={styles.movieDetailsContainer}>
        <Text style={styles.movieInfoText}>
          {duration} • {rating} • {format}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  movieCard: {
    width: 180,
    marginRight: 15,
    position: "relative",
    marginBottom: 10,
    height: 300,
  },
  advanceTag: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#4ECDC4",
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    zIndex: 1,
  },
  advanceTagText: {
    color: "white",
    fontSize: 8,
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
  movieDetailsContainer: {
    marginTop: 5,
    paddingHorizontal: 2,
  },
  movieInfoText: {
    color: "#888",
    fontSize: 12,
    lineHeight: 16,
  },
});

export default MovieCard;
