import { useEffect, useMemo, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { FaCalendarCheck, FaExclamationTriangle } from 'react-icons/fa';
import { checkBookingAvailability } from '../services/bookings';
import { getUnavailableDatesBySlug } from '../services/houses';

const parseYMDToLocalDate = (value) => {
  if (!value) return null;

  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return null;
    return new Date(value.getFullYear(), value.getMonth(), value.getDate());
  }

  if (typeof value === 'string') {
    const ymdMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})(?:T.*)?$/);
    if (ymdMatch) {
      const year = Number(ymdMatch[1]);
      const month = Number(ymdMatch[2]) - 1;
      const day = Number(ymdMatch[3]);
      return new Date(year, month, day);
    }
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

const toYMD = (value) => {
  const date = parseYMDToLocalDate(value);
  if (!date) return '';

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const nightsBetween = (from, to) => {
  const start = parseYMDToLocalDate(from);
  const end = parseYMDToLocalDate(to);

  if (!start || !end) return 0;

  const diffMs = end.getTime() - start.getTime();
  const nights = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  return nights > 0 ? nights : 0;
};

const BookingCalendar = ({
  houseSlug,
  packageCode,
  minNights,
  checkIn,
  checkOut,
  onDateChange,
  onAvailabilityChange,
  isDarkMode,
}) => {
  const [range, setRange] = useState({
    from: checkIn ? parseYMDToLocalDate(checkIn) || undefined : undefined,
    to: checkOut ? parseYMDToLocalDate(checkOut) || undefined : undefined,
  });
  const [blockedRanges, setBlockedRanges] = useState([]);
  const [status, setStatus] = useState({
    loadingBlocked: false,
    loadingAvailability: false,
    available: null,
    reason: null,
    error: null,
    nights: 0,
  });

  useEffect(() => {
    setRange({
      from: checkIn ? parseYMDToLocalDate(checkIn) || undefined : undefined,
      to: checkOut ? parseYMDToLocalDate(checkOut) || undefined : undefined,
    });
  }, [checkIn, checkOut]);

  useEffect(() => {
    let mounted = true;

    const loadBlockedDates = async () => {
      if (!houseSlug) {
        setBlockedRanges([]);
        return;
      }

      setStatus((prev) => ({ ...prev, loadingBlocked: true, error: null }));

      try {
        const response = await getUnavailableDatesBySlug(houseSlug);
        const ranges = (response?.blockedRanges || []).map((item) => ({
          from: new Date(item.from),
          to: new Date(item.to),
        }));

        if (!mounted) return;

        setBlockedRanges(ranges);
      } catch (error) {
        if (!mounted) return;
        setBlockedRanges([]);
        setStatus((prev) => ({
          ...prev,
          error: 'Unable to load blocked dates right now. You can still choose dates and try again.',
        }));
      } finally {
        if (mounted) {
          setStatus((prev) => ({ ...prev, loadingBlocked: false }));
        }
      }
    };

    loadBlockedDates();

    return () => {
      mounted = false;
    };
  }, [houseSlug]);

  const disabledDays = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return [{ before: today }, ...blockedRanges];
  }, [blockedRanges]);

  useEffect(() => {
    let mounted = true;

    const from = range?.from;
    const to = range?.to;
    const nights = nightsBetween(from, to);

    onDateChange({
      checkIn: from ? toYMD(from) : '',
      checkOut: to ? toYMD(to) : '',
      nights,
    });

    if (!from || !to) {
      const incomplete = {
        available: null,
        reason: null,
        nights,
        minNightsSatisfied: nights >= (minNights || 1),
      };

      setStatus((prev) => ({ ...prev, available: null, reason: null, nights, loadingAvailability: false }));
      onAvailabilityChange(incomplete);
      return;
    }

    if (nights <= 0) {
      const invalidRange = {
        available: null,
        reason: 'Select a check-out date after check-in (minimum 1 night).',
        nights,
        minNightsSatisfied: false,
      };

      setStatus((prev) => ({
        ...prev,
        loadingAvailability: false,
        available: null,
        reason: invalidRange.reason,
        nights,
        error: null,
      }));

      onAvailabilityChange(invalidRange);
      return;
    }

    const checkAvailability = async () => {
      setStatus((prev) => ({ ...prev, loadingAvailability: true, error: null, nights }));

      try {
        const payload = {
          houseSlug,
          checkIn: toYMD(from),
          checkOut: toYMD(to),
          ...(packageCode ? { packageCode } : {}),
        };

        const response = await checkBookingAvailability(payload);

        if (!mounted) return;

        const nextState = {
          available: Boolean(response?.available),
          reason: response?.reason || null,
          nights: response?.nights ?? nights,
          minNightsSatisfied: (response?.nights ?? nights) >= (minNights || 1),
        };

        setStatus((prev) => ({
          ...prev,
          loadingAvailability: false,
          available: nextState.available,
          reason: nextState.reason,
          nights: nextState.nights,
        }));

        onAvailabilityChange(nextState);
      } catch (error) {
        if (!mounted) return;

        const apiReason =
          error?.payload?.message ||
          error?.message ||
          'Could not verify availability right now. Please try again.';

        const fallback = {
          available: null,
          reason: apiReason,
          nights,
          minNightsSatisfied: nights >= (minNights || 1),
        };

        setStatus((prev) => ({
          ...prev,
          loadingAvailability: false,
          available: null,
          reason: fallback.reason,
          nights,
          error: fallback.reason,
        }));

        onAvailabilityChange(fallback);
      }
    };

    checkAvailability();

    return () => {
      mounted = false;
    };
  }, [range, houseSlug, packageCode, minNights, onDateChange, onAvailabilityChange]);

  const localMinNightsSatisfied = status.nights >= (minNights || 1);

  return (
    <div className="space-y-4">
      <div
        className={`rounded-xl border p-4 ${
          isDarkMode ? 'border-[#1E242B] bg-[#0F1419]' : 'border-[#E2E8F0] bg-white'
        }`}
      >
        <DayPicker
          mode="range"
          selected={range}
          onSelect={(nextRange) => setRange(nextRange || { from: undefined, to: undefined })}
          disabled={disabledDays}
          numberOfMonths={1}
          className="w-full"
        />
      </div>

      <div
        className={`rounded-lg border p-4 text-sm ${
          isDarkMode ? 'border-[#1E242B] bg-[#0F1419] text-[#C4CCD4]' : 'border-[#E2E8F0] bg-[#F8FAFC] text-[#475569]'
        }`}
      >
        <div className="flex items-center gap-2 font-semibold">
          <FaCalendarCheck />
          <span>Nights selected: {status.nights || 0}</span>
        </div>

        <div className="mt-2">
          Min nights for package: {minNights || 1}{' '}
          {localMinNightsSatisfied ? '✓' : `• Select at least ${minNights || 1} night(s)`}
        </div>

        {status.loadingBlocked && <div className="mt-2">Loading blocked dates…</div>}
        {status.loadingAvailability && <div className="mt-2">Checking availability…</div>}

        {!status.loadingAvailability && status.available === true && localMinNightsSatisfied && (
          <div className="mt-3 text-green-500 font-semibold">Available for selected dates.</div>
        )}

        {!status.loadingAvailability && status.available === false && (
          <div className="mt-3 text-red-500 font-semibold flex items-start gap-2">
            <FaExclamationTriangle className="mt-0.5" />
            <span>{status.reason || 'These dates are not available.'}</span>
          </div>
        )}

        {!status.loadingAvailability && status.available === true && !localMinNightsSatisfied && (
          <div className="mt-3 text-amber-500 font-semibold">
            Dates are open, but the selected package requires at least {minNights || 1} night(s).
          </div>
        )}

        {!status.loadingAvailability && status.available === null && status.reason && (
          <div className="mt-3 text-amber-500 font-semibold flex items-start gap-2">
            <FaExclamationTriangle className="mt-0.5" />
            <span>{status.reason}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingCalendar;
