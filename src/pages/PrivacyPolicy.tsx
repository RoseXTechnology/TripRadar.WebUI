import { Link } from 'react-router-dom';
import {
  Shield,
  Lock,
  Eye,
  Database,
  Server,
  UserCheck,
  Globe,
  Mail,
  Clock,
  FileText,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  MapPin,
} from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 pt-16 animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex p-3 bg-primary-100 dark:bg-primary-900/20 rounded-full mb-4">
            <Shield className="h-8 w-8 text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Last updated: February 15, 2025</p>
        </div>

        {/* Introduction */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 mb-8 animate-slide-up">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            At TripRadar, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose,
            and safeguard your information when you use our travel management platform. Please read this privacy policy
            carefully. If you do not agree with the terms of this privacy policy, please do not access the application.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert
            you about any changes by updating the "Last updated" date of this Privacy Policy. You are encouraged to
            periodically review this Privacy Policy to stay informed of updates.
          </p>
        </div>

        {/* Information We Collect */}
        <div
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 mb-8 animate-slide-up"
          style={{ animationDelay: '0.1s' }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <Database className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Information We Collect</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Personal Data</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Personally identifiable information may include, but is not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Email address</li>
                <li>First name and last name</li>
                <li>Phone number</li>
                <li>Address, State, Province, ZIP/Postal code, City</li>
                <li>Payment information (stored securely through our payment processors)</li>
                <li>Travel preferences and history</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Usage Data</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We may also collect information on how the Service is accessed and used ("Usage Data"). This Usage Data
                may include information such as your computer's Internet Protocol address (e.g. IP address), browser
                type, browser version, the pages of our Service that you visit, the time and date of your visit, the
                time spent on those pages, unique device identifiers and other diagnostic data.
              </p>
            </div>
          </div>
        </div>

        {/* How We Use Your Information */}
        <div
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 mb-8 animate-slide-up"
          style={{ animationDelay: '0.2s' }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <Eye className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">How We Use Your Information</h2>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-4">We use the information we collect or receive:</p>

          <ul className="space-y-4">
            <li className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium text-gray-900 dark:text-white">To provide and maintain our Service</span>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Including monitoring the usage of our Service and managing your account.
                </p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium text-gray-900 dark:text-white">To process transactions</span>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  We may use the information you provide to process transactions and send you related information,
                  including confirmations and receipts.
                </p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium text-gray-900 dark:text-white">To send administrative information</span>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Such as changes to our terms, conditions, and policies.
                </p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium text-gray-900 dark:text-white">To provide customer support</span>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  To address and resolve your concerns and monitor and improve our customer service responses.
                </p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium text-gray-900 dark:text-white">To personalize your experience</span>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  To provide personalized content and information, including travel recommendations and trip planning
                  assistance.
                </p>
              </div>
            </li>
          </ul>
        </div>

        {/* Data Privacy and AI */}
        <div
          className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-8 mb-8 animate-slide-up"
          style={{ animationDelay: '0.3s' }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <Lock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-300">Data Privacy and AI</h2>
          </div>

          <p className="text-blue-800 dark:text-blue-200 mb-4">
            TripRadar is committed to privacy-first AI implementation:
          </p>

          <ul className="space-y-4">
            <li className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium text-blue-900 dark:text-blue-300">No Data Training</span>
                <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                  Your conversations and personal data are never used to train our AI models.
                </p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium text-blue-900 dark:text-blue-300">Local Processing</span>
                <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                  Whenever possible, AI processing happens locally on your device to minimize data transmission.
                </p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium text-blue-900 dark:text-blue-300">End-to-End Encryption</span>
                <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                  All communications with our AI assistants are encrypted end-to-end.
                </p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium text-blue-900 dark:text-blue-300">User Control</span>
                <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                  You have complete control over your AI interactions and can delete your data at any time.
                </p>
              </div>
            </li>
          </ul>
        </div>

        {/* Disclosure of Data */}
        <div
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 mb-8 animate-slide-up"
          style={{ animationDelay: '0.4s' }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <Globe className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Disclosure of Data</h2>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We may disclose your personal information in the following situations:
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Business Transactions</h3>
              <p className="text-gray-700 dark:text-gray-300">
                If we are involved in a merger, acquisition or asset sale, your Personal Data may be transferred. We
                will provide notice before your Personal Data is transferred and becomes subject to a different Privacy
                Policy.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Legal Requirements</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We may disclose your Personal Data in the good faith belief that such action is necessary to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mt-2">
                <li>Comply with a legal obligation</li>
                <li>Protect and defend the rights or property of TripRadar</li>
                <li>Prevent or investigate possible wrongdoing in connection with the Service</li>
                <li>Protect the personal safety of users of the Service or the public</li>
                <li>Protect against legal liability</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Service Providers</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We may employ third party companies and individuals to facilitate our Service ("Service Providers"), to
                provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how
                our Service is used. These third parties have access to your Personal Data only to perform these tasks
                on our behalf and are obligated not to disclose or use it for any other purpose.
              </p>
            </div>
          </div>
        </div>

        {/* Security of Data */}
        <div
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 mb-8 animate-slide-up"
          style={{ animationDelay: '0.5s' }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <Lock className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Security of Data</h2>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-4">
            The security of your data is important to us, but remember that no method of transmission over the Internet,
            or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to
            protect your Personal Data, we cannot guarantee its absolute security.
          </p>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <Server className="h-5 w-5 text-gray-600 dark:text-gray-400 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">Our Security Measures</h4>
                <ul className="list-disc pl-6 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <li>Encryption of sensitive data at rest and in transit</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Strict access controls and authentication procedures</li>
                  <li>Continuous monitoring for suspicious activities</li>
                  <li>Regular security training for all employees</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Your Data Protection Rights */}
        <div
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 mb-8 animate-slide-up"
          style={{ animationDelay: '0.6s' }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <UserCheck className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Data Protection Rights</h2>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled
            to the following:
          </p>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="p-1 bg-primary-100 dark:bg-primary-900/20 rounded-full mt-0.5">
                <div className="w-3 h-3 bg-primary-600 dark:bg-primary-400 rounded-full"></div>
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-white">The right to access</span>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  You have the right to request copies of your personal data.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-1 bg-primary-100 dark:bg-primary-900/20 rounded-full mt-0.5">
                <div className="w-3 h-3 bg-primary-600 dark:bg-primary-400 rounded-full"></div>
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-white">The right to rectification</span>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  You have the right to request that we correct any information you believe is inaccurate or incomplete.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-1 bg-primary-100 dark:bg-primary-900/20 rounded-full mt-0.5">
                <div className="w-3 h-3 bg-primary-600 dark:bg-primary-400 rounded-full"></div>
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-white">The right to erasure</span>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  You have the right to request that we erase your personal data, under certain conditions.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-1 bg-primary-100 dark:bg-primary-900/20 rounded-full mt-0.5">
                <div className="w-3 h-3 bg-primary-600 dark:bg-primary-400 rounded-full"></div>
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-white">The right to restrict processing</span>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  You have the right to request that we restrict the processing of your personal data, under certain
                  conditions.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-1 bg-primary-100 dark:bg-primary-900/20 rounded-full mt-0.5">
                <div className="w-3 h-3 bg-primary-600 dark:bg-primary-400 rounded-full"></div>
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-white">The right to data portability</span>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  You have the right to request that we transfer the data that we have collected to another
                  organization, or directly to you, under certain conditions.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                If you make a request, we have one month to respond to you. If you would like to exercise any of these
                rights, please contact us at our email:{' '}
                <a
                  href="mailto:privacy@tripradar.io"
                  className="underline hover:text-yellow-800 dark:hover:text-yellow-200"
                >
                  privacy@tripradar.io
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Cookies Policy */}
        <div
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 mb-8 animate-slide-up"
          style={{ animationDelay: '0.7s' }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Cookies Policy</h2>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Cookies are small pieces of text sent to your web browser by a website you visit. A cookie file is stored in
            your web browser and allows the Service or a third-party to recognize you and make your next visit easier
            and the Service more useful to you.
          </p>

          <p className="text-gray-700 dark:text-gray-300 mb-4">We use cookies for the following purposes:</p>

          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
            <li>To enable certain functions of the Service</li>
            <li>To provide analytics</li>
            <li>To store your preferences</li>
            <li>To enable authentication and session management</li>
          </ul>

          <p className="text-gray-700 dark:text-gray-300">
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if
            you do not accept cookies, you may not be able to use some portions of our Service.
          </p>

          <div className="mt-4">
            <Link
              to="/cookies"
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium flex items-center space-x-1"
            >
              <span>View our full Cookies Policy</span>
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Contact Us */}
        <div
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 animate-slide-up"
          style={{ animationDelay: '0.8s' }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <Mail className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Us</h2>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-6">
            If you have any questions about this Privacy Policy, please contact us:
          </p>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Mail className="h-5 w-5 text-gray-600 dark:text-gray-400 mt-0.5" />
              <div>
                <span className="font-medium text-gray-900 dark:text-white">By email:</span>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  <a
                    href="mailto:privacy@tripradar.io"
                    className="text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    privacy@tripradar.io
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-gray-600 dark:text-gray-400 mt-0.5" />
              <div>
                <span className="font-medium text-gray-900 dark:text-white">By mail:</span>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  TripRadar Inc.
                  <br />
                  123 Market Street, Suite 400
                  <br />
                  San Francisco, CA 94105
                  <br />
                  United States
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Clock className="h-5 w-5 text-gray-600 dark:text-gray-400 mt-0.5" />
              <div>
                <span className="font-medium text-gray-900 dark:text-white">Response time:</span>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  We aim to respond to all privacy-related inquiries within 48 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
