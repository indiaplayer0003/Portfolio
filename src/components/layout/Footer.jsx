import { memo } from 'react';

const Footer = memo(() => {
    return (
        <footer
            className="py-12 relative z-10 border-t border-white/5 bg-black/20 backdrop-blur-lg"
            style={{ contain: 'layout style paint' }}
        >
            <div className="container mx-auto px-6 text-center">
                <p className="text-white/40 text-sm">
                    © {new Date().getFullYear()} Designed & Built with React.
                </p>
            </div>
        </footer>
    );
});

Footer.displayName = 'Footer';

export default Footer;
