"use client";

import { useEffect, useRef } from "react";
import styles from "./page.module.scss";

export default function Home() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
            console.error("CanvasRenderingContext2D is not available");
            return;
        }

        const width = window.innerWidth;
        const height = window.innerHeight;

        canvas.width = width;
        canvas.height = height;

        const fontSize = 16;
        const columns = Math.floor(width / fontSize);
        const drops = Array(columns).fill(1);

        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()";

        const draw = () => {
            if (!ctx) return;

            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = "#0f0";
            ctx.font = `${fontSize}px monospace`;

            drops.forEach((y, i) => {
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                const x = i * fontSize;

                ctx.fillText(text, x, y * fontSize);

                if (y * fontSize > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                drops[i]++;
            });
        };

        const interval = setInterval(draw, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={styles.canvas}
        />
    );
}
