"use client";

import { useState } from "react";
import LoadingScreen from "../../components/LoadingScreen";
import HeroCanvas from "../../components/HeroCanvas";
import BrandStory from "../../components/BrandStory";
import IngredientCards from "../../components/IngredientCards";
import ProductCard from "../../components/ProductCard";
import Footer from "../../components/Footer";
import ParticleBackground from "../../components/ParticleBackground";
import ScrollReveal from "../../components/ScrollReveal";


import Link from "next/link";

interface MainContentProps {
    totalFrames: number;
    extension: string;
}

export default function MainContent({ totalFrames, extension }: MainContentProps) {
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    return (
        <main className="relative min-h-screen bg-[#050505]">
            {/* Global Utilities */}
            <ParticleBackground />
            <LoadingScreen progress={loadingProgress} isLoading={isLoading} />

            {/* Hero Section with Scroll Animation */}
            <HeroCanvas
                totalFrames={totalFrames}
                extension={extension}
                onLoadProgress={setLoadingProgress}
                onLoadingComplete={() => setIsLoading(false)}
            />

            <div className="relative z-10">
                {/* Brand Story Section */}
                <ScrollReveal>
                    <BrandStory />
                </ScrollReveal>

                {/* Ingredients Section */}
                <ScrollReveal>
                    <IngredientCards />
                </ScrollReveal>

                {/* Product Section */}
                <ScrollReveal>
                    <ProductCard />
                </ScrollReveal>

                {/* CTA Section */}
                <ScrollReveal>
                    <section className="py-48 px-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[60vh] bg-primary/5 blur-[120px] pointer-events-none" />
                        <div className="max-w-3xl space-y-12 group relative z-10">
                            <Link href="/order" className="block">
                                <button className="btn-premium !rounded-3xl !px-20 !py-8 !text-2xl shadow-pink-glow hover:shadow-pink-glow-lg">
                                    Order Now
                                </button>
                            </Link>
                            <p className="text-white/20 text-sm tracking-[0.5em] uppercase font-bold">
                                Experience the future of freshness
                            </p>
                        </div>
                    </section>
                </ScrollReveal>

                {/* Footer */}
                <ScrollReveal>
                    <Footer />
                </ScrollReveal>
            </div>
        </main>
    );
}
