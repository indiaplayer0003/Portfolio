import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Scroll velocity and direction detection
 * Performance: Passive listener, rAF-throttled
 */
export const useScrollVelocity = () => {
    const [velocity, setVelocity] = useState(0);
    const [direction, setDirection] = useState('none'); // 'up' | 'down' | 'none'
    const [isScrolling, setIsScrolling] = useState(false);

    const lastScrollY = useRef(0);
    const lastTime = useRef(Date.now());
    const frameRef = useRef(null);
    const timeoutRef = useRef(null);

    const handleScroll = useCallback(() => {
        if (frameRef.current) return;

        frameRef.current = requestAnimationFrame(() => {
            const currentScrollY = window.scrollY;
            const currentTime = Date.now();
            const deltaY = currentScrollY - lastScrollY.current;
            const deltaTime = currentTime - lastTime.current;

            // Calculate velocity (pixels per ms)
            const newVelocity = Math.abs(deltaY / Math.max(deltaTime, 1));

            setVelocity(newVelocity);
            setDirection(deltaY > 0 ? 'down' : deltaY < 0 ? 'up' : 'none');
            setIsScrolling(true);

            lastScrollY.current = currentScrollY;
            lastTime.current = currentTime;
            frameRef.current = null;

            // Reset scrolling state after pause
            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
                setIsScrolling(false);
                setVelocity(0);
            }, 150);
        });
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timeoutRef.current);
        };
    }, [handleScroll]);

    // Computed states
    const isFastScroll = velocity > 1.5;
    const isSlowScroll = velocity > 0 && velocity <= 1.5;

    return { velocity, direction, isScrolling, isFastScroll, isSlowScroll };
};

export default useScrollVelocity;
