import React, { useState } from 'react';
import { Trophy, Calendar, MapPin, Award, ShieldCheck, GraduationCap, Medal, Hash } from 'lucide-react';

interface RankStudent {
  name: string;
  regNo: string;
  year: string;
  rank: string;
  image: string;
  badgeColor: string;
}

const Achievements: React.FC = () => {
  // University Rank Holders Data
  const universityRanks: RankStudent[] = [
    {
      name: "ANITHA R",
      regNo: "2310485002",
      year: "2024–2026",
      rank: "University 1st Rank",
      image: "/ranks/anitha.jpg",
      badgeColor: "from-amber-500 to-yellow-500 text-white",
    },
    {
      name: "BHARATH K",
      regNo: "2310485007",
      year: "2024–2026",
      rank: "University 2nd Rank",
      image: "/ranks/bharath.jpg",
      badgeColor: "from-slate-400 to-gray-500 text-white",
    },
    {
      name: "DIVYA M",
      regNo: "2310485014",
      year: "2024–2026",
      rank: "University 5th Rank",
      image: "/ranks/divya.jpg",
      badgeColor: "from-amber-700 to-orange-600 text-white",
    },
  ];

  // Department Rank Holders Data Grouped by Batch
  const departmentRanksByYear = {
    "Batch 2024–2026": [
      { name: "EZHIL RAJ S", regNo: "2310485018", year: "2024–2026", rank: "Dept 1st Rank", image: "/ranks/ezhil.jpg", badgeColor: "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400" },
      { name: "GAYATHRI V", regNo: "2310485021", year: "2024–2026", rank: "Dept 2nd Rank", image: "/ranks/gayathri.jpg", badgeColor: "bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400" },
      { name: "HARIHARAN M", regNo: "2310485025", year: "2024–2026", rank: "Dept 3rd Rank", image: "/ranks/hari.jpg", badgeColor: "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300" },
    ],
    "Batch 2023–2025": [
      { name: "KAVYA P", regNo: "2210485032", year: "2023–2025", rank: "Dept 1st Rank", image: "/ranks/kavya.jpg", badgeColor: "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400" },
      { name: "MANOJ KUMAR R", regNo: "2210485041", year: "2023–2025", rank: "Dept 2nd Rank", image: "/ranks/manoj.jpg", badgeColor: "bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400" },
    ]
  };

  const [activeTab, setActiveTab] = useState<keyof typeof departmentRanksByYear>("Batch 2024–2026");

  return (
    <section id="achievements" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
              Department <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">Achievements</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Celebrating academic excellence, university rank holders, department toppers, placements, and student accomplishments.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600"></div>

            {/* FIRST TIMELINE ITEM: OVERVIEW & GENERAL RANK METRICS */}
            <div className="relative flex items-center mb-12">
              <div className="absolute left-6 w-4 h-4 bg-blue-600 rounded-full border-4 border-white dark:border-gray-800 shadow-lg"></div>
              
              <div className="ml-20 w-full">
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-8">
                  
                  <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 gap-4">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex-shrink-0">
                        <Trophy className="text-blue-600 dark:text-blue-400" size={32} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white leading-tight">
                          University & Department Rank Holders
                        </h3>
                        <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold">
                          Department of Information Technology
                        </p>
                      </div>
                    </div>
                    <div className="text-left md:text-right flex-shrink-0">
                      <div className="flex items-center text-gray-600 dark:text-gray-400 mb-1 text-sm font-medium">
                        <Calendar size={16} className="mr-2" />
                        <span>Academic Year: 2025–2026</span>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm font-medium">
                        <MapPin size={16} className="mr-2" />
                        <span>Annamalai University</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                        <Award className="text-yellow-500 mr-2" size={20} />
                        Recognitions
                      </h4>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-400 font-medium text-sm md:text-base">
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                          University First Rank
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                          University Second Rank
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                          Department First Rank
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                          Gold Medal Winners
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                          Academic Excellence Awards
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                          100% Pass Percentage
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                        <ShieldCheck className="text-green-500 mr-2" size={20} />
                        Academic Highlights
                      </h4>
                      <div className="space-y-4">
                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-800/40">
                          <h5 className="font-bold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wider mb-1">Department Toppers</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Highest CGPA holders of each academic year.</p>
                        </div>
                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-800/40">
                          <h5 className="font-bold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wider mb-1">Campus Placements</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Students placed in reputed multinational companies.</p>
                        </div>
                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-800/40">
                          <h5 className="font-bold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wider mb-1">Higher Education</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Alumni pursuing M.Sc., M.Tech., MBA, and Ph.D. programs.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-5 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-100/30 dark:border-blue-900/20">
                    <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed">
                      The Department of Information Technology consistently encourages academic excellence, 
                      innovation, research, technical competitions, internships, and industry collaborations. 
                      Our students continue to secure university ranks, academic awards, excellent placements, 
                      and recognition at state and national levels.
                    </p>
                  </div>

                </div>
              </div>
            </div>

            {/* SECOND TIMELINE ITEM: UNIVERSITY RANK HOLDERS PROFILE SHOWCASE */}
            <div className="relative flex items-center mb-12">
              <div className="absolute left-6 w-4 h-4 bg-amber-500 rounded-full border-4 border-white dark:border-gray-800 shadow-lg"></div>
              
              <div className="ml-20 w-full">
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 md:p-8">
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-6 pb-2 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                    <Medal className="text-amber-500" size={22} />
                    University Rank Holders Showcase
                  </h4>
                  
                  {/* Grid Layout Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {universityRanks.map((student) => (
                      <div key={student.regNo} className="group bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700/50 flex flex-col hover:shadow-md transition-all">
                        
                        {/* 70% Height Image Block */}
                        <div className="h-48 relative bg-gray-200 dark:bg-gray-700 overflow-hidden">
                          <img 
                            src={student.image} 
                            alt={student.name} 
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                            onError={(e) => { e.currentTarget.style.opacity = '0.2'; }}
                          />
                          <div className={`absolute top-3 left-3 px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r ${student.badgeColor}`}>
                            {student.rank}
                          </div>
                        </div>

                        {/* 30% Height Content Block */}
                        <div className="p-4 flex-grow bg-white dark:bg-gray-900/60 border-t border-gray-100 dark:border-gray-800 flex flex-col justify-between">
                          <h5 className="font-bold text-gray-800 dark:text-white truncate text-base">{student.name}</h5>
                          <div className="mt-2 space-y-1 text-xs text-gray-500 dark:text-gray-400 font-medium">
                            <div className="flex items-center gap-1.5"><Hash size={13} /> Reg No: <span className="text-gray-700 dark:text-gray-300">{student.regNo}</span></div>
                            <div className="flex items-center gap-1.5"><Calendar size={13} /> Year: <span className="text-gray-700 dark:text-gray-300">{student.year}</span></div>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* THIRD TIMELINE ITEM: DEPARTMENT TOPPERS PROFILE SHOWCASE BY YEAR */}
            <div className="relative flex items-center mb-12">
              <div className="absolute left-6 w-4 h-4 bg-purple-500 rounded-full border-4 border-white dark:border-gray-800 shadow-lg"></div>
              
              <div className="ml-20 w-full">
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 md:p-8">
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-2 border-b border-gray-100 dark:border-gray-800">
                    <h4 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                      <GraduationCap className="text-purple-500" size={24} />
                      Department Top Rankers
                    </h4>
                    
                    {/* Filter Navigation Tabs */}
                    <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg text-xs font-bold">
                      {Object.keys(departmentRanksByYear).map((batch) => (
                        <button
                          key={batch}
                          onClick={() => setActiveTab(batch as any)}
                          className={`px-3 py-1.5 rounded-md transition-all ${
                            activeTab === batch 
                              ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm' 
                              : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                          }`}
                        >
                          {batch}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Filtered Grid Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {departmentRanksByYear[activeTab].map((student) => (
                      <div key={student.regNo} className="group bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700/50 flex flex-col hover:shadow-md transition-all">
                        
                        {/* 70% Height Image Block */}
                        <div className="h-48 relative bg-gray-200 dark:bg-gray-700 overflow-hidden">
                          <img 
                            src={student.image} 
                            alt={student.name} 
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                            onError={(e) => { e.currentTarget.style.opacity = '0.2'; }}
                          />
                          <div className={`absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${student.badgeColor}`}>
                            {student.rank}
                          </div>
                        </div>

                        {/* 30% Height Content Block */}
                        <div className="p-4 flex-grow bg-white dark:bg-gray-900/60 border-t border-gray-100 dark:border-gray-800 flex flex-col justify-between">
                          <h5 className="font-bold text-gray-800 dark:text-white truncate text-base">{student.name}</h5>
                          <div className="mt-2 space-y-1 text-xs text-gray-500 dark:text-gray-400 font-medium">
                            <div className="flex items-center gap-1.5"><Hash size={13} /> Reg No: <span className="text-gray-700 dark:text-gray-300">{student.regNo}</span></div>
                            <div className="flex items-center gap-1.5"><Calendar size={13} /> Year: <span className="text-gray-700 dark:text-gray-300">{student.year}</span></div>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </div>

            {/* FOURTH TIMELINE ITEM: VISION STATEMENT */}
            <div className="relative flex items-center">
              <div className="absolute left-6 w-4 h-4 bg-indigo-600 rounded-full border-4 border-white dark:border-gray-800 shadow-lg"></div>
              
              <div className="ml-20 w-full">
                <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-8 text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/5 pointer-events-none" />

                  <div className="relative flex items-center space-x-4 mb-4 z-10">
                    <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl">
                      <GraduationCap className="text-white" size={32} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold tracking-wide">Our Vision</h3>
                      <p className="text-purple-100 font-medium">Excellence in Information Technology Education</p>
                    </div>
                  </div>

                  <p className="relative text-purple-50 text-sm md:text-base leading-relaxed font-medium z-10 max-w-3xl">
                    To nurture competent IT professionals through quality education, innovation, research, 
                    entrepreneurship, ethical values, and industry collaboration, preparing students to become 
                    globally responsible technology leaders.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Achievements;