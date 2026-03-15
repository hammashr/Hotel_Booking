import { useTheme } from '../context/ThemeContext';
import PageLayout from '../components/layout/PageLayout';
import PageHero from '../components/common/PageHero';
import { privacySections } from '../data/legalData';
import { FaShieldAlt } from 'react-icons/fa';

const PrivacyPolicy = () => {
  const { isDarkMode } = useTheme();

  return (
    <PageLayout
      seo={{
        title: 'Privacy Policy | The Tiny Escape',
        description: 'Learn how Tiny Escape collects, uses, and protects your personal information. Read our privacy policy for details on data security and your rights.',
        keywords: 'privacy policy, data protection, personal information, data security, Tiny Escape privacy',
        url: '/privacy-policy'
      }}
    >
      <PageHero
        title="Privacy Policy"
        subtitle="Last Updated: February 9, 2026"
        isDarkMode={isDarkMode}
      >
        <div className={`inline-block p-4 rounded-full mb-6 ${isDarkMode ? 'bg-[#22D3EE]/10' : 'bg-blue-50'}`}>
          <FaShieldAlt className={`text-5xl ${isDarkMode ? 'text-[#22D3EE]' : 'text-[#3B82F6]'}`} />
        </div>
      </PageHero>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className={`p-8 rounded-xl mb-8 ${isDarkMode ? 'bg-[#141A1F]' : 'bg-white border border-[#E2E8F0]'}`}>
              <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-[#C4CCD4]' : 'text-[#374151]'}`}>
                At Tiny Escape, we are committed to protecting your privacy and ensuring the security of your personal information. This privacy policy explains how we collect, use, share, and protect your data when you use our services or visit our website.
              </p>
            </div>

            <div className="space-y-6">
              {privacySections.map((section, index) => (
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
                Your privacy is important to us. If you have any questions or concerns about how we handle your personal information, please don't hesitate to contact us.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default PrivacyPolicy;
