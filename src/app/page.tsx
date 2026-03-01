'use client'

import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Raleway } from "next/font/google";
import { Navbar } from '@/components/navbar';
import { HomeHero } from '@/components/home-hero';
import { HowWeWork } from '@/components/how-we-work';
import { TechStack } from '@/components/tech-stack';
import { BrandGrowthSystems } from '@/components/brand-growth-systems';
import { RefinedBrandSection } from '@/components/refined-brand-section';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const raleway = Raleway({ weight: ["400", "500", "600", "700", "900"], subsets: ["latin"] });

function PlatformCard({ title, subtitle, href }: { title: string, subtitle: string | React.ReactNode, href: string }) {
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, {
    amount: 0.6,
    margin: "-10% 0px -10% 0px"
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isActive = isMobile ? isInView : false;

  return (
    <Link href={href} className="block group h-full">
      <div ref={cardRef} className="h-full">
        <motion.div
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black h-full"
          whileHover={!isMobile ? { scale: 1.02 } : {}}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Background Gradient Layer */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-zinc-400 via-[#70879f] to-sky-700 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{
              opacity: isActive ? 1 : 0
            }}
            style={{
              transition: "opacity 0.5s ease"
            }}
          />

          {/* Fallback Hover for Desktop */}
          {!isMobile && (
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-400 via-[#70879f] to-sky-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          )}

          <CardContent className="relative z-10 p-8 flex flex-col justify-between h-full text-left min-h-[220px]">
            <div>
              <h3 className="font-medium text-3xl mb-2 text-white">{title}</h3>
              <p className="text-lg text-white/70 group-hover:text-white transition-colors">{subtitle}</p>
            </div>

            <motion.div
              className="mt-8 flex items-center gap-2"
              initial={isMobile ? { opacity: 0, y: 16 } : {}}
              animate={isMobile ? (isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }) : {}}
            >
              <div className={`flex items-center gap-2 ${!isMobile ? 'opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500' : ''}`}>
                <span className="text-sm font-semibold uppercase tracking-wider text-white">Learn More</span>
                <ArrowUpRight className="w-5 h-5 text-white" />
              </div>
            </motion.div>
          </CardContent>
        </motion.div>
      </div>
    </Link>
  );
}


export default function App() {
  const [showVideo, setShowVideo] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const hasPlayedVideo = sessionStorage.getItem('brandIntroPlayed');

    if (!hasPlayedVideo) {
      setShowVideo(true);
    }
  }, []);

  useEffect(() => {
    if (videoRef.current && showVideo) {
      videoRef.current.play().catch(err => {
        console.log("Auto-play prevented:", err);
      });
    }
  }, [showVideo]);

  const handleVideoEnd = () => {
    setVideoEnded(true);
    sessionStorage.setItem('brandIntroPlayed', 'true');
    setTimeout(() => {
      setShowVideo(false);
    }, 500);
  };

  const skipVideo = () => {
    sessionStorage.setItem('brandIntroPlayed', 'true');
    setShowVideo(false);
  };

  if (showVideo) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="relative w-full h-full flex items-center justify-center">
          <video
            ref={videoRef}
            className={`w-full h-full object-contain transition-opacity duration-500 ${videoEnded ? 'opacity-0' : 'opacity-100'}`}
            onEnded={handleVideoEnd}
            playsInline
            muted
          >
            <source src="/brandandbrandzLogo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <button
            onClick={skipVideo}
            className="absolute cursor-pointer bottom-8 right-8 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg backdrop-blur-sm transition-all"
          >
            Skip Intro
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={"bg-black text-white bg-[radial-gradient(ellipse_150%_20%_at_50%_0%,#adbac9_0%,rgba(0,0,0,0)_45%)] relative pt-6 " + raleway.className}>
      <Navbar />

      <main>
        <HomeHero />

        <div className="relative z-10 bg-black">
          <RefinedBrandSection />

          <BrandGrowthSystems />

          {/* Intelligence Section */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-zinc-400 via-[#70879f] to-sky-700 text-center overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white">Intelligence, applied thoughtfully.</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-white/80">
                We integrate AI where it truly matters <br className="hidden sm:block" /> to understand customers, improve decisions and scale responsibly.
              </p>
            </motion.div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 justify-center gap-6 max-w-4xl mx-auto">
              {["Listen to real customer behavior", "Personalize digital experiences", "Automate intelligently", "Turn data into clarity"].map((text, i) => (
                <motion.div
                  key={i}
                  initial={isMobile ? { opacity: 0, y: 40 } : { opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    delay: isMobile ? 0 : i * 0.1,
                    duration: 0.5,
                    ease: "easeOut"
                  }}
                  className="w-full px-6 py-5 rounded-xl border border-white/20 flex items-center gap-4 text-white hover:bg-white/5 transition-colors bg-white/5 backdrop-blur-sm"
                >
                  <span className="font-semibold text-2xl text-white/50">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-left font-medium">{text}</span>
                </motion.div>
              ))}
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-12 text-sm text-white/60"
            >
              AI supports the brand. <br /> Human strategy leads it.
            </motion.p>
          </section>

          {/* Beyond Consulting Section */}
          <section className="py-24 px-4 sm:px-6 lg:px-8 text-center bg-black">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Beyond Consulting. We Build Platforms.</h2>
              <p className="mt-6 max-w-2xl mx-auto text-lg text-white/70">
                Some problems require more than advice. They require systems.
              </p>
            </motion.div>

            <div className="mt-16 flex flex-col items-center gap-8 max-w-4xl mx-auto">
              {/* Stack vertically on mobile/tablet, side-by-side on large desktop if needed but mostly vertical is fine here as per request */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                <PlatformCard
                  title="DailyGo"
                  subtitle="Verified Gigforce & Student Earning Platform"
                  href="/products"
                />
                <PlatformCard
                  title="Unifiro"
                  subtitle={<>One Platform for Registrations. <br /> Payments and Management.</>}
                  href="/products"
                />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-16 space-y-6"
            >
              <p className="max-w-3xl mx-auto text-lg text-white/80 font-light">
                Through our products, we solve real-world trust gaps connecting digital intelligence with on-ground execution.
              </p>
              <p className="italic text-sm text-white/40">"When trust is built into the system, growth follows naturally."</p>
            </motion.div>
          </section>

          <HowWeWork />

          <TechStack />

          {/* Final CTA & Footer Section */}
          <section className="py-32 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-r from-zinc-400 via-[#70879f] to-sky-700 relative overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <h2 className="text-4xl sm:text-6xl font-bold text-white tracking-tighter">A strong brand doesn't need to shout.</h2>
              <h2 className="text-4xl sm:text-6xl font-bold text-white mt-2 tracking-tighter">It needs to be clear.</h2>
              <p className="mt-8 max-w-2xl mx-auto text-xl text-white/90 font-light leading-relaxed">
                It earns trust before attention and belief before growth. <br className="hidden md:block" /> That's what we build at Brand & Brandz.
              </p>
              <Button variant="outline" className="mt-12 border-white bg-white text-black hover:bg-gray-100 px-12 py-8 text-xl rounded-full transition-all hover:scale-105 active:scale-95 shadow-xl">
                Begin Your Brand Journey
              </Button>
            </motion.div>

            {/* Subtle Animated Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-20">
              <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-[120px]" />
              <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-400 rounded-full blur-[120px]" />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}