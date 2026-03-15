import { Link } from 'react-router-dom';
import PageLayout from '../layout/PageLayout';
import ThemedPricingCard from './ThemedPricingCard';
import PricingCardMedia from './PricingCardMedia';
import { getAllStays } from '../../data/staysData';
import { useHousesData } from '../../hooks/useHousesData';

const SURFACE_CARD = 'bg-white border border-[#E2E8F0]';
const MUTED_TEXT = 'text-[#475569]';
const TITLE_TEXT = 'text-[#0F172A]';

const TripCategoryPage = ({ config }) => {
  const { houses, isLoading } = useHousesData({ fallbackData: getAllStays() });
  const featuredStays = houses.filter((stay) => config.featuredSlugs.includes(stay.slug));

  return (
    <PageLayout seo={config.seo} className={`transition-colors duration-500 ${config.pageClassName}`}>
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={config.heroImage}
            alt={config.heroImageAlt}
            loading="eager"
            decoding="async"
            fetchpriority="high"
            className="w-full h-full object-cover opacity-20"
          />
          <div className={`absolute inset-0 ${config.heroOverlayClassName} opacity-90`} />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
          <div className={`inline-flex items-center gap-2 mb-6 rounded-full border backdrop-blur-sm px-6 py-3 bg-[rgba(255,255,255,0.85)] ${config.badgeColorClassName}`}>
            <span className="text-2xl">{config.badgeIcon}</span>
            <span className="text-sm font-bold uppercase tracking-wider">{config.badgeText}</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            {config.heroTitle}
            <span className={`block bg-clip-text text-transparent ${config.heroTitleAccentClassName}`}>
              {config.heroTitleAccent}
            </span>
          </h1>

          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed text-[#374151]">
            {config.heroDescription}
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {config.highlights.map((item) => (
              <div key={item} className={`p-6 rounded-xl ${SURFACE_CARD}`}>
                <p className="font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className={`text-3xl font-bold mb-10 ${TITLE_TEXT}`}>{config.featuredTitle}</h2>
          {isLoading ? (
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2].map((item) => (
                <div key={item} className="h-80 rounded-2xl animate-pulse bg-[#E2E8F0]" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {featuredStays.map((stay, index) => {
                const nightlyPrice = stay.pricing?.[config.pricingTier]?.price ?? stay.pricing?.standard?.price;
                return (
                  <ThemedPricingCard
                    key={stay.id || stay.slug}
                    title={stay.name}
                    subtitle={stay.location}
                    price={`$${nightlyPrice}`}
                    priceNote="per night"
                    features={[
                      `Sleeps ${stay.sleeps}`,
                      `${stay.bedrooms} ${stay.bedrooms === 1 ? 'bedroom' : 'bedrooms'}`,
                      stay.highlights?.[0],
                      stay.highlights?.[1]
                    ].filter(Boolean)}
                    isDarkMode={false}
                    themeKey={config.featuredThemeKey}
                    themeIndex={index}
                    ctaLabel="View Stay"
                    ctaHref={`/stay/${stay.slug}`}
                    footerText={stay.shortDescription}
                    media={<PricingCardMedia imageSrc={stay.heroImage} imageAlt={stay.name} heightClass="h-56" />}
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className={`text-3xl font-bold mb-8 ${TITLE_TEXT}`}>{config.addOnsTitle}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {config.addOns.map((item) => (
              <div key={item} className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className={`text-3xl font-bold mb-6 ${TITLE_TEXT}`}>{config.ctaTitle}</h2>
          <p className={`text-lg mb-8 ${MUTED_TEXT}`}>{config.ctaDescription}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/book-now" className={`px-8 py-3 rounded-lg font-semibold transition-colors ${config.ctaPrimaryClassName}`}>
              Check Availability
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default TripCategoryPage;
