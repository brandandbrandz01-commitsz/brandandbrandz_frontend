import { Navbar } from "@/components/navbar";
import { Raleway } from "next/font/google";
import { ServiceCard } from "@/components/service-card";
import { AnimatedFooter } from "@/components/animated-footer";

const raleway = Raleway({ weight: ["400", "500", "600", "700", "900"], subsets: ["latin"] });

export default function ServicesPage() {
    return (
        <div
            className={
                "min-h-screen bg-black text-white relative " +
                raleway.className
            }
            style={{
                backgroundImage: "url('/servicespage/Our Servicesbg.webp')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
            }}
        >
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/50 z-0"></div>

            <div className="relative z-10 pt-6">
                <Navbar />

                <main style={{ padding: "0 5%" }}>
                    {/* Hero Section */}
                    <section className="mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                        <div className="text-center max-w-4xl mx-auto mb-16">
                            <h1
                                className="text-4xl sm:text-5xl lg:text-[76px] font-normal text-white mb-8 leading-[1.1]"
                            >
                                Designed with clarity.
                                <br />
                                Built for trust.
                                <br />
                                Scaled with intelligence.
                            </h1>
                            <p
                                className="text-[24px] text-white/70 mb-12 font-normal leading-normal max-w-5xl mx-auto"
                            >
                                At Brand & Brandz, services are not standalone offerings.
                                <br className="hidden sm:block" />
                                They are connected systems designed to take a business from idea to sustained growth.
                            </p>

                            <div className="inline-block px-8 py-3 bg-white rounded-full">
                                <span className="text-black font-medium text-sm">Our Services</span>
                            </div>

                            <div className="mt-16 space-y-6">
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                                    End-to-End Brand & System Solutions
                                </h2>
                                <p className="text-lg sm:text-xl text-white/70 max-w-4xl mx-auto leading-relaxed">
                                    From strategy and brand foundations to digital platforms and intelligent systems,
                                    we deliver connected solutions designed to build trust and support long-term growth.
                                </p>
                            </div>
                        </div>

                        {/* Services Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                            <ServiceCard
                                index={0}
                                href="/services/brand-foundation"
                                title="Brand Foundation &<br/>Strategy"
                                description="We help businesses define who they are, what they stand for, and how they make decisions."
                                images={[
                                    {
                                        src: "/servicespage/cards.webp",
                                        alt: "Card background",
                                        width: 400,
                                        height: 400,
                                        className: "object-cover opacity-100",
                                        position: "absolute inset-0",
                                    },
                                    {
                                        src: "/servicespage/Man with tab.webp",
                                        alt: "Man with tablet",
                                        width: 200,
                                        height: 200,
                                        className: "object-contain",
                                        position: "absolute bottom-0 left-4 z-10",
                                    },
                                    {
                                        src: "/servicespage/dash board.webp",
                                        alt: "Dashboard",
                                        width: 180,
                                        height: 140,
                                        className: "object-contain",
                                        position: "absolute bottom-8 right-4 z-10",
                                    },
                                ]}
                            />

                            <ServiceCard
                                index={1}
                                href="/services/website-design"
                                title="Website Design & SEO-<br/>Driven Digital Presence"
                                description="We design digital experiences that feel intentional, trustworthy, and refined."
                                images={[
                                    {
                                        src: "/servicespage/cards.webp",
                                        alt: "Card background",
                                        width: 400,
                                        height: 400,
                                        className: "object-cover opacity-100",
                                        position: "absolute inset-0",
                                    },
                                    {
                                        src: "/servicespage/website design seco.webp",
                                        alt: "Website design",
                                        width: 550,
                                        height: 380,
                                        className: "object-contain drop-shadow-2xl",
                                        position: "absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10 w-[85%]",
                                    },
                                ]}
                            />

                            <ServiceCard
                                index={2}
                                href="/services/digital-marketing"
                                title="Digital & Social Media<br/>Marketing"
                                description="We design growth systems focused on clarity, consistency, and conversion."
                                images={[
                                    {
                                        src: "/servicespage/cards.webp",
                                        alt: "Card background",
                                        width: 400,
                                        height: 400,
                                        className: "object-cover opacity-100",
                                        position: "absolute inset-0",
                                    },
                                    {
                                        src: "/servicespage/Digita social Media.webp",
                                        alt: "Social media marketing",
                                        width: 240,
                                        height: 280,
                                        className: "object-contain",
                                        position: "absolute bottom-0 right-4 z-10",
                                    },
                                ]}
                            />

                            <ServiceCard
                                index={3}
                                href="/services/branding-creative"
                                title="Branding & Creative<br/>Design"
                                description="Creativity at Brand & Brandz is always guided by purpose."
                                images={[
                                    {
                                        src: "/servicespage/cards.webp",
                                        alt: "Card background",
                                        width: 400,
                                        height: 400,
                                        className: "object-cover opacity-100",
                                        position: "absolute inset-0",
                                    },
                                    {
                                        src: "/servicespage/Branding Creativity.webp",
                                        alt: "Branding creativity",
                                        width: 480,
                                        height: 300,
                                        className: "object-contain",
                                        position: "absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10 w-[90%] max-w-none",
                                    },
                                ]}
                            />

                            <ServiceCard
                                index={4}
                                href="/services/strategy-research"
                                title="Strategy, Research &<br/>Data Analysis"
                                description="We believe decisions should be informed by insight, not assumption."
                                images={[
                                    {
                                        src: "/servicespage/cards.webp",
                                        alt: "Card background",
                                        width: 400,
                                        height: 400,
                                        className: "object-cover opacity-100",
                                        position: "absolute inset-0",
                                    },
                                    {
                                        src: "/servicespage/Stratergy Research.webp",
                                        alt: "Strategy and research",
                                        width: 600,
                                        height: 450,
                                        className: "object-cover",
                                        position: "absolute bottom-0 right-0 z-10 w-[60%] h-auto",
                                    },
                                ]}
                            />

                            <ServiceCard
                                index={5}
                                href="/services/ai-integrations"
                                title="AI Assistants, Agents &<br/>Intelligent Integrations"
                                description="We integrate AI responsibly, as a support system, not a replacement."
                                images={[
                                    {
                                        src: "/servicespage/cards.webp",
                                        alt: "Card background",
                                        width: 400,
                                        height: 400,
                                        className: "object-cover opacity-100",
                                        position: "absolute inset-0",
                                    },
                                    {
                                        src: "/servicespage/AI assistants ,agents.webp",
                                        alt: "AI assistants",
                                        width: 360,
                                        height: 240,
                                        className: "object-contain",
                                        position: "absolute bottom-0 right-0 z-10",
                                    },
                                ]}
                            />
                        </div>

                        {/* Closing Statement Section */}
                        <AnimatedFooter />
                    </section>
                </main>
            </div>
        </div>
    );
}
