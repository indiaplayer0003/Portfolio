import { memo, useState, useEffect } from 'react';

/**
 * FPS Meter - Development only
 * Shows real-time frame rate for performance monitoring
 */
const FPSMeter = memo(() => {
    const [fps, setFps] = useState(0);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Only show in development
        if (import.meta.env.PROD) return;

        // Toggle with Ctrl+Shift+F
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.shiftKey && e.code === 'KeyF') {
                setVisible(v => !v);
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        let frameCount = 0;
        let lastTime = performance.now();
        let animationId;

        const measureFPS = () => {
            frameCount++;
            const currentTime = performance.now();

            if (currentTime - lastTime >= 1000) {
                setFps(Math.round(frameCount * 1000 / (currentTime - lastTime)));
                frameCount = 0;
                lastTime = currentTime;
            }

            animationId = requestAnimationFrame(measureFPS);
        };

        if (visible) {
            animationId = requestAnimationFrame(measureFPS);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            cancelAnimationFrame(animationId);
        };
    }, [visible]);

    if (!visible || import.meta.env.PROD) return null;

    const color = fps >= 100 ? '#22c55e' : fps >= 60 ? '#eab308' : '#ef4444';

    return (
        <div
            className="fixed bottom-4 right-4 z-[9999] px-3 py-1.5 rounded-lg font-mono text-xs backdrop-blur-md"
            style={{
                backgroundColor: 'rgba(0,0,0,0.8)',
                border: '1px solid rgba(255,255,255,0.1)',
                color,
                contain: 'layout style paint',
            }}
        >
            {fps} FPS
        </div>
    );
});

FPSMeter.displayName = 'FPSMeter';

export default FPSMeter;
