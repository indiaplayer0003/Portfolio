import { memo } from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = memo(({ children }) => {
    return (
        <div className="min-h-screen relative overflow-hidden bg-background text-primary selection:bg-accent selection:text-white">
            {/* Animated Background Blobs - GPU optimized */}
            <div
                className="fixed inset-0 pointer-events-none z-0"
                style={{ contain: 'strict', willChange: 'auto' }}
                aria-hidden="true"
            >
                <div
                    className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[80px] animate-blob mix-blend-screen"
                    style={{ willChange: 'transform', backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
                />
                <div
                    className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[80px] animate-blob animation-delay-2000 mix-blend-screen"
                    style={{ willChange: 'transform', backfaceVisibility: 'hidden', transform: 'translateZ(0)', animationDelay: '2s' }}
                />
                <div
                    className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[100px] animate-blob animation-delay-4000 mix-blend-screen"
                    style={{ willChange: 'transform', backfaceVisibility: 'hidden', transform: 'translateZ(0)', animationDelay: '4s' }}
                />
            </div>

            <Header />

            <main className="relative z-10 pt-24 pb-12 px-4 md:px-0" style={{ contain: 'layout style' }}>
                {children}
            </main>

            <Footer />
        </div>
    );
});

Layout.displayName = 'Layout';

export default Layout;
