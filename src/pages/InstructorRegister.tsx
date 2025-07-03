import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff, ArrowLeft, User } from 'lucide-react';

const InstructorRegister: React.FC = () => {
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

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 pt-8 lg:pt-0">Become an Instructor Today!</h1>

            <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 text-gray-700">
              Join our platform of <strong className="text-black">10,000+ instructors</strong> and share your knowledge with millions
            </p>

            <form className="space-y-4 sm:space-y-4 md:space-y-5">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full pl-12 pr-4 py-3 sm:px-5 sm:py-2.5 sm:pl-12 border rounded-lg sm:rounded-xl focus:outline-none focus:ring focus:ring-black text-sm sm:text-base md:text-lg"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder="Professional Email"
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
                  I agree to the <strong>Instructor Agreement</strong> and <strong>Privacy Policy</strong>
                </label>
              </div>

              <motion.button
                type="submit"
                className="w-full bg-black text-white py-2.5 sm:py-2.5 rounded-lg sm:rounded-xl hover:bg-yellow-400 focus:bg-yellow-500 focus:text-black hover:text-black transition-all duration-50 text-sm sm:text-base md:text-lg font-medium cursor-pointer"
                whileHover={{
                  backgroundColor: "#FACC15",
                  color: "#000000",
                  scale: 1.02
                }}
                whileTap={{ scale: 0.98 }}
              >
                Apply as Instructor
              </motion.button>

              <p className="text-center text-xs sm:text-sm md:text-base">
                Already an instructor?{" "}
                <a className="font-bold text-blue-600 hover:underline" href="/instructor-login">
                  Sign in
                </a>
              </p>
            </form>
          </div>
        </div>

        {/* Right Section - Features */}
        <div className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 order-2 lg:order-2 mb-8 lg:mb-0 pt-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-gray-700">
            Teach what you love and <br className="hidden sm:block" /> earn on your schedule.
          </h2>

          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            <div className="flex items-start gap-3 sm:gap-4 md:gap-5">
              <img
                src="https://landingfoliocom.imgix.net/store/collection/dusk/images/hero/1/3d-illustration.png"
                alt="star"
                className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 mt-0.5 sm:mt-1 flex-shrink-0"
              />
              <div>
                <p className="font-semibold text-base sm:text-lg md:text-xl mb-1 sm:mb-2">Reach millions</p>
                <p className="text-gray-600 text-sm sm:text-base md:text-lg">
                  Teach students from around the world and build your global audience.
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
                <p className="font-semibold text-base sm:text-lg md:text-xl mb-1 sm:mb-2">Earn money</p>
                <p className="text-gray-600 text-sm sm:text-base md:text-lg">
                  Get paid monthly through our reliable revenue share model.
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
                <p className="font-semibold text-base sm:text-lg md:text-xl mb-1 sm:mb-2">Teaching tools</p>
                <p className="text-gray-600 text-sm sm:text-base md:text-lg">
                  Use our powerful tools to create engaging courses with quizzes, assignments, and more.
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
                <p className="font-semibold text-base sm:text-lg md:text-xl mb-1 sm:mb-2">Support team</p>
                <p className="text-gray-600 text-sm sm:text-base md:text-lg">
                  Our instructor support team is here to help you succeed every step of the way.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstructorRegister;