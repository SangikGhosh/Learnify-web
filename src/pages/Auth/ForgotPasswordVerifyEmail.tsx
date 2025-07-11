import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Mail, ArrowLeft } from 'lucide-react';
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

const ForgotPasswordVerifyEmail: React.FC = () => {
  const [formData, setFormData] = useState({
    email: ""
  });
  const [errors, setErrors] = useState({
    email: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

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
      email: ""
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
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
      const response = await fetch(`${BASE_URL}/auth/forgot-password/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send OTP');
      }

      toast.success(data.message || "OTP sent successfully");
      
      // Redirect to OTP verification page with email
      setTimeout(() => {
        navigate("/forgot-password/verify-otp", { state: { email: formData.email } });
      }, 1500);

    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || 'An error occurred while sending OTP');
      } else {
        toast.error('An error occurred while sending OTP');
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
        className="max-w-md w-full px-2 lg:px-0"
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
          className="flex flex-col items-center"
          variants={fadeInVariants}
        >
          <div className="w-full text-center">
            <div className="flex justify-between w-full mb-6 sm:mb-8">
              <motion.button
                className="flex items-center px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-900 rounded-lg hover:bg-black hover:text-white transition-colors text-sm sm:text-base cursor-pointer"
                variants={buttonTapVariants}
                whileTap="tap"
                onClick={() => navigate("/login")}
              >
                <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 mr-1 -mt-0.5 hover:text-white" />
                Back to Login
              </motion.button>
            </div>

            <motion.h1 
              className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6"
              variants={fadeInVariants}
            >
              Reset Your Password
            </motion.h1>
            
            <motion.p 
              className="text-sm sm:text-base mb-6 sm:mb-8 text-gray-700"
              variants={fadeInVariants}
            >
              Enter your email address and we'll send you a verification code to reset your password.
            </motion.p>

            <motion.form 
              className="space-y-4 sm:space-y-5"
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
                  placeholder="Enter your email address"
                  className={`w-full pl-12 pr-4 py-3 sm:px-5 sm:py-2.5 sm:pl-12 border ${errors.email ? 'border-red-500' : 'border-gray-400'} focus:border-black rounded-lg sm:rounded-xl focus:outline-none focus:ring focus:ring-black text-sm sm:text-base`}
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && (
                <p className="-mt-3 text-sm text-red-500 text-left">{errors.email}</p>
              )}

              <motion.button
                type="submit"
                className="w-full bg-black text-white py-2.5 sm:py-2.5 rounded-lg sm:rounded-xl focus:bg-yellow-500 focus:text-black transition-all duration-100 text-sm sm:text-base font-medium disabled:opacity-70 disabled:cursor-not-allowed"
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
                    Sending OTP...
                  </div>
                ) : (
                  'Send Verification Code'
                )}
              </motion.button>

              <p className="text-center text-xs sm:text-sm">
                Remember your password?{" "}
                <a className="font-bold text-blue-600 hover:underline" href="/login">
                  Login here
                </a>
              </p>
            </motion.form>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default ForgotPasswordVerifyEmail;