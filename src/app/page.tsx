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
import { motion, AnimatePresence } from 'framer-motion';

const raleway = Raleway({ weight: ["400", "500", "600", "700", "900"], subsets: ["latin"] });

function PlatformCard({ title, subtitle, href }: { title: string, subtitle: string | React.ReactNode, href: string }) {
  return (
    <Link href={href} className="block group h-full">
      <motion.div
        className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black h-full"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Background Gradient Layer */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-400 via-[#70879f] to-sky-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <CardContent className="relative z-10 p-8 flex flex-col justify-between h-full text-left min-h-[220px]">
          <div>
            <h3 className="font-medium text-3xl mb-2 text-white">{title}</h3>
            <p className="text-lg text-white/70 group-hover:text-white transition-colors">{subtitle}</p>
          </div>

          <div className="mt-8 flex items-center gap-2 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            <span className="text-sm font-semibold uppercase tracking-wider text-white">Learn More</span>
            <ArrowUpRight className="w-5 h-5 text-white" />
          </div>
        </CardContent>
      </motion.div>
    </Link>
  );
}


export default function App() {
  const [showVideo, setShowVideo] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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

          <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-zinc-400 via-[#70879f] to-sky-700 text-center">
            <h2 className="text-3xl font-bold text-white">Intelligence, applied thoughtfully.</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-white/80">
              We integrate AI where it truly matters <br /> to understand customers, improve decisions and scale responsibly.
            </p>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 justify-center gap-6 max-w-4xl mx-auto">
              {["Listen to real customer behavior", "Personalize digital experiences", "Automate intelligently", "Turn data into clarity"].map((text, i) => (
                <div key={i} className="w-full px-6 py-3 rounded-xl border border-white/20 flex items-center gap-4 text-white hover:bg-white/5 transition-colors">
                  <span className="font-semibold text-2xl text-white">{String(i + 1).padStart(2, "0")}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
            <p className="mt-12 text-sm text-white/60">AI supports the brand. <br /> Human strategy leads it.</p>
          </section>

          <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white">Beyond Consulting. We Build Platforms.</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-white/80">
              Some problems require more than advice. They require systems.
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
            <p className="mt-12 max-w-3xl mx-auto text-lg text-white/80">
              Through our products, we solve real-world trust gaps connecting digital intelligence with on-ground execution.
            </p>
            <p className="italic text-sm mt-4 text-white/50">"When trust is built into the system, growth follows naturally."</p>
          </section>

          <HowWeWork />

          <TechStack />

          <section className="py-20 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-r from-zinc-400 via-[#70879f] to-sky-700">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">A strong brand doesn't need to shout.</h2>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">It needs to be clear.</h2>
            <p className="mt-4 max-w-xl mx-auto text-lg">
              It earns trust before attention and belief before growth. That's what we build at Brand & Brandz.
            </p>
            <Button variant="outline" className="mt-8 border-white bg-transparent px-12 py-6">
              Begin Your Brand Journey
            </Button>
          </section>
        </div>
      </main>
    </div>
  );
}