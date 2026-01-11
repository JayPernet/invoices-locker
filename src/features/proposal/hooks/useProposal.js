import { useState, useEffect, useCallback } from 'react';
import { fetchProposalPublicMetadata, fetchProposalByCode, trackEvent } from '../../../lib/supabase';

export function useProposal(proposalId) {
    const [proposal, setProposal] = useState(null);
    const [publicMetadata, setPublicMetadata] = useState(null);
    const [isLocked, setIsLocked] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch public metadata on mount
    useEffect(() => {
        if (!proposalId) return;

        const loadPublicMetadata = async () => {
            setIsLoading(true);
            try {
                const metadata = await fetchProposalPublicMetadata(proposalId);
                if (metadata) {
                    setPublicMetadata(metadata);
                    // Set partial proposal data for locked view
                    setProposal({
                        id: metadata.id,
                        client_name: metadata.client_name,
                        project_title: metadata.project_title,
                        status: metadata.status
                    });
                } else {
                    setError('Proposta não encontrada ou expirada.');
                }
            } catch (err) {
                setError('Erro ao carregar proposta.');
            } finally {
                setIsLoading(false);
            }
        };

        loadPublicMetadata();
    }, [proposalId]);

    const unlock = useCallback(async (code) => {
        setIsLoading(true);
        setError(null);

        try {
            // Demo code bypass
            if (code === '000000') {
                const demoData = {
                    id: 'demo-uuid',
                    client_name: 'Dr. Tacio Schmitz',
                    project_title: 'Expansão Visionária IA',
                    status: 'ONLINE',
                    content_json: {
                        intro: 'Soluções avançadas em IA para otimização de fluxos clínicos e expansão de marca.',
                        sections: [
                            {
                                title: 'Contexto e Estratégia',
                                content: 'Análise profunda da infraestrutura atual e mapeamento de gargalos em atendimento e pós-venda.',
                                bullets: ['IA para Triagem', 'Personalização de Experiência', 'Dashboard de Métricas']
                            }
                        ],
                        investment: { value: 'R$ 48.000,00', details: 'Setup + 12 meses de manutenção inclusos.' }
                    }
                };
                setProposal(demoData);
                setIsLocked(false);
                trackEvent(demoData.id, 'unlock');
                return true;
            }

            // Real unlock flow
            const data = await fetchProposalByCode(code);

            if (data) {
                setProposal(data);
                setIsLocked(false);
                trackEvent(data.id, 'unlock');
                return true;
            } else {
                setError('Código inválido ou expirado.');
                return false;
            }
        } catch (err) {
            setError('Erro crítico ao validar código.');
            return false;
        } finally {
            setIsLoading(false);
        }
    }, [proposalId]);

    return {
        proposal,
        publicMetadata,
        isLocked,
        isLoading,
        error,
        unlock
    };
}
