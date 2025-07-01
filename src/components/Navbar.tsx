import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);

  // Popular courses for placeholder rotation
  const popularCourses = [
    "Artificial Intelligence",
    "Web Development",
    "Data Science",
    "Digital Marketing",
    "Blockchain Technology",
    "UX/UI Design",
    "Cloud Computing",
    "Cybersecurity"
  ];

  useEffect(() => {
    // Handle scroll effect
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      setIsScrolled(scrolled);
      
      // Close search and menu when scrolling on mobile
      if (scrolled && window.innerWidth < 1024) {
        setIsSearchOpen(false);
        setIsMenuOpen(false);
      }
    };

    // Rotate placeholder text
    const interval = setInterval(() => {
      setCurrentPlaceholderIndex((prevIndex) => 
        (prevIndex + 1) % popularCourses.length
      );
    }, 3000);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, [popularCourses.length]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isSearchOpen) setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setSearchQuery("");
    }
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Handle search functionality here
  };

  // Animation variants
  const menuVariants = {
    open: { 
      opacity: 1,
      height: "auto",
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    closed: { 
      opacity: 0,
      height: 0,
      transition: { 
        staggerChildren: 0.1,
        staggerDirection: -1,
        when: "afterChildren"
      }
    }
  };

  const menuItemVariants = {
    open: { 
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 }
      }
    },
    closed: { 
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 }
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
                <form onSubmit={handleSearch} className="relative">
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
                    type="text"
                    className="w-full py-2 pl-12 pr-16 text-gray-700 bg-white border border-gray-300 rounded-full focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 focus:outline-none transition-all duration-200 shadow-lg"
                    placeholder={`Search for ${popularCourses[currentPlaceholderIndex]}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  <motion.button
                    type="submit"
                    className="absolute inset-y-0 right-0 px-4 text-sm font-medium text-white bg-black rounded-r-full hover:bg-yellow-400 hover:text-black focus:bg-yellow-400 focus:text-black transition-all duration-200"
                    whileHover={{ backgroundColor: "#FACC15", color: "#000000" }}
                  >
                    Search
                  </motion.button>
                  <button
                    type="button"
                    onClick={toggleSearch}
                    className="absolute inset-y-0 right-18 px-2 text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-4">
            <form onSubmit={handleSearch} className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
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
                type="text"
                className="w-full py-2 pl-10 pr-4 text-gray-900 bg-white border border-gray-300 rounded-full focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 focus:outline-none transition-all duration-200"
                placeholder={`Search for ${popularCourses[currentPlaceholderIndex]}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <motion.button
                type="submit"
                className="absolute inset-y-0 right-0 px-4 text-sm font-medium text-white bg-black rounded-r-full hover:bg-yellow-400 hover:text-black focus:bg-yellow-400 focus:text-black transition-all duration-200"
                whileHover={{ backgroundColor: "#FACC15", color: "#000000" }}
              >
                Search
              </motion.button>
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center font-semibold lg:justify-center lg:space-x-10">
            <a href="#" className="text-lg text-black transition-all duration-200 hover:text-opacity-80">Features</a>
            <a href="#" className="text-lg text-black transition-all duration-200 hover:text-opacity-80">Solutions</a>
            <a href="#" className="text-lg text-black transition-all duration-200 hover:text-opacity-80">Resources</a>
            <a href="#" className="text-lg text-black transition-all duration-200 hover:text-opacity-80">Pricing</a>
          </div>

          <motion.a
            href="#"
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