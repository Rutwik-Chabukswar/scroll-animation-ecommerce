"use client";

import { useEffect, useState } from "react";

interface LoadingScreenProps {
    progress: number;
    isLoading: boolean;
}

export default function LoadingScreen({ progress, isLoading }: LoadingScreenProps) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (!isLoading) {
            const timer = setTimeout(() => setIsVisible(false), 800);
            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    if (!isVisible) return null;

    return (
        <div
            className={`fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#050505] transition-opacity duration-700 ease-in-out ${isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
        >
            <div className="w-72 space-y-6">
                <div className="flex justify-between text-white text-[10px] items-center">
                    <span className="uppercase tracking-[0.5em] font-bold opacity-30">Purity Loading</span>
                    <span className="font-bold opacity-50">{Math.round(progress)}%</span>
                </div>
                <div className="h-[2px] w-full bg-white/5 overflow-hidden rounded-full">
                    <div
                        className="h-full bg-pink-gradient transition-all duration-500 ease-[var(--ease-premium)]"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
            <div className="absolute bottom-16 text-white/10 text-[9px] uppercase tracking-[0.8em] font-bold">
                The Essence of Nature
            </div>
        </div>
    );
}
