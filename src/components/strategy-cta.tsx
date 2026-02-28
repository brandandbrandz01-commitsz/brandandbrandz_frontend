"use client";

import { Raleway } from "next/font/google";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const raleway = Raleway({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
});

export function StrategyCTA() {
    return (
        <section className={`py-24 px-4 sm:px-6 lg:px-8 relative z-20 ${raleway.className} overflow-hidden`}>
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-400 via-[#70879f] to-sky-700 z-0" />

            {/* Content Container */}
            <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center text-center space-y-8">

                {/* Top Pill */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="bg-white text-black px-6 py-2 rounded-full text-sm font-semibold tracking-wide">
                        Get Started
                    </span>
                </motion.div>

                {/* Headline */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight"
                >
                    Start with a strategy conversation.
                </motion.h2>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg sm:text-xl text-white/90 font-light"
                >
                    No pressure. No commitments. Just clarity on what to build next.
                </motion.p>

                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-lg mx-auto pt-4"
                >
                    <div className="relative w-full">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-full px-6 py-4 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all text-base"
                        />
                    </div>
                    <Button className="w-full sm:w-auto bg-white text-black hover:bg-white/90 rounded-full px-8 py-6 text-base font-semibold whitespace-nowrap">
                        Book a Conversation
                    </Button>
                </motion.div>

            </div>
        </section>
    );
}
