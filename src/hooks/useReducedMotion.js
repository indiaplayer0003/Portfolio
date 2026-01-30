import { useState, useEffect, useCallback } from 'react';

/**
 * Reduced motion preference detection
 * Performance: Respects user preferences, no unnecessary animations
 */
export const useReducedMotion = () => {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);

        const handler = (e) => setPrefersReducedMotion(e.matches);
        mediaQuery.addEventListener('change', handler);

        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    return prefersReducedMotion;
};

/**
 * System theme preference detection
 */
export const useSystemTheme = () => {
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setTheme(mediaQuery.matches ? 'dark' : 'light');

        const handler = (e) => setTheme(e.matches ? 'dark' : 'light');
        mediaQuery.addEventListener('change', handler);

        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    return theme;
};

export { useReducedMotion as default };
