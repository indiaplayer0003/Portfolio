import { useState, useEffect, useRef } from 'react';

const SECTION_IDS = ['hero', 'about', 'projects', 'experience', 'contact'];

/**
 * Active section detection using IntersectionObserver
 * Performance: No scroll listeners, browser-optimized
 */
export const useActiveSection = (threshold = 0.3) => {
    const [activeSection, setActiveSection] = useState('');
    const observerRef = useRef(null);

    useEffect(() => {
        // Disconnect existing observer
        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        const callback = (entries) => {
            // Find the most visible section
            const visible = entries
                .filter(entry => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

            if (visible.length > 0) {
                setActiveSection(visible[0].target.id);
            }
        };

        observerRef.current = new IntersectionObserver(callback, {
            threshold: [0, 0.25, 0.5, 0.75, 1],
            rootMargin: '-10% 0px -10% 0px'
        });

        // Observe all sections
        SECTION_IDS.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                observerRef.current.observe(element);
            }
        });

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [threshold]);

    return activeSection;
};

export default useActiveSection;
