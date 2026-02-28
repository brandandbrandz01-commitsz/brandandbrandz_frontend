"use client";

import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

interface ProductCardProps {
    title: string;
    subtitle: string;
    description: string[];
    imageSrc: string;
    reversed?: boolean;
}

export function ProductCard({ title, subtitle, description, imageSrc, reversed = false }: ProductCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    // Mouse position for tilt effect
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    // Smooth spring animations for tilt
    const rotateX = useSpring(useTransform(mouseY, [0, 1], [5, -5]), {
        stiffness: 150,
        damping: 20,
    });
    const rotateY = useSpring(useTransform(mouseX, [0, 1], [-5, 5]), {
        stiffness: 150,
        damping: 20,
    });

    // Shine effect
    const gradientX = useTransform(mouseX, [0, 1], [0, 100]);
    const gradientY = useTransform(mouseY, [0, 1], [0, 100]);
    const shineGradient = useMotionTemplate`radial-gradient(circle at ${gradientX}% ${gradientY}%, rgba(255, 255, 255, 0.1) 0%, transparent 60%)`;

    // Parallax for inner image
    const imageX = useTransform(mouseX, [0, 1], [-20, 20]);
    const imageY = useTransform(mouseY, [0, 1], [-20, 20]);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isMobile || !cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width);
        mouseY.set((e.clientY - rect.top) / rect.height);
    };

    const handleMouseLeave = () => {
        mouseX.set(0.5);
        mouseY.set(0.5);
    };

    return (
        <motion.div
            ref={cardRef}
            className="w-full bg-black rounded-[2rem] overflow-hidden border border-white/5 relative group perspective-1000"
            style={{
                rotateX: isMobile ? 0 : rotateX,
                rotateY: isMobile ? 0 : rotateY,
                transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Desktop Shine Effect */}
            {!isMobile && (
                <motion.div
                    className="absolute inset-0 pointer-events-none z-20"
                    style={{ background: shineGradient, mixBlendMode: "overlay" }}
                />
            )}

            <div className={`flex flex-col ${reversed ? "lg:flex-row-reverse" : "lg:flex-row"} h-full`}>
                {/* Content Section */}
                <div
                    className="flex-1 p-8 lg:p-12 flex flex-col justify-center z-10 relative"
                    style={{ transform: "translateZ(20px)" }}
                >
                    <motion.div
                        initial={{ opacity: 0, x: reversed ? 30 : -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        animate={isMobile ? { opacity: 1, x: 0 } : undefined}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                    >
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-2 font-sans tracking-tight">
                            {title}
                        </h2>
                        <h3 className="text-lg lg:text-xl text-white/60 mb-8 font-light">
                            {subtitle}
                        </h3>
                        <div className="space-y-4">
                            {description.map((para, idx) => (
                                <p key={idx} className="text-white/80 leading-relaxed font-sans text-base lg:text-lg">
                                    {para}
                                </p>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Image Section */}
                <div className="flex-1 relative min-h-[400px] lg:min-h-[500px] bg-black">
                    {/* Entry Slide Wrapper - Absolute to ensure height fill */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center p-6"
                        initial={{ opacity: 0, x: reversed ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        animate={isMobile ? { opacity: 1, x: 0 } : undefined} // Force visible on mobile
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Parallax Wrapper */}
                        <motion.div
                            style={{
                                x: isMobile ? 0 : imageX,
                                y: isMobile ? 0 : imageY,
                                transform: "translateZ(50px)"
                            }}
                            className="relative w-full h-full max-w-[500px] max-h-[500px]"
                        >
                            {/* Antigravity Float Wrapper */}
                            <motion.div
                                className="w-full h-full relative"
                                animate={{ y: [0, -15, 0] }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 6,
                                    ease: "easeInOut",
                                }}
                            >
                                <Image
                                    src={imageSrc}
                                    alt={`${title} mockups`}
                                    fill
                                    className="object-contain drop-shadow-2xl"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
