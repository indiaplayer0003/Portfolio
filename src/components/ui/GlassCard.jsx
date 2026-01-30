import { memo, forwardRef } from 'react';
import { motion } from 'framer-motion';

const GlassCard = memo(forwardRef(({ children, className = "", hoverEffect = false, ...props }, ref) => {
    return (
        <motion.div
            ref={ref}
            className={`
                backdrop-blur-3xl 
                bg-surface 
                border border-border 
                rounded-3xl 
                shadow-lg 
                overflow-hidden
                ${hoverEffect ? 'hover:bg-surface-highlight transition-colors duration-300' : ''}
                ${className}
            `}
            style={{
                willChange: 'transform, opacity',
                contain: 'layout style paint',
                backfaceVisibility: 'hidden',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            {...props}
        >
            {/* Glossy reflection overlay */}
            <div
                className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"
                style={{ contain: 'strict' }}
            />

            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
}));

GlassCard.displayName = 'GlassCard';

export default GlassCard;
