import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff, ArrowLeft, User } from 'lucide-react';
import { BASE_URL } from "../utils/config";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const
    }
  }
};

const buttonTapVariants = {
  tap: { scale: 0.98 }
};

const RegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [agreeToTerms, setAgreeToTerms] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    setErrors(prev => ({
      ...prev,
      [name]: ""
    }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      email: "",
      username: "",
      password: "",
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    if (!formData.username) {
      newErrors.username = "Username is required";
      valid = false;
    } else if (formData.username.length < 3 || formData.username.length > 20) {
      newErrors.username = "Username must be between 3 and 20 characters";
      valid = false;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*$/;
    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
      valid = false;
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = "Must contain 1 uppercase, 1 digit, and 1 special character";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (!agreeToTerms) {
      toast.error("You must agree to the Terms and Privacy Policy");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          role: "STUDENT"
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      toast.success("OTP sent to your email. Please verify to complete registration.");
      setTimeout(() => {
        navigate("/verify-otp", { state: { email: formData.email } });
      }, 2000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || 'An error occurred during registration');
      } else {
        toast.error('An error occurred during registration');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col justify-center items-center px-4 sm:px-6 py-8 sm:py-12">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        toastClassName="rounded-lg shadow-lg"
        progressClassName="bg-yellow-400"
      />
      <motion.div
        className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        <motion.div
          className="flex flex-col items-start order-1 lg:order-1"
          variants={fadeInVariants}
        >
          <div className="w-full px-2 lg:px-0 max-w-md">
            <div className="w-full mb-6 sm:mb-8">
              <motion.button
                className="flex items-center px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-900 rounded-lg hover:bg-black hover:text-white transition-colors text-sm sm:text-base cursor-pointer"
                variants={buttonTapVariants}
                whileTap="tap"
                onClick={() => navigate("/home")}
              >
                <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 mr-1 -mt-0.5 hover:text-white" />
                Back to Home
              </motion.button>
            </div>

            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 pt-8 lg:pt-0 text-left"
              variants={fadeInVariants}
            >
              Join LearniFy Today!
            </motion.h1>

            <motion.div
              className="flex -space-x-2 sm:-space-x-3 mb-3 sm:mb-4"
              variants={fadeInVariants}
            >
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full border-2 sm:border-3 border-white"
                  src={`https://randomuser.me/api/portraits/women/${i + 15}.jpg`}
                  alt="user"
                  loading="lazy"
                />
              ))}
            </motion.div>

            <motion.p
              className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 text-gray-700 text-left"
              variants={fadeInVariants}
            >
              Join our community of <strong className="text-black">500,000+ learners</strong> and start your learning journey
            </motion.p>

            <motion.form
              className="space-y-4 sm:space-y-4 md:space-y-5 w-full"
              variants={fadeInVariants}
              onSubmit={handleSubmit}
            >
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className={`w-full pl-12 pr-4 py-3 sm:px-5 sm:py-2.5 sm:pl-12 border ${errors.username ? 'border-red-500' : 'border-gray-400'} focus:border-black rounded-lg sm:rounded-xl focus:outline-none focus:ring focus:ring-black text-sm sm:text-base md:text-lg`}
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              {errors.username && (
                <p className="-mt-4 text-sm text-red-500">{errors.username}</p>
              )}

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  className={`w-full pl-12 pr-4 py-3 sm:px-5 sm:py-2.5 sm:pl-12 border ${errors.email ? 'border-red-500' : 'border-gray-400'} focus:border-black rounded-lg sm:rounded-xl focus:outline-none focus:ring focus:ring-black text-sm sm:text-base md:text-lg`}
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && (
                <p className="-mt-4 text-sm text-red-500">{errors.email}</p>
              )}

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create Password (min. 8 characters)"
                  className={`w-full pl-12 pr-4 py-3 sm:px-5 sm:py-2.5 sm:pl-12 border ${errors.password ? 'border-red-500' : 'border-gray-400'} focus:border-black rounded-lg sm:rounded-xl focus:outline-none focus:ring focus:ring-black text-sm sm:text-base md:text-lg`}
                  value={formData.password}
                  onChange={handleChange}
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
              {errors.password && (
                <p className="-mt-4 text-sm text-red-500">{errors.password}</p>
              )}

              <div className="flex items-center text-xs sm:text-sm md:text-base">
                <label className="flex items-center gap-1.5 sm:gap-2 cursor-pointer z-40">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-black cursor-pointer"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                  />
                  I agree to the <strong>Terms</strong> and <strong>Privacy Policy</strong>
                </label>
              </div>

              <motion.button
                type="submit"
                className="w-full bg-black text-white py-2.5 sm:py-2.5 rounded-lg sm:rounded-xl focus:outline-none text-sm sm:text-base md:text-lg font-medium disabled:opacity-70 disabled:cursor-not-allowed relative"
                variants={buttonTapVariants}
                whileTap={isSubmitting ? {} : "tap"}
                disabled={isSubmitting || !agreeToTerms}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </motion.button>

              <p className="text-center text-xs sm:text-sm md:text-base">
                Already have an account?{" "}
                <a className="font-bold text-blue-600 hover:underline" href="/login">
                  Sign in
                </a>
              </p>
            </motion.form>

            <motion.div
              className="relative lg:hidden"
              variants={fadeInVariants}
            >
              <motion.button
                type="button"
                className="mt-5 w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 sm:py-3 rounded-lg sm:rounded-xl hover:bg-yellow-400 focus:bg-yellow-500 transition-all duration-50 text-sm sm:text-base md:text-lg font-medium cursor-pointer"
                variants={buttonTapVariants}
                whileTap="tap"
                onClick={() => navigate("/instructor-register")}
              >
                Register as Instructor
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 order-2 lg:order-2 mb-8 lg:mb-0"
          variants={fadeInVariants}
        >
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-gray-700"
            variants={fadeInVariants}
          >
            Start learning today and <br className="hidden sm:block" /> grow your skills.
          </motion.h2>

          <motion.div
            className="space-y-4 sm:space-y-6 md:space-y-8"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {[
              {
                icon: "https://landingfoliocom.imgix.net/store/collection/dusk/images/hero/1/3d-illustration.png",
                title: "Unlimited access",
                description: "Get unlimited access to all courses with a single membership. Learn anything, anytime."
              },
              {
                icon: "https://i.pinimg.com/736x/dc/0f/ec/dc0fec8068dc99f76a01df8f4cee1b37.jpg",
                title: "Expert instructors",
                description: "Learn from industry experts who are passionate about teaching and mentoring."
              },
              {
                icon: "https://i.pinimg.com/736x/8b/7e/8c/8b7e8c2b9e1c2d7c8895a90eee5f9fb5.jpg",
                title: "Certificates",
                description: "Earn certificates that you can share with your professional network."
              },
              {
                icon: "https://i.pinimg.com/736x/53/1f/04/531f04b4be56404d771b55e9563e70f2.jpg",
                title: "Lifetime access",
                description: "Enjoy lifetime access to all courses you enroll in, including updates and new content."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-3 sm:gap-4 md:gap-5"
                variants={fadeInVariants}
              >
                <img
                  src={feature.icon}
                  alt=""
                  className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 mt-0.5 sm:mt-1 flex-shrink-0"
                />
                <div>
                  <p className="font-semibold text-base sm:text-lg md:text-xl mb-1 sm:mb-2">{feature.title}</p>
                  <p className="text-gray-600 text-sm sm:text-base md:text-lg">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="hidden lg:block"
            variants={fadeInVariants}
          >
            <motion.button
              className="cursor-pointer px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 text-sm sm:text-base relative overflow-hidden group"
              variants={buttonTapVariants}
              whileTap="tap"
              onClick={() => navigate("/instructor-register")}
            >
              <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
                </svg>
                Register as Instructor
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default RegisterPage;