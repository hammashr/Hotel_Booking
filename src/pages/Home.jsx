import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import {
  getOrganizationSchema,
  getReviewSchema,
} from "../utils/structuredData";
import heroVideo from "../assets/videos/hero.mp4";

// Layout Components
import PageLayout from "../components/layout/PageLayout";

// Home Components
import HeroSection from "../components/home/HeroSection";

// Assets
import tinyEscape7 from "../assets/tiny escape 7.jpeg";
import tinyEscape3 from "../assets/tiny escape 3.jpg";
import parkingImage from "../assets/gallery/gallery-parking-1.jpeg";
import cafeImage from "../assets/gallery/gallery-cafe-wa-1.jpeg";
import firepitImage from "../assets/firepit/Firepit.jpg";
import poolImage from "../assets/swimming pool/swimming pool/swimming pool 6.jpeg";
import horseImage from "../assets/horse riding/horse riding/Horseback riding image.jpeg";
import pavilionImage from "../assets/Pavilion images/Pavilion images/pavilion 10.jpeg";
import walkingTrailImage from "../assets/walking trails/walking Trail 2.jpeg";

const AMENITIES = [
  {
    title: "Creekside Cafe",
    description: "Start your mornings right with fresh coffee and bites at our on-site café, nestled right at the property.",
    image: cafeImage,
    link: "/creeks-cafe",
  },
  {
    title: "Grand Fire Pit",
    description: "Gather under the stars around our grand communal fire pit — perfect for evenings with good company.",
    image: firepitImage,
    link: "/destinations",
  },
  {
    title: "Container Pools",
    description: "Cool off in our unique container pools, a refreshing way to unwind during warm Texas days.",
    image: poolImage,
    link: "/destinations",
  },
  {
    title: "Guided Horseback Riding",
    description: "Explore scenic countryside trails on horseback with our guided riding experience.",
    image: horseImage,
    link: "/destinations#horseback-riding",
  },
  {
    title: "Open-Air Pavilion",
    description: "Host events or simply relax in our beautiful open-air pavilion surrounded by nature.",
    image: pavilionImage,
    link: "/pavillion",
  },
  {
    title: "Walking Trails",
    description: "Wander at your own pace along peaceful nature trails — ideal for morning or sunset strolls.",
    image: walkingTrailImage,
    link: "/destinations#trails",
  },
  {
    title: "On-Site Guest Parking",
    description: "Ample, convenient parking right at the property so your arrival is effortless.",
    image: parkingImage,
    link: "/contact",
  },
];


const TESTIMONIALS = [
  {
    name: "Rosalia Treto",
    rating: 5,
    date: "4 months ago",
    text: "I absolutely loved my stay at The Tiny Escape! From the moment I arrived, I felt an incredible sense of peace and calm. The location is beautiful — tucked away just enough to feel private, yet still close to everything you need. Cozy, thoughtfully designed, and full of charm. I left feeling refreshed and already can't wait to come back! 🌿✨",
    avatar: "R",
  },
  {
    name: "tauseef ashraf",
    rating: 5,
    date: "Recently",
    text: "The Tiny Escape is a peaceful forest retreat nestled halfway between Austin and Dallas. Cozy Scandinavian-style tiny homes sit among tall trees with a flowing creek nearby. Waking up to birdsong and sunlight through the woods is unforgettable and the included horse ride through shaded trails is a true highlight!",
    avatar: "T",
  },
  {
    name: "Manuel Fajardo",
    rating: 5,
    date: "9 months ago",
    text: "Loved the stay, very nice and peaceful, had a blast! 10/10",
    avatar: "M",
  },
  {
    name: "Christy Jaynes",
    rating: 5,
    date: "A year ago",
    text: "Amazing, beautiful and relaxing atmosphere.",
    avatar: "C",
  },
];

