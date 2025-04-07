export interface PromoBanner {
  id: number;
  imageSource: any;
  title: string;
}

export const promos: PromoBanner[] = [
  {
    id: 1,
    imageSource: require("../assets/MovieNight.png"),
    title: "Movie Night Special",
  },
  {
    id: 2,
    imageSource: require("../assets/Coklat.png"),
    title: "Chocolate Combo",
  },
  {
    id: 3,
    imageSource: require("../assets/GrandOpening.png"),
    title: "Grand Opening",
  },
];

export const carouselBanners = promos;
