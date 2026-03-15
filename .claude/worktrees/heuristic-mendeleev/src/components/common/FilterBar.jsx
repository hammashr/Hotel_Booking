import { FaFilter } from 'react-icons/fa';

/**
 * Reusable FilterBar Component
 * Used in Gallery, Tours, Destinations, Reviews pages
 * Provides consistent filtering UI
 */

const FilterBar = ({ 
  filters = [], 
  activeFilters = {}, 
  onFilterChange, 
  isDarkMode = false,
  className = '' 
}) => {
  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`}>
      <div className="flex items-center gap-2">
        <FaFilter className={isDarkMode ? 'text-[#22D3EE]' : 'text-[#3B82F6]'} />
        <span className={`font-semibold ${isDarkMode ? 'text-[#E0E7EE]' : 'text-[#1F2937]'}`}>
          Filter:
        </span>
      </div>

      {filters.map((filter) => (
        <div key={filter.id} className="flex flex-wrap gap-2">
          {filter.options.map((option) => (
            <button
              key={option.value}
              onClick={() => onFilterChange(filter.id, option.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeFilters[filter.id] === option.value
                  ? isDarkMode
                    ? 'bg-linear-to-r from-[#22D3EE] to-[#4DBBFF] text-[#0B0C0E]'
                    : 'bg-linear-to-r from-[#3B82F6] to-[#60A5FA] text-white'
                  : isDarkMode
                  ? 'bg-[#141A1F] text-[#C4CCD4] hover:bg-[#1E242B]'
                  : 'bg-gray-100 text-[#4A5568] hover:bg-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FilterBar;
