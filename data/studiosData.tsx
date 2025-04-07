export interface Studio {
  id: number;
  title: string;
  description: string;
  imageUrl: any;
}

export const studios: Studio[] = [
  {
    id: 1,
    title: "Deluxe Studio",
    description:
      "Enjoy the movie experience with comfortable chairs at affordable prices.",
    imageUrl: require("../assets/deluxe.jpg"),
  },
  {
    id: 2,
    title: "The Premier",
    description: "Enjoy premium experience with luxurious reclining chairs.",
    imageUrl: require("../assets/premiere.jpg"),
  },
  {
    id: 3,
    title: "IMAX",
    description:
      "Experience the ultimate movie experience with IMAX technology.",
    imageUrl: require("../assets/IMAX.jpg"),
  },
];
