import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import PageLayout from '../components/layout/PageLayout';
import config from '../config';
import tinyEscape3 from '../assets/tiny escape 3.jpg';

const About = () => {
  const { isDarkMode } = useTheme();

  const values = [
    {
      icon: (
        <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: 'Calm & Care',
      description: 'Comfort-first, quiet, and easy pace.',
    },
    {
      icon: (
        <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Trust & Transparency',
      description: 'Clear communication and no surprises.',
    },
    {
      icon: (
        <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      title: 'Excellence',
      description: 'Thoughtful design and consistent quality.',
    },
    {
      icon: (
        <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
        </svg>
      ),
      title: 'Local Roots',
      description: 'Proud to build in Central Texas.',
    },
  ];

  const stats = [
    { number: '4', label: 'Tiny Homes' },
    { number: '4.9★', label: 'Guest Rating' },
    { number: '60+', label: 'Guest Reviews' },
    { number: '25mi', label: 'From Waco' },
  ];

  const structuredData = useMemo(() => {
    const siteUrl = (config.site.url || '').replace(/\/$/, '');
    return {
      '@context': 'https://schema.org',
      '@type': 'LodgingBusiness',
      name: 'The Tiny Escape',
      description: 'Design-forward tiny homes and cabin stays in Central Texas.',
      url: siteUrl,
      foundingDate: '2022',
    };
  }, []);

  return (
    <PageLayout
      seo={{
        title: 'About The Tiny Escape | Tiny Home Stays in Texas',
        description:
          'Meet the team behind The Tiny Escape. We design calm, design-forward tiny home stays in Bruceville-Eddy, Texas.',
        keywords: 'Tiny Escape team, Texas tiny home stays, cabin resort, Central Texas lodging',
        url: '/about',
        structuredData,
      }}
    >
      {/* ── Hero ── */}
      <section
        className={`relative min-h-[52vh] flex items-center justify-center overflow-hidden pt-24 pb-16 ${
          isDarkMode ? 'bg-[#0F0D0A]' : 'bg-[#F5F9F3]'
        }`}
      >
        {/* Subtle background texture */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(${tinyEscape3})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div
          className={`absolute inset-0 ${
            isDarkMode
              ? 'bg-gradient-to-b from-[#0F0D0A]/90 via-[#0F0D0A]/80 to-[#0F0D0A]/95'
              : 'bg-gradient-to-b from-[#F5F9F3]/90 via-[#F5F9F3]/80 to-[#F5F9F3]/95'
          }`}
        />

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <p
            className={`text-xs uppercase tracking-[0.22em] font-bold mb-5 ${
              isDarkMode ? 'text-[#A8E6A3]' : 'text-[#2F5D3A]'
            }`}
          >
            Our Story
          </p>
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-6 ${
              isDarkMode ? 'text-[#F2EEE7]' : 'text-[#1F2A1F]'
            }`}
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            About The Tiny Escape
          </h1>
          <p
            className={`text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-10 ${
              isDarkMode ? 'text-[#C4B9A8]' : 'text-[#3E4F3E]'
            }`}
          >
            A thoughtfully curated tiny home village created for slow mornings, open skies, and meaningful time away — nestled in Bruceville-Eddy, Texas.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/tours"
              className={`inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 shadow-lg ${
                isDarkMode
                  ? 'bg-[#2F5D3A] text-white hover:bg-[#3A7048]'
                  : 'bg-[#1F3A2A] text-white hover:bg-[#2F5D3A]'
              }`}
            >
              Browse Stays
            </Link>
            <Link
              to="/contact"
              className={`inline-flex items-center gap-2 rounded-xl border-2 px-7 py-3.5 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 ${
                isDarkMode
                  ? 'border-[#A8E6A3] text-[#A8E6A3] hover:bg-[rgba(168,230,163,0.1)]'
                  : 'border-[#1F3A2A] text-[#1F3A2A] hover:bg-[rgba(31,58,42,0.08)]'
              }`}
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section
        className={`py-12 border-y ${
          isDarkMode
            ? 'bg-[#120F0C] border-[rgba(201,163,106,0.15)]'
            : 'bg-white border-[#DDE8DD]'
        }`}
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div
                  className={`text-3xl sm:text-4xl font-bold mb-1 ${
                    isDarkMode ? 'text-[#A8E6A3]' : 'text-[#2F5D3A]'
                  }`}
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {stat.number}
                </div>
                <div
                  className={`text-sm font-medium ${
                    isDarkMode ? 'text-[#A79C8C]' : 'text-[#4B5F4B]'
                  }`}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section
        className={`py-16 md:py-24 ${
          isDarkMode ? 'bg-[#0F0D0A]' : 'bg-[#F5F9F3]'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p
                className={`text-xs uppercase tracking-[0.22em] font-bold mb-4 ${
                  isDarkMode ? 'text-[#A8E6A3]' : 'text-[#2F5D3A]'
                }`}
              >
                Why We Exist
              </p>
              <h2
                className={`text-3xl sm:text-4xl font-bold mb-6 ${
                  isDarkMode ? 'text-[#F2EEE7]' : 'text-[#1F2A1F]'
                }`}
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Built for Rest & Reconnection
              </h2>
              <p
                className={`text-base sm:text-lg leading-relaxed mb-5 ${
                  isDarkMode ? 'text-[#C4B9A8]' : 'text-[#3E4F3E]'
                }`}
              >
                The Tiny Escape began as a simple idea: create a place where people can step away from the noise and come back to what matters. Tucked into Bruceville-Eddy, Texas, our tiny home village was built for slow mornings, golden hour walks, and the kind of quiet that resets you.
              </p>
              <p
                className={`text-base sm:text-lg leading-relaxed ${
                  isDarkMode ? 'text-[#C4B9A8]' : 'text-[#3E4F3E]'
                }`}
              >
                This isn't just a place to sleep — it's a place to linger. Start your day at Creekside Cafe, cool off in our container pools, gather under the stars, or book a guided horseback ride to experience Central Texas in a way that feels both grounded and unforgettable.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { title: 'Design-Forward Stays', desc: 'Warm, intentional interiors made for comfort and ease.' },
                { title: 'Creekside Cafe', desc: 'Coffee + small bites in a cozy on-property setting.' },
                { title: 'On-Property Experiences', desc: 'Guided horseback riding, pools, and starry nights.' },
                { title: 'Spaces to Gather', desc: 'From the grand firepit to our pavilion plans ahead.' },
              ].map((item) => (
                <div
                  key={item.title}
                  className={`rounded-2xl p-5 border ${
                    isDarkMode
                      ? 'bg-[#16120F] border-[rgba(201,163,106,0.2)]'
                      : 'bg-white border-[#DDE8DD]'
                  }`}
                >
                  <h3
                    className={`text-sm font-bold mb-2 ${
                      isDarkMode ? 'text-[#F2EEE7]' : 'text-[#1F2A1F]'
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed ${
                      isDarkMode ? 'text-[#A79C8C]' : 'text-[#4B5F4B]'
                    }`}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Family-Owned, Guest-Focused ── */}
      <section
        className={`py-16 md:py-24 ${
          isDarkMode
            ? 'bg-gradient-to-b from-[#120F0C] to-[#0F0D0A]'
            : 'bg-gradient-to-b from-[#EAF3EA] to-[#F5F9F3]'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <p
              className={`text-xs uppercase tracking-[0.22em] font-bold mb-4 ${
                isDarkMode ? 'text-[#A8E6A3]' : 'text-[#2F5D3A]'
              }`}
            >
              The People Behind It
            </p>
            <h2
              className={`text-3xl sm:text-4xl font-bold mb-4 ${
                isDarkMode ? 'text-[#F2EEE7]' : 'text-[#1F2A1F]'
              }`}
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Family-Owned, Guest-Focused
            </h2>
            <p className={`max-w-2xl mx-auto text-base sm:text-lg leading-relaxed ${isDarkMode ? 'text-[#C4B9A8]' : 'text-[#3E4F3E]'}`}>
              The Tiny Escape is proudly family-owned and operated, built on a shared passion for creating peaceful, memorable stays in Central Texas. We're hands-on with the details — from the way each home feels to the experiences offered on property — so every guest can arrive, unwind, and leave feeling restored.
            </p>
          </div>

        </div>
      </section>

      {/* ── Values ── */}
      <section
        className={`py-16 md:py-24 ${
          isDarkMode ? 'bg-[#0F0D0A]' : 'bg-white'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-14">
            <p
              className={`text-xs uppercase tracking-[0.22em] font-bold mb-4 ${
                isDarkMode ? 'text-[#A8E6A3]' : 'text-[#2F5D3A]'
              }`}
            >
              What We Stand For
            </p>
            <h2
              className={`text-3xl sm:text-4xl font-bold ${
                isDarkMode ? 'text-[#F2EEE7]' : 'text-[#1F2A1F]'
              }`}
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Our Core Values
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => (
              <div
                key={idx}
                className={`rounded-2xl border p-6 text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-lg ${
                  isDarkMode
                    ? 'bg-[#16120F] border-[rgba(201,163,106,0.2)]'
                    : 'bg-[#F5F9F3] border-[#DDE8DD]'
                }`}
              >
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 ${
                    isDarkMode ? 'bg-[#1F3A2A] text-[#A8E6A3]' : 'bg-[#EAF3EA] text-[#2F5D3A]'
                  }`}
                >
                  {value.icon}
                </div>
                <h3
                  className={`text-lg font-bold mb-3 ${
                    isDarkMode ? 'text-[#F2EEE7]' : 'text-[#1F2A1F]'
                  }`}
                >
                  {value.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    isDarkMode ? 'text-[#A79C8C]' : 'text-[#4B5F4B]'
                  }`}
                >
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className={`py-16 md:py-20 ${
          isDarkMode ? 'bg-[#120F0C]' : 'bg-[#EAF3EA]'
        }`}
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <h2
            className={`text-3xl sm:text-4xl font-bold mb-4 ${
              isDarkMode ? 'text-[#F2EEE7]' : 'text-[#1F2A1F]'
            }`}
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Ready for Your Tiny Escape?
          </h2>
          <p
            className={`text-base sm:text-lg mb-8 ${
              isDarkMode ? 'text-[#A79C8C]' : 'text-[#4B5F4B]'
            }`}
          >
            Book your calm, design-forward stay and experience The Tiny Escape for yourself.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/tours"
              className={`inline-flex items-center gap-2 rounded-xl px-8 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 shadow-lg ${
                isDarkMode
                  ? 'bg-[#2F5D3A] text-white hover:bg-[#3A7048]'
                  : 'bg-[#1F3A2A] text-white hover:bg-[#2F5D3A]'
              }`}
            >
              Browse Stays
            </Link>
            <Link
              to="/contact"
              className={`inline-flex items-center gap-2 rounded-xl border-2 px-8 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 ${
                isDarkMode
                  ? 'border-[#A8E6A3] text-[#A8E6A3] hover:bg-[rgba(168,230,163,0.1)]'
                  : 'border-[#1F3A2A] text-[#1F3A2A] hover:bg-[rgba(31,58,42,0.08)]'
              }`}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
