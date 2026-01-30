import { memo, useMemo } from 'react';
import Section from '../ui/Section';
import GlassCard from '../ui/GlassCard';
import { motion } from 'framer-motion';

const experience = [
    {
        role: "Senior Frontend Engineer",
        company: "TechNova",
        period: "2023 - Present",
        desc: "Leading the design system migration and improving core web vitals by 40%."
    },
    {
        role: "Frontend Developer",
        company: "Flux Creative",
        period: "2021 - 2023",
        desc: "Built award-winning promotional sites for Fortune 500 clients using WebGL and React."
    },
    {
        role: "UI Engineer",
        company: "StartUp Inc",
        period: "2020 - 2021",
        desc: "Collaborated with designers to implement pixel-perfect mobile-first interfaces."
    }
];

const ExperienceCard = memo(({ job }) => (
    <GlassCard className="p-8 md:flex justify-between items-start gap-6 group hover:border-white/20 transition-colors">
        <div className="md:w-1/4 mb-4 md:mb-0">
            <span className="text-secondary text-sm font-mono block mb-1">{job.period}</span>
            <h4 className="text-lg font-semibold text-white/90">{job.company}</h4>
        </div>

        <div className="md:w-3/4">
            <h3 className="text-xl font-bold mb-2 text-accent group-hover:text-white transition-colors">{job.role}</h3>
            <p className="text-secondary leading-relaxed">
                {job.desc}
            </p>
        </div>
    </GlassCard>
));

ExperienceCard.displayName = 'ExperienceCard';

const Experience = memo(() => {
    const experienceCards = useMemo(() => experience.map((job, index) => (
        <ExperienceCard key={index} job={job} />
    )), []);

    return (
        <Section id="experience" className="max-w-4xl">
            <motion.h2
                className="text-4xl md:text-5xl font-bold mb-16 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
                Experience
            </motion.h2>

            <div className="space-y-6">
                {experienceCards}
            </div>
        </Section>
    );
});

Experience.displayName = 'Experience';

export default Experience;
