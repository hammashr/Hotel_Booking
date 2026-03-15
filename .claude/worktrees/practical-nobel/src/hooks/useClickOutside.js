import { useEffect } from 'react';

/**
 * Custom hook to handle clicks outside of specified elements
 * Commonly used for closing dropdowns and modals
 * 
 * @param {Array} refs - Array of refs to monitor
 * @param {Array} states - Array of state setters to call (false) when clicking outside
 */
export const useClickOutside = (refs, states) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      refs.forEach((ref, index) => {
        if (ref.current && !ref.current.contains(event.target)) {
          if (states[index]) {
            states[index](false);
          }
        }
      });
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [refs, states]);
};
