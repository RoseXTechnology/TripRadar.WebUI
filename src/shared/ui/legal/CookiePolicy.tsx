import { Cookie, Info, Settings, Globe, Mail, CheckCircle, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 pt-16 animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex p-3 bg-primary-100 dark:bg-primary-900/20 rounded-full mb-4">
            <Cookie className="h-8 w-8 text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Cookie Policy</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Last updated: February 15, 2025</p>
        </div>

        {/* Introduction */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            TripRadar Inc. ("us", "we", or "our") uses cookies on the TripRadar website and mobile application (the
            "Service"). By using the Service, you consent to the use of cookies.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Our Cookies Policy explains what cookies are, how we use cookies, how third-parties we may partner with may
            use cookies on the Service, your choices regarding cookies and further information about cookies.
          </p>
        </div>

        {/* What are Cookies */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Info className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">What are Cookies</h2>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Cookies are small pieces of text sent to your web browser by a website you visit. A cookie file is stored in
            your web browser and allows the Service or a third-party to recognize you and make your next visit easier
            and the Service more useful to you.
          </p>

          <p className="text-gray-700 dark:text-gray-300">
            Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your personal computer or
            mobile device when you go offline, while session cookies are deleted as soon as you close your web browser.
          </p>
        </div>

        {/* How TripRadar Uses Cookies */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Cookie className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">How TripRadar Uses Cookies</h2>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-4">
            When you use and access the Service, we may place a number of cookie files in your web browser. We use
            cookies for the following purposes:
          </p>

          <div className="space-y-6 mb-6">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-lg mt-1">
                <CheckCircle className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Essential Cookies</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  These cookies are necessary for the website to function and cannot be switched off in our systems.
                  They are usually only set in response to actions made by you which amount to a request for services,
                  such as setting your privacy preferences, logging in or filling in forms.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-lg mt-1">
                <CheckCircle className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Functionality Cookies</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  These cookies enable the website to provide enhanced functionality and personalization. They may be
                  set by us or by third party providers whose services we have added to our pages.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-lg mt-1">
                <CheckCircle className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Analytics Cookies</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  These cookies allow us to count visits and traffic sources so we can measure and improve the
                  performance of our site. They help us to know which pages are the most and least popular and see how
                  visitors move around the site.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-lg mt-1">
                <CheckCircle className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Targeting Cookies</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  These cookies may be set through our site by our advertising partners. They may be used by those
                  companies to build a profile of your interests and show you relevant adverts on other sites.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Cookie Details</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-600">
                    <th className="text-left py-2 text-gray-700 dark:text-gray-300">Name</th>
                    <th className="text-left py-2 text-gray-700 dark:text-gray-300">Purpose</th>
                    <th className="text-left py-2 text-gray-700 dark:text-gray-300">Duration</th>
                    <th className="text-left py-2 text-gray-700 dark:text-gray-300">Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-2 font-mono text-xs text-primary-600 dark:text-primary-400">_tr_session</td>
                    <td className="py-2 text-gray-600 dark:text-gray-400">Authentication</td>
                    <td className="py-2 text-gray-600 dark:text-gray-400">Session</td>
                    <td className="py-2 text-gray-600 dark:text-gray-400">Essential</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-2 font-mono text-xs text-primary-600 dark:text-primary-400">_tr_preferences</td>
                    <td className="py-2 text-gray-600 dark:text-gray-400">User preferences</td>
                    <td className="py-2 text-gray-600 dark:text-gray-400">1 year</td>
                    <td className="py-2 text-gray-600 dark:text-gray-400">Functionality</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-2 font-mono text-xs text-primary-600 dark:text-primary-400">_tr_analytics</td>
                    <td className="py-2 text-gray-600 dark:text-gray-400">Usage statistics</td>
                    <td className="py-2 text-gray-600 dark:text-gray-400">2 years</td>
                    <td className="py-2 text-gray-600 dark:text-gray-400">Analytics</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono text-xs text-primary-600 dark:text-primary-400">_tr_marketing</td>
                    <td className="py-2 text-gray-600 dark:text-gray-400">Marketing</td>
                    <td className="py-2 text-gray-600 dark:text-gray-400">90 days</td>
                    <td className="py-2 text-gray-600 dark:text-gray-400">Targeting</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Third-Party Cookies */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Globe className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Third-Party Cookies</h2>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-4">
            In addition to our own cookies, we may also use various third-party cookies to report usage statistics of
            the Service, deliver advertisements on and through the Service, and so on.
          </p>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="p-1 bg-primary-100 dark:bg-primary-900/20 rounded-full mt-0.5">
                <div className="w-3 h-3 bg-primary-600 dark:bg-primary-400 rounded-full"></div>
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-white">Google Analytics</span>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Used to track website usage and user behavior.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-1 bg-primary-100 dark:bg-primary-900/20 rounded-full mt-0.5">
                <div className="w-3 h-3 bg-primary-600 dark:bg-primary-400 rounded-full"></div>
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-white">Stripe</span>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Used for payment processing.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-1 bg-primary-100 dark:bg-primary-900/20 rounded-full mt-0.5">
                <div className="w-3 h-3 bg-primary-600 dark:bg-primary-400 rounded-full"></div>
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-white">Facebook Pixel</span>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Used for advertising and conversion tracking.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Your Choices Regarding Cookies */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Settings className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Choices Regarding Cookies</h2>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-4">
            If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the
            help pages of your web browser.
          </p>

          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all
            of the features we offer, you may not be able to store your preferences, and some of our pages might not
            display properly.
          </p>

          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-lg mt-1">
                <CheckCircle className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Browser Settings</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  You can set your browser to refuse all cookies or to indicate when a cookie is being sent. Check your
                  browser's help pages for instructions:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-sm text-gray-600 dark:text-gray-400 mt-2">
                  <li>
                    <a
                      href="https://support.google.com/chrome/answer/95647"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 dark:text-primary-400 hover:underline"
                    >
                      Google Chrome
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 dark:text-primary-400 hover:underline"
                    >
                      Mozilla Firefox
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 dark:text-primary-400 hover:underline"
                    >
                      Safari
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 dark:text-primary-400 hover:underline"
                    >
                      Microsoft Edge
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-lg mt-1">
                <CheckCircle className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Opt-Out Tools</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  You can opt out of targeted advertising by using these tools:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-sm text-gray-600 dark:text-gray-400 mt-2">
                  <li>
                    <a
                      href="https://tools.google.com/dlpage/gaoptout"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 dark:text-primary-400 hover:underline"
                    >
                      Google Analytics Opt-out Browser Add-on
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.networkadvertising.org/choices/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 dark:text-primary-400 hover:underline"
                    >
                      Network Advertising Initiative Opt-out Tool
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.youronlinechoices.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 dark:text-primary-400 hover:underline"
                    >
                      Your Online Choices (EU)
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Cookie Preferences */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Settings className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Cookie Preferences</h2>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-6">
            You can manage your cookie preferences directly on our website. Use the controls below to customize which
            types of cookies you allow:
          </p>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Essential Cookies</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Required for the website to function properly
                  </div>
                </div>
              </div>
              <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-600">
                <span className="inline-block h-4 w-4 transform translate-x-6 rounded-full bg-white"></span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Functionality Cookies</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Enable enhanced features and personalization
                  </div>
                </div>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-600">
                <span className="inline-block h-4 w-4 transform translate-x-1 rounded-full bg-white"></span>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Analytics Cookies</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Help us improve our website by collecting anonymous usage data
                  </div>
                </div>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-600">
                <span className="inline-block h-4 w-4 transform translate-x-1 rounded-full bg-white"></span>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Targeting Cookies</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Allow us to deliver personalized advertisements
                  </div>
                </div>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-600">
                <span className="inline-block h-4 w-4 transform translate-x-1 rounded-full bg-white"></span>
              </button>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
              Reject All
            </button>
            <button className="px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors">
              Save Preferences
            </button>
          </div>
        </div>

        {/* Contact Us */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8">
          <div className="flex items-center space-x-3 mb-4">
            <Mail className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Us</h2>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-6">
            If you have any questions about our Cookie Policy, please contact us:
          </p>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <div>
                <span className="font-medium text-gray-900 dark:text-white">By email:</span>
                <a
                  href="mailto:privacy@tripradar.io"
                  className="text-primary-600 dark:text-primary-400 hover:underline ml-2"
                >
                  privacy@tripradar.io
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
};
