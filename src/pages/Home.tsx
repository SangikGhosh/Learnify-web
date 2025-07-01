// src/pages/Home.tsx
import React from "react";

const Home: React.FC = () => {
  return (
    <div className="bg-[#FCF8F1] min-h-screen flex items-center pt-12 xl:pt-0">
      <section className="w-full bg-[#FCF8F1] bg-opacity-30 py-8 sm:py-12 lg:py-16 xl:py-20">
        <div className="px-5 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 gap-10 md:gap-16 lg:grid-cols-2 lg:gap-20">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <p className="text-sm sm:text-base font-bold tracking-widest text-blue-600 uppercase">
                A SOCIAL NETWORK FOR MODERN LEARNERS
              </p>
              
              <h1 className="mt-5 text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:mt-8 lg:text-7xl xl:text-[5rem] 2xl:text-[5.5rem] ">
                <span className="block">Connect & Learn From</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                    Top Experts
                </span>
              </h1>
              
              <p className="mt-5 text-lg font-medium text-gray-700 sm:text-xl md:text-xl lg:mt-8">
                Accelerate your career growth with personalized mentorship from industry leaders.
              </p>

              <div className="flex flex-col items-center mt-8 space-y-4 lg:items-start lg:mt-12">
                <a
                  href="#"
                  className="relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-black transition-all duration-300 bg-yellow-400 rounded-full hover:bg-yellow-500 focus:bg-yellow-500"
                >
                  Join for Free
                  <svg
                    className="w-5 h-5 ml-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </a>

                <p className="text-sm font-medium text-gray-600 sm:text-base">
                  Already a member?{" "}
                  <a 
                    href="#" 
                    className="font-bold text-blue-600 transition-all duration-200 hover:text-blue-800 hover:underline"
                  >
                    Sign In
                  </a>
                </p>
              </div>
            </div>

            {/* Image */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="w-full max-w-md lg:max-w-none">
                <img
                  className="w-full h-auto transition-all"
                  src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/1/hero-img.png"
                  alt="People learning and collaborating online"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;