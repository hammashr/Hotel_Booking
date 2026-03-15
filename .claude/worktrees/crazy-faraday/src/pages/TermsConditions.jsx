import { useTheme } from '../context/ThemeContext';
import PageLayout from '../components/layout/PageLayout';
import PageHero from '../components/common/PageHero';
import { termsSections } from '../data/legalData';
import { FaFileContract } from 'react-icons/fa';

const TermsConditions = () => {
  const { isDarkMode } = useTheme();

  return (
    <PageLayout
      seo={{
        title: 'Terms & Conditions | The Tiny Escape',
        description: "Read Tiny Escape's terms and conditions for stays, cancellations, house rules, and other important information for guests.",
        keywords: 'terms and conditions, booking policy, cancellation policy, stay terms, Tiny Escape policies',
        url: '/terms-conditions'
      }}
    >
      <PageHero
        title="Terms & Conditions"
        subtitle="Last Updated: February 9, 2026"
        isDarkMode={isDarkMode}
      >
        <div className={`inline-block p-4 rounded-full mb-6 ${isDarkMode ? 'bg-[#22D3EE]/10' : 'bg-blue-50'}`}>
          <FaFileContract className={`text-5xl ${isDarkMode ? 'text-[#22D3EE]' : 'text-[#3B82F6]'}`} />
        </div>
      </PageHero>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className={`p-8 rounded-xl mb-8 ${isDarkMode ? 'bg-[#141A1F]' : 'bg-white border border-[#E2E8F0]'}`}>
              <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-[#C4CCD4]' : 'text-[#374151]'}`}>
                Welcome to Tiny Escape. These terms and conditions outline the rules and regulations for the use of our services and website. By booking a stay or using our services, you agree to comply with and be bound by the following terms.
              </p>
            </div>

            <div className="space-y-6">
              {termsSections.map((section, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl transition-all duration-300 hover:shadow-lg ${
                    isDarkMode ? 'bg-[#141A1F] hover:bg-[#1A2129]' : 'bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC]'
                  }`}
                >
                  <h2 className={`text-xl md:text-2xl font-bold mb-4 ${isDarkMode ? 'text-[#22D3EE]' : 'text-[#2563EB]'}`}>
                    {section.title}
                  </h2>
                  <p className={`leading-relaxed ${isDarkMode ? 'text-[#C4CCD4]' : 'text-[#475569]'}`}>
                    {section.content}
                  </p>
                </div>
              ))}
            </div>

            <div className={`mt-8 p-6 rounded-xl ${isDarkMode ? 'bg-[#141A1F]' : 'bg-blue-50 border border-[#BFDBFE]'} `}>
              <p className={`text-center ${isDarkMode ? 'text-[#C4CCD4]' : 'text-[#475569]'}`}>
                By using Tiny Escape services, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default TermsConditions;
