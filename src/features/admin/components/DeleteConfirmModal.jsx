import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Heading, Text } from '../../../components/ui/Typography';

export const DeleteConfirmModal = ({ isOpen, proposal, onConfirm, onCancel, isLoading }) => {
    if (!isOpen || !proposal) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={onCancel}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="max-w-md w-full"
                >
                    <Card glow className="p-8">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded mx-auto flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <Heading level="h3" className="text-xl uppercase tracking-wider text-red-400 mb-2">
                                Confirmar Arquivamento
                            </Heading>
                            <Text variant="small" className="text-white/60">
                                Esta ação não pode ser desfeita facilmente
                            </Text>
                        </div>

                        <div className="bg-obsidian-light p-4 rounded border border-white/5 mb-6">
                            <Text variant="small" className="text-white/40 uppercase tracking-widest mb-2">
                                Proposta
                            </Text>
                            <Text className="font-bold">{proposal.client_name}</Text>
                            <Text variant="small" className="text-white/60">{proposal.project_title}</Text>
                        </div>

                        <Text variant="small" className="text-white/60 mb-6 text-center">
                            O link público desta proposta deixará de funcionar imediatamente. O registro será arquivado e não aparecerá mais na lista.
                        </Text>

                        <div className="flex gap-4">
                            <Button
                                onClick={onCancel}
                                variant="ghost"
                                className="flex-1"
                                disabled={isLoading}
                            >
                                Cancelar
                            </Button>
                            <Button
                                onClick={onConfirm}
                                variant="destructive"
                                className="flex-1"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Arquivando...' : 'Arquivar'}
                            </Button>
                        </div>
                    </Card>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
