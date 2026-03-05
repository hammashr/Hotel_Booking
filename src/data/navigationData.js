const UNDER_DEVELOPMENT_PATH = '/under-development';

const NAV_ITEMS = [
  { name: "Home", path: "/" },
  {
    name: "Stays",
    path: "/tours",
    hasDropdown: true,
    dropdownItems: [
      { name: "Razzo Creek", path: "/stay/apple-1-razoo-creek", icon: "" },
      { name: "Kona Meadows", path: "/stay/apple-2-kona-meadows", icon: "" },
      { name: "Catalina Ridge", path: "/stay/triangle-1-catalina-ridge", icon: "" },
      { name: "Rani Ridge", path: "/stay/triangle-2-rani-ridge", icon: "" },
    ]
  },
  {
    name: "Experiences",
    path: "/destinations",
    hasDropdown: false
  },
  { name: "Creekside Cafe", path: "/creeks-cafe" },
  { name: "Fireside Pavilion", path: "/pavillion" },
  { name: "Gallery", path: "/gallery" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export const getNavItems = () =>
  NAV_ITEMS.map((item) => {
    const isAllowedLiveRoute =
      item.name === 'Home' ||
      item.name === 'Stays' ||
      item.name === 'Fireside Pavilion' ||
      item.name === 'Creekside Cafe' ||
      item.name === 'Experiences' ||
      item.name === 'Gallery' ||
      item.name === 'About' ||
      item.name === 'Contact';

    if (isAllowedLiveRoute) {
      return item;
    }

    return {
      ...item,
      path: UNDER_DEVELOPMENT_PATH,
      dropdownItems: item.dropdownItems
        ? item.dropdownItems.map((dropItem) => ({
            ...dropItem,
            path: UNDER_DEVELOPMENT_PATH
          }))
        : undefined
    };
  });
