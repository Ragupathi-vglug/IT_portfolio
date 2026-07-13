import React from 'react';
import { User, Target, Heart } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
            About <span className="text-blue-600 dark:text-blue-400">Department</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
            Empowering students through quality education, innovation, research, and technological excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <User className="text-blue-600 dark:text-blue-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                      About college
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Arignar Anna Government Arts College is a Government-run co-educational institution located at Keezperumpakkam, Villupuram, Tamil Nadu. The college is committed to academic excellence, holistic development, innovation, and empowering students through quality higher education. Managed by the Government of Tamil Nadu, it provides modern infrastructure, advanced laboratories, and opportunities for research, cultural, and sports activities.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <Target className="text-purple-600 dark:text-purple-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    About Department
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    The Department of Information Technology offers M.Sc. Information Technology with a focus on developing skilled IT professionals through practical learning, programming, software development, data analytics, artificial intelligence, and emerging technologies. The department encourages innovation, research, teamwork, and industry-oriented learning.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <Heart className="text-green-600 dark:text-green-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    Department Vision
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    To create competent, ethical, and innovative IT professionals capable of contributing to society through technological excellence, lifelong learning, research, and leadership.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-2xl transform rotate-3 hover:rotate-6 transition-transform duration-300"></div>
                <div className="absolute inset-0 w-full h-96 transform -rotate-1 hover:rotate-1 transition-transform duration-300 rounded-2xl overflow-hidden">
                  <img
                    src="/it.webp"
                    alt="Department Picture"
                    className="w-full h-full object-cover"
                  />
                </div>

              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">1+</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Programme Offered
              M.Sc. Information Technology</h4>
              <p className="text-gray-600 dark:text-gray-400">Continuous learning and skill development</p>
            </div>

            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">2+</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Faculty Members</h4>
              <p className="text-gray-600 dark:text-gray-400">Experienced Guest Lecturers</p>
            </div>

            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">99 %</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Student Development</h4>
              <p className="text-gray-600 dark:text-gray-400">Innovation • Research • Placement</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;