const StarRating = ({ count }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <svg key={i} className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const Home = () => {
  const { isDarkMode } = useTheme();

  // Reveal-on-scroll observer
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!elements.length) return undefined;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-in");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
      if (inView) {
        el.classList.add("reveal-in");
      } else {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [isDarkMode]);

  const structuredData = useMemo(
    () => ({
      ...getOrganizationSchema(),
      ...getReviewSchema({ averageRating: "4.9", count: "1250" }),
    }),
    [],
  );

  const viewStaysPath = "/tours";
  const requestAvailabilityPath = "/book-now";

  return (
    <PageLayout
      seo={{
        title: "The Tiny Escape | Tiny Homes and Resort Stays",
        description:
          "The Tiny Escape offers calm, design-forward tiny homes and cabins. Private decks, wide skies, and easy check-in for a restorative stay.",
        keywords:
          "The Tiny Escape, tiny home resort, cabin stays, weekend getaway, design-forward stays",
        url: "/",
        structuredData,
      }}
    >
      {/* Hero Section */}
      <HeroSection isDarkMode={isDarkMode} videoSrc={heroVideo} />

      {/* ── A Different Kind of Escape ── */}
      <section
        className={`relative py-16 md:py-24 lg:py-28 transition-colors duration-500 ${
          isDarkMode ? "bg-[#0F0D0A]" : "bg-[#F5F9F3]"
        }`}
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center" data-reveal>
          <p
            className={`text-xs uppercase tracking-[0.22em] font-bold mb-4 ${
              isDarkMode ? "text-[#C9A36A]" : "text-[#2F5D3A]"
            }`}
          >
            Welcome
          </p>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 ${
              isDarkMode ? "text-[#F2EEE7]" : "text-[#1F2A1F]"
            }`}
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            A Different Kind of Escape
          </h2>
          <p
            className={`text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-5 ${
              isDarkMode ? "text-[#C4B9A8]" : "text-[#3E4F3E]"
            }`}
          >
            Nestled between Waco and Temple in the heart of Central Texas, The Tiny Escape is a thoughtfully designed tiny home village created to help you unplug, unwind, and reconnect with nature.
          </p>
          <p
            className={`text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-10 ${
              isDarkMode ? "text-[#C4B9A8]" : "text-[#3E4F3E]"
            }`}
          >
            Enjoy slow mornings at the Creekside Café, gather under the stars at the grand fire pit, cool off in our two container pools, or explore the property with guided horseback riding. Every detail is designed to help you slow down and breathe a little deeper.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to={viewStaysPath}
              className={`inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 shadow-lg ${
                isDarkMode
                  ? "bg-[#C9A36A] text-[#1A120A] hover:bg-[#E7CFA2]"
                  : "bg-[#1F3A2A] text-white hover:bg-[#2F5D3A]"
              }`}
            >
              View Our Stays
            </Link>
            <Link
              to={requestAvailabilityPath}
              className={`inline-flex items-center gap-2 rounded-xl border-2 px-7 py-3.5 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 ${
                isDarkMode
                  ? "border-[#C9A36A] text-[#C9A36A] hover:bg-[rgba(201,163,106,0.1)]"
                  : "border-[#1F3A2A] text-[#1F3A2A] hover:bg-[rgba(31,58,42,0.08)]"
              }`}
            >
              Book Now
            </Link>
          </div>
        </div>
      </section>

      {/* ── Tiny Home Amenities ── */}
      <section
        className={`relative py-16 md:py-24 lg:py-28 transition-colors duration-500 ${
          isDarkMode
            ? "bg-linear-to-b from-[#0F0D0A] via-[#171310] to-[#0F0D0A]"
            : "bg-linear-to-b from-[#EAF3EA] via-[#F3F7F2] to-[#EAF3EA]"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <header className="text-center mb-12 md:mb-16" data-reveal>
            <p
              className={`text-xs uppercase tracking-[0.22em] font-bold mb-4 ${
                isDarkMode ? "text-[#C9A36A]" : "text-[#2F5D3A]"
              }`}
            >
              On-Site
            </p>
            <h2
              className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${
                isDarkMode ? "text-[#F2EEE7]" : "text-[#1F2A1F]"
              }`}
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Tiny Home Amenities
            </h2>
            <p
              className={`text-base sm:text-lg max-w-xl mx-auto ${
                isDarkMode ? "text-[#A79C8C]" : "text-[#4B5F4B]"
              }`}
            >
              Everything you need for a perfect escape — all in one place.
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
            {AMENITIES.map((item, index) => (
              <Link
                key={item.title}
                to={item.link}
                className={`group flex flex-col overflow-hidden rounded-2xl border transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${
                  isDarkMode
                    ? "bg-[#16120F] border-[rgba(201,163,106,0.2)] hover:border-[rgba(201,163,106,0.4)]"
                    : "bg-white border-[#DDE8DD] hover:border-[#B8D9B8]"
                }`}
                data-reveal
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3
                    className={`text-base font-bold mb-1.5 ${
                      isDarkMode ? "text-[#F2EEE7]" : "text-[#1F2A1F]"
                    }`}
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed flex-1 ${
                      isDarkMode ? "text-[#A79C8C]" : "text-[#4B5F4B]"
                    }`}
                  >
                    {item.description}
                  </p>
                  <span
                    className={`mt-3 text-xs font-semibold uppercase tracking-wider ${
                      isDarkMode ? "text-[#C9A36A]" : "text-[#2F5D3A]"
                    }`}
                  >
                    Learn more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Location Section ── */}
      <section
        className={`relative py-16 md:py-20 overflow-hidden transition-colors duration-500 ${
          isDarkMode ? "bg-[#120F0C]" : "bg-[#F3F7F2]"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 text-center" data-reveal>
            <p
              className={`text-xs uppercase tracking-[0.22em] font-bold mb-4 ${
                isDarkMode ? "text-[#C9A36A]" : "text-[#2F5D3A]"
              }`}
            >
              Find Us
            </p>
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 ${
                isDarkMode ? "text-[#F2EEE7]" : "text-[#1F2A1F]"
              }`}
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Location
            </h2>
            <p
              className={`text-sm font-semibold mb-3 ${
                isDarkMode ? "text-[#A79C8C]" : "text-[#2F5D3A]"
              }`}
            >
              102 CR 499, Bruceville-Eddy, TX 76524
            </p>
            <p
              className={`mt-2 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed ${
                isDarkMode ? "text-[#A79C8C]" : "text-[#3E4F3E]"
              }`}
            >
              Conveniently located in Bruceville-Eddy, The Tiny Escape is just 15 minutes from{" "}
              <span className={`font-semibold ${isDarkMode ? "text-[#C9A36A]" : "text-[#1F3A2A]"}`}>Temple</span>
              {" "}and 20 minutes from{" "}
              <span className={`font-semibold ${isDarkMode ? "text-[#C9A36A]" : "text-[#1F3A2A]"}`}>Waco</span>
              {" "}— and within easy reach of Austin and Dallas — close enough for easy access, yet far enough to truly unplug and unwind.
            </p>
          </div>
          <div
            className={`overflow-hidden rounded-3xl border shadow-2xl ${
              isDarkMode ? "border-[rgba(201,163,106,0.3)]" : "border-[#CFE3CF]"
            }`}
          >
            <iframe
              title="Tiny Escape location map"
              src="https://www.google.com/maps?q=The+Tiny+Escape,+102+County+Rd+499,+Eddy,+TX+76524&z=9&output=embed"
              className="h-[300px] sm:h-[400px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p
            className={`mt-4 text-center text-sm ${
              isDarkMode ? "text-[#6B6055]" : "text-[#7B917B]"
            }`}
          >
            20 min from Waco · 10 min from Temple
          </p>
        </div>
      </section>

      {/* ── Guest Testimonials ── */}
      <section
        className={`relative py-16 md:py-24 lg:py-28 transition-colors duration-500 ${
          isDarkMode
            ? "bg-linear-to-b from-[#0F0D0A] to-[#171310]"
            : "bg-linear-to-b from-[#EAF3EA] to-[#F5F9F3]"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <header className="text-center mb-12 md:mb-16" data-reveal>
            <p
              className={`text-xs uppercase tracking-[0.22em] font-bold mb-4 ${
                isDarkMode ? "text-[#C9A36A]" : "text-[#2F5D3A]"
              }`}
            >
              Google Reviews
            </p>
            <h2
              className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${
                isDarkMode ? "text-[#F2EEE7]" : "text-[#1F2A1F]"
              }`}
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              What Guests Are Saying
            </h2>
            <div className="flex items-center justify-center gap-2 mt-3">
              <StarRating count={5} />
              <span
                className={`text-sm font-bold ${
                  isDarkMode ? "text-[#C9A36A]" : "text-[#1F3A2A]"
                }`}
              >
                5.0 / 5
              </span>
              <span
                className={`text-sm ${
                  isDarkMode ? "text-[#A79C8C]" : "text-[#4B5F4B]"
                }`}
              >
                · Based on Google Reviews
              </span>
            </div>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {TESTIMONIALS.map((review, index) => (
              <div
                key={review.name}
                className={`flex flex-col rounded-2xl border p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${
                  isDarkMode
                    ? "bg-[#16120F] border-[rgba(201,163,106,0.2)]"
                    : "bg-white border-[#DDE8DD]"
                }`}
                data-reveal
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                {/* Google G icon */}
                <div className="flex items-center justify-between mb-4">
                  <StarRating count={review.rating} />
                  <svg viewBox="0 0 24 24" className="h-5 w-5 flex-shrink-0" aria-label="Google">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>

                <p
                  className={`text-sm leading-relaxed flex-1 italic ${
                    isDarkMode ? "text-[#C4B9A8]" : "text-[#3E4F3E]"
                  }`}
                >
                  "{review.text}"
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <div
                    className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                      isDarkMode
                        ? "bg-[#2F5D3A] text-[#A8E6A3]"
                        : "bg-[#1F3A2A] text-[#EAF3EA]"
                    }`}
                  >
                    {review.avatar}
                  </div>
                  <div>
                    <p
                      className={`text-sm font-semibold ${
                        isDarkMode ? "text-[#F2EEE7]" : "text-[#1F2A1F]"
                      }`}
                    >
                      {review.name}
                    </p>
                    <p
                      className={`text-xs ${
                        isDarkMode ? "text-[#6B6055]" : "text-[#7B917B]"
                      }`}
                    >
                      {review.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Separator */}
      <div className={`border-b ${isDarkMode ? "border-gray-800" : "border-[#DDE8DD]"}`} />

      {/* CTA Section */}
      <section
        className="relative py-14 sm:py-20 md:py-24 min-h-[56vh] sm:min-h-[70vh] overflow-hidden img-section flex items-center justify-center"
        style={{ "--cta-bg-image": `url(${tinyEscape7})` }}
      >
        <div className="relative z-10 w-full mx-auto max-w-3xl px-4 sm:px-6">
          <div
            className="cta-cut-card tiny-cta-frame grid gap-10 lg:grid-cols-1 items-center px-4 sm:px-8 md:px-12 py-10 md:py-14 text-center"
            style={{
              "--cta-frame-gradient": isDarkMode
                ? "linear-gradient(90deg, rgba(14, 22, 17, 0.78), rgba(14, 22, 17, 0.38))"
                : "linear-gradient(90deg, rgba(231, 240, 231, 0.82), rgba(231, 240, 231, 0.48))",
              "--cta-frame-border": isDarkMode
                ? "rgba(159, 215, 174, 0.35)"
                : "rgba(255, 255, 255, 0.7)",
              "--cta-frame-text": isDarkMode ? "#F6EFE6" : "#1F2A1F",
              "--cta-frame-muted": isDarkMode ? "#E2EFE6" : "#2B3B2F",
              "--cta-accent": isDarkMode ? "#9FD7AE" : "#2F5D3A",
              "--cta-accent-strong": isDarkMode ? "#8BCF9F" : "#1F3A2A",
              "--cta-glass-bg": isDarkMode
                ? "rgba(14, 22, 17, 0.72)"
                : "rgba(255, 255, 255, 0.7)",
              "--cta-glass-border": isDarkMode
                ? "rgba(159, 215, 174, 0.35)"
                : "rgba(255, 255, 255, 0.85)",
              "--cta-icon-bg": isDarkMode ? "#8BCF9F" : "#B7E0C2",
              "--cta-icon-text": isDarkMode ? "#0E1A12" : "#1F3A2A",
              "--cta-btn-primary-bg": isDarkMode ? "#8BCF9F" : "#1F3A2A",
              "--cta-btn-primary-text": isDarkMode ? "#0E1A12" : "#F7FBF7",
              "--cta-btn-secondary-border": isDarkMode ? "#9FD7AE" : "#1F3A2A",
              "--cta-btn-secondary-text": isDarkMode ? "#DFF4E5" : "#1F3A2A",
              "--cta-btn-secondary-hover-bg": isDarkMode ? "#9FD7AE" : "#1F3A2A",
              "--cta-btn-secondary-hover-text": isDarkMode ? "#0E1A12" : "#F7FBF7",
            }}
          >
            <div className="lg:col-span-2">
              <p className="tiny-cta-kicker">Your Next Stay Awaits</p>
              <h2
                className="tiny-cta-title"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Your Escape is Waiting
              </h2>
              <p className="tiny-cta-subtitle">
                Choose your dates and start planning your stay at The Tiny Escape — your peaceful retreat in Central Texas.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link to={requestAvailabilityPath} className="tiny-cta-primary">
                  View Availability
                </Link>
                <Link to={viewStaysPath} className="tiny-cta-secondary">
                  View Stays
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Home;
