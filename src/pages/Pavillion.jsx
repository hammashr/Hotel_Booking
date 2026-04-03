import { useState, useCallback, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import PageLayout from '../components/layout/PageLayout';
import { useTheme } from '../context/ThemeContext';

import pavCropped from '../assets/Pavilion images/Pavilion images/pavilion cropped.jpeg';

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
  const heroRef = useRef(null);
  const imgRef = useRef(null);
  const [dateRange, setDateRange] = useState({ from: undefined, to: undefined });

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current || !imgRef.current) return;
      const offset = window.scrollY * 0.3;
      imgRef.current.style.transform = `translateY(${offset}px)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    imgRef.current.style.transform = 'translateY(0px)';
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const earliestBooking = new Date(2026, 5, 5); // June 5, 2026

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
      {/* ── Hero ── */}
      <section ref={heroRef} className="relative overflow-hidden">

        <img
          ref={imgRef}
          src={pavCropped}
          alt="Fireside Pavilion"
          className="w-full h-auto block will-change-transform"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" style={{ zIndex: 2 }} />

        {/* Hero text */}
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-6 pb-10 md:pb-16" style={{ zIndex: 3 }}>
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

            {/* Right — Single image */}
            <div>
              <img
                src={pavCropped}
                alt="Fireside Pavilion"
                className="w-full rounded-2xl object-cover"
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
              <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                <span className="inline-flex items-center rounded-full bg-linear-to-r from-[#D1965A] to-[#F1C281] px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#1A120A] shadow">
                  Coming Soon
                </span>
                <p className={`text-base ${isDarkMode ? 'text-[#8FA88F]' : 'text-[#4A6A4A]'}`}>
                  The pavilion is not yet open for bookings — we'll be ready soon!
                </p>
              </div>
            </div>

            <div className={`rounded-3xl border overflow-hidden ${isDarkMode ? 'bg-[#0B0F0B] border-[#1A2A1A]' : 'bg-white border-[#DDE8DD]'}`}>
              {/* Calendar — disabled until opening */}
              <div className="relative flex justify-center p-6">
                {/* Unclickable overlay */}
                <div className="absolute inset-0 z-10 cursor-not-allowed" />
                <div className="opacity-40 pointer-events-none select-none">
                  <DayPicker
                    mode="range"
                    selected={dateRange}
                    onSelect={(range) => setDateRange(range || { from: undefined, to: undefined })}
                    numberOfMonths={2}
                    defaultMonth={earliestBooking}
                    disabled={{ before: earliestBooking }}
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
              </div>

              {/* Coming Soon notice */}
              <div className={`px-6 py-5 border-t ${isDarkMode ? 'border-[#1A2A1A]' : 'border-[#E0EBE0]'}`}>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center rounded-full bg-linear-to-r from-[#D1965A] to-[#F1C281] px-3 py-1 text-xs font-black uppercase tracking-widest text-[#1A120A] shadow">
                      Coming Soon
                    </span>
                    <p className={`text-sm ${isDarkMode ? 'text-[#8FA88F]' : 'text-[#4A6A4A]'}`}>
                      Bookings will open soon — stay tuned!
                    </p>
                  </div>
                  <Link
                    to="/contact"
                    className={`px-5 py-2.5 rounded-xl text-sm font-semibold border transition-colors duration-200 ${
                      isDarkMode
                        ? 'border-[#2F5D3A] text-[#6BAF7A] hover:bg-[#1A2A1A]'
                        : 'border-[#1F3A2A] text-[#1F3A2A] hover:bg-[#F0F7F0]'
                    }`}
                  >
                    Get Notified
                  </Link>
                </div>
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
              src={pavCropped}
              alt="Fireside Pavilion"
              className="w-full rounded-3xl object-cover"
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
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-linear-to-r from-[#D1965A] to-[#F1C281] px-5 py-3 text-sm font-black uppercase tracking-widest text-[#1A120A] shadow animate-pulse">
                  Coming Soon
                </span>
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
