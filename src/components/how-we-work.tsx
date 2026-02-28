"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

interface VideoItemProps {
    src: string;
    align: "left" | "right";
}

// Reusable Video Component with Floating Animation & In-View Playback
function VideoItem({ src, align }: VideoItemProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { amount: 0.5 }); // Play when 50% seen

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
        <div ref={containerRef} className={`w-full md:w-1/2 flex mb-12 md:mb-0 ${align === 'right' ? 'md:justify-end md:pr-16' : 'md:justify-start md:pl-16'} justify-center`}>
            <motion.div
                animate={{ y: [-10, 10, -10] }} // Subtle Float
                transition={{
                    repeat: Infinity,
                    duration: 5,
                    ease: "easeInOut",
                }}
                className="w-full max-w-[320px] md:max-w-[450px] relative group"
            >
                {/* Glow effect backround */}
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

// Reusable Step Text Component
function StepInfo({ title, desc, align }: { title: string; desc: string; align: "left" | "right" }) {
    return (
        <div className={`w-full md:w-1/2 mb-12 md:mb-0 px-4 md:px-0 ${align === 'right' ? 'md:text-right md:pr-16 text-center' : 'md:text-left md:pl-16 text-center'}`}>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight drop-shadow-sm">{title}</h3>
            <p className="text-white/60 text-lg md:text-xl leading-relaxed font-light">{desc}</p>
        </div>
    );
}

// Animated Dot Component
function StepDot({ scrollYProgress, index, total }: { scrollYProgress: any, index: number, total: number }) {
    const step = 1 / (total - 1);
    const start = index * step - 0.1;
    const end = index * step + 0.05;

    const activeColor = index === 0 ? "#a1a1aa" : index === 1 ? "#94a3b8" : index === 2 ? "#70879f" : "#0369a1";

    const backgroundColor = useTransform(scrollYProgress, [start, end], ["#09090b", activeColor]);
    const borderColor = useTransform(scrollYProgress, [start, end], ["#27272a", activeColor]);
    const scale = useTransform(scrollYProgress, [start, end], [1, 1.25]);
    const glow = useTransform(scrollYProgress, [start, end], ["0px 0px 0px rgba(0,0,0,0)", `0px 0px 15px ${activeColor}`]);

    return (
        <div className="absolute left-1/2 top-0 md:top-1/2 -translate-x-1/2 -translate-y-1/2 md:-translate-y-1/2 z-30 flex-shrink-0 hidden md:flex">
            {/* Hidden on mobile, shown on md+ to keep clean layout or use responsive logic below */}
            <motion.div
                style={{ backgroundColor, borderColor, scale, boxShadow: glow }}
                className="w-5 h-5 rounded-full border-2 transition-colors duration-200"
            />
        </div>
    );
}

// Mobile Dot Component (Left Aligned or Top Aligned)
function MobileStepDot({ scrollYProgress, index, total }: { scrollYProgress: any, index: number, total: number }) {
    // Similar logic but simpler positioning for mobile if needed, 
    // but for now we might hide the complex timeline on small mobile or make it simpler.
    // Let's reuse the logic but allow it to render block.
    const step = 1 / (total - 1);
    const start = index * step - 0.1;
    const end = index * step + 0.05;
    const activeColor = index === 0 ? "#a1a1aa" : index === 1 ? "#94a3b8" : index === 2 ? "#70879f" : "#0369a1";

    const backgroundColor = useTransform(scrollYProgress, [start, end], ["#09090b", activeColor]);
    const borderColor = useTransform(scrollYProgress, [start, end], ["#27272a", activeColor]);
    const glow = useTransform(scrollYProgress, [start, end], ["0px 0px 0px rgba(0,0,0,0)", `0px 0px 15px ${activeColor}`]);

    return (
        <motion.div
            style={{ backgroundColor, borderColor, boxShadow: glow }}
            className="w-4 h-4 rounded-full border-2 mb-4 md:hidden mx-auto"
        />
    )
}


