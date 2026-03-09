import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import PageLayout from '../components/layout/PageLayout';
import BookingCalendar from '../components/BookingCalendar';
import SquarePaymentForm from '../components/booking/SquarePaymentForm';
import { contactInfo } from '../data/contactData';
import { getAllStays } from '../data/staysData';
import { useHousesData } from '../hooks/useHousesData';
import { createBookingRequest, pricePreview } from '../services/bookings';
import { getHousePackagesBySlug } from '../services/houses';
import { getWhatsAppLink } from '../utils/helpers';
import { getFAQSchema } from '../utils/structuredData';
import { countWeekdayWeekendNights, getRatePlanBySlug } from '../utils/stayPricing';
import { isSquareConfigured } from '../services/square';
import {
  FaCheckCircle,
  FaLock,
  FaInfoCircle,
  FaWhatsapp
} from 'react-icons/fa';

const PAYMENTS_ENABLED = import.meta.env.VITE_ENABLE_PAYMENTS === 'true';

const BookNow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const phoneContact = contactInfo.find((item) => item.iconKey === 'phone');
  const whatsappLink = getWhatsAppLink(phoneContact?.details);
  const { houses } = useHousesData({ fallbackData: getAllStays() });

  // Get stay data from navigation state or default
  const packageData = location.state?.packageData || {
    title: 'Stay Request',
    price: 0,
    duration: 'Flexible dates',
    currency: 'USD'
  };

  const prefilledDates = useMemo(() => {
    const checkIn = packageData?.prefillDates?.checkIn || location.state?.prefillDates?.checkIn;
    const checkOut = packageData?.prefillDates?.checkOut || location.state?.prefillDates?.checkOut;

    if (!checkIn || !checkOut) return null;

    const ymdRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!ymdRegex.test(checkIn) || !ymdRegex.test(checkOut)) return null;

    return { checkIn, checkOut };
  }, [
    packageData?.prefillDates?.checkIn,
    packageData?.prefillDates?.checkOut,
    location.state?.prefillDates?.checkIn,
    location.state?.prefillDates?.checkOut,
  ]);

  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    // Guest Information
    fullName: '',
    email: '',
    phone: '',
    countryCode: '+1',
    country: '',
    // Stay Details
    adults: '1',
    children: '0',
    checkIn: prefilledDates?.checkIn || '',
    checkOut: prefilledDates?.checkOut || '',
    pets: 'no',
    specialRequests: '',

    // Add-ons
    addOns: [],

    // Confirmation
    agreeToTerms: false
  });

  const ADD_ON_OPTIONS = [
    { value: 'horse-riding', label: 'Horseback Riding', price: 150 },
  ];
  const CLEANING_FEE = 50;
  const TAX_RATE = 0.06;
  const CANCELLATION_POLICY = '100% refund up to 30 days before arrival, 50% refund up to 14 days before arrival';

  const ADD_ON_PRICE_MAP = ADD_ON_OPTIONS.reduce((acc, option) => {
    acc[option.value] = option.price;
    return acc;
  }, {});

  const [livePricing, setLivePricing] = useState(null);

  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState('');
  const [depositPaid, setDepositPaid] = useState(false);
  const [depositError, setDepositError] = useState('');
  const [submissionState, setSubmissionState] = useState({
    loading: false,
    error: '',
  });
  const [toast, setToast] = useState({
    visible: false,
    type: 'error',
    message: '',
  });
  const [calendarStatus, setCalendarStatus] = useState({
    available: null,
    reason: null,
    nights: 0,
    minNightsSatisfied: true,
  });
  const [calendarMeta, setCalendarMeta] = useState({
    loading: false,
    packageCode: 'standard',
    minNights: 1,
    pricePerNight: Number(packageData?.price) || 0,
  });

  const showToast = useCallback((type, message) => {
    setToast({ visible: true, type, message });
  }, []);

  useEffect(() => {
    if (!toast.visible) return undefined;

    const timeout = setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 4200);

    return () => clearTimeout(timeout);
  }, [toast.visible]);

  useEffect(() => {
    if (!prefilledDates) return;

    setBookingData((prev) => ({
      ...prev,
      checkIn: prefilledDates.checkIn,
      checkOut: prefilledDates.checkOut,
    }));
  }, [prefilledDates]);

  const stayFromTitle = useMemo(() => {
    if (!packageData?.title) return null;
    return houses.find((item) => item.name === packageData.title) || null;
  }, [houses, packageData?.title]);

  const houseSlug = useMemo(() => {
    if (packageData?.source?.startsWith('stay-')) {
      return packageData.source.replace('stay-', '');
    }

    if (packageData?.slug) {
      return packageData.slug;
    }

    return stayFromTitle?.slug || '';
  }, [packageData?.source, packageData?.slug, stayFromTitle?.slug]);

  const resolvedPackageCode = useMemo(() => {
    const explicitCode = packageData?.packageCode;

    if (explicitCode && ['standard', 'signature', 'extended'].includes(explicitCode)) {
      return explicitCode;
    }

    const stayType = `${packageData?.stayType || ''}`.toLowerCase();

    if (stayType.includes('signature')) return 'signature';
    if (stayType.includes('extended')) return 'extended';
    if (stayType.includes('standard')) return 'standard';

    return 'standard';
  }, [packageData?.packageCode, packageData?.stayType]);

  useEffect(() => {
    let mounted = true;

    const syncPackageMeta = async () => {
      if (!houseSlug) {
        setCalendarMeta({
          loading: false,
          packageCode: resolvedPackageCode,
          minNights: 1,
          pricePerNight: Number(packageData?.price) || 0,
        });
        return;
      }

      setCalendarMeta((prev) => ({ ...prev, loading: true, packageCode: resolvedPackageCode }));

      try {
        const response = await getHousePackagesBySlug(houseSlug);
        const packages = response?.data || [];
        const matchedPackage = packages.find((pkg) => pkg.code === resolvedPackageCode);

        if (!mounted) return;

        setCalendarMeta({
          loading: false,
          packageCode: resolvedPackageCode,
          minNights: matchedPackage?.minNights || 1,
          pricePerNight: Number(matchedPackage?.pricePerNight) || Number(packageData?.price) || 0,
        });
      } catch (_error) {
        if (!mounted) return;

        setCalendarMeta({
          loading: false,
          packageCode: resolvedPackageCode,
          minNights: 1,
          pricePerNight: Number(packageData?.price) || 0,
        });
        showToast('error', 'Could not load live package rates. Using fallback values for now.');
      }
    };

    syncPackageMeta();

    return () => {
      mounted = false;
    };
  }, [houseSlug, packageData?.price, resolvedPackageCode, showToast]);

  useEffect(() => {
    let mounted = true;

    const fetchPreview = async () => {
      if (!houseSlug || !bookingData.checkIn || !bookingData.checkOut) {
        setLivePricing(null);
        return;
      }

      try {
        const payload = {
          houseSlug: houseSlug,
          checkIn: bookingData.checkIn,
          checkOut: bookingData.checkOut,
          addOns: bookingData.addOns,
        };

        const res = await pricePreview(payload);
        if (!mounted) return;
        if (res && res.pricing) setLivePricing(res.pricing);
      } catch (err) {
        setLivePricing(null);
      }
    };

    fetchPreview();

    return () => {
      mounted = false;
    };
  }, [houseSlug, bookingData.checkIn, bookingData.checkOut, bookingData.addOns]);


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (submissionState.error) {
      setSubmissionState((prev) => ({ ...prev, error: '' }));
    }
    setBookingData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const toggleAddOn = (value) => {
    setBookingData(prev => ({
      ...prev,
      addOns: prev.addOns.includes(value)
        ? prev.addOns.filter(item => item !== value)
        : [...prev.addOns, value]
    }));
  };

  const parseYMDToLocalDate = (value) => {
    if (!value || typeof value !== 'string') return null;

    const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) return null;

    const year = Number(match[1]);
    const month = Number(match[2]) - 1;
    const day = Number(match[3]);

    return new Date(year, month, day);
  };

  const getNights = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0;
    const start = parseYMDToLocalDate(bookingData.checkIn);
    const end = parseYMDToLocalDate(bookingData.checkOut);
    if (!start || !end) return 0;
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const selectedNights = calendarStatus.nights || getNights();
  const totalGuests = Number(bookingData.adults) + Number(bookingData.children);
  const ratePlan = getRatePlanBySlug(houseSlug || '');
  const nightSplit = countWeekdayWeekendNights(bookingData.checkIn, bookingData.checkOut);
  // Prefer live pricing preview from server when available
  const estimatedSubtotal = livePricing ? livePricing.subtotal : Number((calendarMeta.pricePerNight * selectedNights).toFixed(2));
  const selectedAddOnTotal = livePricing
    ? livePricing.addOnsFee
    : Number(
        bookingData.addOns.reduce((sum, option) => sum + (ADD_ON_PRICE_MAP[option] || 0), 0).toFixed(2)
      );
  const estimatedCleaningFee = livePricing ? livePricing.cleaningFee : CLEANING_FEE;
  const estimatedTax = livePricing
    ? livePricing.tax
    : Number(((estimatedSubtotal + selectedAddOnTotal + estimatedCleaningFee) * TAX_RATE).toFixed(2));
  const estimatedTotal = livePricing
    ? livePricing.total
    : Number((estimatedSubtotal + selectedAddOnTotal + estimatedCleaningFee + estimatedTax).toFixed(2));

  const nightlyBreakdownLabel = useMemo(() => {
    const weekdayNights = livePricing?.weekdayNights ?? nightSplit.weekdayNights;
    const weekendNights = livePricing?.weekendNights ?? nightSplit.weekendNights;

    if (!ratePlan) {
      return `$${Number(calendarMeta.pricePerNight || 0).toFixed(2)} × ${selectedNights || 0} night(s)`;
    }

    const parts = [];
    if (weekdayNights > 0) parts.push(`${weekdayNights} weekday × $${ratePlan.weekday}`);
    if (weekendNights > 0) parts.push(`${weekendNights} weekend × $${ratePlan.weekend}`);

    return parts.length ? parts.join(' + ') : `0 night(s)`;
  }, [livePricing?.weekdayNights, livePricing?.weekendNights, nightSplit.weekdayNights, nightSplit.weekendNights, ratePlan, calendarMeta.pricePerNight, selectedNights]);

  const canContinueStep1 =
    Boolean(bookingData.checkIn && bookingData.checkOut) &&
    calendarStatus.available === true &&
    calendarStatus.minNightsSatisfied;

  const handleCalendarDateChange = useCallback(({ checkIn, checkOut }) => {
    setBookingData((prev) => ({
      ...prev,
      checkIn,
      checkOut,
    }));
  }, []);

  const handleAvailabilityChange = useCallback((nextStatus) => {
    setCalendarStatus(nextStatus);
  }, []);

  const handleNextStep = (e) => {
    e.preventDefault();

    if (step === 1 && !canContinueStep1) {
      return;
    }

    if (step < 3) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submissionState.loading) {
      return;
    }

    setSubmissionState({ loading: true, error: '' });

    try {
      if (houseSlug) {
        const payload = {
          houseSlug,
          packageCode: calendarMeta.packageCode,
          guest: {
            name: bookingData.fullName,
            email: bookingData.email,
            phone: `${bookingData.countryCode}${bookingData.phone}`,
            country: bookingData.country,
          },
          stay: {
            checkIn: bookingData.checkIn,
            checkOut: bookingData.checkOut,
            guests: totalGuests,
          },
          preferences: {
            addOns: bookingData.addOns,
            notes: [
              bookingData.specialRequests,
              bookingData.pets === 'yes' ? 'Bringing pets: Yes' : '',
            ]
              .filter(Boolean)
              .join(' | '),
          },
          pricing: {
            subtotal: estimatedSubtotal,
            addOnsFee: selectedAddOnTotal,
            cleaningFee: estimatedCleaningFee,
            tax: estimatedTax,
            taxRate: TAX_RATE,
            cancellationPolicy: CANCELLATION_POLICY,
            total: estimatedTotal,
          },
        };

        const response = await createBookingRequest(payload);
        setConfirmedBookingId(response?.bookingId || response?.summary?.bookingId || '');
      } else {
        setConfirmedBookingId('');
      }

      setBookingConfirmed(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      setSubmissionState({
        loading: false,
        error:
          error?.message ||
          'Unable to submit your request right now. Please review details and try again.',
      });
      showToast('error', error?.message || 'Booking request failed. Please try again.');
      return;
    }

    setSubmissionState({ loading: false, error: '' });
    showToast('success', 'Booking request submitted successfully.');
  };

  const countryCodes = [
    { code: '+1', country: 'USA/Canada' },
    { code: '+44', country: 'UK' },
    { code: '+61', country: 'Australia' },
    { code: '+971', country: 'UAE' },
    { code: '+86', country: 'China' },
    { code: '+81', country: 'Japan' },
    { code: '+82', country: 'South Korea' },
    { code: '+65', country: 'Singapore' },
    { code: '+49', country: 'Germany' },
    { code: '+33', country: 'France' },
    { code: '+52', country: 'Mexico' }
  ];

  const progressSteps = [
    { number: 1, title: 'Guest Info' },
    { number: 2, title: 'Stay Details' },
    { number: 3, title: 'Review' }
  ];

  const bookingStructuredData = useMemo(
    () => ([
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Request Availability | The Tiny Escape',
        description:
          'Request dates for Tiny Escape stays in Texas with transparent pricing and quick confirmation.',
        url: 'https://tinyescape.vercel.app/book-now',
      },
      getFAQSchema([
        {
          question: 'When will I receive confirmation?',
          answer: 'Most requests receive a response within 24 hours after availability review.',
        },
        {
          question: 'Is payment required immediately?',
          answer: 'No. Availability and final pricing are confirmed first before any payment steps.',
        },
      ]),
    ]),
    []
  );

  const fieldBaseClass = `w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 ${
    isDarkMode
      ? 'bg-[#17120D] border-[#2A2119] text-[#E9E2D7] placeholder-[#9E907F] focus:ring-[#C9A36A]/40 focus:border-[#C9A36A]'
      : 'bg-[#FFFDF8] border-[#D6C7B3] text-[#2E2117] placeholder-[#7A6A57] focus:ring-[#2F5D3A]/25 focus:border-[#5F8C6A]'
  }`;

  const selectBaseClass = `w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 ${
    isDarkMode
      ? 'bg-[#17120D] border-[#2A2119] text-[#E9E2D7] focus:ring-[#C9A36A]/40 focus:border-[#C9A36A]'
      : 'bg-[#FFFDF8] border-[#D6C7B3] text-[#2E2117] focus:ring-[#2F5D3A]/25 focus:border-[#5F8C6A]'
  }`;

  const sectionTitleClass = isDarkMode ? 'text-[#F2EEE7]' : 'text-[#2E2117]';
  const labelClass = isDarkMode ? 'text-[#D6C8B8]' : 'text-[#4A3A2B]';
  const mutedTextClass = isDarkMode ? 'text-[#A99985]' : 'text-[#6B5B4B]';

  if (bookingConfirmed) {
    return (
      <PageLayout
        seo={{
          title: 'Request Received - Tiny Escape',
          description: 'Your stay request has been received',
          url: '/book-now',
          structuredData: bookingStructuredData,
        }}
      >
        <div className={`min-h-screen transition-colors duration-500 ${
          isDarkMode ? 'bg-linear-to-b from-[#0B0C0E] to-[#0F1419] text-[#E0E7EE]' : 'bg-linear-to-b from-white to-[#F8FAFB] text-[#0F172A]'
        }`}>
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-2xl mx-auto text-center">
              <div className="mb-8">
                <FaCheckCircle className="text-8xl text-green-500 mx-auto mb-6" />
                <h1 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-[#E0E7EE]' : 'text-[#0F172A]'}`}>
                  Request Received!
                </h1>
                <p className={`text-xl mb-6 ${isDarkMode ? 'text-[#C4CCD4]' : 'text-[#374151]'}`}>
                  Thank you for choosing Tiny Escape
                </p>
                {confirmedBookingId && (
                  <p className={`text-sm font-semibold ${isDarkMode ? 'text-[#22D3EE]' : 'text-[#2563EB]'}`}>
                    Booking ID: {confirmedBookingId}
                  </p>
                )}
              </div>

              <div className={`p-8 rounded-xl ${isDarkMode ? 'bg-[#141A1F]' : 'bg-white border border-[#E2E8F0]'} ${
                isDarkMode
                  ? 'shadow-[0_10px_24px_-18px_rgba(0,0,0,0.7)]'
                  : 'shadow-[0_10px_24px_-18px_rgba(15,23,42,0.18)]'
              } mb-8`}>
                <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-[#E0E7EE]' : 'text-[#0F172A]'}`}>
                  What Happens Next
                </h2>
                <div className={`text-left space-y-4 ${isDarkMode ? 'text-[#C4CCD4]' : 'text-[#374151]'}`}>
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="text-green-500 mt-1 shrink-0" />
                    <p>We review availability and match your dates with the best stay</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="text-green-500 mt-1 shrink-0" />
                    <p>You will receive a reply within 24 hours with options and pricing</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="text-green-500 mt-1 shrink-0" />
                    <p>We confirm your stay once you approve the final details</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="text-green-500 mt-1 shrink-0" />
                    <p>Check-in instructions are sent 48 hours before arrival</p>
                  </div>
                </div>

                <div className={`mt-6 p-4 rounded-lg ${isDarkMode ? 'bg-[#0F1419]' : 'bg-[#F8FAFC]'} `}>
                  <p className={`font-semibold mb-2 ${isDarkMode ? 'text-[#E0E7EE]' : 'text-[#0F172A]'}`}>
                    Need help right away?
                  </p>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 transition-colors"
                  >
                    <FaWhatsapp />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* ── Square Deposit Payment (enabled when VITE_ENABLE_PAYMENTS=true) ── */}
              {PAYMENTS_ENABLED && !depositPaid && (
                <div className={`p-8 rounded-xl mb-8 text-left ${
                  isDarkMode ? 'bg-[#141A1F]' : 'bg-white border border-[#E2E8F0]'
                } shadow-[0_10px_24px_-18px_rgba(0,0,0,0.12)]`}>
                  <h2 className={`text-xl font-bold mb-1 ${isDarkMode ? 'text-[#E0E7EE]' : 'text-[#0F172A]'}`}>
                    Secure your booking with a deposit
                  </h2>
                  <p className={`text-sm mb-5 ${isDarkMode ? 'text-[#8A9BAC]' : 'text-[#64748B]'}`}>
                    A refundable deposit holds your dates while we confirm availability.
                  </p>
                  {depositError && (
                    <p className="mb-4 text-sm text-red-500">{depositError}</p>
                  )}
                  <SquarePaymentForm
                    isDarkMode={isDarkMode}
                    amount={10000}
                    currency="USD"
                    label="Pay $100 Deposit"
                    onToken={(nonce) => {
                      // Send nonce to backend → POST /api/payments/deposit
                      // with { nonce, bookingId: confirmedBookingId, amount: 10000 }
                      console.log('Square deposit nonce:', nonce);
                      setDepositPaid(true);
                      setDepositError('');
                    }}
                    onError={(msg) => setDepositError(msg)}
                  />
                </div>
              )}

              {depositPaid && (
                <div className={`flex items-center gap-3 p-5 rounded-xl mb-8 ${
                  isDarkMode ? 'bg-[#1A2E1A]' : 'bg-[#EAF3EA]'
                }`}>
                  <FaCheckCircle className="text-[#2F5D3A] h-5 w-5 shrink-0" />
                  <p className={`text-sm font-semibold ${isDarkMode ? 'text-[#6BAF7A]' : 'text-[#1F3A2A]'}`}>
                    Deposit received — your booking is being confirmed!
                  </p>
                </div>
              )}

              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => navigate('/')}
                  className={`px-8 py-4 rounded-lg font-bold transition-all duration-300 ${
                    isDarkMode
                      ? 'bg-linear-to-r from-[#C9A36A] to-[#E7CFA2] text-[#0F0D0A] hover:shadow-lg hover:shadow-[#C9A36A]/35'
                      : 'bg-linear-to-r from-[#2F5D3A] to-[#5F8C6A] text-white hover:shadow-lg hover:shadow-[#2F5D3A]/35'
                  } transform hover:scale-105`}
                >
                  Back to Home
                </button>
                <button
                  onClick={() => navigate('/tours')}
                  className={`px-8 py-4 rounded-lg font-bold transition-all duration-300 border-2 ${
                    isDarkMode
                      ? 'border-[#C9A36A] text-[#E7CFA2] hover:bg-[#C9A36A] hover:text-[#0F0D0A]'
                      : 'border-[#2F5D3A] text-[#2F5D3A] hover:bg-[#2F5D3A] hover:text-white'
                  }`}
                >
                  Explore Stays
                </button>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      seo={{
        title: 'Request Availability | The Tiny Escape',
        description: 'Request availability for Tiny Escape stays in Texas Hill Country. Clear pricing, fast confirmation, and a secure booking inquiry flow.',
        keywords: 'Tiny Escape booking, stay availability, Texas Hill Country lodging, tiny home reservation request',
        url: '/book-now',
        structuredData: bookingStructuredData,
      }}
    >

        {toast.visible && (
          <div className="fixed top-24 right-4 z-[60] max-w-sm">
            <div
              className={`px-4 py-3 rounded-lg border shadow-lg text-sm font-medium ${
                toast.type === 'success'
                  ? 'bg-green-50 border-green-200 text-green-700'
                  : 'bg-red-50 border-red-200 text-red-700'
              }`}
            >
              {toast.message}
            </div>
          </div>
        )}

        {/* Hero */}
        <section className={`relative py-12 border-b ${isDarkMode ? 'bg-linear-to-br from-[#0F0D0A] via-[#171310] to-[#0F0D0A] border-[#2A2119]' : 'bg-linear-to-br from-[#FFF9F1] via-[#F5F0E6] to-[#FFF9F1] border-[#E6D7C3]'}`}>
          <div className="container mx-auto px-4">
            <h1 className={`text-3xl md:text-4xl font-bold mb-4 text-center ${
              isDarkMode ? 'bg-linear-to-r from-[#C9A36A] to-[#E7CFA2]' : 'bg-linear-to-r from-[#2F5D3A] to-[#7BAF7C]'
            } bg-clip-text text-transparent`}>
              Request Availability
            </h1>
            <p className={`text-center font-medium ${mutedTextClass}`}>
              {packageData.title}
            </p>
          </div>
        </section>

        {/* Progress Bar */}
        <div className={`py-4 backdrop-blur-lg border-b ${isDarkMode ? 'bg-[#14110E]/95 border-[#2A2119]' : 'bg-[#FFFCF7]/95 border-[#E6D7C3]'}`}>
          <div className="container mx-auto px-4">
            <div className={`text-center text-sm mb-3 font-semibold ${mutedTextClass}`}>
              Step {step} of {progressSteps.length} • {progressSteps.find((item) => item.number === step)?.title}
            </div>
            <div className="flex justify-between items-center max-w-4xl mx-auto">
              {progressSteps.map((item, idx) => (
                <div key={item.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                      step >= item.number
                        ? isDarkMode
                          ? 'bg-linear-to-r from-[#C9A36A] to-[#E7CFA2] text-[#0F0D0A] ring-2 ring-[#C9A36A]/30'
                          : 'bg-linear-to-r from-[#2F5D3A] to-[#7BAF7C] text-white ring-2 ring-[#7BAF7C]/40'
                        : isDarkMode
                        ? 'bg-[#201A15] text-[#8E7D68]'
                        : 'bg-[#F8F2E8] text-[#9B8A75]'
                    }`}>
                      {item.number}
                    </div>
                    <span className={`mt-2 text-xs hidden md:block ${
                      step >= item.number
                        ? isDarkMode ? 'text-[#E7CFA2]' : 'text-[#2F5D3A]'
                      : mutedTextClass
                    }`}>
                      {item.title}
                    </span>
                  </div>
                  {idx < progressSteps.length - 1 && (
                    <div className={`h-1 flex-1 mx-2 ${
                      step > item.number
                        ? isDarkMode ? 'bg-[#C9A36A]' : 'bg-[#5F8C6A]'
                      : isDarkMode ? 'bg-[#2A2119]' : 'bg-[#E6D7C3]'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Form Column */}
              <div className="lg:col-span-2">
                <form onSubmit={step === 3 ? handleSubmit : handleNextStep}>
                  <div className={`p-8 rounded-2xl ${isDarkMode ? 'bg-[#141A1F]' : 'bg-white border border-[#E2E8F0]'} ${
                    isDarkMode
                      ? 'shadow-[0_10px_24px_-18px_rgba(0,0,0,0.7)]'
                      : 'shadow-[0_10px_24px_-18px_rgba(15,23,42,0.18)]'
                  }`}>
                    
                    {/* Step 1: Guest Information */}
                    {step === 1 && (
                      <div className="space-y-6">
                        <h2 className={`text-2xl font-bold mb-6 ${sectionTitleClass}`}>
                          Guest Information
                        </h2>

                        <div>
                          <label className={`block mb-2 font-semibold ${labelClass}`}>
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={bookingData.fullName}
                            onChange={handleInputChange}
                            required
                            placeholder="John Smith"
                            className={fieldBaseClass}
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className={`block mb-2 font-semibold ${labelClass}`}>
                              Email Address *
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={bookingData.email}
                              onChange={handleInputChange}
                              required
                              placeholder="john@example.com"
                              className={fieldBaseClass}
                            />
                          </div>

                          <div>
                            <label className={`block mb-2 font-semibold ${labelClass}`}>
                              Phone Number *
                            </label>
                            <div className="flex gap-2">
                              <select
                                name="countryCode"
                                value={bookingData.countryCode}
                                onChange={handleInputChange}
                                className={`w-24 px-3 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                                  isDarkMode
                                    ? 'bg-[#17120D] border-[#2A2119] text-[#E9E2D7] focus:ring-[#C9A36A]/40 focus:border-[#C9A36A]'
                                    : 'bg-[#FFFDF8] border-[#D6C7B3] text-[#2E2117] focus:ring-[#2F5D3A]/25 focus:border-[#5F8C6A]'
                                }`}
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
                                value={bookingData.phone}
                                onChange={handleInputChange}
                                required
                                placeholder="1234567890"
                                className={`flex-1 ${fieldBaseClass}`}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className={`block mb-2 font-semibold ${labelClass}`}>
                              Country of Residence *
                            </label>
                            <input
                              type="text"
                              name="country"
                              value={bookingData.country}
                              onChange={handleInputChange}
                              required
                              placeholder="United States"
                              className={fieldBaseClass}
                            />
                          </div>

                        </div>

                        <div>
                          <label className={`block mb-2 font-semibold ${labelClass}`}>
                            Select Your Dates *
                          </label>
                          <BookingCalendar
                            houseSlug={houseSlug}
                            packageCode={calendarMeta.packageCode}
                            minNights={calendarMeta.minNights}
                            checkIn={bookingData.checkIn}
                            checkOut={bookingData.checkOut}
                            onDateChange={handleCalendarDateChange}
                            onAvailabilityChange={handleAvailabilityChange}
                            isDarkMode={isDarkMode}
                          />
                          {calendarMeta.loading && (
                            <p className={`text-sm mt-2 ${mutedTextClass}`}>
                              Loading package rules…
                            </p>
                          )}
                          {!houseSlug && (
                            <p className={`text-sm mt-2 ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`}>
                              House slug is missing in this request context. Date blocking may be limited.
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Step 2: Stay Details */}
                    {step === 2 && (
                      <div className="space-y-6">
                        <h2 className={`text-2xl font-bold mb-6 ${sectionTitleClass}`}>
                          Stay Details
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className={`block mb-2 font-semibold ${labelClass}`}>
                              Number of Adults *
                            </label>
                            <select
                              name="adults"
                              value={bookingData.adults}
                              onChange={handleInputChange}
                              required
                              className={selectBaseClass}
                            >
                              {[1, 2, 3, 4].map(num => (
                                <option key={num} value={num}>{num}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className={`block mb-2 font-semibold ${labelClass}`}>
                              Number of Children (Under 12)
                            </label>
                            <select
                              name="children"
                              value={bookingData.children}
                              onChange={handleInputChange}
                              className={selectBaseClass}
                            >
                              {[0, 1, 2, 3].map(num => (
                                <option key={num} value={num}>{num}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className={`block mb-2 font-semibold ${labelClass}`}>
                            Bringing Pets?
                          </label>
                          <select
                            name="pets"
                            value={bookingData.pets}
                            onChange={handleInputChange}
                            className={selectBaseClass}
                          >
                            <option value="no">No</option>
                            <option value="yes">Yes</option>
                          </select>
                        </div>

                        <div>
                          <label className={`block mb-3 font-semibold ${labelClass}`}>
                            Add-ons
                          </label>
                          <div className="grid md:grid-cols-2 gap-4">
                            {ADD_ON_OPTIONS.map((option) => (
                              <label
                                key={option.value}
                                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                  bookingData.addOns.includes(option.value)
                                    ? isDarkMode
                                      ? 'border-[#C9A36A] bg-[#C9A36A]/10'
                                      : 'border-[#2F5D3A] bg-[#ECF7ED]'
                                    : isDarkMode
                                    ? 'border-[#2A2119] hover:border-[#C9A36A]/50'
                                    : 'border-[#E2E8F0] hover:border-[#86B992]'
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={bookingData.addOns.includes(option.value)}
                                  onChange={() => toggleAddOn(option.value)}
                                  className="mr-3"
                                />
                                <span className={`font-semibold ${isDarkMode ? 'text-[#E0E7EE]' : 'text-[#0F172A]'}`}>
                                  {option.label}
                                </span>
                                <span className={`ml-2 text-sm font-medium ${isDarkMode ? 'text-[#C9A36A]' : 'text-[#2F5D3A]'}`}>
                                  +${option.price}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className={`block mb-2 font-semibold ${labelClass}`}>
                            Special Requests or Notes
                          </label>
                          <textarea
                            name="specialRequests"
                            value={bookingData.specialRequests}
                            onChange={handleInputChange}
                            rows="4"
                            placeholder="Accessibility, celebrations, arrival timing, or anything else to know..."
                            className={fieldBaseClass}
                          ></textarea>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Review */}
                    {step === 3 && (
                      <div className="space-y-6">
                        <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-[#E0E7EE]' : 'text-[#0F172A]'}`}>
                          Review and Submit
                        </h2>

                        <div className={`p-4 rounded-lg ${
                          isDarkMode
                            ? 'bg-[#1D3A28] border border-[#2A5B3F]'
                            : 'bg-[#ECF7ED] border border-[#86B992]'
                        } `}>
                          <div className="flex items-start gap-3">
                            <FaInfoCircle className={isDarkMode ? 'text-[#9AD7A2] mt-1' : 'text-[#2F5D3A] mt-1'} />
                            <div className={`text-sm ${isDarkMode ? 'text-[#E8F5E9]' : 'text-[#1F3A29]'}`}>
                              <p className="font-semibold mb-1">Request Review:</p>
                              <p>We will confirm availability and send final details before any payment is required.</p>
                            </div>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-[#0F1419]' : 'bg-[#F8FAFC]'} `}>
                            <div className={`text-xs uppercase tracking-wider ${isDarkMode ? 'text-[#8B949E]' : 'text-[#64748B]'}`}>Dates</div>
                            <div className={`font-semibold ${isDarkMode ? 'text-[#E0E7EE]' : 'text-[#0F172A]'}`}>
                              {bookingData.checkIn || 'TBD'} to {bookingData.checkOut || 'TBD'}
                            </div>
                          </div>
                          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-[#0F1419]' : 'bg-[#F8FAFC]'} `}>
                            <div className={`text-xs uppercase tracking-wider ${isDarkMode ? 'text-[#8B949E]' : 'text-[#64748B]'}`}>Guests</div>
                            <div className={`font-semibold ${isDarkMode ? 'text-[#E0E7EE]' : 'text-[#0F172A]'}`}>
                              {totalGuests} guests
                            </div>
                          </div>
                          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-[#0F1419]' : 'bg-[#F8FAFC]'} `}>
                            <div className={`text-xs uppercase tracking-wider ${isDarkMode ? 'text-[#8B949E]' : 'text-[#64748B]'}`}>Nights</div>
                            <div className={`font-semibold ${isDarkMode ? 'text-[#E0E7EE]' : 'text-[#0F172A]'}`}>
                              {selectedNights || 'TBD'}
                            </div>
                          </div>
                          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-[#0F1419]' : 'bg-[#F8FAFC]'} `}>
                            <div className={`text-xs uppercase tracking-wider ${isDarkMode ? 'text-[#8B949E]' : 'text-[#64748B]'}`}>Estimated Total</div>
                            <div className={`font-semibold ${isDarkMode ? 'text-[#E0E7EE]' : 'text-[#0F172A]'}`}>
                              ${estimatedTotal.toFixed(2)}
                            </div>
                          </div>
                        </div>

                        {bookingData.addOns.length > 0 && (
                          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-[#0F1419]' : 'bg-[#F8FAFC]'}`}>
                            <div className={`text-xs uppercase tracking-wider mb-2 ${isDarkMode ? 'text-[#8B949E]' : 'text-[#64748B]'}`}>
                              Selected Add-ons (Applied to Checkout)
                            </div>
                            <div className="space-y-2">
                              {bookingData.addOns.map((addOn) => {
                                const option = ADD_ON_OPTIONS.find((item) => item.value === addOn);
                                if (!option) return null;
                                return (
                                  <div key={option.value} className="flex items-center justify-between">
                                    <span className={isDarkMode ? 'text-[#C4CCD4]' : 'text-[#475569]'}>{option.label}</span>
                                    <span className={`font-semibold ${isDarkMode ? 'text-[#E0E7EE]' : 'text-[#0F172A]'}`}>
                                      +${option.price.toFixed(2)}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        <div className={`p-4 rounded-lg border ${isDarkMode ? 'bg-[#0F1419] border-[#1E242B]' : 'bg-[#F8FAFC] border-[#E2E8F0]'}`}>
                          <div className={`text-xs uppercase tracking-wider mb-3 ${isDarkMode ? 'text-[#8B949E]' : 'text-[#64748B]'}`}>
                            Checkout Breakdown
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                              <span className={isDarkMode ? 'text-[#C4CCD4]' : 'text-[#475569]'}>
                                {nightlyBreakdownLabel}
                              </span>
                              <span className={isDarkMode ? 'text-[#E0E7EE]' : 'text-[#0F172A]'}>${estimatedSubtotal.toFixed(2)}</span>
                            </div>
                            {bookingData.addOns.map((addOn) => {
                              const option = ADD_ON_OPTIONS.find((item) => item.value === addOn);
                              if (!option) return null;
                              return (
                                <div key={`checkout-${option.value}`} className="flex items-center justify-between">
                                  <span className={isDarkMode ? 'text-[#C4CCD4]' : 'text-[#475569]'}>
                                    {option.label}
                                  </span>
                                  <span className={isDarkMode ? 'text-[#E0E7EE]' : 'text-[#0F172A]'}>
                                    +${option.price.toFixed(2)}
                                  </span>
                                </div>
                              );
                            })}
                            <div className="flex items-center justify-between">
                              <span className={isDarkMode ? 'text-[#C4CCD4]' : 'text-[#475569]'}>State Tax (6%)</span>
                              <span className={isDarkMode ? 'text-[#E0E7EE]' : 'text-[#0F172A]'}>+${estimatedTax.toFixed(2)}</span>
                            </div>
                            <div className={`pt-2 mt-2 border-t flex items-center justify-between font-bold ${isDarkMode ? 'border-[#1E242B] text-[#E0E7EE]' : 'border-[#E2E8F0] text-[#0F172A]'}`}>
                              <span>Estimated Total</span>
                              <span>${estimatedTotal.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>

                        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-[#0F1419]' : 'bg-[#F8FAFC]'}`}>
                          <div className={`text-xs uppercase tracking-wider mb-2 ${isDarkMode ? 'text-[#8B949E]' : 'text-[#64748B]'}`}>
                            Pricing Notes
                          </div>
                          <div className={`text-sm space-y-1 ${isDarkMode ? 'text-[#C4CCD4]' : 'text-[#475569]'}`}>
                            {ratePlan && <p>{ratePlan.label}: Weekday ${ratePlan.weekday}, Weekend (Fri-Sat) ${ratePlan.weekend}</p>}
                            <p>Horseback add-on (for 2): $150</p>
                            <p>Cleaning fee: $50</p>
                            <p>State Tax: 6%</p>
                            <p>Cancellation: {CANCELLATION_POLICY}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            name="agreeToTerms"
                            checked={bookingData.agreeToTerms}
                            onChange={handleInputChange}
                            required
                            className="mt-1 w-5 h-5"
                          />
                          <label className={`text-sm ${isDarkMode ? 'text-[#C4CCD4]' : 'text-[#475569]'}`}>
                            I agree to the <a href="/terms-conditions" className={isDarkMode ? 'text-[#22D3EE]' : 'text-[#2563EB]'}>Terms & Conditions</a> and <a href="/privacy-policy" className={isDarkMode ? 'text-[#22D3EE]' : 'text-[#2563EB]'}>Privacy Policy</a>
                          </label>
                        </div>
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className={`sticky bottom-0 z-20 -mx-8 mt-8 px-8 py-4 border-t ${
                      isDarkMode ? 'border-[#2A2119] bg-[#14110E]/95' : 'border-[#E6D7C3] bg-[#FFFCF7]/95'
                    } backdrop-blur-lg`}>
                      <div className="flex gap-4">
                      {step > 1 && (
                        <button
                          type="button"
                          onClick={handlePreviousStep}
                          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                            isDarkMode
                              ? 'bg-[#1E242B] text-[#C4CCD4] hover:bg-[#2A3038]'
                              : 'bg-[#F8FAFC] text-[#475569] hover:bg-[#E2E8F0]'
                          }`}
                        >
                          Previous
                        </button>
                      )}
                      <button
                        type="submit"
                        disabled={(step === 1 && !canContinueStep1) || submissionState.loading}
                        className={`flex-1 px-8 py-3 rounded-lg font-bold transition-all duration-300 ${
                          (step === 1 && !canContinueStep1) || submissionState.loading
                            ? isDarkMode
                              ? 'bg-[#1E242B] text-[#8B949E] cursor-not-allowed'
                              : 'bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed'
                            :
                          isDarkMode
                            ? 'bg-linear-to-r from-[#C9A36A] to-[#E7CFA2] text-[#0F0D0A] hover:shadow-lg hover:shadow-[#C9A36A]/35'
                            : 'bg-linear-to-r from-[#2F5D3A] to-[#5F8C6A] text-white hover:shadow-lg hover:shadow-[#2F5D3A]/35'
                        } ${(step === 1 && !canContinueStep1) || submissionState.loading ? '' : 'transform hover:scale-105'}`}
                      >
                        {step === 3
                          ? (submissionState.loading ? 'Submitting...' : 'Submit Request')
                          : step === 1
                            ? 'Next: Stay Details'
                            : 'Next: Review'}
                      </button>
                      </div>
                    </div>
                    {step === 1 && !canContinueStep1 && (
                      <p className={`mt-3 text-sm ${isDarkMode ? 'text-amber-400' : 'text-amber-700'}`}>
                        Select a valid available date range that meets minimum nights to continue.
                      </p>
                    )}
                    {submissionState.error && (
                      <p className={`mt-3 text-sm ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
                        {submissionState.error}
                      </p>
                    )}
                  </div>
                </form>
              </div>

              {/* Summary Sidebar */}
              <div>
                <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-[#141A1F]' : 'bg-white border border-[#E2E8F0]'} ${
                  isDarkMode
                    ? 'shadow-[0_10px_24px_-18px_rgba(0,0,0,0.7)]'
                    : 'shadow-[0_10px_24px_-18px_rgba(15,23,42,0.18)]'
                }`}>
                  <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-[#E0E7EE]' : 'text-[#0F172A]'}`}>
                    Request Summary
                  </h3>

                  <div className="space-y-3 mb-6">
                    <div className={`text-sm ${isDarkMode ? 'text-[#8B949E]' : 'text-[#475569]'}`}>
                      Stay
                    </div>
                    <div className={`font-semibold ${isDarkMode ? 'text-[#E0E7EE]' : 'text-[#0F172A]'}`}>
                      {packageData.title}
                    </div>
                    <div>
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                          calendarStatus.available === true
                            ? 'bg-green-500/15 text-green-500'
                            : calendarStatus.available === false
                              ? 'bg-red-500/15 text-red-500'
                              : isDarkMode
                                ? 'bg-[#1E242B] text-[#8B949E]'
                                : 'bg-[#EEF2F7] text-[#64748B]'
                        }`}
                      >
                        {calendarStatus.available === true
                          ? 'Dates Available'
                          : calendarStatus.available === false
                            ? 'Dates Unavailable'
                            : 'Availability Pending'}
                      </span>
                    </div>
                    <div className={`text-sm ${isDarkMode ? 'text-[#8B949E]' : 'text-[#475569]'}`}>
                      Dates: {bookingData.checkIn || 'TBD'} to {bookingData.checkOut || 'TBD'}
                    </div>
                    <div className={`text-sm ${isDarkMode ? 'text-[#8B949E]' : 'text-[#475569]'}`}>
                      Nights: {selectedNights || 'TBD'}
                    </div>
                    <div className={`text-sm ${isDarkMode ? 'text-[#8B949E]' : 'text-[#475569]'}`}>
                      Package: {calendarMeta.packageCode}
                    </div>
                    <div className={`text-sm ${isDarkMode ? 'text-[#8B949E]' : 'text-[#475569]'}`}>
                      Estimate: ${estimatedTotal.toFixed(2)}
                    </div>
                  </div>

                  <div className={`mb-6 rounded-lg border p-4 ${isDarkMode ? 'border-[#1E242B] bg-[#0F1419]' : 'border-[#E2E8F0] bg-[#F8FAFC]'}`}>
                    <h4 className={`text-sm font-bold mb-3 ${isDarkMode ? 'text-[#E0E7EE]' : 'text-[#0F172A]'}`}>
                      Price Breakdown
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className={isDarkMode ? 'text-[#C4CCD4]' : 'text-[#475569]'}>
                          {nightlyBreakdownLabel}
                        </span>
                        <span className={isDarkMode ? 'text-[#E0E7EE]' : 'text-[#0F172A]'}>${estimatedSubtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDarkMode ? 'text-[#C4CCD4]' : 'text-[#475569]'}>Add-ons</span>
                        <span className={isDarkMode ? 'text-[#E0E7EE]' : 'text-[#0F172A]'}>${selectedAddOnTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDarkMode ? 'text-[#C4CCD4]' : 'text-[#475569]'}>Cleaning Fee</span>
                        <span className={isDarkMode ? 'text-[#E0E7EE]' : 'text-[#0F172A]'}>${estimatedCleaningFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDarkMode ? 'text-[#C4CCD4]' : 'text-[#475569]'}>State Tax (6%)</span>
                        <span className={isDarkMode ? 'text-[#E0E7EE]' : 'text-[#0F172A]'}>${estimatedTax.toFixed(2)}</span>
                      </div>
                      <div className={`mt-2 pt-2 border-t flex justify-between font-bold ${isDarkMode ? 'border-[#1E242B] text-[#E0E7EE]' : 'border-[#E2E8F0] text-[#0F172A]'}`}>
                        <span>Estimated Total</span>
                        <span>${estimatedTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className={`border-t pt-4 space-y-2 ${isDarkMode ? 'border-[#1E242B]' : 'border-[#E2E8F0]'} `}>
                    <div className="flex justify-between">
                      <span className={isDarkMode ? 'text-[#C4CCD4]' : 'text-[#475569]'}>Guests:</span>
                      <span className={isDarkMode ? 'text-[#E0E7EE]' : 'text-[#0F172A]'}>
                        {totalGuests}
                      </span>
                    </div>
                  </div>

                  <div className={`border-t mt-4 pt-4 ${isDarkMode ? 'border-[#1E242B]' : 'border-[#E2E8F0]'} `}>
                    <div className={`text-sm ${isDarkMode ? 'text-[#C4CCD4]' : 'text-[#475569]'}`}>
                      We will confirm availability and pricing after review.
                    </div>
                    <div className={`text-xs mt-2 ${isDarkMode ? 'text-[#A7B0BA]' : 'text-[#64748B]'}`}>
                      Cancellation policy: {CANCELLATION_POLICY}
                    </div>
                  </div>

                  <div className={`mt-6 p-4 rounded-lg ${isDarkMode ? 'bg-green-500/10' : 'bg-green-50 border border-green-200'} `}>
                    <div className="flex items-center gap-2 text-green-500 font-semibold mb-2">
                      <FaLock />
                      <span>Secure Request</span>
                    </div>
                    <p className={`text-xs ${isDarkMode ? 'text-[#C4CCD4]' : 'text-[#475569]'}`}>
                      Your information is protected and never shared
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

    </PageLayout>
  );
};

export default BookNow;
