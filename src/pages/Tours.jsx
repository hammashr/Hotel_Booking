import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import heroAllHomes from '../assets/gallery/gallery-tiny-escape-2026.png';
import { useTheme } from '../context/ThemeContext';
import PageLayout from '../components/layout/PageLayout';
import { getAllStays } from '../data/staysData';
import { useHousesData } from '../hooks/useHousesData';
import { checkBookingAvailability } from '../services/bookings';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

/* ── helpers ── */
const formatYMD = (date) => {
  if (!date) return '';
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const formatDisplay = (date) => {
  if (!date) return '';
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const GUEST_OPTIONS = [1, 2, 3, 4, 5];

const Tours = () => {
  const { isDarkMode } = useTheme();
  const { houses, isLoading, isFallback } = useHousesData({ fallbackData: getAllStays() });
  const allHouses = useMemo(() => houses.slice(0, 4), [houses]);
  const heroRef = useRef(null);
  const imgRef = useRef(null);

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

  /* ── search state ── */
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(1);
  const [openPicker, setOpenPicker] = useState(null); // 'checkin' | 'checkout' | 'guests' | null
  const [searched, setSearched] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [availabilityMap, setAvailabilityMap] = useState({}); // slug → true/false/null

  /* ── availability check ── */
  const handleSearch = useCallback(async () => {
    if (!checkIn || !checkOut) {
      setSearchError('Please select both check-in and check-out dates.');
      return;
    }
    if (checkOut <= checkIn) {
      setSearchError('Check-out must be after check-in.');
      return;
    }
    setSearchError('');
    setSearching(true);
    setSearched(false);

    try {
      const results = await Promise.all(
        allHouses.map(async (stay) => {
          try {
            const res = await checkBookingAvailability({
              houseSlug: stay.slug,
              checkIn: formatYMD(checkIn),
              checkOut: formatYMD(checkOut),
            });
            return [stay.slug, res?.available !== false];
          } catch {
            return [stay.slug, null]; // unknown — show it
          }
        })
      );
      setAvailabilityMap(Object.fromEntries(results));
      setSearched(true);
    } catch {
      setSearchError('Something went wrong. Please try again.');
    } finally {
      setSearching(false);
    }
  }, [checkIn, checkOut, allHouses]);

  const handleClear = () => {
    setCheckIn(null);
    setCheckOut(null);
    setGuests(1);
    setSearched(false);
    setAvailabilityMap({});
    setSearchError('');
    setOpenPicker(null);
  };

  /* ── filtered list ── */
  const visibleHouses = useMemo(() => {
    if (!searched) return allHouses;
    return allHouses.filter((h) => availabilityMap[h.slug] !== false);
  }, [searched, allHouses, availabilityMap]);

  const unavailableCount = useMemo(() => {
    if (!searched) return 0;
    return allHouses.filter((h) => availabilityMap[h.slug] === false).length;
  }, [searched, allHouses, availabilityMap]);

  /* ── date picker helpers ── */
  const disabledCheckIn = { before: new Date() };
  const disabledCheckOut = checkIn ? { before: new Date(checkIn.getTime() + 86400000) } : { before: new Date() };

  return (
    <PageLayout
      seo={{
        title: 'Our Stays | The Tiny Escape',
        description: 'Browse and book our tiny homes. Check availability for your dates and find the perfect cabin in Bruceville-Eddy, Texas.',
        keywords: 'The Tiny Escape, tiny home rentals, cabin stays, book tiny home, Texas getaway',
        url: '/tours',
      }}
    >
      {/* ── Page Hero + Search Bar (one unified section) ── */}
      <section ref={heroRef} className="relative pt-24 md:pt-28 pb-12 min-h-[calc(70svh-72px)] md:min-h-[72vh] w-full overflow-hidden">
        {/* Background image */}
        <img
          ref={imgRef}
          src={heroAllHomes}
          alt="All homes at The Tiny Escape"
          className="absolute w-full h-full object-cover will-change-transform"
          style={{ height: '130%', top: '-15%' }}
        />
        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: isDarkMode ? 'rgba(10,8,6,0.75)' : 'rgba(15,28,20,0.65)',
          }}
        />
        {/* Content + Search Bar together */}
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
          {/* Heading */}
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-[0.22em] font-bold mb-3 text-[#A8E6A3]">
              Bruceville-Eddy, Texas
            </p>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Find Your Stay
            </h1>
            <p className="text-white/75 text-base sm:text-lg max-w-xl mx-auto">
              Thoughtfully designed tiny homes for rest, comfort, and connection.
            </p>
          </div>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-0 rounded-2xl overflow-visible border shadow-2xl
            sm:rounded-full
            "
            style={{
              background: isDarkMode ? 'rgba(26,20,15,0.97)' : 'rgba(255,255,255,0.97)',
              border: isDarkMode ? '1px solid rgba(201,163,106,0.35)' : '1.5px solid rgba(200,223,200,0.9)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {/* Check-In */}
            <div className="relative flex-1">
              <button
                onClick={() => setOpenPicker(openPicker === 'checkin' ? null : 'checkin')}
                className={`w-full flex items-center gap-3 px-5 py-3.5 text-left transition-colors rounded-full sm:rounded-none sm:rounded-l-full ${
                  isDarkMode ? 'hover:bg-white/5' : 'hover:bg-[#F3F7F2]'
                }`}
              >
                <svg className={`h-5 w-5 flex-shrink-0 ${isDarkMode ? 'text-[#C9A36A]' : 'text-[#2F5D3A]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="1.8"/>
                  <path d="M16 2v4M8 2v4M3 10h18" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
                <div>
                  <p className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-[#C9A36A]' : 'text-[#2F5D3A]'}`}>Check-In</p>
                  <p className={`text-sm font-semibold ${checkIn ? (isDarkMode ? 'text-white' : 'text-[#1F2A1F]') : (isDarkMode ? 'text-[#6B6055]' : 'text-[#9CAE9C]')}`}>
                    {checkIn ? formatDisplay(checkIn) : 'Add date'}
                  </p>
                </div>
              </button>
              {openPicker === 'checkin' && (
                <div className={`absolute top-full left-0 mt-2 z-50 rounded-2xl shadow-2xl border p-2 ${
                  isDarkMode ? 'bg-[#1A140F] border-[rgba(201,163,106,0.3)]' : 'bg-white border-[#DDE8DD]'
                }`}>
                  <DayPicker
                    mode="single"
                    selected={checkIn}
                    onSelect={(d) => { setCheckIn(d); setOpenPicker('checkout'); }}
                    disabled={disabledCheckIn}
                    fromMonth={new Date()}
                  />
                </div>
              )}
            </div>

            {/* Divider */}
            <div className={`hidden sm:block h-8 w-px ${isDarkMode ? 'bg-[rgba(201,163,106,0.2)]' : 'bg-[#DDE8DD]'}`} />

            {/* Check-Out */}
            <div className="relative flex-1">
              <button
                onClick={() => setOpenPicker(openPicker === 'checkout' ? null : 'checkout')}
                className={`w-full flex items-center gap-3 px-5 py-3.5 text-left transition-colors ${
                  isDarkMode ? 'hover:bg-white/5' : 'hover:bg-[#F3F7F2]'
                }`}
              >
                <svg className={`h-5 w-5 flex-shrink-0 ${isDarkMode ? 'text-[#C9A36A]' : 'text-[#2F5D3A]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="1.8"/>
                  <path d="M16 2v4M8 2v4M3 10h18" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
                <div>
                  <p className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-[#C9A36A]' : 'text-[#2F5D3A]'}`}>Check-Out</p>
                  <p className={`text-sm font-semibold ${checkOut ? (isDarkMode ? 'text-white' : 'text-[#1F2A1F]') : (isDarkMode ? 'text-[#6B6055]' : 'text-[#9CAE9C]')}`}>
                    {checkOut ? formatDisplay(checkOut) : 'Add date'}
                  </p>
                </div>
              </button>
              {openPicker === 'checkout' && (
                <div className={`absolute top-full left-0 mt-2 z-50 rounded-2xl shadow-2xl border p-2 ${
                  isDarkMode ? 'bg-[#1A140F] border-[rgba(201,163,106,0.3)]' : 'bg-white border-[#DDE8DD]'
                }`}>
                  <DayPicker
                    mode="single"
                    selected={checkOut}
                    onSelect={(d) => { setCheckOut(d); setOpenPicker(null); }}
                    disabled={disabledCheckOut}
                    fromMonth={checkIn || new Date()}
                  />
                </div>
              )}
            </div>

            {/* Divider */}
            <div className={`hidden sm:block h-8 w-px ${isDarkMode ? 'bg-[rgba(201,163,106,0.2)]' : 'bg-[#DDE8DD]'}`} />

            {/* Guests */}
            <div className="relative">
              <button
                onClick={() => setOpenPicker(openPicker === 'guests' ? null : 'guests')}
                className={`w-full flex items-center gap-3 px-5 py-3.5 text-left transition-colors ${
                  isDarkMode ? 'hover:bg-white/5' : 'hover:bg-[#F3F7F2]'
                }`}
              >
                <svg className={`h-5 w-5 flex-shrink-0 ${isDarkMode ? 'text-[#C9A36A]' : 'text-[#2F5D3A]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeWidth="1.8" strokeLinecap="round"/>
                  <circle cx="9" cy="7" r="4" strokeWidth="1.8"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
                <div>
                  <p className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-[#C9A36A]' : 'text-[#2F5D3A]'}`}>Guests</p>
                  <p className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-[#1F2A1F]'}`}>{guests} {guests === 1 ? 'guest' : 'guests'}</p>
                </div>
              </button>
              {openPicker === 'guests' && (
                <div className={`absolute top-full right-0 mt-2 z-50 rounded-2xl shadow-2xl border overflow-hidden w-40 ${
                  isDarkMode ? 'bg-[#1A140F] border-[rgba(201,163,106,0.3)]' : 'bg-white border-[#DDE8DD]'
                }`}>
                  {GUEST_OPTIONS.map((n) => (
                    <button
                      key={n}
                      onClick={() => { setGuests(n); setOpenPicker(null); }}
                      className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                        guests === n
                          ? isDarkMode ? 'bg-[#2F5D3A] text-white' : 'bg-[#EAF3EA] text-[#1F3A2A] font-bold'
                          : isDarkMode ? 'text-[#D6C5AE] hover:bg-white/5' : 'text-[#1F2A1F] hover:bg-[#F3F7F2]'
                      }`}
                    >
                      {n} {n === 1 ? 'guest' : 'guests'}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Button */}
            <div className="px-2 py-2 sm:py-1.5">
              <button
                onClick={handleSearch}
                disabled={searching}
                className="flex items-center gap-2 rounded-full bg-[#1F3A2A] hover:bg-[#2F5D3A] text-white font-bold px-6 py-3 transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg whitespace-nowrap"
              >
                {searching ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 70"/>
                    </svg>
                    Searching…
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="11" cy="11" r="8" strokeWidth="2"/>
                      <path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    Search
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Error + Clear */}
          {searchError && (
            <p className="mt-3 text-center text-sm text-red-300 font-medium">{searchError}</p>
          )}
          {searched && (
            <div className="mt-3 flex items-center justify-between px-1">
              <p className="text-sm text-white/70">
                {visibleHouses.length === 0
                  ? 'No homes available for those dates.'
                  : `${visibleHouses.length} home${visibleHouses.length !== 1 ? 's' : ''} available${unavailableCount > 0 ? ` · ${unavailableCount} unavailable (hidden)` : ''}`}
              </p>
              <button onClick={handleClear} className="text-sm font-semibold text-[#A8E6A3] underline hover:text-white transition">
                Clear search
              </button>
            </div>
          )}
        </div>

        {/* Close pickers when clicking outside */}
        {openPicker && (
          <div className="fixed inset-0 z-30" onClick={() => setOpenPicker(null)} />
        )}
      </section>

      {/* ── Stays Grid ── */}
      <section className={`relative z-0 py-12 md:py-16 transition-colors duration-500 ${isDarkMode ? 'bg-[#0F0D0A]' : 'bg-[#F5F9F3]'}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">

          {isFallback && (
            <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-700 text-sm font-medium">
              Live availability API is unavailable. Showing all homes — dates may not reflect real bookings.
            </div>
          )}

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`h-96 rounded-3xl animate-pulse ${isDarkMode ? 'bg-[#1A140F]' : 'bg-[#E3EFE3]'}`} />
              ))}
            </div>
          ) : visibleHouses.length === 0 ? (
            /* No results */
            <div className="text-center py-20">
              <svg className={`mx-auto h-16 w-16 mb-4 ${isDarkMode ? 'text-[#3A2E25]' : 'text-[#C8DFC8]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-[#F2EEE7]' : 'text-[#1F2A1F]'}`} style={{ fontFamily: 'Playfair Display, serif' }}>
                No homes available for those dates
              </h3>
              <p className={`text-sm mb-6 ${isDarkMode ? 'text-[#A79C8C]' : 'text-[#4B5F4B]'}`}>
                Try different dates or contact us — we may have options not listed here.
              </p>
              <div className="flex gap-3 justify-center">
                <button onClick={handleClear} className="rounded-xl bg-[#1F3A2A] text-white px-6 py-2.5 text-sm font-bold hover:bg-[#2F5D3A] transition">
                  Try Different Dates
                </button>
                <Link to="/contact" className={`rounded-xl border-2 px-6 py-2.5 text-sm font-bold transition ${isDarkMode ? 'border-[#C9A36A] text-[#C9A36A]' : 'border-[#1F3A2A] text-[#1F3A2A]'}`}>
                  Contact Us
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-7">
              {visibleHouses.map((stay) => {
                const isUnknown = searched && availabilityMap[stay.slug] === null;

                return (
                  <Link
                    key={stay.slug}
                    to={`/stay/${stay.slug}${checkIn && checkOut ? `?checkIn=${formatYMD(checkIn)}&checkOut=${formatYMD(checkOut)}&guests=${guests}` : ''}`}
                    className={`group flex flex-col overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-2 ${
                      isDarkMode
                        ? 'bg-[#0F1A12] shadow-[0_4px_28px_rgba(0,0,0,0.45)] hover:shadow-[0_24px_56px_rgba(0,0,0,0.6)]'
                        : 'bg-white shadow-[0_2px_18px_rgba(31,58,42,0.09)] hover:shadow-[0_22px_52px_rgba(31,58,42,0.2)]'
                    }`}
                  >
                    {/* ── Image ── */}
                    <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                      <img
                        src={stay.heroImage}
                        alt={stay.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Layered gradient for depth */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F10]/30 via-transparent to-transparent" />

                      {/* Top row: availability + category */}
                      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-start justify-between">
                        {searched ? (
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold shadow-lg backdrop-blur-md border ${
                            isUnknown
                              ? 'bg-amber-400/85 text-black border-amber-300/50'
                              : 'bg-[#1A3A22]/90 text-[#7DCEA0] border-[#2F5D3A]/60'
                          }`}>
                            {isUnknown ? '● Check dates' : '✓ Available'}
                          </span>
                        ) : <span />}
                        <span />
                      </div>

                      {/* Bottom: rating left, price right */}
                      <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 flex items-end justify-between">
                        <div className="flex items-center gap-1.5 bg-black/55 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/10">
                          <svg className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                          <span className="text-white text-xs font-bold">{stay.rating || '4.9'}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-white font-black text-xl leading-none drop-shadow-lg">${stay.pricing?.standard?.price || '—'}</span>
                          <span className="text-white/65 text-[11px] ml-1">/ night</span>
                        </div>
                      </div>
                    </div>

                    {/* ── Card Body ── */}
                    <div className="flex flex-col flex-1 px-5 pt-5 pb-5">

                      {/* Name + location */}
                      <div className="mb-4">
                        <h3
                          className={`text-[1.25rem] font-bold leading-snug mb-1.5 ${isDarkMode ? 'text-[#EDF5EE]' : 'text-[#162816]'}`}
                          style={{ fontFamily: 'Playfair Display, serif' }}
                        >
                          {stay.name}
                        </h3>
                      </div>

                      {/* Stats pills */}
                      <div className={`flex items-center gap-2 flex-wrap mb-4 pb-4 border-b ${isDarkMode ? 'border-[#1A3A1A]' : 'border-[#E8F2E8]'}`}>
                        {[
                          {
                            label: `Sleeps ${stay.sleeps}`,
                            icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                          },
                          {
                            label: `${stay.bedrooms} bed${stay.bedrooms !== 1 ? 's' : ''}`,
                            icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                          },
                          {
                            label: `${stay.sizeSqFt || '—'} sq ft`,
                            icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
                          }
                        ].map(({ label, icon }) => (
                          <span
                            key={label}
                            className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                              isDarkMode ? 'bg-[#162A18] text-[#7AAF88]' : 'bg-[#EAF3EA] text-[#2F5D3A]'
                            }`}
                          >
                            <svg className="h-3 w-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">{icon}</svg>
                            {label}
                          </span>
                        ))}
                      </div>

                      {/* Highlights */}
                      <ul className="space-y-2.5 mb-5 flex-1">
                        {(stay.highlights || []).slice(0, 3).map((h, i) => (
                          <li key={i} className={`flex items-center gap-2.5 text-sm leading-snug ${isDarkMode ? 'text-[#A8C4AD]' : 'text-[#2C452C]'}`}>
                            <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-[#162A18]' : 'bg-[#DDF0DD]'}`}>
                              <svg className={`h-3 w-3 ${isDarkMode ? 'text-[#5AA870]' : 'text-[#2F5D3A]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                              </svg>
                            </span>
                            {h}
                          </li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <div className={`mt-auto rounded-xl py-3 px-5 text-center text-sm font-bold tracking-wide transition-all duration-300 group-hover:shadow-lg ${
                        isDarkMode
                          ? 'bg-[#1A3A22] text-[#9FD4AB] border border-[#2A5434] group-hover:bg-[#224D2C] group-hover:text-white'
                          : 'bg-[#1F3A2A] text-white group-hover:bg-[#2F5D3A]'
                      }`}>
                        View This Stay →
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── The Tiny Escape Difference ── */}
      <section className={`py-14 md:py-20 transition-colors duration-500 ${isDarkMode ? 'bg-[#120F0C]' : 'bg-[#EAF3EA]'}`}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
          <h2
            className={`text-2xl sm:text-3xl font-bold mb-3 ${isDarkMode ? 'text-[#F2EEE7]' : 'text-[#1F2A1F]'}`}
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            The Tiny Escape Difference
          </h2>
          <p className={`text-sm sm:text-base mb-10 max-w-2xl mx-auto ${isDarkMode ? 'text-[#A79C8C]' : 'text-[#4B5F4B]'}`}>
            Thoughtfully designed for comfort, connection, and quiet moments that matter.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '🏡', title: 'Thoughtfully Designed Homes', desc: 'Modern tiny homes intentionally crafted for comfort, style, and effortless relaxation.' },
              { icon: '🔥', title: 'Spaces Made to Gather', desc: 'From fireside evenings to the open-air pavilion, every space is designed to bring people together.' },
              { icon: '🌿', title: 'Curated On-Property Experiences', desc: 'Enjoy guided horseback riding, refreshing container pools, and moments made for the outdoors.' },
              { icon: '✦', title: 'Peaceful, Low-Density Retreat', desc: 'Fewer homes, more breathing room, and the quiet escape you\'ve been craving.' },
            ].map((item) => (
              <div
                key={item.title}
                className={`p-5 rounded-2xl border transition-all ${
                  isDarkMode
                    ? 'bg-[#16120F] border-[rgba(201,163,106,0.15)]'
                    : 'bg-white border-[#DDE8DD]'
                }`}
              >
                <div className={`text-2xl mb-2 ${isDarkMode ? 'text-[#C9A36A]' : 'text-[#2F5D3A]'}`}>{item.icon}</div>
                <h3 className={`text-sm font-bold mb-2 ${isDarkMode ? 'text-[#F2EEE7]' : 'text-[#1F2A1F]'}`}>{item.title}</h3>
                <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-[#A79C8C]' : 'text-[#4B5F4B]'}`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={`py-14 transition-colors duration-500 ${isDarkMode ? 'bg-[#0F0D0A]' : 'bg-[#F3F7F2]'}`}>
        <div className="mx-auto max-w-2xl px-4 sm:px-6 text-center">
          <h2
            className={`text-2xl sm:text-3xl font-bold mb-3 ${isDarkMode ? 'text-[#F2EEE7]' : 'text-[#1F2A1F]'}`}
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Ready to Escape?
          </h2>
          <p className={`text-sm sm:text-base mb-6 ${isDarkMode ? 'text-[#A79C8C]' : 'text-[#4B5F4B]'}`}>
            Check availability and start planning your stay at The Tiny Escape.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              to="/book-now"
              className={`rounded-xl px-6 py-3 text-sm font-bold transition-all hover:scale-105 ${
                isDarkMode
                  ? 'bg-[#C9A36A] text-[#1A120A] hover:bg-[#E7CFA2]'
                  : 'bg-[#1F3A2A] text-white hover:bg-[#2F5D3A]'
              }`}
            >
              Check Availability
            </Link>
            <Link
              to="/contact"
              className={`rounded-xl border-2 px-6 py-3 text-sm font-bold transition-all hover:scale-105 ${
                isDarkMode
                  ? 'border-[#C9A36A] text-[#C9A36A] hover:bg-[rgba(201,163,106,0.1)]'
                  : 'border-[#1F3A2A] text-[#1F3A2A] hover:bg-[rgba(31,58,42,0.08)]'
              }`}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Tours;
