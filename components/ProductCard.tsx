"use client";

import { useState } from "react";

import Link from "next/link";

export default function ProductCard() {
    const [quantity, setQuantity] = useState(1);

    return (
        <section className="py-32 px-6 md:px-12 bg-[#050505] flex items-center justify-center">
            <div className="max-w-4xl w-full glass p-10 md:p-16 rounded-[3rem] flex flex-col md:flex-row gap-16 items-center shadow-pink-glow/10 border-white/5 bg-white/2">
                <div className="w-full md:w-1/2 aspect-square bg-gradient-to-br from-primary/10 to-transparent rounded-[2.5rem] flex items-center justify-center relative group overflow-hidden border border-white/5">
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-[var(--ease-premium)]" />
                    <div className="text-8xl md:text-9xl animate-floating drop-shadow-pink-glow">🍓</div>
                    <div className="absolute bottom-8 left-8 text-white/30 text-[10px] uppercase tracking-[0.4em]">
                        300ML / Pure Organic
                    </div>
                </div>

                <div className="w-full md:w-1/2 space-y-10">
                    <div className="space-y-4">
                        <h2 className="text-5xl font-bold text-white tracking-tighter leading-tight">
                            Premium <span className="text-pink-gradient">Strawberry</span>
                        </h2>
                        <p className="text-white/30 font-bold text-3xl tracking-tighter">₹299</p>
                    </div>

                    <p className="text-white/40 text-sm leading-relaxed max-w-sm">
                        Our signature strawberry juice is cold-pressed from sun-ripened berries.
                        No added sugar, no preservatives, just 100% pure flavor.
                    </p>

                    <div className="space-y-8">
                        <div className="flex items-center gap-8">
                            <span className="text-white/20 uppercase text-[10px] tracking-[0.3em] font-bold">Quantity</span>
                            <div className="flex items-center bg-white/5 rounded-2xl border border-white/10 px-6 py-3">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="text-white/40 hover:text-white transition-colors px-3 font-black text-lg"
                                >
                                    -
                                </button>
                                <span className="text-white w-12 text-center font-bold font-mono">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="text-white/40 hover:text-white transition-colors px-3 font-black text-lg"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <Link href="/order" className="block w-full">
                            <button className="btn-premium w-full !rounded-2xl !py-6">
                                Buy Now
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes floating {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-floating {
          animation: floating 3s ease-in-out infinite;
        }
      `}</style>
        </section>
    );
}
