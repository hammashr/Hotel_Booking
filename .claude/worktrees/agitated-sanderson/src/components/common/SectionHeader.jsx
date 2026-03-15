const SectionHeader = ({
  title,
  accent,
  subtitle,
  align = 'center',
  isDarkMode = false,
  className = ''
}) => {
  const alignment = align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center';

  return (
    <header className={`${alignment} ${className}`}>
      <h2 className="text-4xl md:text-5xl font-bold mb-6">
        {title && (
          <span className={isDarkMode ? 'text-[#F2F6F9]' : 'text-[#1F2A1F]'}>{title} </span>
        )}
        {accent && (
          <span
            className={`bg-clip-text text-transparent ${
              isDarkMode
                ? 'bg-linear-to-r from-[#C9A36A] to-[#E7CFA2]'
                : 'bg-linear-to-r from-[#1F3A2A] to-[#5F8C6A]'
            }`}
          >
            {accent}
          </span>
        )}
      </h2>
      {subtitle && (
        <p className={`text-lg ${isDarkMode ? 'text-[#C4CCD4]' : 'text-[#3E4F3E]'}`}>
          {subtitle}
        </p>
      )}
    </header>
  );
};

export default SectionHeader;
