import { StorySection, ValuesSection } from '../components/about';

export const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 overflow-hidden pt-16">
      <StorySection />
      <ValuesSection />
    </div>
  );
};
