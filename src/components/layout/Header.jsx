import { memo, useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useActiveSection } from '../../hooks/useActiveSection';

const navLinks = [
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Contact', href: '#contact', id: 'contact' },
];

const Header = memo(() => {
    const [scrolled, setScrolled] = useState(false);
    const [blurIntensity, setBlurIntensity] = useState(8);
    const ticking = useRef(false);
    const activeSection = useActiveSection();

    const updateScrollState = useCallback(() => {
        const scrollY = window.scrollY;
        setScrolled(scrollY > 50);
        // Increase blur intensity as user scrolls (max 16px)
        setBlurIntensity(Math.min(8 + scrollY / 50, 16));
        ticking.current = false;
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (!ticking.current) {
                requestAnimationFrame(updateScrollState);
                ticking.current = true;
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [updateScrollState]);

    // Preload section on hover
    const handleNavHover = useCallback((sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            // Trigger any lazy images in the section
            const lazyImages = section.querySelectorAll('img[loading="lazy"]');
            lazyImages.forEach(img => img.loading = 'eager');
        }
    }, []);

    return (
        <motion.header
            className={`fixed top-0 left-0 right-0 z-50 ${scrolled ? 'py-4' : 'py-6'}`}
            style={{
                willChange: 'transform',
                contain: 'layout style paint',
                backdropFilter: scrolled ? `blur(${blurIntensity}px)` : 'none',
                backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.7)' : 'transparent',
                transition: 'padding 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), background-color 0.3s ease'
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <a
                    href="#"
                    className="text-2xl font-bold tracking-tight text-white/90 hover:text-white transition-colors"
                    style={{ willChange: 'opacity' }}
                >
                    Portfolio<span className="text-accent">.</span>
                </a>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-1">
                    <div
                        className={`px-2 py-2 rounded-full border border-white/10 relative flex gap-1 transition-colors duration-300 ${scrolled ? 'bg-black/40' : 'bg-white/5'}`}
                        style={{
                            contain: 'layout style paint',
                            backdropFilter: 'blur(12px)'
                        }}
                    >
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.id;
                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onMouseEnter={() => handleNavHover(link.id)}
                                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all relative ${isActive
                                            ? 'text-white bg-white/10'
                                            : 'text-white/70 hover:text-white hover:bg-white/5'
                                        }`}
                                    style={{ willChange: 'background-color, color' }}
                                >
                                    {link.name}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeSection"
                                            className="absolute inset-0 bg-white/10 rounded-full -z-10"
                                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                </a>
                            );
                        })}
                    </div>
                </nav>

                {/* Mobile menu */}
                <button className="md:hidden text-white/80" aria-label="Menu">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </div>
        </motion.header>
    );
});

Header.displayName = 'Header';

export default Header;
