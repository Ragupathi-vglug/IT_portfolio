import React, { useEffect, useRef, useState } from 'react';
import { 
  Cpu, 
  Music, 
  Trophy, 
  GraduationCap, 
  Briefcase, 
  Monitor, 
  Camera,
  Images
} from "lucide-react";

const Gallery: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const galleryItems = [
    {
      title: "AI Workshop",
      image: "/gallery/ai.jpg",
      icon: Cpu,
      color: "from-blue-500 to-cyan-500",
      iconBg: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
      description: "Hands-on Artificial Intelligence workshops, seminars, and emerging technology sessions conducted for students.",
      highlights: ["AI Sessions", "Machine Learning", "Expert Talks", "Project Demonstration"],
    },
    {
      title: "Department function",
      image: "/gallery/kalai.jpg",
      icon: Music,
      color: "from-purple-500 to-pink-500",
      iconBg: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
      description: "Celebrate talent, creativity, and teamwork with exciting events including Treasure Hunt, Cooking Without Fire, Drawing, Music, Dance, and many more.",
      highlights: ["Cooking Without Fire", "Treasure Hunt", "Music", "Fine Arts"],
    },
    {
      title: "PISMA",
      image: "/gallery/sports.jpg",
      icon: Trophy,
      color: "from-green-500 to-emerald-500",
      iconBg: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
      description: "PISMA was inaugurated on **09-01-2020** to enhance the academic and professional skills of M.Sc. IT students.The event was graced by the Principal, HOD, faculty members, and students.",
      highlights:[
        "Association Meetings","Academic Activities","Guest Lectures","Student Development"],
    },
    {
      title: "Department Inauguration",
      image: "/gallery/inauguration.jpg",
      icon: GraduationCap,
      color: "from-orange-500 to-amber-500",
      iconBg: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
      description: "Department inauguration ceremonies welcoming students and introducing academic opportunities.",
      highlights: ["Welcome Address", "Guest Lecture", "Student Orientation", "Faculty Interaction"],
    },
    {
      title: "Placement Cell",
      image: "/gallery/placement.jpg",
      icon: Briefcase,
      color: "from-indigo-500 to-blue-500",
      iconBg: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400",
      description: "Career guidance programs, placement training, aptitude sessions, resume workshops, and interview preparation.",
      highlights: ["Resume Building", "Aptitude Training", "Mock Interviews", "Career Guidance"],
    },
    {
      title: "Computer Laboratory",
      image: "/gallery/lab.jpg",
      icon: Monitor,
      color: "from-cyan-500 to-teal-500",
      iconBg: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400",
      description: "Modern computer laboratories equipped with updated systems supporting programming, networking, AI, and practical learning.",
      highlights: ["Programming Lab", "Networking", "AI Practice", "Software Development"],
    },
  ];

  return (
    <section id="gallery" ref={sectionRef} className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
              Department <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">Gallery</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Explore the academic, technical, cultural, sports, and extracurricular activities conducted by the Department of Information Technology.
            </p>
          </div>

          {/* Cards Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.title}
                  className="group relative flex flex-col bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animation: isVisible ? 'fadeInUp 0.6s ease-out forwards' : 'none',
                    opacity: isVisible ? 1 : 0,
                  }}
                >
                  {/* Top Image Window + Zoom Frame */}
                  <div className="relative h-52 w-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      onError={(e) => {
                        // Keeps layouts stable if images are temporarily missing during staging
                        e.currentTarget.style.opacity = '0.3';
                      }}
                    />
                    
                    {/* Glassmorphic/Gradient Overlay Mask */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                    
                    {/* Floating Tech Context Badge */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-3 z-10">
                      <div className={`p-2.5 rounded-xl backdrop-blur-md bg-white/90 dark:bg-gray-900/90 shadow-md ${item.iconBg.split(' ').slice(2).join(' ')}`}>
                        <IconComponent size={20} />
                      </div>
                      <h3 className="text-lg font-bold text-white tracking-wide drop-shadow-sm">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body Copy Block */}
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-5 leading-relaxed min-h-[4.5rem]">
                      {item.description}
                    </p>

                    {/* Highlights Checked Bullets */}
                    <div className="mb-6 flex-grow">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
                        Activity Highlights
                      </h4>
                      <ul className="grid grid-cols-2 gap-x-2 gap-y-2">
                        {item.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-700 dark:text-gray-400 font-medium">
                            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${item.color} mr-2 flex-shrink-0`} />
                            <span className="truncate">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Integrated CTA Button */}
                    <button className="w-full py-2.5 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-white group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:border-transparent transition-all duration-300 flex items-center justify-center gap-2 shadow-sm">
                      <Camera size={16} />
                      <span>View Photos</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Clean Base Center Footer Link Container */}
          <div className="text-center mt-16">
            <a
              href="#gallery"
              className="inline-flex items-center space-x-2 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <Images size={18} />
              <span>View Complete Gallery</span>
            </a>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Gallery;