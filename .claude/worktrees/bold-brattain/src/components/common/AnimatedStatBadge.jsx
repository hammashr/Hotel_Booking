import React, { useState, useEffect, useRef, useCallback, memo } from 'react';

const AnimatedStatBadge = ({ target, suffix, label, duration, decimal = false, isDarkMode }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const badgeRef = useRef(null);

  const animateCounter = useCallback(() => {
    const startTime = Date.now();

    const updateCounter = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = easeOutQuart * target;

      setCount(decimal ? currentCount : Math.floor(currentCount));

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [decimal, duration, target]);

  useEffect(() => {
    const element = badgeRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounter();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [animateCounter, hasAnimated]);

  return (
    <div ref={badgeRef} className="text-center">
      <div className={`text-3xl md:text-4xl font-bold mb-1 bg-clip-text text-transparent ${
        isDarkMode
          ? 'bg-linear-to-r from-[#22D3EE] via-[#4DBBFF] to-[#22D3EE]'
          : 'bg-linear-to-r from-[#3B82F6] via-[#60A5FA] to-[#3B82F6]'
      }`}>
        {decimal ? count.toFixed(1) : count.toLocaleString()}{suffix}
      </div>
      <div className={`text-xs md:text-sm uppercase tracking-wide font-medium ${
        isDarkMode ? 'text-[#C4CCD4]' : 'text-[#6B7280]'
      }`}>
        {label}
      </div>
    </div>
  );
};

export default memo(AnimatedStatBadge);
