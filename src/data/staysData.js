import tinyHouse1 from "../assets/tiny house1.webp";
import tinyEscape3 from "../assets/tiny escape 3.jpg";

// Razzo Creek (Apple 1) images
import razzoCreekHero from "../assets/homes/razzo-creek/01-DSC09085.jpg";
import razzoCreek2 from "../assets/homes/razzo-creek/02-DSC09082.jpg";
import razzoCreek3 from "../assets/homes/razzo-creek/03-DSC09043.jpg";
import razzoCreek4 from "../assets/homes/razzo-creek/04-DSC09040.jpg";
import razzoCreek5 from "../assets/homes/razzo-creek/05-DSC09037.jpg";
import razzoCreek6 from "../assets/homes/razzo-creek/06-DSC09034.jpg";
import razzoCreek7 from "../assets/homes/razzo-creek/07-DSC09031.jpg";
import razzoCreek8 from "../assets/homes/razzo-creek/08-DSC09028.jpg";
import razzoCreek9 from "../assets/homes/razzo-creek/09-DSC09022.jpg";
import razzoCreek10 from "../assets/homes/razzo-creek/10-DSC09019.jpg";
import razzoCreek11 from "../assets/homes/razzo-creek/11-DSC09013.jpg";
import razzoCreek12 from "../assets/homes/razzo-creek/12-DSC09001.jpg";

// Kona Meadow (Apple 2) images
import konaMeadowHero from "../assets/homes/kona-meadow/01-DSC09094.jpg";
import konaMeadow2 from "../assets/homes/kona-meadow/02-DSC09046.jpg";
import konaMeadow3 from "../assets/homes/kona-meadow/03-DSC08878.jpg";
import konaMeadow4 from "../assets/homes/kona-meadow/04-DSC08875.jpg";
import konaMeadow5 from "../assets/homes/kona-meadow/05-DSC08869.jpg";
import konaMeadow6 from "../assets/homes/kona-meadow/06-DSC08851.jpg";
import konaMeadow7 from "../assets/homes/kona-meadow/07-DSC08845.jpg";
import konaMeadow8 from "../assets/homes/kona-meadow/08-DSC08842.jpg";
import konaMeadow9 from "../assets/homes/kona-meadow/09-DSC08833.jpg";
import konaMeadow10 from "../assets/homes/kona-meadow/10-DSC08824.jpg";

// Catalina Ridge (Triangle 1) images
import catalinaRidgeHero from "../assets/homes/catalina-ridge/01-DSC09091.jpg";
import catalinaRidgeHeroResized from "../assets/homes/catalina-ridge/01-DSC09091.jpg";
import catalinaRidge2 from "../assets/homes/catalina-ridge/02-DSC09079.jpg";
import catalinaRidge3 from "../assets/homes/catalina-ridge/03-DSC09049.jpg";
import catalinaRidge4 from "../assets/homes/catalina-ridge/04-DSC08977.jpg";
import catalinaRidge5 from "../assets/homes/catalina-ridge/05-DSC08968.jpg";
import catalinaRidge6 from "../assets/homes/catalina-ridge/06-DSC08914.jpg";
import catalinaRidge7 from "../assets/homes/catalina-ridge/07-DSC08911.jpg";
import catalinaRidge8 from "../assets/homes/catalina-ridge/08-DSC08908.jpg";
import catalinaRidge9 from "../assets/homes/catalina-ridge/09-DSC08905.jpg";
import catalinaRidge10 from "../assets/homes/catalina-ridge/10-DSC08894.jpg";
import catalinaRidge11 from "../assets/homes/catalina-ridge/11-DSC08887.jpg";

// Rani Ridge (Triangle 2) images
import raniRidgeHero from "../assets/homes/rani-ridge/01-DSC09088.jpg";
import raniRidge2 from "../assets/homes/rani-ridge/02-DSC09079.jpg";
import raniRidge3 from "../assets/homes/rani-ridge/03-DSC09052.jpg";
import raniRidge4 from "../assets/homes/rani-ridge/04-DSC08995.jpg";
import raniRidge5 from "../assets/homes/rani-ridge/05-DSC08987.jpg";
import raniRidge6 from "../assets/homes/rani-ridge/06-DSC08977.jpg";
import raniRidge7 from "../assets/homes/rani-ridge/07-DSC08968.jpg";
import raniRidge8 from "../assets/homes/rani-ridge/08-DSC08959.jpg";
import raniRidge9 from "../assets/homes/rani-ridge/09-DSC08953.jpg";
import raniRidge10 from "../assets/homes/rani-ridge/10-DSC08950.jpg";
import raniRidge11 from "../assets/homes/rani-ridge/11-DSC08947.jpg";
import raniRidge12 from "../assets/homes/rani-ridge/13-DSC08929.jpg";

