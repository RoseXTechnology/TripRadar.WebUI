import { useState, useEffect } from 'react';
import {
  MapPin,
  Users,
  Target,
  Shield,
  Zap,
  Globe,
  TrendingUp,
  Heart,
  Code,
  Lightbulb,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { useTheme } from 'app/providers/ThemeContext';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { actualTheme } = useTheme();

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const values = [
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: "Pushing the boundaries of what's possible with travel data",
      detail:
        'We constantly explore new technologies and methodologies to deliver cutting-edge solutions that transform how people experience travel.',
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Shield,
      title: 'Reliability',
      description: '99.9% uptime with enterprise-grade infrastructure',
      detail:
        'Our robust infrastructure ensures your applications run smoothly with minimal downtime, backed by comprehensive monitoring and redundancy.',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: Heart,
      title: 'Security',
      description: 'Your data security is our top priority',
      detail:
        'We implement industry-leading security practices, including end-to-end encryption, regular audits, and compliance with international standards.',
      gradient: 'from-red-500 to-pink-500',
    },
    {
      icon: Code,
      title: 'Developer Experience',
      description: 'Simple, powerful APIs that developers love',
      detail:
        'We design our APIs with developers in mind, providing comprehensive documentation, SDKs, and tools that make integration seamless.',
      gradient: 'from-blue-500 to-indigo-500',
    },
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Comprehensive data from around the world',
      detail:
        'Our platform aggregates data from 200+ countries, ensuring you have access to accurate, localized information wherever your users travel.',
      gradient: 'from-purple-500 to-violet-500',
    },
    {
      icon: Zap,
      title: 'Real-time Data',
      description: 'Always up-to-date information when you need it',
      detail:
        'Our real-time data processing ensures your applications always have the most current information, from flight prices to weather conditions.',
      gradient: 'from-cyan-500 to-teal-500',
    },
  ];

  const team = [
    {
      name: 'Sarah Chen',
      role: 'CEO & Founder',
      bio: 'Former VP of Engineering at Expedia with 15+ years in travel tech. Passionate about democratizing travel data access.',
      image:
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
      linkedin: '#',
    },
    {
      name: 'Marcus Rodriguez',
      role: 'CTO',
      bio: 'Ex-Google engineer specializing in distributed systems and API architecture. Led teams building scalable platforms for millions of users.',
      image:
        'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
      linkedin: '#',
    },
    {
      name: 'Emily Watson',
      role: 'Lead Engineer',
      bio: 'Full-stack developer with expertise in GraphQL and real-time systems. Previously at Airbnb building booking infrastructure.',
      image:
        'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
      linkedin: '#',
    },
    {
      name: 'David Kim',
      role: 'Customer Success Manager',
      bio: 'Developer advocate with a passion for helping teams succeed. Expert in API integration and developer community building.',
      image:
        'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
      linkedin: '#',
    },
  ];

  const timeline = [
    {
      year: '2023',
      title: 'Platform Conception',
      description: 'Initial development and market research began',
      icon: Lightbulb,
    },
    {
      year: '2024 Q1',
      title: 'Beta Launch',
      description: 'Core travel APIs released to select partners',
      icon: Code,
    },
    {
      year: '2024 Q2',
      title: 'Major Integrations',
      description: 'Google, Stripe, and OpenWeather partnerships established',
      icon: Globe,
    },
    {
      year: '2024 Q3',
      title: 'Authentication System',
      description: 'OAuth2 and user management platform launched',
      icon: Shield,
    },
    {
      year: '2024 Q4',
      title: 'GraphQL APIs',
      description: 'Advanced querying and real-time features released',
      icon: Zap,
    },
    {
      year: '2025',
      title: 'AI-Powered Features',
      description: 'Predictive analytics and smart recommendations',
      icon: Target,
    },
  ];

  const stats = [
    { number: '15+', label: 'API Endpoints Integrated', icon: Code },
    { number: '50+', label: 'External Service Integrations', icon: Globe },
    { number: '200+', label: 'Countries Covered', icon: MapPin },
    { number: '99.9%', label: 'Platform Uptime', icon: TrendingUp },
    { number: '24/7', label: 'Developer Support', icon: Users },
    { number: 'SOC 2', label: 'Security Compliance', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 overflow-hidden pt-16">
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

      {/* Floating Particles Background - Only in dark mode */}
      {actualTheme === 'dark' && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div
            className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              <span
                className={`${
                  actualTheme === 'dark'
                    ? 'bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent'
                    : 'text-gray-900'
                }`}
              >
                Empowering the Future of
              </span>
              <br />
              <span
                className={`${
                  actualTheme === 'dark'
                    ? 'bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent'
                    : 'text-primary-600'
                }`}
              >
                Travel Technology
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 dark:text-white/60 max-w-4xl mx-auto mb-12 leading-relaxed">
              We're building the most comprehensive travel and location intelligence platform for developers and
              businesses worldwide, making travel data accessible, reliable, and powerful.
            </p>

            <button className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center space-x-2 mx-auto">
              <span>Our Mission</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
              <div className="space-y-6 text-lg text-gray-600 dark:text-white/60 leading-relaxed">
                <p>
                  Founded in 2023, our platform was born from a simple observation: travel data was fragmented,
                  unreliable, and difficult to access. Developers were spending countless hours integrating multiple
                  APIs, dealing with inconsistent data formats, and managing complex authentication systems.
                </p>
                <p>
                  We set out to change that. Our mission is to democratize access to comprehensive travel and location
                  data, providing developers with a single, powerful platform that handles the complexity so they can
                  focus on building amazing experiences.
                </p>
                <p>
                  Today, we serve thousands of developers worldwide, powering everything from startup travel apps to
                  enterprise booking platforms. Our commitment to reliability, security, and developer experience drives
                  everything we do.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-8 text-gray-900 dark:text-white">
                <h3 className="text-2xl font-bold mb-6">Our Vision</h3>
                <p className="text-lg leading-relaxed mb-6 text-gray-700 dark:text-white/80">
                  To become the global standard for travel and location intelligence, enabling developers to create the
                  next generation of travel experiences that are more personalized, efficient, and accessible than ever
                  before.
                </p>
                <div className="flex items-center space-x-2">
                  <Target className="h-6 w-6 text-yellow-500" />
                  <span className="font-semibold">Connecting travelers worldwide</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">Our Values</h2>
            <p className="text-xl text-gray-600 dark:text-white/60 max-w-3xl mx-auto">
              These core principles guide every decision we make and every feature we build.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className={`group relative bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-3xl p-8 hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 ${isVisible ? 'animate-slide-up' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${value.gradient} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <value.icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{value.title}</h3>

                <p className="text-gray-600 dark:text-white/60 mb-4 font-medium">{value.description}</p>

                <p className="text-gray-500 dark:text-white/50 text-sm leading-relaxed">{value.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-600 dark:text-white/60 max-w-3xl mx-auto">
              Passionate experts from leading tech companies, united by our mission to transform travel technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {team.map((member, index) => (
              <div
                key={index}
                className={`group bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-3xl p-6 hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 ${isVisible ? 'animate-slide-up' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white dark:border-gray-700 shadow-lg group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                  <p className="text-cyan-600 dark:text-cyan-400 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 dark:text-white/60 text-sm leading-relaxed mb-4">{member.bio}</p>

                  <button className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors">
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Join Team CTA */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-8 text-gray-900 dark:text-white">
              <h3 className="text-2xl font-bold mb-4">Want to Join Our Team?</h3>
              <p className="text-lg text-gray-700 dark:text-white/80 mb-6">
                We're always looking for talented individuals who share our passion for travel technology.
              </p>
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all">
                View Open Positions
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">Our Journey</h2>
            <p className="text-xl text-gray-600 dark:text-white/60 max-w-3xl mx-auto">
              From concept to global platform - here's how we've grown and what's coming next.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>

            <div className="space-y-12">
              {timeline.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-gray-50 dark:border-gray-900 shadow-lg z-10"></div>

                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl p-6 hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-300">
                      <div
                        className={`flex items-center space-x-3 mb-3 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                          <milestone.icon className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">{milestone.year}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{milestone.title}</h3>
                      <p className="text-gray-600 dark:text-white/60">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">Platform Achievements</h2>
            <p className="text-xl text-gray-600 dark:text-white/60 max-w-3xl mx-auto">
              Numbers that reflect our commitment to excellence and reliability.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center group ${isVisible ? 'animate-slide-up' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex p-4 bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-3xl mb-4 group-hover:bg-gray-50 dark:group-hover:bg-white/10 transition-all duration-300 group-hover:scale-110">
                  <stat.icon className="h-8 w-8 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div
                  className={`text-3xl md:text-5xl font-bold mb-2 transition-all duration-300 ${
                    actualTheme === 'dark'
                      ? 'text-white group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-500 group-hover:bg-clip-text group-hover:text-transparent'
                      : 'text-gray-900 group-hover:text-primary-600'
                  }`}
                >
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-white/60 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Build the Future Together?
          </h2>
          <p className="text-xl text-gray-600 dark:text-white/60 mb-12 max-w-2xl mx-auto">
            Join thousands of developers who trust our platform to power their travel applications. Start building today
            with our comprehensive APIs and world-class support.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center space-x-2">
              <span>Get Started Free</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="group bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/20 text-gray-900 dark:text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-300 flex items-center space-x-2">
              <span>Contact Us</span>
              <ExternalLink className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
