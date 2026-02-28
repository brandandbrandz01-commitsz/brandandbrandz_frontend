"use client";

import { Raleway } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, Building2, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { JobApplicationForm } from "@/components/job-application-form";

const raleway = Raleway({
    weight: ["400", "500", "600", "700", "800"],
    subsets: ["latin"],
});

export default function JobDetailsClient({ job }: { job: any }) {
    const router = useRouter();
    const [isFormOpen, setIsFormOpen] = useState(false);

    if (!job) {
        return <div className="min-h-screen bg-black text-white flex items-center justify-center">Job not found</div>;
    }

    return (
        <div className={`min-h-screen relative text-white ${raleway.className} overflow-x-hidden`}>
            {/* Background Image */}
            <div className="fixed inset-0 z-0">
                <Image
                    src="/morepage/job-details-bg.webp"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Gradient Overlay to match design (Blue top-left glow + Darkening) */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-black/80" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-transparent mix-blend-overlay" />
            </div>

            {/* Back Button */}
            <div className="absolute top-8 left-4 sm:left-8 z-50">
                <button
                    onClick={() => router.back()}
                    className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 group"
                >
                    <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                </button>
            </div>

            <main className="relative z-10 pt-24 px-4 sm:px-6 lg:px-8 pb-20">
                <div className="max-w-4xl mx-auto space-y-12">

                    {/* Header Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                            {job.title}
                        </h1>

                        <div className="flex flex-wrap gap-6 text-gray-300 text-base sm:text-lg">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5" />
                                <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Briefcase className="w-5 h-5" />
                                <span>{job.type}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Building2 className="w-5 h-5" />
                                <span>{job.salary}</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Job Description Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="space-y-6"
                    >
                        <span className="inline-block bg-white text-black px-6 py-2 rounded-full text-sm font-semibold tracking-wide">
                            Job Description
                        </span>
                        <p className="text-lg text-blue-100/90 leading-relaxed font-light">
                            {job.description}
                        </p>
                    </motion.div>

                    {/* Who We're Looking For Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <span className="inline-block bg-white text-black px-6 py-2 rounded-full text-sm font-semibold tracking-wide">
                            Who We're Looking For
                        </span>
                        <ul className="space-y-3 text-lg text-gray-200 font-light list-disc pl-5 marker:text-gray-400">
                            {job.lookingFor.map((item: string, index: number) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Responsibilities Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="space-y-6"
                    >
                        <span className="inline-block bg-white text-black px-6 py-2 rounded-full text-sm font-semibold tracking-wide">
                            Your Responsibilities
                        </span>
                        <ul className="space-y-3 text-lg text-gray-200 font-light list-disc pl-5 marker:text-gray-400">
                            {job.responsibilities.map((item: string, index: number) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Apply Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="pt-8"
                    >
                        <Button
                            onClick={() => setIsFormOpen(true)}
                            className="w-full sm:w-auto min-w-[200px] bg-gradient-to-r from-blue-600 to-sky-400 text-white rounded-full py-6 text-lg font-semibold shadow-lg shadow-blue-500/20 transition-all duration-300 transform hover:scale-105 active:scale-95 hover:from-blue-600 hover:to-sky-400"
                        >
                            Apply Now
                        </Button>
                    </motion.div>

                </div>
            </main>

            <JobApplicationForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                jobTitle={job.title}
                jobType={job.tags?.[0] || job.type} // Fallback to job.type if tags is missing
            />
        </div>
    );
}
