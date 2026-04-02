import { useState, useMemo, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import PageLayout from '../components/layout/PageLayout';
import { galleryPhotos } from '../data/galleryPhotosData';

// Icons
import { FaTh, FaThLarge, FaTimes, FaCamera } from 'react-icons/fa';


const Gallery = () => {
  const { isDarkMode } = useTheme();
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [layout, setLayout] = useState('grid');

  // SEO structured data
  const structuredData = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "Tiny Escape Photo Gallery",
    "description": "A curated look at Tiny Escape cabins, interiors, and Texas Hill Country views",
    "image": galleryPhotos.filter(p => p.image).map(p => p.image),
    "about": {
      "@type": "Place",
      "name": "Texas, USA"
    }
  }), []);

  const filteredPhotos = galleryPhotos;

  // Navigate lightbox
  const navigateLightbox = (direction) => {
    const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto.id);
    if (direction === 'prev' && currentIndex > 0) {
      setSelectedPhoto(filteredPhotos[currentIndex - 1]);
    } else if (direction === 'next' && currentIndex < filteredPhotos.length - 1) {
      setSelectedPhoto(filteredPhotos[currentIndex + 1]);
    }
  };

  // Hide navbar + handle Escape key when lightbox is open
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
  }, [selectedPhoto]);

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
      {/* Hero Section */}
      <section
        className={`relative py-20 overflow-hidden ${
          isDarkMode
            ? 'bg-linear-to-br from-[#0B0C0E] via-[#0A3A67] to-[#0B0C0E]'
            : 'bg-linear-to-br from-[#F0EADD] via-[#D9E7D4] to-[#F0EADD]'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6 ${
              isDarkMode
                ? 'bg-blue-500/10 border-blue-500'
                : 'bg-[rgba(31,58,42,0.12)] border-[rgba(31,58,42,0.35)]'
            }`}>
              <FaCamera className={isDarkMode ? 'text-[#22D3EE]' : 'text-[#1F3A2A]'} />
              <span className={`text-sm font-semibold ${isDarkMode ? 'text-[#22D3EE]' : 'text-[#1F3A2A]'}`}>
                {galleryPhotos.length}+ Photos
              </span>
            </div>

            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 pb-2 ${
                isDarkMode
                  ? 'bg-linear-to-r from-[#22D3EE] to-[#4DBBFF]'
                  : 'bg-linear-to-r from-[#1F3A2A] to-[#5F8C6A]'
              } bg-clip-text text-transparent`}
            >
              Tiny Escape Gallery
            </h1>
            <p className={`text-lg md:text-xl mb-8 ${isDarkMode ? 'text-[#C4CCD4]' : 'text-[#3E4F3E]'}`}>
              A calm visual tour of our cabins, details, and surrounding landscape
            </p>

          </div>
        </div>
      </section>

      {/* Layout Toggle & Count */}
      <section className={`py-4 backdrop-blur-lg border-b ${isDarkMode ? 'bg-[#0B0C0E]/95 border-[#1E242B]' : 'bg-[rgba(240,234,221,0.95)] border-[#D4E2D4]'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-end">
            {/* Layout Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setLayout('grid')}
                className={`p-2 rounded-lg transition-all ${
                  layout === 'grid'
                    ? isDarkMode ? 'bg-[#22D3EE] text-[#0B0C0E]' : 'bg-[#1F3A2A] text-white'
                    : isDarkMode ? 'bg-[#141A1F] text-[#C4CCD4]' : 'bg-[#F1F5F1] text-[#526352]'
                }`}
                aria-label="Grid layout"
              >
                <FaTh />
              </button>
              <button
                onClick={() => setLayout('masonry')}
                className={`p-2 rounded-lg transition-all ${
                  layout === 'masonry'
                    ? isDarkMode ? 'bg-[#22D3EE] text-[#0B0C0E]' : 'bg-[#1F3A2A] text-white'
                    : isDarkMode ? 'bg-[#141A1F] text-[#C4CCD4]' : 'bg-[#F1F5F1] text-[#526352]'
                }`}
                aria-label="Masonry layout"
              >
                <FaThLarge />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredPhotos.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-[#E0E7EE]' : 'text-[#0F172A]'}`}>
                No photos found
              </h3>
              <p className={isDarkMode ? 'text-[#8B949E]' : 'text-[#526352]'}>
                Try adjusting your search query
              </p>
            </div>
          ) : (
            <div
              className={`grid gap-6 ${
                layout === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {filteredPhotos.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                  className={`group relative rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 ${
                    layout === 'masonry' ? 'h-80' : 'aspect-square'
                  }`}
                >
                  {/* Media */}
                  {photo.mediaType === 'video' ? (
                    <video
                      src={photo.video}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      muted
                      playsInline
                      loop
                      preload="metadata"
                      onLoadedMetadata={(e) => { e.currentTarget.currentTime = 0.001; }}
                      onMouseEnter={(e) => e.currentTarget.play()}
                      onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0.001; }}
                    />
                  ) : (
                    <img
                      src={photo.image}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                      decoding="async"
                    />
                  )}

                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-[999] bg-black flex flex-col"
          onClick={() => setSelectedPhoto(null)}
        >
          {/* Floating close button — always visible top-right */}
          <button
            onClick={() => setSelectedPhoto(null)}
            className="fixed top-5 right-5 z-[1000] flex items-center justify-center w-11 h-11 rounded-full bg-white text-[#0F172A] shadow-xl hover:bg-gray-100 transition-all duration-200 hover:scale-105"
            aria-label="Close gallery"
            style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.6)' }}
          >
            <FaTimes size={15} />
          </button>

          {/* Top info bar */}
          <div className="shrink-0 flex items-center justify-between px-5 py-3 pt-5" onClick={(e) => e.stopPropagation()}>
            <span className="text-white/60 text-sm font-medium tracking-wide">
              {filteredPhotos.findIndex(p => p.id === selectedPhoto.id) + 1} / {filteredPhotos.length}
            </span>
            {selectedPhoto.title && (
              <span className="text-white text-sm font-semibold hidden sm:block" style={{ fontFamily: 'Playfair Display, serif' }}>
                {selectedPhoto.title}
              </span>
            )}
            <span className="w-11" />
          </div>

          {/* Main media */}
          <div
            className="flex-1 flex items-center justify-center relative min-h-0 px-16"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev arrow */}
            <button
              onClick={() => navigateLightbox('prev')}
              disabled={filteredPhotos.findIndex(p => p.id === selectedPhoto.id) === 0}
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

            {/* Next arrow */}
            <button
              onClick={() => navigateLightbox('next')}
              disabled={filteredPhotos.findIndex(p => p.id === selectedPhoto.id) === filteredPhotos.length - 1}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 border border-white/25 text-white text-xl transition-all duration-200 hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed"
            >›</button>
          </div>

          {/* Progress dots */}
          <div className="shrink-0 flex justify-center gap-1.5 py-3" onClick={(e) => e.stopPropagation()}>
            {filteredPhotos.map((_, i) => {
              const currentIdx = filteredPhotos.findIndex(p => p.id === selectedPhoto.id);
              return (
                <button
                  key={i}
                  onClick={() => setSelectedPhoto(filteredPhotos[i])}
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
