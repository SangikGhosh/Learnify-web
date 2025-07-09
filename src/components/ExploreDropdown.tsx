/* eslint-disable react-refresh/only-export-components */
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GoArrowLeft } from "react-icons/go";

interface SubCategory {
  name: string;
  topics?: string[];
}

interface Category {
  name: string;
  subcategories?: SubCategory[];
}

export const categories: Category[] = [
  {
    name: 'Development',
    subcategories: [
      {
        name: 'Web Development',
        topics: [
          'JavaScript', 'React', 'Angular', 'Vue', 'Node.js', 'Express',
          'Django', 'Flask', 'Laravel', 'Spring Boot', 'HTML/CSS',
          'TypeScript', 'GraphQL', 'REST APIs', 'JWT Authentication'
        ],
      },
      {
        name: 'Mobile Development',
        topics: [
          'React Native', 'Flutter', 'Swift', 'Kotlin', 'Android',
          'iOS', 'Ionic', 'Firebase', 'Push Notifications'
        ],
      },
      {
        name: 'Game Development',
        topics: [
          'Unity', 'Unreal Engine', 'C#', 'C++', 'Game Design',
          'AR/VR Development', 'Mobile Games'
        ],
      },
      {
        name: 'Data Science & AI',
        topics: [
          'Python', 'R', 'Machine Learning', 'Deep Learning', 'TensorFlow',
          'PyTorch', 'Keras', 'Pandas', 'NumPy', 'Data Visualization',
          'Natural Language Processing', 'Computer Vision', 'SQL'
        ],
      },
      {
        name: 'Cloud Computing',
        topics: [
          'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes',
          'Serverless', 'Microservices', 'CI/CD', 'Terraform', 'DevOps'
        ],
      },
    ],
  },
  {
    name: 'Business',
    subcategories: [
      {
        name: 'Entrepreneurship',
        topics: [
          'Startup Fundamentals', 'Business Planning',
          'Funding & Investment', 'Lean Startup', 'Market Research'
        ]
      },
      {
        name: 'Finance & Accounting',
        topics: [
          'Financial Analysis', 'Personal Finance', 'Stock Market',
          'Cryptocurrency', 'Blockchain', 'Excel for Finance'
        ]
      },
      {
        name: 'Marketing',
        topics: [
          'Digital Marketing', 'Content Marketing', 'SEO',
          'Social Media Marketing', 'Email Marketing',
          'Growth Hacking', 'Marketing Analytics'
        ]
      },
    ],
  },
  {
    name: 'IT & Software',
    subcategories: [
      {
        name: 'Cybersecurity',
        topics: [
          'Ethical Hacking', 'Penetration Testing',
          'Network Security', 'Cryptography', 'Risk Management'
        ]
      },
      {
        name: 'Systems Administration',
        topics: [
          'Linux Administration', 'Windows Server',
          'Virtualization', 'Shell Scripting', 'PowerShell'
        ]
      },
      {
        name: 'Database Management',
        topics: [
          'SQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Redis'
        ]
      },
      {
        name: 'Software Engineering',
        topics: [
          'Algorithms', 'Data Structures', 'Design Patterns',
          'System Design', 'Testing', 'Debugging'
        ]
      },
    ],
  },
  {
    name: 'Design',
    subcategories: [
      {
        name: 'UI/UX Design',
        topics: [
          'Figma', 'Sketch', 'Adobe XD', 'User Research',
          'Wireframing', 'Prototyping', 'Design Systems',
          'Accessibility', 'Mobile UI'
        ]
      },
      {
        name: 'Graphic Design',
        topics: [
          'Photoshop', 'Illustrator', 'Typography',
          'Logo Design', 'Brand Identity'
        ]
      },
      {
        name: 'Web Design',
        topics: [
          'Responsive Design', 'CSS Grid', 'Flexbox',
          'Bootstrap', 'Tailwind CSS', 'Design to Code'
        ]
      },
    ],
  },
  {
    name: 'Personal Development',
    subcategories: [
      {
        name: 'Career Development',
        topics: [
          'Resume Writing', 'Interview Skills', 'Networking',
          'Personal Branding', 'Time Management', 'Productivity'
        ]
      },
      {
        name: 'Communication Skills',
        topics: [
          'Public Speaking', 'Business Writing', 'Active Listening',
          'Storytelling', 'Persuasion'
        ]
      },
    ],
  },
];

