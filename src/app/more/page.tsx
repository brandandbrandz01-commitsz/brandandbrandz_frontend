'use client';

import { Raleway } from "next/font/google";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { WhyJoinUs } from "@/components/why-join-us";
import { OpenPositions } from "@/components/open-positions";
import { StrategyCTA } from "@/components/strategy-cta";

const raleway = Raleway({ weight: ["400", "500", "600", "700", "900"], subsets: ["latin"] });

export default function More() {
    return (
        <div
            className={
                "bg-black text-white min-h-screen relative pt-6 " +
                raleway.className
            }
        >
            <div className="fixed inset-0 z-0 opacity-80">
                <Image
                    src="/morepage/herobg.webp"
                    alt="Background"
                    fill
                    priority
                    className="object-cover"
                />
            </div>
            <div className="relative z-10">
                <Navbar />
            </div>

            <main className="flex flex-col w-full relative z-10">
                <section className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 text-center pt-8">
                    <div className="max-w-4xl mx-auto space-y-8 relative z-10">
                        {/* Animated Content Wrapper */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="space-y-4"
                        >
                            <h2 className="text-2xl sm:text-3xl font-light text-gray-300">
                                Unlock your success
                            </h2>
                            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
                                Make an Impact in Your <br />
                                Career!
                            </h1>
                        </motion.div>

                        {/* Description with delay */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-400 font-light leading-relaxed"
                        >
                            Join passionate professionals dedicated to growth and community impact. Here,
                            your career drives meaningful change, shapes a sustainable future and redefines
                            possibilities.
                        </motion.p>
                    </div>
                </section>

                {/* View Open Roles Button Section */}
                <div className="flex justify-center pb-8 relative z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <Button className="bg-white text-black hover:bg-gray-200 rounded-full px-8 py-6 text-lg font-medium transition-all duration-300 transform hover:scale-105">
                            View Open Roles
                        </Button>
                    </motion.div>
                </div>

                {/* Why Join Us Section */}
                <WhyJoinUs />

                {/* Open Positions Section */}
                <OpenPositions />

                {/* Strategy CTA Section */}
                <StrategyCTA />
            </main>

            {/* Decorative gradient overlay at the bottom */}
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent pointer-events-none" />
        </div>
    );
}
