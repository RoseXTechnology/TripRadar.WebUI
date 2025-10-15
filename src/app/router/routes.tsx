import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from 'features/auth';
import { Login, Signup } from 'features/auth';
import { EmailSent } from 'pages/auth';
import { Home } from 'pages/marketing/ui/Home';
import { Pricing } from 'pages/marketing/ui/Pricing';
import Profile from 'pages/profile/ui/Profile';
import { PrivacyPolicy, TermsOfService } from 'shared/ui/legal';

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/email-sent" element={<EmailSent />} />
      <Route path="/" element={<Home />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsOfService />} />

      {/* Protected Routes */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
