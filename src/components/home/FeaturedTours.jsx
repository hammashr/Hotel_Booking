import React, { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { getAllStays } from "../../data/staysData";
import { useHousesData } from "../../hooks/useHousesData";
import { FaSwimmingPool, FaCoffee, FaUtensils } from "react-icons/fa";

const CARD_AMENITIES = [
  { label: "Swimming pool", icon: FaSwimmingPool },
  { label: "Cafe", icon: FaCoffee },
  { label: "Kitchen", icon: FaUtensils },
];

const FeaturedTours = ({ isDarkMode }) => {
  const toursPath = "/tours";
  const { houses } = useHousesData({ fallbackData: getAllStays() });

  // Memoize tours data to prevent recreation on every render
  const tours = useMemo(() => {
    const catalina = houses.find(
      (stay) => stay.slug === "triangle-1-catalina-ridge",
    );
    const rani = houses.find((stay) => stay.slug === "triangle-2-rani-ridge");
    const kona = houses.find((stay) => stay.slug === "apple-2-kona-meadows");

    return [
      {
        frontImage: catalina?.heroImage,
        title: "Catalina Ridge",
        subtitle: "A-Frame Cabin • Panoramic windows",
        description:
          "Warm wood interiors, panoramic windows, and a private deck invite you to slow down and soak in the beauty around you.",
        link: "/stay/triangle-1-catalina-ridge",
      },
      {
        frontImage: rani?.heroImage,
        title: "Rani Ridge",
        subtitle: "A-Frame Cabin • Cozy retreat",
        description:
          "A peaceful A-Frame stay designed for couples and small families looking to reset and reconnect.",
        link: "/stay/triangle-2-rani-ridge",
      },
      {
        frontImage: kona?.heroImage,
        title: "Kona Meadow",
        subtitle: "Tiny Home • Sleek and sustainable",
        description:
          "Innovative tiny-home design blending eco-conscious living with comfort and style.",
        link: "/stay/apple-2-kona-meadows",
      },
    ];
  }, [houses]);

  return (
    <section
      className={`relative py-16 md:py-24 lg:py-32 overflow-hidden transition-colors duration-500 ${
        isDarkMode
          ? "bg-linear-to-b from-[#0F0D0A] via-[#171310] to-[#0F0D0A]"
          : "bg-linear-to-b from-[#FAF7F0] via-[#E9F1E5] to-[#FAF7F0]"
      }`}
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center mb-12 md:mb-20">
          <div
            className={`inline-flex items-center gap-2 mb-5 sm:mb-6 rounded-full border backdrop-blur-sm px-4 sm:px-6 py-2.5 sm:py-3 transition-colors duration-500 ${
              isDarkMode
                ? "border-[rgba(201,163,106,0.35)] bg-[rgba(26,22,18,0.7)] shadow-[0_0_30px_rgba(201,163,106,0.18)]"
                : "border-[rgba(31,58,42,0.28)] bg-[rgba(250,247,240,0.75)] shadow-[0_0_30px_rgba(31,58,42,0.16)]"
            }`}
          >
            <div
              className={`h-2 w-2 rounded-full animate-pulse ${
                isDarkMode ? "bg-[#C9A36A]" : "bg-[#1F3A2A]"
              }`}
            />
            <span
              className={`text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors duration-500 ${
                isDarkMode ? "text-[#C9A36A]" : "text-[#1F3A2A]"
              }`}
            >
              Our Stays
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 sm:mb-6 leading-tight">
            <Link
              to={toursPath}
              className={`group inline-block transition-colors ${
                isDarkMode ? "hover:text-[#C9A36A]" : "hover:text-[#1F3A2A]"
              }`}
            >
              <span
                className={`transition-colors duration-500 ${
                  isDarkMode ? "text-[#F2F6F9]" : "text-[#1F2A1F]"
                }`}
              >
                Featured{" "}
              </span>
              <span
                className={`bg-clip-text text-transparent transition-colors duration-500 ${
                  isDarkMode
                    ? "bg-linear-to-r from-[#C9A36A] via-[#E7CFA2] to-[#C9A36A]"
                    : "bg-linear-to-r from-[#1F3A2A] via-[#5F8C6A] to-[#1F3A2A]"
                }`}
              >
                Stays
              </span>
              <div
                className={`h-0.5 w-0 rounded-full transition-all duration-500 group-hover:w-full mt-2 ${
                  isDarkMode
                    ? "bg-linear-to-r from-[#C9A36A] to-[#E7CFA2]"
                    : "bg-linear-to-r from-[#1F3A2A] to-[#5F8C6A]"
                }`}
              />
            </Link>
          </h2>
          <p
            className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed transition-colors duration-500 ${
              isDarkMode ? "text-[#A79C8C]" : "text-[#3E4F3E]"
            }`}
          >
            Tiny in size, big on experience. Explore our A-Frame cabins and
            Tiny Homes designed for comfort, style, and slow living.
          </p>
        </div>

        <div className="space-y-14 md:space-y-20">
          {tours.map((tour, index) => {
            const isImageRight = index % 2 === 0;
            const contentOrderClass = isImageRight
              ? "md:order-1"
              : "md:order-2";
            const imageOrderClass = isImageRight ? "md:order-2" : "md:order-1";

            return (
              <article
                key={tour.title}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center reveal-on-scroll"
                data-reveal
                style={{ transitionDelay: `${index * 70}ms` }}
              >
                <div className={contentOrderClass}>
                  <p
                    className={`mb-3 text-xs md:text-sm font-semibold tracking-[0.2em] uppercase ${isDarkMode ? "text-[#8B949E]" : "text-[#64748B]"}`}
                  >
                    Stay {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3
                    className={`text-3xl md:text-5xl font-extrabold uppercase tracking-tight mb-3 bg-clip-text text-transparent ${
                      isDarkMode
                        ? "bg-linear-to-r from-[#A8C9B1] to-[#5F8C6A]"
                        : "bg-linear-to-r from-[#2F5D3A] to-[#7BAF7C]"
                    }`}
                  >
                    {tour.title}
                  </h3>
                  <p
                    className={`text-sm sm:text-base md:text-lg font-medium mb-4 ${isDarkMode ? "text-[#CDBEAC]" : "text-[#4B5F4B]"}`}
                  >
                    {tour.subtitle}
                  </p>
                  <p
                    className={`text-base md:text-xl md:leading-[1.45] leading-relaxed ${isDarkMode ? "text-[#B7C0CC]" : "text-[#334155]"}`}
                  >
                    {tour.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2.5">
                    {CARD_AMENITIES.map((amenity) => {
                      const Icon = amenity.icon;

                      return (
                        <div
                          key={amenity.label}
                          className={`inline-flex items-center gap-2.5 px-3 py-2 rounded-full border ${
                            isDarkMode
                              ? "bg-[#111A13] border-[#2A4331] text-[#C9D6DF]"
                              : "bg-white border-[#DCE8DD] text-[#2D3748]"
                          }`}
                        >
                          <span
                            className={`w-7 h-7 rounded-full flex items-center justify-center ${
                              isDarkMode
                                ? "bg-[#1A3A1A] text-[#6BAF7A]"
                                : "bg-[#EAF3EA] text-[#2F5D3A]"
                            }`}
                          >
                            <Icon size={12} />
                          </span>
                          <span className="text-xs sm:text-sm font-medium leading-none">
                            {amenity.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-8">
                    <Link
                      to={tour.link}
                      className={`inline-flex items-center justify-center min-w-[170px] rounded-full px-6 py-3 text-sm md:text-base font-semibold transition-all duration-300 ${
                        isDarkMode
                          ? "bg-linear-to-r from-[#1F3A2A] to-[#5F8C6A] text-[#F7FBF7] hover:from-[#5F8C6A] hover:to-[#1F3A2A]"
                          : "bg-linear-to-r from-[#2F5D3A] to-[#7BAF7C] text-white hover:from-[#7BAF7C] hover:to-[#2F5D3A]"
                      }`}
                    >
                      View Details
                    </Link>
                  </div>
                </div>

                <div className={imageOrderClass}>
                  <div
                    className={`overflow-hidden rounded-2xl border ${isDarkMode ? "border-[rgba(201,163,106,0.25)]" : "border-[#DDE8DD]"}`}
                  >
                    <img
                      src={tour.frontImage}
                      alt={tour.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-[280px] sm:h-[340px] md:h-[390px] lg:h-[430px] object-cover transition-transform duration-700 hover:scale-[1.03]"
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="text-center mt-10 sm:mt-12">
          <Link to={toursPath}>
            <button
              className={`group rounded-xl border-2 backdrop-blur-sm px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 ${
                isDarkMode
                  ? "border-[rgba(201,163,106,0.45)] bg-[rgba(26,22,18,0.7)] text-[#F2EEE7] hover:border-[#C9A36A] hover:bg-[rgba(201,163,106,0.12)]"
                  : "border-[#D4E2D4] bg-[rgba(255,255,255,0.92)] text-[#1F2A1F] hover:border-[#1F3A2A] hover:bg-[rgba(31,58,42,0.08)]"
              }`}
            >
              <span className="flex items-center gap-2">
                View All Stays
                <svg
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default memo(FeaturedTours);
