import React, { memo, useState, useEffect, useRef } from 'react';

const HeroSection = ({ isDarkMode, videoSrc }) => {
  const [videoReady, setVideoReady] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const videoRef = useRef(null);

  // Defer video load until after page is interactive
  useEffect(() => {
    const timer = setTimeout(() => setShouldLoad(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleLoadedMetadata = (event) => {
    const videoElement = event.currentTarget;
    try {
      if (videoElement.currentTime < 0.25) {
        videoElement.currentTime = 0.25;
      }
    } catch {
      return;
    }
  };

  return (
    <section className="relative min-h-[calc(70svh-72px)] md:min-h-[72vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover object-[58%_center] scale-[1.22] sm:scale-[1.12] md:scale-100 transition-opacity duration-700 ${
            videoReady ? 'opacity-100' : 'opacity-0'
          }`}
          src={shouldLoad ? videoSrc : undefined}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          onLoadedMetadata={handleLoadedMetadata}
          onCanPlay={() => setVideoReady(true)}
          onPlaying={() => setVideoReady(true)}
        />
      </div>

      <div
        className={`absolute inset-0 transition-colors duration-500 ${
          isDarkMode
            ? 'bg-linear-to-b from-[rgba(0,0,0,0.62)] via-[rgba(0,0,0,0.42)] to-[rgba(0,0,0,0.72)]'
            : 'bg-linear-to-b from-[rgba(0,0,0,0.52)] via-[rgba(0,0,0,0.34)] to-[rgba(0,0,0,0.6)]'
        }`}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20 md:py-28 text-center reveal">

        {/* Main Heading — all on one line, white */}
        <h1
          className="mb-6 text-4xl font-bold tracking-normal sm:text-5xl md:text-7xl lg:text-8xl text-white reveal-delay-2"
          style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '0.02em' }}
        >
          The Tiny Escape
        </h1>

        {/* Tagline */}
        <p
          className="mx-auto max-w-2xl text-base sm:text-lg md:text-xl font-medium text-white/85 reveal-delay-3"
        >
          Your escape to tranquility is closer than you think. Our tiny home village gives you the perfect opportunity to unplug, unwind, and explore the beauty that nature has to offer.
        </p>

      </div>
    </section>
  );
};

export default memo(HeroSection);
