import { memo, useMemo } from 'react';
import Section from '../ui/Section';
import GlassCard from '../ui/GlassCard';
import { motion } from 'framer-motion';

const projects = [
    {
        title: "Liquid Dashboard",
        description: "A financial analytics dashboard with real-time data visualization and glassmorphism UI.",
        tech: ["React", "D3.js", "Tailwind"],
        color: "from-blue-500/20 to-cyan-500/20"
    },
    {
        title: "Neon Chat",
        description: "Real-time messaging platform featuring end-to-end encryption and fluid animations.",
        tech: ["Next.js", "Socket.io", "Framer Motion"],
        color: "from-purple-500/20 to-pink-500/20"
    },
    {
        title: "Aether Lens",
        description: "AI-powered image enhancement tool wrapped in a minimalistic interface.",
        tech: ["React", "TensorFlow.js", "WebGL"],
        color: "from-emerald-500/20 to-teal-500/20"
    }
];

const ProjectCard = memo(({ project }) => (
    <GlassCard
        hoverEffect
        className="group p-8 flex flex-col justify-between h-full min-h-[300px] cursor-pointer"
    >
        {/* Gradient blob - GPU optimized */}
        <div
            className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${project.color} blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            style={{ willChange: 'opacity', transform: 'translateZ(0)' }}
            aria-hidden="true"
        />

        <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
            <p className="text-secondary mb-6 leading-relaxed">
                {project.description}
            </p>
        </div>

        <div className="relative z-10 flex flex-wrap gap-2 mt-auto">
            {project.tech.map(t => (
                <span key={t} className="text-xs font-mono text-white/50 bg-white/5 px-2 py-1 rounded">
                    {t}
                </span>
            ))}
        </div>
    </GlassCard>
));

ProjectCard.displayName = 'ProjectCard';

const Projects = memo(() => {
    const projectCards = useMemo(() => projects.map((project, index) => (
        <ProjectCard key={index} project={project} />
    )), []);

    return (
        <Section id="projects">
            <motion.h2
                className="text-4xl md:text-5xl font-bold mb-16 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
                Selected Work
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projectCards}
            </div>
        </Section>
    );
});

Projects.displayName = 'Projects';

export default Projects;
