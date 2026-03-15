import { apiClient } from './apiClient';

const CACHE_TTL_MS = 3 * 60 * 1000;
const responseCache = new Map();
const inflightCache = new Map();

const withCache = async (cacheKey, fetcher) => {
  const now = Date.now();
  const cached = responseCache.get(cacheKey);

  if (cached && now - cached.timestamp < CACHE_TTL_MS) {
    return cached.value;
  }

  if (inflightCache.has(cacheKey)) {
    return inflightCache.get(cacheKey);
  }

  const request = (async () => {
    const value = await fetcher();
    responseCache.set(cacheKey, { value, timestamp: Date.now() });
    return value;
  })();

  inflightCache.set(cacheKey, request);

  try {
    return await request;
  } finally {
    inflightCache.delete(cacheKey);
  }
};

export const getHouses = async () => withCache('houses:list', () => apiClient('/houses'));

export const getHouseBySlug = async (slug) => withCache(`house:${slug}`, () => apiClient(`/houses/${slug}`));

export const getHousePackagesBySlug = async (slug) =>
  withCache(`house:${slug}:packages`, () => apiClient(`/houses/${slug}/packages`));

export const getUnavailableDatesBySlug = async (slug) => apiClient(`/houses/${slug}/unavailable-dates`);

export default {
  getHouses,
  getHouseBySlug,
  getHousePackagesBySlug,
  getUnavailableDatesBySlug,
};
