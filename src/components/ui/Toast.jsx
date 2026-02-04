import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Toast = ({ message, type = 'success', isVisible, onClose }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    const variants = {
        success: {
            bg: 'bg-obsidian-light/90',
            border: 'border-primary/50',
            glow: 'shadow-[0_0_20px_rgba(0,255,148,0.3)]',
            icon: '✓'
        },
        error: {
            bg: 'bg-obsidian-light/90',
            border: 'border-red-500/50',
            glow: 'shadow-[0_0_20px_rgba(239,68,68,0.3)]',
            icon: '✕'
        }
    };

    const style = variants[type];

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="fixed bottom-8 right-8 z-50"
                >
                    <div
                        className={`
                            ${style.bg} ${style.border} ${style.glow}
                            backdrop-blur-xl border rounded-lg
                            px-6 py-4 flex items-center gap-3
                            min-w-[320px]
                        `}
                    >
                        <div className={`
                            w-8 h-8 rounded-full flex items-center justify-center
                            ${type === 'success' ? 'bg-primary/20 text-primary' : 'bg-red-500/20 text-red-500'}
                            font-bold text-lg
                        `}>
                            {style.icon}
                        </div>
                        <p className="text-white font-body flex-1">{message}</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
