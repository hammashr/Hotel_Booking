import { useEffect, useMemo, useState, memo, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import PageLayout from "../components/layout/PageLayout";
import { getStayBySlug } from "../data/staysData";
import { getHouseBySlug, getHousePackagesBySlug } from "../services/houses";
import { getDestinationSchema } from "../utils/structuredData";
import { normalizeHouseToStay } from "../utils/houseDataNormalizer";

// ── Hostfully booking widget UIDs per property ────────────────────────────────
const HOSTFULLY_WIDGET_UIDS = {
  "triangle-1-catalina-ridge": "dd9ec806-aaf3-42b3-8de3-14facc803a23",
  "apple-1-razoo-creek":       "56a823e1-4d33-43f4-8ca8-ffefd7b9643e",
  "apple-2-kona-meadows":      "769ecfc3-4980-49c9-b045-0622616723ff",
  "triangle-2-rani-ridge":     "06e040e1-5007-4339-bd23-e55f57281632",
};


import {
  FaMapMarkerAlt,
  FaStar,
  FaUsers,
  FaBed,
  FaBath,
  FaHome,
  FaCheck,
  FaTimes,
  FaSwimmingPool,
  FaCoffee,
  FaUtensils,
  FaFire,
  FaSnowflake,
  FaChair,
  FaWineGlass,
  FaWind,
  FaMicrophone,
  FaWifi,
  FaLightbulb,
  FaMoon,
  FaTv,
  FaKey,
  FaBan,
  FaDog,
  FaExclamationTriangle,
  FaBriefcaseMedical,
  FaParking,
  FaShower,
  FaHorse,
  FaTree,
  FaWalking,
  FaChess,
  FaShieldAlt,
  FaGamepad,
  FaBlender,
  FaGift,
  FaClock,
} from "react-icons/fa";

// ─── Icon maps ────────────────────────────────────────────────────────────────

const AMENITY_ICONS = {
  // New canonical amenity names
  "Container pools access": FaSwimmingPool,
  "Grand fire pit access": FaFire,
  Kitchenette: FaUtensils,
  "Mini fridge/freezer": FaSnowflake,
  Microwave: FaBlender,
  "Coffee maker": FaCoffee,
  "Wi-Fi": FaWifi,
  "Smart lock self check-in": FaKey,
  "Outdoor seating area": FaChair,
  // Legacy mappings kept for safety
  "Communal swimming pool": FaSwimmingPool,
  "Coffee and light bites": FaCoffee,
  "Mini Fridge/Freezer": FaSnowflake,
  Utensils: FaUtensils,
  "Dining table": FaChair,
  "Wine glasses": FaWineGlass,
  HVAC: FaWind,
  Alexa: FaMicrophone,
  Internet: FaWifi,
  Linens: FaBed,
  "Outdoor grill/utensils": FaFire,
  "Ambient lighting": FaLightbulb,
  "Extra pillows and blankets": FaBed,
  "Room darkening shades": FaMoon,
  "Smart TV": FaTv,
  "Smart Check-in": FaKey,
  "Pets not allowed": FaBan,
  "Pets allowed": FaDog,
  "Smoke/Carbon Monoxide Detector": FaExclamationTriangle,
  "First aid kit": FaBriefcaseMedical,
  "Fire Extinguisher": FaFire,
  "2 Parking spots per home": FaParking,
  "Standing Shower": FaShower,
  "Bathroom Essentials": FaBath,
  "Horseback Riding": FaHorse,
  "Outdoor furniture": FaChair,
  "Fire pit": FaFire,
  Hammock: FaTree,
  Pool: FaSwimmingPool,
  "Walking Trails": FaWalking,
  Benches: FaChair,
  Benchs: FaChair,
  "Board games": FaChess,
};

const CATEGORY_ICONS = {
  Pool: FaSwimmingPool,
  Cafe: FaCoffee,
  "Kitchen & dining": FaUtensils,
  General: FaHome,
  Policy: FaDog,
  Safety: FaShieldAlt,
  Parking: FaParking,
  Bathroom: FaShower,
  Outdoors: FaTree,
  Entertainment: FaGamepad,
};

// ─── Component ────────────────────────────────────────────────────────────────

const DestinationDetail = memo(() => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode } = useTheme();

  const localStay = useMemo(() => getStayBySlug(slug), [slug]);
  const prefilledDates = useMemo(() => {
    const checkIn = location.state?.prefillDates?.checkIn;
    const checkOut = location.state?.prefillDates?.checkOut;

    if (!checkIn || !checkOut) return null;

    const ymdRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!ymdRegex.test(checkIn) || !ymdRegex.test(checkOut)) return null;

    return { checkIn, checkOut };
  }, [
    location.state?.prefillDates?.checkIn,
    location.state?.prefillDates?.checkOut,
  ]);

  const [stay, setStay] = useState(localStay || null);
  const [isLoadingStay, setIsLoadingStay] = useState(!localStay);
  const [fallbackToast, setFallbackToast] = useState("");
  const [isAmenitiesModalOpen, setIsAmenitiesModalOpen] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  useEffect(() => {
    setStay(localStay || null);
    setIsLoadingStay(!localStay);
  }, [localStay]);

  useEffect(() => {
    if (!fallbackToast) return undefined;
    const timeout = setTimeout(() => setFallbackToast(""), 4500);
    return () => clearTimeout(timeout);
  }, [fallbackToast]);

  useEffect(() => {
    let mounted = true;

    const hydrateStayFromApi = async () => {
      if (!localStay) setIsLoadingStay(true);

      try {
        const [houseResponse, packagesResponse] = await Promise.allSettled([
          getHouseBySlug(slug),
          getHousePackagesBySlug(slug),
        ]);

        const house =
          houseResponse.status === "fulfilled"
            ? houseResponse.value?.data
            : null;
        const packages =
          packagesResponse.status === "fulfilled"
            ? packagesResponse.value?.data || []
            : [];

        if (!house) throw new Error("House data missing from API response");

        const mergedStay = normalizeHouseToStay({
          house,
          packages,
          fallbackStay: localStay,
        });

        if (mounted) {
          setStay(mergedStay);
          setIsLoadingStay(false);
        }
      } catch (_error) {
        if (!mounted) return;

        if (localStay) {
          setStay(localStay);
          setFallbackToast(
            "Live rates are unavailable right now. Showing local fallback data.",
          );
          setIsLoadingStay(false);
        } else {
          setIsLoadingStay(false);
          navigate("/tours");
        }
      }
    };

    hydrateStayFromApi();
    return () => {
      mounted = false;
    };
  }, [localStay, navigate, slug]);


  useEffect(() => {
    if (!isAmenitiesModalOpen) return undefined;

    const handleEscape = (event) => {
      if (event.key === "Escape") setIsAmenitiesModalOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isAmenitiesModalOpen]);

  // ── Photo lightbox: Escape to close + 3-second auto-advance ──────────────
  useEffect(() => {
    if (!showPhotoModal) return undefined;

    // Hide navbar so it doesn't overlap the modal (main has z-10 stacking context)
    const navbar = document.querySelector("header");
    if (navbar) navbar.style.display = "none";

    // Escape / arrow keys
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setShowPhotoModal(false);
      if (e.key === "ArrowRight") setActivePhotoIndex((p) => (p === stay.gallery.length - 1 ? 0 : p + 1));
      if (e.key === "ArrowLeft")  setActivePhotoIndex((p) => (p === 0 ? stay.gallery.length - 1 : p - 1));
    };
    window.addEventListener("keydown", handleKeyDown);

    document.body.style.overflow = "hidden";

    return () => {
      if (navbar) navbar.style.display = "";
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [showPhotoModal, stay?.gallery?.length]);


  if (isLoadingStay || !stay) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDarkMode ? "bg-[#0B0C0E] text-[#E0E7EE]" : "bg-white text-[#0F172A]"
        }`}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#2F5D3A] mx-auto mb-4" />
          <p className="text-lg">Loading stay details...</p>
        </div>
      </div>
    );
  }

  // ── Hostfully booking widget ──────────────────────────────────────────────
  const widgetLoaded = useRef(false);

  useEffect(() => {
    if (widgetLoaded.current) return;
    widgetLoaded.current = true;

    const propertyUid = HOSTFULLY_WIDGET_UIDS[stay.slug];
    if (!propertyUid) return; // No UID yet for this property

    const PIKADAY_SRC = "https://platform.hostfully.com/assets/js/pikaday.js";
    const WIDGET_SRC  = "https://platform.hostfully.com/assets/js/leadCaptureWidget_2.0.js";

    const initWidget = () => {
      const container = document.getElementById("leadWidget");
      if (!container || container.children.length > 0) return;
      const s = document.createElement("script");
      s.type = "text/javascript";
      s.innerHTML = `
        var widget = new Widget('leadWidget', '${propertyUid}', {
          "maximun_availability":"2029-03-31T08:20:11.037Z","type":"agency","fields":[],
          "showAvailability":true,"lang":"US","minStay":true,"price":true,
          "hidePriceWithoutDates":false,"cc":false,"emailClient":true,"saveCookie":true,
          "showDynamicMinStay":true,"backgroundColor":"#FFFFFF",
          "buttonSubmit":{"backgroundColor":"#126039"},"showPriceDetailsLink":false,
          "showGetQuoteLink":false,"labelColor":"#126039","showTotalWithoutSD":true,
          "showDiscount":true,"includeReferrerToRequest":true,"customDomainName":null,
          "source":null,"aid":"ORB-49587220416635719","clickID":null,
          "valuesByDefaults":{"checkIn":{"value":""},"checkOut":{"value":""},
          "guests":{"value":""},"discountCode":{"value":""}},
          "pathRoot":"https://platform.hostfully.com/"
        });
      `;
      document.body.appendChild(s);
    };

    if (!document.querySelector(`script[src="${PIKADAY_SRC}"]`)) {
      const p = document.createElement("script");
      p.src = PIKADAY_SRC; p.async = true;
      document.head.appendChild(p);
    }

    if (!document.querySelector(`script[src="${WIDGET_SRC}"]`)) {
      const w = document.createElement("script");
      w.src = WIDGET_SRC; w.async = true;
      w.onload = initWidget;
      document.head.appendChild(w);
    } else if (window.Widget) {
      initWidget();
    }
  }, [stay.slug]);


  const seo = {
    title: `${stay.name} | The Tiny Escape`,
    description: stay.shortDescription,
    keywords: `The Tiny Escape, ${stay.name}, tiny home, cabin stay, ${stay.location}`,
    url: `/stay/${stay.slug}`,
    image: stay.heroImage,
    structuredData: getDestinationSchema(stay),
  };

  const standardRate = stay.pricing?.standard;
  const amenities = stay.amenities || [];
  const amenityCategories = stay.amenityCategories || [];
  const hasAmenityCategories = amenityCategories.length > 0;
  const totalAmenitiesCount = hasAmenityCategories
    ? amenityCategories.reduce(
        (count, cat) => count + (cat.items?.length || 0),
        0,
      )
    : amenities.length;
  const previewAmenities = amenities.slice(0, 6);

  return (
    <PageLayout
      seo={seo}
      className={
        isDarkMode
          ? "bg-[#0B0C0E] text-[#E0E7EE]"
          : "bg-[#F8FAFC] text-[#0F172A]"
      }
    >
      {/* Toast */}
      {fallbackToast && (
        <div className="fixed top-24 right-4 z-[60] max-w-sm">
          <div className="px-4 py-3 rounded-lg border border-amber-200 bg-amber-50 text-amber-700 text-sm font-medium shadow-lg">
            {fallbackToast}
          </div>
        </div>
      )}

      {/* ── Photo Grid Hero (Live Oak Lake style) ── */}
      <section className={`pt-20 md:pt-24 pb-0 ${isDarkMode ? "bg-[#0B0C0E]" : "bg-white"}`}>
        <div className="container mx-auto px-4 sm:px-6">

          {/* Photo Grid */}
          <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[420px] md:h-[520px] rounded-2xl overflow-hidden">
            {/* Large image — spans 2 cols × 2 rows */}
            <div
              className="col-span-2 row-span-2 cursor-pointer overflow-hidden"
              onClick={() => { setActivePhotoIndex(0); setShowPhotoModal(true); }}
            >
              <img
                src={stay.gallery[0]}
                alt={stay.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* 4 smaller images */}
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="relative cursor-pointer overflow-hidden"
                onClick={() => { setActivePhotoIndex(i); setShowPhotoModal(true); }}
              >
                {stay.gallery[i] ? (
                  <img
                    src={stay.gallery[i]}
                    alt={`${stay.name} photo ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  <div className={`w-full h-full ${isDarkMode ? "bg-[#1A1F1A]" : "bg-[#E8EFE8]"}`} />
                )}
                {/* "Show all photos" button on last cell */}
                {i === 4 && stay.gallery.length > 5 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); setActivePhotoIndex(0); setShowPhotoModal(true); }}
                    className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-[#0F172A] text-xs font-bold shadow-md hover:bg-gray-100 transition-colors border border-gray-200"
                  >
                    <span className="text-sm">⊞</span>
                    + {stay.gallery.length - 5} photos
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Property Title + Stats */}
          <div className="mt-6 mb-2">
            <h1
              className={`text-3xl md:text-4xl font-bold mb-2 ${isDarkMode ? "text-[#E0E7EE]" : "text-[#0F172A]"}`}
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {stay.name}
            </h1>
            <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-sm ${isDarkMode ? "text-[#C9D6DF]" : "text-[#475569]"}`}>
              <span>Tiny Home</span>
              <span className="text-gray-300">·</span>
              <span>{stay.sleeps} guests</span>
              <span className="text-gray-300">·</span>
              <span>{stay.bedrooms} bedroom{stay.bedrooms !== 1 ? "s" : ""}</span>
              <span className="text-gray-300">·</span>
              <span>{stay.baths} bathroom{stay.baths !== 1 ? "s" : ""}</span>
              {stay.sizeSqFt && (<><span className="text-gray-300">·</span><span>{stay.sizeSqFt} sq ft</span></>)}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <FaStar className="text-amber-400" size={14} />
              <span className={`text-sm font-semibold ${isDarkMode ? "text-[#E0E7EE]" : "text-[#0F172A]"}`}>{stay.rating}</span>
              <a href="#amenities" className={`text-sm underline underline-offset-2 ${isDarkMode ? "text-[#8A9BAC]" : "text-[#64748B]"} hover:text-[#126039]`}>
                View amenities
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ── Body ── */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview */}
            <section>
              <h2
                className={`text-3xl font-bold mb-6 ${
                  isDarkMode ? "text-[#E0E7EE]" : "text-[#0F172A]"
                }`}
              >
                Overview
              </h2>
              <p
                className={`text-lg leading-relaxed ${
                  isDarkMode ? "text-[#C9D6DF]" : "text-[#334155]"
                }`}
              >
                {stay.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {(stay.highlights || []).slice(0, 6).map((highlight) => (
                  <span
                    key={highlight}
                    className={`px-3 py-1 rounded-full text-sm ${
                      isDarkMode
                        ? "bg-[#0F1419] text-[#C9D6DF]"
                        : "bg-[#F1F5F9] text-[#334155]"
                    }`}
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </section>


            {/* ── Amenities Section ── */}
            <section id="amenities">
              <h2
                className={`text-3xl font-bold mb-2 ${
                  isDarkMode ? "text-[#E0E7EE]" : "text-[#0F172A]"
                }`}
              >
                Amenities
              </h2>

              {/* Preview grid — icon card style */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {previewAmenities.map((item, index) => {
                  const Icon = AMENITY_ICONS[item] || FaCheck;
                  return (
                    <div
                      key={`${item}-${index}`}
                      className={`flex items-center gap-3 p-4 rounded-xl border transition-colors ${
                        isDarkMode
                          ? "bg-[#0F1419] border-[#1E2A1E] hover:border-[#2F5D3A]"
                          : "bg-white border-[#E8F0E8] hover:border-[#2F5D3A]"
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                          isDarkMode ? "bg-[#1A2E1A]" : "bg-[#EAF3EA]"
                        }`}
                      >
                        <Icon
                          size={15}
                          className={
                            isDarkMode ? "text-[#6BAF7A]" : "text-[#2F5D3A]"
                          }
                        />
                      </div>
                      <span
                        className={`text-sm font-medium leading-tight ${
                          isDarkMode ? "text-[#C9D6DF]" : "text-[#2D3748]"
                        }`}
                      >
                        {item}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Show all button */}
              {amenities.length > 6 && (
                <button
                  type="button"
                  onClick={() => setIsAmenitiesModalOpen(true)}
                  className={`mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] ${
                    isDarkMode
                      ? "border-[#2F5D3A] text-[#6BAF7A] hover:bg-[#1A2E1A]"
                      : "border-[#1F3A2A] text-[#1F3A2A] hover:bg-[#EAF3EA]"
                  }`}
                >
                  <span>View all Amenities ({totalAmenitiesCount})</span>
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                      isDarkMode
                        ? "bg-[#2F5D3A] text-white"
                        : "bg-[#1F3A2A] text-white"
                    }`}
                  >
                    +
                  </span>
                </button>
              )}
            </section>

            {/* ── Optional Add-Ons ── */}
            <section>
              <h2
                className={`text-3xl font-bold mb-2 ${
                  isDarkMode ? "text-[#E0E7EE]" : "text-[#0F172A]"
                }`}
              >
                Optional Add-Ons
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                {[
                  { icon: FaHorse,  label: "Guided horseback riding" },
                  { icon: FaFire,   label: "S'mores bundle" },
                  { icon: FaCoffee, label: "Creekside Cafe purchases" },
                  { icon: FaGift,   label: "Anniversary / Birthday bundle" },
                  { icon: FaClock,  label: "Early Check-in / Late Check-Out" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className={`flex items-center gap-3 p-4 rounded-xl border transition-colors ${
                      isDarkMode
                        ? "bg-[#0F1419] border-[#1E2A1E] hover:border-[#2F5D3A]"
                        : "bg-white border-[#E8F0E8] hover:border-[#2F5D3A]"
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                        isDarkMode ? "bg-[#1A2E1A]" : "bg-[#EAF3EA]"
                      }`}
                    >
                      <Icon
                        size={15}
                        className={isDarkMode ? "text-[#C9A36A]" : "text-[#2F5D3A]"}
                      />
                    </div>
                    <span
                      className={`text-sm font-medium leading-tight ${
                        isDarkMode ? "text-[#C9D6DF]" : "text-[#2D3748]"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* House Rules + Policies */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                className={`p-6 rounded-xl ${
                  isDarkMode
                    ? "bg-[#0F1419]"
                    : "bg-white border border-[#E2E8F0]"
                }`}
              >
                <h3
                  className={`text-xl font-bold mb-4 ${
                    isDarkMode ? "text-[#E0E7EE]" : "text-[#0F172A]"
                  }`}
                >
                  House Rules
                </h3>
                <ul className="space-y-2">
                  {stay.houseRules.map((item) => (
                    <li
                      key={item}
                      className={`flex items-start gap-2 text-sm ${
                        isDarkMode ? "text-[#C9D6DF]" : "text-[#475569]"
                      }`}
                    >
                      <FaCheck
                        className="text-[#2F5D3A] mt-1 shrink-0"
                        size={12}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className={`p-6 rounded-xl ${
                  isDarkMode
                    ? "bg-[#0F1419]"
                    : "bg-white border border-[#E2E8F0]"
                }`}
              >
                <h3
                  className={`text-xl font-bold mb-4 ${
                    isDarkMode ? "text-[#E0E7EE]" : "text-[#0F172A]"
                  }`}
                >
                  Policies
                </h3>
                <ul className="space-y-2">
                  {stay.policies.map((item) => (
                    <li
                      key={item}
                      className={`flex items-start gap-2 text-sm ${
                        isDarkMode ? "text-[#C9D6DF]" : "text-[#475569]"
                      }`}
                    >
                      <FaCheck
                        className="text-[#2F5D3A] mt-1 shrink-0"
                        size={12}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          {/* Right column — Hostfully booking widget */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Hostfully per-property booking widget */}
              <div className="max-w-md mx-auto lg:max-w-none">
                {HOSTFULLY_WIDGET_UIDS[stay.slug] ? (
                  <div id="leadWidget" />
                ) : (
                  <div className={`rounded-xl border p-6 text-center ${isDarkMode ? "bg-[#0F1419] border-[#1E2A1E] text-[#C9D6DF]" : "bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B]"}`}>
                    <p className="text-sm">Booking widget coming soon for this property.</p>
                    <a href="/book-now" className="mt-3 inline-block rounded-xl px-6 py-2.5 text-sm font-bold bg-[#126039] text-white hover:bg-[#0e4f2e] transition-colors">
                      Book Now
                    </a>
                  </div>
                )}
              </div>


              <div
                className={`p-6 rounded-xl ${
                  isDarkMode
                    ? "bg-[#0F1419]"
                    : "bg-[#F8FAFC] border border-[#E2E8F0]"
                }`}
              >
                <h3
                  className={`text-xl font-bold mb-4 ${
                    isDarkMode ? "text-[#E0E7EE]" : "text-[#0F172A]"
                  }`}
                >
                  Quick Info
                </h3>
                <div className="space-y-4">
                  <div>
                    <p
                      className={`text-sm font-semibold ${
                        isDarkMode ? "text-[#E0E7EE]" : "text-[#0F172A]"
                      }`}
                    >
                      Check-in / Check-out
                    </p>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-[#C9D6DF]" : "text-[#64748B]"
                      }`}
                    >
                      {stay.checkIn} / {stay.checkOut}
                    </p>
                  </div>
                  <div>
                    <p
                      className={`text-sm font-semibold ${
                        isDarkMode ? "text-[#E0E7EE]" : "text-[#0F172A]"
                      }`}
                    >
                      Capacity
                    </p>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-[#C9D6DF]" : "text-[#64748B]"
                      }`}
                    >
                      Sleeps {stay.sleeps} · {stay.bedrooms} bed{stay.bedrooms !== 1 ? "s" : ""} · {stay.baths} bath
                    </p>
                  </div>
                </div>
              </div>

              {/* ── Refund Policy ── */}
              <div
                className={`p-6 rounded-xl ${
                  isDarkMode
                    ? "bg-[#0F1419]"
                    : "bg-[#F8FAFC] border border-[#E2E8F0]"
                }`}
              >
                <h3
                  className={`text-xl font-bold mb-3 ${
                    isDarkMode ? "text-[#E0E7EE]" : "text-[#0F172A]"
                  }`}
                >
                  Refund Policy
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    isDarkMode ? "text-[#C9D6DF]" : "text-[#64748B]"
                  }`}
                >
                  Cancellation policy: 100% refund up to 30 days before arrival, 50% refund up to 14 days before arrival.
                </p>
              </div>


            </div>
          </div>
        </div>
      </div>

      {/* ── Photo Lightbox Modal ── */}
      {showPhotoModal && (
        <div
          className="fixed inset-0 z-[999] bg-black flex flex-col"
          onClick={() => setShowPhotoModal(false)}
        >
          {/* ── Floating close button — always on top ── */}
          <button
            onClick={() => setShowPhotoModal(false)}
            className="fixed top-5 right-5 z-[1000] flex items-center justify-center w-11 h-11 rounded-full bg-white text-[#0F172A] shadow-xl hover:bg-gray-100 transition-all duration-200 hover:scale-105"
            aria-label="Close gallery"
            style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.6)" }}
          >
            <FaTimes size={15} />
          </button>

          {/* Top info bar */}
          <div
            className="shrink-0 flex items-center justify-between px-5 py-3 pt-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Counter */}
            <span className="text-white/60 text-sm font-medium tracking-wide">
              {activePhotoIndex + 1} / {stay.gallery.length}
            </span>

            {/* Property name */}
            <span
              className="text-white text-sm font-semibold hidden sm:block"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {stay.name}
            </span>

            {/* Spacer to balance layout */}
            <span className="w-11" />
          </div>

          {/* Main image area */}
          <div
            className="flex-1 flex items-center justify-center relative min-h-0 px-16"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev arrow */}
            <button
              onClick={() => setActivePhotoIndex((p) => (p === 0 ? stay.gallery.length - 1 : p - 1))}
              className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 border border-white/25 text-white text-xl transition-all duration-200 hover:scale-105"
              aria-label="Previous photo"
            >
              ‹
            </button>

            {/* Image with fade transition */}
            <img
              key={activePhotoIndex}
              src={stay.gallery[activePhotoIndex]}
              alt={`${stay.name} photo ${activePhotoIndex + 1}`}
              className="max-h-full max-w-full object-contain rounded-xl shadow-2xl"
              style={{ animation: "fadeIn 0.35s ease-out" }}
            />

            {/* Next arrow */}
            <button
              onClick={() => setActivePhotoIndex((p) => (p === stay.gallery.length - 1 ? 0 : p + 1))}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 border border-white/25 text-white text-xl transition-all duration-200 hover:scale-105"
              aria-label="Next photo"
            >
              ›
            </button>
          </div>

          {/* Progress dots */}
          <div className="shrink-0 flex justify-center gap-1.5 py-3" onClick={(e) => e.stopPropagation()}>
            {stay.gallery.map((_, i) => (
              <button
                key={i}
                onClick={() => setActivePhotoIndex(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === activePhotoIndex ? "bg-white w-5 h-1.5" : "bg-white/35 hover:bg-white/60 w-1.5 h-1.5"
                }`}
              />
            ))}
          </div>

          {/* Thumbnail strip */}
          <div
            className="shrink-0 px-5 pb-4 overflow-x-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex gap-2 justify-center">
              {stay.gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActivePhotoIndex(i)}
                  className={`shrink-0 w-16 h-11 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    i === activePhotoIndex
                      ? "border-white scale-105 shadow-lg"
                      : "border-transparent opacity-45 hover:opacity-80"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Amenities Modal ── */}
      {isAmenitiesModalOpen && (
        <div
          className="fixed inset-0 z-80 bg-black/70 backdrop-blur-sm flex items-start justify-center overflow-y-auto p-4 pt-24 md:pt-28"
          style={{ animation: "fadeIn 0.2s ease-out" }}
          onClick={() => setIsAmenitiesModalOpen(false)}
        >
          <div
            className={`w-full max-w-3xl max-h-[calc(100vh-8rem)] md:max-h-[calc(100vh-9rem)] rounded-2xl overflow-hidden shadow-2xl flex flex-col ${
              isDarkMode ? "bg-[#0D1710]" : "bg-white"
            }`}
            style={{ animation: "scaleIn 0.25s ease-out" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div
              className={`flex items-center justify-between px-8 py-5 border-b ${
                isDarkMode
                  ? "border-[#1E3A1E] bg-[#0A1309]"
                  : "border-[#E8F0E8] bg-[#F5FAF5]"
              }`}
            >
              <div>
                <h3
                  className={`text-2xl font-bold ${
                    isDarkMode ? "text-[#E0E7EE]" : "text-[#1A2E1A]"
                  }`}
                >
                  Amenities
                </h3>
                <p
                  className={`text-sm mt-1 ${
                    isDarkMode ? "text-[#8A9BAC]" : "text-[#64748B]"
                  }`}
                >
                  {stay.name}
                </p>
              </div>
              <button
                type="button"
                aria-label="Close amenities"
                onClick={() => setIsAmenitiesModalOpen(false)}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors shrink-0 ${
                  isDarkMode
                    ? "bg-[#1A2E1A] hover:bg-[#243C24] text-[#C9D6DF]"
                    : "bg-[#E8F0E8] hover:bg-[#D0E4D0] text-[#334155]"
                }`}
              >
                <FaTimes size={14} />
              </button>
            </div>

            {/* Modal body — scrollable */}
            <div className="overflow-y-auto flex-1 px-8 py-6">
              {hasAmenityCategories ? (
                <div className="space-y-0">
                  {amenityCategories.map((category, categoryIndex) => {
                    const CatIcon = CATEGORY_ICONS[category.title] || FaCheck;
                    const isLast =
                      categoryIndex === amenityCategories.length - 1;

                    return (
                      <section
                        key={`${category.title}-${categoryIndex}`}
                        className={`py-6 ${
                          !isLast
                            ? `border-b ${
                                isDarkMode
                                  ? "border-[#1E3A1E]"
                                  : "border-[#E8F0E8]"
                              }`
                            : ""
                        }`}
                      >
                        {/* Category header */}
                        <div className="flex items-center gap-3 mb-4">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                              isDarkMode ? "bg-[#1A3A1A]" : "bg-[#EAF3EA]"
                            }`}
                          >
                            <CatIcon
                              size={17}
                              className={
                                isDarkMode ? "text-[#6BAF7A]" : "text-[#1F3A2A]"
                              }
                            />
                          </div>
                          <h4
                            className={`text-base font-bold tracking-wide ${
                              isDarkMode ? "text-[#E0E7EE]" : "text-[#1A2E1A]"
                            }`}
                          >
                            {category.title}
                          </h4>
                          <span
                            className={`ml-auto text-xs font-medium px-2 py-0.5 rounded-full ${
                              isDarkMode
                                ? "bg-[#1A3A1A] text-[#6BAF7A]"
                                : "bg-[#EAF3EA] text-[#2F5D3A]"
                            }`}
                          >
                            {category.items?.length || 0}
                          </span>
                        </div>

                        {/* Items — 2-column icon grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-1">
                          {(category.items || []).map((item, itemIndex) => {
                            const ItemIcon = AMENITY_ICONS[item] || FaCheck;
                            return (
                              <div
                                key={`${category.title}-${item}-${itemIndex}`}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                                  isDarkMode
                                    ? "hover:bg-[#1A2E1A]"
                                    : "hover:bg-[#F5FAF5]"
                                }`}
                              >
                                <div
                                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                                    isDarkMode ? "bg-[#1A3A1A]" : "bg-[#EAF3EA]"
                                  }`}
                                >
                                  <ItemIcon
                                    size={12}
                                    className={
                                      isDarkMode
                                        ? "text-[#6BAF7A]"
                                        : "text-[#2F5D3A]"
                                    }
                                  />
                                </div>
                                <span
                                  className={`text-sm ${
                                    isDarkMode
                                      ? "text-[#C9D6DF]"
                                      : "text-[#334155]"
                                  }`}
                                >
                                  {item}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </section>
                    );
                  })}
                </div>
              ) : (
                // Fallback flat grid (no categories)
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {amenities.map((item, index) => {
                    const Icon = AMENITY_ICONS[item] || FaCheck;
                    return (
                      <div
                        key={`${item}-${index}`}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${
                          isDarkMode
                            ? "hover:bg-[#1A2E1A]"
                            : "hover:bg-[#F5FAF5]"
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                            isDarkMode ? "bg-[#1A3A1A]" : "bg-[#EAF3EA]"
                          }`}
                        >
                          <Icon
                            size={12}
                            className={
                              isDarkMode ? "text-[#6BAF7A]" : "text-[#2F5D3A]"
                            }
                          />
                        </div>
                        <span
                          className={`text-sm ${
                            isDarkMode ? "text-[#C9D6DF]" : "text-[#334155]"
                          }`}
                        >
                          {item}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Modal footer */}
            <div
              className={`px-8 py-4 border-t flex items-center justify-between ${
                isDarkMode
                  ? "border-[#1E3A1E] bg-[#0A1309]"
                  : "border-[#E8F0E8] bg-[#F5FAF5]"
              }`}
            >
              <p
                className={`text-xs ${
                  isDarkMode ? "text-[#6A7F6A]" : "text-[#94A3B8]"
                }`}
              >
                Press <kbd className="font-mono">Esc</kbd> to close
              </p>
              <button
                type="button"
                onClick={() => setIsAmenitiesModalOpen(false)}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] ${
                  isDarkMode
                    ? "bg-[#2F5D3A] hover:bg-[#3A7048] text-white"
                    : "bg-[#1F3A2A] hover:bg-[#2F5D3A] text-white"
                }`}
              >
                Close
              </button>
            </div>
          </div>

          {/* Keyframe animations injected inline */}
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to   { opacity: 1; }
            }
            @keyframes scaleIn {
              from { opacity: 0; transform: scale(0.95) translateY(8px); }
              to   { opacity: 1; transform: scale(1)    translateY(0);   }
            }
          `}</style>
        </div>
      )}
    </PageLayout>
  );
});

DestinationDetail.displayName = "DestinationDetail";

export default DestinationDetail;
