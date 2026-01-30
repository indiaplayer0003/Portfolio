import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import Section from '../ui/Section';
import MagneticButton from '../ui/MagneticButton';

const heroVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay) => ({
        opacity: 1,
        y: 0,
        transition: { delay, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    })
};

const Hero = memo(() => {
    const containerStyle = useMemo(() => ({
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden',
    }), []);

    return (
        <Section id="hero" className="min-h-[90vh] flex flex-col justify-center items-center text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative z-10"
                style={containerStyle}
            >
                <div
                    className="absolute inset-0 blur-[50px] bg-accent/20 rounded-full pointer-events-none"
                    style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
                    aria-hidden="true"
                />

                <GlassCard className="p-12 md:p-20 relative border-white/20 hover:border-white/30 transition-colors shadow-z4">
                    <motion.h1
                        className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-white/60 tracking-tight"
                        variants={heroVariants}
                        initial="hidden"
                        animate="visible"
                        custom={0.15}
                    >
                        Tanay <span className="text-white/40">and Tarun</span>
                    </motion.h1>

                    <motion.p
                        className="mt-6 text-xl md:text-2xl text-secondary max-w-2xl mx-auto font-light leading-relaxed"
                        variants={heroVariants}
                        initial="hidden"
                        animate="visible"
                        custom={0.3}
                    >
                        Frontend Engineer specializing in <span className="text-white/90 font-normal">high-performance</span> React applications and <span className="text-white/90 font-normal">liquid interfaces</span>.
                    </motion.p>

                    <motion.div
                        className="mt-10 flex gap-4 justify-center flex-wrap"
                        variants={heroVariants}
                        initial="hidden"
                        animate="visible"
                        custom={0.45}
                    >
                        <MagneticButton href="#projects" variant="primary">
                            View Work
                        </MagneticButton>
                        <MagneticButton href="#contact" variant="secondary">
                            Contact Me
                        </MagneticButton>
                    </motion.div>
                </GlassCard>
            </motion.div>
        </Section>
    );
});

Hero.displayName = 'Hero';

export default Hero;
