import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AnimationProvider } from './components/AnimationProvider';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Footer from './components/Layout/Footer';
import Header from './components/Layout/Header';
import LandingHeader from './components/Layout/LandingHeader';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import About from './pages/About';
import ApiDocs from './pages/ApiDocs';
import Billing from './pages/Billing';
import Blog from './pages/Blog';
import Budget from './pages/Budget';
import Careers from './pages/Careers';
import CheckoutCancel from './pages/CheckoutCancel';
import CheckoutSuccess from './pages/CheckoutSuccess';
import ComingSoon from './pages/ComingSoon';
import Contact from './pages/Contact';
import CookiePolicy from './pages/CookiePolicy';
import Dashboard from './pages/Dashboard';
import Discover from './pages/Discover';
import Features from './pages/Features';
import Feedback from './pages/Feedback';
import HelpCenter from './pages/HelpCenter';
import Home from './pages/Home';
import Login from './pages/Login';
import Notifications from './pages/Notifications';
import Pricing from './pages/Pricing';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Profile from './pages/Profile';
import Scheduled from './pages/Scheduled';
import Search from './pages/Search';
import SecurityPolicy from './pages/SecurityPolicy';
import Settings from './pages/Settings';
import Signup from './pages/Signup';
import TermsOfService from './pages/TermsOfService';
import TestAccount from './pages/TestAccount';
import TokenUsage from './pages/TokenUsage';
import TripPlanning from './pages/TripPlanning';
import Trips from './pages/Trips';

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Conditional Header */}
      {isAuthenticated ? <Header /> : <LandingHeader />}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/search" element={<Search />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blog/new" element={<Blog />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/api-docs" element={<ApiDocs />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/cookies" element={<CookiePolicy />} />
          <Route path="/security" element={<SecurityPolicy />} />
          <Route path="/test-account" element={<TestAccount />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/checkout/cancel" element={<CheckoutCancel />} />
          <Route path="/coming-soon" element={<ComingSoon />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trips"
            element={
              <ProtectedRoute>
                <Trips />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trips/:id"
            element={
              <ProtectedRoute>
                <TripPlanning />
              </ProtectedRoute>
            }
          />
          <Route
            path="/budget"
            element={
              <ProtectedRoute>
                <Budget />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/feedback"
            element={
              <ProtectedRoute>
                <Feedback />
              </ProtectedRoute>
            }
          />
          <Route
            path="/scheduled"
            element={
              <ProtectedRoute>
                <Scheduled />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trip-planning"
            element={
              <ProtectedRoute>
                <TripPlanning />
              </ProtectedRoute>
            }
          />
          <Route
            path="/billing"
            element={
              <ProtectedRoute>
                <Billing />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings/usage"
            element={
              <ProtectedRoute>
                <TokenUsage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <AppProvider>
            <AnimationProvider>
              <AppContent />
            </AnimationProvider>
          </AppProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
