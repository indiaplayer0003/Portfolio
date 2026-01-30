import { useRef, useCallback } from 'react';

/**
 * Magnetic button effect - subtle pull towards cursor
 * Performance: Uses transform only, rAF-throttled
 */
export const useMagneticEffect = (strength = 0.15, radius = 50) => {
    const ref = useRef(null);
    const frameRef = useRef(null);

    const handleMouseMove = useCallback((e) => {
        if (!ref.current || frameRef.current) return;

        frameRef.current = requestAnimationFrame(() => {
            const rect = ref.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const distanceX = e.clientX - centerX;
            const distanceY = e.clientY - centerY;
            const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

            if (distance < radius) {
                const pullX = distanceX * strength;
                const pullY = distanceY * strength;
                ref.current.style.transform = `translate3d(${pullX}px, ${pullY}px, 0)`;
            }

            frameRef.current = null;
        });
    }, [strength, radius]);

    const handleMouseLeave = useCallback(() => {
        if (ref.current) {
            ref.current.style.transform = 'translate3d(0, 0, 0)';
        }
    }, []);

    return {
        ref,
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
        style: {
            transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            willChange: 'transform'
        }
    };
};

export default useMagneticEffect;
