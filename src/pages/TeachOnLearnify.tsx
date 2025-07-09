import React from 'react';
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion, type Variants } from "framer-motion";
import LearnifyImage from '../assets/Images/Learnify.png';

type Stat = {
    label: string;
    target: number;
    suffix: string;
};

const stats: Stat[] = [
    { label: "Students", target: 80, suffix: "M" },
    { label: "Languages", target: 75, suffix: "+" },
    { label: "Enrollments", target: 1.1, suffix: "B" },
    { label: "Countries", target: 180, suffix: "+" },
    { label: "Enterprise customers", target: 17200, suffix: "+" },
];

interface ReasonItemProps {
    iconUrl: string;
    title: string;
    description: string;
}

type Step = 'plan' | 'record' | 'launch';

interface StepContent {
    title: string;
    description: string[];
    help: string;
    image: string;
}

const steps: Record<Step, StepContent> = {
    plan: {
        title: 'Plan your curriculum',
        description: [
            'You start with your passion and knowledge. Then choose a promising topic with the help of our Marketplace Insights tool.',
            'The way that you teach — what you bring to it — is up to you.',
        ],
        help: 'We offer plenty of resources on how to create your first course. Our instructor dashboard and curriculum pages help keep you organized.',
        image: 'https://s.udemycdn.com/teaching/plan-your-curriculum-v3.jpg',
    },
    record: {
        title: 'Record your video',
        description: [
            'Use basic tools like a smartphone or DSLR camera. Add a good microphone and you\'re ready.',
            'If you don\'t like being on camera, just capture your screen. Aim for at least 2 hours of video.',
        ],
        help: 'Our support team can give feedback on test videos and help with setup.',
        image: 'https://s.udemycdn.com/teaching/record-your-video-v3.jpg',
    },
    launch: {
        title: 'Launch your course',
        description: [
            'Promote your course on social media and your network to get your first ratings.',
            'Your course will appear in our marketplace and generate revenue from enrollments.',
        ],
        help: 'Use our coupon tool for offers and benefit from global promotions & Udemy Business.',
        image: 'https://s.udemycdn.com/teaching/launch-your-course-v3.jpg',
    },
};

const reasons: ReasonItemProps[] = [
    {
        iconUrl: "https://s.udemycdn.com/teaching/value-prop-teach-v3.jpg",
        title: "Teach your way",
        description: "Publish the course you want, in the way you want, and always have control of your own content.",
    },
    {
        iconUrl: "https://s.udemycdn.com/teaching/value-prop-inspire-v3.jpg",
        title: "Inspire learners",
        description: "Teach what you know and help learners explore their interests, gain new skills, and advance their careers.",
    },
    {
        iconUrl: "https://s.udemycdn.com/teaching/value-prop-get-rewarded-v3.jpg",
        title: "Get rewarded",
        description: "Expand your professional network, build your expertise, and earn money on each paid enrollment.",
    },
];

const instructors = [
    {
        id: 1,
        name: "Sarah Johnson",
        title: "Data Scientist & Learnify Instructor",
        image: "https://s.udemycdn.com/career-academies/careers/data-scientist/data-scientist-person.png",
        quote: "Learnify has transformed how I share my data science expertise with the world",
        details: "The platform's global reach helped me connect with students from 45 countries while maintaining complete creative control over my content."
    },
    {
        id: 2,
        name: "Michael Chen",
        title: "Cloud Architect & Learnify Instructor",
        image: "https://s.udemycdn.com/career-academies/careers/cloud-engineer/cloud-engineer-person.png",
        quote: "My courses now generate more income than my corporate consulting work",
        details: "Learnify's instructor dashboard gives me real-time insights to improve my content and maximize student engagement."
    },
    {
        id: 3,
        name: "David Rodriguez",
        title: "Full-Stack Developer & Learnify Instructor",
        image: "https://s.udemycdn.com/career-academies/careers/full-stack-web-developer/frontend-webdev-human.png",
        quote: "What started as a side hustle replaced my full-time income in under a year",
        details: "The quality of students and depth of interaction on Learnify surpassed all other platforms I've tried."
    },
    {
        id: 4,
        name: "Priya Kapoor",
        title: "PMP Certified & Learnify Instructor",
        image: "https://s.udemycdn.com/career-academies/careers/project-manager/project-manager-human.png",
        quote: "I've built an entire consulting business through my Learnify courses",
        details: "Enterprise clients discovered me through Udemy Business, leading to high-value corporate training contracts."
    }
];

// Animation Variants
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

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            when: "beforeChildren"
        }
    }
};

const buttonTapVariants: Variants = {
    tap: { scale: 0.98 }
};

const instructorFadeVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
};

const ReasonItem: React.FC<ReasonItemProps> = ({ iconUrl, title, description }) => (
    <motion.div 
        className="flex flex-col items-center text-center max-w-sm px-4"
        variants={fadeInVariants}
    >
        <img src={iconUrl} alt={title} className="w-24 h-24 mb-4" />
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-lg text-gray-600">{description}</p>
    </motion.div>
);

