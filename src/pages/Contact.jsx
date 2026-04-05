import { useState, useMemo } from "react";
import { useTheme } from "../context/ThemeContext";
import PageLayout from "../components/layout/PageLayout";
import config from "../config";
import { contactAPI } from "../services/api";
import contactHeroVideo from "../assets/videos/New Year Celebration video.mp4";
import {
  contactInfo,
  countryCodes,
  tourInterests,
  months,
} from "../data/contactData";
import { getWhatsAppLink } from "../utils/helpers";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaCalendarAlt,
  FaPaperPlane,
} from "react-icons/fa";
import { SiTiktok } from "react-icons/si";

const Contact = () => {
  const { isDarkMode } = useTheme();
  const phoneContact = contactInfo.find((item) => item.iconKey === "phone");
  const whatsappLink = getWhatsAppLink(phoneContact?.details);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    countryCode: "+1",
    numberOfTravelers: "1",
    travelType: "",
    stayInterest: "",
    preferredMonth: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    loading: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ submitted: false, error: false, loading: true });

    try {
      const data = await contactAPI.sendMessage(formData);

      if (!data?.success) {
        throw new Error(data.message || "Something went wrong.");
      }

      setFormStatus({ submitted: true, error: false, loading: false });
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        countryCode: "+1",
        numberOfTravelers: "1",
        travelType: "",
        stayInterest: "",
        preferredMonth: "",
        message: "",
      });

      setTimeout(
        () => setFormStatus({ submitted: false, error: false, loading: false }),
        5000,
      );
    } catch (err) {
      setFormStatus({
        submitted: false,
        error: err.message || "Failed to send. Please try again.",
        loading: false,
      });
    }
  };

  const iconMap = {
    phone: <FaPhone />,
    email: <FaEnvelope />,
    location: <FaMapMarkerAlt />,
    hours: <FaClock />,
  };

  const structuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "LodgingBusiness",
      name: "The Tiny Escape",
      telephone: config.site.phone,
      email: config.site.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bruceville-Eddy",
        addressRegion: "TX",
        addressCountry: "USA",
      },
      openingHours: "Mo-Sa 09:00-18:00",
    }),
    [],
  );

  /* ── shared input className ── */
  const inputCls = isDarkMode
    ? "bg-[#0F1B14] border-[#2A4030] text-[#F2EEE7] placeholder-[#6B8570] focus:border-[#6AAF7E]"
    : "bg-white border-[#C6D9C0] text-[#1F3A2A] placeholder-[#8FAF8A] focus:border-[#2F5D3A]";

  const labelCls = `block mb-2 text-sm font-semibold tracking-wide ${isDarkMode ? "text-[#A8C8A8]" : "text-[#2F5D3A]"}`;

  return (
    <PageLayout
      seo={{
        title: "Contact The Tiny Escape | Book Now",
        description:
          "Contact The Tiny Escape team to book your stay, ask questions, and plan a calm Texas getaway near Waco.",
        keywords:
          "The Tiny Escape contact, book now, tiny home stay inquiry, Texas getaway, Bruceville-Eddy",
        url: "/contact",
        structuredData,
      }}
    >
      {/* ── Hero ── */}
      <section className="relative py-24 overflow-hidden min-h-[calc(70svh-72px)] md:min-h-[72vh] w-full">
        {/* Background video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={contactHeroVideo}
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: isDarkMode
              ? "linear-gradient(to bottom, rgba(0,0,0,0.62), rgba(0,0,0,0.52))"
              : "linear-gradient(to bottom, rgba(0,0,0,0.52), rgba(0,0,0,0.42))",
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* icon badge */}
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
              style={{ background: "rgba(168,230,163,0.18)" }}
            >
              <FaEnvelope className="text-2xl" style={{ color: "#A8E6A3" }} />
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5"
              style={{
                fontFamily: "Playfair Display, serif",
                color: "#FFFFFF",
              }}
            >
              Get in Touch
            </h1>
            <p
              className="text-lg md:text-xl mb-3"
              style={{ color: "rgba(255,255,255,0.88)" }}
            >
              Share your dates and preferences — we'll help you plan the perfect
              Tiny Escape.
            </p>
            <p
              className="text-sm font-medium tracking-wide"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              Fast response · Follow us on social media
            </p>
          </div>
        </div>
      </section>

      {/* ── Contact Info Cards ── */}
      <section className={`py-12 ${isDarkMode ? "bg-[#0A1610]" : "bg-white"}`}>
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {/* Email & Location cards */}
            {contactInfo
              .filter(
                (info) =>
                  info.iconKey === "email" || info.iconKey === "location",
              )
              .map((info, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl text-center transition-all duration-300 ${
                    isDarkMode
                      ? "bg-[#0F1B14] border border-[#1E3528] hover:border-[#2F5D3A]"
                      : "bg-[#F5FAF5] border border-[#D4E8D4] hover:border-[#6AAF7E]"
                  } hover:shadow-lg`}
                >
                  <div
                    className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4"
                    style={{
                      background: isDarkMode
                        ? "rgba(168,230,163,0.10)"
                        : "rgba(47,93,58,0.08)",
                    }}
                  >
                    <div
                      className="text-2xl"
                      style={{ color: isDarkMode ? "#A8E6A3" : "#2F5D3A" }}
                    >
                      {iconMap[info.iconKey]}
                    </div>
                  </div>
                  <h3
                    className="text-base font-bold mb-1"
                    style={{ color: isDarkMode ? "#EAF3EA" : "#1F3A2A" }}
                  >
                    {info.title}
                  </h3>
                  {info.link ? (
                    <a
                      href={info.link}
                      className="block text-sm font-semibold mb-1 transition-colors"
                      style={{ color: isDarkMode ? "#A8E6A3" : "#2F5D3A" }}
                    >
                      {info.details}
                    </a>
                  ) : (
                    <p
                      className="text-sm font-semibold mb-1"
                      style={{ color: isDarkMode ? "#C8DEC8" : "#2F5D3A" }}
                    >
                      {info.details}
                    </p>
                  )}
                  <p
                    className="text-xs"
                    style={{ color: isDarkMode ? "#6B8570" : "#5A7A5A" }}
                  >
                    {info.subtext}
                  </p>
                </div>
              ))}
            {/* Social media cards */}
            {[
              {
                icon: <FaInstagram className="text-2xl" />,
                title: "Instagram",
                handle: "@thetinyescapetx",
                href: "https://www.instagram.com/thetinyescapetx/",
                color: "#E1306C",
              },
              {
                icon: <FaFacebook className="text-2xl" />,
                title: "Facebook",
                handle: "The Tiny Escape",
                href: "https://www.facebook.com/thetinyescapetx",
                color: "#1877F2",
              },
              {
                icon: <SiTiktok className="text-2xl" />,
                title: "TikTok",
                handle: "@thetinyescapetx",
                href: "https://www.tiktok.com/@thetinyescapetx",
                color: "#010101",
              },
            ].map((s, idx) => (
              <a
                key={idx}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-6 rounded-2xl text-center transition-all duration-300 hover:shadow-lg block ${
                  isDarkMode
                    ? "bg-[#0F1B14] border border-[#1E3528] hover:border-[#2F5D3A]"
                    : "bg-[#F5FAF5] border border-[#D4E8D4] hover:border-[#6AAF7E]"
                }`}
              >
                <div
                  className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4"
                  style={{
                    background: isDarkMode
                      ? "rgba(168,230,163,0.10)"
                      : "rgba(47,93,58,0.08)",
                  }}
                >
                  <div style={{ color: s.color }}>{s.icon}</div>
                </div>
                <h3
                  className="text-base font-bold mb-1"
                  style={{ color: isDarkMode ? "#EAF3EA" : "#1F3A2A" }}
                >
                  {s.title}
                </h3>
                <p
                  className="text-sm font-semibold"
                  style={{ color: isDarkMode ? "#A8E6A3" : "#2F5D3A" }}
                >
                  {s.handle}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form + Sidebar ── */}
      <section
        className={`py-16 ${isDarkMode ? "bg-[#0F1B14]" : "bg-[#F2F8F2]"}`}
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* ── Contact Form ── */}
            <div className="lg:col-span-2">
              <div
                className={`p-8 rounded-2xl ${
                  isDarkMode
                    ? "bg-[#0A1610] border border-[#1E3528]"
                    : "bg-white border border-[#D4E8D4]"
                } shadow-xl`}
              >
                <h2
                  className="text-3xl font-bold mb-2"
                  style={{
                    fontFamily: "Playfair Display, serif",
                    color: isDarkMode ? "#EAF3EA" : "#1F3A2A",
                  }}
                >
                  Send Us a Message
                </h2>
                <p
                  className="mb-8 text-sm"
                  style={{ color: isDarkMode ? "#6B8570" : "#5A7A5A" }}
                >
                  Tell us about your trip and we'll help match you with the
                  right stay.
                </p>

                {formStatus.submitted && (
                  <div
                    className="mb-6 p-4 rounded-xl border"
                    style={{
                      background: "rgba(106,175,126,0.10)",
                      borderColor: "rgba(106,175,126,0.30)",
                    }}
                  >
                    <p className="font-semibold" style={{ color: "#6AAF7E" }}>
                      ✓ Thanks! We received your message and will reach out
                      soon.
                    </p>
                  </div>
                )}

                {formStatus.error && (
                  <div
                    className="mb-6 p-4 rounded-xl border"
                    style={{
                      background: "rgba(220,38,38,0.07)",
                      borderColor: "rgba(220,38,38,0.25)",
                    }}
                  >
                    <p className="font-semibold" style={{ color: "#dc2626" }}>
                      ✗ {formStatus.error}
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name + Email */}
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className={labelCls}>Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        placeholder="Jane Smith"
                        className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-[#6AAF7E]/20 ${inputCls}`}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="jane@example.com"
                        className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-[#6AAF7E]/20 ${inputCls}`}
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className={labelCls}>Phone</label>
                    <div className="flex gap-2">
                      <select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleInputChange}
                        className={`px-3 py-3 rounded-xl border transition-all focus:outline-none ${inputCls}`}
                      >
                        {countryCodes.map((item) => (
                          <option key={item.code} value={item.code}>
                            {item.code}
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="512 555 0189"
                        className={`flex-1 px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-[#6AAF7E]/20 ${inputCls}`}
                      />
                    </div>
                  </div>

                  {/* Travelers + Travel Type */}
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className={labelCls}>Number of Guests *</label>
                      <select
                        name="numberOfTravelers"
                        value={formData.numberOfTravelers}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-[#6AAF7E]/20 ${inputCls}`}
                      >
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>Occasion *</label>
                      <select
                        name="travelType"
                        value={formData.travelType}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-[#6AAF7E]/20 ${inputCls}`}
                      >
                        <option value="">Select Occasion</option>
                        <option value="solo">Solo Retreat</option>
                        <option value="couple">Couples Getaway</option>
                        <option value="family">Family Stay</option>
                        <option value="friends">Friends Group</option>
                        <option value="corporate">
                          Corporate / Team Retreat
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Stay Interest + Month */}
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className={labelCls}>Preferred Stay</label>
                      <select
                        name="stayInterest"
                        value={formData.stayInterest}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-[#6AAF7E]/20 ${inputCls}`}
                      >
                        <option value="">Select an Option</option>
                        {tourInterests.map((interest) => (
                          <option key={interest} value={interest}>
                            {interest}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>Preferred Month</label>
                      <select
                        name="preferredMonth"
                        value={formData.preferredMonth}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-[#6AAF7E]/20 ${inputCls}`}
                      >
                        <option value="">Select Month</option>
                        {months.map((month) => (
                          <option key={month} value={month}>
                            {month} 2026
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className={labelCls}>
                      Additional Details / Special Requests
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="5"
                      placeholder="Tell us about your plans, any special occasions, accessibility needs, or anything else we should know..."
                      className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-[#6AAF7E]/20 resize-none ${inputCls}`}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={formStatus.loading}
                    className="w-full px-8 py-4 rounded-xl font-bold text-base tracking-wide transition-all duration-300 flex items-center justify-center gap-3 hover:opacity-90 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      background:
                        "linear-gradient(135deg, #2F5D3A 0%, #1F3A2A 100%)",
                      color: "#EAF3EA",
                      boxShadow: "0 6px 24px rgba(31,58,42,0.35)",
                    }}
                  >
                    {formStatus.loading ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8z"
                          />
                        </svg>
                        <span>Sending…</span>
                      </>
                    ) : (
                      <>
                        <FaPaperPlane />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* ── Sidebar ── */}
            <div className="space-y-5">
              {/* Why Contact Us */}
              <div
                className={`p-6 rounded-2xl border ${
                  isDarkMode
                    ? "bg-[#0A1610] border-[#1E3528]"
                    : "bg-white border-[#D4E8D4]"
                } shadow-lg`}
              >
                <h3
                  className="text-lg font-bold mb-4"
                  style={{
                    fontFamily: "Playfair Display, serif",
                    color: isDarkMode ? "#EAF3EA" : "#1F3A2A",
                  }}
                >
                  How We Help
                </h3>
                <ul className="space-y-3">
                  {[
                    "Help matching you with the right stay",
                    "Local tips for your visit",
                    "Clear, transparent pricing",
                    "Flexible stay planning",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span
                        className="mt-0.5 font-bold"
                        style={{ color: isDarkMode ? "#A8E6A3" : "#2F5D3A" }}
                      >
                        ✓
                      </span>
                      <span
                        className="text-sm"
                        style={{ color: isDarkMode ? "#A8C8A8" : "#374151" }}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social Media */}
              <div
                className={`p-6 rounded-2xl border ${
                  isDarkMode
                    ? "bg-[#0A1610] border-[#1E3528]"
                    : "bg-white border-[#D4E8D4]"
                } shadow-lg`}
              >
                <h3
                  className="text-lg font-bold mb-4 text-center"
                  style={{
                    fontFamily: "Playfair Display, serif",
                    color: isDarkMode ? "#EAF3EA" : "#1F3A2A",
                  }}
                >
                  Follow The Tiny Escape
                </h3>
                <div className="flex gap-3 justify-center">
                  {[
                    {
                      icon: <FaInstagram className="text-xl" />,
                      href: "https://www.instagram.com/thetinyescapetx/",
                      hover: "#E1306C",
                    },
                    {
                      icon: <FaFacebook className="text-xl" />,
                      href: "https://www.facebook.com/thetinyescapetx",
                      hover: "#1877F2",
                    },
                    {
                      icon: <SiTiktok className="text-xl" />,
                      href: "https://www.tiktok.com/@thetinyescapetx",
                      hover: "#010101",
                    },
                  ].map((s, i) => (
                    <a
                      key={i}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                      style={{
                        background: isDarkMode
                          ? "rgba(168,230,163,0.08)"
                          : "rgba(47,93,58,0.08)",
                        color: isDarkMode ? "#A8E6A3" : "#2F5D3A",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = s.hover;
                        e.currentTarget.style.color = "#fff";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = isDarkMode
                          ? "rgba(168,230,163,0.08)"
                          : "rgba(47,93,58,0.08)";
                        e.currentTarget.style.color = isDarkMode
                          ? "#A8E6A3"
                          : "#2F5D3A";
                      }}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Contact;
