import React from 'react';
import { useParams } from 'react-router-dom';
import { MainLayout } from '../../layouts/MainLayout';
import { ProposalView } from './components/ProposalView';
import { UnlockVault } from '../unlock/components/UnlockVault';
import { useProposal } from './hooks/useProposal';
import { AnimatePresence } from 'framer-motion';
import { FloatingAction } from './components/FloatingAction';

export const ProposalPage = () => {
    const { proposalId } = useParams();
    const { proposal, isLocked, isLoading, error, unlock } = useProposal(proposalId);

    // Foundation data for the 'Locked' preview
    const displayData = proposal || {
        client_name: "Lead Identificado",
        project_title: "Documento Sob Sigilo",
        status: "Encapsulado",
        content_json: {
            intro: "Protocolo de segurança StarIAup ativo. Aguardando autorização de acesso nível 1.",
            sections: [
                {
                    title: "Conteúdo Protegido",
                    content: "As especificações técnicas e estratégicas desta proposta estão criptografadas até a inserção do PIN único fornecido.",
                    bullets: ["Escopo de IA", "Métricas de Performance", "Cronograma de Execução"]
                }
            ],
            investment: { value: "BLOQUEADO", details: "Disponível após desbloqueio." }
        }
    };

    const handleAccept = async () => {
        // Webhook call will be handled here
        const webhookUrl = import.meta.env.VITE_WEBHOOK_PROPOSAL_ACCEPTED;

        try {
            await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'accept',
                    proposal_id: proposal?.id,
                    client_name: proposal?.client_name,
                    project_title: proposal?.project_title,
                    timestamp: new Date().toISOString()
                })
            });

            // Open WhatsApp
            const phone = '5547988109155';
            const message = encodeURIComponent(
                `Olá! Quero *aceitar a proposta* para *${proposal?.client_name}*.`
            );
            window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
        } catch (error) {
            console.error('Webhook error:', error);
        }
    };

    return (
        <MainLayout>
            <AnimatePresence mode="wait">
                {/* Foundation Layer (Proposal) */}
                <ProposalView
                    key="proposal-view"
                    data={displayData}
                    isLocked={isLocked}
                    onAccept={handleAccept}
                />

                {/* Security Layer (Vault) */}
                {isLocked && (
                    <UnlockVault
                        key="unlock-vault"
                        onUnlock={unlock}
                        isLoading={isLoading}
                        error={error}
                    />
                )}
            </AnimatePresence>

            {/* Floating Action Button (only when unlocked) */}
            <FloatingAction active={!isLocked} proposal={proposal} />
        </MainLayout>
    );
};
