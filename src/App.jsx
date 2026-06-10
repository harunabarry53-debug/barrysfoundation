import { Routes, Route, Suspense, lazy } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './pages/admin/ProtectedRoute';

// Lazy load public site components
const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const WhatWeDo = lazy(() => import('./components/WhatWeDo'));
const Founder = lazy(() => import('./components/Founder'));
const ImpactDashboard = lazy(() => import('./components/ImpactDashboard'));
const Projects = lazy(() => import('./components/Projects'));
const SuccessStories = lazy(() => import('./components/SuccessStories'));
const GetInvolved = lazy(() => import('./components/GetInvolved'));
const Events = lazy(() => import('./components/Events'));
const News = lazy(() => import('./components/News'));
const Gallery = lazy(() => import('./components/Gallery'));
const Newsletter = lazy(() => import('./components/Newsletter'));
const Transparency = lazy(() => import('./components/Transparency'));
const Contact = lazy(() => import('./components/Contact'));

// Lazy load admin pages
const AdminLogin = lazy(() => import('./pages/admin/Login'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminDonations = lazy(() => import('./pages/admin/Donations'));
const AdminVolunteers = lazy(() => import('./pages/admin/Volunteers'));
const AdminPartners = lazy(() => import('./pages/admin/Partners'));
const AdminNewsletter = lazy(() => import('./pages/admin/Newsletter'));
const AdminContacts = lazy(() => import('./pages/admin/Contacts'));
const AdminEvents = lazy(() => import('./pages/admin/EventsAdmin'));
const AdminNews = lazy(() => import('./pages/admin/NewsAdmin'));

// Lazy load NotFound page
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

function PublicSite() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Suspense fallback={<LoadingFallback />}>
        <Hero />
        <About />
        <WhatWeDo />
        <Founder />
        <ImpactDashboard />
        <Projects />
        <SuccessStories />
        <Events />
        <News />
        <Gallery />
        <GetInvolved />
        <Newsletter />
        <Transparency />
        <Contact />
      </Suspense>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Public site */}
        <Route path="/" element={<PublicSite />} />

        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        
        {/* Protected admin routes with nested structure */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/donations" element={<AdminDonations />} />
          <Route path="/admin/volunteers" element={<AdminVolunteers />} />
          <Route path="/admin/partners" element={<AdminPartners />} />
          <Route path="/admin/newsletter" element={<AdminNewsletter />} />
          <Route path="/admin/contacts" element={<AdminContacts />} />
          <Route path="/admin/events" element={<AdminEvents />} />
          <Route path="/admin/news" element={<AdminNews />} />
        </Route>

        {/* Fallback - 404 page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
