import { useState, useMemo, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import PageLayout from '../components/layout/PageLayout';
import { galleryPhotos } from '../data/galleryPhotosData';

// Icons
import { FaTimes, FaCamera } from 'react-icons/fa';

const CATEGORIES = [
  { key: 'property',    label: 'The Property',       icon: '🌿', description: 'Aerial shots and scenic views of The Tiny Escape resort' },
  { key: 'cabins',      label: 'Our Cabins',          icon: '🛖', description: 'A closer look at each of our thoughtfully designed tiny homes' },
  { key: 'cafe',        label: 'Creekside Cafe',      icon: '☕', description: 'Fresh coffee, good bites, and creek-side charm' },
  { key: 'pavilion',    label: 'Fireside Pavilion',   icon: '🏛', description: 'Our stunning open-air event venue — coming soon' },
  { key: 'experiences', label: 'Experiences',         icon: '🐴', description: 'Horseback riding, firepit evenings, and container pools' },
  { key: 'videos',      label: 'Videos',              icon: '🎬', description: 'Watch the magic of The Tiny Escape come to life' },
];

const PhotoCard = ({ photo, onClick }) => (
  <div
    onClick={() => onClick(photo)}
    className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 aspect-square"
  >
    {photo.mediaType === 'video' ? (
      <>
        <video
          src={photo.video}
          className="w-full h-full object-cover transition-transform duration-700"
          muted
          playsInline
          loop
          preload="metadata"
          onLoadedMetadata={(e) => { e.currentTarget.currentTime = 0.001; }}
          onMouseEnter={(e) => e.currentTarget.play()}
          onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0.001; }}
        />
        {/* Idle tint (before hover) — dark overlay so user knows it's a video */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/0 transition-colors duration-400 pointer-events-none" />
        {/* Hover tint — green shimmer sweeps in on hover */}
        <div className="absolute inset-0 bg-linear-to-tr from-[#1F3A2A]/60 via-transparent to-[#C9A36A]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />
        {/* Bottom label */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 pointer-events-none">
          <p className="text-white text-sm font-semibold leading-tight">{photo.title}</p>
        </div>
      </>
    ) : (
      <>
        <img
          src={photo.image}
          alt={photo.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
          decoding="async"
        />
        {/* Hover label */}
        <div className="absolute inset-0 bg-linear-to-t from-black/65 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 pointer-events-none">
          <p className="text-white text-sm font-semibold leading-tight">{photo.title}</p>
        </div>
      </>
    )}
  </div>
);

const Gallery = () => {
  const { isDarkMode } = useTheme();
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [lightboxPool, setLightboxPool] = useState([]);

  // SEO structured data
  const structuredData = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "Tiny Escape Photo Gallery",
    "description": "A curated look at Tiny Escape cabins, interiors, and Texas Hill Country views",
    "image": galleryPhotos.filter(p => p.image).map(p => p.image),
    "about": { "@type": "Place", "name": "Texas, USA" }
  }), []);

  // Open lightbox — pool is the category's photos so arrows stay within the section
  const openPhoto = (photo, pool) => {
    setSelectedPhoto(photo);
    setLightboxPool(pool);
  };

  const navigateLightbox = (direction) => {
    const currentIndex = lightboxPool.findIndex(p => p.id === selectedPhoto.id);
    if (direction === 'prev' && currentIndex > 0) setSelectedPhoto(lightboxPool[currentIndex - 1]);
    if (direction === 'next' && currentIndex < lightboxPool.length - 1) setSelectedPhoto(lightboxPool[currentIndex + 1]);
  };

  // Hide navbar + keyboard nav
  useEffect(() => {
    if (!selectedPhoto) return undefined;
    const navbar = document.querySelector('header');
    if (navbar) navbar.style.display = 'none';
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedPhoto(null);
      if (e.key === 'ArrowRight') navigateLightbox('next');
      if (e.key === 'ArrowLeft')  navigateLightbox('prev');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      if (navbar) navbar.style.display = '';
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedPhoto, lightboxPool]);

  return (
    <PageLayout
      seo={{
        title: "The Tiny Escape Gallery | Cabins, Interiors, and Views",
        description: "Explore Tiny Escape cabins, interiors, and Texas Hill Country views. A calm visual tour of the property.",
        keywords: "Tiny Escape gallery, Texas cabins, tiny home interiors, hill country views",
        url: "/gallery",
        image: galleryPhotos[0].image,
        structuredData
      }}
    >
      {/* ── Hero ── */}
      <section
        className={`relative py-20 overflow-hidden ${
          isDarkMode
            ? 'bg-linear-to-br from-[#0B0F0B] via-[#111A11] to-[#0B0F0B]'
            : 'bg-linear-to-br from-[#F0EADD] via-[#D9E7D4] to-[#F0EADD]'
        }`}
      >
        <div className="container mx-auto px-4 text-center">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6 ${
            isDarkMode
              ? 'bg-[#1F3A2A]/30 border-[#2F5D3A]'
              : 'bg-[rgba(31,58,42,0.1)] border-[rgba(31,58,42,0.3)]'
          }`}>
            <FaCamera className={isDarkMode ? 'text-[#C9A36A]' : 'text-[#1F3A2A]'} />
            <span className={`text-sm font-semibold ${isDarkMode ? 'text-[#C9A36A]' : 'text-[#1F3A2A]'}`}>
              {galleryPhotos.length}+ Photos & Videos
            </span>
          </div>
          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${
              isDarkMode ? 'text-[#F2EEE7]' : 'text-[#1F2A1F]'
            }`}
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Tiny Escape Gallery
          </h1>
          <p className={`text-lg md:text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-[#A79C8C]' : 'text-[#3E4F3E]'}`}>
            A calm visual tour of our cabins, café, experiences, and surrounding landscape
          </p>
        </div>
      </section>

      {/* ── Category Sections ── */}
      <div className={`${isDarkMode ? 'bg-[#0B0F0B]' : 'bg-[#F8FBF8]'}`}>
        {CATEGORIES.map((cat, catIdx) => {
          const photos = galleryPhotos.filter(p => p.category === cat.key);
          if (!photos.length) return null;

          return (
            <section
              key={cat.key}
              className={`py-14 md:py-20 ${
                catIdx % 2 === 0
                  ? isDarkMode ? 'bg-[#0B0F0B]'   : 'bg-[#F8FBF8]'
                  : isDarkMode ? 'bg-[#0F1A0F]'   : 'bg-white'
              }`}
            >
              <div className="container mx-auto px-4 sm:px-6">

                {/* Section heading */}
                <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{cat.icon}</span>
                      <h2
                        className={`text-2xl sm:text-3xl md:text-4xl font-bold ${
                          isDarkMode ? 'text-[#F2EEE7]' : 'text-[#1F2A1F]'
                        }`}
                        style={{ fontFamily: 'Playfair Display, serif' }}
                      >
                        {cat.label}
                      </h2>
                    </div>
                    <p className={`text-sm sm:text-base ${isDarkMode ? 'text-[#8FA88F]' : 'text-[#4A6A4A]'}`}>
                      {cat.description}
                    </p>
                  </div>
                  <span className={`flex-shrink-0 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full ${
                    isDarkMode ? 'bg-[#1A2A1A] text-[#6BAF7A]' : 'bg-[#EAF3EA] text-[#2F5D3A]'
                  }`}>
                    {photos.length} {photos.length === 1 ? 'item' : 'items'}
                  </span>
                </div>

                {/* Divider */}
                <div className={`h-px mb-10 ${isDarkMode ? 'bg-[#1A2A1A]' : 'bg-[#D4E8D4]'}`} />

                {/* Photo grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                  {photos.map(photo => (
                    <PhotoCard key={photo.id} photo={photo} onClick={(p) => openPhoto(p, photos)} />
                  ))}
                </div>

              </div>
            </section>
          );
        })}
      </div>

      {/* ── Lightbox ── */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-[999] bg-black flex flex-col"
          onClick={() => setSelectedPhoto(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedPhoto(null)}
            className="fixed top-5 right-5 z-[1000] flex items-center justify-center w-11 h-11 rounded-full bg-white text-[#0F172A] shadow-xl hover:bg-gray-100 transition-all duration-200 hover:scale-105"
            aria-label="Close gallery"
            style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.6)' }}
          >
            <FaTimes size={15} />
          </button>

          {/* Top bar */}
          <div className="shrink-0 flex items-center justify-between px-5 py-3 pt-5" onClick={(e) => e.stopPropagation()}>
            <span className="text-white/60 text-sm font-medium tracking-wide">
              {lightboxPool.findIndex(p => p.id === selectedPhoto.id) + 1} / {lightboxPool.length}
            </span>
            {selectedPhoto.title && (
              <span className="text-white text-sm font-semibold hidden sm:block" style={{ fontFamily: 'Playfair Display, serif' }}>
                {selectedPhoto.title}
              </span>
            )}
            <span className="w-11" />
          </div>

          {/* Main media */}
          <div className="flex-1 flex items-center justify-center relative min-h-0 px-16" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => navigateLightbox('prev')}
              disabled={lightboxPool.findIndex(p => p.id === selectedPhoto.id) === 0}
              className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 border border-white/25 text-white text-xl transition-all duration-200 hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed"
            >‹</button>

            {selectedPhoto.mediaType === 'video' ? (
              <video
                src={selectedPhoto.video}
                poster={selectedPhoto.poster || selectedPhoto.image}
                controls
                className="max-h-full max-w-full object-contain rounded-xl shadow-2xl"
              />
            ) : (
              <img
                key={selectedPhoto.id}
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                decoding="async"
                className="max-h-full max-w-full object-contain rounded-xl shadow-2xl"
                style={{ animation: 'fadeIn 0.3s ease-out' }}
              />
            )}

            <button
              onClick={() => navigateLightbox('next')}
              disabled={lightboxPool.findIndex(p => p.id === selectedPhoto.id) === lightboxPool.length - 1}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 border border-white/25 text-white text-xl transition-all duration-200 hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed"
            >›</button>
          </div>

          {/* Progress dots */}
          <div className="shrink-0 flex justify-center gap-1.5 py-3" onClick={(e) => e.stopPropagation()}>
            {lightboxPool.map((_, i) => {
              const currentIdx = lightboxPool.findIndex(p => p.id === selectedPhoto.id);
              return (
                <button
                  key={i}
                  onClick={() => setSelectedPhoto(lightboxPool[i])}
                  className={`rounded-full transition-all duration-300 ${
                    i === currentIdx ? 'bg-white w-5 h-1.5' : 'bg-white/35 hover:bg-white/60 w-1.5 h-1.5'
                  }`}
                />
              );
            })}
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default Gallery;
