import { Raleway } from "next/font/google";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";

const raleway = Raleway({
    weight: ["400", "500", "600", "700", "800"],
    subsets: ["latin"],
});

const positions = [
    {
        id: 7,
        tags: ["Full-time", "Onsite"],
        title: "Senior Business Development Manager",
        description: "We are looking for a results-driven professional who understands growth, revenue, and market expansion — not just follow-ups and calls.",
    },
    {
        id: 1,
        tags: ["Full-time", "Remote"],
        title: "Digital Marketing Specialist",
        description: "Plan and execute SEO, ads, and content campaigns to grow brand visibility and drive measurable results.",
    },
    {
        id: 2,
        tags: ["Internship", "Remote"],
        title: "Business Development Intern",
        description: "We're looking for a Business Development Intern who is motivated to learn how companies grow by building strategic client relationships.",
    },
    {
        id: 3,
        tags: ["Internship", "Remote"],
        title: "Graphic Design Intern",
        description: "Create high-impact visual content and brand assets that capture attention and communicate our core message across all digital platforms.",
    },
    {
        id: 4,
        tags: ["Internship", "Remote"],
        title: "UI/UX Design Intern",
        description: "Craft seamless user journeys and intuitive interfaces by blending aesthetic excellence with user-centric research and wireframing.",
    },
    {
        id: 5,
        tags: ["Internship", "Remote"],
        title: "Full Stack Development Intern",
        description: "Build and maintain scalable web applications by working across the front-end and back-end to deliver robust, high-performance features.",
    },
    {
        id: 6,
        tags: ["Internship", "Remote"],
        title: "AI/ML Intern",
        description: "Leverage data-driven insights and machine learning models to build intelligent solutions and automate complex business processes.",
    },
];

function PositionCard({ position, index, isMobile }: { position: any; index: number; isMobile: boolean }) {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, {
        amount: 0.6,
        margin: "-10% 0px -10% 0px"
    });

    const isActive = isMobile ? isInView : false;

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative bg-[#0A0A0A] border border-white/10 rounded-[40px] p-8 sm:p-12 overflow-hidden transition-all duration-300 hover:border-gray-800"
            style={{
                boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.05), 0 10px 30px -10px rgba(0,0,0,0.5)"
            }}
        >
            {/* Background Gradient Layer */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-zinc-400 via-[#70879f] to-sky-700 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 1 : 0 }}
                style={{
                    transition: "opacity 0.5s ease"
                }}
            />

            {/* Desktop Hover Fallback */}
            {!isMobile && (
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-400 via-[#70879f] to-sky-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            )}

            <div className="relative z-10 flex flex-col h-full space-y-8">
                {/* Tags */}
                <div className="flex flex-wrap gap-4">
                    {position.tags.map((tag: string, i: number) => (
                        <span
                            key={i}
                            className={`px-6 py-2 rounded-full border border-white/20 text-gray-300 group-hover:text-white group-hover:border-white/40 text-sm sm:text-base font-medium tracking-wide transition-colors ${isActive ? 'text-white border-white/40' : ''}`}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Content */}
                <div className="space-y-4 flex-grow">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                        {position.title}
                    </h3>
                    <p className={`text-gray-400 group-hover:text-white text-base sm:text-lg leading-relaxed max-w-lg transition-colors ${isActive ? 'text-white' : ''}`}>
                        {position.description}
                    </p>
                </div>

                {/* Button */}
                <div className="pt-2">
                    <Link href={`/jobs/${position.id}`}>
                        <Button
                            className={`bg-[#1F1F1F] text-white border border-white/10 rounded-full px-8 py-6 text-base font-medium transition-all duration-300 w-fit group-hover:bg-white group-hover:text-black group-hover:border-transparent group-hover:shadow-lg ${isActive ? 'bg-white text-black border-transparent shadow-lg' : ''}`}
                        >
                            Read More
                        </Button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}

export function OpenPositions() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <section className={`py-24 px-4 sm:px-6 lg:px-8 relative z-20 ${raleway.className}`}>
            <div className="max-w-7xl mx-auto space-y-16">

                {/* Section Header */}
                <div className="text-center space-y-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl sm:text-5xl font-bold text-white"
                    >
                        Open Positions
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-2xl sm:text-4xl font-light text-white"
                    >
                        Become part of the <br />
                        <span className="font-normal">dream-team</span>
                    </motion.p>
                </div>

                {/* Positions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {positions.map((position, index) => (
                        <PositionCard
                            key={position.id}
                            position={position}
                            index={index}
                            isMobile={isMobile}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}
