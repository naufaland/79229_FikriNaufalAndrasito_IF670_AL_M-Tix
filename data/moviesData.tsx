export interface Movie {
  id: number;
  title: string;
  imageSource: any;
  duration: string;
  rating: string;
  format: string;
  isAdvance: boolean;
}

export interface UpcomingMovie {
  id: number;
  title: string;
  imageSource: any;
  releaseDate: string;
}

// Now Playing Movies Data
export const nowPlayingMovies: Movie[] = [
  {
    id: 1,
    title: "DEADPOOL",
    imageSource: require("../assets/DeadPool.jpeg"),
    duration: "2h 6m",
    rating: "R18+",
    format: "2D",
    isAdvance: true,
  },
  {
    id: 2,
    title: "THE BATMAN",
    imageSource: require("../assets/TheBatman.jpeg"),
    duration: "2h 56m",
    rating: "R13+",
    format: "2D",
    isAdvance: true,
  },
  {
    id: 3,
    title: "BLADE RUNNER 2049",
    imageSource: require("../assets/BladeRunner2049.jpeg"),
    duration: "2h 44m",
    rating: "R13+",
    format: "2D",
    isAdvance: false,
  },
  {
    id: 4,
    title: "GREEN BOOK",
    imageSource: require("../assets/GreenBook.jpeg"),
    duration: "2h 10m",
    rating: "PG-13",
    format: "2D",
    isAdvance: false,
  },
  {
    id: 5,
    title: "JAWS",
    imageSource: require("../assets/Jaws.jpeg"),
    duration: "1h 55m",
    rating: "PG-13",
    format: "2D",
    isAdvance: false,
  },
  {
    id: 6,
    title: "PARASITE",
    imageSource: require("../assets/Parasite.jpeg"),
    duration: "2h 12m",
    rating: "R17+",
    format: "2D",
    isAdvance: true,
  },
  {
    id: 7,
    title: "ROGUE ONE",
    imageSource: require("../assets/RogueOne.jpeg"),
    duration: "2h 13m",
    rating: "PG-13",
    format: "2D",
    isAdvance: false,
  },
  {
    id: 8,
    title: "SPIDER-MAN: ACROSS THE SPIDER-VERSE",
    imageSource: require("../assets/Spiderverse.jpeg"),
    duration: "2h 16m",
    rating: "PG",
    format: "2D",
    isAdvance: true,
  },
];

// Coming Soon Movies Data
export const comingSoonMovies: UpcomingMovie[] = [
  {
    id: 101,
    title: "A MINECRAFT MOVIE",
    imageSource: require("../assets/MovieDummy.png"),
    releaseDate: "Coming Sep 15",
  },
  {
    id: 102,
    title: "ALARUM",
    imageSource: require("../assets/MovieDummy.png"),
    releaseDate: "Coming Sep 20",
  },
  {
    id: 103,
    title: "ANAK MEDAL",
    imageSource: require("../assets/MovieDummy.png"),
    releaseDate: "Coming Oct 5",
  },
  {
    id: 104,
    title: "FUTURE BLOCKBUSTER",
    imageSource: require("../assets/MovieDummy.png"),
    releaseDate: "Coming Oct 12",
  },
  {
    id: 105,
    title: "THE FANTASTIC FOUR",
    imageSource: require("../assets/MovieDummy.png"),
    releaseDate: "Coming Oct 19",
  },
  {
    id: 106,
    title: "THE FLASH",
    imageSource: require("../assets/MovieDummy.png"),
    releaseDate: "Coming Oct 26",
  },
  {
    id: 107,
    title: "THE MARVELS",
    imageSource: require("../assets/MovieDummy.png"),
    releaseDate: "Coming Nov 2",
  },
  {
    id: 108,
    title: "TOMB RAIDER II",
    imageSource: require("../assets/MovieDummy.png"),
    releaseDate: "Coming Nov 9",
  },
];

// Home screen featured movies (subset of now playing)
export const featuredMovies = nowPlayingMovies.slice(0, 3);
