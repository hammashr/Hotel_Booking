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

      <div className="absolute inset-0 bg-linear-to-b from-[rgba(0,0,0,0.15)] via-[rgba(0,0,0,0.08)] to-[rgba(0,0,0,0.2)]" />
    </section>
  );
};

export default memo(HeroSection);
