/**
 * Square Web Payments SDK — Service Layer
 *
 * Wraps the Square Web Payments SDK for tokenizing card payments.
 * Credentials come from environment variables (NEVER hardcode them):
 *
 *   VITE_SQUARE_APP_ID       — Application ID (sq0idp-…)
 *   VITE_SQUARE_LOCATION_ID  — Location ID
 *   VITE_SQUARE_ENV          — "sandbox" | "production"
 *
 * The returned nonce / payment token must be sent to YOUR backend,
 * which then calls the Square Payments API server-side using your
 * Square Access Token (keep that server-side only).
 */

const SQUARE_APP_ID = import.meta.env.VITE_SQUARE_APP_ID || '';
const SQUARE_LOCATION_ID = import.meta.env.VITE_SQUARE_LOCATION_ID || '';
const SQUARE_ENV = (import.meta.env.VITE_SQUARE_ENV || 'sandbox').toLowerCase();

const SDK_URL =
  SQUARE_ENV === 'production'
    ? 'https://web.squarecdn.com/v1/square.js'
    : 'https://sandbox.web.squarecdn.com/v1/square.js';

let sdkPromise = null;

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Load the Square Web Payments SDK script once.
 * Subsequent calls return the cached promise.
 * Falls back gracefully if already preloaded in index.html.
 */
export const loadSquareSDK = () => {
  if (sdkPromise) return sdkPromise;

  sdkPromise = new Promise((resolve, reject) => {
    // SDK already preloaded (via index.html script tag)
    if (window.Square) {
      resolve(window.Square);
      return;
    }

    // Check if script tag already exists but Square not ready yet — wait for it
    const existing = document.querySelector(`script[src="${SDK_URL}"]`);
    if (existing) {
      let waited = 0;
      const poll = setInterval(() => {
        waited += 100;
        if (window.Square) {
          clearInterval(poll);
          resolve(window.Square);
        } else if (waited >= 8000) {
          clearInterval(poll);
          reject(new Error('Square SDK timed out loading.'));
        }
      }, 100);
      return;
    }

    // Dynamically inject script if not present
    const script = document.createElement('script');
    script.src = SDK_URL;
    script.async = true;
    script.onload = async () => {
      // Small delay to let Square fully bootstrap
      await delay(200);
      if (window.Square) resolve(window.Square);
      else reject(new Error('Square SDK loaded but window.Square is unavailable.'));
    };
    script.onerror = () => {
      sdkPromise = null; // allow retry on next call
      reject(new Error('Failed to load Square Web Payments SDK.'));
    };
    document.head.appendChild(script);
  });

  return sdkPromise;
};

/**
 * Initialize a Square Payments instance.
 * Retries up to 3 times with increasing delay to handle SDK init timeouts.
 * @returns {Promise<object>} Square Payments instance
 */
export const initSquarePayments = async () => {
  if (!SQUARE_APP_ID || !SQUARE_LOCATION_ID) {
    throw new Error(
      'Square credentials missing. Set VITE_SQUARE_APP_ID and VITE_SQUARE_LOCATION_ID in your .env file.'
    );
  }

  const Square = await loadSquareSDK();

  let lastError;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      if (attempt > 0) await delay(600 * attempt); // 600ms, 1200ms
      return await Square.payments(SQUARE_APP_ID, SQUARE_LOCATION_ID);
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
};

/**
 * Create a Square Card payment method attached to a container element.
 * @param {object} payments  - Square Payments instance from initSquarePayments()
 * @param {string} containerId - DOM id to mount the card form into
 * @returns {Promise<object>} Square Card instance
 */
export const createSquareCard = async (payments, containerId) => {
  const card = await payments.card({
    style: {
      '.input-container': {
        borderColor: '#DDE8DD',
        borderRadius: '12px',
      },
      '.input-container.is-focus': {
        borderColor: '#2F5D3A',
      },
      '.input-container.is-error': {
        borderColor: '#EF4444',
      },
      '.message-text': {
        color: '#64748B',
      },
      '.message-icon': {
        color: '#64748B',
      },
      input: {
        color: '#0F1F0F',
        fontFamily: 'inherit',
      },
    },
  });

  await card.attach(`#${containerId}`);
  return card;
};

/**
 * Tokenize a Square Card payment.
 * @param {object} card - Square Card instance
 * @returns {Promise<string>} payment nonce / source ID to send to backend
 */
export const tokenizeSquareCard = async (card) => {
  const result = await card.tokenize();

  if (result.status === 'OK') {
    return result.token;
  }

  const errors = result.errors?.map((e) => e.message).join(', ') || 'Card tokenization failed.';
  throw new Error(errors);
};

/**
 * Check whether Square is configured (credentials present).
 */
export const isSquareConfigured = () =>
  Boolean(SQUARE_APP_ID && SQUARE_LOCATION_ID);

export default {
  loadSquareSDK,
  initSquarePayments,
  createSquareCard,
  tokenizeSquareCard,
  isSquareConfigured,
};
