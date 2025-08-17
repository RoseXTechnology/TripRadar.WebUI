import { FaBullseye } from 'react-icons/fa';

export const StorySection = () => (
  <section className="py-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
          <div className="space-y-6 text-lg text-gray-600 dark:text-white/60 leading-relaxed">
            <p>
              Founded in 2023, our platform was born from a simple observation: travel data was fragmented, unreliable,
              and difficult to access. Developers were spending countless hours integrating multiple APIs, dealing with
              inconsistent data formats, and managing complex authentication systems.
            </p>
            <p>
              We set out to change that. Our mission is to democratize access to comprehensive travel and location data,
              providing developers with a single, powerful platform that handles the complexity so they can focus on
              building amazing experiences.
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
              To become the global standard for travel and location intelligence, enabling developers to create the next
              generation of travel experiences that are more personalized, efficient, and accessible than ever before.
            </p>
            <div className="flex items-center space-x-2">
              <FaBullseye className="h-6 w-6 text-yellow-500" />
              <span className="font-semibold">Connecting travelers worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
