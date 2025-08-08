import { Link } from 'react-router-dom';
import { FileText, Scale, AlertTriangle, Shield, Globe, CreditCard, Mail, Clock, HelpCircle } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 pt-16 animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex p-3 bg-primary-100 dark:bg-primary-900/20 rounded-full mb-4">
            <Scale className="h-8 w-8 text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Terms of Service</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Last updated: February 15, 2025</p>
        </div>

        {/* Introduction */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            These Terms of Service ("Terms") govern your use of the TripRadar website and application (the "Service")
            operated by TripRadar Inc. ("us", "we", or "our").
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of
            the terms, then you may not access the Service.
          </p>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                Please read these Terms carefully before using our Service. By using TripRadar, you acknowledge that you
                have read and understood these Terms and agree to be bound by them.
              </p>
            </div>
          </div>
        </div>

        {/* Accounts */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Accounts</h2>
          </div>

          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              When you create an account with us, you must provide information that is accurate, complete, and current
              at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate
              termination of your account on our Service.
            </p>

            <p className="text-gray-700 dark:text-gray-300">
              You are responsible for safeguarding the password that you use to access the Service and for any
              activities or actions under your password, whether your password is with our Service or a third-party
              service.
            </p>

            <p className="text-gray-700 dark:text-gray-300">
              You agree not to disclose your password to any third party. You must notify us immediately upon becoming
              aware of any breach of security or unauthorized use of your account.
            </p>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Account Requirements:</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li>You must be at least 18 years old to create an account</li>
                <li>You must provide a valid email address for verification</li>
                <li>You must create a secure password (minimum 8 characters)</li>
                <li>You may not create multiple accounts for the same person</li>
                <li>You may not use the account of another user without permission</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Intellectual Property */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Intellectual Property</h2>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-4">
            The Service and its original content, features, and functionality are and will remain the exclusive property
            of TripRadar Inc. and its licensors. The Service is protected by copyright, trademark, and other laws of
            both the United States and foreign countries. Our trademarks and trade dress may not be used in connection
            with any product or service without the prior written consent of TripRadar Inc.
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">User Content</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Our Service allows you to post, link, store, share and otherwise make available certain information,
                text, graphics, videos, or other material ("User Content"). You are responsible for the User Content
                that you post on or through the Service, including its legality, reliability, and appropriateness.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">License Grant</h3>
              <p className="text-gray-700 dark:text-gray-300">
                By posting User Content on or through the Service, you grant us a worldwide, non-exclusive, royalty-free
                license (with the right to sublicense) to use, copy, reproduce, process, adapt, modify, publish,
                transmit, display and distribute such content in any and all media or distribution methods now known or
                later developed.
              </p>
            </div>
          </div>
        </div>

        {/* Subscriptions and Payments */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <CreditCard className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Subscriptions and Payments</h2>
          </div>

          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              Some parts of the Service are billed on a subscription basis. You will be billed in advance on a recurring
              and periodic basis, depending on the type of subscription plan you select.
            </p>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Billing Cycle</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Billing cycles are set on a monthly or annual basis, depending on the type of subscription plan you
                select when purchasing a Subscription. At the end of each Billing Cycle, your Subscription will
                automatically renew under the exact same conditions unless you cancel it or TripRadar Inc. cancels it.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Fee Changes</h3>
              <p className="text-gray-700 dark:text-gray-300">
                TripRadar Inc., in its sole discretion and at any time, may modify the Subscription fees. Any
                Subscription fee change will become effective at the end of the then-current Billing Cycle. We will
                provide you with reasonable prior notice of any change in Subscription fees to give you an opportunity
                to terminate your Subscription before such change becomes effective.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Refunds</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Certain refund requests for Subscriptions may be considered by TripRadar Inc. on a case-by-case basis
                and granted at the sole discretion of TripRadar Inc. We offer a 30-day money-back guarantee for all paid
                plans.
              </p>
            </div>
          </div>
        </div>

        {/* Limitation of Liability */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <AlertTriangle className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Limitation of Liability</h2>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-4">
            In no event shall TripRadar Inc., nor its directors, employees, partners, agents, suppliers, or affiliates,
            be liable for any indirect, incidental, special, consequential or punitive damages, including without
            limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
          </p>

          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
            <li>Your access to or use of or inability to access or use the Service;</li>
            <li>Any conduct or content of any third party on the Service;</li>
            <li>Any content obtained from the Service; and</li>
            <li>
              Unauthorized access, use or alteration of your transmissions or content, whether based on warranty,
              contract, tort (including negligence) or any other legal theory, whether or not we have been informed of
              the possibility of such damage.
            </li>
          </ul>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
              <p className="text-sm text-red-700 dark:text-red-300">
                <strong>Important:</strong> Some jurisdictions do not allow the exclusion of certain warranties or the
                limitation or exclusion of liability for certain types of damages. Therefore, some of the above
                limitations in this section may not apply to you.
              </p>
            </div>
          </div>
        </div>

        {/* Governing Law */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Globe className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Governing Law</h2>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-4">
            These Terms shall be governed and construed in accordance with the laws of the State of California, United
            States, without regard to its conflict of law provisions.
          </p>

          <p className="text-gray-700 dark:text-gray-300">
            Our failure to enforce any right or provision of these Terms will not be considered a waiver of those
            rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining
            provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us
            regarding our Service, and supersede and replace any prior agreements we might have between us regarding the
            Service.
          </p>
        </div>

        {/* Changes to Terms */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Clock className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Changes to Terms</h2>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is
            material we will try to provide at least 30 days' notice prior to any new terms taking effect. What
            constitutes a material change will be determined at our sole discretion.
          </p>

          <p className="text-gray-700 dark:text-gray-300">
            By continuing to access or use our Service after those revisions become effective, you agree to be bound by
            the revised terms. If you do not agree to the new terms, please stop using the Service.
          </p>
        </div>

        {/* Contact Us */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8">
          <div className="flex items-center space-x-3 mb-4">
            <Mail className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Us</h2>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-6">
            If you have any questions about these Terms, please contact us:
          </p>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <div>
                <span className="font-medium text-gray-900 dark:text-white">By email:</span>
                <a
                  href="mailto:legal@tripradar.io"
                  className="text-primary-600 dark:text-primary-400 hover:underline ml-2"
                >
                  legal@tripradar.io
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <HelpCircle className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <div>
                <span className="font-medium text-gray-900 dark:text-white">Help Center:</span>
                <Link to="/help" className="text-primary-600 dark:text-primary-400 hover:underline ml-2">
                  Visit our Help Center
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
