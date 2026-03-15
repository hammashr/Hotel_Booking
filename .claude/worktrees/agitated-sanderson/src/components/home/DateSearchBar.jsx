import { useState, useRef, useEffect, useCallback, memo } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const DateSearchBar = memo(
  ({ isDarkMode, onSearch, isLoading, selectedRange, onRangeChange }) => {
    const [activeField, setActiveField] = useState(null); // 'checkIn' | 'checkOut' | null
    const containerRef = useRef(null);
    const calendarRef = useRef(null);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const formatDisplayDate = (date) => {
      if (!date) return "";
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    };

    const handleDayClick = useCallback(
      (nextRange) => {
        if (!nextRange) {
          onRangeChange({ from: undefined, to: undefined });
          return;
        }

        const { from, to } = nextRange;

        if (activeField === "checkIn") {
          onRangeChange({ from, to: selectedRange?.to || undefined });
          // Auto-advance to check-out after selecting check-in
          if (from && !selectedRange?.to) {
            setTimeout(() => setActiveField("checkOut"), 150);
          } else if (from && selectedRange?.to) {
            setActiveField(null);
          }
        } else if (activeField === "checkOut") {
          onRangeChange({ from: selectedRange?.from || from, to: to || from });
          if (to || from) {
            setTimeout(() => setActiveField(null), 150);
          }
        } else {
          onRangeChange(nextRange);
          if (from && !to) {
            setActiveField("checkOut");
          } else if (from && to) {
            setActiveField(null);
          }
        }
      },
      [activeField, onRangeChange, selectedRange],
    );

    // Close calendar on outside click
    useEffect(() => {
      const handleClickOutside = (e) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target)
        ) {
          setActiveField(null);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearch = () => {
      if (selectedRange?.from && selectedRange?.to) {
        setActiveField(null);
        onSearch(selectedRange);
      }
    };

    const handleClear = () => {
      onRangeChange({ from: undefined, to: undefined });
      setActiveField(null);
      onSearch(null);
    };

    const hasValidRange = selectedRange?.from && selectedRange?.to;

    return (
      <div ref={containerRef} className="relative w-full max-w-3xl mx-auto">
        {/* Search bar container */}
        <div
          className={`flex flex-col sm:flex-row items-stretch sm:items-center rounded-2xl border shadow-lg transition-all duration-300 ${
            activeField
              ? isDarkMode
                ? "border-[#2F5D3A] shadow-[0_8px_32px_rgba(47,93,58,0.2)]"
                : "border-[#2F5D3A] shadow-[0_8px_32px_rgba(47,93,58,0.15)]"
              : isDarkMode
                ? "border-[#2A2119] shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
                : "border-[#DDE8DD] shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
          } ${isDarkMode ? "bg-[#16120F]" : "bg-white"}`}
        >
          {/* Check-in field */}
          <button
            type="button"
            onClick={() =>
              setActiveField(activeField === "checkIn" ? null : "checkIn")
            }
            className={`flex-1 flex flex-col items-start px-6 py-4 rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none transition-colors text-left ${
              activeField === "checkIn"
                ? isDarkMode
                  ? "bg-[#1A2E1A]"
                  : "bg-[#F0F7F0]"
                : "hover:bg-opacity-50"
            }`}
          >
            <span
              className={`text-[10px] font-bold uppercase tracking-[0.15em] ${
                isDarkMode ? "text-[#8A9A8A]" : "text-[#6B7C6B]"
              }`}
            >
              Check-in
            </span>
            <span
              className={`text-sm font-semibold mt-0.5 ${
                selectedRange?.from
                  ? isDarkMode
                    ? "text-[#E0E7EE]"
                    : "text-[#1F2A1F]"
                  : isDarkMode
                    ? "text-[#6A7A6A]"
                    : "text-[#94A394]"
              }`}
            >
              {selectedRange?.from
                ? formatDisplayDate(selectedRange.from)
                : "Select date"}
            </span>
          </button>

          {/* Divider */}
          <div
            className={`hidden sm:block w-px h-10 ${
              isDarkMode ? "bg-[#2A2119]" : "bg-[#DDE8DD]"
            }`}
          />
          <div
            className={`sm:hidden h-px w-full ${
              isDarkMode ? "bg-[#2A2119]" : "bg-[#DDE8DD]"
            }`}
          />

          {/* Check-out field */}
          <button
            type="button"
            onClick={() =>
              setActiveField(activeField === "checkOut" ? null : "checkOut")
            }
            className={`flex-1 flex flex-col items-start px-6 py-4 transition-colors text-left ${
              activeField === "checkOut"
                ? isDarkMode
                  ? "bg-[#1A2E1A]"
                  : "bg-[#F0F7F0]"
                : "hover:bg-opacity-50"
            }`}
          >
            <span
              className={`text-[10px] font-bold uppercase tracking-[0.15em] ${
                isDarkMode ? "text-[#8A9A8A]" : "text-[#6B7C6B]"
              }`}
            >
              Check-out
            </span>
            <span
              className={`text-sm font-semibold mt-0.5 ${
                selectedRange?.to
                  ? isDarkMode
                    ? "text-[#E0E7EE]"
                    : "text-[#1F2A1F]"
                  : isDarkMode
                    ? "text-[#6A7A6A]"
                    : "text-[#94A394]"
              }`}
            >
              {selectedRange?.to
                ? formatDisplayDate(selectedRange.to)
                : "Select date"}
            </span>
          </button>

          {/* Search button */}
          <div className="p-2 sm:pr-2">
            <button
              type="button"
              onClick={handleSearch}
              disabled={!hasValidRange || isLoading}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
                hasValidRange && !isLoading
                  ? isDarkMode
                    ? "bg-[#2F5D3A] text-white hover:bg-[#3A7048] active:scale-[0.97]"
                    : "bg-[#1F3A2A] text-white hover:bg-[#2F5D3A] active:scale-[0.97]"
                  : isDarkMode
                    ? "bg-[#1A1A1A] text-[#555] cursor-not-allowed"
                    : "bg-[#E8EDE8] text-[#AAB5AA] cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
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
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  <span>Searching</span>
                </>
              ) : (
                <>
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <span>Search</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Clear dates link */}
        {hasValidRange && (
          <div className="mt-2 text-center">
            <button
              type="button"
              onClick={handleClear}
              className={`text-xs font-medium underline underline-offset-2 transition-colors ${
                isDarkMode
                  ? "text-[#8A9A8A] hover:text-[#C9D6DF]"
                  : "text-[#6B7C6B] hover:text-[#2F5D3A]"
              }`}
            >
              Clear dates
            </button>
          </div>
        )}

        {/* Calendar dropdown */}
        {activeField && (
          <div
            ref={calendarRef}
            className={`absolute left-1/2 -translate-x-1/2 mt-3 z-50 rounded-2xl border shadow-2xl overflow-hidden ${
              isDarkMode
                ? "bg-[#16120F] border-[#2A2119]"
                : "bg-white border-[#DDE8DD]"
            }`}
            style={{ animation: "calendarSlideIn 0.2s ease-out" }}
          >
            <div className="p-4">
              <DayPicker
                mode="range"
                selected={selectedRange}
                onSelect={handleDayClick}
                numberOfMonths={typeof window !== "undefined" && window.innerWidth >= 640 ? 2 : 1}
                disabled={{ before: today }}
                classNames={{
                  months: "flex gap-4",
                  month_caption: `text-sm font-bold mb-2 ${isDarkMode ? "text-[#E0E7EE]" : "text-[#1F2A1F]"}`,
                  nav: `flex gap-1`,
                  button_previous: `p-1 rounded-lg transition-colors ${isDarkMode ? "hover:bg-[#1A2E1A] text-[#8A9A8A]" : "hover:bg-[#F0F7F0] text-[#6B7C6B]"}`,
                  button_next: `p-1 rounded-lg transition-colors ${isDarkMode ? "hover:bg-[#1A2E1A] text-[#8A9A8A]" : "hover:bg-[#F0F7F0] text-[#6B7C6B]"}`,
                  day_button: `w-10 h-10 rounded-lg text-sm font-medium transition-colors`,
                  selected: `!bg-[#2F5D3A] !text-white rounded-lg`,
                  range_middle: isDarkMode
                    ? `!bg-[#1A2E1A] !text-[#C9D6DF]`
                    : `!bg-[#EAF3EA] !text-[#1F3A2A]`,
                  range_start: `!bg-[#2F5D3A] !text-white !rounded-l-lg`,
                  range_end: `!bg-[#2F5D3A] !text-white !rounded-r-lg`,
                  today: isDarkMode
                    ? `font-bold text-[#6BAF7A]`
                    : `font-bold text-[#2F5D3A]`,
                  disabled: `opacity-30 cursor-not-allowed`,
                }}
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

            <div
              className={`flex items-center justify-between px-5 py-3 border-t text-xs ${
                isDarkMode
                  ? "border-[#2A2119] text-[#8A9A8A]"
                  : "border-[#E8F0E8] text-[#94A394]"
              }`}
            >
              <span>
                {selectedRange?.from && !selectedRange?.to
                  ? "Now select your check-out date"
                  : !selectedRange?.from
                    ? "Select your check-in date"
                    : `${Math.ceil((selectedRange.to - selectedRange.from) / (1000 * 60 * 60 * 24))} night${Math.ceil((selectedRange.to - selectedRange.from) / (1000 * 60 * 60 * 24)) !== 1 ? "s" : ""}`}
              </span>
              <button
                type="button"
                onClick={() => setActiveField(null)}
                className={`font-semibold transition-colors ${
                  isDarkMode ? "text-[#6BAF7A] hover:text-[#8FCF9A]" : "text-[#2F5D3A] hover:text-[#1F3A2A]"
                }`}
              >
                Done
              </button>
            </div>
          </div>
        )}

        {/* Calendar animation styles */}
        <style>{`
          @keyframes calendarSlideIn {
            from { opacity: 0; transform: translateX(-50%) translateY(-8px); }
            to   { opacity: 1; transform: translateX(-50%) translateY(0); }
          }
          .rdp {
            --rdp-cell-size: 40px;
            --rdp-accent-color: #2F5D3A;
            --rdp-background-color: ${isDarkMode ? "#1A2E1A" : "#EAF3EA"};
            margin: 0;
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
          .rdp-head_cell {
            color: ${isDarkMode ? "#8A9A8A" : "#6B7C6B"};
            font-size: 0.7rem;
            font-weight: 600;
            text-transform: uppercase;
          }
          .rdp-caption_label {
            color: ${isDarkMode ? "#E0E7EE" : "#1F2A1F"};
            font-weight: 700;
            font-size: 0.9rem;
          }
          .rdp-nav_button {
            color: ${isDarkMode ? "#8A9A8A" : "#6B7C6B"};
          }
          .rdp-day {
            color: ${isDarkMode ? "#C9D6DF" : "#334155"};
          }
          .rdp-day[disabled] {
            color: ${isDarkMode ? "#3A3A3A" : "#C0C8C0"} !important;
          }
        `}</style>
      </div>
    );
  },
);

DateSearchBar.displayName = "DateSearchBar";

export default DateSearchBar;
