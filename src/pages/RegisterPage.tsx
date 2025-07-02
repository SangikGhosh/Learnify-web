import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff, ArrowLeft, User } from 'lucide-react';

const RegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-[#FCF8F1] text-black flex flex-col justify-center items-center px-4 sm:px-6 py-8 sm:py-12">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
        {/* Left Section - Registration */}
        <div className="flex flex-col items-center order-1 lg:order-1">
          <div className="w-full px-2 lg:px-0 max-w-md text-center">
            {/* Added buttons container */}
            <div className="flex justify-between w-full mb-6 sm:mb-8">
              <motion.button
                className="flex items-center px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-900 rounded-lg hover:bg-black hover:text-white transition-colors text-sm sm:text-base cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.location.href = "/"}
              >
                <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 mr-1 -mt-0.5 hover:text-white" />
                Back to Home
              </motion.button>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 pt-8 lg:pt-0">Join LearniFy Today!</h1>

            <div className="flex justify-center -space-x-2 sm:-space-x-3 mb-3 sm:mb-4">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full border-2 sm:border-3 border-white"
                  src={`https://randomuser.me/api/portraits/women/${i + 15}.jpg`}
                  alt="user"
                  loading="lazy"
                />
              ))}
            </div>
            <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 text-gray-700">
              Join our community of <strong className="text-black">500,000+ learners</strong> and start your learning journey
            </p>

            <form className="space-y-4 sm:space-y-4 md:space-y-5">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full pl-12 pr-4 py-3 sm:px-5 sm:py-2.5 sm:pl-12 border rounded-lg sm:rounded-xl focus:outline-none focus:ring focus:ring-black text-sm sm:text-base md:text-lg"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full pl-12 pr-4 py-3 sm:px-5 sm:py-2.5 sm:pl-12 border rounded-lg sm:rounded-xl focus:outline-none focus:ring focus:ring-black text-sm sm:text-base md:text-lg"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create Password (min. 8 characters)"
                  className="w-full pl-12 pr-4 py-3 sm:px-5 sm:py-2.5 sm:pl-12 border rounded-lg sm:rounded-xl focus:outline-none focus:ring focus:ring-black text-sm sm:text-base md:text-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>

              <div className="flex items-center text-xs sm:text-sm md:text-base">
                <label className="flex items-center gap-1.5 sm:gap-2 cursor-pointer z-40">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-black cursor-pointer"
                  />
                  I agree to the <strong>Terms</strong> and <strong>Privacy Policy</strong>
                </label>
              </div>

              <motion.button
                type="submit"
                className="w-full bg-black text-white py-2.5 sm:py-2.5 rounded-lg sm:rounded-xl hover:bg-yellow-400 focus:bg-yellow-500 hover:text-black transition-all duration-50 text-sm sm:text-base md:text-lg font-medium cursor-pointer"
                whileHover={{
                  backgroundColor: "#FACC15",
                  color: "#000000",
                  scale: 1.02
                }}
                whileTap={{ scale: 0.98 }}
              >
                Create Account
              </motion.button>

              <p className="text-center text-xs sm:text-sm md:text-base">
                Already have an account?{" "}
                <a className="font-bold text-blue-600 hover:underline" href="/login">
                  Sign in
                </a>
              </p>
            </form>

            <motion.div
              className="relative lg:hidden"
              whileHover="hover"
              initial="rest"
              animate="rest"
            >
              {/* Button */}
              <motion.button
                type="submit"
                className="mt-5 w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 sm:py-3 rounded-lg sm:rounded-xl hover:bg-yellow-400 focus:bg-yellow-500 transition-all duration-50 text-sm sm:text-base md:text-lg font-medium cursor-pointer"
                whileHover={{
                  backgroundColor: "#FACC15",
                  scale: 1.02
                }}
                whileTap={{ scale: 0.98 }}
              >
                Register as Instructor
              </motion.button>

              {/* Expanded content on hover - now positioned below the button */}
              <motion.div
                className="absolute z-20 w-56 sm:w-64 p-3 sm:p-4 top-full mt-2 bg-white rounded-lg shadow-xl border border-gray-100"
                initial={{ opacity: 0, y: -10 }}
                variants={{
                  rest: { opacity: 0, y: -10, display: "none" },
                  hover: { opacity: 1, y: 0, display: "block" }
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <h3 className="font-bold text-gray-800 text-sm sm:text-base mb-1 sm:mb-2">Become an Instructor</h3>
                <ul className="text-xs sm:text-sm text-gray-600 space-y-1 sm:space-y-1.5">
                  <li className="flex items-start gap-1.5 sm:gap-2">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 text-purple-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Share your knowledge with thousands</span>
                  </li>
                  <li className="flex items-start gap-1.5 sm:gap-2">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 text-purple-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Earn money doing what you love</span>
                  </li>
                  <li className="flex items-start gap-1.5 sm:gap-2">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 text-purple-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Flexible schedule - teach when you want</span>
                  </li>
                </ul>
                <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-100">
                  <button className="text-xs font-semibold text-purple-600 hover:text-purple-800 hover:underline">
                    Learn about becoming an instructor →
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Right Section - Features */}
        <div className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 order-2 lg:order-2 mb-8 lg:mb-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-gray-700">
            Start learning today and <br className="hidden sm:block" /> grow your skills.
          </h2>

          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            <div className="flex items-start gap-3 sm:gap-4 md:gap-5">
              <img
                src="https://landingfoliocom.imgix.net/store/collection/dusk/images/hero/1/3d-illustration.png"
                alt="star"
                className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 mt-0.5 sm:mt-1 flex-shrink-0"
              />
              <div>
                <p className="font-semibold text-base sm:text-lg md:text-xl mb-1 sm:mb-2">Unlimited access</p>
                <p className="text-gray-600 text-sm sm:text-base md:text-lg">
                  Get unlimited access to all courses with a single membership. Learn anything, anytime.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:gap-4 md:gap-5">
              <img
                src="https://i.pinimg.com/736x/dc/0f/ec/dc0fec8068dc99f76a01df8f4cee1b37.jpg"
                alt="chat"
                className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 mt-0.5 sm:mt-1 flex-shrink-0"
              />
              <div>
                <p className="font-semibold text-base sm:text-lg md:text-xl mb-1 sm:mb-2">Expert instructors</p>
                <p className="text-gray-600 text-sm sm:text-base md:text-lg">
                  Learn from industry experts who are passionate about teaching and mentoring.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:gap-4 md:gap-5">
              <img
                src="https://i.pinimg.com/736x/8b/7e/8c/8b7e8c2b9e1c2d7c8895a90eee5f9fb5.jpg"
                alt="certificate"
                className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 mt-0.5 sm:mt-1 flex-shrink-0"
              />
              <div>
                <p className="font-semibold text-base sm:text-lg md:text-xl mb-1 sm:mb-2">Certificates</p>
                <p className="text-gray-600 text-sm sm:text-base md:text-lg">
                  Earn certificates that you can share with your professional network.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:gap-4 md:gap-5">
              <img
                src="https://i.pinimg.com/736x/53/1f/04/531f04b4be56404d771b55e9563e70f2.jpg"
                alt="certificate"
                className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 mt-0.5 sm:mt-1 flex-shrink-0"
              />
              <div>
                <p className="font-semibold text-base sm:text-lg md:text-xl mb-1 sm:mb-2">Lifetime access</p>
                <p className="text-gray-600 text-sm sm:text-base md:text-lg">
                  Enjoy lifetime access to all courses you enroll in, including updates and new content.
                </p>
              </div>
            </div>
          </div>

          <motion.div
            className="hidden lg:block lg:relative"
            whileHover="hover"
            initial="rest"
            animate="rest"
          >
            {/* Expanded content on hover */}
            <motion.div
              className="absolute w-56 sm:w-64 p-3 sm:p-4 bottom-full mb-2 bg-white rounded-lg shadow-xl border border-gray-100"
              initial={{ opacity: 0, y: 10 }}
              variants={{
                rest: { opacity: 0, y: 10, display: "none" },
                hover: { opacity: 1, y: 0, display: "block" }
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h3 className="font-bold text-gray-800 text-sm sm:text-base mb-1 sm:mb-2">Become an Instructor</h3>
              <ul className="text-xs sm:text-sm text-gray-600 space-y-1 sm:space-y-1.5">
                <li className="flex items-start gap-1.5 sm:gap-2">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 text-purple-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Create courses on topics you're passionate about</span>
                </li>
                <li className="flex items-start gap-1.5 sm:gap-2">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 text-purple-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Set your own schedule and pace</span>
                </li>
                <li className="flex items-start gap-1.5 sm:gap-2">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 text-purple-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Get support from our instructor community</span>
                </li>
              </ul>
              <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-100">
                <button className="text-xs font-semibold text-purple-600 hover:text-purple-800 hover:underline">
                  Start teaching today →
                </button>
              </div>
            </motion.div>

            {/* Button */}
            <motion.button
              className="px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 text-sm sm:text-base relative overflow-hidden group"
              whileHover={{
                scale: 1.03,
                boxShadow: "0 10px 20px -5px rgba(124, 58, 237, 0.4)"
              }}
              whileTap={{
                scale: 0.98,
                boxShadow: "0 5px 10px -3px rgba(124, 58, 237, 0.4)"
              }}
            >
              <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
                </svg>
                Register as Instructor
              </span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;