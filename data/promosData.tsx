export interface PromoBanner {
  id: number;
  imageSource: any;
  title: string;
  location?: "mtix" | "xxi";
}

export const promos: PromoBanner[] = [
  {
    id: 1,
    imageSource: require("../assets/MovieNight.png"),
    title: "Movie Night Special",
    location: "xxi",
  },
  {
    id: 2,
    imageSource: require("../assets/Coklat.png"),
    title: "Chocolate Combo",
    location: "mtix",
  },
  {
    id: 3,
    imageSource: require("../assets/GrandOpening.png"),
    title: "Grand Opening",
    location: "xxi",
  },
  {
    id: 4,
    imageSource: require("../assets/MovieNight.png"),
    title: "50% Discount",
    location: "mtix",
  },
  {
    id: 5,
    imageSource: require("../assets/Coklat.png"),
    title: "Buy 3 Pay 2",
    location: "xxi",
  },
];

export const carouselBanners = [
  {
    id: 101,
    imageSource: require("../assets/Coklat.png"),
    title: "Bank Saqu Cashback 25%",
  },
  {
    id: 102,
    imageSource: require("../assets/IMAX.jpg"),
    title: "XXI Discount Promo",
  },
  {
    id: 103,
    imageSource: require("../assets/MovieNight.png"),
    title: "Weekend Special",
  },
];
