"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    businessEmail: z.string().email("Invalid email address").min(1, "Business Email is required"),
    companyName: z.string().min(1, "Company Name is required"),
    phoneNumber: z.string().optional(),
    message: z.string().min(1, "Message is required"),
});

type ContactFormValues = z.infer<typeof formSchema>;

export function ContactGrid() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

    const form = useForm<ContactFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            businessEmail: "",
            companyName: "",
            phoneNumber: "",
            message: "",
        },
    });

    const contactInfo = [
        {
            icon: MapPin,
            title: "Our Address",
            content: "1st Floor, Palmarcade, Horamavu Main Road, Kalkere, Bengaluru - 560043",
            href: "https://maps.google.com/?q=1st+Floor,Palmarcade,Horamavu+Main+Road,Kalkere,Bengaluru-560043"
        },
        {
            icon: Mail,
            title: "Email Us",
            content: "contact@brandandbrandz.com",
            href: "mailto:contact@brandandbrandz.com"
        },
        {
            icon: Phone,
            title: "Call Us",
            content: "+91 91588 57575",
            href: "tel:+919158857575"
        }
    ];

    const inputClasses = "w-full bg-[#0A0A0A] border border-[#333] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:shadow-[0_0_10px_rgba(59,130,246,0.3)] transition-all duration-300";

    const onSubmit = async (values: ContactFormValues) => {
        setIsSubmitting(true);
        setSubmitStatus(null);

        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        if (!backendUrl) {
            console.error("Backend URL is not defined. Please set NEXT_PUBLIC_BACKEND_URL.");
            setSubmitStatus("error");
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch(`${backendUrl}/api/contacts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                setSubmitStatus("success");
                form.reset(); // Reset form fields after successful submission
            } else {
                setSubmitStatus("error");
            }
        } catch (error) {
            console.error("Form submission error:", error);
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <section className="container mx-auto px-4 max-w-6xl py-12 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

                {/* Contact Info Cards (Left Column) */}
                <div className="lg:col-span-1 space-y-6">
                    {contactInfo.map((info, idx) => (
                        <motion.a
                            key={idx}
                            href={info.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2, duration: 0.5, ease: "easeOut" }}
                            className="block p-8 rounded-2xl bg-gradient-to-b from-[#1e3a5f]/40 to-[#0A0A0A] border border-white/5 hover:border-white/10 transition-colors group"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <info.icon className="w-5 h-5 text-white/80" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-white font-medium mb-2">{info.title}</h3>
                                <p className="text-white/60 text-sm leading-relaxed max-w-[200px]">
                                    {info.content}
                                </p>
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* Form Container (Right Column - Spans 2) */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="lg:col-span-2 bg-[#121212] border border-[#333] rounded-2xl p-8 lg:p-10"
                >
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-1">Get in Touch — Brand & Brandz</h2>
                    </div>

                    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-white/80 ml-1">First Name *</label>
                                <input
                                    type="text"
                                    placeholder="John"
                                    className={inputClasses}
                                    {...form.register("firstName")}
                                />
                                {form.formState.errors.firstName && (
                                    <p className="text-red-500 text-xs mt-1">{form.formState.errors.firstName.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-white/80 ml-1">Last Name *</label>
                                <input
                                    type="text"
                                    placeholder="Doe"
                                    className={inputClasses}
                                    {...form.register("lastName")}
                                />
                                {form.formState.errors.lastName && (
                                    <p className="text-red-500 text-xs mt-1">{form.formState.errors.lastName.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-white/80 ml-1">Business Email *</label>
                            <input
                                type="email"
                                placeholder="life@company.com"
                                className={inputClasses}
                                {...form.register("businessEmail")}
                            />
                            {form.formState.errors.businessEmail && (
                                <p className="text-red-500 text-xs mt-1">{form.formState.errors.businessEmail.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-white/80 ml-1">Company Name *</label>
                            <input
                                type="text"
                                placeholder="Your Company Name"
                                className={inputClasses}
                                {...form.register("companyName")}
                            />
                            {form.formState.errors.companyName && (
                                <p className="text-red-500 text-xs mt-1">{form.formState.errors.companyName.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-white/80 ml-1">Phone Number</label>
                            <input
                                type="tel"
                                placeholder="+91 123-456-7890"
                                className={inputClasses}
                                {...form.register("phoneNumber")}
                            />
                            {form.formState.errors.phoneNumber && (
                                <p className="text-red-500 text-xs mt-1">{form.formState.errors.phoneNumber.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-white/80 ml-1">How can we help? *</label>
                            <textarea
                                rows={4}
                                placeholder="Tell us about your IT challenges and objectives..."
                                className={inputClasses}
                                {...form.register("message")}
                            />
                            {form.formState.errors.message && (
                                <p className="text-red-500 text-xs mt-1">{form.formState.errors.message.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-4 mt-2 bg-gradient-to-r from-[#2d5a7b] to-[#4a6b8a] hover:from-[#3a6b8f] hover:to-[#5a7b9a] text-white font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-blue-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "Scheduling..." : "Schedule Meeting"}
                        </button>

                        {submitStatus === "success" && (
                            <p className="text-green-500 text-sm text-center">Thank you for your message! We will get back to you shortly.</p>
                        )}
                        {submitStatus === "error" && (
                            <p className="text-red-500 text-sm text-center">Something went wrong. Please try again later.</p>
                        )}
                    </form>
                </motion.div>

            </div>
        </section>
    );
}
