import { useState, useEffect, useCallback } from 'react';

const KONAMI_CODE = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

/**
 * Konami code detection for Easter egg
 * Performance: Lightweight keydown listener
 */
export const useKonamiCode = (onActivate) => {
    const [input, setInput] = useState([]);
    const [activated, setActivated] = useState(false);

    const handleKeyDown = useCallback((e) => {
        if (activated) return;

        setInput(prev => {
            const newInput = [...prev, e.code].slice(-KONAMI_CODE.length);

            // Check if code matches
            if (newInput.length === KONAMI_CODE.length &&
                newInput.every((key, i) => key === KONAMI_CODE[i])) {
                setActivated(true);
                onActivate?.();
            }

            return newInput;
        });
    }, [activated, onActivate]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    const reset = useCallback(() => {
        setActivated(false);
        setInput([]);
    }, []);

    return { activated, reset };
};

export default useKonamiCode;
