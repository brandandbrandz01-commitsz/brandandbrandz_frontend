"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";

export function AnimatedFooter() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const titleStyle = {
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.4s, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.4s",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        fontWeight: 400,
    };

    const textStyle = {
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.6s, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.6s",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        fontWeight: 400,
    };

    const quoteStyle = {
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.8s, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.8s",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        fontWeight: 400,
    };

    return (
        <div
            ref={ref}
            className="mt-20 py-24 px-8 text-center w-screen relative left-1/2 -translate-x-1/2 rounded-none"
            style={{
                background: "linear-gradient(135deg, #1e3a5f 0%, #2d5a7b 50%, #4a6b8a 100%)",
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.2s, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.2s",
            }}
        >
            <h2
                className="text-3xl sm:text-4xl lg:text-5xl text-white mb-6 leading-tight"
                style={titleStyle}
            >
                At Brand & Brandz, our services exist for one reason
            </h2>

            <p
                className="text-2xl sm:text-3xl lg:text-4xl text-white mb-8 leading-relaxed"
                style={textStyle}
            >
                To help businesses grow with{" "}
                <span
                    style={{
                        fontStyle: "italic",
                        fontFamily: "'Brush Script MT', cursive",
                    }}
                >
                    clarity, confidence and trust
                </span>
                .
            </p>

            <p
                className="text-base sm:text-lg text-white/80"
                style={quoteStyle}
            >
                "Execution creates movement. Direction creates meaning."
            </p>
        </div>
    );
}
