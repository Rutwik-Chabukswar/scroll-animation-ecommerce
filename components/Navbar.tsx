"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";

export default function Navbar() {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        // 1. Check initial session
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
        };

        getSession();

        // 2. Subscribe to auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            console.log("Auth event:", _event, session?.user?.email);
            setUser(session?.user ?? null);
            if (_event === "SIGNED_IN") router.refresh();
            if (_event === "SIGNED_OUT") {
                router.refresh();
                router.push("/");
            }
        });

        return () => subscription.unsubscribe();
    }, [router]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-[100] px-8 py-6 md:px-16 md:py-8 transition-all duration-500">
            <div className="max-w-[1400px] mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link
                    href="/"
                    className="text-2xl md:text-3xl font-bold text-white uppercase tracking-[0.25em] hover:opacity-80 transition-all relative group"
                >
                    <span className="relative z-10">
                        PURE <span className="text-pink-gradient">JUICE</span>
                    </span>
                    {/* Subtle ambient glow behind logo */}
                    <div className="absolute inset-x-0 -inset-y-4 bg-primary/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </Link>

                {/* Auth Group */}
                <div className="flex items-center gap-10">
                    {user ? (
                        <>
                            <span className="hidden lg:block text-white/20 text-[10px] uppercase tracking-[0.3em] font-bold">
                                {user.email}
                            </span>
                            <Link
                                href="/admin"
                                className="text-white/40 hover:text-white text-xs uppercase tracking-widest transition-all"
                            >
                                Dashboard
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-xs uppercase tracking-[0.3em] font-bold text-primary hover:text-white transition-all py-2"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="text-white/40 hover:text-white text-xs uppercase tracking-widest transition-all"
                            >
                                Login
                            </Link>
                            <Link
                                href="/signup"
                                className="btn-premium !px-10 !py-4 !text-[10px]"
                            >
                                Signup
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
