"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

export default function AdminDashboard() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ totalOrders: 0, revenue: 0 });
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                router.push("/login");
                return;
            }

            setUser(session.user);

            // Fetch some mock/real data if table exists
            const { count } = await supabase
                .from("orders")
                .select("*", { count: "exact", head: true });

            setStats({
                totalOrders: count || 0,
                revenue: (count || 0) * 299,
            });

            setLoading(false);
        };

        checkAuth();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <div className="text-white font-outfit animate-pulse">Authenticating...</div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#050505] pt-32 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
                        Admin <span className="text-primary">Dashboard</span>
                    </h1>
                    <p className="text-white/40 font-outfit">
                        Logged in as: <span className="text-white">{user?.email}</span>
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="glass p-8 rounded-3xl">
                        <h3 className="text-white/40 text-xs uppercase tracking-widest mb-2 font-outfit">Total Orders</h3>
                        <p className="text-5xl font-bold text-white font-outfit">{stats.totalOrders}</p>
                    </div>

                    <div className="glass p-8 rounded-3xl">
                        <h3 className="text-white/40 text-xs uppercase tracking-widest mb-2 font-outfit">Revenue</h3>
                        <p className="text-5xl font-bold text-primary font-outfit">₹{stats.revenue.toLocaleString()}</p>
                    </div>

                    <div className="glass p-8 rounded-3xl border-primary/20">
                        <h3 className="text-white/40 text-xs uppercase tracking-widest mb-2 font-outfit">Status</h3>
                        <p className="text-lg font-bold text-green-400 font-outfit flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
                            System Healthy
                        </p>
                    </div>
                </div>

                <section className="mt-16">
                    <h2 className="text-2xl font-bold text-white mb-8 font-outfit uppercase tracking-wider">Recent Orders</h2>
                    <div className="glass rounded-[2rem] overflow-hidden">
                        <div className="p-8 text-white/20 text-center font-outfit">
                            Fetching real-time order data...
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
