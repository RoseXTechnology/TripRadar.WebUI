import { Route, Routes } from 'react-router-dom';
import { Login, ProtectedRoute, Signup } from 'features/auth';
import { EmailConfirmation, EmailConfirmed, EmailSent, ForgotPassword, ResetPassword } from 'pages/auth';
import { Home } from 'pages/marketing/ui/Home';
import { Pricing } from 'pages/marketing/ui/Pricing';
import { Profile } from 'pages/profile/ui/Profile';
import { ProfileEdit } from 'pages/profile/ui/ProfileEdit';
import { PrivacyPolicy, TermsOfService } from 'shared/ui/legal';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/email-sent" element={<EmailSent />} />
      <Route path="/email-confirmed" element={<EmailConfirmed />} />
      <Route path="/confirm-email/:username" element={<EmailConfirmation />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
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
      <Route
        path="/profile/edit"
        element={
          <ProtectedRoute>
            <ProfileEdit />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
