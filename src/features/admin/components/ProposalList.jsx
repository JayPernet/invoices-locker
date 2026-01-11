import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Heading, Text } from '../../../components/ui/Typography';

const formatCurrency = (value) => {
    if (!value) return '-';
    return value;
};

const formatDate = (date) => {
    if (!date) return 'Sem validade';
    const d = new Date(date);
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

const getStatusBadge = (proposal) => {
    if (proposal.expires_at && new Date(proposal.expires_at) < new Date()) {
        return <span className="px-2 py-1 text-xs uppercase tracking-wider bg-red-500/10 text-red-400 border border-red-500/20 rounded">Expirado</span>;
    }
    return <span className="px-2 py-1 text-xs uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 rounded">Online</span>;
};

export const ProposalList = ({ proposals, onEdit, onDelete, onCopyLink, onDuplicate, onViewPin, isLoading }) => {
    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Text className="text-white/40 animate-pulse">Carregando propostas...</Text>
            </div>
        );
    }

    if (!proposals || proposals.length === 0) {
        return (
            <Card className="p-12 text-center">
                <Text className="text-white/40">Nenhuma proposta encontrada</Text>
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            {proposals.map((proposal, index) => (
                <motion.div
                    key={proposal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                >
                    <Card className="p-6 hover:border-primary/20 transition-all">
                        <div className="grid grid-cols-12 gap-4 items-center">
                            {/* Client & Project */}
                            <div className="col-span-12 md:col-span-4">
                                <Text variant="small" className="text-white/40 uppercase tracking-widest mb-1">
                                    Cliente
                                </Text>
                                <Heading level="h4" className="text-lg">
                                    {proposal.client_name}
                                </Heading>
                                <Text variant="small" className="text-white/60">
                                    {proposal.project_title}
                                </Text>
                            </div>

                            {/* Investment */}
                            <div className="col-span-6 md:col-span-2">
                                <Text variant="small" className="text-white/40 uppercase tracking-widest mb-1">
                                    Valor
                                </Text>
                                <Text className="font-mono text-primary">
                                    {formatCurrency(proposal.content_json?.investment?.value)}
                                </Text>
                            </div>

                            {/* Expiry */}
                            <div className="col-span-6 md:col-span-2">
                                <Text variant="small" className="text-white/40 uppercase tracking-widest mb-1">
                                    Validade
                                </Text>
                                <Text variant="small">
                                    {formatDate(proposal.expires_at)}
                                </Text>
                            </div>

                            {/* Status */}
                            <div className="col-span-6 md:col-span-2">
                                <Text variant="small" className="text-white/40 uppercase tracking-widest mb-1">
                                    Status
                                </Text>
                                {getStatusBadge(proposal)}
                            </div>

                            {/* Actions */}
                            <div className="col-span-12 md:col-span-2 flex gap-2 justify-end">
                                <Button
                                    variant="ghost"
                                    onClick={() => onCopyLink(proposal)}
                                    className="text-xs py-2 px-3"
                                    title="Copiar Link"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                </Button>
                                <Button
                                    variant="ghost"
                                    onClick={() => onViewPin(proposal)}
                                    className="text-xs py-2 px-3"
                                    title="Ver PIN"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                    </svg>
                                </Button>
                                <Button
                                    variant="ghost"
                                    onClick={() => onDuplicate(proposal)}
                                    className="text-xs py-2 px-3"
                                    title="Duplicar"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                                    </svg>
                                </Button>
                                <Button
                                    variant="ghost"
                                    onClick={() => onEdit(proposal)}
                                    className="text-xs py-2 px-3"
                                    title="Editar"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={() => onDelete(proposal)}
                                    className="text-xs py-2 px-3"
                                    title="Arquivar"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </Button>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
};
