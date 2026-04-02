import PageLayout from '../components/layout/PageLayout';
import { useTheme } from '../context/ThemeContext';
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';
import cafeOne from '../assets/prefab house portable container cafe/prefab house portable container cafe/cafe 5.jpeg';
import cafeTwo from '../assets/prefab house portable container cafe/prefab house portable container cafe/cafe 6.jpg';
import cafeThree from '../assets/prefab house portable container cafe/prefab house portable container cafe/cafe 7.jpg';
import cafeHeroImg from '../assets/prefab house portable container cafe/prefab house portable container cafe/1-DSC09064.jpg';

const menuHighlights = [
  { title: '☕ Signature Coffee Bar', text: 'Enjoy freshly brewed drip coffee, espresso drinks, and handcrafted cafe favorites served throughout the day.' },
  { title: '🥐 Fresh Small Bites', text: 'A curated selection of light bites and cafe favorites, perfect for a quick breakfast, midday snack, or easy evening treat.' },
  { title: 'Seating & Atmosphere', text: 'Enjoy flexible seating designed for every kind of moment — from relaxed bench seating downstairs to elevated balcony views upstairs, where guests can unwind to the gentle sound of the creek. Inside, the upstairs container lounge offers a cozy cafe atmosphere and our signature Instagram wall.' },
  { title: '🤍 Guest-Centered Service', text: 'Friendly, welcoming service designed to make every visit feel easy and enjoyable for both guests and visitors.' }
];

const cafeTimings = [
  { label: 'Tuesday – Saturday', value: '7:30 AM – 2:30 PM' },
  { label: 'Sunday', value: '7:30 AM – 12:30 PM' },
  { label: 'Monday', value: 'Closed' }
];

