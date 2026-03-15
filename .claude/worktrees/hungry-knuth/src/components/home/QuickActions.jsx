import React, { memo } from 'react';

const QuickActions = ({ isDarkMode }) => {
  const actions = [
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      ),
      label: 'Plan My Trip'
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      ),
      label: 'Request Quote'
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      ),
      label: 'Brochure'
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      ),
      label: '24/7 Support'
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      ),
      label: 'Best Deals',
      special: true
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      ),
      label: 'Insurance'
    }
  ];

  return (
    <section className="relative -mt-16 z-10 px-6">
      <div className="mx-auto max-w-7xl">
        <div className={`rounded-2xl border backdrop-blur-xl shadow-2xl overflow-hidden transition-colors duration-500 ${
          isDarkMode
            ? 'border-[rgba(34,211,238,0.15)] bg-[rgba(20,26,31,0.95)]'
            : 'border-[#E2E8F0] bg-[rgba(255,255,255,0.98)]'
        }`}>
          <div className={`flex flex-wrap items-center divide-x transition-colors duration-500 ${
            isDarkMode
              ? 'divide-[rgba(34,211,238,0.1)]'
              : 'divide-[#E2E8F0]'
          }`}>
            {actions.map((action, index) => (
              <button
                key={index}
                className={`group flex-1 min-w-[140px] flex flex-col items-center gap-2 px-4 py-4 transition-all duration-300 border-b-2 ${
                  action.special
                    ? 'border-[#FF6B6B] relative ' + (isDarkMode
                        ? 'bg-[rgba(255,107,107,0.1)] hover:bg-[rgba(255,107,107,0.15)]'
                        : 'bg-[rgba(255,107,107,0.08)] hover:bg-[rgba(255,107,107,0.12)]')
                    : 'border-transparent ' + (isDarkMode
                        ? 'hover:bg-[rgba(34,211,238,0.08)] hover:border-[#22D3EE]'
                        : 'hover:bg-[rgba(37,99,235,0.06)] hover:border-[#2563EB]')
                }`}
              >
                {action.special && (
                  <div className="absolute top-2 right-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B6B] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF6B6B]"></span>
                    </span>
                  </div>
                )}
                <svg 
                  className={`h-5 w-5 group-hover:scale-110 transition-transform ${
                    action.special
                      ? 'text-[#FF6B6B]'
                      : isDarkMode
                        ? 'text-[#22D3EE]'
                        : 'text-[#2563EB]'
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  {action.icon}
                </svg>
                <span className={`text-xs font-semibold transition-colors ${
                  action.special
                    ? 'text-[#FF6B6B] group-hover:text-[#FF8E53] font-bold'
                    : isDarkMode
                      ? 'text-[#C4CCD4] group-hover:text-[#22D3EE]'
                      : 'text-[#374151] group-hover:text-[#1D4ED8]'
                }`}>
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(QuickActions);
