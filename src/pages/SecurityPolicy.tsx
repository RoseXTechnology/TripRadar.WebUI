import {
  Shield,
  Lock,
  Server,
  UserCheck,
  Eye,
  Database,
  AlertTriangle,
  CheckCircle,
  Mail,
  FileText,
  Key,
  RefreshCw,
  Users,
  Clock,
  HelpCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SecurityPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 pt-16 animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex p-3 bg-primary-100 dark:bg-primary-900/20 rounded-full mb-4">
            <Shield className="h-8 w-8 text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Security Policy</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Last updated: February 15, 2025</p>
        </div>

        {/* Introduction */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            At TripRadar, we take the security of your data and our systems very seriously. This Security Policy
            outlines the measures we take to protect your information and ensure the integrity, confidentiality, and
            availability of our services.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            We are committed to implementing and maintaining industry-standard security practices and continuously
            improving our security posture to address emerging threats and vulnerabilities.
          </p>
        </div>

        {/* Data Protection */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Database className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Data Protection</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Encryption</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We encrypt all sensitive data both at rest and in transit. This includes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mt-2">
                <li>All data transmitted between your browser/app and our servers using TLS 1.3</li>
                <li>Sensitive personal information stored in our databases using AES-256 encryption</li>
                <li>
                  Payment information is never stored on our servers and is handled by PCI-DSS compliant payment
                  processors
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Data Minimization</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We follow the principle of data minimization, collecting and retaining only the information necessary to
                provide our services. We regularly review our data collection practices to ensure we're not collecting
                unnecessary information.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Data Retention</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We retain your data only for as long as necessary to provide you with our services and as required by
                law. When data is no longer needed, it is securely deleted or anonymized.
              </p>
            </div>
          </div>
        </div>

        {/* Infrastructure Security */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Server className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Infrastructure Security</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Hosting Environment</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Our services are hosted in secure, SOC 2 compliant data centers with physical security measures
                including 24/7 monitoring, biometric access controls, and redundant power systems.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Network Security</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We implement multiple layers of network security, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mt-2">
                <li>Firewalls and intrusion detection/prevention systems</li>
                <li>Regular network vulnerability scanning</li>
                <li>DDoS protection</li>
                <li>Network segmentation to isolate critical systems</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">System Security</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Our systems are hardened according to industry best practices:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mt-2">
                <li>Regular security patches and updates</li>
                <li>Principle of least privilege for system access</li>
                <li>Comprehensive logging and monitoring</li>
                <li>Regular backups with encryption</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Application Security */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Lock className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Application Security</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Secure Development</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We follow secure development practices throughout our software development lifecycle:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mt-2">
                <li>Security requirements integrated into product design</li>
                <li>Regular code reviews with security focus</li>
                <li>Static and dynamic application security testing</li>
                <li>Third-party dependency scanning</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Authentication & Authorization
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                We implement strong authentication and authorization controls:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mt-2">
                <li>Multi-factor authentication support</li>
                <li>Secure password storage using industry-standard hashing algorithms</li>
                <li>Role-based access control</li>
                <li>Session management with secure cookies and automatic timeouts</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">API Security</h3>
              <p className="text-gray-700 dark:text-gray-300">Our APIs are secured with:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mt-2">
                <li>OAuth 2.0 and JWT for authentication</li>
                <li>Rate limiting to prevent abuse</li>
                <li>Input validation and output encoding</li>
                <li>Regular security testing</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Security Monitoring & Incident Response */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Eye className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Security Monitoring & Incident Response
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Continuous Monitoring</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We maintain comprehensive monitoring of our systems and applications:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mt-2">
                <li>24/7 automated monitoring for suspicious activities</li>
                <li>Real-time alerts for security events</li>
                <li>Regular review of security logs</li>
                <li>Anomaly detection to identify potential threats</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Incident Response</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We have a documented incident response plan that includes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mt-2">
                <li>Defined roles and responsibilities</li>
                <li>Containment, eradication, and recovery procedures</li>
                <li>Communication protocols, including customer notification</li>
                <li>Post-incident analysis and improvement</li>
              </ul>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-900 dark:text-yellow-300 mb-1">Security Incident Reporting</h4>
                  <p className="text-sm text-yellow-700 dark:text-yellow-400">
                    If you believe you've discovered a security vulnerability in our services, please report it to{' '}
                    <a
                      href="mailto:security@tripradar.io"
                      className="underline hover:text-yellow-800 dark:hover:text-yellow-300"
                    >
                      security@tripradar.io
                    </a>
                    . We appreciate your help in keeping TripRadar secure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compliance & Certifications */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Compliance & Certifications</h2>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-6">
            We maintain compliance with relevant security standards and regulations:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
              <div className="flex items-center space-x-3 mb-2">
                <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
                <h4 className="font-semibold text-gray-900 dark:text-white">SOC 2 Type II</h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Our systems and processes are audited annually against the SOC 2 framework for security, availability,
                and confidentiality.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
              <div className="flex items-center space-x-3 mb-2">
                <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
                <h4 className="font-semibold text-gray-900 dark:text-white">GDPR Compliance</h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We maintain compliance with the General Data Protection Regulation for our European users.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
              <div className="flex items-center space-x-3 mb-2">
                <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
                <h4 className="font-semibold text-gray-900 dark:text-white">CCPA Compliance</h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We comply with the California Consumer Privacy Act for our California users.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
              <div className="flex items-center space-x-3 mb-2">
                <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
                <h4 className="font-semibold text-gray-900 dark:text-white">ISO 27001</h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Our information security management system is aligned with ISO 27001 standards.
              </p>
            </div>
          </div>
        </div>

        {/* Employee Security */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Users className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Employee Security</h2>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-4">Our security measures extend to our team members:</p>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="p-1 bg-primary-100 dark:bg-primary-900/20 rounded-full mt-0.5">
                <div className="w-3 h-3 bg-primary-600 dark:bg-primary-400 rounded-full"></div>
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-white">Background Checks</span>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  All employees undergo background checks before joining our team.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-1 bg-primary-100 dark:bg-primary-900/20 rounded-full mt-0.5">
                <div className="w-3 h-3 bg-primary-600 dark:bg-primary-400 rounded-full"></div>
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-white">Security Training</span>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Regular security awareness training for all employees.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-1 bg-primary-100 dark:bg-primary-900/20 rounded-full mt-0.5">
                <div className="w-3 h-3 bg-primary-600 dark:bg-primary-400 rounded-full"></div>
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-white">Access Controls</span>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Strict access controls based on the principle of least privilege.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-1 bg-primary-100 dark:bg-primary-900/20 rounded-full mt-0.5">
                <div className="w-3 h-3 bg-primary-600 dark:bg-primary-400 rounded-full"></div>
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-white">Confidentiality Agreements</span>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  All employees sign confidentiality and data protection agreements.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Security Best Practices for Users */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Key className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Security Best Practices for Users</h2>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-6">
            While we implement robust security measures, we also recommend that you follow these best practices to
            enhance the security of your account:
          </p>

          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-lg mt-1">
                <Lock className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Strong Passwords</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Use a strong, unique password for your TripRadar account. Consider using a password manager to
                  generate and store complex passwords.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-lg mt-1">
                <UserCheck className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Enable Two-Factor Authentication
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Add an extra layer of security to your account by enabling two-factor authentication in your account
                  settings.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-lg mt-1">
                <RefreshCw className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Keep Software Updated</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Ensure your devices, browsers, and apps are kept up-to-date with the latest security patches.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-lg mt-1">
                <AlertTriangle className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Be Alert to Phishing</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Be cautious of emails or messages asking for your TripRadar credentials. We will never ask for your
                  password via email or message.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Updates to This Policy */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Clock className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Updates to This Policy</h2>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We may update this Security Policy from time to time to reflect changes in our practices or for other
            operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new
            Security Policy on this page and updating the "Last updated" date.
          </p>

          <p className="text-gray-700 dark:text-gray-300">
            We encourage you to review this Security Policy periodically to stay informed about our security practices.
          </p>
        </div>

        {/* Contact Us */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8">
          <div className="flex items-center space-x-3 mb-4">
            <Mail className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Us</h2>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-6">
            If you have any questions about our Security Policy or practices, please contact us:
          </p>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <div>
                <span className="font-medium text-gray-900 dark:text-white">Security team:</span>
                <a
                  href="mailto:security@tripradar.io"
                  className="text-primary-600 dark:text-primary-400 hover:underline ml-2"
                >
                  security@tripradar.io
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <FileText className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <div>
                <span className="font-medium text-gray-900 dark:text-white">Bug bounty program:</span>
                <a
                  href="https://tripradar.io/security/bounty"
                  className="text-primary-600 dark:text-primary-400 hover:underline ml-2"
                >
                  tripradar.io/security/bounty
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
