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
                    client_name: 'Dr. Pinduca',
                    project_title: 'Protocolo de Detecção de Curiosos',
                    status: 'TROLLED',
                    content_json: {
                        intro: 'Ah, que bonitinho, você quebrou o bypass que era existente no código, você é bem inteligente hein? 😉',
                        sections: [
                            {
                                title: 'Análise de Segurança Interna',
                                content: 'Identificamos um acesso via código legado. Parabéns pela persistência, mas os dados reais continuam protegidos.',
                                bullets: ['Acesso via 000000 detectado', 'Geração de proposta fake concluída', 'Nível de curiosidade: Máximo']
                            }
                        ],
                        investment: { value: 'R$ 0,00', details: 'A inteligência não tem preço, mas a curiosidade custou seu tempo!' }
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
