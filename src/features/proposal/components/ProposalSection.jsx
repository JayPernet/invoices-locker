import React from 'react';
import { motion } from 'framer-motion';
import { Heading, Text } from '../../../components/ui/Typography';

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export const ProposalSection = ({ title, content, bullets }) => (
    <motion.section variants={item} className="space-y-6">
        <div className="flex items-center gap-4">
            <span className="w-8 h-[1px] bg-primary/30"></span>
            <Heading level="h2" className="text-3xl">
                {title}
            </Heading>
        </div>

        <Text className="text-lg">
            {content}
        </Text>

        {bullets && (
            <ul className="space-y-4 pt-4">
                {bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-4 group">
                        <span className="mt-2.5 w-1.5 h-1.5 bg-primary/60 group-hover:bg-primary transition-colors"></span>
                        <Text className="text-white/80">{bullet}</Text>
                    </li>
                ))}
            </ul>
        )}
    </motion.section>
);
