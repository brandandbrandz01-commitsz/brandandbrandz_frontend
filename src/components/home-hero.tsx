"use client";

import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Playball, Raleway } from "next/font/google";
import { PartnerScroll } from "./partner-scroll";

const playball = Playball({ subsets: ["latin"], weight: "400" });
const raleway = Raleway({ subsets: ["latin"], weight: ["400", "700"] });

export function HomeHero() {
    // Zoom/Scroll effects
    const { scrollY } = useScroll();
    const heroScale = useTransform(scrollY, [0, 500], [1, 0.9]);
    const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
    const heroY = useTransform(scrollY, [0, 500], [0, 100]);

    return (
        <section className={`sticky top-0 h-screen flex flex-col justify-center overflow-hidden z-0 ${raleway.className}`}>
            <motion.div
                style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
                className="w-full h-full flex flex-col justify-between mt-20 items-center relative"
            >
                {/* Interactive Text Layer */}
                <div
                    className="relative z-20 text-center px-4 sm:px-6 lg:px-8"
                >
                    <h1 className="text-4xl sm:text-5xl lg:text-5xl font-light tracking-tight text-white">
                        Most brands chase attention.
                    </h1>
                    <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold tracking-tight text-white mt-2">
                        We build credibility.
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-lg text-white/80">
                        We partner with founders and businesses to transform ideas into
                        trusted, scalable brands through strategy, technology, products,
                        and intelligent growth as a long-term brand partner, not an
                        agency.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 mt-8">
                        <Button className="text-white bg-neutral-800 hover:bg-neutral-600 rounded-full border-t-2 border-t-gray-500 px-8 transition-transform hover:scale-105 active:scale-95">
                            Book a Conversation
                        </Button>
                    </div>
                </div>

                {/* City Background Layer */}
                <motion.div
                    className="absolute inset-x-0 bottom-0 z-10 pointer-events-none flex flex-col items-center justify-end"
                >
                    <div className="relative w-full flex flex-col items-center">
                        <img src={"/hero-buildings.png"} alt="Buildings" className="w-full max-w-screen-2xl object-contain opacity-50" />
                        <div className="absolute bottom-32 w-full text-center">
                            <p className={"italic text-sm text-white/40 " + playball.className}>
                                "Belief is the strongest form of growth."
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Partner Scroll Layer */}
                <div className="relative z-30 w-full">
                    <PartnerScroll />
                </div>
            </motion.div>
        </section>
    );
}
