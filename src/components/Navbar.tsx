import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, School, ChevronDown, ChevronUp, X } from "lucide-react";
import ExploreDropdown from "./ExploreDropdown";
import Searchbar from "./SearchBar";
import { useAuth } from "../hooks/useAuth";
import { imageMap } from "./AvatarData";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isJoinHovered, setIsJoinHovered] = useState(false);
  const [isOthersOpen, setIsOthersOpen] = useState(false);
  const [visibleItems, setVisibleItems] = useState<number>(3);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [username, setUsername] = useState<string>("");
  const [userInitial, setUserInitial] = useState<string>("");
  const isLoggedIn = useAuth();

  const joinButtonRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      if (scrolled && window.innerWidth < 1024) {
        setIsSearchOpen(false);
      }
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      
      if (window.innerWidth >= 1300) {
        setVisibleItems(3);
      } else if (window.innerWidth >= 1200) {
        setVisibleItems(2);
      } else if (window.innerWidth >= 1100) {
        setVisibleItems(1);
      } else {
        setVisibleItems(0);
      }
    };

    const fetchUsername = async () => {
      if (isLoggedIn) {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch('{{BASE_URL}}/api/common/get-username', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const data = await response.json();
          if (data.username) {
            setUsername(data.username);
            setUserInitial(data.username.charAt(0).toUpperCase());
          }
        } catch (error) {
          console.error('Error fetching username:', error);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    fetchUsername();

    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [isLoggedIn]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isSearchOpen) setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const toggleOthers = () => {
    setIsOthersOpen(!isOthersOpen);
  };

  const menuVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: "-100%",
      opacity: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
        delay: 0.1
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

  const joinDropdownVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 25
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

  const othersDropdownVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 25
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

  const navItems = [
    { name: "Home", href: "/home" },
    { name: "Teach on LearniFy", href: "/teach-on-learnify" },
    { name: "View Cart", href: "#" }
  ];

  const visibleNavItems = navItems.slice(0, visibleItems);
  const hiddenNavItems = navItems.slice(visibleItems);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 bg-white bg-opacity-30`}
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
            <a href="/home" title="" className="flex">
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
                <X className="w-6 h-6" />
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

          {/* Explore Dropdown - Hidden when search is open on mobile */}
          <div className="hidden lg:flex lg:items-center font-semibold lg:justify-center lg:space-x-10 pr-4">
            <h1 className="text-lg text-black transition-all duration-200 hover:text-opacity-80"><ExploreDropdown /></h1>
          </div>

          {/* Searchbar components */}
          <Searchbar isSearchOpen={isSearchOpen} toggleSearch={toggleSearch} isMobile />
          <Searchbar isSearchOpen={isSearchOpen} toggleSearch={toggleSearch} />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center font-semibold lg:justify-center lg:space-x-4 pr-4" ref={navRef}>
            {visibleNavItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-lg text-black transition-all duration-200 hover:text-opacity-80 whitespace-nowrap ml-6"
              >
                {item.name}
              </a>
            ))}

            {hiddenNavItems.length > 0 && (
              <div
                className="relative"
                onMouseEnter={() => windowWidth >= 1024 && setIsOthersOpen(true)}
                onMouseLeave={() => windowWidth >= 1024 && setIsOthersOpen(false)}
              >
                <button
                  onClick={toggleOthers}
                  className="flex items-center text-lg text-black transition-all duration-200 cursor-pointer hover:text-opacity-80 whitespace-nowrap"
                >
                  Others
                  {isOthersOpen ? (
                    <ChevronUp className="ml-1 w-4 h-4" />
                  ) : (
                    <ChevronDown className="ml-1 w-4 h-4" />
                  )}
                </button>

                <AnimatePresence>
                  {isOthersOpen && (
                    <motion.div
                      className="absolute right-0 z-50 mt-2 w-52 origin-top-right"
                      initial="closed"
                      animate="open"
                      exit="closed"
                      variants={othersDropdownVariants}
                    >
                      <div className="rounded-lg shadow-lg bg-white overflow-hidden border border-gray-200 py-1">
                        {hiddenNavItems.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="block px-4 py-2 text-lg transition-colors duration-150"
                            onClick={() => setIsOthersOpen(false)}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Join Now Button or User Profile */}
          {!isLoggedIn ? (
            <div
              className="hidden lg:block relative"
              ref={joinButtonRef}
              onMouseEnter={() => setIsJoinHovered(true)}
              onMouseLeave={() => setIsJoinHovered(false)}
            >
              <motion.p
                className="cursor-pointer inline-flex items-center justify-center px-5 py-2.5 text-base duration-200 hover:bg-yellow-300 hover:text-black focus:text-black focus:bg-yellow-300 font-semibold text-white bg-black rounded-full"
                whileHover={{
                  backgroundColor: "#FACC15",
                  color: "#000000",
                  scale: 1.02
                }}
                whileTap={{ scale: 0.95 }}
              >
                Join Now
              </motion.p>

              <AnimatePresence>
                {isJoinHovered && (
                  <motion.div
                    className="absolute right-0 z-50 mt-2 w-64 origin-top-right"
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={joinDropdownVariants}
                  >
                    <div className="rounded-xl shadow-lg bg-white overflow-hidden border border-gray-200">
                      <motion.a
                        href="/register"
                        className="flex items-center px-4 py-3 hover:bg-yellow-50 transition-colors duration-150"
                        whileHover={{ x: 4 }}
                      >
                        <GraduationCap className="w-5 h-5 mr-3 text-yellow-500" />
                        <div>
                          <p className="font-medium text-gray-900">Join as Student</p>
                          <p className="text-sm text-gray-500">Start learning today</p>
                        </div>
                      </motion.a>

                      <div className="border-t border-gray-200" />

                      <motion.a
                        href="/instructor-register"
                        className="flex items-center px-4 py-3 hover:bg-yellow-50 transition-colors duration-150"
                        whileHover={{ x: 4 }}
                      >
                        <School className="w-5 h-5 mr-3 text-yellow-500" />
                        <div>
                          <p className="font-medium text-gray-900">Join as Instructor</p>
                          <p className="text-sm text-gray-500">Share your knowledge</p>
                        </div>
                      </motion.a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="hidden lg:flex items-center">
              <div className="w-14 h-14 rounded-full overflow-hidden">
                <img 
                  src={imageMap[userInitial as keyof typeof imageMap] || imageMap['A']} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="ml-2 font-medium">{username}</span>
            </div>
          )}
        </div>

        {/* Mobile Navigation - Full Screen Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-opacity-50 z-40 lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={toggleMenu}
              />
              
              <motion.div
                className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white z-50 shadow-xl lg:hidden"
                initial="closed"
                animate="open"
                exit="closed"
                variants={menuVariants}
              >
                <div className="flex flex-col h-full p-4">
                  {isLoggedIn && (
                    <div className="flex items-center p-4 border-b border-gray-200">
                      <div className="w-18 h-18 rounded-full overflow-hidden">
                        <img 
                          src={imageMap[userInitial as keyof typeof imageMap] || imageMap['A']} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="ml-3 text-lg font-semibold">{username}</span>
                    </div>
                  )}

                  <div className="flex-grow pt-4 pb-4 space-y-2 overflow-y-auto">
                    <motion.a
                      href="/home"
                      className="block px-3 py-3 text-lg font-medium text-black rounded-md hover:bg-gray-50"
                      onClick={() => setIsMenuOpen(false)}
                      variants={menuItemVariants}
                    >
                      Home
                    </motion.a>
                    <motion.a
                      href="/teach-on-learnify"
                      className="block px-3 py-3 text-lg font-medium text-black rounded-md hover:bg-gray-50"
                      onClick={() => setIsMenuOpen(false)}
                      variants={menuItemVariants}
                    >
                      Teach on LearniFy
                    </motion.a>
                    <motion.a
                      href="#"
                      className="block px-3 py-3 text-lg font-medium text-black rounded-md hover:bg-gray-50"
                      onClick={() => setIsMenuOpen(false)}
                      variants={menuItemVariants}
                    >
                      View Cart
                    </motion.a>
                    
                    {!isLoggedIn && (
                      <>
                        <motion.a
                          href="/register"
                          className="flex items-center px-3 py-3 text-lg font-medium text-black rounded-md hover:bg-gray-50"
                          onClick={() => setIsMenuOpen(false)}
                          variants={menuItemVariants}
                        >
                          <GraduationCap className="w-6 h-6 mr-3 text-yellow-500" />
                          <div>
                            <p className="font-medium text-gray-900">Join as Student</p>
                            <p className="text-sm text-gray-500">Start learning today</p>
                          </div>
                        </motion.a>
                        <motion.a
                          href="/instructor-register"
                          className="flex items-center px-3 py-3 text-lg font-medium text-black rounded-md hover:bg-gray-50"
                          onClick={() => setIsMenuOpen(false)}
                          variants={menuItemVariants}
                        >
                          <School className="w-5 h-5 mr-3 text-yellow-500" />
                          <div>
                            <p className="font-medium text-gray-900">Join as Instructor</p>
                            <p className="text-sm text-gray-500">Share your knowledge</p>
                          </div>
                        </motion.a>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;