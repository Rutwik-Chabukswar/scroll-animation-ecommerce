"use client";

export default function BrandStory() {
    return (
        <section
            className="py-32 px-6 md:px-12 bg-[#050505] relative overflow-hidden flex flex-col items-center text-center"
        >
            {/* Background Glow Orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-pink-500/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-4xl z-10">
                <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-[1.1] tracking-tighter">
                    Crafted With <span className="text-pink-gradient">Real Fruit</span>
                </h2>
                <p className="text-xl md:text-2xl text-white/40 font-light leading-relaxed max-w-2xl mx-auto">
                    Our cold-pressed juices are made from the freshest fruits,
                    preserving natural flavor and nutrients in every bottle.
                </p>
            </div>
        </section>
    );
}
