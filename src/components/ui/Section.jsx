import { memo } from 'react';

const Section = memo(({ id, className = "", children }) => {
    return (
        <section
            id={id}
            className={`max-w-7xl mx-auto px-6 py-20 md:py-32 ${className}`}
            style={{ contain: 'layout style' }}
        >
            {children}
        </section>
    );
});

Section.displayName = 'Section';

export default Section;
