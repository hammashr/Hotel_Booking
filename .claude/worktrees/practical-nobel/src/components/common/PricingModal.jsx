import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTimes, FaCheck, FaCalendar, FaUsers, FaStar } from 'react-icons/fa';

const PricingModal = ({ isOpen, onClose, destination, isDarkMode }) => {
  const [selectedDuration, setSelectedDuration] = useState('7'); // Default to 7 days

  if (!isOpen || !destination) return null;

  // Get pricing for selected duration
  const getCurrentPricing = () => {
    return destination.pricingByDuration?.[`${selectedDuration}days`] || destination.pricing;
  };

  const currentPricing = getCurrentPricing();
  const availableDurations = destination.pricingByDuration 
    ? Object.keys(destination.pricingByDuration).map(key => key.replace('days', ''))
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
          className={`relative w-full max-w-6xl rounded-2xl shadow-2xl ${
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
              {destination.name} - Pricing Plans
            </h2>
            <p className={`mt-2 ${isDarkMode ? 'text-[#C9D6DF]' : 'text-[#6B7280]'}`}>
              Choose your trip duration and package
            </p>
          </div>

          {/* Duration Selector */}
          <div className="p-6">
            <div className="mb-8">
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
                    {days} Days Trip
                  </button>
                ))}
              </div>
            </div>

            {/* Pricing Cards Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Basic Package */}
              <div
                className={`relative rounded-xl border-2 p-6 transition-all hover:scale-105 ${
                  isDarkMode 
                    ? 'border-gray-700 bg-[#0B0C0E]' 
                    : 'border-gray-200 bg-white shadow-lg'
                }`}
              >
                <h3 className={`mb-2 text-2xl font-bold ${
                  isDarkMode ? 'text-[#E0E7EE]' : 'text-[#1F2937]'
                }`}>
                  {currentPricing.basic.title}
                </h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-[#22D3EE]">
                    ${currentPricing.basic.price}
                  </span>
                  <span className={`ml-2 text-sm ${isDarkMode ? 'text-[#C9D6DF]' : 'text-[#6B7280]'}`}>
                    per person
                  </span>
                </div>

                <ul className="mb-6 space-y-3">
                  {currentPricing.basic.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <FaCheck className="mt-1 shrink-0 text-[#22D3EE]" size={14} />
                      <span className={`text-sm ${isDarkMode ? 'text-[#C9D6DF]' : 'text-[#4B5563]'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full rounded-lg py-3 font-semibold transition-all ${
                  isDarkMode
                    ? 'bg-[#0F1419] text-[#E0E7EE] hover:bg-gray-800 border border-gray-700'
                    : 'bg-gray-100 text-[#1F2937] hover:bg-gray-200'
                }`}>
                  Select Basic
                </button>
              </div>

              {/* Premium Package */}
              <div
                className={`relative rounded-xl border-2 border-[#22D3EE] p-6 shadow-xl shadow-[#22D3EE]/20 transition-all hover:scale-105`}
              >
                {/* Popular Badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#22D3EE] px-4 py-1 text-sm font-bold text-white">
                  <FaStar className="mr-1 inline" size={12} />
                  MOST POPULAR
                </div>

                <h3 className={`mb-2 mt-4 text-2xl font-bold ${
                  isDarkMode ? 'text-[#E0E7EE]' : 'text-[#1F2937]'
                }`}>
                  {currentPricing.premium.title}
                </h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-[#22D3EE]">
                    ${currentPricing.premium.price}
                  </span>
                  <span className={`ml-2 text-sm ${isDarkMode ? 'text-[#C9D6DF]' : 'text-[#6B7280]'}`}>
                    per person
                  </span>
                </div>

                <ul className="mb-6 space-y-3">
                  {currentPricing.premium.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <FaCheck className="mt-1 shrink-0 text-[#22D3EE]" size={14} />
                      <span className={`text-sm ${isDarkMode ? 'text-[#C9D6DF]' : 'text-[#4B5563]'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button className="w-full rounded-lg bg-[#22D3EE] py-3 font-semibold text-white transition-all hover:bg-[#4DBBFF]">
                  Select Premium
                </button>
              </div>

              {/* Ultimate Package */}
              <div
                className={`relative rounded-xl border-2 p-6 transition-all hover:scale-105 ${
                  isDarkMode 
                    ? 'border-gray-700 bg-[#0B0C0E]' 
                    : 'border-gray-200 bg-white shadow-lg'
                }`}
              >
                <h3 className={`mb-2 text-2xl font-bold ${
                  isDarkMode ? 'text-[#E0E7EE]' : 'text-[#1F2937]'
                }`}>
                  {currentPricing.ultimate.title}
                </h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-[#22D3EE]">
                    ${currentPricing.ultimate.price}
                  </span>
                  <span className={`ml-2 text-sm ${isDarkMode ? 'text-[#C9D6DF]' : 'text-[#6B7280]'}`}>
                    per person
                  </span>
                </div>

                <ul className="mb-6 space-y-3">
                  {currentPricing.ultimate.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <FaCheck className="mt-1 shrink-0 text-[#22D3EE]" size={14} />
                      <span className={`text-sm ${isDarkMode ? 'text-[#C9D6DF]' : 'text-[#4B5563]'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full rounded-lg py-3 font-semibold transition-all ${
                  isDarkMode
                    ? 'bg-[#0F1419] text-[#E0E7EE] hover:bg-gray-800 border border-gray-700'
                    : 'bg-gray-100 text-[#1F2937] hover:bg-gray-200'
                }`}>
                  Select Ultimate
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingModal;
