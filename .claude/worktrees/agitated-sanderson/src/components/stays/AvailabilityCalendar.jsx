import { useState, useCallback, useEffect, memo } from "react";
import { Link } from "react-router-dom";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { checkBookingAvailability } from "../../services/bookings";
import { getUnavailableDatesBySlug } from "../../services/houses";

/**
 * AvailabilityCalendar
 * Hostfully-ready: fetches unavailable/blocked dates from the API and disables
 * them in the picker. Falls back gracefully when the backend is offline.
 */
const AvailabilityCalendar = memo(({ isDarkMode, staySlug, stayName, onDatesSelected }) => {
  const [dateRange, setDateRange] = useState({ from: undefined, to: undefined });
  const [status, setStatus] = useState({ loading: false, result: null, error: "" });

  // Hostfully unavailable dates
  const [blockedDates, setBlockedDates] = useState([]);
  const [loadingBlocked, setLoadingBlocked] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Fetch blocked/unavailable dates on mount (Hostfully integration)
  useEffect(() => {
    if (!staySlug) return;
    let mounted = true;

    const loadBlockedDates = async () => {
      setLoadingBlocked(true);
      try {
        const response = await getUnavailableDatesBySlug(staySlug);
        const rawDates = response?.data || response || [];

        const parsed = rawDates
          .map((d) => {
            if (d instanceof Date) return d;
            const parsed = new Date(d);
            return Number.isNaN(parsed.getTime()) ? null : parsed;
          })
          .filter(Boolean);

        if (mounted) setBlockedDates(parsed);
      } catch {
        // Silently fail — backend not yet connected
        if (mounted) setBlockedDates([]);
      } finally {
        if (mounted) setLoadingBlocked(false);
      }
    };

    loadBlockedDates();
    return () => { mounted = false; };
  }, [staySlug]);

  const formatDateToYMD = useCallback((date) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, []);

  const formatDisplay = (date) =>
    date
      ? date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
      : "";

  const handleSelect = useCallback(
    async (range) => {
      setDateRange(range || { from: undefined, to: undefined });

      if (!range?.from || !range?.to) {
        setStatus({ loading: false, result: null, error: "" });
        return;
      }

      const checkIn = formatDateToYMD(range.from);
      const checkOut = formatDateToYMD(range.to);

      setStatus({ loading: true, result: null, error: "" });

      try {
        const response = await checkBookingAvailability({
          houseSlug: staySlug,
          checkIn,
          checkOut,
        });

        setStatus({
          loading: false,
          result: response?.available === true ? "available" : "unavailable",
          error: "",
        });

        if (onDatesSelected) {
          onDatesSelected({ checkIn, checkOut });
        }
      } catch (err) {
        setStatus({
          loading: false,
          result: "unknown",
          error: err?.message || "Unable to check availability",
        });
      }
    },
    [formatDateToYMD, staySlug, onDatesSelected],
  );

  const nightCount =
    dateRange?.from && dateRange?.to
      ? Math.ceil((dateRange.to - dateRange.from) / (1000 * 60 * 60 * 24))
      : 0;

  const bookNowState =
    dateRange?.from && dateRange?.to
      ? {
          packageData: {
            title: stayName ? `${stayName} – Stay Request` : "Stay Request",
            prefillDates: {
              checkIn: formatDateToYMD(dateRange.from),
              checkOut: formatDateToYMD(dateRange.to),
              nights: nightCount,
            },
          },
        }
      : undefined;

  // Build disabled matcher: past dates + blocked dates from Hostfully
  const disabledDays = [
    { before: today },
    ...blockedDates.map((d) => d),
  ];

  return (
    <div
      className={`rounded-2xl border overflow-hidden ${
        isDarkMode
          ? "bg-[#0F1419] border-[#1E2A1E]"
          : "bg-white border-[#E2E8F0]"
      }`}
    >
      {/* Header */}
      <div
        className={`px-5 py-4 border-b ${
          isDarkMode ? "border-[#1E2A1E]" : "border-[#E8F0E8]"
        }`}
      >
        <h3
          className={`text-base font-bold ${
            isDarkMode ? "text-[#E0E7EE]" : "text-[#1F2A1F]"
          }`}
        >
          Check Availability
        </h3>
        <p
          className={`text-xs mt-0.5 ${
            isDarkMode ? "text-[#8A9BAC]" : "text-[#64748B]"
          }`}
        >
          {loadingBlocked
            ? "Loading available dates…"
            : "Select check-in and check-out dates"}
        </p>
      </div>

      {/* Calendar */}
      <div className="flex justify-center p-3">
        <DayPicker
          mode="range"
          selected={dateRange}
          onSelect={handleSelect}
          numberOfMonths={1}
          disabled={disabledDays}
          modifiersStyles={{
            selected: {
              backgroundColor: "#2F5D3A",
              color: "#ffffff",
            },
            range_middle: {
              backgroundColor: isDarkMode ? "#1A2E1A" : "#EAF3EA",
              color: isDarkMode ? "#C9D6DF" : "#1F3A2A",
            },
          }}
        />
      </div>

      {/* Status / Results */}
      <div
        className={`px-5 py-4 border-t ${
          isDarkMode ? "border-[#1E2A1E]" : "border-[#E8F0E8]"
        }`}
      >
        {status.loading && (
          <div className="flex items-center gap-2">
            <div
              className={`h-4 w-4 rounded-full border-2 border-t-transparent animate-spin ${
                isDarkMode ? "border-[#6BAF7A]" : "border-[#2F5D3A]"
              }`}
            />
            <span
              className={`text-sm ${
                isDarkMode ? "text-[#CDBEAC]" : "text-[#4B5F4B]"
              }`}
            >
              Checking availability…
            </span>
          </div>
        )}

        {!status.loading && status.result === "available" && (
          <div className="space-y-3">
            <div
              className={`flex items-center gap-2 p-3 rounded-xl ${
                isDarkMode ? "bg-[#1A2E1A]" : "bg-[#EAF3EA]"
              }`}
            >
              <svg
                className="h-5 w-5 text-[#2F5D3A]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <div>
                <p
                  className={`text-sm font-semibold ${
                    isDarkMode ? "text-[#6BAF7A]" : "text-[#2F5D3A]"
                  }`}
                >
                  Available for {nightCount} night{nightCount !== 1 ? "s" : ""}
                </p>
                {dateRange?.from && dateRange?.to && (
                  <p className={`text-xs mt-0.5 ${isDarkMode ? "text-[#8A9BAC]" : "text-[#64748B]"}`}>
                    {formatDisplay(dateRange.from)} → {formatDisplay(dateRange.to)}
                  </p>
                )}
              </div>
            </div>
            {/* Book Now CTA */}
            <Link
              to="/book-now"
              state={bookNowState}
              className="block w-full text-center rounded-xl py-2.5 text-sm font-semibold bg-[#1F3A2A] text-[#F7FBF7] hover:bg-[#2F5D3A] transition-colors duration-200"
            >
              Book These Dates
            </Link>
          </div>
        )}

        {!status.loading && status.result === "unavailable" && (
          <div
            className={`flex items-center gap-2 p-3 rounded-xl ${
              isDarkMode ? "bg-[#2A1A1A]" : "bg-[#FFF0F0]"
            }`}
          >
            <svg
              className="h-5 w-5 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <p
              className={`text-sm font-semibold ${
                isDarkMode ? "text-red-300" : "text-red-600"
              }`}
            >
              Not available for these dates
            </p>
          </div>
        )}

        {!status.loading && status.result === "unknown" && (
          <p
            className={`text-sm ${
              isDarkMode ? "text-[#A79C8C]" : "text-[#6B7C6B]"
            }`}
          >
            {status.error || "Unable to verify availability. Please try again."}
          </p>
        )}

        {!status.loading && !status.result && dateRange?.from && !dateRange?.to && (
          <p
            className={`text-sm ${
              isDarkMode ? "text-[#8A9A8A]" : "text-[#94A394]"
            }`}
          >
            Now select your check-out date
          </p>
        )}

        {!status.loading && !status.result && !dateRange?.from && (
          <p
            className={`text-sm ${
              isDarkMode ? "text-[#8A9A8A]" : "text-[#94A394]"
            }`}
          >
            Select dates above to check availability
          </p>
        )}
      </div>

      {/* Calendar theme styles */}
      <style>{`
        .rdp {
          --rdp-cell-size: 36px;
          --rdp-accent-color: #2F5D3A;
          --rdp-background-color: ${isDarkMode ? "#1A2E1A" : "#EAF3EA"};
          margin: 0;
          font-size: 0.85rem;
        }
        .rdp-day_range_middle {
          background-color: ${isDarkMode ? "#1A2E1A" : "#EAF3EA"} !important;
          color: ${isDarkMode ? "#C9D6DF" : "#1F3A2A"} !important;
        }
        .rdp-day_selected:not(.rdp-day_range_middle) {
          background-color: #2F5D3A !important;
          color: white !important;
        }
        .rdp-button:hover:not([disabled]) {
          background-color: ${isDarkMode ? "#1A2E1A" : "#EAF3EA"} !important;
        }
        .rdp-caption_label {
          color: ${isDarkMode ? "#E0E7EE" : "#1F2A1F"};
          font-weight: 700;
          font-size: 0.85rem;
        }
        .rdp-day {
          color: ${isDarkMode ? "#C9D6DF" : "#334155"};
        }
        .rdp-day[disabled] {
          color: ${isDarkMode ? "#3A3A3A" : "#C0C8C0"} !important;
          text-decoration: line-through;
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
});

AvailabilityCalendar.displayName = "AvailabilityCalendar";

export default AvailabilityCalendar;
