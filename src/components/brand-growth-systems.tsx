'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const services = [
    {
        id: '01',
        title: 'Brand strategy & positioning',
        image: '/Brand strategy & positioning.png',
    },
    {
        id: '02',
        title: 'Identity & digital experience',
        image: '/Identity & digital experience.png',
    },
    {
        id: '03',
        title: 'Marketing & growth architecture',
        image: '/Marketing & growth architecture.png',
    },
    {
        id: '04',
        title: 'AI-assisted intelligence',
        image: '/AI-assisted intelligence.png',
    },
    {
        id: '05',
        title: 'Product & platform development',
        image: '/Product & platform development.png',
    },
];

export function BrandGrowthSystems() {
    const [activeindex, setActiveIndex] = useState(0);

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto flex flex-wrap gap-12 items-center justify-center">
                <div>
                    <h2 className="text-3xl font-bold text-white max-w-xs">
                        Brand & Growth Systems
                    </h2>
                    <p className="mt-4 text-md max-w-sm text-white/80">
                        We don't offer disconnected services. <br />
                        We design complete brand ecosystems.
                    </p>
                    <div className="mt-8 space-y-4">
                        {services.map((service, index) => (
                            <div
                                key={service.id}
                                onMouseEnter={() => setActiveIndex(index)}
                                className={`flex items-center px-4 py-4 rounded-xl border cursor-pointer transition-all duration-300 ${activeindex === index
                                        ? 'bg-gradient-to-r from-blue-900/60 to-transparent border-blue-500/50'
                                        : 'border-white/20 hover:border-white/50'
                                    }`}
                            >
                                <span
                                    className={`font-semibold text-3xl mr-4 transition-colors duration-300 ${activeindex === index ? 'text-blue-400' : 'text-white/50'
                                        }`}
                                >
                                    {service.id}
                                </span>
                                <span
                                    className={`text-lg transition-colors duration-300 ${activeindex === index ? 'text-white font-medium' : 'text-white/80'
                                        }`}
                                >
                                    {service.title}
                                </span>
                            </div>
                        ))}
                        <Button
                            variant="outline"
                            className="mt-8 border-gray-100 bg-white text-black rounded-xl font-light hover:bg-gray-100"
                        >
                            Explore Offerings
                        </Button>
                    </div>
                </div>
                <div className="relative w-full max-w-[500px] aspect-[4/5] sm:min-h-[600px]">
                    {services.map((service, index) => (
                        <Image
                            key={service.title}
                            src={service.image}
                            alt={service.title}
                            fill
                            className={`object-cover rounded-xl transition-opacity duration-500 ease-in-out ${activeindex === index ? 'opacity-100' : 'opacity-0 absolute inset-0'
                                }`}
                            priority={index === 0} // Prioritize first image loading
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
