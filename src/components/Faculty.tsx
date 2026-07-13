import React, { useEffect, useRef, useState } from 'react';
import { GraduationCap, User, BadgeCheck } from 'lucide-react';
import { fetchFaculty, facultyPhotoUrl, FacultyRecord } from '../lib/api';

// Same visual palette the design used to hardcode per-member. Since the
// admin-managed data doesn't carry a color/icon field, we cycle through the
// same set of looks by index so the UI is pixel-for-pixel unchanged.
const STYLE_PALETTE = [
  {
    icon: GraduationCap,
    color: 'from-blue-500 to-blue-600',
    iconBg: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
  },
  {
    icon: User,
    color: 'from-purple-500 to-purple-600',
    iconBg: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
  },
];

const Faculty: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const [facultyMembers, setFacultyMembers] = useState<FacultyRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    let isMounted = true;
    fetchFaculty()
      .then((data) => {
        if (isMounted) setFacultyMembers(data);
      })
      .catch(() => {
        if (isMounted) setError('Unable to load faculty details right now.');
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="faculty" ref={sectionRef} className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
              Faculty <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">Members</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Meet our experienced faculty members dedicated to academic excellence, innovation, and student success.
            </p>
          </div>

          {isLoading ? (
            <p className="text-center text-gray-400">Loading faculty members…</p>
          ) : error ? (
            <p className="text-center text-gray-400">{error}</p>
          ) : facultyMembers.length === 0 ? (
            <p className="text-center text-gray-400">Faculty details will appear here soon.</p>
          ) : (
            <div className="flex flex-wrap justify-center gap-8">
              {facultyMembers.map((member, index) => {
                const style = STYLE_PALETTE[index % STYLE_PALETTE.length];
                const IconComponent = style.icon;
                const photoUrl = facultyPhotoUrl(member.photo);

                return (
                  <div
                    key={member.id}
                    className="relative w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center"
                    style={{
                      animationDelay: `${index * 0.15}s`,
                      animation: isVisible ? 'fadeInUp 0.6s ease-out forwards' : 'none',
                      opacity: isVisible ? 1 : 0,
                    }}
                  >
                    {/* Accent Top Border Bar */}
                    <div className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl bg-gradient-to-r ${style.color}`} />

                    {/* Profile Image Container */}
                    <div className="relative mb-6 mt-2">
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${style.color} blur opacity-40 group-hover:opacity-70 transition-opacity duration-300`} />
                      <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-md bg-gray-100 dark:bg-gray-700">
                        {photoUrl ? (
                          <img
                            src={photoUrl}
                            alt={member.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        ) : null}
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-200 dark:bg-gray-700 -z-10">
                          <User size={40} />
                        </div>
                      </div>
                      {/* Corner Icon Badge */}
                      <div className={`absolute bottom-0 right-0 p-2 rounded-full shadow-md ${style.iconBg}`}>
                        <IconComponent size={20} />
                      </div>
                    </div>

                    {/* Faculty Details */}
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                        {member.name}
                      </h3>
                      <BadgeCheck size={18} className="text-blue-500 dark:text-blue-400 flex-shrink-0" />
                    </div>

                    <p className={`text-sm font-semibold uppercase tracking-wider mb-4 bg-gradient-to-r ${style.color} bg-clip-text text-transparent`}>
                      {member.designation}
                    </p>

                    <div className="w-full border-t border-gray-100 dark:border-gray-800 my-4" />

                    <div className="flex-grow flex flex-col justify-center">
                      <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">
                        Qualifications
                      </span>
                      <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                        {member.qualification}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <style>{`
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

export default Faculty;
