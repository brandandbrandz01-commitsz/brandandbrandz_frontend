"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Playball, Raleway } from "next/font/google";
import { PartnerScroll } from "./partner-scroll";

const playball = Playball({ subsets: ["latin"], weight: "400" });
const raleway = Raleway({ subsets: ["latin"], weight: ["400", "700"] });

export function HomeHero() {
    // Zoom/Scroll effects
    const { scrollY } = useScroll();
    const heroScale = useTransform(scrollY, [0, 500], [1, 0.9]);
    const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.8]);
    const heroY = useTransform(scrollY, [0, 500], [0, 50]);

    const fadeInUp = {
        hidden: { opacity: 0, y: 15 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.8,
                ease: [0.215, 0.61, 0.355, 1] as any,
            },
        }),
    };

    return (
        <section className={`relative min-h-[90vh] md:h-screen flex flex-col justify-center overflow-hidden z-0 ${raleway.className}`}>
            <motion.div
                style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
                className="w-full h-full flex flex-col justify-between pt-12 md:pt-20 items-center relative"
            >
                {/* Interactive Text Layer */}
                <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                    <motion.h1
                        custom={0}
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white"
                    >
                        Most brands chase attention.
                    </motion.h1>
                    <motion.h1
                        custom={1}
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mt-2"
                    >
                        We build credibility.
                    </motion.h1>
                    <motion.p
                        custom={2}
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="mt-6 max-w-2xl mx-auto text-lg text-white/80"
                    >
                        We partner with founders and businesses to transform ideas into
                        trusted, scalable brands through strategy, technology, products,
                        and intelligent growth as a long-term brand partner, not an
                        agency.
                    </motion.p>
                    <motion.div
                        custom={3}
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="flex flex-wrap justify-center gap-4 mt-10"
                    >
                        <Button className="text-white bg-neutral-800 hover:bg-neutral-600 rounded-full border-t-2 border-t-gray-500 px-10 py-6 text-lg transition-transform hover:scale-105 active:scale-95">
                            Book a Conversation
                        </Button>
                    </motion.div>

                    {/* Partner Scroll Layer - Mobile/Tablet specific position */}
                    <motion.div
                        custom={4}
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="mt-16 md:hidden w-screen -mx-4 sm:-mx-6"
                    >
                        <PartnerScroll />
                    </motion.div>
                </div>

                {/* City Background Layer */}
                <motion.div
                    className="absolute inset-x-0 bottom-0 z-10 pointer-events-none flex flex-col items-center justify-end"
                >
                    <div className="relative w-full flex flex-col items-center">
                        <img src={"/hero-buildings.png"} alt="Buildings" className="w-full max-w-screen-2xl object-contain opacity-30 md:opacity-50" />
                        <div className="absolute bottom-32 w-full text-center hidden md:block">
                            <p className={"italic text-sm text-white/40 " + playball.className}>
                                "Belief is the strongest form of growth."
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Partner Scroll Layer - Desktop position */}
                <div className="relative z-30 w-full hidden md:block">
                    <PartnerScroll />
                </div>
            </motion.div>
        </section>
    );
}
