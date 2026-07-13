import React, { useState, useEffect } from 'react';
import { Github, Mail, Phone, MapPin, ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'Innovation | Excellence | Technology | Research | Future Ready Professionals';

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 dark:bg-blue-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 dark:bg-purple-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Profile Image Placeholder */}
          <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-2xl transform hover:scale-110 transition-transform duration-300">
            IT
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 dark:text-white mb-6">
            <span className="block">IT</span>
            <span className="text-blue-600 dark:text-blue-400">Department</span>
          </h1>

          <div className="h-16 mb-8">
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-medium">
              {displayText}
              <span className="animate-blink">|</span>
            </p>
          </div>

          <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Department of Information Technology - Arignar Anna Government Arts College ,Villupuram
          Empowering students through quality education, innovation, research, and industry-oriented learning to shape the next generation of IT professionals.
          </p>

          {/* Contact Info */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-12">
            <a
              href="tel:8667723804"
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 group"
            >
              <Phone size={20} className="group-hover:animate-bounce" />
              <span>+91 4146-240681</span>
            </a>
            <a
              href="mailto:it@gmail.com"
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 group"
            >
              <Mail size={20} className="group-hover:animate-bounce" />
              <span>vpmgac.it@gmail.com</span>
            </a>
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
              
              <span>🏫 Arignar Anna Government Arts College📍 Keezperumpakkam,College Road,Villupuram – 605602
              🎓 M.Sc. Information Technology</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={scrollToAbout}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Explore Department
            </button>
            <a
              href="#gallery"
              // target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-8 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-600 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
            >
              
              <span>View Gallery</span>
            </a>
          </div>

          {/* Scroll Indicator */}
          <button
            onClick={scrollToAbout}
            className="animate-bounce text-gray-400 dark:text-gray-600 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
          >
            <ChevronDown size={32} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;