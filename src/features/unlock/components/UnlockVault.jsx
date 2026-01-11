import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../../../components/ui/Card';
import { Heading, Text } from '../../../components/ui/Typography';
import { PinInput } from './PinInput';

const vaultVariants = {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.2, 1, 0.3, 1] }
    },
    exit: {
        opacity: 0,
        scale: 1.1,
        filter: 'blur(40px)',
        transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
    }
};

export const UnlockVault = ({ onUnlock, isLoading, error: externalError }) => {
    const [internalError, setInternalError] = useState(null);
    const [currentPin, setCurrentPin] = useState('');

    const handleComplete = async (code) => {
        setInternalError(null);
        const success = await onUnlock(code);
        if (!success) {
            setInternalError("Acesso Negado");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-obsidian/60 backdrop-blur-[40px]">
            <motion.div
                variants={vaultVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full max-w-md"
            >
                <Card glow className="relative overflow-hidden group">
                    {/* Technical scanning line effect */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-primary/20 animate-[scan_3s_linear_infinite]" />

                    <div className="text-center space-y-10">
                        <div className="space-y-4">
                            <div className="w-16 h-16 bg-primary/10 border border-primary/20 rounded mx-auto flex items-center justify-center">
                                <div className={cn(
                                    "w-2 h-2 rounded-full transition-all duration-500",
                                    isLoading ? "bg-primary animate-ping" : "bg-primary/40"
                                )} />
                            </div>

                            <div className="space-y-2">
                                <Heading level="h2" className="text-2xl uppercase tracking-[0.2em] text-white">
                                    Acesse seu orçamento
                                </Heading>
                                <Text variant="small" className="uppercase tracking-widest opacity-40">
                                    Ambiente Seguro e Exclusivo
                                </Text>
                            </div>
                        </div>


                        <div className="space-y-6">
                            <PinInput
                                onComplete={handleComplete}
                                disabled={isLoading}
                                error={internalError || externalError}
                                onPinChange={setCurrentPin}
                            />

                            <button
                                onClick={() => currentPin.length === 6 && handleComplete(currentPin)}
                                disabled={isLoading || currentPin.length !== 6}
                                className="w-full py-4 bg-primary text-obsidian font-bold rounded uppercase tracking-wider hover:bg-white transition-all shadow-emerald-glow disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'VALIDANDO...' : 'DESBLOQUEAR'}
                            </button>
                        </div>

                        <Text variant="small" className="pt-4 text-white/20 font-mono">
                            DIGITE SUA CHAVE DE ACESSO
                        </Text>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
};

// Helper inside file for simplicity since it's unique to this view
function cn(...inputs) {
    return inputs.filter(Boolean).join(' ');
}
