"use client";

import { motion } from "framer-motion";
import { Raleway } from "next/font/google";

const raleway = Raleway({ subsets: ["latin"], weight: ["400", "700"] });

export function ContactHero() {
    return (
        <section className={`relative pt-32 pb-12 px-4 text-center ${raleway.className}`}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto"
            >
                <div className="inline-block px-6 py-2 mb-8 border border-white/20 rounded-full bg-white/10 backdrop-blur-md">
                    <span className="text-[40px] font-normal text-white tracking-wide">Contact us</span>
                </div>

                <h1
                    className="text-5xl sm:text-6xl lg:text-[76px] font-normal text-white mb-8 leading-tight"
                >
                    Reach out to our support
                    <br />
                    team for help
                </h1>

                <p className="text-[24px] text-white/70 max-w-2xl mx-auto leading-relaxed font-normal">
                    Whether you have a question, need technical assistance, or just want some guidance, our support team is here to help. We're available around the clock to provide quick and friendly support.
                </p>
            </motion.div>
        </section>
    );
}
