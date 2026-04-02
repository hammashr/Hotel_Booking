import React, { memo, useState, useEffect, useRef } from 'react';

const HeroSection = ({ isDarkMode, videoSrc, posterSrc }) => {
  const [videoReady, setVideoReady] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = navigator.connection?.saveData;

    if (prefersReducedMotion || saveData) {
      return undefined;
    }

    let timeoutId;
    let idleId;
    let observer;

    const scheduleVideoLoad = () => {
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(() => setShouldLoad(true), { timeout: 2500 });
        return;
      }

      timeoutId = window.setTimeout(() => setShouldLoad(true), 900);
    };

    observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) {
          return;
        }

        scheduleVideoLoad();
        observer.disconnect();
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer?.disconnect();

      if (typeof idleId === 'number' && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId);
      }

      if (typeof timeoutId === 'number') {
        window.clearTimeout(timeoutId);
      }
    };
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
    <section ref={sectionRef} className="relative min-h-[calc(70svh-72px)] md:min-h-[72vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={posterSrc}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className={`absolute inset-0 h-full w-full object-cover object-[58%_center] scale-[1.22] sm:scale-[1.12] md:scale-100 transition-opacity duration-700 ${
            videoReady ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover object-[58%_center] scale-[1.22] sm:scale-[1.12] md:scale-100 transition-opacity duration-700 ${
            videoReady ? 'opacity-100' : 'opacity-0'
          }`}
          src={shouldLoad ? videoSrc : undefined}
          poster={posterSrc}
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
