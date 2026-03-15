import { useState, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import PageLayout from '../components/layout/PageLayout';
import { galleryPhotos } from '../data/galleryPhotosData';

// Icons
import { FaSearch, FaTh, FaThLarge, FaTimes, FaMapMarkerAlt, FaCamera } from 'react-icons/fa';


const Gallery = () => {
  const { isDarkMode } = useTheme();
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
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

  // Search filter only (no category)
  const filteredPhotos = useMemo(() => {
    if (!searchQuery) return galleryPhotos;
    const query = searchQuery.toLowerCase();
    return galleryPhotos.filter(photo =>
      photo.title.toLowerCase().includes(query) ||
      photo.location.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Navigate lightbox
  const navigateLightbox = (direction) => {
    const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto.id);
    if (direction === 'prev' && currentIndex > 0) {
      setSelectedPhoto(filteredPhotos[currentIndex - 1]);
    } else if (direction === 'next' && currentIndex < filteredPhotos.length - 1) {
      setSelectedPhoto(filteredPhotos[currentIndex + 1]);
    }
  };

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
              className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${
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

            {/* Search Bar */}
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <FaSearch className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-[#8B949E]' : 'text-[#5B6B5B]'}`} />
                <input
                  type="text"
                  placeholder="Search photos by space, view, or detail..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-12 pr-4 py-4 rounded-xl border transition-colors ${
                    isDarkMode
                      ? 'bg-[#141A1F] border-[rgba(34,211,238,0.2)] text-[#E0E7EE] focus:border-[#22D3EE]'
                      : 'bg-white border-[#C7D5C7] text-[#1F2A1F] focus:border-[#1F3A2A]'
                  } focus:outline-none`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Layout Toggle & Count */}
      <section className={`py-4 backdrop-blur-lg border-b ${isDarkMode ? 'bg-[#0B0C0E]/95 border-[#1E242B]' : 'bg-[rgba(240,234,221,0.95)] border-[#D4E2D4]'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <span className={`text-sm ${isDarkMode ? 'text-[#8B949E]' : 'text-[#526352]'}`}>
              Showing {filteredPhotos.length} {filteredPhotos.length === 1 ? 'photo' : 'photos'}
            </span>

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
                      poster={photo.poster || photo.image}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      muted
                      playsInline
                      loop
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
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close lightbox"
          >
            <FaTimes size={24} />
          </button>

          <div className="max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            {selectedPhoto.mediaType === 'video' ? (
              <video
                src={selectedPhoto.video}
                poster={selectedPhoto.poster || selectedPhoto.image}
                controls
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
            ) : (
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                decoding="async"
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
            )}

            <div className="mt-4 flex items-center gap-2 text-white/70 text-sm">
              <FaMapMarkerAlt className="text-[#7BAF7C]" />
              <span>{selectedPhoto.title} · {selectedPhoto.location}</span>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => navigateLightbox('prev')}
                disabled={filteredPhotos.findIndex(p => p.id === selectedPhoto.id) === 0}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Previous
              </button>
              <button
                onClick={() => navigateLightbox('next')}
                disabled={filteredPhotos.findIndex(p => p.id === selectedPhoto.id) === filteredPhotos.length - 1}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default Gallery;
