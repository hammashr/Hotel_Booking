import { Helmet } from 'react-helmet-async';
import config from '../../config';

const SEO = ({
  title = config.seo.defaultTitle,
  description = config.seo.defaultDescription,
  keywords = config.seo.defaultKeywords,
  image = config.seo.defaultImage,
  imageAlt = "Boutique hotel room interior",
  imageWidth = "1200",
  imageHeight = "630",
  imageType = "image/jpeg",
  url = "/",
  type = "website",
  structuredData = null,
  robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  googleBot = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
}) => {
  const siteUrl = (config.site.url || '').replace(/\/$/, '');
  const normalizedUrl = `${url || '/'}`;
  const fullUrl = url.startsWith('http')
    ? normalizedUrl
    : `${siteUrl}${normalizedUrl.startsWith('/') ? normalizedUrl : `/${normalizedUrl}`}`;
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content={imageWidth} />
      <meta property="og:image:height" content={imageHeight} />
      <meta property="og:image:type" content={imageType} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:site_name" content={config.site.name} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={imageAlt} />
      
      {/* Additional SEO Tags */}
      <meta name="robots" content={robots} />
      <meta name="googlebot" content={googleBot} />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content={config.site.name} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
