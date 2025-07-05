import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

interface SearchbarProps {
  isSearchOpen: boolean;
  toggleSearch: () => void;
  isMobile?: boolean;
}

const Searchbar: React.FC<SearchbarProps> = ({ isSearchOpen, toggleSearch, isMobile = false }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const popularCourses = [
    "Artificial Intelligence",
    "Data Science",
    "Blockchain Technology",
    "Cybersecurity",
    "Mobile App Development",
    "Machine Learning",
    "DevOps Practices",
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    setIsSearchFocused(false);
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    inputRef.current?.focus();
  };

  const searchVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 20
      }
    },
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2
      }
    }
  };

  const suggestionsVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 20,
        delay: 0.1
      }
    },
    closed: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.15
      }
    }
  };

  const suggestionItemVariants = {
    initial: { opacity: 0, y: -5 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2 }
    },
    hover: {
      backgroundColor: "#f3f4f6",
      scale: 1.02,
      transition: { duration: 0.15 }
    },
    tap: {
      scale: 0.98
    }
  };

  if (isMobile) {
    return (
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            className="absolute left-0 right-0 z-50 px-4 lg:hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={searchVariants}
          >
            <div ref={searchRef} className="relative">
              <form onSubmit={handleSearch}>
                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  className="w-full py-2 pl-12 pr-16 text-gray-900 bg-white border-2 border-white rounded-full focus:outline-none transition-all duration-200 shadow-lg"
                  placeholder={`Search anything...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={handleSearchFocus}
                  autoFocus
                />
                <motion.button
                  type="button"
                  className="absolute inset-y-0 right-0 px-4 text-sm font-medium text-white bg-black rounded-r-full hover:bg-yellow-400 hover:text-black focus:bg-yellow-400 focus:text-black transition-all duration-200"
                  whileHover={{ backgroundColor: "#FACC15", color: "#000000" }}
                  onClick={toggleSearch}
                >
                  Close
                </motion.button>
              </form>

              <AnimatePresence>
                {isSearchFocused && (
                  <motion.div
                    className="absolute z-10 w-full mt-2 overflow-hidden bg-white rounded-xl shadow-xl border border-gray-100"
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={suggestionsVariants}
                  >
                    <div className="py-2">
                      <div className="px-4 py-3 text-lg font-bold text-black border-b border-gray-100 bg-gray-50">
                        Popular on Learnify
                      </div>
                      <div className="divide-y divide-gray-100">
                        {popularCourses.map((course, index) => (
                          <motion.div
                            key={index}
                            className="flex items-center px-4 py-3 cursor-pointer"
                            onClick={() => handleSuggestionClick(course)}
                            variants={suggestionItemVariants}
                            initial="initial"
                            animate="animate"
                            whileTap="tap"
                          >
                            <div className="flex-shrink-0 mr-3 text-gray-400">
                              <svg
                                className="w-5 h-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <div className="text-sm font-medium text-gray-800">{course}</div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
      <div ref={searchRef} className="relative w-full">
        <form onSubmit={handleSearch}>
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            ref={inputRef}
            type="text"
            className="w-full py-3 pl-10 pr-5 text-gray-900 placeholder-gray-800 bg-white border border-gray-600 rounded-full focus:border-black focus:shadow-2xl focus:outline-none transition-all duration-200 shadow-sm"
            placeholder={`Search anything...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={handleSearchFocus}
          />
        </form>

        <AnimatePresence>
          {isSearchFocused && (
            <motion.div
              className="absolute z-10 w-full mt-2 overflow-hidden bg-white rounded-xl shadow-xl border border-gray-100"
              initial="closed"
              animate="open"
              exit="closed"
              variants={suggestionsVariants}
            >
              <div className="py-2">
                <div className="px-4 py-3 text-lg font-bold text-black border-b border-gray-100 bg-gray-50">
                  Popular on Learnify
                </div>
                <div className="divide-y divide-gray-100">
                  {popularCourses.map((course, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center px-4 py-3 cursor-pointer"
                      onClick={() => handleSuggestionClick(course)}
                      variants={suggestionItemVariants}
                      initial="initial"
                      animate="animate"
                      whileTap="tap"
                    >
                      <div className="flex-shrink-0 mr-3 text-gray-400">
                        <svg
                          className="w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="text-sm font-medium text-gray-800">{course}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Searchbar;