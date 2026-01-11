import React from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Heading, Text } from '../../../components/ui/Typography';

export const PinModal = ({ isOpen, proposal, onClose }) => {
    if (!isOpen || !proposal) return null;

    const copyPin = () => {
        navigator.clipboard.writeText(proposal.access_code);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-obsidian/80 backdrop-blur-sm">
            <Card glow className="max-w-md w-full p-8">
                <div className="space-y-6">
                    <div className="text-center">
                        <Heading level="h3" className="text-2xl mb-2">
                            PIN de Acesso
                        </Heading>
                        <Text variant="small" className="text-white/40">
                            {proposal.client_name} - {proposal.project_title}
                        </Text>
                    </div>

                    <div className="bg-obsidian-light p-6 rounded border border-primary/20">
                        <Text variant="mono" className="text-center text-4xl tracking-[0.5em] text-primary">
                            {proposal.access_code}
                        </Text>
                    </div>

                    <div className="flex gap-3">
                        <Button onClick={copyPin} className="flex-1">
                            Copiar PIN
                        </Button>
                        <Button variant="ghost" onClick={onClose} className="flex-1">
                            Fechar
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};
