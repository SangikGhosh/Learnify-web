import React, { useState } from 'react';

interface SubCategory {
  name: string;
  topics?: string[];
}

interface Category {
  name: string;
  subcategories?: SubCategory[];
}

const categories: Category[] = [
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
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <div className="relative">
      <button
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="flex items-center px-4 py-2 font-medium text-black hover:text-purple-600 transition-colors duration-200 select-none"
      >
        Explore
        <svg 
          className={`ml-1 w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div 
          className="absolute top-full left-0 z-50 flex bg-white border border-gray-200 shadow-xl rounded-b-md rounded-r-md max-h-[70vh] overflow-hidden"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {/* Left Column: Main Categories */}
          <ul className="w-64 border-r border-gray-100 overflow-y-auto">
            {categories.map((cat) => (
              <li
                key={cat.name}
                className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150 flex justify-between items-center select-none ${
                  hoveredCategory === cat.name ? 'bg-gray-50 text-purple-600' : 'text-gray-800'
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
                          <li 
                            key={topic} 
                            className="text-sm text-gray-600 hover:text-purple-600 transition-colors duration-150 cursor-pointer select-none"
                          >
                            {topic}
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
  );
};

export default ExploreDropdown;