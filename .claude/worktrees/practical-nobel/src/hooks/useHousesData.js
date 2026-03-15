import { useEffect, useMemo, useState } from 'react';
import { getHouses, getHousePackagesBySlug } from '../services/houses';
import { normalizeHouseToStay, sortHousesByOrder } from '../utils/houseDataNormalizer';

export const useHousesData = ({ fallbackData = [] } = {}) => {
  const [houses, setHouses] = useState(sortHousesByOrder(fallbackData));
  const [isLoading, setIsLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);
  const [error, setError] = useState('');

  const fallbackBySlug = useMemo(
    () => new Map((fallbackData || []).map((stay) => [stay.slug, stay])),
    [fallbackData]
  );

  useEffect(() => {
    let mounted = true;

    const loadHouses = async () => {
      setIsLoading(true);
      setError('');

      try {
        const houseResponse = await getHouses();
        const houseItems = sortHousesByOrder(houseResponse?.data || []);

        const packageResponses = await Promise.all(
          houseItems.map(async (house) => {
            try {
              const response = await getHousePackagesBySlug(house.slug);
              return [house.slug, response?.data || []];
            } catch (_error) {
              return [house.slug, []];
            }
          })
        );

        const packagesBySlug = new Map(packageResponses);

        const mapped = houseItems.map((house) => {
          const fallbackStay = fallbackBySlug.get(house.slug);
          const packages = packagesBySlug.get(house.slug) || [];

          return normalizeHouseToStay({
            house,
            packages,
            fallbackStay,
          });
        });

        if (!mounted) return;

        setHouses(mapped);
        setIsFallback(false);
        setIsLoading(false);
      } catch (loadError) {
        if (!mounted) return;

        setHouses(sortHousesByOrder(fallbackData));
        setIsFallback(true);
        setError(loadError?.message || 'Unable to load houses from backend');
        setIsLoading(false);
      }
    };

    loadHouses();

    return () => {
      mounted = false;
    };
  }, [fallbackBySlug, fallbackData]);

  return {
    houses,
    isLoading,
    isFallback,
    error,
  };
};

export default useHousesData;
