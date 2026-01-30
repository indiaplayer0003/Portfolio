import { memo } from 'react';
import Section from '../ui/Section';
import GlassCard from '../ui/GlassCard';
import { motion } from 'framer-motion';

const Contact = memo(() => {
    return (
        <Section id="contact" className="min-h-[50vh] flex flex-col justify-center text-center">
            <GlassCard className="p-12 md:p-20 max-w-3xl mx-auto">
                <motion.h2
                    className="text-4xl md:text-6xl font-bold mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    Let's Work Together
                </motion.h2>

                <p className="text-xl text-secondary mb-10 max-w-lg mx-auto">
                    Have a project in mind? Looking for a partner to build something incredible? Let's chat.
                </p>

                <a
                    href="mailto:hello@example.com"
                    className="inline-block px-10 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-white/90 transition-colors hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                    style={{ willChange: 'transform' }}
                >
                    Say Hello
                </a>
            </GlassCard>
        </Section>
    );
});

Contact.displayName = 'Contact';

export default Contact;
