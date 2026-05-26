"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Playball, Raleway } from "next/font/google";

const playball = Playball({ subsets: ["latin"], weight: "400" });
const raleway = Raleway({ subsets: ["latin"], weight: ["400", "700"] });

export function HomeHero() {
    const { scrollY } = useScroll();
    const heroScale = useTransform(scrollY, [0, 500], [1, 0.98]);
    const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.9]);
    const heroY = useTransform(scrollY, [0, 500], [0, 20]);

    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.2,
                duration: 1.4,
                ease: [0.22, 1, 0.36, 1] as any,
            },
        }),
    };

    return (
        <section className={`relative h-screen w-full flex flex-col items-center justify-center overflow-hidden z-0 ${raleway.className}`}>
            {/* Full-Window Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/Heropage1.webp"
                    alt="Hero Background"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content Layer */}
            <motion.div
                style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
                className="relative z-10 w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 mt-[-60px]"
            >
                <div className="text-center max-w-[1240px] mx-auto">
                    <motion.div
                        custom={0}
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        <h1 className="text-[48px] sm:text-[68px] lg:text-[72px] font-light tracking-tighter text-white leading-[1.05] mb-2" style={{ letterSpacing: "-0.04em" }}>
                            Most brands chase attention.
                        </h1>
                        <h1 className="text-[48px] sm:text-[68px] lg:text-[72px] font-bold tracking-tighter text-white leading-[1.05]" style={{ letterSpacing: "-0.04em" }}>
                            We build credibility.
                        </h1>
                    </motion.div>

                    <motion.p
                        custom={2}
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="mt-8 max-w-[680px] mx-auto text-lg md:text-[19px] text-white/80 leading-[1.6] font-medium tracking-tight"
                    >
                        We partner with founders and businesses to transform ideas into
                        trusted, scalable brands through strategy, technology, products,
                        and intelligent growth as a long-term brand partner, not an agency.
                    </motion.p>

                    <motion.div
                        custom={3}
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="flex justify-center mt-12"
                    >
                        <Button className="text-white bg-gradient-to-r from-[#727987] to-[#1B6396] border border-white/20 hover:from-[#828997] hover:to-[#2B73A6] rounded-full px-12 py-7 text-lg font-medium transition-all duration-300 hover:translate-y-[-2px] shadow-[0_10px_40px_rgba(27,99,150,0.3)]">
                            Contact Us
                        </Button>
                    </motion.div>
                </div>
            </motion.div>

            {/* Absolute Bottom Quote */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="absolute bottom-12 left-0 w-full text-center z-10 pointer-events-none"
            >
                <p className={`text-[15px] italic text-white/30 tracking-wide ${playball.className}`}>"Belief is the strongest form of growth."</p>
            </motion.div>
        </section>
    );
}
