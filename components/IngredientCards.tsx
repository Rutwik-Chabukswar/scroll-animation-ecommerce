"use client";


const ingredients = [
    { title: "Fresh Strawberries", emoji: "🍓", desc: "Hand-picked organic strawberries for natural sweetness." },
    { title: "Pure Spring Water", emoji: "💧", desc: "Pristine mountain spring water for a clean, refreshing taste." },
    { title: "Natural Sweetness", emoji: "🌿", desc: "No added sugar, just the real flavor of sun-ripened fruit." },
];

export default function IngredientCards() {
    return (
        <section className="py-32 px-6 md:px-12 bg-[#050505]">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
                {ingredients.map((item, idx) => (
                    <div
                        key={idx}
                        className="glass p-12 rounded-[2.5rem] transition-all duration-700 ease-[var(--ease-premium)] 
                                   hover:-translate-y-4 hover:shadow-premium-card 
                                   group relative overflow-hidden"
                        style={{ transitionDelay: `${idx * 150}ms` }}
                    >
                        {/* Soft ambient glow inside card */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors pointer-events-none" />

                        <div className="text-6xl mb-8 group-hover:scale-110 transition-transform duration-700 ease-[var(--ease-premium)]">
                            {item.emoji}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                            {item.title}
                        </h3>
                        <p className="text-white/50 leading-relaxed text-sm">
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
