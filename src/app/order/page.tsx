"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import Image from "next/image";

export default function OrderPage() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
    });
    const router = useRouter();

    const PRICE_PER_BOTTLE = 299;

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push("/login?redirect=/order");
                return;
            }
            setUser(session.user);
            setLoading(false);
        };
        checkAuth();
    }, [router]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        // Simple validation
        const { fullName, phone, address, city, state, zip } = formData;
        if (!fullName || !phone || !address || !city || !state || !zip) {
            alert("Please fill in all shipping details");
            return;
        }

        try {
            const { data, error } = await supabase.from("orders").insert({
                user_email: user.email,
                product_name: "Premium Strawberry Juice",
                quantity: quantity,
                amount: PRICE_PER_BOTTLE * quantity,
                status: "pending",
            }).select().single();

            if (error) throw error;

            router.push(`/thank-you?order_id=${data.id}&product=${encodeURIComponent(data.product_name)}&amount=${data.amount}`);
        } catch (err: any) {
            console.error("Order error:", err);
            alert("Failed to place order: " + err.message);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <div className="text-white font-outfit animate-pulse italic tracking-widest">Preparing your checkout...</div>
            </div>
        );
    }

    const totalAmount = PRICE_PER_BOTTLE * quantity;

    return (
        <main className="min-h-screen bg-[#050505] pt-32 pb-20 px-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-12 text-center">
                    Checkout <span className="text-primary">Process</span>
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left Side - Shipping Form */}
                    <div className="glass p-8 md:p-10 rounded-[2.5rem]">
                        <h2 className="text-2xl font-bold text-white mb-8 font-outfit">Shipping Information</h2>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-white/40 text-xs uppercase tracking-widest mb-2 font-outfit">Full Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        placeholder="John Doe"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary/50 transition-all font-outfit"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-white/40 text-xs uppercase tracking-widest mb-2 font-outfit">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="+91 XXXXX XXXXX"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary/50 transition-all font-outfit"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-white/40 text-xs uppercase tracking-widest mb-2 font-outfit">Email Address (Linked)</label>
                                <input
                                    type="email"
                                    value={user?.email || ""}
                                    disabled
                                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-white/30 font-outfit cursor-not-allowed"
                                />
                            </div>

                            <div>
                                <label className="block text-white/40 text-xs uppercase tracking-widest mb-2 font-outfit">Full Address</label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    placeholder="Apartment, Street, Area..."
                                    rows={3}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary/50 transition-all font-outfit resize-none"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-white/40 text-xs uppercase tracking-widest mb-2 font-outfit">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary/50 transition-all font-outfit"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-white/40 text-xs uppercase tracking-widest mb-2 font-outfit">State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary/50 transition-all font-outfit"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-white/40 text-xs uppercase tracking-widest mb-2 font-outfit">Zip Code</label>
                                    <input
                                        type="text"
                                        name="zip"
                                        value={formData.zip}
                                        onChange={handleInputChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary/50 transition-all font-outfit"
                                        required
                                    />
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Right Side - Order Summary */}
                    <div className="sticky top-32">
                        <div className="glass p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

                            <h2 className="text-2xl font-bold text-white mb-8 font-outfit">Order Summary</h2>

                            <div className="flex gap-6 mb-8 border-b border-white/5 pb-8">
                                <div className="w-24 h-24 bg-white/5 rounded-2xl overflow-hidden flex-shrink-0 relative border border-white/10">
                                    <img
                                        src="/frames/frame_128.jpg"
                                        alt="Product"
                                        className="w-full h-full object-contain p-2"
                                    />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h3 className="text-white font-bold text-lg mb-1">Premium Strawberry</h3>
                                    <p className="text-primary font-bold">₹{PRICE_PER_BOTTLE}</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex justify-between items-center text-white/60">
                                    <span className="font-outfit uppercase tracking-widest text-xs">Quantity</span>
                                    <div className="flex items-center gap-4 bg-white/5 rounded-xl p-1 border border-white/10">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/10 rounded-lg transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="w-8 text-center text-white font-bold font-outfit">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(Math.min(10, quantity + 1))}
                                            className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/10 rounded-lg transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center text-white/60">
                                    <span className="font-outfit uppercase tracking-widest text-xs">Subtotal</span>
                                    <span className="text-white">₹{totalAmount}</span>
                                </div>

                                <div className="flex justify-between items-center text-white/60">
                                    <span className="font-outfit uppercase tracking-widest text-xs">Shipping</span>
                                    <span className="text-green-400 font-bold">FREE</span>
                                </div>

                                <div className="border-t border-white/10 pt-6 flex justify-between items-center">
                                    <span className="text-white font-bold uppercase tracking-widest">Total</span>
                                    <span className="text-3xl font-black text-white">₹{totalAmount}</span>
                                </div>

                                <button
                                    onClick={handlePlaceOrder}
                                    className="w-full bg-pink-gradient text-white font-black py-5 rounded-[1.5rem] shadow-pink-glow hover:shadow-pink-glow-lg transition-all duration-300 transform active:scale-[0.98] uppercase tracking-[0.2em] font-outfit text-sm"
                                >
                                    Place Order
                                </button>
                            </div>
                        </div>

                        <p className="mt-6 text-center text-white/30 text-xs font-outfit px-10 leading-relaxed uppercase tracking-[0.05em]">
                            Secured transaction. By placing your order, you agree to our terms of service and privacy policy.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
