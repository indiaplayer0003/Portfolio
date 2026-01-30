import { memo, forwardRef } from 'react';
import { useMagneticEffect } from '../../hooks/useMagneticEffect';
import { usePressDepth } from '../../hooks/usePressDepth';

/**
 * Premium button with magnetic effect and press depth
 * Performance: GPU-only transforms, no layout shifts
 */
const MagneticButton = memo(forwardRef(({
    children,
    href,
    className = '',
    variant = 'primary',
    magneticStrength = 0.12,
    magneticRadius = 60,
    ...props
}, ref) => {
    const magnetic = useMagneticEffect(magneticStrength, magneticRadius);
    const press = usePressDepth(0.97);

    const baseClasses = 'inline-block rounded-full font-semibold transition-colors';
    const variantClasses = {
        primary: 'px-8 py-3 bg-white text-black hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.3)]',
        secondary: 'px-8 py-3 bg-white/5 border border-white/10 text-white hover:bg-white/10 backdrop-blur-sm',
        cta: 'px-10 py-4 bg-white text-black font-bold text-lg hover:bg-white/90 shadow-[0_0_30px_rgba(255,255,255,0.2)]',
    };

    const combinedStyle = {
        ...magnetic.style,
        ...press.style,
        transform: press.isPressed
            ? `${magnetic.ref.current?.style.transform || 'translate3d(0,0,0)'} scale(0.97)`
            : magnetic.ref.current?.style.transform || 'translate3d(0,0,0)',
    };

    const Component = href ? 'a' : 'button';

    return (
        <Component
            ref={(node) => {
                magnetic.ref.current = node;
                if (typeof ref === 'function') ref(node);
                else if (ref) ref.current = node;
            }}
            href={href}
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            style={combinedStyle}
            onMouseMove={magnetic.onMouseMove}
            onMouseLeave={(e) => {
                magnetic.onMouseLeave(e);
                press.handlers.onMouseLeave(e);
            }}
            {...press.handlers}
            {...props}
        >
            {children}
        </Component>
    );
}));

MagneticButton.displayName = 'MagneticButton';

export default MagneticButton;