export const staysData = [
  {
    id: "apple-1-razoo-creek",
    slug: "apple-1-razoo-creek",
    name: "Razzo Creek",
    tagline: "A warm, modern retreat designed for quiet moments and easy mornings.",
    location: "Bruceville-Eddy, TX",
    shortDescription:
      "A warm, modern retreat designed for quiet moments and easy mornings.",
    description:
      "Razzo Creek is a design-forward Apple Home made for quiet resets and easy getaways. Enjoy a warm modern interior, private outdoor space, and effortless access to The Tiny Escape's signature experiences — from Creekside Cafe and the grand fire pit to guided horseback riding and our container pools.",
    category: "Tiny Home",
    rating: 4.9,
    reviews: 15,
    sleeps: 3,
    bedrooms: 1,
    baths: 1,
    sizeSqFt: 266,
    checkIn: "3:00 PM",
    checkOut: "11:00 AM",
    petFriendly: false,
    heroImage: razzoCreekHero,
    gallery: [razzoCreekHero, razzoCreek2, razzoCreek3, razzoCreek4, razzoCreek5, razzoCreek6, razzoCreek7, razzoCreek8, razzoCreek9, razzoCreek10, razzoCreek11, razzoCreek12],
    highlights: [
      "Sleeps up to 3 guests",
      "Queen bed + futon",
      "Private outdoor seating",
      "Smart self check-in",
    ],
    featureChips: [
      { icon: "🛏️", label: "Queen bed + futon" },
      { icon: "🪑", label: "Private outdoor seating" },
      { icon: "🔑", label: "Smart self check-in" },
      { icon: "☕", label: "Coffee setup" },
      { icon: "🌿", label: "Steps from Creekside Cafe" },
      { icon: "🏊", label: "Access to pools + grand fire pit" },
    ],
    amenities: [
      "Container pools access",
      "Grand fire pit access",
      "Kitchenette",
      "Mini fridge/freezer",
      "Microwave",
      "Coffee maker",
      "Wi-Fi",
      "Smart lock self check-in",
      "Outdoor seating area",
      "Outdoor grill",
    ],
    amenityCategories: [
      {
        title: "Outdoors",
        items: ["Container pools access", "Grand fire pit access", "Outdoor seating area", "Outdoor grill"],
      },
      {
        title: "Kitchen & dining",
        items: ["Kitchenette", "Microwave", "Coffee maker", "Mini fridge/freezer"],
      },
      {
        title: "General",
        items: ["Wi-Fi", "Smart lock self check-in"],
      },
    ],
    policies: [
      "Flexible rescheduling within policy window",
      "Quiet hours observed after 10:00 PM",
      "Clear cancellation details provided at booking",
    ],
    houseRules: [
      "No smoking inside",
      "No parties or events unless approved",
      "Registered guests only",
      "Quiet hours after 10:00 PM",
    ],
    pricing: {
      standard: {
        title: "Weekday Rate",
        price: 189,
        features: ["Nightly rate", "Self check-in", "Private outdoor space"],
      },
      signature: {
        title: "Weekend Rate",
        price: 255,
        popular: true,
        features: [
          "Friday–Sunday",
          "All amenities included",
          "Access to pools + grand fire pit",
        ],
      },
      extended: {
        title: "Cleaning Fee",
        price: 50,
        features: [
          "One-time fee",
          "Professional cleaning",
          "Fresh linens provided",
        ],
      },
    },
  },
  {
    id: "apple-2-kona-meadows",
    slug: "apple-2-kona-meadows",
    name: "Kona Meadows",
    tagline: "Bright, airy comfort with room to relax and reconnect.",
    location: "Bruceville-Eddy, TX",
    shortDescription:
      "Bright, airy comfort with room to relax and reconnect.",
    description:
      "Kona Meadow offers a calm, modern retreat designed for slow mornings and peaceful evenings. Thoughtfully styled and comfortably equipped, this Apple Home places you steps away from The Tiny Escape's most loved experiences while still feeling like your own private hideaway.",
    category: "Tiny Home",
    rating: 4.9,
    reviews: 18,
    sleeps: 3,
    bedrooms: 1,
    baths: 1,
    sizeSqFt: 266,
    checkIn: "3:00 PM",
    checkOut: "11:00 AM",
    petFriendly: false,
    heroImage: konaMeadowHero,
    gallery: [konaMeadowHero, konaMeadow2, konaMeadow3, konaMeadow4, konaMeadow5, konaMeadow6, konaMeadow7, konaMeadow8, konaMeadow9, konaMeadow10],
    highlights: [
      "Sleeps up to 3 guests",
      "Queen bed + futon",
      "Private outdoor seating",
      "Smart self check-in",
    ],
    featureChips: [
      { icon: "🛏️", label: "Queen bed + futon" },
      { icon: "🪑", label: "Private outdoor seating" },
      { icon: "🔑", label: "Smart self check-in" },
      { icon: "☕", label: "Coffee setup" },
      { icon: "🌿", label: "Steps from Creekside Cafe" },
      { icon: "🏊", label: "Access to pools + grand fire pit" },
    ],
    amenities: [
      "Container pools access",
      "Grand fire pit access",
      "Kitchenette",
      "Mini fridge/freezer",
      "Microwave",
      "Coffee maker",
      "Wi-Fi",
      "Smart lock self check-in",
      "Outdoor seating area",
      "Outdoor grill",
    ],
    amenityCategories: [
      {
        title: "Outdoors",
        items: ["Container pools access", "Grand fire pit access", "Outdoor seating area", "Outdoor grill"],
      },
      {
        title: "Kitchen & dining",
        items: ["Kitchenette", "Microwave", "Coffee maker", "Mini fridge/freezer"],
      },
      {
        title: "General",
        items: ["Wi-Fi", "Smart lock self check-in"],
      },
    ],
    policies: [
      "Flexible rescheduling within policy window",
      "Quiet hours observed after 10:00 PM",
      "Clear cancellation details provided at booking",
    ],
    houseRules: [
      "No smoking inside",
      "No parties or events unless approved",
      "Registered guests only",
      "Quiet hours after 10:00 PM",
    ],
    pricing: {
      standard: {
        title: "Weekday Rate",
        price: 189,
        features: ["Nightly rate", "Self check-in", "Private outdoor space"],
      },
      signature: {
        title: "Weekend Rate",
        price: 255,
        popular: true,
        features: [
          "Friday–Sunday",
          "All amenities included",
          "Access to pools + grand fire pit",
        ],
      },
      extended: {
        title: "Cleaning Fee",
        price: 50,
        features: [
          "One-time fee",
          "Professional cleaning",
          "Fresh linens provided",
        ],
      },
    },
  },
  {
    id: "triangle-1-catalina-ridge",
    slug: "triangle-1-catalina-ridge",
    name: "Catalina Ridge",
    tagline: "A striking A-frame escape with panoramic views and peaceful surroundings.",
    location: "Bruceville-Eddy, TX",
    shortDescription:
      "A striking A-frame escape with panoramic views and peaceful surroundings.",
    description:
      "Catalina Ridge is a spacious A-frame retreat designed for guests who want a little more room to unwind. With its upstairs loft, warm modern finishes, and easy access to on-property experiences, this home is perfect for memory-making stays at The Tiny Escape.",
    category: "Tiny Home",
    rating: 4.9,
    reviews: 12,
    sleeps: 4,
    bedrooms: 1,
    baths: 1,
    sizeSqFt: 346,
    checkIn: "3:00 PM",
    checkOut: "11:00 AM",
    petFriendly: false,
    heroImage: catalinaRidgeHeroResized,
    gallery: [catalinaRidgeHeroResized, catalinaRidgeHero, catalinaRidge2, catalinaRidge3, catalinaRidge4, catalinaRidge5, catalinaRidge6, catalinaRidge7, catalinaRidge8, catalinaRidge9, catalinaRidge10, catalinaRidge11],
    highlights: [
      "Sleeps up to 4 guests",
      "Queen bed + Modular sofa",
      "Upstairs loft sleeping area",
      "Elevated A-frame design",
    ],
    featureChips: [
      { icon: "🛏️", label: "Queen bed + Modular sofa" },
      { icon: "🏠", label: "Upstairs loft sleeping area" },
      { icon: "🪑", label: "Private outdoor seating" },
      { icon: "🔑", label: "Smart self check-in" },
      { icon: "☕", label: "Coffee setup" },
      { icon: "🏊", label: "Access to pools + grand fire pit" },
    ],
    amenities: [
      "Container pools access",
      "Grand fire pit access",
      "Kitchenette",
      "Mini fridge/freezer",
      "Microwave",
      "Coffee maker",
      "Wi-Fi",
      "Smart lock self check-in",
      "Outdoor seating area",
      "Outdoor grill",
    ],
    amenityCategories: [
      {
        title: "Outdoors",
        items: ["Container pools access", "Grand fire pit access", "Outdoor seating area", "Outdoor grill"],
      },
      {
        title: "Kitchen & dining",
        items: ["Kitchenette", "Microwave", "Coffee maker", "Mini fridge/freezer"],
      },
      {
        title: "General",
        items: ["Wi-Fi", "Smart lock self check-in"],
      },
    ],
    policies: [
      "Flexible rescheduling within policy window",
      "Quiet hours observed after 10:00 PM",
      "Clear cancellation details provided at booking",
    ],
    houseRules: [
      "No smoking inside",
      "No parties or events unless approved",
      "Registered guests only",
      "Quiet hours after 10:00 PM",
    ],
    pricing: {
      standard: {
        title: "Weekday Rate",
        price: 215,
        features: ["Nightly rate", "Self check-in", "Private outdoor space"],
      },
      signature: {
        title: "Weekend Rate",
        price: 285,
        popular: true,
        features: [
          "Friday–Sunday",
          "All amenities included",
          "Access to pools + grand fire pit",
        ],
      },
      extended: {
        title: "Cleaning Fee",
        price: 50,
        features: [
          "One-time fee",
          "Professional cleaning",
          "Fresh linens provided",
        ],
      },
    },
  },
  {
    id: "triangle-2-rani-ridge",
    slug: "triangle-2-rani-ridge",
    name: "Rani Ridge",
    tagline: "Spacious and inviting, perfect for slow days and memorable stays.",
    location: "Bruceville-Eddy, TX",
    shortDescription:
      "Spacious and inviting, perfect for slow days and memorable stays.",
    description:
      "Rani Ridge blends cozy comfort with elevated design, featuring an upstairs loft and thoughtfully curated interiors. Ideal for small families or friends traveling together, this A-frame delivers the signature Tiny Escape experience with extra room to relax.",
    category: "Tiny Home",
    rating: 4.9,
    reviews: 16,
    sleeps: 4,
    bedrooms: 1,
    baths: 1,
    sizeSqFt: 346,
    checkIn: "3:00 PM",
    checkOut: "11:00 AM",
    petFriendly: false,
    heroImage: raniRidgeHero,
    gallery: [raniRidgeHero, raniRidge2, raniRidge3, raniRidge4, raniRidge5, raniRidge6, raniRidge7, raniRidge8, raniRidge9, raniRidge10, raniRidge11, raniRidge12],
    highlights: [
      "Sleeps up to 4 guests",
      "Queen bed + Daybed",
      "Upstairs loft sleeping area",
      "Elevated A-frame design",
    ],
    featureChips: [
      { icon: "🛏️", label: "Queen bed + Daybed" },
      { icon: "🏠", label: "Upstairs loft sleeping area" },
      { icon: "🪑", label: "Private outdoor seating" },
      { icon: "🔑", label: "Smart self check-in" },
      { icon: "☕", label: "Coffee setup" },
      { icon: "🏊", label: "Access to pools + grand fire pit" },
    ],
    amenities: [
      "Container pools access",
      "Grand fire pit access",
      "Kitchenette",
      "Mini fridge/freezer",
      "Microwave",
      "Coffee maker",
      "Wi-Fi",
      "Smart lock self check-in",
      "Outdoor seating area",
      "Outdoor grill",
    ],
    amenityCategories: [
      {
        title: "Outdoors",
        items: ["Container pools access", "Grand fire pit access", "Outdoor seating area", "Outdoor grill"],
      },
      {
        title: "Kitchen & dining",
        items: ["Kitchenette", "Microwave", "Coffee maker", "Mini fridge/freezer"],
      },
      {
        title: "General",
        items: ["Wi-Fi", "Smart lock self check-in"],
      },
    ],
    policies: [
      "Flexible rescheduling within policy window",
      "Quiet hours observed after 10:00 PM",
      "Clear cancellation details provided at booking",
    ],
    houseRules: [
      "No smoking inside",
      "No parties or events unless approved",
      "Registered guests only",
      "Quiet hours after 10:00 PM",
    ],
    pricing: {
      standard: {
        title: "Weekday Rate",
        price: 215,
        features: ["Nightly rate", "Self check-in", "Private outdoor space"],
      },
      signature: {
        title: "Weekend Rate",
        price: 285,
        popular: true,
        features: [
          "Friday–Sunday",
          "All amenities included",
          "Access to pools + grand fire pit",
        ],
      },
      extended: {
        title: "Cleaning Fee",
        price: 50,
        features: [
          "One-time fee",
          "Professional cleaning",
          "Fresh linens provided",
        ],
      },
    },
  },
];

export const getAllStays = () => staysData;

export const getStayBySlug = (slug) =>
  staysData.find((stay) => stay.slug === slug);
