import { FaTelegram, FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa';

export const CompanyInfo = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-3xl font-bold text-footer-text tracking-tight">TripRadar</h3>
        <p className="text-footer-muted text-lg font-medium">AI-путешествия за один клик</p>
      </div>
      <div className="flex justify-center space-x-6">
        <a
          href="https://t.me/TripRadarBot"
          className="p-3 rounded-full bg-footer-text/10 text-footer-text hover:bg-footer-text/20 hover:scale-110 transition-all duration-200 shadow-sm"
          aria-label="Telegram"
        >
          <FaTelegram className="w-6 h-6" />
        </a>
        <a
          href="#"
          className="p-3 rounded-full bg-footer-text/10 text-footer-text hover:bg-footer-text/20 hover:scale-110 transition-all duration-200 shadow-sm"
          aria-label="Instagram"
        >
          <FaInstagram className="w-6 h-6" />
        </a>
        <a
          href="#"
          className="p-3 rounded-full bg-footer-text/10 text-footer-text hover:bg-footer-text/20 hover:scale-110 transition-all duration-200 shadow-sm"
          aria-label="Twitter"
        >
          <FaTwitter className="w-6 h-6" />
        </a>
        <a
          href="mailto:support@tripradar.com"
          className="p-3 rounded-full bg-footer-text/10 text-footer-text hover:bg-footer-text/20 hover:scale-110 transition-all duration-200 shadow-sm"
          aria-label="Email"
        >
          <FaEnvelope className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
};
