import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import PageLayout from "../components/layout/PageLayout";
import horseRidingOne from "../assets/horse riding/horse riding/horse riding 1.jpg";
import swimmingPoolThree from "../assets/swimming pool/swimming pool/swimming pool 3.jpg";
import firepitImage from "../assets/firepit/Firepit.jpg";
import kartTrackImage from "../assets/gallery/gallery-kart-1.jpeg";

const EXPERIENCE_SECTIONS = [
  {
    id: "horseback-riding",
    title: "Horseback Riding",
    description:
      "Enjoy guided horseback riding designed for guests looking to slow down and experience the beauty of The Tiny Escape in a memorable and peaceful way. Perfect for couples, families, and first-time riders.",
    image: horseRidingOne,
    imageAlt: "Horseback riding experience",
    imageOnRight: true,
  },
  {
    id: "container-pools",
    title: "Container Pools",
    description:
      "Cool off and unwind in our modern container pools — the perfect place to relax, refresh, and enjoy peaceful moments during your stay.",
    image: swimmingPoolThree,
    imageAlt: "Container pools experience",
    imageOnRight: false,
  },
  {
    id: "trails",
    title: "Trails",
    description:
      "Explore nearby walking trails at your own pace, perfect for quiet morning strolls or peaceful sunset moments in nature.",
    image:
      "https://images.unsplash.com/photo-1501554728187-ce583db33af7?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Nature trail experience",
    imageOnRight: true,
  },
  {
    id: "grand-fire-pit",
    title: "Grand Fire Pit",
    description:
      "Gather under the stars around our grand fire pit, designed to comfortably seat up to 16 guests. It's the perfect setting for relaxed evenings, meaningful conversations, and classic fireside moments — especially when paired with a cozy s'mores night.",
    image: firepitImage,
    imageAlt: "Grand Fire Pit experience",
    imageOnRight: false,
  },
  {
    id: "go-kart-track",
    title: "Go Kart Track",
    description:
      "Our upcoming go-kart track will bring a fun, high-energy experience to The Tiny Escape. Stay tuned for more details as we prepare to launch.",
    image: kartTrackImage,
    imageAlt: "Go Kart Track coming soon",
    imageOnRight: true,
    comingSoon: true,
  },
];

const Destinations = () => {
  const { isDarkMode } = useTheme();

  return (
    <PageLayout
      seo={{
        title: "Experiences | The Tiny Escape",
        description:
          "Explore all Tiny Escape experiences: horseback riding, container pools, trails, grand fire pit, and go-kart track.",
        keywords:
          "Tiny Escape experiences, horseback riding, container pools, trails, grand fire pit, go-kart track",
        url: "/destinations",
      }}
      className={isDarkMode ? "" : "bg-[#F8FAFC]"}
    >
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 md:pt-20 pb-20 md:pb-28">
        <header className="mb-14 md:mb-20 reveal-on-scroll" data-reveal>
          <h1
            className={`text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent ${
              isDarkMode
                ? "bg-linear-to-r from-[#A8C9B1] to-[#5F8C6A]"
                : "bg-linear-to-r from-[#2F5D3A] to-[#7BAF7C]"
            }`}
          >
            EXPERIENCES
          </h1>
          <p
            className={`mt-4 max-w-3xl text-lg md:text-2xl leading-relaxed ${isDarkMode ? "text-[#B7C0CC]" : "text-[#334155]"}`}
          >
            Enhance your stay with curated on-property experiences — some included with your visit and others available as optional add-ons.
          </p>
        </header>

        <div className="space-y-16 md:space-y-24">
          {EXPERIENCE_SECTIONS.map((section, index) => {
            const contentOrderClass = section.imageOnRight
              ? "md:order-1"
              : "md:order-2";
            const imageOrderClass = section.imageOnRight
              ? "md:order-2"
              : "md:order-1";

            return (
              <article
                key={section.id}
                id={section.id}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center reveal-on-scroll"
                data-reveal
                style={{ transitionDelay: `${index * 70}ms` }}
              >
                <div className={`${contentOrderClass}`}>
                  <p
                    className={`mb-3 text-xs md:text-sm font-semibold tracking-[0.2em] uppercase ${isDarkMode ? "text-[#8B949E]" : "text-[#64748B]"}`}
                  >
                    Experience {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2
                    className={`text-3xl md:text-6xl font-extrabold uppercase tracking-tight mb-4 bg-clip-text text-transparent ${
                      isDarkMode
                        ? "bg-linear-to-r from-[#A8C9B1] to-[#5F8C6A]"
                        : "bg-linear-to-r from-[#2F5D3A] to-[#7BAF7C]"
                    }`}
                  >
                    {section.title}
                    {section.comingSoon && (
                      <span className="ml-3 align-middle inline-block rounded-md bg-linear-to-r from-[#D1965A] to-[#F1C281] px-2 py-1 text-[11px] md:text-xs font-black uppercase tracking-wider text-[#1A120A] shadow-md animate-pulse">
                        Coming Soon
                      </span>
                    )}
                  </h2>
                  <p
                    className={`text-base md:text-xl lg:text-2xl md:leading-[1.45] leading-relaxed ${isDarkMode ? "text-[#B7C0CC]" : "text-[#334155]"}`}
                  >
                    {section.description}
                  </p>
                  {!section.comingSoon && (
                    <div className="mt-8">
                      <Link
                        to="/book-now"
                        className={`inline-flex items-center justify-center min-w-[170px] rounded-full px-6 py-3 text-lg font-semibold transition-all duration-300 ${
                          isDarkMode
                            ? "bg-linear-to-r from-[#1F3A2A] to-[#5F8C6A] text-[#F7FBF7] hover:from-[#5F8C6A] hover:to-[#1F3A2A]"
                            : "bg-linear-to-r from-[#2F5D3A] to-[#7BAF7C] text-white hover:from-[#7BAF7C] hover:to-[#2F5D3A]"
                        }`}
                      >
                        Book Your Stay
                      </Link>
                    </div>
                  )}
                </div>

                <div className={`${imageOrderClass}`}>
                  <div className="overflow-hidden rounded-sm">
                    <img
                      src={section.image}
                      alt={section.imageAlt}
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
      </section>
    </PageLayout>
  );
};

export default Destinations;
