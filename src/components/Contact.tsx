import React, { useState } from "react";
import {
  Building2,
  GraduationCap,
  MapPin,
  Globe,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
} from "lucide-react";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate frontend validation & success state switch
    setIsSubmitted(true);

    // Reset Form Fields
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });

    // Automatically fade back to form option after 4 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 4000);
  };

  const contactInfo = [
    {
      icon: Building2,
      title: "College",
      value: "Arignar Anna Government Arts College",
      subtext: "",
      href: "#",
      color: "blue",
    },
    {
      icon: GraduationCap,
      title: "Department",
      value: "Information Technology",
      subtext: "M.Sc. Information Technology",
      href: "#",
      color: "purple",
    },
    {
      icon: MapPin,
      title: "Address",
      value: "Keezperumpakkam, College Road, Villupuram – 605602, Tamil Nadu",
      subtext: "",
      href: "https://maps.google.com",
      color: "green",
    },
    {
      icon: Globe,
      title: "Official Website",
      value: "www.aagacvpm.edu.in",
      subtext: "",
      href: "https://www.aagacvpm.edu.in/",
      color: "cyan",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-800/30",
      purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border border-purple-200/50 dark:border-purple-800/30",
      green: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 border border-green-200/50 dark:border-green-800/30",
      cyan: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 border border-cyan-200/50 dark:border-cyan-800/30",
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">

          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
              Contact <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">Department</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Get in touch with the Department of Information Technology for admissions, academics, events, and general inquiries.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-start">

            {/* Left Side: Contact Info & Meta Cards */}
            <div className="lg:col-span-5 space-y-6">
              
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                Office Information
              </h3>

              {/* Dynamic Grid for Faculty/Office Info blocks */}
              <div className="grid gap-4">
                {contactInfo.map((info, idx) => {
                  const IconElement = info.icon;
                  return (
                    <a
                      key={idx}
                      href={info.href}
                      target={info.href.startsWith("http") ? "_blank" : undefined}
                      rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className={`p-5 rounded-2xl bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md block ${
                        info.href !== "#" ? "cursor-pointer" : "cursor-default pointer-events-none"
                      }`}
                    >
                      <div className="flex gap-4 items-start">
                        <div className={`p-3 rounded-xl flex-shrink-0 ${getColorClasses(info.color)}`}>
                          <IconElement size={22} />
                        </div>
                        <div className="flex-grow min-w-0">
                          <h4 className="font-bold text-sm uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                            {info.title}
                          </h4>
                          <p className="text-base text-gray-800 dark:text-gray-200 font-semibold leading-tight">
                            {info.value}
                          </p>
                          {info.subtext && (
                            <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mt-1">
                              {info.subtext}
                            </p>
                          )}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* Quick Academic Details Information Block */}
              <div className="p-6 rounded-2xl border border-gray-100 dark:border-gray-800/60 bg-gradient-to-br from-blue-50/60 to-purple-50/60 dark:from-blue-900/10 dark:to-purple-900/10 backdrop-blur-md shadow-sm space-y-4">
                <div className="flex items-center gap-3 text-gray-800 dark:text-white">
                  <Clock size={20} className="text-blue-600 dark:text-blue-400" />
                  <h4 className="text-lg font-bold">Quick Academic Overview</h4>
                </div>
                
                <div className="grid grid-cols-2 gap-4 border-t border-gray-200/40 dark:border-gray-700/40 pt-3 text-sm">
                  <div>
                    <span className="block text-xs text-gray-400 dark:text-gray-500 uppercase font-semibold">Office Hours</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Mon – Fri, 9:30 AM – 2:00 PM</span>
                  </div>
                  <div>
                    <span className="block text-xs text-gray-400 dark:text-gray-500 uppercase font-semibold">Programme Offered</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">M.Sc. Information Technology</span>
                  </div>
                  <div className="col-span-2">
                    <span className="block text-xs text-gray-400 dark:text-gray-500 uppercase font-semibold">Affiliation</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Annamalai University</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Side: Inquiry Form */}
            <div className="lg:col-span-7 bg-gray-50/60 dark:bg-gray-800/60 backdrop-blur-md border border-gray-100 dark:border-gray-700/50 rounded-2xl p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-purple-600" />

              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Send an Inquiry
              </h3>

              {isSubmitted ? (
                <div className="text-center py-12 flex flex-col items-center justify-center min-h-[400px]">
                  <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6 animate-bounce">
                    <CheckCircle size={44} className="text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                    Thank you for your interest!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-center max-w-sm leading-relaxed font-medium">
                    Your inquiry has been successfully recorded. The department will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="username@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="Contact number"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="Inquiry topic"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Write details regarding your inquiry here..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl font-bold transition-all shadow-md active:scale-98 hover:shadow-lg"
                  >
                    <Send size={18} />
                    <span>Send Inquiry</span>
                  </button>
                </form>
              )}

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;