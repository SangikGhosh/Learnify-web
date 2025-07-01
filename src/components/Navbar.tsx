import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ExploreDropdown from "./ExploreDropdown";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      setIsScrolled(scrolled);
      
      if (scrolled && window.innerWidth < 1024) {
        setIsSearchOpen(false);
        setIsMenuOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popularCourses.length]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isSearchOpen) setIsSearchOpen(false);
    setIsSearchFocused(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setSearchQuery("");
      setTimeout(() => {
        inputRef.current?.focus();
        setIsSearchFocused(true);
      }, 0);
    }
    if (isMenuOpen) setIsMenuOpen(false);
  };

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

  const menuVariants = {
    open: { 
      opacity: 1,
      height: "auto",
      transition: { 
        staggerChildren: 0.05,
        delayChildren: 0.1,
        duration: 0.2
      }
    },
    closed: { 
      opacity: 0,
      height: 0,
      transition: { 
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren",
        duration: 0.2
      }
    }
  };

  const menuItemVariants = {
    open: { 
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100, duration: 0.15 },
        opacity: { duration: 0.15 }
      }
    },
    closed: { 
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000, duration: 0.15 },
        opacity: { duration: 0.1 }
      }
    }
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

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#FCF8F1] bg-opacity-90 shadow-sm" : "bg-[#FCF8F1] bg-opacity-30"
      }`}
    >
      <div className="px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo - Hidden when search is open on mobile */}
          <motion.div 
            className="flex-shrink-0"
            animate={{
              opacity: isSearchOpen ? 0 : 1,
              x: isSearchOpen ? -20 : 0
            }}
            transition={{ duration: 0.2 }}
          >
            <a href="/" title="" className="flex">
              <img
                className="w-auto h-12"
                src="../src/assets/images/Learnify.png"
                alt="Learnify Logo"
              />
            </a>
          </motion.div>

          {/* Mobile Search and Menu Buttons */}
          <div className="flex items-center lg:hidden space-x-2">
            <motion.button
              type="button"
              className="p-2 text-black transition-all duration-200 rounded-md focus:bg-gray-100 hover:bg-gray-100"
              onClick={toggleSearch}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="w-6 h-6"
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
            </motion.button>

            <motion.button
              type="button"
              className="inline-flex p-2 text-black transition-all duration-200 rounded-md focus:bg-gray-100 hover:bg-gray-100"
              onClick={toggleMenu}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              )}
            </motion.button>
          </div>

          {/* Expanded Search Bar (Mobile) */}
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
                      className="w-full py-2 pl-12 pr-16 text-gray-900 bg-white border-2 border-gray-800 rounded-full focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 focus:outline-none transition-all duration-200 shadow-lg"
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

                  {/* Mobile Search Suggestions */}
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

          {/* Desktop Search Bar - Wider version */}
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
                  className="w-full py-3 pl-10 pr-5 text-gray-900 placeholder-gray-800 bg-white border-2 border-gray-600 rounded-full focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 focus:outline-none transition-all duration-200 shadow-sm hover:shadow-md"
                  placeholder={`Search anything...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={handleSearchFocus}
                />
                <motion.button
                  type="submit"
                  className="absolute inset-y-0 right-0 px-6 text-sm font-medium text-white bg-black rounded-r-full hover:bg-yellow-400 hover:text-black focus:bg-yellow-400 focus:text-black transition-all duration-200"
                  whileHover={{ 
                    backgroundColor: "#FACC15", 
                    color: "#000000",
                    scale: 1
                  }}
                  whileTap={{ scale: 1 }}
                >
                  Search
                </motion.button>
              </form>

              {/* Desktop Search Suggestions */}
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

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center font-semibold lg:justify-center lg:space-x-10 pr-4">
            <h1 className="text-lg text-black transition-all duration-200 hover:text-opacity-80"><ExploreDropdown/></h1>
            <a href="#" className="text-lg text-black transition-all duration-200 hover:text-opacity-80">Solutions</a>
            <a href="#" className="text-lg text-black transition-all duration-200 hover:text-opacity-80">Resources</a>
            <a href="#" className="text-lg text-black transition-all duration-200 hover:text-opacity-80">Pricing</a>
          </div>

          <motion.a
            href="/login"
            className="hidden lg:inline-flex items-center justify-center px-5 py-2.5 text-base duration-200 hover:bg-yellow-300 hover:text-black focus:text-black focus:bg-yellow-300 font-semibold text-white bg-black rounded-full"
            whileHover={{ 
              backgroundColor: "#FACC15",
              color: "#000000",
              scale: 1.02
            }}
            whileTap={{ scale: 0.95 }}
          >
            Join Now
          </motion.a>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="lg:hidden"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
            >
              <div className="pt-2 pb-4 space-y-2">
                <motion.a 
                  href="#" 
                  className="block px-3 py-2 text-base font-medium text-black rounded-md hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                  variants={menuItemVariants}
                >
                  Features
                </motion.a>
                <motion.a 
                  href="#" 
                  className="block px-3 py-2 text-base font-medium text-black rounded-md hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                  variants={menuItemVariants}
                >
                  Solutions
                </motion.a>
                <motion.a 
                  href="#" 
                  className="block px-3 py-2 text-base font-medium text-black rounded-md hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                  variants={menuItemVariants}
                >
                  Resources
                </motion.a>
                <motion.a 
                  href="#" 
                  className="block px-3 py-2 text-base font-medium text-black rounded-md hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                  variants={menuItemVariants}
                >
                  Pricing
                </motion.a>
                <motion.a
                  href="#"
                  className="block w-full px-3 py-2 mt-2 text-base font-semibold text-center text-white bg-black rounded-full hover:bg-yellow-300 hover:text-black"
                  onClick={() => setIsMenuOpen(false)}
                  variants={menuItemVariants}
                  whileHover={{ backgroundColor: "#FACC15", color: "#000000" }}
                >
                  Join Now
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;