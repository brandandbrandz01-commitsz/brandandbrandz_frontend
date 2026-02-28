"use client";

import { Raleway } from "next/font/google";
import Image from "next/image";
import {
    motion,
    useMotionValue,
    useTransform,
    useSpring,
    useMotionTemplate,
    useScroll
} from "framer-motion";
import { useRef, useState, useEffect } from "react";

const raleway = Raleway({
    weight: ["400", "500", "600", "700", "900"],
    subsets: ["latin"],
});

type CardData = {
    id: number;
    title: string;
    description: string;
    span: string;
    useCustomBackground: boolean;
    customBg: string;
    hasStyles?: boolean;
};

const cards: CardData[] = [
    {
        id: 1,
        title: "Clear Growth & Mentorship",
        description: "Structured learning, mentorship, and defined growth paths to help you advance with confidence.",
        span: "col-span-1",
        useCustomBackground: true,
        customBg: "/morepage/card-1.webp",
        hasStyles: true,
    },
    {
        id: 2,
        title: "Meaningful, High-Impact Work",
        description: "Work on thoughtful projects that create real value for brands and systems.",
        span: "col-span-1",
        useCustomBackground: true,
        customBg: "/morepage/card-2.webp",
        hasStyles: true,
    },
    {
        id: 3,
        title: "Creative & Flexible Environment",
        description: "A culture that supports focus, creativity and healthy work balance.",
        span: "col-span-1",
        useCustomBackground: true,
        customBg: "/morepage/card-3.webp",
        hasStyles: true,
    },
    {
        id: 4,
        title: "Collaborative Team Culture",
        description: "A diverse, respectful team where ideas are heard and collaboration matters.",
        span: "col-span-1",
        useCustomBackground: true,
        customBg: "/morepage/card-4.webp",
        hasStyles: true,
    },
    {
        id: 5,
        title: "Ownership & Responsibility",
        description: "Take real ownership of your work and see its impact from strategy to execution.",
        span: "md:col-span-2 col-span-1",
        useCustomBackground: true,
        customBg: "/morepage/card-5.webp",
        hasStyles: false,
    },
];

function Card({ card }: { card: CardData }) {
    const ref = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    // Desktop: 3D Tilt Logic
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { damping: 15, stiffness: 100 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { damping: 15, stiffness: 100 });

    // Shine gradient position
    // Since range is -0.5 to 0.5, we map it to 0-100% for gradient position
    const shineX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
    const shineY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);
    const shineBg = useMotionTemplate`radial-gradient(circle at ${shineX} ${shineY}, rgba(255,255,255,0.2) 0%, transparent 80%)`;

    // Mobile: Parallax Scroll Logic
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Image moves 20% faster than card -> Translate Y based on scroll
    // Range: moves from -10% to 10% (total 20% shift)
    const parallaxY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current || isMobile) return;
        const rect = ref.current.getBoundingClientRect();

        // Calculate normalized position (-0.5 to 0.5)
        const width = rect.width;
        const height = rect.height;
        const x = (e.clientX - rect.left) / width - 0.5;
        const y = (e.clientY - rect.top) / height - 0.5;

        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        if (isMobile) return;
        mouseX.set(0);
        mouseY.set(0);
    };

    const useGradient = !card.useCustomBackground || card.hasStyles;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: card.id * 0.1 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: 1000,
                transformStyle: "preserve-3d",
                rotateX: isMobile ? 0 : rotateX,
                rotateY: isMobile ? 0 : rotateY,
            }}
            className={`
                group relative overflow-hidden rounded-[32px]
                ${useGradient ? 'bg-gradient-to-b from-[#1E2532] to-black border border-white/10' : ''}
                min-h-[420px] 
                ${card.span}
            `}
        >
            {/* Styling container for box-shadow to avoid conflict with perspective transform on parent if needed, 
                 but putting it on parent is fine usually. 
                 Using a separate absolute div for the "border/shadow" might be safer for 3D transforms,
                 but let's stick to the requested structure first.
             */}
            <div
                className="absolute inset-0 pointer-events-none rounded-[32px] z-50"
                style={{
                    boxShadow: useGradient ? "inset 0 0 0 1px rgba(255, 255, 255, 0.05), 0 20px 40px -10px rgba(0,0,0,0.5), inset 0 -6px 12px rgba(0,0,0,0.6)" : undefined
                }}
            />

            {/* Custom Background Image / Parallax Layer */}
            {card.useCustomBackground && (
                <motion.div
                    className="absolute inset-[-10%] w-[120%] h-[120%] z-0" // 120% size to allow for parallax movement without gaps
                    style={{
                        y: isMobile ? parallaxY : 0,
                        // On desktop, we can also add a subtle parallax or just keep it static relative to tilt
                        // The user asked for velocity based on mobile. 
                    }}
                >
                    <Image
                        src={card.customBg}
                        alt={card.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>
            )}

            {/* Content Container - Z-index elevated to float above image */}
            <div
                className="relative z-20 h-full flex flex-col p-8 sm:p-10 pointer-events-none"
                style={{ transform: "translateZ(30px)" }} // Push text forward for 3D depth
            >
                <div className="space-y-3 max-w-sm">
                    <h3 className="text-2xl font-bold text-white leading-tight tracking-wide font-variant-caps-all-small-caps" style={{ fontVariantCaps: 'all-small-caps' }}>
                        {card.title}
                    </h3>
                    <p className="text-gray-300 text-sm sm:text-base font-normal leading-relaxed text-opacity-90">
                        {card.description}
                    </p>
                </div>
            </div>

            {/* Shine Effect (Desktop) */}
            {!isMobile && (
                <motion.div
                    className="absolute inset-0 z-40 pointer-events-none"
                    style={{ background: shineBg }}
                />
            )}

            {/* Glossy Overlay (Static) */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-30" />
        </motion.div>
    );
}

export function WhyJoinUs() {
    return (
        <section className={`py-20 px-4 sm:px-6 lg:px-8 relative z-20 ${raleway.className}`}>
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Section Header */}
                <div className="text-center space-y-4">
                    <h2 className="text-4xl sm:text-5xl font-bold text-white">Why Join Us</h2>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl mx-auto space-y-2"
                    >
                        <p className="text-xl sm:text-2xl text-white font-light">
                            Experience a workplace that <br />
                            values your creativity, growth and impact.
                        </p>
                        <p className="text-gray-400 font-light text-base sm:text-lg">
                            At BrandandBrandz, we create an environment where ideas thrive, <br className="hidden sm:block" />
                            careers grow, and work makes real impact.
                        </p>
                    </motion.div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {cards.map((card) => (
                        <Card key={card.id} card={card} />
                    ))}
                </div>
            </div>
        </section>
    );
}
