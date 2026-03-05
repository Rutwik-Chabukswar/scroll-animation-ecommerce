"use client";

import { useEffect, useRef } from "react";

export default function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];

        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            opacity: number;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.size = Math.random() * 2 + 1; // 1px - 3px
                this.speedX = (Math.random() - 0.5) * 0.1; // Extremely slow
                this.speedY = (Math.random() - 0.5) * 0.1;
                this.opacity = 0.05; // Fixed base opacity as requested
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Infinite seamless loop
                if (this.x > canvas!.width) this.x = 0;
                else if (this.x < 0) this.x = canvas!.width;

                if (this.y > canvas!.height) this.y = 0;
                else if (this.y < 0) this.y = canvas!.height;
            }

            draw() {
                if (!ctx) return;
                // Style: Soft Pink (#FF6B9D)
                ctx.fillStyle = `rgba(255, 107, 157, ${this.opacity})`;
                ctx.shadowBlur = this.size * 3; // Glowing effect
                ctx.shadowColor = "#FF6B9D";
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        const init = () => {
            particles = [];
            // Optimize count for subtle look
            const count = Math.floor((canvas.width * canvas.height) / 40000);
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => {
                p.update();
                p.draw();
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        };

        window.addEventListener("resize", handleResize);
        handleResize();
        animate();

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
        />
    );
}
