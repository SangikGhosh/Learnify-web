import { motion, type Variants } from 'framer-motion';
import React, { useRef, useState } from 'react';

interface Course {
  id: number;
  title: string;
  instructor: string;
  image: string;
  rating: number;
  reviews: number;
  price: number;
  tag?: {
    text: string;
    color: string;
  };
}


const HomePage: React.FC = () => {

  const [courses] = useState<Course[]>([
    {
      id: 1,
      title: "The Complete Web Developer Bootcamp",
      instructor: "John Smith",
      image: "https://images.unsplash.com/photo-1542621334-a254cf47733d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      rating: 4.9,
      reviews: 1234,
      price: 129.99,
      tag: {
        text: "BESTSELLER",
        color: "bg-blue-600"
      }
    },
    {
      id: 2,
      title: "Data Science & Machine Learning",
      instructor: "Sarah Johnson",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      rating: 4.8,
      reviews: 987,
      price: 149.99,
      tag: {
        text: "NEW",
        color: "bg-green-600"
      }
    },
    {
      id: 3,
      title: "Flutter & Dart - Complete Guide",
      instructor: "Michael Brown",
      image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      rating: 4.6,
      reviews: 756,
      price: 99.99
    },
    {
      id: 4,
      title: "Digital Marketing Masterclass",
      instructor: "Emily Wilson",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      rating: 4.7,
      reviews: 1542,
      price: 89.99,
      tag: {
        text: "POPULAR",
        color: "bg-purple-600"
      }
    },
    {
      id: 5,
      title: "UX/UI Design Fundamentals",
      instructor: "Alexandra Chen",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      rating: 4.5,
      reviews: 892,
      price: 79.99
    },
    {
      id: 6,
      title: "Python for Data Analysis",
      instructor: "David Miller",
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      rating: 4.7,
      reviews: 1123,
      price: 109.99,
      tag: {
        text: "HOT",
        color: "bg-red-600"
      }
    }
  ]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`full-${i}`} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half-star" x1="0" x2="100%" y1="0" y2="0">
              <stop offset="50%" stopColor="#FBBF24" />
              <stop offset="50%" stopColor="#D1D5DB" />
            </linearGradient>
          </defs>
          <path fill="url(#half-star)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    return stars;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut", // This is now valid as "easeOut" is a predefined easing
      },
    },
  };

  const imageVariants: Variants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const gradientTextVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        delay: 0.5,
      },
    },
  };

  const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      when: "beforeChildren",
    },
  },
};

const headingVariants: Variants = {
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const paragraphVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: 0.2,
      ease: "easeOut",
    },
  },
};

const courseCardVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * i,
      duration: 0.3,
      ease: "easeOut",
    },
  }),
  hover: {
    y: -3, // Reduced lift amount
    transition: { duration: 0.15 } // Much faster hover transition
  }
};

const buttonVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.4,
      duration: 0.5,
      ease: "easeOut",
    },
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
  tap: {
    scale: 0.98,
  },
};