const ExploreDropdown: React.FC = () => {
  // Desktop state
  const [isDesktopOpen, setIsDesktopOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Mobile state
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mobileOpenCategory, setMobileOpenCategory] = useState<string | null>(null);
  const [mobileOpenSubcategory, setMobileOpenSubcategory] = useState<string | null>(null);

  const getTopicUrl = (topic: string) => {
    return `/search?topic=${encodeURIComponent(topic.toLowerCase())}`;
  };

  const mobileMenuVariants = {
    open: { x: 0 },
    closed: { x: '-100%' },
  };

  const handleMobileBack = () => {
    if (mobileOpenSubcategory) {
      setMobileOpenSubcategory(null);
    } else if (mobileOpenCategory) {
      setMobileOpenCategory(null);
    } else {
      setIsMobileOpen(false);
    }
  };

  return (
    <div className="relative">
      {/* Desktop View (lg and above) */}
      <div className="hidden lg:block">
        <button
          onMouseEnter={() => setIsDesktopOpen(true)}
          onMouseLeave={() => setIsDesktopOpen(false)}
          className="flex items-center px-4 py-2 font-semibold text-black hover:text-blue-600 transition-colors duration-200 select-none"
        >
          Explore
          <svg
            className={`ml-1 w-4 h-4 transition-transform duration-200 ${isDesktopOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isDesktopOpen && (
          <div
            className="absolute top-full left-0 z-50 flex bg-white border border-gray-200 shadow-xl rounded-b-md rounded-r-md max-h-[70vh] overflow-hidden"
            onMouseEnter={() => setIsDesktopOpen(true)}
            onMouseLeave={() => setIsDesktopOpen(false)}
          >
            {/* Left Column: Main Categories */}
            <ul className="w-64 border-r border-gray-100 overflow-y-auto">
              {categories.map((cat) => (
                <li
                  key={cat.name}
                  className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150 flex justify-between items-center select-none ${hoveredCategory === cat.name ? 'bg-gray-50 text-blue-600' : 'text-gray-800'
                    }`}
                  onMouseEnter={() => setHoveredCategory(cat.name)}
                >
                  <span>{cat.name}</span>
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </li>
              ))}
            </ul>

            {/* Right Column: Subcategories */}
            {hoveredCategory && (
              <div className="w-96 p-6 grid grid-cols-2 gap-6 overflow-y-auto">
                {categories
                  .find((cat) => cat.name === hoveredCategory)
                  ?.subcategories?.map((sub) => (
                    <div key={sub.name} className="mb-2">
                      <h4 className="font-semibold text-gray-900 mb-2 select-none">{sub.name}</h4>
                      {sub.topics && (
                        <ul className="space-y-1">
                          {sub.topics.map((topic) => (
                            <li key={topic}>
                              <a
                                href={getTopicUrl(topic)}
                                className="text-sm text-gray-600 hover:text-purple-600 transition-colors duration-150 cursor-pointer select-none block"
                              >
                                {topic}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile View (below lg) */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="flex items-center text-black hover:text-blue-600 transition-colors duration-200 select-none"
        >
          Explore Course
          <svg
            className={`ml-1 w-4 h-4 transition-transform duration-200`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <AnimatePresence>
          {isMobileOpen && (
            <>
              <motion.div
                className="fixed inset-0 z-40 lg:hidden backdrop-blur-sm bg-opacity-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileOpen(false)}
              />

              <motion.div
                className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white z-50 shadow-xl lg:hidden overflow-y-auto"
                initial="closed"
                animate="open"
                exit="closed"
                variants={mobileMenuVariants}
                transition={{ type: 'tween', ease: 'easeInOut' }}
              >
                <div className="flex flex-col h-full p-4">
                  <div className="flex-grow pt-4 pb-4 space-y-2 overflow-y-auto">
                    <div className="">
                      <button
                        className="flex items-center space-x-2 font-bold text-black transition-all"
                        onClick={handleMobileBack}
                      >
                        <GoArrowLeft className="w-5 h-5" />
                        <span>Back</span>
                      </button>
                    </div>
                    {categories.map((category) => (
                      <div key={category.name} className="border-b border-gray-100">
                        <button
                          className={`w-full px-4 py-3 text-left font-medium flex justify-between items-center ${mobileOpenCategory === category.name ? 'text-blue-600' : 'text-gray-900'}`}
                          onClick={() => {
                            setMobileOpenCategory(mobileOpenCategory === category.name ? null : category.name);
                            setMobileOpenSubcategory(null);
                          }}
                        >
                          <span>{category.name}</span>
                          {category.subcategories && (
                            <svg
                              className={`w-5 h-5 transform transition-transform ${mobileOpenCategory === category.name ? 'rotate-180' : ''}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          )}
                        </button>

                        <AnimatePresence>
                          {mobileOpenCategory === category.name && category.subcategories && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.15 }}
                              className="pl-4 overflow-hidden"
                            >
                              {category.subcategories.map((subcategory) => (
                                <div key={subcategory.name} className="border-b border-gray-100">
                                  <button
                                    className={`w-full px-4 py-2 text-left font-medium flex justify-between items-center ${mobileOpenSubcategory === subcategory.name ? 'text-blue-600' : 'text-gray-700'}`}
                                    onClick={() => {
                                      setMobileOpenSubcategory(mobileOpenSubcategory === subcategory.name ? null : subcategory.name);
                                    }}
                                  >
                                    <span>{subcategory.name}</span>
                                    {subcategory.topics && (
                                      <svg
                                        className={`w-4 h-4 transform transition-transform ${mobileOpenSubcategory === subcategory.name ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                      </svg>
                                    )}
                                  </button>

                                  <AnimatePresence>
                                    {mobileOpenSubcategory === subcategory.name && subcategory.topics && (
                                      <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.15 }}
                                        className="pl-4 overflow-hidden"
                                      >
                                        {subcategory.topics.map((topic) => (
                                          <a
                                            key={topic}
                                            href={getTopicUrl(topic)}
                                            className="block px-4 py-2 text-sm text-gray-600 hover:text-purple-600"
                                            onClick={() => setIsMobileOpen(false)}
                                          >
                                            {topic}
                                          </a>
                                        ))}
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ExploreDropdown;