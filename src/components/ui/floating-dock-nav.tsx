"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { House, Briefcase, Package, Menu, X, Mail, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Home", icon: House, href: "/" },
    { name: "About", icon: Info, href: "/about" },
    { name: "Services", icon: Briefcase, href: "/services" },
    { name: "Products", icon: Package, href: "/products" },
    { name: "Contact", icon: Mail, href: "/contact" },
];

export function FloatingDockNav() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.1,
            },
        },
        exit: {
            opacity: 0,
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0, scale: 0.8 },
        show: { y: 0, opacity: 1, scale: 1 },
        exit: { y: 20, opacity: 0, scale: 0.8 },
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 md:hidden">
            {/* Menu Items */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        className="flex flex-col items-end gap-3 mb-2"
                    >
                        {navItems.map((item) => (
                            <motion.div
                                key={item.name}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="group flex items-center gap-3 px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg hover:bg-white/20 transition-colors"
                                >
                                    <span className="text-sm font-medium text-white px-2">
                                        {item.name}
                                    </span>
                                    <item.icon className="w-5 h-5 text-white" />
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                onClick={toggleMenu}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                    "flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300",
                    "bg-white/10 backdrop-blur-xl border border-white/20 text-white",
                    isOpen ? "bg-white/20 rotate-90" : "bg-black/60"
                )}
                aria-label="Toggle Menu"
            >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
        </div>
    );
}
