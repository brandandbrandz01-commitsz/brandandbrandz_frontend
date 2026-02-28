
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Raleway } from "next/font/google";
import { EngagementCovers } from "@/components/about/engagement-covers";
import { Timeline } from "@/components/about/timeline";
import { ProcessExperience } from "@/components/about/process-experience";
import { WhatWeHelp } from "@/components/about/what-we-help";
import { HowItWorks } from "@/components/about/how-it-works";
import { StrategyCTA } from "@/components/about/strategy-cta";
import { Navbar } from "@/components/navbar";

const raleway = Raleway({ weight: ["400", "500", "600", "700", "900"], subsets: ["latin"] });

export default function About() {
    return (
        <div
            className={
                "bg-black text-white min-h-screen bg-[radial-gradient(ellipse_150%_20%_at_50%_0%,#adbac9_0%,rgba(0,0,0,0)_45%)] relative pt-6 " +
                raleway.className
            }
        >
            <Navbar />

            <main className="flex flex-col w-full">
                <section className="flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-6 lg:px-8 text-center pt-8">
                    <div className="max-w-4xl mx-auto space-y-6 relative z-10">
                        <h1 className="text-4xl sm:text-6xl lg:text-[76px] font-normal text-white leading-tight">
                            We believe strong brands are <br />
                            built on <span className="font-bold">clarity</span> and <span className="font-bold">trust</span>.
                        </h1>

                        <p className="max-w-4xl mx-auto text-[24px] text-gray-300 font-normal leading-relaxed">
                            Brand & Brandz helps founders and businesses turn ideas into trusted brands and
                            systems with clarity before growth.
                        </p>


                    </div>
                </section>

                <EngagementCovers />
                <ProcessExperience />
                <WhatWeHelp />
                <HowItWorks />
                <Timeline />
                <StrategyCTA />
            </main>

            {/* Decorative gradient overlay/shadow if needed to match the 'darkness' at the bottom of the image */}
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent pointer-events-none" />
        </div>
    );
}
