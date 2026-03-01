"use client";

import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface VideoItemProps {
    src: string;
}

// Reusable Video Component with Floating Animation & In-View Playback
function VideoItem({ src }: VideoItemProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { amount: 0.3 });

    useEffect(() => {
        if (videoRef.current) {
            if (isInView) {
                videoRef.current.play().catch(() => { });
            } else {
                videoRef.current.pause();
            }
        }
    }, [isInView]);

    return (
        <div ref={containerRef} className="w-full flex justify-center">
            <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{
                    repeat: Infinity,
                    duration: 5,
                    ease: "easeInOut",
                }}
                className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[450px] relative group"
            >
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <video
                    ref={videoRef}
                    src={src}
                    muted
                    loop
                    playsInline
                    className="w-full h-auto object-contain mix-blend-screen rounded-2xl relative z-10"
                />
            </motion.div>
        </div>
    );
}

function StepInfo({ title, desc, align }: { title: string; desc: string; align: "left" | "right" }) {
    return (
        <div className={`w-full flex flex-col justify-center ${align === 'left' ? 'items-end text-right' : 'items-start text-left'}`}>
            <h3 className="text-xl sm:text-3xl md:text-5xl font-bold text-white mb-2 md:mb-4 tracking-tight uppercase leading-none">{title}</h3>
            <p className="text-white/50 text-xs sm:text-base md:text-lg leading-relaxed font-light max-w-md">{desc}</p>
        </div>
    );
}

export function HowWeWork() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 0.1", "end 0.9"]
    });

    const progress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const steps = [
        {
            title: "Understand",
            desc: "We dive deep into your business ecosystem. We analyze behavior, identify trust gaps, and define the core belief that will drive your brand.",
            video: "/plan.mp4",
        },
        {
            title: "Design",
            desc: "We craft systems with long-term intent. From visual identities to user journeys, every touchpoint is designed for clarity and resonance.",
            video: "/Bird.mp4",
        },
        {
            title: "Build",
            desc: "We architect scalable, robust solutions. Using a modern tech stack, we build platforms that turn your brand strategy into a functional reality.",
            video: "/Bear.mp4",
        },
        {
            title: "Scale",
            desc: "We grow with intelligence and data. Our systems use AI and performance marketing to expand your reach without losing your brand's soul.",
            video: "/Eagle.mp4",
        },
    ];

    return (
        <section ref={containerRef} className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 md:mb-32 relative z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 mb-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
                    >
                        <span className="text-[10px] md:text-xs font-medium text-white/60 uppercase tracking-widest">Our Methodology</span>
                    </motion.div>
                    <h2 className="text-3xl md:text-7xl font-bold text-white mb-4 md:mb-6 tracking-tighter">How We Work</h2>
                    <p className="text-base md:text-xl text-white/40 max-w-2xl mx-auto font-light leading-relaxed">
                        Our methodology is built on speed, precision, and long-term systems. <br className="hidden md:block" />
                        We don't just deliver projects; we architect ecosystems.
                    </p>
                </div>

                <div className="relative">
                    {/* Fixed center vertical line track */}
                    <div className="absolute left-1/2 -translate-x-1/2 w-[1px] h-full bg-white/20 top-0 z-0" />

                    {/* Animated Progress Line */}
                    <motion.div
                        style={{
                            scaleY: progress,
                        }}
                        className="absolute left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-zinc-400 via-[#70879f] to-sky-700 top-0 h-full z-10 origin-top shadow-[0_0_15px_rgba(112,135,159,0.3)]"
                    />

                    <div className="space-y-24 md:space-y-48 relative z-20">
                        {steps.map((step, index) => {
                            const isEven = index % 2 === 0;
                            const stepRef = useRef(null);
                            const isInView = useInView(stepRef, { amount: 0.2, once: true });

                            // Calculate step relative progress for node activation
                            const stepThreshold = index / (steps.length - 1);
                            const isActive = useTransform(scrollYProgress,
                                [stepThreshold - 0.05, stepThreshold, stepThreshold + 0.05],
                                [0, 1, 1]
                            );

                            return (
                                <div key={step.title} ref={stepRef} className="relative flex items-center w-full min-h-[30vh] md:min-h-[40vh]">
                                    {/* Timeline Node */}
                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 group/node">
                                        <motion.div
                                            style={{
                                                scale: useTransform(isActive, [0, 1], [0.8, 1.2]),
                                                backgroundColor: useTransform(isActive, [0, 1], ["#18181b", "#0369a1"]),
                                                boxShadow: useTransform(isActive, [0, 1], ["0px 0px 0px rgba(3,105,161,0)", "0px 0px 20px rgba(3,105,161,0.6)"])
                                            }}
                                            className="w-4 h-4 md:w-6 md:h-6 rounded-full border-2 border-white/20 hover:border-white/50 transition-colors duration-300 flex items-center justify-center cursor-pointer"
                                        >
                                            <motion.div
                                                style={{ opacity: isActive }}
                                                className="w-full h-full rounded-full bg-sky-400 blur-[4px] animate-pulse"
                                            />
                                        </motion.div>
                                    </div>

                                    {/* Alternating Zigzag Layout */}
                                    <div className={`flex w-full items-center ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
                                        {/* Image/Video Column */}
                                        <div className="w-[45%] flex justify-center px-2 sm:px-4 md:px-8">
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 100,
                                                    damping: 20,
                                                    delay: 0.1
                                                }}
                                                className="w-full"
                                            >
                                                <VideoItem src={step.video} />
                                            </motion.div>
                                        </div>

                                        {/* Gap for the line */}
                                        <div className="w-[10%]" />

                                        {/* Content Column */}
                                        <div className="w-[45%] flex flex-col justify-center px-2 sm:px-4 md:px-8">
                                            <motion.div
                                                initial={{ opacity: 0, x: isEven ? 20 : -20, y: 20 }}
                                                animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 100,
                                                    damping: 20,
                                                    delay: 0.3
                                                }}
                                            >
                                                <StepInfo
                                                    title={step.title}
                                                    desc={step.desc}
                                                    align={isEven ? "right" : "left"}
                                                />
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
