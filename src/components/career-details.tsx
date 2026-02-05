"use client";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Briefcase, Landmark } from "lucide-react";
import Link from "next/link";
import { type OPEN_POSITIONS } from "@/app/career/data";

export function CareerDetails({ jobData }: { jobData: typeof OPEN_POSITIONS[0] }) {

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1] as const,
            },
        },
    };

    return (

        <div className='min-h-screen relative overflow-hidden bg-black text-white'>
            {/* Background Gradient similar to design */}
            <div className='absolute top-0 left-0 w-[60%] h-[60%] bg-[#007AFF] opacity-20 blur-[150px] pointer-events-none rounded-full -translate-x-1/2 -translate-y-1/2' />

            <motion.div
                className='relative z-10 container mx-auto px-6 py-16 max-w-4xl'
                variants={containerVariants}
                initial='hidden'
                animate='visible'
            >
                <motion.div variants={itemVariants}>
                    <Link
                        href='/career'
                        className='inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-12'
                    >
                        <ArrowLeft className='w-5 h-5' />
                        <span className='text-sm font-medium'>Back to Careers</span>
                    </Link>
                </motion.div>

                {/* Header Section */}
                <motion.h1
                    layoutId={`job-title-${jobData.id}`}
                    className='text-3xl md:text-5xl font-bold text-white mb-8'
                    variants={itemVariants}
                >
                    {jobData.title}
                </motion.h1>

                {/* Info Row */}
                <motion.div
                    variants={itemVariants}
                    className='flex flex-wrap gap-6 md:gap-12 mb-16 text-white/80'
                >
                    <div className='flex items-center gap-3'>
                        <MapPin className='w-5 h-5 text-white/60' />
                        <span>{jobData.location}</span>
                    </div>
                    <div className='flex items-center gap-3'>
                        <Briefcase className='w-5 h-5 text-white/60' />
                        <span>{jobData.type}</span>
                    </div>
                    <div className='flex items-center gap-3'>
                        <Landmark className='w-5 h-5 text-white/60' />
                        <span>{jobData.salary}</span>
                    </div>
                </motion.div>

                {/* Job Description */}
                <motion.div variants={itemVariants} className='mb-12'>
                    <div className='inline-block px-6 py-2 bg-white rounded-full mb-6'>
                        <span className='text-black font-medium text-sm'>
                            Job Description
                        </span>
                    </div>
                    <p className='text-lg text-white/80 leading-relaxed max-w-3xl'>
                        {jobData.description}
                    </p>
                </motion.div>

                {/* Who We're Looking For */}
                <motion.div variants={itemVariants} className='mb-12'>
                    <div className='inline-block px-6 py-2 bg-white rounded-full mb-6'>
                        <span className='text-black font-medium text-sm'>
                            Who We're Looking For
                        </span>
                    </div>
                    <ul className='space-y-4 text-white/80 leading-relaxed list-disc list-outside pl-5 max-w-3xl'>
                        {jobData.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                        ))}
                    </ul>
                </motion.div>

                {/* Your Responsibilities */}
                <motion.div variants={itemVariants} className='mb-16'>
                    <div className='inline-block px-6 py-2 bg-white rounded-full mb-6'>
                        <span className='text-black font-medium text-sm'>
                            Your Responsibilities
                        </span>
                    </div>
                    <ul className='space-y-4 text-white/80 leading-relaxed list-disc list-outside pl-5 max-w-3xl'>
                        {jobData.responsibilities.map((resp, index) => (
                            <li key={index}>{resp}</li>
                        ))}
                    </ul>
                </motion.div>

                {/* Apply Button */}
                <motion.div
                    variants={itemVariants}
                    className='flex justify-center md:justify-start'
                >
                    <button className='w-full md:w-auto px-12 py-4 bg-gradient-to-r from-[#005bb5] to-[#6daae3] hover:from-[#004a94] hover:to-[#5c9cd6] text-white font-medium rounded-full transition-all shadow-[0_0_20px_rgba(0,122,255,0.3)]'>
                        Apply Now
                    </button>
                </motion.div>
            </motion.div>
        </div>
    )
}