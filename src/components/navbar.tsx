"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Info, Briefcase, Package, GraduationCap, Mail, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "About", href: "/about", icon: Info },
    { name: "Our Services", href: "/services", icon: Briefcase },
    { name: "Products", href: "/products", icon: Package },
    { name: "Career", href: "/more", icon: GraduationCap },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024);
            if (window.innerWidth >= 1024) setIsOpen(false);
        };
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    if (!mounted) {
        return <div className="h-24" />;
    }

    const pillContainerVariants = {
        closed: {
            opacity: 0,
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1,
            },
        },
        open: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
            },
        },
    };

    const pillItemVariants = {
        closed: { opacity: 0, y: 20, x: 20 },
        open: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: {
                type: "spring" as any,
                stiffness: 300,
                damping: 24
            }
        },
    };

    return (
        <>
            {/* Background Dimming Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    />
                )}
            </AnimatePresence>

            <motion.header
                initial={false}
                animate={{
                    width: "100%",
                    top: "0px",
                    background: scrolled 
                        ? "rgba(0, 0, 0, 0.5)" 
                        : "transparent",
                    backdropFilter: "blur(12px)",
                    borderBottom: scrolled ? "1px solid rgba(255, 255, 255, 0.05)" : "none",
                    padding: isDesktop ? "0px 80px" : "8px 24px",
                }}
                className="fixed left-1/2 -translate-x-1/2 z-[110] transition-all duration-300"
            >
                <nav className={`mx-auto flex items-center justify-between w-full ${isDesktop ? 'h-28' : 'h-16'}`}>
                    {/* Logo (Left) */}
                    <Link href="/" onClick={() => setIsOpen(false)} className="relative z-[120] flex-shrink-0">
                        <Image src="/logo.png" width={110} height={110} alt="logo" className={`cursor-pointer w-auto ${isDesktop ? 'h-18' : 'h-12'}`} />
                    </Link>

                    {/* Desktop Links (Center-Right) */}
                    <div className="hidden lg:flex items-center gap-12">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-[17px] tracking-tight transition-all hover:text-white ${link.name === 'Home' ? 'font-bold text-white' : 'font-medium text-white/80'}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link href="/contact">
                            <Button variant="default" className="text-black bg-white hover:bg-gray-100 rounded-full px-8 py-6 text-sm font-bold shadow-xl transition-all hover:scale-105 active:scale-95">
                                Contact us
                            </Button>
                        </Link>
                    </div>
                </nav>
            </motion.header>

            {/* Mobile Floating Trigger & Pill Stack (Bottom Right) */}
            <div className="lg:hidden fixed bottom-8 right-6 sm:right-10 z-[120] flex flex-col items-end">
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={pillContainerVariants}
                            className="flex flex-col items-end gap-3 mb-6"
                        >
                            {navLinks.map((link) => (
                                <motion.div key={link.name} variants={pillItemVariants} className="w-fit">
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="bg-[#121212]/95 backdrop-blur-xl border border-white/10 rounded-full pl-6 pr-4 py-3 flex items-center justify-end gap-5 text-white active:scale-95 shadow-2xl group transition-all"
                                    >
                                        <span className="text-[17px] font-medium tracking-tight text-white/90">{link.name}</span>
                                        <div className="bg-white/5 p-2 rounded-full border border-white/5 group-hover:bg-white/10 transition-colors">
                                            <link.icon className="w-5 h-5 text-white/70" strokeWidth={1.5} />
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div variants={pillItemVariants} className="w-fit">
                                <Link href="/contact" onClick={() => setIsOpen(false)}>
                                    <div className="bg-white rounded-full pl-6 pr-4 py-3 flex items-center justify-end gap-5 text-black active:scale-95 shadow-2xl group transition-all">
                                        <span className="text-[17px] font-bold tracking-tight">Contact</span>
                                        <div className="bg-black/5 p-2 rounded-full border border-black/5 group-hover:bg-black/10 transition-colors">
                                            <Mail className="w-5 h-5 text-black/80" strokeWidth={2} />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Floating Button */}
                <button
                    className="w-16 h-16 bg-[#121212] border border-white/10 text-white rounded-full flex items-center justify-center shadow-2xl active:scale-90 transition-transform"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Menu"
                >
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="flex items-center justify-center"
                    >
                        {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                    </motion.div>
                </button>
            </div>

            {/* Removed spacer to allow hero to float behind */}
        </>
    );
}
