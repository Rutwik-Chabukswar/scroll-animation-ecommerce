"use client";

import { useEffect, useRef, useState } from "react";

interface HeroCanvasProps {
    totalFrames: number;
    extension: string;
    onLoadProgress: (progress: number) => void;
    onLoadingComplete: () => void;
}

export default function HeroCanvas({ totalFrames, extension, onLoadProgress, onLoadingComplete }: HeroCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [currentFrame, setCurrentFrame] = useState(1);
    const [scrollProgress, setScrollProgress] = useState(0);

    // Preload images
    useEffect(() => {
        if (totalFrames <= 0) return;

        let loadedCount = 0;
        const loadedImages: HTMLImageElement[] = [];

        // Safety timeout fallback
        const fallbackTimer = setTimeout(() => {
            console.warn("[HeroCanvas] Loading fallback triggered after 5s");
            onLoadingComplete();
        }, 5000);

        console.log("[HeroCanvas] Total frames detected:", totalFrames);

        const updateProgress = () => {
            loadedCount++;
            const progress = Math.floor((loadedCount / totalFrames) * 100);
            onLoadProgress(progress);

            if (loadedCount === totalFrames) {
                console.log("[HeroCanvas] All frames loaded, setting to 100%");
                onLoadProgress(100);

                setTimeout(() => {
                    console.log("[HeroCanvas] Finalizing loading after 300ms delay");
                    clearTimeout(fallbackTimer);
                    setImages(loadedImages);
                    onLoadingComplete();
                }, 300);
            }
        };

        for (let i = 1; i <= totalFrames; i++) {
            const img = new Image();
            const paddedIndex = i.toString().padStart(3, "0");
            img.src = `/frames/frame_${paddedIndex}.${extension}`;

            img.onload = () => {
                loadedImages[i] = img;
                updateProgress();
            };

            img.onerror = () => {
                console.warn(`[HeroCanvas] Missing frame: /frames/frame_${paddedIndex}.${extension}`);
                // Create an empty image to prevent breakage
                const dummy = new Image();
                loadedImages[i] = dummy;
                updateProgress();
            };
        }

        return () => clearTimeout(fallbackTimer);
    }, [totalFrames, extension, onLoadProgress, onLoadingComplete]);

    // Optimized Draw function
    const drawImage = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Safety clamp
        const safeIndex = Math.max(1, Math.min(totalFrames, index));
        if (!images[safeIndex] || !images[safeIndex].complete) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = images[safeIndex];

        // Use the internal pixel dimensions of the canvas
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const imageWidth = img.width;
        const imageHeight = img.height;

        // 1. Calculate scale (Maintain aspect ratio, centering - "contain" behavior)
        const scale = Math.min(canvasWidth / imageWidth, canvasHeight / imageHeight);

        // 2. Calculate drawing size
        const drawWidth = imageWidth * scale;
        const drawHeight = imageHeight * scale;

        // 3. Center the image
        const offsetX = (canvasWidth - drawWidth) / 2;
        const offsetY = (canvasHeight - drawHeight) / 2;

        // 4. Draw image
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    const targetFrameRef = useRef(1);
    const easedFrameRef = useRef(1);
    const triggerRef = useRef<HTMLDivElement>(null);
    const [showTagline, setShowTagline] = useState(false);

    // Render loop for smooth interpolation
    useEffect(() => {
        let requestId: number;

        const render = () => {
            // Cinematic Easing Logic: current += (target - current) * factor
            // A smaller factor (0.05) creates "inertia" or "weight", making it feel like camera gear
            const diff = targetFrameRef.current - easedFrameRef.current;

            if (Math.abs(diff) > 0.001) {
                // Use a lower factor for more cinematic lag/inertia
                const factor = 0.06;
                easedFrameRef.current += diff * factor;

                const frameToDraw = Math.max(1, Math.min(totalFrames, Math.round(easedFrameRef.current)));

                // Only redraw if frame actually changed to save performance
                setCurrentFrame(frameToDraw);
                drawImage(frameToDraw);
            }
            requestId = requestAnimationFrame(render);
        };

        if (images.length > 0) {
            render();
        }

        return () => cancelAnimationFrame(requestId);
    }, [images, totalFrames]);

    // Initial draw and resize
    useEffect(() => {
        const handleResize = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();

            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;

            drawImage(Math.round(easedFrameRef.current));
        };

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, [images, totalFrames]);

    // Tagline Intersection Observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setShowTagline(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (triggerRef.current) observer.observe(triggerRef.current);
        return () => observer.disconnect();
    }, []);

    // Scroll listener just updates target
    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const scrollTop = -rect.top;
            const containerHeight = rect.height - window.innerHeight;

            let progress = scrollTop / containerHeight;
            progress = Math.max(0, Math.min(1, progress));
            setScrollProgress(progress);

            // Update target frame for the easing loop
            targetFrameRef.current = (progress * (totalFrames - 1)) + 1;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [totalFrames]);

    return (
        <div ref={containerRef} className="relative h-[3200px] w-full bg-[#050505]">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full object-cover relative z-10"
                    style={{ width: "100%", height: "100%" }}
                />

                {/* Billion-Dollar Ambient Glow behind bottle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-primary/20 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />

                {/* Scroll to Explore Indicator */}
                <div
                    className={`absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-all duration-1000 ease-[var(--ease-premium)] ${scrollProgress < 0.05 ? "opacity-30" : "opacity-0 translate-y-8"
                        }`}
                >
                    <span className="text-white/40 text-[9px] uppercase tracking-[0.6em] font-bold select-none">
                        Scroll to explore
                    </span>
                    <div className="w-[1px] h-16 bg-gradient-to-b from-white/20 to-transparent relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-primary animate-scroll-line" />
                    </div>
                </div>

                {/* Tagline Reveal */}
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-[20vh] pointer-events-none z-20">
                    <div className="flex flex-col md:flex-row gap-6 md:gap-16 items-center">
                        <h1
                            className={`text-7xl md:text-9xl font-bold text-white uppercase tracking-tighter transition-all duration-1000 ease-[var(--ease-premium)] select-none ${showTagline ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24"
                                }`}
                            style={{
                                textShadow: "0 0 50px rgba(255, 23, 68, 0.4)",
                                transitionDelay: "0ms"
                            }}
                        >
                            Pure<span className="text-primary">.</span>
                        </h1>
                        <h1
                            className={`text-7xl md:text-9xl font-bold text-white uppercase tracking-tighter transition-all duration-1000 ease-[var(--ease-premium)] select-none ${showTagline ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24"
                                }`}
                            style={{
                                textShadow: "0 0 50px rgba(255, 23, 68, 0.4)",
                                transitionDelay: "200ms"
                            }}
                        >
                            Fresh<span className="text-primary">.</span>
                        </h1>
                        <h1
                            className={`text-7xl md:text-9xl font-bold text-white uppercase tracking-tighter transition-all duration-1000 ease-[var(--ease-premium)] select-none ${showTagline ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24"
                                }`}
                            style={{
                                textShadow: "0 0 50px rgba(255, 23, 68, 0.4)",
                                transitionDelay: "400ms"
                            }}
                        >
                            Premium<span className="text-primary">.</span>
                        </h1>
                    </div>
                </div>

                {/* Subtle pink glow behind text */}
                <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[50vh] bg-gradient-to-t from-primary/10 to-transparent pointer-events-none transition-opacity duration-1000 ${showTagline ? "opacity-100" : "opacity-0"}`} />
            </div>

            {/* Animation Trigger Anchor */}
            <div ref={triggerRef} className="absolute bottom-0 h-20 w-full pointer-events-none" />
        </div>
    );
}
