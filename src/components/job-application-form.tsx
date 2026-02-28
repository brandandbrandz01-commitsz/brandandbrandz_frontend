"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Raleway } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import Image from "next/image";

const raleway = Raleway({
    weight: ["400", "500", "600", "700", "800"],
    subsets: ["latin"],
});

interface JobApplicationFormProps {
    isOpen: boolean;
    onClose: () => void;
    jobTitle: string;
    jobType: string;
}

const timeSlots = [
    "11:30 AM", "12:30 PM",
    "1:30 PM", "4:30 PM",
    "5:30 PM", "6:30 PM"
];

export function JobApplicationForm({ isOpen, onClose, jobTitle, jobType }: JobApplicationFormProps) {
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            appliedPosition: jobTitle,
            earliestStartDate: "",
            coverLetter: "",
            experience: "",
            currentCompany: "",
            linkedinUrl: "",
        }
    });

    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [selectedTime, setSelectedTime] = useState<string>("");
    const [resume, setResume] = useState<File | null>(null);
    const [otherDocs, setOtherDocs] = useState<File | null>(null);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data: any) => {
        setIsSubmitting(true);
        try {
            const formData = new FormData();

            // Append all text fields
            Object.keys(data).forEach(key => {
                formData.append(key, data[key]);
            });

            // Append additional state
            formData.append('jobType', jobType);
            formData.append('selectedDate', selectedDate ? selectedDate.toISOString() : '');
            formData.append('selectedTime', selectedTime);

            // Append actual files
            if (resume) formData.append('resume', resume);
            if (otherDocs) formData.append('otherDocs', otherDocs);

            const response = await fetch("http://localhost:5000/api/apply", {
                method: "POST",
                body: formData, // Sending FormData instead of JSON
            });

            const result = await response.json();
            if (result.success) {
                alert("Application submitted successfully!");
                onClose();
            } else {
                alert("Something went wrong: " + result.error);
            }
        } catch (error) {
            console.error(error);
            alert("Failed to submit application.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto bg-black border-white/10 p-0 sm:rounded-[2rem] selection:bg-blue-500/30 dark">
                {/* Background inside Modal */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <Image
                        src="/morepage/job-details-bg.webp"
                        alt="Background"
                        fill
                        className="object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-black via-black/90 to-black" />
                </div>

                <div className="relative z-10 p-6 sm:p-12 space-y-12">
                    <DialogHeader className="text-center space-y-4">
                        <DialogTitle className={cn("text-4xl sm:text-5xl font-bold text-white", raleway.className)}>
                            Job Application Form
                        </DialogTitle>
                        <DialogDescription className="text-xl text-white/60 font-light">
                            Please Fill Out the Form Below to Submit Your Job Application!
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
                        {/* Name Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/80">Name <span className="text-red-500">*</span></label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <Input
                                            {...register("firstName", { required: true })}
                                            placeholder="First Name"
                                            className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-blue-500/50"
                                        />
                                        <p className="text-[10px] text-white/40 uppercase tracking-tighter">First Name</p>
                                    </div>
                                    <div className="space-y-1">
                                        <Input
                                            {...register("lastName", { required: true })}
                                            placeholder="Last Name"
                                            className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-blue-500/50"
                                        />
                                        <p className="text-[10px] text-white/40 uppercase tracking-tighter">Last Name</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/80">E-mail <span className="text-red-500">*</span></label>
                                <Input
                                    {...register("email", { required: true })}
                                    placeholder="ex: myname@example.com"
                                    type="email"
                                    className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-blue-500/50"
                                />
                                <p className="text-[10px] text-white/40 uppercase tracking-tighter">example@example.com</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/80">Phone Number <span className="text-red-500">*</span></label>
                                <Input
                                    {...register("phone", { required: true })}
                                    placeholder="(000) 000-0000"
                                    className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-blue-500/50"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/80">Applied Position</label>
                                <Input
                                    {...register("appliedPosition")}
                                    className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-blue-500/50"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/80">Earliest Possible Start Date</label>
                                <Input
                                    type="date"
                                    {...register("earliestStartDate")}
                                    className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-blue-500/50 appearance-none"
                                />
                                <p className="text-[10px] text-white/40 uppercase tracking-tighter">Date</p>
                            </div>

                            {/* Additional Fields for Senior BDM */}
                            {jobTitle === "Senior Business Development Manager" && (
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/80">Years of Experience <span className="text-red-500">*</span></label>
                                    <Input
                                        {...register("experience", { required: jobTitle === "Senior Business Development Manager" })}
                                        placeholder="ex: 5"
                                        type="number"
                                        className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-blue-500/50"
                                    />
                                </div>
                            )}
                        </div>

                        {jobTitle === "Senior Business Development Manager" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/80">Current / Previous Company</label>
                                    <Input
                                        {...register("currentCompany")}
                                        placeholder="Company Name"
                                        className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-blue-500/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/80">LinkedIn Profile URL</label>
                                    <Input
                                        {...register("linkedinUrl")}
                                        placeholder="https://linkedin.com/in/..."
                                        className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-blue-500/50"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Interview Selection Section */}
                        <div className="space-y-6 pt-4">
                            <label className="text-lg font-bold text-white">Preferred Interview Date</label>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex justify-center">
                                    <Calendar
                                        mode="single"
                                        selected={selectedDate}
                                        onSelect={setSelectedDate}
                                        className="bg-transparent text-white border-none"
                                    />
                                </div>
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <p className="text-xl text-white font-medium">
                                            {selectedDate ? format(selectedDate, "EEEE, MMMM dd") : "Select a date"}
                                        </p>
                                        <div className="flex gap-2">
                                            <Button variant="ghost" size="icon" className="text-white/50 hover:text-white"><ChevronLeft /></Button>
                                            <Button variant="ghost" size="icon" className="text-white/50 hover:text-white"><ChevronRight /></Button>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {timeSlots.map((time) => (
                                            <button
                                                key={time}
                                                type="button"
                                                onClick={() => setSelectedTime(time)}
                                                className={cn(
                                                    "py-3 px-4 rounded-xl border text-sm transition-all duration-300",
                                                    selectedTime === time
                                                        ? "bg-blue-600 border-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                                                        : "border-white/10 text-blue-400 hover:border-white/30"
                                                )}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-2 text-white/40 text-xs">
                                        <Clock className="w-4 h-4" />
                                        <span>Asia/Kolkata (07:50 PM)</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Cover Letter */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/80">Cover Letter</label>
                            <Textarea
                                {...register("coverLetter")}
                                className="bg-white/5 border-white/10 text-white min-h-[150px] rounded-2xl focus:ring-blue-500/50 p-4"
                            />
                            <p className="text-[10px] text-white/40 uppercase tracking-tighter">Please do not exceed 200 words.</p>
                        </div>

                        {/* File Uploads */}
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <label className="text-sm font-medium text-white/80">Upload Resume <span className="text-red-500">*</span></label>
                                <div
                                    className="border-2 border-dashed border-white/10 rounded-2xl p-8 text-center hover:border-blue-500/50 transition-colors cursor-pointer group relative"
                                    onClick={() => document.getElementById("resume-upload")?.click()}
                                >
                                    <input
                                        type="file"
                                        id="resume-upload"
                                        className="hidden"
                                        onChange={(e) => setResume(e.target.files?.[0] || null)}
                                    />
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                                            <Upload className="w-6 h-6 text-white/40 group-hover:text-blue-400" />
                                        </div>
                                        <p className="text-white font-medium">Upload a File</p>
                                        <p className="text-white/40 text-sm">Drag and drop files here</p>
                                    </div>
                                    {resume && (
                                        <div className="mt-4 text-blue-400 text-sm font-medium">{resume.name}</div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-sm font-medium text-white/80">Any Other Documents to Upload</label>
                                <div
                                    className="border-2 border-dashed border-white/10 rounded-2xl p-8 text-center hover:border-blue-500/50 transition-colors cursor-pointer group relative"
                                    onClick={() => document.getElementById("other-upload")?.click()}
                                >
                                    <input
                                        type="file"
                                        id="other-upload"
                                        className="hidden"
                                        onChange={(e) => setOtherDocs(e.target.files?.[0] || null)}
                                    />
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                                            <Upload className="w-6 h-6 text-white/40 group-hover:text-blue-400" />
                                        </div>
                                        <p className="text-white font-medium">Upload a File</p>
                                        <p className="text-white/40 text-sm">Drag and drop files here</p>
                                    </div>
                                    <p className="text-xs text-white/40">You can share certificates, Experience etc.</p>
                                    {otherDocs && (
                                        <div className="mt-4 text-blue-400 text-sm font-medium">{otherDocs.name}</div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-neutral-700 hover:bg-neutral-600 text-white rounded-xl py-8 text-xl font-medium shadow-lg transition-all disabled:opacity-50"
                            >
                                {isSubmitting ? "Applying..." : "Apply"}
                            </Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
