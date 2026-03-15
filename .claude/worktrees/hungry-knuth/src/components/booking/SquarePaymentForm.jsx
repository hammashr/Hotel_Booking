import { useEffect, useRef, useState, memo } from 'react';
import { FaLock, FaCreditCard } from 'react-icons/fa';
import {
  initSquarePayments,
  createSquareCard,
  tokenizeSquareCard,
  isSquareConfigured,
} from '../../services/square';

/**
 * SquarePaymentForm
 *
 * Renders a Square Web Payments card form.
 * On submit, tokenizes the card and calls onToken(nonce).
 * Your backend should use the nonce to create a Square Payment server-side.
 *
 * Props:
 *   isDarkMode   {boolean}
 *   amount       {number}   — display amount in USD cents
 *   currency     {string}   — e.g. "USD"
 *   label        {string}   — button label (default: "Pay Now")
 *   onToken      {function} — called with (nonce: string) on success
 *   onError      {function} — called with (message: string) on failure
 *   disabled     {boolean}
 */
const SquarePaymentForm = memo(({
  isDarkMode = false,
  amount = 0,
  currency = 'USD',
  label = 'Pay Now',
  onToken,
  onError,
  disabled = false,
}) => {
  const cardContainerRef = useRef(null);
  const cardRef = useRef(null);
  const initInProgressRef = useRef(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [initError, setInitError] = useState('');

  const configured = isSquareConfigured();

  const formatAmount = (cents) => {
    const dollars = (cents / 100).toFixed(2);
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(dollars);
  };

  useEffect(() => {
    if (!configured) {
      setInitError('Square credentials not configured. Add VITE_SQUARE_APP_ID and VITE_SQUARE_LOCATION_ID to your .env file.');
      setLoading(false);
      return;
    }

    let mounted = true;

    // Guard against React StrictMode double-invoke (destroys first card before second init)
    if (initInProgressRef.current) return;
    initInProgressRef.current = true;

    const init = async () => {
      try {
        // Destroy any existing card instance before creating a new one
        if (cardRef.current) {
          cardRef.current.destroy?.();
          cardRef.current = null;
        }
        const payments = await initSquarePayments();
        const card = await createSquareCard(payments, 'sq-card-container');
        if (mounted) {
          cardRef.current = card;
          setLoading(false);
        } else {
          // Component unmounted during async init — clean up immediately
          card.destroy?.();
        }
      } catch (err) {
        if (mounted) {
          setInitError(err.message || 'Failed to initialize payment form.');
          setLoading(false);
        }
      } finally {
        initInProgressRef.current = false;
      }
    };

    init();

    return () => {
      mounted = false;
      initInProgressRef.current = false;
      if (cardRef.current) {
        cardRef.current.destroy?.();
        cardRef.current = null;
      }
    };
  }, [configured]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cardRef.current || submitting || disabled) return;

    setSubmitting(true);
    try {
      const token = await tokenizeSquareCard(cardRef.current);
      onToken?.(token);
    } catch (err) {
      const msg = err.message || 'Payment failed. Please check your card details.';
      onError?.(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (!configured) {
    return (
      <div className={`rounded-2xl border p-6 text-center ${isDarkMode ? 'bg-[#0F1A0F] border-[#1A2A1A]' : 'bg-[#F8FBF8] border-[#DDE8DD]'}`}>
        <FaCreditCard className={`mx-auto mb-3 h-8 w-8 ${isDarkMode ? 'text-[#4A6A4A]' : 'text-[#8FA88F]'}`} />
        <p className={`text-sm font-semibold mb-1 ${isDarkMode ? 'text-[#D4E8D4]' : 'text-[#1F3A2A]'}`}>
          Square not configured
        </p>
        <p className={`text-xs ${isDarkMode ? 'text-[#6A8A6A]' : 'text-[#5A7A5A]'}`}>
          Add <code className="font-mono">VITE_SQUARE_APP_ID</code> and{' '}
          <code className="font-mono">VITE_SQUARE_LOCATION_ID</code> to your <code className="font-mono">.env</code> file.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Security badge */}
      <div className={`flex items-center gap-2 text-xs ${isDarkMode ? 'text-[#6A8A6A]' : 'text-[#5A7A5A]'}`}>
        <FaLock className="h-3 w-3" />
        <span>256-bit SSL — powered by Square</span>
      </div>

      {/* Square card container */}
      <div
        className={`rounded-2xl border overflow-hidden ${
          isDarkMode ? 'bg-[#0F1A0F] border-[#1A2A1A]' : 'bg-white border-[#DDE8DD]'
        } ${loading ? 'animate-pulse min-h-[100px]' : ''}`}
      >
        {loading && (
          <div className="flex items-center justify-center py-10">
            <div className={`h-5 w-5 rounded-full border-2 border-t-transparent animate-spin ${isDarkMode ? 'border-[#6BAF7A]' : 'border-[#2F5D3A]'}`} />
          </div>
        )}
        {initError && (
          <p className="p-4 text-sm text-red-500">{initError}</p>
        )}
        <div
          id="sq-card-container"
          ref={cardContainerRef}
          className="p-4"
          style={{ display: loading ? 'none' : 'block' }}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting || loading || disabled || Boolean(initError)}
        className={`w-full flex items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
          submitting || loading || disabled || initError
            ? 'opacity-50 cursor-not-allowed bg-[#1F3A2A] text-[#F7FBF7]'
            : 'bg-[#1F3A2A] text-[#F7FBF7] hover:bg-[#2F5D3A] hover:scale-[1.01]'
        }`}
      >
        {submitting ? (
          <>
            <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin" />
            Processing…
          </>
        ) : (
          <>
            <FaLock className="h-3.5 w-3.5" />
            {amount > 0 ? `${label} — ${formatAmount(amount)}` : label}
          </>
        )}
      </button>

      <p className={`text-center text-xs ${isDarkMode ? 'text-[#4A6A4A]' : 'text-[#8FA88F]'}`}>
        Your payment is processed securely by Square. We never store your card details.
      </p>
    </form>
  );
});

SquarePaymentForm.displayName = 'SquarePaymentForm';

export default SquarePaymentForm;
