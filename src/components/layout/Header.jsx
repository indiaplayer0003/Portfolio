import { memo, useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
];

const Header = memo(() => {
    const [scrolled, setScrolled] = useState(false);
    const ticking = useRef(false);

    const updateScrolled = useCallback(() => {
        setScrolled(window.scrollY > 50);
        ticking.current = false;
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (!ticking.current) {
                requestAnimationFrame(updateScrolled);
                ticking.current = true;
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [updateScrolled]);

    return (
        <motion.header
            className={`fixed top-0 left-0 right-0 z-50 ${scrolled ? 'py-4' : 'py-6'}`}
            style={{ willChange: 'transform', contain: 'layout style paint' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <a href="#" className="text-2xl font-bold tracking-tight text-white/90 hover:text-white transition-colors">
                    Portfolio<span className="text-accent">.</span>
                </a>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-1">
                    <div
                        className={`px-2 py-2 rounded-full backdrop-blur-md border border-white/10 relative flex gap-1 transition-colors duration-300 ${scrolled ? 'bg-black/40' : 'bg-white/5'}`}
                        style={{ contain: 'layout style paint' }}
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
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
