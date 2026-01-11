import React from 'react';
import { motion } from 'framer-motion';
import { Heading, Text } from '../../../components/ui/Typography';

const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.2, 1, 0.3, 1] }
    }
};

export const ProposalHero = ({ clientName, title, intro }) => (
    <header className="mb-24">
        <motion.div variants={item}>
            <Text variant="mono" className="mb-6">
                Proposta Exclusiva // {clientName}
            </Text>
        </motion.div>

        <motion.div variants={item}>
            <Heading level="h1" className="mb-8 max-w-4xl">
                {title}
            </Heading>
        </motion.div>

        <motion.div variants={item}>
            <Text className="max-w-2xl text-xl text-white/50">
                {intro}
            </Text>
        </motion.div>
    </header>
);
