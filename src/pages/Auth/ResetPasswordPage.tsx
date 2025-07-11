import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Lock, Eye, EyeOff, ArrowLeft, CheckCircle } from 'lucide-react';
import { BASE_URL } from "../../utils/config";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from "react-router-dom";

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

const ResetPasswordPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({
    newPassword: "",
    confirmPassword: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get resetToken and email from location state
  const resetToken = location.state?.resetToken || "";
  const email = location.state?.email || "";

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
      newPassword: "",
      confirmPassword: ""
    };

    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*$/;
    if (!formData.newPassword) {
      newErrors.newPassword = "Password is required";
      valid = false;
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters long";
      valid = false;
    } else if (!passwordRegex.test(formData.newPassword)) {
      newErrors.newPassword = "Must contain 1 uppercase, 1 digit, and 1 special character";
      valid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      valid = false;
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
      const response = await fetch(`${BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resetToken}`
        },
        body: JSON.stringify({
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Password reset failed');
      }

      toast.success(data.message || "Password updated successfully");
      setIsSuccess(true);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login", { 
          state: { 
            email: data.email,
            role: data.role
          } 
        });
      }, 3000);

    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || 'An error occurred during password reset');
      } else {
        toast.error('An error occurred during password reset');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white text-black flex flex-col justify-center items-center px-4 sm:px-6 py-8 sm:py-12">
        <motion.div 
          className="max-w-md w-full text-center"
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
        >
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-8 rounded-lg mb-6">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Password Reset Successful!</h2>
            <p className="text-sm sm:text-base">
              You can now login with your new password.
            </p>
          </div>
          <p className="text-sm text-gray-600">
            Redirecting to login page...
          </p>
        </motion.div>
      </div>
    );
  }

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
        className="max-w-md w-full"
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
          <div className="w-full px-2 text-center">
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
              className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6"
              variants={fadeInVariants}
            >
              Reset Your Password
            </motion.h1>

            <motion.p 
              className="text-sm sm:text-base mb-6 sm:mb-8 text-gray-700"
              variants={fadeInVariants}
            >
              Create a new password for your account <strong>{email}</strong>
            </motion.p>

            <motion.form 
              className="space-y-4 sm:space-y-5"
              variants={fadeInVariants}
              onSubmit={handleSubmit}
            >
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  placeholder="New password"
                  className={`w-full pl-12 pr-4 py-3 sm:px-5 sm:py-2.5 sm:pl-12 border ${errors.newPassword ? 'border-red-500' : 'border-gray-400'} focus:border-black rounded-lg sm:rounded-xl focus:outline-none focus:ring focus:ring-black text-sm sm:text-base`}
                  value={formData.newPassword}
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
              {errors.newPassword && (
                <p className="-mt-3 text-sm text-red-500 text-left">{errors.newPassword}</p>
              )}
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  className={`w-full pl-12 pr-4 py-3 sm:px-5 sm:py-2.5 sm:pl-12 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-400'} focus:border-black rounded-lg sm:rounded-xl focus:outline-none focus:ring focus:ring-black text-sm sm:text-base`}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="-mt-3 text-sm text-red-500 text-left">{errors.confirmPassword}</p>
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
                    Resetting...
                  </div>
                ) : (
                  'Reset Password'
                )}
              </motion.button>
            </motion.form>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default ResetPasswordPage;