export function HowWeWork() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    const steps = [
        {
            title: "Understand",
            desc: "We dive deep into your business ecosystem.",
            video: "/plan.mp4",
        },
        {
            title: "Design",
            desc: "We craft systems with long-term intent.",
            video: "/Bird.mp4",
        },
        {
            title: "Build",
            desc: "We architect scalable, robust solutions.",
            video: "/Bear.mp4",
        },
        {
            title: "Scale",
            desc: "We grow with intelligence and data.",
            video: "/Eagle.mp4",
        },
    ];

    return (
        <section ref={containerRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden">

            <h2 className="text-center text-3xl sm:text-5xl font-bold text-white mb-4 tracking-tight">How We Work</h2>
            <p className="text-center text-lg mb-24 text-white/40 max-w-lg mx-auto">
                Our methodology is built on speed, precision, and long-term systems.
            </p>

            <div className="container mx-auto max-w-7xl relative">

                {/* DESKTOP/MOBILE Timeline Lines */}
                <div className="absolute left-1/2 -translate-x-1/2 w-[1px] h-full bg-white/10 top-0 z-0 rounded-full" />
                <motion.div
                    style={{ height: lineHeight }}
                    className="absolute left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-zinc-400 via-zinc-200 to-sky-500 top-0 z-10 origin-top rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] backdrop-blur-sm"
                />

                <div className="space-y-16 md:space-y-24 relative z-20">
                    {steps.map((step, index) => {
                        const isEven = index % 2 === 0;
                        return (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="flex flex-col md:flex-row items-center w-full relative"
                            >
                                {/* Mobile Step Dot (Centered top) */}
                                <div className="absolute left-1/2 top-4 -translate-x-1/2 md:hidden z-30">
                                    <MobileStepDot scrollYProgress={scrollYProgress} index={index} total={steps.length} />
                                </div>

                                {/* 
                                    DESKTOP LAYOUT (Alternating):
                                    Even (0, 2): Video(Left) -- Dot -- Text(Right)
                                    Odd (1, 3): Text(Left) -- Dot -- Video(Right)
                                */}

                                {/* LEFT SIDE CONTENT (Desktop) / TOP CONTENT (Mobile) */}
                                <div className={`w-full md:w-1/2 flex justify-center ${isEven ? 'md:justify-end' : 'md:justify-start'} order-2 md:order-1`}>
                                    {/* On Mobile, we generally want Text then Video, or Video then Text? 
                                        Let's stack consistently on mobile: Text Top, Video Bottom looks good or vice versa.
                                        But here we just follow the DOM order mostly, but using 'order' classes.
                                     */}

                                    {/* Even: Video Left (Desktop). Odd: Text Left (Desktop) */}
                                    {isEven ? (
                                        <div className="hidden md:block w-full"><VideoItem src={step.video} align="right" /></div>
                                    ) : (
                                        <div className="w-full"><StepInfo title={step.title} desc={step.desc} align="right" /></div>
                                    )}

                                    {/* Mobile Only: Text FIRST then Video for Even steps */}
                                    {isEven && (
                                        <div className="md:hidden w-full flex flex-col items-center">
                                            <StepInfo title={step.title} desc={step.desc} align="left" />
                                            <VideoItem src={step.video} align="left" />
                                        </div>
                                    )}
                                </div>


                                {/* CENTER DOT (Desktop) */}
                                <StepDot scrollYProgress={scrollYProgress} index={index} total={steps.length} />


                                {/* RIGHT SIDE CONTENT (Desktop) / BOTTOM CONTENT (Mobile) */}
                                <div className={`w-full md:w-1/2 flex justify-center ${isEven ? 'md:justify-start' : 'md:justify-end'} order-3`}>
                                    {/* Even: Text Right (Desktop). Odd: Video Right (Desktop) */}
                                    {isEven ? (
                                        <div className="w-full"><StepInfo title={step.title} desc={step.desc} align="left" /></div>
                                    ) : (
                                        <div className="hidden md:block w-full"><VideoItem src={step.video} align="left" /></div>
                                    )}

                                    {/* Mobile Only: Text FIRST then Video for Odd steps */}
                                    {!isEven && (
                                        <div className="md:hidden w-full flex flex-col items-center">
                                            <StepInfo title={step.title} desc={step.desc} align="left" />
                                            <VideoItem src={step.video} align="left" />
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
