import { memo, useState, useCallback } from 'react';
import Header from './Header';
import Footer from './Footer';
import FPSMeter from '../dev/FPSMeter';
import DevPanel from '../dev/DevPanel';
import { useKonamiCode } from '../../hooks/useKonamiCode';

const Layout = memo(({ children }) => {
    const [glassExtreme, setGlassExtreme] = useState(false);

    // Easter egg: Konami code activates Glass Extreme mode
    useKonamiCode(useCallback(() => {
        setGlassExtreme(true);
        document.documentElement.classList.add('glass-extreme');

        // Show a subtle notification
        const notification = document.createElement('div');
        notification.innerHTML = '🌟 Glass Extreme Mode Activated';
        notification.style.cssText = `
            position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
            padding: 12px 24px; border-radius: 9999px; background: rgba(255,255,255,0.1);
            backdrop-filter: blur(20px); color: white; font-size: 14px; z-index: 9999;
            animation: fadeInUp 0.5s ease, fadeOut 0.5s ease 2.5s forwards;
        `;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }, []));

    return (
        <div className="min-h-screen relative overflow-hidden bg-background text-primary selection:bg-accent selection:text-white">
            {/* Noise overlay for texture */}
            <div className="noise-overlay" aria-hidden="true" />

            {/* Animated Background Blobs - GPU optimized with gradient drift */}
            <div
                className="fixed inset-0 pointer-events-none z-0 animate-gradient-drift"
                style={{
                    contain: 'strict',
                    willChange: 'auto',
                    background: 'radial-gradient(ellipse at 20% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 40% 80%, rgba(99, 102, 241, 0.12) 0%, transparent 50%)'
                }}
                aria-hidden="true"
            >
                <div
                    className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/15 rounded-full blur-[80px] animate-blob mix-blend-screen"
                    style={{ willChange: 'transform', backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
                />
                <div
                    className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-[80px] animate-blob mix-blend-screen"
                    style={{ willChange: 'transform', backfaceVisibility: 'hidden', transform: 'translateZ(0)', animationDelay: '2s' }}
                />
                <div
                    className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] bg-indigo-500/12 rounded-full blur-[100px] animate-blob mix-blend-screen"
                    style={{ willChange: 'transform', backfaceVisibility: 'hidden', transform: 'translateZ(0)', animationDelay: '4s' }}
                />
            </div>

            <Header />

            <main className="relative z-10 pt-24 pb-12 px-4 md:px-0" style={{ contain: 'layout style' }}>
                {children}
            </main>

            <Footer />

            {/* Dev tools - only in development */}
            <FPSMeter />
            <DevPanel />

            {/* Fadeout keyframes for notification */}
            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateX(-50%) translateY(20px); }
                    to { opacity: 1; transform: translateX(-50%) translateY(0); }
                }
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
            `}</style>
        </div>
    );
});

Layout.displayName = 'Layout';

export default Layout;
