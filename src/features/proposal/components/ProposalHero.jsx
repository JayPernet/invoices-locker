import React from 'react';
import { motion } from 'framer-motion';
import { Heading, Text } from '../../../components/ui/Typography';
import ReactMarkdown from 'react-markdown';

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
            <div className="max-w-2xl text-xl text-white/70 prose prose-invert prose-lg 
                prose-p:my-4 prose-p:leading-relaxed
                prose-strong:text-white prose-strong:font-semibold 
                prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-4 prose-ol:space-y-2
                prose-ul:list-disc prose-ul:pl-6 prose-ul:my-4 prose-ul:space-y-2
                prose-li:text-white/70 prose-li:leading-relaxed">
                <ReactMarkdown>{intro}</ReactMarkdown>
            </div>
        </motion.div>
    </header>
);
