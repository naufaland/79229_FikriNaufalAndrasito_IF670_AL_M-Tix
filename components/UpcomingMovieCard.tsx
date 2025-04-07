import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface UpcomingMovieCardProps {
  title: string;
  imageUrl: any;
}

const UpcomingMovieCard = ({ title, imageUrl }: UpcomingMovieCardProps) => {
  return (
    <View style={styles.upcomingMovieCard}>
      {typeof imageUrl === "string" ? (
        <Image source={{ uri: imageUrl }} style={styles.upcomingMoviePoster} />
      ) : (
        <Image source={imageUrl} style={styles.upcomingMoviePoster} />
      )}
      <Text style={styles.upcomingMovieTitle} numberOfLines={2}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  upcomingMovieCard: {
    width: 150,
    marginRight: 15,
  },
  upcomingMoviePoster: {
    width: 150,
    height: 220,
    borderRadius: 10,
  },
  upcomingMovieTitle: {
    color: "white",
    marginTop: 5,
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default UpcomingMovieCard;
