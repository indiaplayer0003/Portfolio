import { memo, useState, useEffect, useCallback } from 'react';

/**
 * Dev Panel - Hidden developer tools
 * Toggle with Ctrl+Shift+P
 */
const DevPanel = memo(() => {
    const [visible, setVisible] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(false);
    const [glassExtreme, setGlassExtreme] = useState(false);

    useEffect(() => {
        if (import.meta.env.PROD) return;

        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.shiftKey && e.code === 'KeyP') {
                e.preventDefault();
                setVisible(v => !v);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const toggleReducedMotion = useCallback(() => {
        setReducedMotion(v => {
            document.documentElement.classList.toggle('force-reduced-motion', !v);
            return !v;
        });
    }, []);

    const toggleGlassExtreme = useCallback(() => {
        setGlassExtreme(v => {
            document.documentElement.classList.toggle('glass-extreme', !v);
            return !v;
        });
    }, []);

    if (!visible || import.meta.env.PROD) return null;

    return (
        <div
            className="fixed top-20 right-4 z-[9999] p-4 rounded-2xl backdrop-blur-xl w-64"
            style={{
                backgroundColor: 'rgba(0,0,0,0.9)',
                border: '1px solid rgba(255,255,255,0.1)',
                contain: 'layout style paint',
            }}
        >
            <h3 className="text-white/90 font-semibold mb-4 text-sm">🛠️ Dev Panel</h3>

            <div className="space-y-3">
                <label className="flex items-center justify-between text-xs text-white/70">
                    <span>Reduced Motion</span>
                    <button
                        onClick={toggleReducedMotion}
                        className={`w-10 h-5 rounded-full transition-colors ${reducedMotion ? 'bg-accent' : 'bg-white/20'}`}
                    >
                        <span
                            className={`block w-4 h-4 rounded-full bg-white transition-transform ${reducedMotion ? 'translate-x-5' : 'translate-x-0.5'}`}
                        />
                    </button>
                </label>

                <label className="flex items-center justify-between text-xs text-white/70">
                    <span>Glass Extreme</span>
                    <button
                        onClick={toggleGlassExtreme}
                        className={`w-10 h-5 rounded-full transition-colors ${glassExtreme ? 'bg-accent' : 'bg-white/20'}`}
                    >
                        <span
                            className={`block w-4 h-4 rounded-full bg-white transition-transform ${glassExtreme ? 'translate-x-5' : 'translate-x-0.5'}`}
                        />
                    </button>
                </label>
            </div>

            <p className="text-white/30 text-[10px] mt-4">
                Ctrl+Shift+F → FPS Meter
            </p>
        </div>
    );
});

DevPanel.displayName = 'DevPanel';

export default DevPanel;
