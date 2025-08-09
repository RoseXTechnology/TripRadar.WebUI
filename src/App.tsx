import { AppProvider } from 'app/providers/AppContext';
import { AuthProvider } from 'app/providers/AuthContext';
import { useAuth } from 'app/providers/AuthContext';
import { ThemeProvider } from 'app/providers/ThemeContext';
import { ProtectedRoute } from 'features/auth';
import { Login, Signup, TestAccount } from 'features/auth';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimationProvider } from 'shared/ui/animation-provider';
import { CookiePolicy, PrivacyPolicy, SecurityPolicy, TermsOfService } from 'shared/ui/legal';
import { Footer } from 'widgets/footer';
import { Header } from 'widgets/header';
import { LandingHeader } from 'widgets/landing-header';

import { Budget } from './pages/budget';
import { CheckoutCancel, CheckoutSuccess } from './pages/checkout';
import { Dashboard } from './pages/dashboard';
import { About, Blog, Careers, ComingSoon, Discover, Features, Home, Pricing, Search } from './pages/marketing';
import { Billing, Notifications, Profile, Settings, TokenUsage } from './pages/profile';
import { ApiDocs, Contact, Feedback, HelpCenter } from './pages/support';
import { Scheduled, TripPlanning, Trips } from './pages/trips';

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
