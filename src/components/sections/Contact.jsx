import { memo } from 'react';
import Section from '../ui/Section';
import GlassCard from '../ui/GlassCard';
import MagneticButton from '../ui/MagneticButton';
import { motion } from 'framer-motion';

const Contact = memo(() => {
    return (
        <Section id="contact" className="min-h-[50vh] flex flex-col justify-center text-center">
            <GlassCard className="p-12 md:p-20 max-w-3xl mx-auto shadow-z4">
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

                <MagneticButton
                    href="mailto:hello@example.com"
                    variant="cta"
                    magneticStrength={0.15}
                    magneticRadius={80}
                >
                    Say Hello
                </MagneticButton>
            </GlassCard>
        </Section>
    );
});

Contact.displayName = 'Contact';

export default Contact;
