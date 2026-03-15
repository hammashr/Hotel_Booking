import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaBed, FaBath } from "react-icons/fa";

const StayResultsGrid = memo(
  ({
    isDarkMode,
    stays,
    isSearched,
    isLoading,
    totalCount,
    selectedDates,
  }) => {
    const navigate = useNavigate();

    const handleViewStay = (stay) => {
      navigate(`/stay/${stay.slug}`, {
        state: {
          prefillDates: selectedDates || undefined,
        },
      });
    };

    if (!isSearched && !isLoading) return null;

    return (
      <section
        className={`py-12 md:py-16 transition-colors duration-500 ${
          isDarkMode
            ? "bg-linear-to-b from-[#0F0D0A] to-[#120F0C]"
            : "bg-linear-to-b from-[#F5F9F3] to-[#FAFCF9]"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Results header */}
          <div className="mb-8 text-center">
            {isLoading ? (
              <div className="flex items-center justify-center gap-3">
                <div
                  className={`h-5 w-5 rounded-full border-2 border-t-transparent animate-spin ${
                    isDarkMode ? "border-[#6BAF7A]" : "border-[#2F5D3A]"
                  }`}
                />
                <p
                  className={`text-sm font-medium ${
                    isDarkMode ? "text-[#CDBEAC]" : "text-[#4B5F4B]"
                  }`}
                >
                  Checking availability across all stays...
                </p>
              </div>
            ) : stays.length > 0 ? (
              <div>
                <h3
                  className={`text-2xl sm:text-3xl font-bold mb-2 ${
                    isDarkMode ? "text-[#F2EEE7]" : "text-[#1F2A1F]"
                  }`}
                >
                  {stays.length === totalCount
                    ? "All stays are available"
                    : `${stays.length} of ${totalCount} stays available`}
                </h3>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-[#A79C8C]" : "text-[#4B5F4B]"
                  }`}
                >
                  for your selected dates
                </p>
              </div>
            ) : (
              <div
                className={`max-w-md mx-auto rounded-2xl p-8 border ${
                  isDarkMode
                    ? "bg-[#16120F] border-[#2A2119]"
                    : "bg-white border-[#DDE8DD]"
                }`}
              >
                <div className="text-center">
                  <svg
                    className={`h-12 w-12 mx-auto mb-4 ${
                      isDarkMode ? "text-[#4A3A2A]" : "text-[#C0D0C0]"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <h4
                    className={`text-lg font-bold mb-2 ${
                      isDarkMode ? "text-[#F2EEE7]" : "text-[#1F2A1F]"
                    }`}
                  >
                    No Availability
                  </h4>
                  <p
                    className={`text-sm ${
                      isDarkMode ? "text-[#A79C8C]" : "text-[#4B5F4B]"
                    }`}
                  >
                    No stays are available for these dates. Try adjusting your
                    check-in or check-out dates.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Results grid */}
          {stays.length > 0 && !isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stays.map((stay, index) => (
                <article
                  key={stay.slug}
                  className={`group rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    isDarkMode
                      ? "border-[#2A2119] bg-[#16120F] hover:border-[#3A3020]"
                      : "border-[#DDE8DD] bg-white hover:border-[#C0D4C0]"
                  }`}
                  style={{
                    animation: `cardFadeIn 0.4s ease-out ${index * 80}ms both`,
                  }}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={stay.heroImage}
                      alt={stay.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Available badge */}
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#2F5D3A]/90 text-white backdrop-blur-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#A8E6A3] animate-pulse" />
                        Available
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h4
                      className={`font-bold text-base mb-1 ${
                        isDarkMode ? "text-[#F2EEE7]" : "text-[#1F2A1F]"
                      }`}
                    >
                      {stay.name}
                    </h4>
                    <p
                      className={`text-xs mb-3 ${
                        isDarkMode ? "text-[#A79C8C]" : "text-[#6B7C6B]"
                      }`}
                    >
                      {stay.location}
                    </p>

                    {/* Quick stats */}
                    <div
                      className={`flex items-center gap-3 text-xs mb-4 ${
                        isDarkMode ? "text-[#8A9A8A]" : "text-[#6B7C6B]"
                      }`}
                    >
                      <span className="flex items-center gap-1">
                        <FaUsers size={10} />
                        {stay.sleeps}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaBed size={10} />
                        {stay.bedrooms}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaBath size={10} />
                        {stay.baths}
                      </span>
                    </div>

                    {/* Price + CTA */}
                    <div className="flex items-end justify-between">
                      <div>
                        <span
                          className={`text-lg font-bold ${
                            isDarkMode ? "text-[#E0E7EE]" : "text-[#1F2A1F]"
                          }`}
                        >
                          ${stay.pricing?.standard?.price || "—"}
                        </span>
                        <span
                          className={`text-xs ml-1 ${
                            isDarkMode ? "text-[#8A9A8A]" : "text-[#94A394]"
                          }`}
                        >
                          /night
                        </span>
                      </div>
                      <button
                        onClick={() => handleViewStay(stay)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] ${
                          isDarkMode
                            ? "bg-[#2F5D3A] text-white hover:bg-[#3A7048]"
                            : "bg-[#1F3A2A] text-white hover:bg-[#2F5D3A]"
                        }`}
                      >
                        View
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <style>{`
          @keyframes cardFadeIn {
            from { opacity: 0; transform: translateY(16px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </section>
    );
  },
);

StayResultsGrid.displayName = "StayResultsGrid";

export default StayResultsGrid;
