"use client";

import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";

function ThankYouContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("order_id") || "ORDER-12345";
    const productName = searchParams.get("product") || "Premium Strawberry Juice";
    const amount = searchParams.get("amount") || "299";

    useEffect(() => {
        // Trigger confetti on mount
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="glass p-12 md:p-16 rounded-[3rem] text-center max-w-2xl relative z-10 w-full animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-in slide-in-from-bottom duration-700">
                <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path className="animate-draw-check" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
                Order <span className="text-primary">Confirmed!</span>
            </h1>

            <p className="text-white/60 text-lg font-outfit mb-10 leading-relaxed">
                Thank you for your purchase. Your order has been successfully placed.
            </p>

            {/* Order Summary Table */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-12 text-left space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-white/40 text-xs uppercase tracking-widest font-outfit">Order ID</span>
                    <span className="text-white font-mono text-sm">{orderId}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-white/40 text-xs uppercase tracking-widest font-outfit">Product Name</span>
                    <span className="text-white font-outfit font-semibold">{productName}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                    <span className="text-white/40 text-xs uppercase tracking-widest font-outfit">Amount Paid</span>
                    <span className="text-primary text-2xl font-black">₹{amount}</span>
                </div>
            </div>

            <Link
                href="/"
                className="inline-block px-12 py-5 bg-pink-gradient text-white rounded-2xl font-bold font-outfit uppercase tracking-widest shadow-pink-glow hover:shadow-pink-glow-lg transition-all transform hover:scale-105"
            >
                Continue Shopping
            </Link>

            <style jsx>{`
                @keyframes draw-check {
                    from { stroke-dashoffset: 100; stroke-dasharray: 100; }
                    to { stroke-dashoffset: 0; stroke-dasharray: 100; }
                }
                .animate-draw-check {
                    animation: draw-check 0.8s ease-out forwards;
                }
            `}</style>
        </div>
    );
}

export default function ThankYouPage() {
    return (
        <main className="min-h-screen bg-[#050505] flex items-center justify-center px-6 relative overflow-hidden pt-20">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

            <Suspense fallback={<div className="text-white font-outfit animate-pulse italic">Finalizing...</div>}>
                <ThankYouContent />
            </Suspense>
        </main>
    );
}
