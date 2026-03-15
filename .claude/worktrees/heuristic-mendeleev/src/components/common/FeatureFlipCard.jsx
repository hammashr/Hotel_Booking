import React, { useState } from 'react';

const FeatureFlipCard = ({ icon, title, description, isDarkMode }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className={`group cursor-pointer feature-thread-card ${isFlipped ? 'is-open' : ''}`}
      onClick={() => setIsFlipped(!isFlipped)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          setIsFlipped(!isFlipped);
        }
      }}
      aria-pressed={isFlipped}
    >
      <div className={`feature-thread-face ${isDarkMode ? 'feature-face-dark' : 'feature-face-light'}`}>
        <div className="feature-face-border" aria-hidden="true" />
        {icon && <div className="text-5xl mb-4">{icon}</div>}
        <p className={`text-xs font-semibold uppercase tracking-widest ${
          isDarkMode ? 'text-[#C9A36A]' : 'text-[#EAF3EA]'
        }`}>Signature</p>
        <h3 className={`text-2xl font-semibold mt-2 ${
          isDarkMode ? 'text-[#F2EEE7]' : 'text-[#F7FBF7]'
        }`}>{title}</h3>
        <p className={`text-xs mt-3 uppercase tracking-wider ${
          isDarkMode ? 'text-[#A79C8C]' : 'text-[#CFE3CF]'
        }`}>Tap to view details</p>
      </div>

      <div className="feature-thread" aria-hidden="true">
        <span className="feature-thread-knot" />
        <span className="feature-thread-line" />
      </div>

      <div className={`feature-thread-note ${isDarkMode ? 'feature-note-dark' : 'feature-note-light'}`}>
        <p className={`text-xs font-semibold uppercase tracking-widest ${
          isDarkMode ? 'text-[#E7CFA2]' : 'text-[#2F5D3A]'
        }`}>Why it matters</p>
        <h3 className={`text-xl font-semibold mt-2 mb-3 ${
          isDarkMode ? 'text-white' : 'text-[#1B2A1B]'
        }`}>{title}</h3>
        <p className={`text-sm leading-relaxed ${
          isDarkMode ? 'text-white/90' : 'text-[#3E4F3E]'
        }`}>{description}</p>
      </div>
    </div>
  );
};

export default FeatureFlipCard;
