'use client';
import React, { useRef, useEffect } from 'react';
import { WIDTH, HEIGHT } from '../../lib/game-core/constants';
import { AudioManager } from '../../lib/game-core/engine/audio';
import { Game } from '../../lib/game-core/engine/game';
import { Mouse } from '../../lib/game-core/engine/mouse';
import { Scene } from '../../lib/game-core/scene';

export default function GameCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const gameRef = useRef<Game | null>(null);
    const mouseRef = useRef<Mouse>({ x: 0, y: 0 });
    const animationIdRef = useRef<number>();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Initialize game
        const audio = new AudioManager(false);
        audio.prepare();
        audio.play();
        
        const game = new Game(audio, canvas);
        game.scene = new Scene(game);
        gameRef.current = game;

        // Set up canvas
        canvas.width = WIDTH;
        canvas.height = HEIGHT;

        // Resize handling
        let ratio = 1;
        let x = 0;
        let y = 0;

        const resize = () => {
            const container = canvas.parentElement;
            if (!container) return;
            
            const containerWidth = container.clientWidth;
            const containerHeight = container.clientHeight;
            
            ratio = Math.min(containerWidth / WIDTH, containerHeight / HEIGHT);
            canvas.style.transformOrigin = 'top left';
            x = (containerWidth - WIDTH * ratio) * 0.5;
            y = (containerHeight - HEIGHT * ratio) * 0.5;
            canvas.style.transform = `translate(${x}px,${y}px) scale(${ratio})`;
        };

        resize();
        window.addEventListener('resize', resize);

        // Mouse handling
        let isFull = false;
        document.addEventListener('fullscreenchange', () => isFull = !isFull);

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current.x = isFull ? (e.clientX - rect.left - x) / ratio : (e.clientX - rect.left) / ratio;
            mouseRef.current.y = isFull ? (e.clientY - rect.top - y) / ratio : (e.clientY - rect.top) / ratio;
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            audio.play();
            game.pressed(e);
        };

        const handleMouseDown = () => {
            audio.play();
            mouseRef.current.pressing = true;
            game.click(mouseRef.current);
        };

        const handleMouseUp = () => {
            mouseRef.current.pressing = false;
        };

        // Add event listeners
        canvas.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('keydown', handleKeyDown);
        canvas.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);

        // Game loop
        const tick = (t: number) => {
            animationIdRef.current = requestAnimationFrame(tick);
            ctx.resetTransform();
            game.update(t, mouseRef.current);
            game.draw(ctx);
            mouseRef.current.pressing = false;
        };

        animationIdRef.current = requestAnimationFrame(tick);

        // Cleanup
        return () => {
            window.removeEventListener('resize', resize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('keydown', handleKeyDown);
            canvas.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
            
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }
        };
    }, []);

    return (
        <div className="flex justify-center items-center w-full h-[600px] bg-gray-900 rounded-lg overflow-hidden">
            <canvas
                ref={canvasRef}
                className="border border-gray-700"
                style={{ imageRendering: 'pixelated' }}
            />
        </div>
    );
}