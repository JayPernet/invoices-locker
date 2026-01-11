import React from 'react';
import { motion } from 'framer-motion';

const variants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 }
};

export const FloatingAction = ({ active, proposal }) => {
    if (!active || !proposal) return null;

    const handleQuestion = async () => {
        const webhookUrl = import.meta.env.VITE_WEBHOOK_PROPOSAL_ACCEPTED;

        try {
            await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'question',
                    proposal_id: proposal.id,
                    client_name: proposal.client_name,
                    project_title: proposal.project_title,
                    timestamp: new Date().toISOString()
                })
            });
        } catch (error) {
            console.error('Webhook error:', error);
        }

        // Open WhatsApp
        const phone = '5547988109155';
        const message = encodeURIComponent(
            `Olá! Tenho dúvidas sobre a proposta para *${proposal.client_name}*.`
        );
        window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    };

    return (
        <motion.button
            variants={variants}
            initial="hidden"
            animate="visible"
            onClick={handleQuestion}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-white text-black rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex items-center justify-center cursor-pointer transition-shadow hover:shadow-[0_12px_40px_rgba(255,255,255,0.3)] border-none outline-none"
            aria-label="Tirar dúvida"
        >
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM13 18h-2v-2h2v2zm0-4h-2V6h2v8z" />
            </svg>
        </motion.button>
    );
};
