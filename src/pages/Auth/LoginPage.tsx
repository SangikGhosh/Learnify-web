import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Lock, Mail, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { BASE_URL } from "../../utils/config";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

// Animation variants
const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const buttonTapVariants = {
  tap: { scale: 0.98 }
};

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });
  const [rememberMe] = useState(true);
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
    setErrors(prev => ({
      ...prev,
      [name]: ""
    }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      email: "",
      password: ""
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
      valid = false;
    }

    // Add validation for rememberMe
    if (!rememberMe) {
      toast.error("You must agree to 'Remember Me' to proceed");
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store token and user data
      if (rememberMe) {
        localStorage.setItem('token', data.token);
      } else {
        sessionStorage.setItem('token', data.token);
      }

      toast.success(data.status || "Login successful");
      
      // Redirect based on role
      setTimeout(() => {
        if (data.role === "INSTRUCTOR") {
          navigate("/instructor-dashboard");
        } else {
          navigate("/home");
        }
      }, 1500);

    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || 'An error occurred during login');
      } else {
        toast.error('An error occurred during login');
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
        {/* Left Section - Login */}
        <motion.div 
          className="flex flex-col items-center order-1 lg:order-1"
          variants={fadeInVariants}
        >
          <div className="w-full px-2 lg:px-0 max-w-md text-center">
            <div className="flex justify-between w-full mb-6 sm:mb-8">
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
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 pt-8 lg:pt-0"
              variants={fadeInVariants}
            >
              Welcome Back to LearniFy!
            </motion.h1>

            <motion.div 
              className="flex justify-center -space-x-2 sm:-space-x-3 mb-3 sm:mb-4"
              variants={fadeInVariants}
            >
              {[...Array(7)].map((_, i) => (
                <img
                  key={i}
                  className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full border-2 sm:border-3 border-white"
                  src={`https://randomuser.me/api/portraits/men/${i + 10}.jpg`}
                  alt="user"
                  loading="lazy"
                />
              ))}
            </motion.div>
            
            <motion.p 
              className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 text-gray-700"
              variants={fadeInVariants}
            >
              Join <strong className="text-black">500,000+ learners</strong> worldwide advancing their skills
            </motion.p>

            <motion.form 
              className="space-y-4 sm:space-y-4 md:space-y-5"
              variants={fadeInVariants}
              onSubmit={handleSubmit}
            >
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
                <p className="-mt-3 text-sm text-red-500 text-left">{errors.email}</p>
              )}
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
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
                <p className="-mt-3 text-sm text-red-500 text-left">{errors.password}</p>
              )}

              <div className="flex justify-between items-center text-xs sm:text-sm md:text-base">
                <label className="flex items-center gap-1.5 sm:gap-2 cursor-default">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-black cursor-default"
                    checked={rememberMe}
                    onChange={() => {}}
                    readOnly
                  />
                  Remember me
                </label>
                <a href="/forgot-password/verify-email" className="text-red-500 font-semibold hover:text-red-600 transition-colors">
                  Forgot Password?
                </a>
              </div>

              <motion.button
                type="submit"
                className="w-full bg-black text-white py-2.5 sm:py-2.5 rounded-lg sm:rounded-xl hover:bg-yellow-400 focus:bg-yellow-500 focus:text-black hover:text-black transition-all duration-100 text-sm sm:text-base md:text-lg font-medium disabled:opacity-70 disabled:cursor-not-allowed"
                variants={buttonTapVariants}
                whileTap={isSubmitting ? {} : "tap"}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </div>
                ) : (
                  'Login'
                )}
              </motion.button>

              <p className="text-center text-xs sm:text-sm md:text-base">
                Don't have an account?{" "}
                <a className="font-bold text-blue-600 hover:underline" href="/register">
                  Create for free
                </a>
              </p>
            </motion.form>

            <motion.div
              className="relative lg:hidden"
              variants={fadeInVariants}
            >
              <motion.button
                type="button"
                className="mt-5 w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2.5 sm:py-3 rounded-lg sm:rounded-xl hover:bg-yellow-400 focus:bg-yellow-500 transition-all duration-50 text-sm sm:text-base md:text-lg font-medium cursor-pointer"
                variants={buttonTapVariants}
                whileTap="tap"
                onClick={() => navigate("/instructor-login")}
              >
                Login as Instructor
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Section - Features */}
        <motion.div 
          className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 order-2 lg:order-2 mb-8 lg:mb-0"
          variants={fadeInVariants}
        >
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-gray-700"
            variants={fadeInVariants}
          >
            Advance your career <br className="hidden sm:block" /> with LearniFy courses.
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
                icon: "https://cdn.rareblocks.xyz/collection/clarity/images/sign-up/1/icon-thumb.png",
                title: "Industry-recognized courses",
                description: "Learn from experts in tech, business, arts and more with our comprehensive course catalog."
              },
              {
                icon: "https://cdn.rareblocks.xyz/collection/clarity/images/sign-up/1/icon-mailbox.png",
                title: "Personalized learning paths",
                description: "Get customized course recommendations based on your goals and skill level."
              },
              {
                icon: "https://cdn.rareblocks.xyz/collection/clarity/images/sign-up/1/icon-sand-clock.png",
                title: "Learn at your own pace",
                description: "Access courses anytime with lifetime access to materials and updates."
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
        </motion.div>
      </motion.div>
    </div>
  );
}

export default LoginPage;