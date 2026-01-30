import { useState, useCallback } from 'react';

/**
 * Press depth effect - subtle scale down on press
 * Performance: Uses transform only
 */
export const usePressDepth = (depth = 0.97) => {
    const [isPressed, setIsPressed] = useState(false);

    const handlers = {
        onMouseDown: useCallback(() => setIsPressed(true), []),
        onMouseUp: useCallback(() => setIsPressed(false), []),
        onMouseLeave: useCallback(() => setIsPressed(false), []),
        onTouchStart: useCallback(() => setIsPressed(true), []),
        onTouchEnd: useCallback(() => setIsPressed(false), []),
    };

    const style = {
        transform: isPressed ? `scale(${depth})` : 'scale(1)',
        transition: 'transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        willChange: 'transform',
    };

    return { handlers, style, isPressed };
};

export default usePressDepth;
