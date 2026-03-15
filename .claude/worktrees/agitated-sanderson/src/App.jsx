import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import UnderDevelopment from './pages/UnderDevelopment';
import TrackingScripts from './components/common/TrackingScripts';
import ScrollToTop from './components/common/ScrollToTop';
import RouteTracker from './components/common/RouteTracker';

const Home = lazy(() => import('./pages/Home'));
const Tours = lazy(() => import('./pages/Tours'));
const Destinations = lazy(() => import('./pages/Destinations'));
const DestinationDetail = lazy(() => import('./pages/DestinationDetail'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Pavillion = lazy(() => import('./pages/Pavillion'));
const CreeksCafe = lazy(() => import('./pages/CreeksCafe'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const BookNow = lazy(() => import('./pages/BookNow'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsConditions = lazy(() => import('./pages/TermsConditions'));

const LegacyDestinationRedirect = () => {
  const { slug } = useParams();
  return <Navigate to={`/stay/${slug}`} replace />;
};

const App = () => {
  return (
    <ThemeProvider>
      <HelmetProvider>
        <TrackingScripts />
        <BrowserRouter>
          <ScrollToTop />
          <RouteTracker />
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tours" element={<Tours />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/stay/:slug" element={<DestinationDetail />} />
              <Route path="/destination/:slug" element={<LegacyDestinationRedirect />} />
              <Route path="/pavillion" element={<Pavillion />} />
              <Route path="/fireside-pavilion" element={<Pavillion />} />
              <Route path="/creeks-cafe" element={<CreeksCafe />} />
              <Route path="/creekside-cafe" element={<CreeksCafe />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/book-now" element={<BookNow />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-conditions" element={<TermsConditions />} />
              <Route path="/under-development" element={<UnderDevelopment />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </HelmetProvider>
    </ThemeProvider>
  );
};

export default App;

