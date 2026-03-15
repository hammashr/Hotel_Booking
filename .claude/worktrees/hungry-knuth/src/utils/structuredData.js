// Structured Data (Schema.org) for SEO
import config from '../config';

const siteUrl = (config.site.url || '').replace(/\/$/, '');

export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "name": "The Tiny Escape",
  "description": "Design-forward tiny homes and cabin stays in the Texas Hill Country.",
  "url": siteUrl,
  "logo": `${siteUrl}/logo.png`,
  "image": "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200",
  "telephone": "+1-512-555-0134",
  "email": "hello@tinyescape.com",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US",
    "addressRegion": "TX",
    "addressLocality": "Texas Hill Country"
  },
  "sameAs": [
    config.social.facebook,
    config.social.instagram,
    config.social.twitter
  ],
  "priceRange": "$$",
  "areaServed": {
    "@type": "Country",
    "name": "United States"
  }
});

export const getStaySchema = (stay) => ({
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "name": stay.name,
  "description": stay.shortDescription || stay.description,
  "image": stay.heroImage,
  "offers": {
    "@type": "Offer",
    "price": stay.pricing?.standard?.price,
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "url": `${siteUrl}/stay/${stay.slug}`,
    "validFrom": new Date().toISOString()
  },
  "provider": {
    "@type": "LodgingBusiness",
    "name": "The Tiny Escape"
  }
});

export const getDestinationSchema = (destination) => getStaySchema(destination);

export const getBreadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": `${siteUrl}${item.url}`
  }))
});

export const getReviewSchema = (reviews) => ({
  "@context": "https://schema.org",
  "@type": "AggregateRating",
  "ratingValue": reviews.averageRating || "4.9",
  "reviewCount": reviews.count || "1250",
  "bestRating": "5",
  "worstRating": "1"
});

export const getFAQSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});