const CreeksCafe = () => {
  const { isDarkMode } = useTheme();

  return (
    <PageLayout
      seo={{
        title: 'Creekside Cafe | The Tiny Escape',
        description:
          'Visit Creekside Cafe at The Tiny Escape for handcrafted coffee, fresh meals, and a premium creekside cafe experience.',
        keywords: 'Tiny Escape cafe, creekside cafe, artisan coffee, fresh meals',
        url: '/creeks-cafe'
      }}
    >
      <section
        className={`relative min-h-[calc(70svh-72px)] md:min-h-[72vh] flex items-end overflow-hidden ${
          isDarkMode ? 'bg-[#0B0C0E]' : 'bg-[#F8FAFC]'
        }`}
      >
        <img
          src={cafeHeroImg}
          alt="Creekside Cafe exterior"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/45 to-black/15" />

        <div className="relative container mx-auto px-4 pb-14 md:pb-20">
          <span className="inline-flex rounded-full border border-[#A8C9B1]/70 bg-[#1F3A2A]/65 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[#E7F0E6]">
            COFFEE • SMALL BITES • LOUNGE
          </span>
          <h1 className="mt-5 text-4xl md:text-6xl font-bold text-white">Creekside Cafe</h1>
          <p className="mt-4 max-w-3xl text-lg md:text-xl text-white/90 leading-relaxed">
            A cozy on-site cafe at The Tiny Escape, serving handcrafted coffee, specialty drinks, and a curated selection of fresh small bites in a relaxed, welcoming setting.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-14 md:py-20">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 items-start">
          <div className="grid grid-cols-2 gap-4 h-[480px] md:h-[540px]">
            {/* Left — tall portrait image */}
            <div className="relative overflow-hidden rounded-2xl shadow-lg">
              <img
                src={cafeThree}
                alt="Cafe seating area"
                className="absolute inset-0 w-full h-full object-cover object-center"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
            </div>

            {/* Right — two stacked images */}
            <div className="flex flex-col gap-4">
              <div className="relative flex-1 overflow-hidden rounded-2xl shadow-lg">
                <img
                  src={cafeOne}
                  alt="Coffee at Creekside Cafe"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/15 to-transparent" />
              </div>
              <div className="relative flex-1 overflow-hidden rounded-2xl shadow-lg">
                <img
                  src={cafeTwo}
                  alt="Cafe drinks"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/15 to-transparent" />
              </div>
            </div>
          </div>

          <div>
            <h2 className={`text-3xl md:text-4xl font-bold mb-5 ${isDarkMode ? 'text-[#E0E7EE]' : 'text-[#0F172A]'}`}>
              The Creekside Cafe experience
            </h2>
            <div className="space-y-4">
              {menuHighlights.map((item) => (
                <div
                  key={item.title}
                  className={`rounded-xl p-4 border ${
                    isDarkMode
                      ? 'bg-[#0F1419] border-[#1F2A33]'
                      : 'bg-white border-[#DDE8DD]'
                  }`}
                >
                  <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-[#E0E7EE]' : 'text-[#1F2A1F]'}`}>
                    {item.title}
                  </h3>
                  <p className={`mt-1 ${isDarkMode ? 'text-[#C9D6DF]' : 'text-[#475569]'}`}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-7 grid sm:grid-cols-3 gap-3">
              {cafeTimings.map((slot) => (
                <div
                  key={slot.label}
                  className={`rounded-xl border p-4 ${
                    isDarkMode
                      ? 'bg-[#0B0C0E] border-[#1F2A33]'
                      : 'bg-[#F8FAFC] border-[#DDE8DD]'
                  }`}
                >
                  <p className={`text-xs uppercase tracking-wider ${isDarkMode ? 'text-[#8B949E]' : 'text-[#64748B]'}`}>{slot.label}</p>
                  <p className={`mt-1 text-sm font-semibold ${isDarkMode ? 'text-[#E0E7EE]' : 'text-[#0F172A]'}`}>{slot.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Live Music Section */}
      <section className={`py-16 ${isDarkMode ? 'bg-[#0B0C0E]' : 'bg-white'}`}>
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <span className={`inline-block mb-4 text-xs font-semibold uppercase tracking-[0.2em] ${isDarkMode ? 'text-[#8B949E]' : 'text-[#64748B]'}`}>
            Live at the Cafe
          </span>
          <h2 className={`text-3xl md:text-4xl font-bold mb-5 ${isDarkMode ? 'text-[#E0E7EE]' : 'text-[#0F172A]'}`}>
            Live Music
          </h2>
          <p className={`text-lg md:text-xl leading-relaxed ${isDarkMode ? 'text-[#C9D6DF]' : 'text-[#475569]'}`}>
            On select evenings, Creekside Cafe features local up-and-coming musicians and acoustic artists, creating a relaxed and welcoming atmosphere for guests to enjoy. It's the perfect complement to great coffee, light bites, and the peaceful setting of The Tiny Escape.
          </p>
          <p className={`mt-4 text-base leading-relaxed ${isDarkMode ? 'text-[#C9D6DF]' : 'text-[#475569]'}`}>
            Follow us on social media for the latest live music schedule and upcoming artist nights.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <a
              href="https://www.facebook.com/creeksidecafetx"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Creekside Cafe on Facebook"
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                isDarkMode
                  ? 'bg-[#1F2A33] text-[#C9D6DF] hover:bg-[#1877F2] hover:text-white'
                  : 'bg-[#F0F4FF] text-[#1877F2] border border-[#C7D4F8] hover:bg-[#1877F2] hover:text-white'
              }`}
            >
              <FaFacebookF size={16} />
              Facebook
            </a>
            <a
              href="https://www.instagram.com/creeksidecafetx"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Creekside Cafe on Instagram"
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                isDarkMode
                  ? 'bg-[#1F2A33] text-[#C9D6DF] hover:bg-[#E1306C] hover:text-white'
                  : 'bg-[#FFF0F5] text-[#E1306C] border border-[#F8C7D8] hover:bg-[#E1306C] hover:text-white'
              }`}
            >
              <FaInstagram size={16} />
              Instagram
            </a>
            <a
              href="https://www.tiktok.com/@creeksidecafe"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Creekside Cafe on TikTok"
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                isDarkMode
                  ? 'bg-[#1F2A33] text-[#C9D6DF] hover:bg-[#010101] hover:text-white'
                  : 'bg-[#F5F5F5] text-[#010101] border border-[#D0D0D0] hover:bg-[#010101] hover:text-white'
              }`}
            >
              <FaTiktok size={16} />
              TikTok
            </a>
          </div>
        </div>
      </section>

      <section className={`py-16 ${isDarkMode ? 'bg-[#141A1F]' : 'bg-[#F3F8F3]'}`}>
        <div className="container mx-auto px-4">
          <div className={`rounded-3xl border overflow-hidden flex flex-col lg:flex-row items-start max-w-4xl mx-auto backdrop-blur-md ${
            isDarkMode ? 'bg-[#0F1419]/40 border-[#1F2A33]/50' : 'bg-white/30 border-[#DDE8DD]/60'
          }`}>
            <div className="flex-1 min-w-0 p-6 md:p-8">
              <h2 className={`text-2xl md:text-3xl font-bold whitespace-nowrap ${isDarkMode ? 'text-[#E0E7EE]' : 'text-[#0F172A]'}`}>
                Plan a Visit to Creekside Cafe
              </h2>
              <p className={`mt-3 text-lg ${isDarkMode ? 'text-[#C9D6DF]' : 'text-[#475569]'}`}>
                Visiting during your stay or stopping by locally? Contact us for questions, hours, or small gathering details.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/contact"
                  className={`px-6 py-3 rounded-xl font-semibold ${
                    isDarkMode
                      ? 'bg-linear-to-r from-[#1F3A2A] to-[#5F8C6A] text-[#F7FBF7]'
                      : 'bg-[#1F3A2A] text-[#F7FBF7]'
                  }`}
                >
                  Contact Us
                </a>
                <a
                  href="/tours"
                  className={`px-6 py-3 rounded-xl font-semibold border ${
                    isDarkMode
                      ? 'border-[#5F8C6A] text-[#A8C9B1]'
                      : 'border-[#1F3A2A] text-[#1F3A2A]'
                  }`}
                >
                  View Stays
                </a>
              </div>
            </div>
            <div className={`flex items-center justify-center p-5 ${isDarkMode ? 'bg-[#111820]' : 'bg-[#FBF7F2]'}`}>
              <div style={{ height: '262px', width: '279px', overflow: 'hidden', borderRadius: '1rem', flexShrink: 0 }}>
                <img
                  src={cafeOne}
                  alt="Creekside Cafe baked goods"
                  style={{ height: '100%', width: '100%', objectFit: 'cover', display: 'block' }}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default CreeksCafe;
