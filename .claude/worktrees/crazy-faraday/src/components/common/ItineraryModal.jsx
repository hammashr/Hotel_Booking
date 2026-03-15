import React, { useState } from 'react';
import { FaTimes, FaCalendar, FaCheck } from 'react-icons/fa';

const ItineraryModal = ({ isOpen, onClose, destination, isDarkMode }) => {
  const [selectedDuration, setSelectedDuration] = useState('7');

  if (!isOpen || !destination) return null;

  // Get itinerary for selected duration
  const getCurrentItinerary = () => {
    return destination.itineraryByDuration?.[`${selectedDuration}days`] || destination.itinerary;
  };

  const currentItinerary = getCurrentItinerary();
  const availableDurations = destination.itineraryByDuration 
    ? Object.keys(destination.itineraryByDuration).map(key => key.replace('days', ''))
    : ['7'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div 
          className={`relative w-full max-w-4xl rounded-2xl shadow-2xl ${
            isDarkMode ? 'bg-[#0F1419]' : 'bg-white'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className={`absolute right-4 top-4 z-10 rounded-full p-2 transition-all hover:scale-110 ${
              isDarkMode 
                ? 'bg-[#0B0C0E] text-[#E0E7EE] hover:bg-gray-800' 
                : 'bg-gray-100 text-[#1F2937] hover:bg-gray-200'
            }`}
          >
            <FaTimes size={20} />
          </button>

          {/* Header */}
          <div className={`border-b p-6 ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-[#E0E7EE]' : 'text-[#1F2937]'}`}>
              {destination.name} - Detailed Itinerary
            </h2>
            <p className={`mt-2 ${isDarkMode ? 'text-[#C9D6DF]' : 'text-[#6B7280]'}`}>
              Day-by-day breakdown of your adventure
            </p>
          </div>

          {/* Duration Selector */}
          <div className="p-6">
            <div className="mb-6">
              <label className={`mb-3 block text-sm font-semibold ${
                isDarkMode ? 'text-[#E0E7EE]' : 'text-[#1F2937]'
              }`}>
                <FaCalendar className="mr-2 inline" />
                Select Trip Duration
              </label>
              <div className="flex flex-wrap gap-3">
                {availableDurations.map((days) => (
                  <button
                    key={days}
                    onClick={() => setSelectedDuration(days)}
                    className={`rounded-lg px-6 py-3 font-semibold transition-all ${
                      selectedDuration === days
                        ? 'bg-[#22D3EE] text-white shadow-lg shadow-[#22D3EE]/30 scale-105'
                        : isDarkMode
                          ? 'bg-[#0B0C0E] text-[#C9D6DF] hover:bg-gray-800'
                          : 'bg-gray-100 text-[#4B5563] hover:bg-gray-200'
                    }`}
                  >
                    {days} Days
                  </button>
                ))}
              </div>
            </div>

            {/* Itinerary List */}
            <div className="max-h-[60vh] space-y-4 overflow-y-auto pr-2">
              {currentItinerary.map((day, index) => (
                <div
                  key={index}
                  className={`rounded-lg border-l-4 border-[#22D3EE] p-4 ${
                    isDarkMode ? 'bg-[#0B0C0E]' : 'bg-[#F9FAFB]'
                  }`}
                >
                  <div className="mb-2 flex items-center gap-3">
                    <span className="rounded-full bg-[#22D3EE]/20 px-3 py-1 text-sm font-semibold text-[#22D3EE]">
                      Day {day.day}
                    </span>
                    <h3 className={`font-bold text-lg ${
                      isDarkMode ? 'text-[#E0E7EE]' : 'text-[#1F2937]'
                    }`}>
                      {day.title}
                    </h3>
                  </div>
                  <p className={isDarkMode ? 'text-[#C9D6DF]' : 'text-[#6B7280]'}>
                    {day.description}
                  </p>
                  {day.activities && (
                    <div className="mt-3">
                      <p className={`mb-2 text-sm font-semibold ${
                        isDarkMode ? 'text-[#E0E7EE]' : 'text-[#1F2937]'
                      }`}>
                        Activities:
                      </p>
                      <ul className="space-y-1">
                        {day.activities.map((activity, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <FaCheck className="mt-1 shrink-0 text-[#22D3EE]" size={12} />
                            <span className={`text-sm ${
                              isDarkMode ? 'text-[#C9D6DF]' : 'text-[#6B7280]'
                            }`}>
                              {activity}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryModal;
