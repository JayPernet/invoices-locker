import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../../components/ui/Card';
import { Text, Heading } from '../../../components/ui/Typography';
import { formatStatus } from '../../../utils/formatters';

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export const InvestmentPanel = ({ investment, status, onAccept }) => (
    <div className="space-y-8">
        <motion.div variants={item}>
            <Card glow className="p-8">
                <Text variant="mono" className="mb-4">INVESTIMENTO ESTIMADO</Text>

                {/* Itemized Budget */}
                {investment?.items && investment.items.length > 0 && (
                    <div className="mb-6 space-y-2 pb-4 border-b border-white/10">
                        {investment.items.map((budgetItem, idx) => (
                            <div key={idx} className="flex justify-between items-center">
                                <Text variant="small" className="text-white/60">{budgetItem.description}</Text>
                                <Text variant="small" className="text-primary font-mono">{budgetItem.value}</Text>
                            </div>
                        ))}
                    </div>
                )}

                <Heading level="h3" className="text-4xl mb-2">
                    {investment?.value || "Sob Consulta"}
                </Heading>
                <Text variant="small" className="mb-6">
                    {investment?.details || "Pagamento estruturado por etapas de entrega."}
                </Text>

                <button
                    type="button"
                    onClick={onAccept}
                    onTouchEnd={(e) => {
                        e.preventDefault();
                        onAccept();
                    }}
                    className="w-full py-4 bg-primary text-obsidian font-bold rounded uppercase tracking-wider hover:bg-white transition-all shadow-emerald-glow touch-manipulation"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                    Aceitar Proposta
                </button>
            </Card>
        </motion.div>

        <motion.div variants={item} className="p-8 border-l-2 border-primary/20 space-y-4">
            <Text variant="mono" className="text-white/30">STATUS DA PROPOSTA</Text>
            <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-primary animate-pulse-fast rounded-full"></span>
                <span className="text-sm uppercase tracking-widest text-primary font-bold">
                    {formatStatus(status)}
                </span>
            </div>
        </motion.div>
    </div>
);
