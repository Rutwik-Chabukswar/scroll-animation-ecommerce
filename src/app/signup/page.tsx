"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setIsLoading(false);
            return;
        }

        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) throw error;

            setSuccess(true);
            setTimeout(() => {
                router.push("/");
            }, 2000);
        } catch (err: any) {
            setError(err.message || "An error occurred during signup");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#050505] flex items-center justify-center px-6 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full max-w-md relative z-10 transition-all duration-500">
                {/* Back to Home Link */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-white/40 hover:text-primary transition-all text-xs uppercase tracking-widest font-bold mb-6 group relative z-[60] py-2 px-1 cursor-pointer"
                >
                    <span className="group-hover:-translate-x-1 transition-transform inline-block">←</span>
                    <span className="relative">Back to Home</span>
                </Link>

                <div className="glass p-8 md:p-12 rounded-[2.5rem]">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-bold text-white mb-3 tracking-tight font-outfit">
                            Join <span className="text-primary">Premium</span>
                        </h1>
                        <p className="text-white/40 text-sm font-outfit">
                            Create your account to start ordering
                        </p>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-6">
                        <div>
                            <label className="block text-white/60 text-xs uppercase tracking-widest mb-2 font-outfit" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="your@email.com"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary/50 transition-all font-outfit"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-white/60 text-xs uppercase tracking-widest mb-2 font-outfit" htmlFor="password">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary/50 transition-all font-outfit"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-white/60 text-xs uppercase tracking-widest mb-2 font-outfit" htmlFor="confirm-password">
                                Confirm Password
                            </label>
                            <input
                                id="confirm-password"
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary/50 transition-all font-outfit"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>

                        {error && (
                            <div className="text-primary text-sm bg-primary/10 py-3 px-4 rounded-xl border border-primary/20 font-outfit">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="text-green-400 text-sm bg-green-400/10 py-3 px-4 rounded-xl border border-green-400/20 font-outfit">
                                Account created! Redirecting...
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-pink-gradient text-white font-bold py-5 rounded-2xl shadow-pink-glow hover:shadow-pink-glow-lg transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest font-outfit mt-4"
                        >
                            {isLoading ? "Creating Account..." : "Create Account"}
                        </button>
                    </form>

                    <div className="mt-10 text-center">
                        <p className="text-white/40 text-sm font-outfit">
                            Already have an account?{" "}
                            <Link href="/login" className="text-white hover:text-primary transition-colors font-semibold">
                                Login here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
