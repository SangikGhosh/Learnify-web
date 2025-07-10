import React, { useState, useRef, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowLeft, Mail } from 'lucide-react';
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

const ForgotPasswordVerifyOTPPage: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Get email from location state
  const email = location.state?.email || "";

  useEffect(() => {
    inputRefs.current[0]?.focus();
    
    // Timer countdown
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOtpChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;
    
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    
    // Focus next input
    if (element.value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text/plain').slice(0, 6);
    const newOtp = [...otp];
    
    for (let i = 0; i < pasteData.length; i++) {
      if (i < 6 && !isNaN(Number(pasteData[i]))) {
        newOtp[i] = pasteData[i];
      }
    }
    
    setOtp(newOtp);
    
    // Focus the last input with data
    const lastFilledIndex = Math.min(pasteData.length - 1, 5);
    inputRefs.current[lastFilledIndex]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otp.join("");
    
    if (fullOtp.length !== 6) {
      toast.error("Please enter a 6-digit OTP");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${BASE_URL}/auth/forgot-password/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          otp: fullOtp
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'OTP verification failed');
      }

      if (!data.resetToken) {
        throw new Error("No reset token received from server");
      }

      toast.success(data.message || "OTP verified successfully!");
      
      // Ensure we're using the correct path and navigation method
      navigate("/reset-password", {
        replace: true, // Prevent going back to OTP page
        state: {
          resetToken: data.resetToken,
          email: data.email
        }
      });

    } catch (error: unknown) {
      console.error("Verification error:", error);
      if (error instanceof Error) {
        toast.error(error.message || 'An error occurred during verification');
      } else {
        toast.error('An error occurred during verification');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendCode = async () => {
    try {
      const response = await fetch(`${BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to resend OTP');
      }

      // Reset timer and OTP fields
      setTimeLeft(600);
      setOtp(Array(6).fill(""));
      inputRefs.current[0]?.focus();
      
      toast.success("New OTP sent to your email!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || 'Failed to resend OTP');
      } else {
        toast.error('Failed to resend OTP');
      }
    }
  };

  const isOtpComplete = otp.join("").length === 6;

  // Format time as MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

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
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 mr-1 -mt-0.5 hover:text-white" />
                Back
              </motion.button>
            </div>

            <motion.h1 
              className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6"
              variants={fadeInVariants}
            >
              Verify Your Email
            </motion.h1>

            <motion.div 
              className="flex justify-center mb-6 sm:mb-8"
              variants={fadeInVariants}
            >
              <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-lg flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                <span>We've sent a 6-digit code to <strong>{email}</strong></span>
              </div>
            </motion.div>
            
            <motion.form 
              className="space-y-6 sm:space-y-8"
              variants={fadeInVariants}
              onSubmit={handleSubmit}
            >
              <div className="space-y-4">
                <p className="text-sm sm:text-base text-gray-700 text-center">
                  Enter the verification code sent to your email
                </p>
                
                <div className="flex justify-center space-x-2 sm:space-x-3">
                  {otp.map((data, index) => (
                    <input
                      key={index}
                      ref={(el) => { inputRefs.current[index] = el; }}
                      type="text"
                      maxLength={1}
                      className="w-12 h-12 sm:w-14 sm:h-14 text-center text-xl sm:text-2xl border border-gray-400 focus:border-black rounded-lg focus:outline-none focus:ring focus:ring-black"
                      value={data}
                      onChange={(e) => handleOtpChange(e.target, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      onPaste={handlePaste}
                      onFocus={(e) => e.target.select()}
                    />
                  ))}
                </div>
              </div>

              <motion.button
                type="submit"
                className={`w-full py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-100 text-sm sm:text-base font-medium ${
                  isOtpComplete && !isSubmitting
                    ? 'bg-black text-white hover:bg-yellow-400 hover:text-black'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                variants={buttonTapVariants}
                whileTap={isOtpComplete && !isSubmitting ? "tap" : undefined}
                disabled={!isOtpComplete || isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </div>
                ) : (
                  'Verify OTP'
                )}
              </motion.button>

              <div className="text-center space-y-3">
                <p className="text-sm sm:text-base text-gray-600">
                  Didn't receive the code?{" "}
                  <button 
                    type="button" 
                    className={`font-semibold ${
                      timeLeft > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-700'
                    } focus:outline-none`}
                    onClick={handleResendCode}
                    disabled={timeLeft > 0}
                  >
                    Resend Code
                  </button>
                </p>
                
                <p className="text-xs sm:text-sm text-gray-500">
                  {timeLeft > 0 ? (
                    <>The code will expire in <span className="font-bold">{formattedTime}</span></>
                  ) : (
                    "The code has expired. Please request a new one."
                  )}
                </p>
              </div>
            </motion.form>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default ForgotPasswordVerifyOTPPage;