const TeachOnLearnify: React.FC = () => {
    const [active, setActive] = useState<Step>('plan');
    const { title, description, help, image } = steps[active];
    const { ref, inView } = useInView({ triggerOnce: true });
    const [counts, setCounts] = useState<number[]>(stats.map(() => 0));
    const [activeInstructor, setActiveInstructor] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveInstructor((prev) => (prev === instructors.length - 1 ? 0 : prev + 1));
        }, 6000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (!inView) return;

        const intervals = stats.map((stat, index) => {
            const increment = stat.target / 60;
            return setInterval(() => {
                setCounts((prev) => {
                    const updated = [...prev];
                    if (updated[index] < stat.target) {
                        updated[index] = Math.min(updated[index] + increment, stat.target);
                    }
                    return updated;
                });
            }, 30);
        });

        return () => intervals.forEach(clearInterval);
    }, [inView]);

    return (
        <div className="bg-white pt-8 sm:pt-16 md:pt-18 lg:pt-20 xl:pt-26">
            {/* Hero Section */}
            <motion.section 
                className="pt-12 pb-20 sm:pb-16 lg:pt-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
            >
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid max-w-lg grid-cols-1 mx-auto lg:max-w-full lg:items-center lg:grid-cols-2 gap-y-12 lg:gap-x-16">
                        <div>
                            <motion.div className="text-center lg:text-left" variants={fadeInVariants}>
                                <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:leading-tight lg:text-6xl font-pj">Share Your Knowledge with the World</h1>
                                <p className="mt-2 text-lg text-gray-600 sm:mt-8 font-inter">
                                    Join our community of expert instructors and teach what you love.
                                    Earn money while helping students achieve their goals.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 mt-8 sm:mt-10">
                                    <motion.a
                                        href="/instructor-register"
                                        className="inline-flex px-6 py-3 text-lg font-bold text-white transition-all duration-200 bg-gray-900 rounded-lg focus:outline-none focus:bg-yellow-500 font-pj hover:bg-yellow-400 hover:text-black focus:text-black text-center justify-center"
                                        variants={buttonTapVariants}
                                        whileTap="tap"
                                    >
                                        Become an Instructor
                                    </motion.a>
                                    <motion.a
                                        href="/instructor-login"
                                        className="inline-flex px-6 py-3 text-lg font-bold text-gray-900 transition-all duration-200 bg-white border border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 font-pj hover:bg-gray-100 text-center justify-center"
                                        variants={buttonTapVariants}
                                        whileTap="tap"
                                    >
                                        Instructor Login
                                    </motion.a>
                                </div>
                            </motion.div>

                            <motion.div 
                                className="flex items-center justify-center mt-10 space-x-6 lg:justify-start sm:space-x-8"
                                variants={fadeInVariants}
                            >
                                <div className="flex items-center">
                                    <p className="text-3xl font-medium text-gray-900 sm:text-4xl font-pj">10K+</p>
                                    <p className="ml-3 text-sm text-gray-900 font-pj">Active<br />Instructors</p>
                                </div>

                                <div className="hidden sm:block">
                                    <svg className="text-gray-400" width="16" height="39" viewBox="0 0 16 39" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <line x1="0.72265" y1="10.584" x2="15.7226" y2="0.583975"></line>
                                        <line x1="0.72265" y1="17.584" x2="15.7226" y2="7.58398"></line>
                                        <line x1="0.72265" y1="24.584" x2="15.7226" y2="14.584"></line>
                                        <line x1="0.72265" y1="31.584" x2="15.7226" y2="21.584"></line>
                                        <line x1="0.72265" y1="38.584" x2="15.7226" y2="28.584"></line>
                                    </svg>
                                </div>

                                <div className="flex items-center">
                                    <p className="text-3xl font-medium text-gray-900 sm:text-4xl font-pj">$5M+</p>
                                    <p className="ml-3 text-sm text-gray-900 font-pj">Paid to<br />Instructors</p>
                                </div>
                            </motion.div>
                        </div>

                        <motion.div variants={fadeInVariants}>
                            <img
                                className="w-full"
                                src="https://s.udemycdn.com/career-academies/careers/digital-marketer/digital-marketer-hero.png"
                                alt="Instructor teaching online"
                            />
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Reasons Section */}
            <motion.section 
                className="py-18"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
            >
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <motion.div className="text-center mb-10" variants={fadeInVariants}>
                        <h2 className="text-6xl font-bold text-black pb-20">So Many Reasons to Start</h2>
                    </motion.div>
                    <motion.div 
                        className="flex flex-col md:flex-row justify-center gap-12 items-center pb-16"
                        variants={staggerContainer}
                    >
                        {reasons.map((reason, index) => (
                            <ReasonItem key={index} {...reason} />
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* Stats Section */}
            <motion.div 
                ref={ref} 
                className="bg-blue-600 py-24 text-white flex gap-26 justify-center flex-wrap"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
            >
                {stats.map((stat, index) => (
                    <motion.div 
                        key={stat.label} 
                        className="text-center m-4"
                        variants={fadeInVariants}
                    >
                        <h2 className="text-6xl font-bold">
                            {counts[index].toFixed(stat.target < 10 ? 1 : 0)}
                            {stat.suffix}
                        </h2>
                        <p className="mt-2">{stat.label}</p>
                    </motion.div>
                ))}
            </motion.div>

            {/* How to begin Section */}
            <motion.section 
                className="relative max-w-6xl mx-auto px-6 py-16 sm:py-20 overflow-hidden bg-white"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
            >
                <motion.div className="text-center mb-16" variants={fadeInVariants}>
                    <h2 className="text-4xl sm:text-6xl font-bold text-black mb-4">
                        Start Teaching in Minutes
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Follow these simple steps to begin your journey as an instructor and share your knowledge with the world.
                    </p>
                </motion.div>

                {/* Enhanced Tabs */}
                <motion.div className="flex justify-center mb-12" variants={fadeInVariants}>
                    <div className="inline-flex bg-white rounded-full p-1">
                        {Object.entries(steps).map(([key, value]) => (
                            <motion.button
                                key={key}
                                onClick={() => setActive(key as Step)}
                                className={`px-6 py-3 text-sm sm:text-2xl font-semibold rounded-full transition-all duration-300 ${active === key
                                    ? 'bg-white text-blue-600'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                                    }`}
                                variants={buttonTapVariants}
                                whileTap="tap"
                            >
                                {value.title}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Content with Fancy Card */}
                <motion.div 
                    className="bg-white rounded-xl overflow-hidden"
                    variants={fadeInVariants}
                >
                    <div className="flex flex-col lg:flex-row">
                        <div className="flex-1 p-8 sm:p-10 lg:p-12">
                            <div className="space-y-6">
                                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h3>

                                <div className="space-y-4">
                                    {description.map((para, i) => (
                                        <p
                                            key={i}
                                            className="text-gray-700 text-base sm:text-lg leading-relaxed"
                                        >
                                            {para}
                                        </p>
                                    ))}
                                </div>

                                <div className="mt-8 p-6 bg-white rounded-lg">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 mt-1">
                                            <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <h4 className="font-semibold text-lg text-blue-700 mb-2">How we help you</h4>
                                            <p className="text-blue-700 text-base leading-relaxed">{help}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 bg-white p-8 flex items-center justify-center">
                            <div className="relative w-full max-w-xl mx-auto">
                                <div className="absolute -inset-4 rounded-2xl opacity-20 blur"></div>
                                <img
                                    src={image}
                                    alt={title}
                                    className="relative w-full h-auto object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.section>

            {/* Instructor Feedback - Full Screen Carousel */}
            <section className="relative h-auto min-h-screen w-full bg-white">
                <div className="container mx-auto px-4 py-12 md:py-24">
                    <motion.h2 
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8 md:mb-16"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInVariants}
                    >
                        What Our Top Instructors Say
                    </motion.h2>

                    <div className="relative h-[500px] md:h-[600px] w-full">
                        {instructors.map((instructor, index) => (
                            <motion.div
                                key={instructor.id}
                                className={`absolute inset-0 flex flex-col md:flex-row items-center justify-center md:justify-evenly transition-opacity duration-1000 ease-in-out ${activeInstructor === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                                variants={instructorFadeVariants}
                                initial="hidden"
                                animate={activeInstructor === index ? "visible" : "hidden"}
                            >
                                {/* Instructor Image */}
                                <div className="w-full md:w-3/4 lg:w-1/4 flex justify-center mb-8 md:mb-0">
                                    <div className="relative pt-24">
                                        <img
                                            src={instructor.image}
                                            alt={instructor.name}
                                            className="w-48 h-auto md:w-auto md:h-auto lg:w-full lg:h-auto"
                                        />
                                    </div>
                                </div>

                                {/* Testimonial Content */}
                                <div className="w-full lg:w-2/4 xl:w-2/5 text-center md:text-left md:px-12">
                                    <div className="max-w-2xl mx-auto">
                                        <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                                            <img
                                                src={LearnifyImage}
                                                alt="Learnify logo"
                                                className="w-auto h-16"
                                            />
                                        </div>

                                        <blockquote className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-800 mb-6 leading-relaxed">
                                            "{instructor.quote}"
                                        </blockquote>

                                        <p className="text-gray-600 text-lg mb-8">
                                            {instructor.details}
                                        </p>

                                        <div>
                                            <p className="font-semibold text-gray-700">{instructor.name}</p>
                                            <p className="text-sm text-gray-500">{instructor.title}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default TeachOnLearnify;