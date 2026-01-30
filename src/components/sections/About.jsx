import { memo, useMemo } from 'react';
import Section from '../ui/Section';
import GlassCard from '../ui/GlassCard';
import { motion } from 'framer-motion';

const skills = [
    "React", "TypeScript", "Tailwind CSS", "Next.js", "Framer Motion", "Node.js", "WebGL", "Figma"
];

const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (delay) => ({
        opacity: 1,
        x: 0,
        transition: { delay, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
    })
};

const skillVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (delay) => ({
        opacity: 1,
        scale: 1,
        transition: { delay, duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
    })
};

const About = memo(() => {
    const skillItems = useMemo(() => skills.map((skill, index) => (
        <motion.span
            key={skill}
            className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/80"
            style={{ willChange: 'transform, opacity' }}
            variants={skillVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={index * 0.04}
        >
            {skill}
        </motion.span>
    )), []);

    return (
        <Section id="about">
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                    <motion.h2
                        className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50"
                        variants={textVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0}
                    >
                        Crafting Digital <br />
                        <span className="italic font-light text-white/40">Experiences</span>
                    </motion.h2>

                    <motion.p
                        className="text-secondary text-lg leading-relaxed"
                        variants={textVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0.08}
                    >
                        I am a passionate developer who bridges the gap between design and engineering. My philosophy is simple: software should not only work flawlessly but also feel organic and alive.
                    </motion.p>

                    <motion.p
                        className="text-secondary text-lg leading-relaxed"
                        variants={textVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0.16}
                    >
                        With a focus on performance and accessibility, I build applications that are as robust as they are beautiful.
                    </motion.p>
                </div>

                <GlassCard className="p-8">
                    <h3 className="text-xl font-semibold mb-6 text-white/90">Technologies</h3>
                    <div className="flex flex-wrap gap-3">
                        {skillItems}
                    </div>
                </GlassCard>
            </div>
        </Section>
    );
});

About.displayName = 'About';

export default About;
