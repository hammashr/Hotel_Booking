/**
 * Reusable PageHero Component
 * Used across multiple pages for consistent hero sections
 * Eliminates duplicate hero section code
 */

const PageHero = ({ 
  title, 
  subtitle, 
  badge,
  gradient = true,
  isDarkMode = false,
  className = '',
  children 
}) => {
  return (
    <section
      className={`relative py-20 overflow-hidden ${
        isDarkMode 
          ? 'bg-linear-to-br from-[#0B0C0E] via-[#171310] to-[#0B0C0E]' 
          : 'bg-linear-to-br from-[#FFFDF9] via-[#F7EFE6] to-[#FFF9F1]'
      } ${className}`}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          {badge && (
            <div className={`inline-block px-4 py-2 rounded-full mb-6 ${
              isDarkMode ? 'bg-[#C9A36A]/10 border border-[#C9A36A]' : 'bg-[#F2E7DA] border border-[#D9B882]'
            }`}>
              {typeof badge === 'string' ? (
                <span className={`text-sm font-semibold ${
                  isDarkMode ? 'text-[#E7CFA2]' : 'text-[#8A6B45]'
                }`}>
                  {badge}
                </span>
              ) : (
                badge
              )}
            </div>
          )}

          {/* Title */}
          {title && (
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${
                gradient
                  ? isDarkMode
                    ? 'bg-linear-to-r from-[#C9A36A] to-[#E7CFA2]'
                    : 'bg-linear-to-r from-[#8A6B45] to-[#C9A36A]'
                  : isDarkMode
                  ? 'text-[#E0E7EE]'
                  : 'text-[#1F2937]'
              } ${gradient ? 'bg-clip-text text-transparent' : ''}`}
            >
              {title}
            </h1>
          )}

          {/* Subtitle */}
          {subtitle && (
            <p className={`text-lg md:text-xl mb-8 ${
              isDarkMode ? 'text-[#C4CCD4]' : 'text-[#5B4A3A]'
            }`}>
              {subtitle}
            </p>
          )}

          {/* Custom content */}
          {children}
        </div>
      </div>
    </section>
  );
};

export default PageHero;
