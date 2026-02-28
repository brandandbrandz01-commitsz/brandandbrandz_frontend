"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Linkedin, Globe, MessageCircle, Phone, Mail } from "lucide-react";

export function SiteFooter() {
    const socialIcons = [
        { icon: Linkedin, href: "#" },
        { icon: Globe, href: "#" }, // Google
        { icon: MessageCircle, href: "#" }, // WhatsApp
        { icon: Phone, href: "tel:+919158857575" },
        { icon: Mail, href: "mailto:contact@brandandbrandz.com" },
    ];

    const homeLinks = [
        { label: "About", href: "/about" },
        { label: "Our Services", href: "/services" },
        { label: "Products", href: "/products" },
        { label: "More", href: "#" },
    ];

    const supportLinks = [
        { label: "FAQ", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Support", href: "#" },
        { label: "Contact Us", href: "/contact" },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <footer className="relative w-full bg-linear-to-b from-[#0A0A0A] to-[#1A1A1A] text-white py-16 lg:py-12 overflow-hidden border-t border-white/5">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 items-start"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {/* Column 1: Logo & Socials (Spans 2 on Tablet, 1 on Desktop?) 
                        Design says: "Logo & Socials (Left)". 
                        I'll make it span 2 cols on lg if needed but layout is 3-col.
                        Let's do: Col 1 (Logo/Social), Col 2 (Home), Col 3 (Support).
                        Actually grid-cols-4 allows spacing: Logo (2 cols), Home (1), Support (1).
                    */}
                    <div className="lg:col-span-2 flex flex-col justify-center items-center lg:items-start text-center lg:text-left space-y-4">
                        {/* Logo with Antigravity Float */}
                        <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="relative w-48 h-auto flex justify-center items-center"
                        >
                            <Link href={"/"}>
                                <Image
                                    src="/logo.png"
                                    alt="Brand & Brandz"
                                    width={150}
                                    height={80}
                                    className="object-contain"
                                />
                            </Link>

                        </motion.div>

                        {/* Social Icons Bar */}
                        <div className="px-6 py-3 flex items-center space-x-6">
                            {socialIcons.map((item, idx) => (
                                <motion.a
                                    key={idx}
                                    href={item.href}
                                    className="text-white/70 hover:text-white transition-colors"
                                    whileHover={{ scale: 1.2, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <item.icon className="w-5 h-5" strokeWidth={1.5} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Home Links */}
                    <motion.div className="flex flex-col items-center lg:items-start space-y-6" variants={itemVariants}>
                        <h3 className="text-lg font-medium text-white">Home</h3>
                        <ul className="space-y-4 text-center lg:text-left">
                            {homeLinks.map((link, idx) => (
                                <li key={idx}>
                                    <Link
                                        href={link.href}
                                        className="text-white/60 hover:text-white transition-colors relative group"
                                    >
                                        <span className="relative z-10">{link.label}</span>
                                        <span className="absolute left-0 bottom-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Column 3: Support Links */}
                    <motion.div className="flex flex-col items-center lg:items-start space-y-6" variants={itemVariants}>
                        <h3 className="text-lg font-medium text-white">Support</h3>
                        <ul className="space-y-4 text-center lg:text-left">
                            {supportLinks.map((link, idx) => (
                                <li key={idx}>
                                    <Link
                                        href={link.href}
                                        className="text-white/60 hover:text-white transition-colors relative group"
                                    >
                                        <span className="relative z-10">{link.label}</span>
                                        <span className="absolute left-0 bottom-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </motion.div>

                {/* Copyright Section */}
                <motion.div
                    className="mt-12 pt-8 border-t border-white/5 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                >
                    <p className="text-white/40 text-sm">
                        Copyright © {new Date().getFullYear()} Brandandbrandz
                    </p>
                </motion.div>
            </div>
        </footer>
    );
}
