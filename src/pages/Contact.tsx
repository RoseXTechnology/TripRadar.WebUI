import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Code, 
  Handshake, 
  Newspaper, 
  MapPin, 
  Clock, 
  Phone, 
  MessageSquare,
  Send,
  CheckCircle,
  ExternalLink,
  Globe,
  Shield,
  Zap,
  Users,
  HelpCircle,
  FileText,
  Activity,
  Twitter,
  Github,
  Linkedin,
  AlertTriangle
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// Define SVG pattern as a constant to avoid parsing issues
const dotPattern = "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E";

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: 'general',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { actualTheme } = useTheme();
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const contactMethods = [
    {
      icon: Mail,
      title: "General Inquiries",
      email: "hello@tripradar.io",
      description: "General questions and information",
      responseTime: "24 hours",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Code,
      title: "Technical Support",
      email: "support@tripradar.io", 
      description: "API documentation, integration help, technical issues",
      responseTime: "4 hours during business days",
      gradient: "from-green-500 to-teal-500"
    },
    {
      icon: Handshake,
      title: "Sales & Partnerships",
      email: "sales@tripradar.io",
      description: "Enterprise plans, partnerships, custom solutions",
      responseTime: "Same day",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Newspaper,
      title: "Press & Media",
      email: "press@tripradar.io",
      description: "Media inquiries, press releases, interviews",
      responseTime: "48 hours",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const offices = [
    {
      city: "San Francisco",
      region: "Headquarters",
      address: "123 Market Street, Suite 400",
      note: "Remote-First Company"
    },
    {
      city: "Austin",
      region: "Developer Hub", 
      address: "456 Congress Avenue, Floor 12",
      note: "Engineering Team"
    },
    {
      city: "London",
      region: "European Office",
      address: "789 King's Road, Level 8",
      note: "EU Operations"
    }
  ];

  const faqs = [
    {
      question: 'How quickly do you respond to support requests?',
      answer: 'Technical support: 4 hours during business days, General inquiries: 24 hours, Sales: Same day response'
    },
    {
      question: 'Do you offer phone support?',
      answer: 'Currently we provide email-based support with scheduled calls available for enterprise customers'
    },
    {
      question: 'Can I schedule a demo?',
      answer: 'Yes! Contact our sales team to arrange a personalized demo of our platform and APIs'
    },
    {
      question: 'Do you have API documentation?',
      answer: 'Comprehensive documentation is available at docs.tripradar.io with examples and interactive testing'
    },
    {
      question: 'What about enterprise support?',
      answer: 'Enterprise customers get priority support with dedicated success managers and SLA guarantees'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    let hasErrors = false;
    const errors = {
      name: '',
      email: '',
      message: ''
    };
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
      hasErrors = true;
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
      hasErrors = true;
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
      hasErrors = true;
    }
    
    setFormErrors(errors);
    
    if (hasErrors) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after success
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: 'general',
        message: ''
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 pt-16">
      {/* Mouse Follower Spotlight - Only in dark mode */}
      {actualTheme === 'dark' && (
        <div 
          className="fixed pointer-events-none z-0 w-96 h-96 rounded-full opacity-20 transition-all duration-300 ease-out"
          style={{
            background: `radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)`,
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700">
        {/* Background with SVG pattern */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 animate-pulse"
            style={{ 
              backgroundImage: `url('${dotPattern}')`,
              backgroundSize: '60px 60px'
            }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Get in
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto mb-12 leading-relaxed">
              Our team is here to help you get the most out of TripRadar. Reach out anytime for support, 
              partnerships, or just to say hello!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              How Can We Help?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Choose the best way to reach us based on your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className={`group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${isVisible ? 'animate-slide-up' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${method.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <method.icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {method.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  {method.description}
                </p>
                
                <div className="space-y-2">
                  <a 
                    href={`mailto:${method.email}`}
                    className="block text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors"
                  >
                    {method.email}
                  </a>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span>{method.responseTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Office Info */}
      <section className="py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Send us a Message</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Have a specific question or need? Fill out the form below and we'll get back to you quickly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                        formErrors.name ? 'border-red-300 dark:border-red-700' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="Your full name"
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                        formErrors.email ? 'border-red-300 dark:border-red-700' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="your@email.com"
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="sales">Sales</option>
                    <option value="partnership">Partnership</option>
                    <option value="press">Press</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                      formErrors.message ? 'border-red-300 dark:border-red-700' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Tell us how we can help you..."
                  />
                  {formErrors.message && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.message}</p>
                  )}
                </div>

                <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>We'll never share your information with third parties</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      <span>Sending...</span>
                    </>
                  ) : isSubmitted ? (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      <span>Message Sent!</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Office Information & Additional Info */}
            <div className="space-y-8">
              {/* Office Locations */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Office Locations</h3>
                <div className="space-y-6">
                  {offices.map((office, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-6 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg">
                          <MapPin className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{office.city}</h4>
                          <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-2">{office.region}</p>
                          <p className="text-gray-600 dark:text-gray-400 mb-2">{office.address}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{office.note}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <p className="text-blue-800 dark:text-blue-300 text-sm">
                    <strong>Note:</strong> We're a remote-first company, but these are our main hubs for meetings and events.
                  </p>
                </div>
              </div>

              {/* Additional Contact Options */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Other Ways to Connect</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <MessageSquare className="h-6 w-6 text-green-600 dark:text-green-400" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Live Chat</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Available during business hours</div>
                      </div>
                    </div>
                    <button className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium">
                      Start Chat
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Status Page</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Real-time API status</div>
                      </div>
                    </div>
                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center space-x-1">
                      <span>View Status</span>
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Documentation</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Self-service help</div>
                      </div>
                    </div>
                    <button className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium flex items-center space-x-1">
                      <span>View Docs</span>
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Follow Us</h3>
                <div className="flex space-x-4">
                  <button className="p-3 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/40 transition-colors">
                    <Twitter className="h-6 w-6" />
                  </button>
                  <button className="p-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    <Github className="h-6 w-6" />
                  </button>
                  <button className="p-3 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/40 transition-colors">
                    <Linkedin className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Quick answers to common questions about our platform and services.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-6 shadow-lg ${isVisible ? 'animate-slide-up' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex-shrink-0">
                    <HelpCircle className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{faq.question}</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Still Have Questions?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Our team is here to help you get the most out of TripRadar. 
            Reach out anytime for personalized assistance.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 flex items-center space-x-2 shadow-2xl">
              <Mail className="h-5 w-5" />
              <span>Email Support</span>
            </button>
            
            <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300 flex items-center space-x-2 border border-white/20">
              <MessageSquare className="h-5 w-5" />
              <span>Live Chat</span>
            </button>
          </div>

          <div className="mt-12 flex items-center justify-center space-x-8 text-blue-200">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-300" />
              <span>Fast response times</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-green-300" />
              <span>Expert support team</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-green-300" />
              <span>24/7 availability</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}