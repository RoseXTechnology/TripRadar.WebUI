import { IconType } from 'react-icons';
import { FaShieldAlt, FaBolt, FaGlobe, FaHeart, FaCode, FaLightbulb } from 'react-icons/fa';

export interface Value {
  icon: IconType;
  title: string;
  description: string;
  detail: string;
  gradient: string;
}

export const VALUES: Value[] = [
  {
    icon: FaLightbulb,
    title: 'Innovation',
    description: "Pushing the boundaries of what's possible with travel data",
    detail:
      'We constantly explore new technologies and methodologies to deliver cutting-edge solutions that transform how people experience travel.',
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    icon: FaShieldAlt,
    title: 'Reliability',
    description: '99.9% uptime with enterprise-grade infrastructure',
    detail:
      'Our robust infrastructure ensures your applications run smoothly with minimal downtime, backed by comprehensive monitoring and redundancy.',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: FaHeart,
    title: 'Security',
    description: 'Your data security is our top priority',
    detail:
      'We implement industry-leading security practices, including end-to-end encryption, regular audits, and compliance with international standards.',
    gradient: 'from-red-500 to-pink-500',
  },
  {
    icon: FaCode,
    title: 'Developer Experience',
    description: 'Simple, powerful APIs that developers love',
    detail:
      'We design our APIs with developers in mind, providing comprehensive documentation, SDKs, and tools that make integration seamless.',
    gradient: 'from-blue-500 to-indigo-500',
  },
  {
    icon: FaGlobe,
    title: 'Global Coverage',
    description: 'Comprehensive data from around the world',
    detail:
      'Our platform aggregates data from 200+ countries, ensuring you have access to accurate, localized information wherever your users travel.',
    gradient: 'from-purple-500 to-violet-500',
  },
  {
    icon: FaBolt,
    title: 'Real-time Data',
    description: 'Always up-to-date information when you need it',
    detail:
      'Our real-time data processing ensures your applications always have the most current information, from flight prices to weather conditions.',
    gradient: 'from-cyan-500 to-teal-500',
  },
];
