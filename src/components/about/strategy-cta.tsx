"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export function StrategyCTA() {
    const [email, setEmail] = useState("");

    const handleBookConversation = () => {
        // Handle booking logic here
        console.log("Book conversation with email:", email);
    };

    return (
        <section
            className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden min-h-[400px] border border-gray-800 text-white bg-gradient-to-r from-zinc-400 via-[#70879f] to-sky-700"
        >
            {/* Content */}
            <div className="container mx-auto max-w-4xl relative z-10 text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="inline-block mb-8"
                >
                    <span className="px-6 py-2.5 bg-white text-black rounded-full text-sm font-medium">
                        Get Started
                    </span>
                </motion.div>

                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight"
                >
                    Start with a strategy conversation.
                </motion.h2>

                {/* Subheading */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg sm:text-xl text-white/90 font-light mb-12 leading-relaxed"
                >
                    No pressure. No commitments. Just clarity on what to build next.
                </motion.p>

                {/* Email Input and Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto"
                >
                    {/* Email Input */}
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full sm:w-auto flex-1 px-6 py-3.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all duration-300"
                    />

                    {/* Book Button */}
                    <button
                        onClick={handleBookConversation}
                        className="w-full sm:w-auto px-8 py-3.5 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                        Book a Conversation
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
