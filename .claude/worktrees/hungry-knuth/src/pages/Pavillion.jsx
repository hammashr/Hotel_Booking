import { useState, useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import PageLayout from '../components/layout/PageLayout';
import { useTheme } from '../context/ThemeContext';

// All pavilion images
import pavCropped from '../assets/Pavilion images/Pavilion images/pavilion cropped.jpeg';
import pav1 from '../assets/Pavilion images/Pavilion images/pavilion 1.webp';
import pav2 from '../assets/Pavilion images/Pavilion images/pavilion 2.jpg';
import pav3 from '../assets/Pavilion images/Pavilion images/pavilion 3.jpg';
import pav4 from '../assets/Pavilion images/Pavilion images/pavilion 4.jpg';
import pav5 from '../assets/Pavilion images/Pavilion images/pavilion 5.jpg';
import pav6 from '../assets/Pavilion images/Pavilion images/pavilion 6.jpg';
import pav7 from '../assets/Pavilion images/Pavilion images/pavilion 7.jpg';
import pav8 from '../assets/Pavilion images/Pavilion images/pavilion 8.webp';
import pav9 from '../assets/Pavilion images/Pavilion images/pavilion 9.jpg';
import pavWa1 from '../assets/Pavilion images/Pavilion images/pavilion-wa-1.jpg';

const heroSlides = [pavCropped, pav2, pav1, pav6, pav3, pav7, pav4, pav8, pav9, pav5, pavWa1];

const pavilionHighlights = [
  {
    icon: '🏛',
    title: 'Grand Open-Air Pavilion Design',
    text: 'A beautifully crafted 110 x 80 ft covered pavilion offering generous space for elevated gatherings and flexible event layouts.'
  },
  {
    icon: '🔥',
    title: 'Dramatic Fireside Entrance',
    text: 'A welcoming fire feature at the pavilion entrance creates a warm first impression for arriving guests.'
  },
  {
    icon: '✦',
    title: 'Ceremony-Ready Front Steps',
    text: 'A full-width stepped front provides a natural focal point for wedding ceremonies, grand entrances, and photo-worthy moments.'
  },
  {
    icon: '💡',
    title: 'Ambient Evening Lighting',
    text: 'Soft overhead lighting enhances the atmosphere after sunset, creating an inviting setting for memorable events.'
  }
];

const pavilionStats = [
  { label: 'Size', value: '110 × 80 ft' },
  { label: 'Opening', value: 'Coming Soon' },
  { label: 'Setting', value: 'Open-Air Event Venue' }
];

const Pavillion = () => {
  const { isDarkMode } = useTheme();
  const [dateRange, setDateRange] = useState({ from: undefined, to: undefined });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayRef = useRef(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Auto-advance slider every 4.5s
  const goToSlide = useCallback((index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 300);
  }, [isTransitioning]);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % heroSlides.length);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length);
  }, [currentSlide, goToSlide]);

  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(autoPlayRef.current);
  }, []);

  // Reset timer on manual nav
  const handleManualNav = (fn) => {
    clearInterval(autoPlayRef.current);
    fn();
    autoPlayRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 4500);
  };

  const formatDateToYMD = useCallback((date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }, []);

  const formatDisplayDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const nightCount =
    dateRange?.from && dateRange?.to
      ? Math.ceil((dateRange.to - dateRange.from) / (1000 * 60 * 60 * 24))
      : 0;

  const bookNowState = dateRange?.from && dateRange?.to
    ? {
        packageData: {
          title: 'Fireside Pavilion Booking',
          prefillDates: {
            checkIn: formatDateToYMD(dateRange.from),
            checkOut: formatDateToYMD(dateRange.to),
            nights: nightCount
          }
        }
      }
    : undefined;

  return (
    <PageLayout
      seo={{
        title: 'Fireside Pavilion | The Tiny Escape',
        description:
          'Discover the Fireside Pavilion at Tiny Escape — a premium open-air venue for scenic gatherings, fire-lit evenings, and memorable events in the Texas Hill Country.',
        keywords: 'Tiny Escape pavilion, open air venue, Texas Hill Country events, private events, fire-lit evenings, event venue',
        url: '/pavillion'
      }}
    >
      {/* ── Hero with Image Slider ── */}
      <section className="relative h-[55vh] min-h-[380px] max-h-[560px] flex items-end overflow-hidden">

        {/* Slider images */}
        {heroSlides.map((img, idx) => (
          <div
            key={idx}
            className="absolute inset-0 bg-cover bg-bottom transition-opacity duration-700"
            style={{
              backgroundImage: `url(${img})`,
              opacity: idx === currentSlide ? 1 : 0,
              transform: 'scale(1.03)',
              zIndex: idx === currentSlide ? 1 : 0,
            }}
          />
        ))}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/10" style={{ zIndex: 2 }} />

        {/* Prev arrow */}
        <button
          onClick={() => handleManualNav(prevSlide)}
          aria-label="Previous image"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm border border-white/20 hover:bg-black/60 transition-all duration-200"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Next arrow */}
        <button
          onClick={() => handleManualNav(nextSlide)}
          aria-label="Next image"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm border border-white/20 hover:bg-black/60 transition-all duration-200"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleManualNav(() => goToSlide(idx))}
              aria-label={`Go to slide ${idx + 1}`}
              className={`rounded-full transition-all duration-300 ${
                idx === currentSlide
                  ? 'w-6 h-2 bg-white'
                  : 'w-2 h-2 bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>

        {/* Image counter */}
        <div className="absolute top-5 right-5 z-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 px-3 py-1 text-xs text-white/80 font-medium">
          {currentSlide + 1} / {heroSlides.length}
        </div>

        {/* Hero text */}
        <div className="relative container mx-auto px-6 pb-16 md:pb-24" style={{ zIndex: 3 }}>
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="inline-flex items-center rounded-full bg-linear-to-r from-[#D1965A] to-[#F1C281] px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#1A120A] shadow-lg animate-pulse">
              Coming Soon
            </span>
          </div>
          <h1
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Fireside Pavilion
          </h1>
          <p className="mt-4 max-w-2xl text-base sm:text-lg md:text-xl text-white/85 leading-relaxed font-light">
            A spacious open-air venue designed for unforgettable evenings at The Tiny Escape. Featuring warm ambient lighting, a dramatic fireside entrance, and a grand stepped front perfect for ceremonies and gatherings, the pavilion sets the stage for beautifully curated events. Opening soon.
          </p>
        </div>
      </section>

      {/* ── Highlights + Gallery ── */}
      <section className={`py-16 md:py-24 ${isDarkMode ? 'bg-[#0B0F0B]' : 'bg-white'}`}>
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Left — Highlights */}
            <div>
              <p className={`text-xs uppercase tracking-widest font-semibold mb-3 ${isDarkMode ? 'text-[#6BAF7A]' : 'text-[#2F5D3A]'}`}>
                Why it stands out
              </p>
              <h2
                className={`text-3xl md:text-4xl font-bold mb-8 leading-snug ${isDarkMode ? 'text-[#E8F0E8]' : 'text-[#0F1F0F]'}`}
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Designed for memorable moments
              </h2>
              <div className="space-y-4">
                {pavilionHighlights.map((item) => (
                  <div
                    key={item.title}
                    className={`group rounded-2xl p-5 border transition-all duration-300 hover:border-[#2F5D3A]/40 ${
                      isDarkMode
                        ? 'bg-[#0F1A0F] border-[#1A2A1A] hover:bg-[#132013]'
                        : 'bg-[#F8FBF8] border-[#E0EBE0] hover:bg-[#F0F7F0]'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-xl mt-0.5 shrink-0">{item.icon}</span>
                      <div>
                        <h3 className={`text-base font-semibold mb-1 ${isDarkMode ? 'text-[#D4E8D4]' : 'text-[#1A3A1A]'}`}>
                          {item.title}
                        </h3>
                        <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-[#8FA88F]' : 'text-[#4A6A4A]'}`}>
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-3 gap-3">
                {pavilionStats.map((stat) => (
                  <div
                    key={stat.label}
                    className={`rounded-xl border p-4 text-center ${
                      isDarkMode
                        ? 'bg-[#0B0F0B] border-[#1A2A1A]'
                        : 'bg-[#F3F8F3] border-[#DDE8DD]'
                    }`}
                  >
                    <p className={`text-xs uppercase tracking-wider mb-1 ${isDarkMode ? 'text-[#6A8A6A]' : 'text-[#5A7A5A]'}`}>
                      {stat.label}
                    </p>
                    <p className={`text-sm font-bold ${isDarkMode ? 'text-[#D4E8D4]' : 'text-[#1F3A2A]'}`}>
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Photo grid (3 images) */}
            <div className="grid grid-cols-2 gap-3">
              <img
                src={pav3}
                alt="Pavilion seating area"
                className="h-48 md:h-60 w-full rounded-2xl object-cover"
                loading="lazy"
                decoding="async"
              />
              <img
                src={pav4}
                alt="Pavilion scenic view"
                className="h-48 md:h-60 w-full rounded-2xl object-cover"
                loading="lazy"
                decoding="async"
              />
              <img
                src={pav8}
                alt="Pavilion at dusk"
                className="col-span-2 h-56 md:h-72 w-full rounded-2xl object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Availability Calendar ── */}
      <section className={`py-16 md:py-24 ${isDarkMode ? 'bg-[#0F1A0F]' : 'bg-[#F3F8F3]'}`}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <p className={`text-xs uppercase tracking-widest font-semibold mb-3 ${isDarkMode ? 'text-[#6BAF7A]' : 'text-[#2F5D3A]'}`}>
                Plan your event
              </p>
              <h2
                className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-[#E8F0E8]' : 'text-[#0F1F0F]'}`}
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Check Availability
              </h2>
              <p className={`mt-3 text-base ${isDarkMode ? 'text-[#8FA88F]' : 'text-[#4A6A4A]'}`}>
                Select your event dates below, then reach out to our team to confirm and plan.
              </p>
            </div>

            <div className={`rounded-3xl border overflow-hidden ${isDarkMode ? 'bg-[#0B0F0B] border-[#1A2A1A]' : 'bg-white border-[#DDE8DD]'}`}>
              {/* Calendar */}
              <div className="flex justify-center p-6">
                <DayPicker
                  mode="range"
                  selected={dateRange}
                  onSelect={(range) => setDateRange(range || { from: undefined, to: undefined })}
                  numberOfMonths={2}
                  disabled={{ before: today }}
                  modifiersStyles={{
                    selected: {
                      backgroundColor: '#2F5D3A',
                      color: '#ffffff',
                    },
                    range_middle: {
                      backgroundColor: isDarkMode ? '#1A2E1A' : '#EAF3EA',
                      color: isDarkMode ? '#C9D6DF' : '#1F3A2A',
                    },
                  }}
                />
              </div>

              {/* Date summary + CTAs */}
              <div className={`px-6 py-5 border-t ${isDarkMode ? 'border-[#1A2A1A]' : 'border-[#E0EBE0]'}`}>
                {dateRange?.from && dateRange?.to ? (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <p className={`text-xs uppercase tracking-wider mb-1 ${isDarkMode ? 'text-[#6A8A6A]' : 'text-[#5A7A5A]'}`}>
                        Selected dates
                      </p>
                      <p className={`text-sm font-semibold ${isDarkMode ? 'text-[#D4E8D4]' : 'text-[#1F3A2A]'}`}>
                        {formatDisplayDate(dateRange.from)} → {formatDisplayDate(dateRange.to)}
                        <span className={`ml-2 font-normal ${isDarkMode ? 'text-[#8FA88F]' : 'text-[#4A6A4A]'}`}>
                          ({nightCount} night{nightCount !== 1 ? 's' : ''})
                        </span>
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <Link
                        to="/book-now"
                        state={bookNowState}
                        className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-[#1F3A2A] text-[#F7FBF7] hover:bg-[#2F5D3A] transition-colors duration-200"
                      >
                        Request Availability
                      </Link>
                      <Link
                        to="/contact"
                        className={`px-5 py-2.5 rounded-xl text-sm font-semibold border transition-colors duration-200 ${
                          isDarkMode
                            ? 'border-[#2F5D3A] text-[#6BAF7A] hover:bg-[#1A2A1A]'
                            : 'border-[#1F3A2A] text-[#1F3A2A] hover:bg-[#F0F7F0]'
                        }`}
                      >
                        Contact Team
                      </Link>
                    </div>
                  </div>
                ) : dateRange?.from ? (
                  <p className={`text-sm ${isDarkMode ? 'text-[#8FA88F]' : 'text-[#4A6A4A]'}`}>
                    Now select your event end date
                  </p>
                ) : (
                  <p className={`text-sm ${isDarkMode ? 'text-[#6A8A6A]' : 'text-[#7A9A7A]'}`}>
                    Click a start date to begin — then select your end date
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Plan your evening ── */}
      <section className={`py-16 md:py-24 ${isDarkMode ? 'bg-[#0B0F0B]' : 'bg-white'}`}>
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-10 items-center">
            <img
              src={pav5}
              alt="Pavilion event layout"
              className="w-full h-64 md:h-80 rounded-3xl object-cover"
              loading="lazy"
              decoding="async"
            />
            <div>
              <p className={`text-xs uppercase tracking-widest font-semibold mb-3 ${isDarkMode ? 'text-[#6BAF7A]' : 'text-[#2F5D3A]'}`}>
                Get in touch
              </p>
              <h2
                className={`text-3xl md:text-4xl font-bold leading-snug mb-4 ${isDarkMode ? 'text-[#E8F0E8]' : 'text-[#0F1F0F]'}`}
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Plan your pavilion evening
              </h2>
              <p className={`text-base leading-relaxed ${isDarkMode ? 'text-[#8FA88F]' : 'text-[#4A6A4A]'}`}>
                Tell us your occasion, preferred setup, and guest count. Our team will help you shape a smooth and memorable experience tailored to your vision.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/book-now"
                  state={bookNowState}
                  className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.02] ${
                    isDarkMode
                      ? 'bg-[#1F3A2A] text-[#D4EDDA] hover:bg-[#2F5D3A]'
                      : 'bg-[#1F3A2A] text-[#F7FBF7] hover:bg-[#2F5D3A]'
                  }`}
                >
                  Request Availability
                </Link>
                <Link
                  to="/contact"
                  className={`px-6 py-3 rounded-xl text-sm font-semibold border transition-all duration-200 hover:scale-[1.02] ${
                    isDarkMode
                      ? 'border-[#2F5D3A] text-[#6BAF7A] hover:bg-[#0F1A0F]'
                      : 'border-[#1F3A2A] text-[#1F3A2A] hover:bg-[#F0F7F0]'
                  }`}
                >
                  Contact Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DayPicker theme */}
      <style>{`
        .rdp {
          --rdp-cell-size: 38px;
          --rdp-accent-color: #2F5D3A;
          --rdp-background-color: ${isDarkMode ? '#1A2E1A' : '#EAF3EA'};
          margin: 0;
          font-size: 0.82rem;
        }
        .rdp-day_range_middle {
          background-color: ${isDarkMode ? '#1A2E1A' : '#EAF3EA'} !important;
          color: ${isDarkMode ? '#C9D6DF' : '#1F3A2A'} !important;
        }
        .rdp-day_selected:not(.rdp-day_range_middle) {
          background-color: #2F5D3A !important;
          color: white !important;
        }
        .rdp-button:hover:not([disabled]) {
          background-color: ${isDarkMode ? '#1A2E1A' : '#EAF3EA'} !important;
        }
        .rdp-caption_label {
          color: ${isDarkMode ? '#E0E7EE' : '#1F2A1F'};
          font-weight: 700;
          font-size: 0.82rem;
        }
        .rdp-day {
          color: ${isDarkMode ? '#C9D6DF' : '#334155'};
        }
        .rdp-day[disabled] {
          color: ${isDarkMode ? '#3A3A3A' : '#C0C8C0'} !important;
        }
      `}</style>
    </PageLayout>
  );
};

export default Pavillion;
