import React, { useState } from 'react';

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
        image: 'https://s.udemycdn.com/teaching/plan-your-curriculum-v3.jpg', // Replace with your actual link
    },
    record: {
        title: 'Record your video',
        description: [
            'Use basic tools like a smartphone or DSLR camera. Add a good microphone and you’re ready.',
            'If you don’t like being on camera, just capture your screen. Aim for at least 2 hours of video.',
        ],
        help: 'Our support team can give feedback on test videos and help with setup.',
        image: 'https://s.udemycdn.com/teaching/record-your-video-v3.jpg', // Replace with your actual link
    },
    launch: {
        title: 'Launch your course',
        description: [
            'Promote your course on social media and your network to get your first ratings.',
            'Your course will appear in our marketplace and generate revenue from enrollments.',
        ],
        help: 'Use our coupon tool for offers and benefit from global promotions & Udemy Business.',
        image: 'https://s.udemycdn.com/teaching/launch-your-course-v3.jpg', // Replace with your actual link
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

const ReasonItem: React.FC<ReasonItemProps> = ({ iconUrl, title, description }) => (
    <div className="flex flex-col items-center text-center max-w-sm px-4">
        <img src={iconUrl} alt={title} className="w-24 h-24 mb-4" />
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-lg text-gray-600">{description}</p>
    </div>
);

const TeachOnLearnify: React.FC = () => {
    const [active, setActive] = useState<Step>('plan');
    const { title, description, help, image } = steps[active];

    return (
        <div className="bg-[#FCF8F1] pt-8 sm:pt-16 md:pt-18 lg:pt-20 xl:pt-26">
            {/* Hero Section */}
            <section className="pt-12 pb-20 sm:pb-16 lg:pt-8">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid max-w-lg grid-cols-1 mx-auto lg:max-w-full lg:items-center lg:grid-cols-2 gap-y-12 lg:gap-x-16">
                        <div>
                            <div className="text-center lg:text-left">
                                <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:leading-tight lg:text-6xl font-pj">Share Your Knowledge with the World</h1>
                                <p className="mt-2 text-lg text-gray-600 sm:mt-8 font-inter">
                                    Join our community of expert instructors and teach what you love.
                                    Earn money while helping students achieve their goals.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 mt-8 sm:mt-10">
                                    <a
                                        href="/instructor/signup"
                                        className="inline-flex px-6 py-3 text-lg font-bold text-white transition-all duration-200 bg-gray-900 rounded-lg focus:outline-none focus:bg-yellow-500 font-pj hover:bg-yellow-400 hover:text-black focus:text-black text-center justify-center"
                                    >
                                        Become an Instructor
                                    </a>
                                    <a
                                        href="/instructor/login"
                                        className="inline-flex px-6 py-3 text-lg font-bold text-gray-900 transition-all duration-200 bg-white border border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 font-pj hover:bg-gray-100 text-center justify-center"
                                    >
                                        Instructor Login
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center justify-center mt-10 space-x-6 lg:justify-start sm:space-x-8">
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
                            </div>
                        </div>

                        <div>
                            <img
                                className="w-full"
                                src="https://s.udemycdn.com/career-academies/careers/digital-marketer/digital-marketer-hero.png"
                                alt="Instructor teaching online"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Reasons Section */}
            <section className="py-18 bg-white">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <h2 className="text-6xl font-bold text-gray-900 pb-6">So many reasons to start</h2>
                    </div>
                    <div className="flex flex-col md:flex-row justify-center gap-12 items-center">
                        {reasons.map((reason, index) => (
                            <ReasonItem key={index} {...reason} />
                        ))}
                    </div>
                </div>
            </section>

            {/* How to begin Section */}
            <section className="relative max-w-6xl mx-auto px-6 py-16 sm:py-20 overflow-hidden">
                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-6xl font-bold text-black mb-4">
                        Start Teaching in Minutes
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Follow these simple steps to begin your journey as an instructor and share your knowledge with the world.
                    </p>
                </div>

                {/* Enhanced Tabs */}
                <div className="flex justify-center mb-12">
                    <div className="inline-flex bg-gray-100 rounded-full p-1">
                        {Object.entries(steps).map(([key, value]) => (
                            <button
                                key={key}
                                onClick={() => setActive(key as Step)}
                                className={`px-6 py-3 text-sm sm:text-2xl font-semibold rounded-full transition-all duration-300 ${active === key
                                    ? 'bg-white shadow-md text-blue-600'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                    }`}
                            >
                                {value.title}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content with Fancy Card */}
                <div className="bg-white rounded-xl overflow-hidden">
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

                                <div className="mt-8 p-6 bg-indigo-50 rounded-lg border border-indigo-100">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 mt-1">
                                            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <h4 className="font-semibold text-lg text-indigo-800 mb-2">How we help you</h4>
                                            <p className="text-indigo-700 text-base leading-relaxed">{help}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 bg-gray-50 p-8 flex items-center justify-center">
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
                </div>

                {/* Fixed Decorative Elements - now properly contained */}
                <div className="hidden lg:block">
                    <div className="absolute left-0 top-0 w-48 h-48 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 -translate-x-1/2"></div>
                    <div className="absolute right-0 bottom-0 w-48 h-48 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 translate-x-1/2"></div>
                </div>
            </section>
        </div>
    )
}

export default TeachOnLearnify;