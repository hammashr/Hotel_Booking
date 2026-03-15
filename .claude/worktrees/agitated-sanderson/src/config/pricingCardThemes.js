/**
 * Centralized themes for PricingCard variants.
 * Keeps gradients and accent styling consistent across pages.
 */
export const PRICING_CARD_THEMES = {
  budgetTour: {
    gradients: [
      'from-[#0B0C0E] to-[#22C55E]',
      'from-[#0B0C0E] to-[#10B981]',
      'from-[#0B0C0E] to-[#34D399]'
    ],
    accentClass: 'text-green-300',
    accentBorderClass: 'border-green-400',
    accentBgClass: 'bg-green-600 text-white',
    footerLabel: 'Budget Tour',
    footerText: 'Trusted guides and smart savings'
  },
  corporateTour: {
    gradients: [
      'from-[#0B0C0E] to-[#2563EB]',
      'from-[#0B0C0E] to-[#4F46E5]'
    ],
    accentClass: 'text-blue-300',
    accentBorderClass: 'border-blue-400',
    accentBgClass: 'bg-blue-600 text-white',
    footerLabel: 'Corporate Retreat',
    footerText: 'Executive planning and premium logistics'
  },
  familyTour: {
    gradients: [
      'from-[#0B0C0E] to-[#2563EB]',
      'from-[#0B0C0E] to-[#22D3EE]'
    ],
    accentClass: 'text-blue-300',
    accentBorderClass: 'border-blue-400',
    accentBgClass: 'bg-blue-600 text-white'
  },
  transportVehicle: {
    gradients: [
      'from-[#111827] to-[#22C55E]',
      'from-[#111827] to-[#10B981]',
      'from-[#111827] to-[#34D399]',
      'from-[#1F2937] to-[#16A34A]',
      'from-[#1F2937] to-[#4ADE80]'
    ],
    accentClass: 'text-emerald-300',
    accentBorderClass: 'border-emerald-400',
    accentBgClass: 'bg-emerald-600 text-white',
    footerLabel: 'Includes',
    footerText: 'Driver, fuel, and route planning'
  },
  transportService: {
    gradients: [
      'from-[#111827] to-[#22C55E]',
      'from-[#111827] to-[#34D399]',
      'from-[#111827] to-[#10B981]',
      'from-[#1F2937] to-[#4ADE80]'
    ],
    accentClass: 'text-emerald-300',
    accentBorderClass: 'border-emerald-400',
    footerLabel: 'Service',
    footerText: 'Flexible options for your itinerary'
  },
  insurancePlan: {
    gradients: [
      'from-[#0B0C0E] to-[#14B8A6]',
      'from-[#0B0C0E] to-[#22D3EE]',
      'from-[#0B0C0E] to-[#38BDF8]'
    ],
    accentClass: 'text-teal-300',
    accentBorderClass: 'border-teal-400',
    accentBgClass: 'bg-teal-600 text-white',
    footerLabel: 'Coverage',
    footerText: 'Medical, evacuation, baggage & cancellation'
  },
  visaType: {
    gradients: [
      'from-[#111827] to-[#F97316]',
      'from-[#111827] to-[#F59E0B]',
      'from-[#111827] to-[#FB923C]'
    ],
    accentClass: 'text-orange-300',
    accentBorderClass: 'border-orange-400',
    accentBgClass: 'bg-orange-600 text-white',
    footerLabel: 'Support',
    footerText: 'Application review and guidance'
  },
  photographyPackage: {
    gradients: [
      'from-[#111827] to-[#6366F1]',
      'from-[#111827] to-[#A855F7]',
      'from-[#111827] to-[#38BDF8]',
      'from-[#1F2937] to-[#7C3AED]'
    ],
    accentClass: 'text-indigo-300',
    accentBorderClass: 'border-indigo-400',
    accentBgClass: 'bg-indigo-600 text-white',
    footerLabel: 'Includes',
    footerText: 'Edited photos with delivery'
  },
  photographyAddon: {
    gradients: [
      'from-[#111827] to-[#8B5CF6]',
      'from-[#111827] to-[#6366F1]',
      'from-[#111827] to-[#3B82F6]',
      'from-[#1F2937] to-[#06B6D4]'
    ],
    accentClass: 'text-indigo-300',
    accentBorderClass: 'border-indigo-400',
    footerLabel: 'Add-On',
    footerText: 'Flexible upgrades for your shoot'
  },
  hotelCategory: {
    gradients: [
      'from-[#0B0C0E] to-[#38BDF8]',
      'from-[#0B0C0E] to-[#6366F1]',
      'from-[#0B0C0E] to-[#A855F7]'
    ],
    accentClass: 'text-blue-300',
    accentBorderClass: 'border-blue-400',
    accentBgClass: 'bg-blue-600 text-white',
    footerLabel: 'Category',
    footerText: 'Ideal for overseas travelers'
  },
  hotelProperty: {
    gradients: [
      'from-[#0B0C0E] to-[#3B82F6]',
      'from-[#0B0C0E] to-[#6366F1]',
      'from-[#0B0C0E] to-[#22D3EE]',
      'from-[#0B0C0E] to-[#60A5FA]'
    ],
    accentClass: 'text-blue-300',
    accentBorderClass: 'border-blue-400',
    accentBgClass: 'bg-blue-600 text-white',
    footerLabel: 'Stay'
  },
  destinationPricing: {
    gradients: [
      'from-[#1F3A2A] to-[#5F8C6A]',
      'from-[#2F5D3A] to-[#7BAF7C]',
      'from-[#254736] to-[#6E9B72]'
    ],
    accentClass: 'text-[#7BAF7C]',
    accentBorderClass: 'border-[#5F8C6A]',
    accentBgClass: 'bg-[#2F5D3A] text-white',
    footerLabel: 'Check-in',
    footerText: '3:00 PM • Check-out 11:00 AM'
  }
};

export const getPricingCardTheme = (key, index = 0) => {
  const theme = PRICING_CARD_THEMES[key];
  if (!theme) {
    return { gradient: undefined };
  }

  const { gradients = [], ...rest } = theme;
  const gradient = gradients.length ? gradients[index % gradients.length] : undefined;

  return {
    gradient,
    ...rest
  };
};
