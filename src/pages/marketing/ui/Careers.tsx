import { useTheme } from 'app/providers/ThemeContext';
import {
  MapPin,
  Clock,
  Users,
  Heart,
  Globe,
  Code,
  ArrowRight,
  ExternalLink,
  CheckCircle,
  Star,
  TrendingUp,
  Briefcase,
  GraduationCap,
  Target,
  MessageSquare,
  Send,
  FileUp,
  AlertTriangle,
} from 'lucide-react';
import React, { useState, useEffect } from 'react';

export default function Careers() {
  const [isVisible, setIsVisible] = useState(false);
  const { actualTheme } = useTheme();
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    resume: null as File | null,
    coverLetter: '',
    position: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    resume: '',
    coverLetter: '',
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const benefits = [
    {
      icon: Globe,
      title: 'Remote-First Culture',
      description: 'Work from anywhere in the world with flexible hours and async collaboration',
    },
    {
      icon: Code,
      title: 'Cutting-Edge Technology',
      description: 'Work with modern tech stack, latest APIs, and innovative travel solutions',
    },
    {
      icon: GraduationCap,
      title: 'Learning & Growth',
      description: 'Continuous learning opportunities, conference budget, and skill development',
    },
    {
      icon: Target,
      title: 'Meaningful Impact',
      description: 'Your work directly impacts millions of travelers worldwide',
    },
    {
      icon: Clock,
      title: 'Work-Life Balance',
      description: 'Flexible schedule, unlimited PTO, and mental health support',
    },
    {
      icon: Heart,
      title: 'Competitive Benefits',
      description: 'Health insurance, stock options, retirement plans, and wellness programs',
    },
  ];

  const positions = [
    {
      id: 'senior-backend',
      title: 'Senior Backend Developer',
      location: 'Remote / San Francisco',
      type: 'Full-time',
      department: 'Engineering',
      description: 'Build and scale our API infrastructure serving millions of requests daily',
      requirements: ['Node.js', 'PostgreSQL', 'Redis', 'AWS', 'API design', 'Microservices'],
      responsibilities: [
        'Design and implement scalable API endpoints',
        'Optimize database performance and queries',
        'Build real-time data processing systems',
        'Collaborate with frontend and DevOps teams',
      ],
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'frontend-dev',
      title: 'Frontend Developer',
      location: 'Remote / New York',
      type: 'Full-time',
      department: 'Engineering',
      description: 'Create beautiful, responsive web applications for our platform',
      requirements: ['React', 'TypeScript', 'Tailwind CSS', 'GraphQL', 'Modern web APIs'],
      responsibilities: [
        'Build responsive user interfaces',
        'Implement real-time features',
        'Optimize application performance',
        'Collaborate with design and backend teams',
      ],
      gradient: 'from-green-500 to-teal-500',
    },
    {
      id: 'devops-engineer',
      title: 'DevOps Engineer',
      location: 'Remote / Austin',
      type: 'Full-time',
      department: 'Infrastructure',
      description: 'Maintain and scale our cloud infrastructure and deployment pipelines',
      requirements: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'Monitoring'],
      responsibilities: [
        'Manage cloud infrastructure and deployments',
        'Implement monitoring and alerting systems',
        'Optimize system performance and costs',
        'Ensure security and compliance standards',
      ],
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      id: 'product-manager',
      title: 'Product Manager',
      location: 'Remote / Los Angeles',
      type: 'Full-time',
      department: 'Product',
      description: 'Drive product strategy and roadmap for our API platform',
      requirements: ['API product experience', 'Technical background', 'User research', 'Analytics'],
      responsibilities: [
        'Define product vision and strategy',
        'Conduct user research and analysis',
        'Collaborate with engineering and design',
        'Track metrics and optimize features',
      ],
      gradient: 'from-orange-500 to-red-500',
    },
    {
      id: 'customer-success',
      title: 'Customer Success Manager',
      location: 'Remote / Chicago',
      type: 'Full-time',
      department: 'Customer Success',
      description: 'Help our developer community succeed with our APIs',
      requirements: ['Technical communication', 'API documentation', 'Customer support', 'Developer tools'],
      responsibilities: [
        'Support developer onboarding and success',
        'Create technical documentation and guides',
        'Gather customer feedback and insights',
        'Build developer community programs',
      ],
      gradient: 'from-indigo-500 to-purple-500',
    },
  ];

  const applicationProcess = [
    {
      step: 1,
      title: 'Apply Online',
      description: 'Submit your resume and cover letter through our portal',
      icon: Briefcase,
    },
    {
      step: 2,
      title: 'Initial Screen',
      description: '30-minute call with our talent team to discuss your background',
      icon: MessageSquare,
    },
    {
      step: 3,
      title: 'Technical Interview',
      description: 'Role-specific technical assessment and coding challenge',
      icon: Code,
    },
    {
      step: 4,
      title: 'Team Interview',
      description: 'Meet with your potential teammates and discuss collaboration',
      icon: Users,
    },
    {
      step: 5,
      title: 'Final Interview',
      description: 'Culture fit discussion with leadership team',
      icon: Star,
    },
    {
      step: 6,
      title: 'Welcome!',
      description: 'Receive offer and join our amazing team',
      icon: CheckCircle,
    },
  ];

  const testimonials = [
    {
      name: 'Alex Chen',
      role: 'Senior Developer',
      quote:
        "The technical challenges here are incredible. I'm constantly learning and working with cutting-edge technology that impacts millions of travelers.",
      image:
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    },
    {
      name: 'Maria Rodriguez',
      role: 'Product Manager',
      quote:
        'The company culture is amazing - truly remote-first with incredible support for work-life balance. Plus, seeing our APIs power real travel experiences is so rewarding.',
      image:
        'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    },
    {
      name: 'James Wilson',
      role: 'DevOps Engineer',
      quote:
        "Working with modern infrastructure and the latest tools is a dream. The team is supportive, and we're building something that really matters.",
      image:
        'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    },
  ];

  const handleApplyClick = (positionId: string) => {
    setApplicationData(prev => ({
      ...prev,
      position: positions.find(p => p.id === positionId)?.title || '',
    }));
    setShowApplicationForm(true);
    setSelectedPosition(positionId);

    // Scroll to application form
    setTimeout(() => {
      const formElement = document.getElementById('application-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setApplicationData(prev => ({
        ...prev,
        resume: e.target.files![0],
      }));
      setFormErrors(prev => ({
        ...prev,
        resume: '',
      }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setApplicationData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    let hasErrors = false;
    const errors = {
      name: '',
      email: '',
      resume: '',
      coverLetter: '',
    };

    if (!applicationData.name.trim()) {
      errors.name = 'Name is required';
      hasErrors = true;
    }

    if (!applicationData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(applicationData.email)) {
      errors.email = 'Email is invalid';
      hasErrors = true;
    }

    if (!applicationData.resume) {
      errors.resume = 'Resume is required';
      hasErrors = true;
    }

    if (!applicationData.coverLetter.trim()) {
      errors.coverLetter = 'Cover letter is required';
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
      setShowApplicationForm(false);
      setApplicationData({
        name: '',
        email: '',
        resume: null,
        coverLetter: '',
        position: '',
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
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fill-opacity=%220.05%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div
            className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Build the Future of
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Travel Technology
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto mb-12 leading-relaxed">
              Join our passionate team of developers, engineers, and travel enthusiasts creating APIs that power the
              next generation of travel applications.
            </p>

            <button
              onClick={() => {
                const openPositionsElement = document.getElementById('open-positions');
                if (openPositionsElement) {
                  openPositionsElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="group bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 flex items-center space-x-2 shadow-2xl mx-auto"
            >
              <span>View Open Positions</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Why Work With Us?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We're building something extraordinary, and we want extraordinary people to join us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${isVisible ? 'animate-slide-up' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{benefit.title}</h3>

                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="open-positions" className="py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Open Positions</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Join our team and help shape the future of travel technology.
            </p>
          </div>

          <div className="space-y-8">
            {positions.map((position, index) => (
              <div
                key={index}
                className={`group bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 ${isVisible ? 'animate-slide-up' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Job Info */}
                  <div className="lg:col-span-2">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{position.title}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${position.gradient} text-white`}
                      >
                        {position.department}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400 mb-4">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{position.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>{position.type}</span>
                      </div>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">{position.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Requirements</h4>
                        <div className="flex flex-wrap gap-2">
                          {position.requirements.map((req, idx) => (
                            <span
                              key={idx}
                              className="bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
                            >
                              {req}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Responsibilities</h4>
                        <ul className="space-y-1">
                          {position.responsibilities.slice(0, 3).map((resp, idx) => (
                            <li
                              key={idx}
                              className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400"
                            >
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Apply Section */}
                  <div className="flex flex-col justify-center">
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-6 shadow-sm">
                      <button
                        onClick={() => handleApplyClick(position.id)}
                        className={`w-full bg-gradient-to-r ${position.gradient} text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 mb-4`}
                      >
                        Apply Now
                      </button>
                      <button
                        onClick={() => setSelectedPosition(selectedPosition === position.id ? null : position.id)}
                        className="w-full text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 py-2 text-sm font-medium transition-colors"
                      >
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedPosition === position.id && (
                  <div className="mt-6 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl animate-slide-up">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Full Job Description</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      We're looking for a talented {position.title} to join our growing team. In this role, you'll have
                      the opportunity to work on cutting-edge travel technology that impacts millions of users
                      worldwide.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-white mb-2">All Requirements</h5>
                        <ul className="space-y-1">
                          {position.requirements.map((req, idx) => (
                            <li
                              key={idx}
                              className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400"
                            >
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{req}</span>
                            </li>
                          ))}
                          <li className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>3+ years of relevant experience</span>
                          </li>
                          <li className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Excellent communication skills</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-white mb-2">All Responsibilities</h5>
                        <ul className="space-y-1">
                          {position.responsibilities.map((resp, idx) => (
                            <li
                              key={idx}
                              className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400"
                            >
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{resp}</span>
                            </li>
                          ))}
                          <li className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Participate in code reviews and technical discussions</span>
                          </li>
                          <li className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Mentor junior team members</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <button
                        onClick={() => handleApplyClick(position.id)}
                        className={`bg-gradient-to-r ${position.gradient} text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300`}
                      >
                        Apply for this Position
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      {showApplicationForm && (
        <section id="application-form" className="py-24 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-lg animate-slide-up">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Apply for: {applicationData.position}
              </h2>

              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="inline-flex p-4 bg-green-100 dark:bg-green-900/20 rounded-full mb-6">
                    <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Application Submitted!</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Thank you for applying to join our team. We'll review your application and get back to you soon.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setShowApplicationForm(false);
                    }}
                    className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
                  >
                    Back to Careers
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitApplication} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={applicationData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
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
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={applicationData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                        formErrors.email ? 'border-red-300 dark:border-red-700' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="your@email.com"
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Resume/CV *
                    </label>
                    <div
                      className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 ${
                        formErrors.resume
                          ? 'border-red-300 dark:border-red-700'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <FileUp className="h-5 w-5 text-gray-400" />
                          <span className="text-gray-500 dark:text-gray-400">
                            {applicationData.resume ? applicationData.resume.name : 'Upload your resume (PDF, DOCX)'}
                          </span>
                        </div>
                        <label className="cursor-pointer bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors">
                          Browse
                          <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="hidden" />
                        </label>
                      </div>
                    </div>
                    {formErrors.resume && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.resume}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Cover Letter *
                    </label>
                    <textarea
                      name="coverLetter"
                      rows={6}
                      value={applicationData.coverLetter}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                        formErrors.coverLetter
                          ? 'border-red-300 dark:border-red-700'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                    />
                    {formErrors.coverLetter && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.coverLetter}</p>
                    )}
                  </div>

                  <div className="flex items-start space-x-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      By submitting this application, you consent to our processing of your data for recruitment
                      purposes. See our{' '}
                      <a href="/privacy" className="underline hover:text-yellow-800 dark:hover:text-yellow-200">
                        Privacy Policy
                      </a>{' '}
                      for details.
                    </p>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          <span>Submit Application</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowApplicationForm(false)}
                      className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Application Process */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Application Process</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our hiring process is designed to be transparent, fair, and efficient.
            </p>
          </div>

          <div className="relative">
            {/* Process Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transform -translate-y-1/2"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
              {applicationProcess.map((step, index) => (
                <div
                  key={index}
                  className={`relative text-center ${isVisible ? 'animate-slide-up' : ''}`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Step Node */}
                  <div className="relative mx-auto w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <step.icon className="h-8 w-8 text-white" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{step.step}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Employee Testimonials */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">What Our Team Says</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Hear from our team members about their experience working with us.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 ${isVisible ? 'animate-slide-up' : ''}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{testimonial.name}</h3>
                    <p className="text-indigo-600 dark:text-indigo-400 font-medium">{testimonial.role}</p>
                  </div>
                </div>

                <blockquote className="text-gray-700 dark:text-gray-300 leading-relaxed italic">
                  "{testimonial.quote}"
                </blockquote>

                <div className="flex items-center space-x-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Join Our Mission?</h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Don't see a perfect fit? We're always interested in talking to talented people. Send us your resume and
            let's explore opportunities together.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button
              onClick={() => {
                const openPositionsElement = document.getElementById('open-positions');
                if (openPositionsElement) {
                  openPositionsElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="group bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 flex items-center space-x-2 shadow-2xl"
            >
              <span>View All Positions</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                setApplicationData(prev => ({
                  ...prev,
                  position: 'General Application',
                }));
                setShowApplicationForm(true);

                // Scroll to application form
                setTimeout(() => {
                  const formElement = document.getElementById('application-form');
                  if (formElement) {
                    formElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 100);
              }}
              className="group bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300 flex items-center space-x-2 border border-white/20"
            >
              <span>Send Resume</span>
              <ExternalLink className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="mt-12 flex items-center justify-center space-x-8 text-blue-200">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-300" />
              <span>Remote-first</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-green-300" />
              <span>Great benefits</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-300" />
              <span>Growth opportunities</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
