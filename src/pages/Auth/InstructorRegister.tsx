import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff, ArrowLeft, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from "../../utils/config";

// Animation variants
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

const InstructorRegister: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: ""
  });
  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: ""
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
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
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
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
    } else if (/\s/.test(formData.username)) {
      newErrors.username = "Username must not contain spaces";
      valid = false;
    } else if (/@/.test(formData.username)) {
      newErrors.username = "Username must not contain '@'";
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
      toast.error("You must agree to the Instructor Agreement and Privacy Policy");
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
          role: "INSTRUCTOR"
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error) {
          throw new Error(data.error);
        } else {
          throw new Error('Registration failed');
        }
      }

      toast.success("OTP sent to your email. Please verify to complete registration.");
      setTimeout(() => {
        navigate("/instructor-verify-otp", { state: { email: formData.email } });
      }, 2000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An error occurred during registration');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col justify-center items-center px-4 sm:px-6 py-8 sm:py-12">
      <ToastContainer position="top-center" autoClose={5000} />
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
        {/* Left Section - Registration */}
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
                onClick={() => window.location.href = "/home"}
              >
                <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 mr-1 -mt-0.5 hover:text-white" />
                Back to Home
              </motion.button>
            </div>

            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 pt-8 lg:pt-0"
              variants={fadeInVariants}
            >
              Become an Instructor Today!
            </motion.h1>

            <motion.p 
              className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 text-gray-700"
              variants={fadeInVariants}
            >
              Join our platform of <strong className="text-black">10,000+ instructors</strong> and share your knowledge with millions
            </motion.p>

            <motion.form 
              className="space-y-4 sm:space-y-4 md:space-y-5"
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
                  className="w-full pl-12 pr-4 py-3 sm:px-5 sm:py-2.5 sm:pl-12 border border-gray-400 focus:border-black rounded-lg sm:rounded-xl focus:outline-none focus:ring focus:ring-black text-sm sm:text-base md:text-lg"
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && <p className="text-red-500 text-xs mt-1 text-left">{errors.username}</p>}
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Professional Email"
                  className="w-full pl-12 pr-4 py-3 sm:px-5 sm:py-2.5 sm:pl-12 border border-gray-400 focus:border-black rounded-lg sm:rounded-xl focus:outline-none focus:ring focus:ring-black text-sm sm:text-base md:text-lg"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1 text-left">{errors.email}</p>}
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create Password (min. 8 characters)"
                  className="w-full pl-12 pr-4 py-3 sm:px-5 sm:py-2.5 sm:pl-12 border border-gray-400 focus:border-black rounded-lg sm:rounded-xl focus:outline-none focus:ring focus:ring-black text-sm sm:text-base md:text-lg"
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
                {errors.password && <p className="text-red-500 text-xs mt-1 text-left">{errors.password}</p>}
              </div>

              <div className="flex items-center text-xs sm:text-sm md:text-base">
                <label className="flex items-center gap-1.5 sm:gap-2 cursor-pointer z-40">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-black cursor-pointer"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                  />
                  I agree to the <strong>Instructor Agreement</strong> and <strong>Privacy Policy</strong>
                </label>
              </div>

              <motion.button
                type="submit"
                className="w-full bg-black text-white py-2.5 sm:py-2.5 rounded-lg sm:rounded-xl focus:bg-yellow-500 focus:text-black transition-all duration-50 text-sm sm:text-base md:text-lg font-medium cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                variants={buttonTapVariants}
                whileTap="tap"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Apply as Instructor"}
              </motion.button>

              <p className="text-center text-xs sm:text-sm md:text-base">
                Already an instructor?{" "}
                <a className="font-bold text-blue-600 hover:underline" href="/instructor-login">
                  Sign in
                </a>
              </p>
            </motion.form>
          </div>
        </motion.div>

        {/* Right Section - Features */}
        <motion.div 
          className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 order-2 lg:order-2 mb-8 lg:mb-0 pt-12"
          variants={fadeInVariants}
        >
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-gray-700"
            variants={fadeInVariants}
          >
            Teach what you love and <br className="hidden sm:block" /> earn on your schedule.
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
                title: "Reach millions",
                description: "Teach students from around the world and build your global audience."
              },
              {
                icon: "https://i.pinimg.com/736x/dc/0f/ec/dc0fec8068dc99f76a01df8f4cee1b37.jpg",
                title: "Earn money",
                description: "Get paid monthly through our reliable revenue share model."
              },
              {
                icon: "https://i.pinimg.com/736x/8b/7e/8c/8b7e8c2b9e1c2d7c8895a90eee5f9fb5.jpg",
                title: "Teaching tools",
                description: "Use our powerful tools to create engaging courses with quizzes, assignments, and more."
              },
              {
                icon: "https://i.pinimg.com/736x/53/1f/04/531f04b4be56404d771b55e9563e70f2.jpg",
                title: "Support team",
                description: "Our instructor support team is here to help you succeed every step of the way."
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

export default InstructorRegister;