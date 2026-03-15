import tinyHouse1 from "../assets/tiny house1.webp";
import tinyEscape3 from "../assets/tiny escape 3.jpg";

// Razzo Creek (Apple 1) images
import razzoCreek1 from "../assets/homes/razzo-creek/razzo-creek-1.jpg";
import razzoCreek2 from "../assets/homes/razzo-creek/razzo-creek-2.jpg";

// Kona Meadow (Apple 2) images
import konaMeadow1 from "../assets/homes/kona-meadow/kona-meadow-1.jpg";
import konaMeadow2 from "../assets/homes/kona-meadow/kona-meadow-2.jpg";
import konaMeadow3 from "../assets/homes/kona-meadow/kona-meadow-3.jpg";

// Shared A-frame feature image
import tinyEscape2026 from "../assets/homes/catalina-ridge/catalina-ridge-new.png";

// Catalina Ridge (Triangle 1) images
import catalinaRidge1 from "../assets/homes/catalina-ridge/catalina-ridge-1.jpg";
import catalinaRidge4 from "../assets/homes/catalina-ridge/catalina-ridge-4.jpg";
import catalinaRidge7 from "../assets/homes/catalina-ridge/catalina-ridge-7.jpg";

// Rani Ridge (Triangle 2) images
import raniRidge2 from "../assets/homes/rani-ridge/rani-ridge-2.jpg";
import raniRidge6 from "../assets/homes/rani-ridge/rani-ridge-6.jpg";
import raniRidge8 from "../assets/homes/rani-ridge/rani-ridge-8.jpg";
import raniRidge9 from "../assets/homes/rani-ridge/rani-ridge-9.jpg";

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
    heroImage: razzoCreek1,
    gallery: [razzoCreek1, razzoCreek2],
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
    ],
    amenityCategories: [
      {
        title: "Outdoors",
        items: ["Container pools access", "Grand fire pit access", "Outdoor seating area"],
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
      "No parties or events",
      "Registered guests only",
      "Quiet hours after 10:00 PM",
    ],
    pricing: {
      standard: {
        title: "Weekday Rate",
        price: 205,
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
    heroImage: konaMeadow2,
    gallery: [konaMeadow1, konaMeadow2, konaMeadow3],
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
    ],
    amenityCategories: [
      {
        title: "Outdoors",
        items: ["Container pools access", "Grand fire pit access", "Outdoor seating area"],
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
      "No parties or events",
      "Registered guests only",
      "Quiet hours after 10:00 PM",
    ],
    pricing: {
      standard: {
        title: "Weekday Rate",
        price: 205,
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
    heroImage: catalinaRidge1,
    gallery: [catalinaRidge1, catalinaRidge4, catalinaRidge7],
    highlights: [
      "Sleeps up to 4 guests",
      "Queen bed + futon",
      "Upstairs loft sleeping area",
      "Elevated A-frame design",
    ],
    featureChips: [
      { icon: "🛏️", label: "Queen bed + futon" },
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
    ],
    amenityCategories: [
      {
        title: "Outdoors",
        items: ["Container pools access", "Grand fire pit access", "Outdoor seating area"],
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
      "No parties or events",
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
    heroImage: raniRidge2,
    gallery: [raniRidge2, raniRidge6, raniRidge8, raniRidge9],
    highlights: [
      "Sleeps up to 4 guests",
      "Queen bed + futon",
      "Upstairs loft sleeping area",
      "Elevated A-frame design",
    ],
    featureChips: [
      { icon: "🛏️", label: "Queen bed + futon" },
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
    ],
    amenityCategories: [
      {
        title: "Outdoors",
        items: ["Container pools access", "Grand fire pit access", "Outdoor seating area"],
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
      "No parties or events",
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