const arrowButtonVariants: Variants = {
  hover: {
    scale: 1.1,
    backgroundColor: "#f9fafb",
  },
  tap: {
    scale: 0.95,
  },
};

  return (
    <div className="bg-[#FCF8F1]">
      {/* Hero Section */}
      <div className="min-h-screen flex items-center pt-12">
        <section className="w-full bg-[#FCF8F1] bg-opacity-30 py-8 sm:py-12 lg:py-16 xl:py-20">
          <div className="px-5 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <motion.div
              className="grid items-center grid-cols-1 gap-10 md:gap-16 lg:grid-cols-2 lg:gap-20"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {/* Text Content */}
              <div className="text-center lg:text-left">
                <motion.p
                  className="text-sm sm:text-base font-bold tracking-widest text-blue-600 uppercase"
                  variants={itemVariants}
                >
                  A SOCIAL NETWORK FOR MODERN LEARNERS
                </motion.p>

                <motion.h1
                  className="mt-5 text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:mt-8 lg:text-7xl xl:text-[5rem] 2xl:text-[5.5rem]"
                  variants={itemVariants}
                >
                  <span className="block">Connect & Learn From</span>
                  <motion.span
                    className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"
                    variants={gradientTextVariants}
                  >
                    Top Experts
                  </motion.span>
                </motion.h1>

                <motion.p
                  className="mt-5 text-lg font-medium text-gray-700 sm:text-xl md:text-xl lg:mt-8"
                  variants={itemVariants}
                >
                  Accelerate your career growth with personalized mentorship from industry leaders.
                </motion.p>

                <motion.div
                  className="flex flex-col items-center mt-8 space-y-4 lg:items-start lg:mt-12"
                  variants={itemVariants}
                >
                  <motion.a
                    href="/register"
                    className="relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white hover:text-black transition-all duration-300 bg-black rounded-xl hover:bg-yellow-400 focus:bg-yellow-400 focus:text-black group"
                    whileHover={{ scale: 1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Join for Free
                    <svg
                      className="w-5 h-5 ml-3 transition-all duration-300 group-hover:translate-x-1"
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
                  </motion.a>

                  <motion.p
                    className="text-sm font-medium text-gray-600 sm:text-base"
                    variants={itemVariants}
                  >
                    Already a member?{" "}
                    <a
                      href="/login"
                      className="font-bold text-blue-600 transition-all duration-200 hover:text-blue-800 hover:underline"
                    >
                      Sign In
                    </a>
                  </motion.p>
                </motion.div>
              </div>

              {/* Image */}
              <motion.div
                className="relative flex justify-center lg:justify-end"
                variants={imageVariants}
              >
                <div className="w-full max-w-md lg:max-w-none">
                  <motion.img
                    className="w-full h-auto transition-all"
                    src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/1/hero-img.png"
                    alt="People learning and collaborating online"
                    loading="lazy"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Community Section - Featured Courses */}
      <motion.section
        className="relative bg-[#FCF8F1] py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl"
              variants={headingVariants}
            >
              Discover Top Courses
              <span className="inline">
                <motion.img
                  className="inline w-auto h-8 sm:h-10 lg:h-12"
                  src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/4/shape-1.svg"
                  alt="shape-1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.3,
                    type: "spring",
                    stiffness: 200,
                    damping: 10
                  }}
                />
              </span>
              From Industry Experts
              <span className="inline">
                <motion.img
                  className="inline w-auto h-8 sm:h-10 lg:h-11"
                  src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/4/shape-2.svg"
                  alt="shape-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.5,
                    type: "spring",
                    stiffness: 200,
                    damping: 10
                  }}
                />
              </span>
            </motion.h1>

            <motion.p
              className="max-w-2xl mx-auto mt-6 text-base font-normal leading-7 text-gray-900"
              variants={paragraphVariants}
            >
              Learn from the best instructors with practical, real-world skills you can apply immediately.
            </motion.p>
          </div>

          {/* Courses Carousel */}
          <div className="relative mt-12">
            {/* Left Arrow */}
            <motion.button
              onClick={scrollLeft}
              className="cursor-pointer absolute left-0 z-10 flex items-center justify-center w-12 h-12 -ml-6 text-gray-700 bg-white border border-gray-200 rounded-full shadow-lg top-1/2 -translate-y-1/2 hover:bg-gray-50 focus:outline-none"
              variants={arrowButtonVariants}
              whileTap="tap"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            {/* Courses Scroll Container */}
            <div
              ref={scrollContainerRef}
              className="flex pb-8 overflow-x-auto space-x-6 scroll-smooth snap-x snap-mandatory scrollbar-hide"
            >
              {courses.map((course, i) => (
                <motion.div
                  key={course.id}
                  className="flex-shrink-0 w-64 snap-start md:w-80"
                  variants={courseCardVariants}
                  custom={i}
                >
                  <div className="overflow-hidden transition-all duration-200 bg-white border border-gray-100 rounded-lg shadow hover:shadow-lg h-full flex flex-col">
                    <div className="relative flex-shrink-0">
                      <motion.img
                        className="object-cover w-full h-48"
                        src={course.image}
                        alt={course.title}
                        whileHover={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      {course.tag && (
                        <motion.span
                          className={`absolute px-3 py-1 text-xs font-bold text-white ${course.tag.color} rounded top-3 left-3`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2 + i * 0.05 }}
                        >
                          {course.tag.text}
                        </motion.span>
                      )}
                    </div>
                    <div className="flex flex-col flex-grow p-5">
                      <h3 className="text-lg font-bold text-gray-900">{course.title}</h3>
                      <p className="mt-2 text-sm text-gray-600">By {course.instructor}</p>
                      <div className="flex items-center mt-3">
                        <div className="flex items-center text-yellow-500">
                          {renderStars(course.rating)}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                          {course.rating} ({course.reviews.toLocaleString()})
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-lg font-bold text-gray-900">₹{course.price.toFixed(2)}</span>
                        <motion.button
                          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 cursor-pointer"
                          whileHover={{ scale: 1 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Enroll Now
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right Arrow */}
            <motion.button
              onClick={scrollRight}
              className="cursor-pointer absolute right-0 z-10 flex items-center justify-center w-12 h-12 -mr-6 text-gray-700 bg-white border border-gray-200 rounded-full shadow-lg top-1/2 -translate-y-1/2 hover:bg-gray-50 focus:outline-none"
              variants={arrowButtonVariants}
              whileTap="tap"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>

          {/* View All Button */}
          <motion.div
            className="mt-12 text-center"
            variants={buttonVariants}
          >
            <motion.button
              className="px-8 py-3 text-base font-medium text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
              whileHover="hover"
              whileTap="tap"
              variants={{
                hover: { scale: 1, backgroundColor: "#2563eb" },
                tap: { scale: 0.98 }
              }}
            >
              Browse All Courses
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;