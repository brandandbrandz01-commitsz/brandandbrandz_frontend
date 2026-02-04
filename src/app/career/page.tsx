"use client";

import { HowItWorks } from "@/components/about/how-it-works";
import { StrategyCTA } from "@/components/about/strategy-cta";
import { Navbar } from "@/components/navbar";
import Link from "next/link";
import { OPEN_POSITIONS } from "./data";


export default function CareerPageContent() {
    const GRID_ITEMS = [
        {
            title: "Clear Growth & Mentorship",
            description:
                "Structured learning, mentorship, and defined growth paths to help you advance with confidence.",
            src: "/careerpage/1.png",
            className: "lg:col-span-4 aspect-square bg-[url(/careerpage/1.png)]",
            imgClassName: "",
        },
        {
            title: "Meaningful, High-Impact Work",
            description:
                "Work on thoughtful projects that create real value for brands and systems.",
            src: "/careerpage/2.png",
            className: "lg:col-span-4 aspect-square bg-[url(/careerpage/2.png)]",
        },
        {
            title: "Creative & Flexible Environment",
            description:
                "A culture that supports focus, creativity and healthy work balance.",
            src: "/careerpage/3.png",
            className: "lg:col-span-4 aspect-square bg-[url(/careerpage/3.png)]",
        },
        {
            title: "Collaborative Team Culture",
            description:
                "A diverse, respectful team where ideas are heard and collaboration matters.",
            src: "/careerpage/4.png",
            className: "lg:col-span-5 aspect-[4/3] bg-[url(/careerpage/4.png)]",
        },
        {
            title: "",
            description: "",
            src: "/careerpage/5.png",
            className:
                "lg:col-span-7 aspect-auto lg:aspect-auto bg-[url(/careerpage/5.png)]",
        },
    ];

    return (
        <div className='bg-black text-white bg-[radial-gradient(ellipse_120%_40%_at_50%_0%,#9aa7b4_0%,rgba(0,0,0,0)_45%)]'>
            <Navbar />
            {/* HERO SECTION */}
            <section className='relative min-h-[80vh] flex items-center justify-center text-center px-6'>
                <div className='max-w-4xl'>
                    <p className='text-2xl tracking-wide text-white/70 mb-4'>
                        Unlock your success
                    </p>

                    <h1 className='text-4xl md:text-6xl font-light leading-tight mb-6'>
                        Make an Impact in Your <br /> Career!
                    </h1>

                    <p className='text-white/70 max-w-3xl mx-auto mb-8'>
                        Join passionate professionals dedicated to growth and community
                        impact. Here, your career drives meaningful change, shapes a
                        sustainable future and redefines possibilities.
                    </p>

                    <button className='px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-gray-200 transition'>
                        View Open Roles
                    </button>
                </div>
            </section>

            {/* WHY JOIN US */}
            <section className='py-28 px-6 text-center'>
                <h2 className='text-3xl md:text-4xl font-light mb-6'>Why Join Us</h2>

                <p className='text-white/70 max-w-2xl mx-auto mb-20'>
                    Experience a workplace that values your creativity, growth and impact.
                    <br />
                    At BrandandBrandz, we create an environment where ideas thrive,
                    careers grow, and work makes real impact.
                </p>

                {/* IMAGE GRID */}
                <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8'>
                    {GRID_ITEMS.map((item, i) => (
                        <div
                            key={i}
                            className={`group relative rounded-4xl overflow-hidden border border-white/20 bg-[#111] transition-transform bg-no-repeat duration-500 hover:scale-[1.02] ${item.className} bg-cover bg-center text-left`}
                        >
                            {item.title && (
                                <div className='p-6 flex flex-col justify-start'>
                                    <h3 className='text-2xl font-semibold mb-2 text-white w-3/4'>
                                        {item.title}
                                    </h3>
                                    {item.description && (
                                        <p className='text-md text-white leading-relaxed'>
                                            {item.description}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* OPEN POSITIONS */}
            <section className='py-20 px-6'>
                <div className='max-w-6xl mx-auto'>
                    <div className='text-center mb-16'>
                        <h3 className='text-2xl font-medium mb-4 text-white'>
                            Open Positions
                        </h3>
                        <h2 className='text-4xl md:text-6xl font-light text-white/90 leading-tight'>
                            Become part of the <br /> dream-team
                        </h2>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                        {OPEN_POSITIONS.map((job, i) => (
                            <Link
                                href={`/career/${job.id}`}
                                key={i}
                                className='group relative p-8 rounded-4xl border border-white/10 bg-[#0c0c0c] hover:bg-[#111] transition-colors duration-300 block'
                            >
                                {/* Tags */}
                                <div className='flex gap-3 mb-6'>
                                    <span className='px-6 py-2 rounded-full border border-white/10 text-xs md:text-sm text-gray-300'>
                                        {job.type}
                                    </span>
                                    <span className='px-6 py-2 rounded-full border border-white/10 text-xs md:text-sm text-gray-300'>
                                        {job.location}
                                    </span>
                                </div>

                                {/* Content */}
                                <h3 className='text-2xl font-semibold text-white mb-4'>
                                    {job.title}
                                </h3>
                                <p className='text-white/60 mb-8 leading-relaxed'>
                                    {job.description}
                                </p>

                                {/* Button */}
                                <button className='px-8 py-3 rounded-full bg-white/10 text-white text-sm font-medium hover:bg-white hover:text-black transition-all'>
                                    Read More
                                </button>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
            <HowItWorks />
            <StrategyCTA />
        </div>
    );
}
