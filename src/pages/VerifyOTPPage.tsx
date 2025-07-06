import React, { useState, useRef, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowLeft, Mail } from 'lucide-react';

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

const VerifyOTPPage: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [email] = useState("user@example.com");
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otp.join("");
    console.log("OTP submitted:", fullOtp);
    // Here you would typically verify the OTP with your backend
  };

  const handleResendCode = () => {
    // Reset timer and resend OTP logic
    setTimeLeft(600);
    console.log("Resending OTP...");
    // Add your resend OTP logic here
  };

  const isOtpComplete = otp.join("").length === 6;

  // Format time as MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className="min-h-screen bg-white text-black flex flex-col justify-center items-center px-4 sm:px-6 py-8 sm:py-12">
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
                onClick={() => window.location.href = "/login"}
              >
                <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 mr-1 -mt-0.5 hover:text-white" />
                Back to Login
              </motion.button>
            </div>

            <motion.h1 
              className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 pt-8"
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
                className={`w-full py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-100 text-sm sm:text-base md:text-lg font-medium cursor-pointer ${
                  isOtpComplete
                    ? 'bg-black text-white hover:bg-yellow-400 hover:text-black focus:bg-yellow-500 focus:text-black'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                variants={buttonTapVariants}
                whileTap={isOtpComplete ? "tap" : undefined}
                disabled={!isOtpComplete}
              >
                Verify OTP
              </motion.button>

              <div className="text-center space-y-3">
                <p className="text-sm sm:text-base text-gray-600">
                  Didn't receive the code?{" "}
                  <button 
                    type="button" 
                    className="font-semibold text-blue-600 hover:text-blue-700 focus:outline-none"
                    onClick={handleResendCode}
                    disabled={timeLeft > 0}
                  >
                    Resend Code
                  </button>
                </p>
                
                <p className="text-xs sm:text-sm text-gray-500">
                  The code will expire in <span className="font-bold">{formattedTime}</span>
                </p>
              </div>
            </motion.form>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default VerifyOTPPage;