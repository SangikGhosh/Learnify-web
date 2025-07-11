import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line no-empty-pattern
const SuccessCard = ({ }: { onClose: () => void }) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/home");
    window.location.reload();
  };

  // Prevent background scrolling when modal is open
  document.body.style.overflow = "hidden";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Non-interactive overlay */}
      <motion.div
        className="absolute inset-0 backdrop-blur-sm bg-black/20 bg-opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      
      {/* Success card */}
      <motion.div
        className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-100"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      >
        <div className="p-6 sm:p-8">
          <div className="flex flex-col items-center text-center">
            {/* Success icon with subtle animation */}
            <motion.div 
              className="mb-6 p-5 bg-green-50 rounded-full"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <CheckCircle className="w-16 h-16 text-green-600" strokeWidth={1.5} />
            </motion.div>

            <motion.h3 
              className="text-2xl font-bold text-gray-900 mb-3"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Request Submitted Successfully!
            </motion.h3>

            <motion.p 
              className="text-gray-600 mb-4"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Thank you for your interest in becoming a LearniFy instructor! 
              Our team will review your application and verify your details.
            </motion.p>

            <motion.p 
              className="text-gray-600 mb-6"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              You'll receive an email notification once your instructor account is approved.
            </motion.p>

            <motion.p 
              className="text-sm text-gray-500 mb-6 px-4 py-2 bg-gray-50 rounded-lg"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Typically this process takes 1-2 business days. We appreciate your patience!
            </motion.p>

            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="w-full flex justify-center"
            >
              <button
                onClick={handleGoHome}
                className="sm:w-2/4 flex items-center justify-center px-6 py-3 bg-black cursor-pointer text-white font-medium rounded-lg transition-all duration-200 shadow hover:shadow-md"
              >
                Go to Home
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SuccessCard;