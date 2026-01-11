import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { Label } from '../../../components/ui/Label';
import { TextArea } from '../../../components/ui/TextArea';
import { Card } from '../../../components/ui/Card';
import { Heading, Text } from '../../../components/ui/Typography';

export const ProposalForm = ({ onSubmit, isLoading, initialData, onCancel }) => {
    const [formData, setFormData] = useState({
        client_name: '',
        project_title: '',
        intro: '',
        investment_value: '',
        investment_currency: 'R$',
        investment_details: '',
        expires_at: '',
        sections: [{ title: '', content: '', bullets: '' }],
        budget_items: [] // New: itemized budget
    });

    // Load initial data for edit mode
    useEffect(() => {
        if (initialData) {
            // Extract currency from value if present
            const valueStr = initialData.content_json?.investment?.value || '';
            const currencyMatch = valueStr.match(/^(R\$|\$|BTC|€)/);
            const currency = currencyMatch ? currencyMatch[1] : 'R$';
            const numericValue = valueStr.replace(/^(R\$|\$|BTC|€)\s*/, '');

            setFormData({
                client_name: initialData.client_name || '',
                project_title: initialData.project_title || '',
                intro: initialData.content_json?.intro || '',
                investment_value: numericValue,
                investment_currency: currency,
                investment_details: initialData.content_json?.investment?.details || '',
                expires_at: initialData.expires_at ? new Date(initialData.expires_at).toISOString().slice(0, 16) : '',
                sections: initialData.content_json?.sections || [{ title: '', content: '', bullets: '' }],
                budget_items: initialData.content_json?.investment?.items || []
            });
        }
    }, [initialData]);

    const [result, setResult] = useState(null);

    const handleAddSection = () => {
        setFormData({
            ...formData,
            sections: [...formData.sections, { title: '', content: '', bullets: '' }]
        });
    };

    const handleRemoveSection = (index) => {
        setFormData({
            ...formData,
            sections: formData.sections.filter((_, i) => i !== index)
        });
    };

    const handleSectionChange = (index, field, value) => {
        const newSections = [...formData.sections];
        newSections[index][field] = value;
        setFormData({ ...formData, sections: newSections });
    };

    const handleAddBudgetItem = () => {
        setFormData({
            ...formData,
            budget_items: [...formData.budget_items, { description: '', value: '' }]
        });
    };

    const handleRemoveBudgetItem = (index) => {
        setFormData({
            ...formData,
            budget_items: formData.budget_items.filter((_, i) => i !== index)
        });
    };

    const handleBudgetItemChange = (index, field, value) => {
        const newItems = [...formData.budget_items];
        newItems[index][field] = value;
        setFormData({ ...formData, budget_items: newItems });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Combine currency + value
        const formattedValue = formData.investment_value
            ? `${formData.investment_currency} ${formData.investment_value}`
            : '';

        // Transform bullets from semicolon-separated to array
        const processedData = {
            ...formData,
            investment_value: formattedValue,
            expires_at: formData.expires_at || null,
            sections: formData.sections.map(section => ({
                ...section,
                bullets: section.bullets ? section.bullets.split(';').map(b => b.trim()).filter(Boolean) : []
            })),
            budget_items: formData.budget_items.filter(item => item.description && item.value) // Only include filled items
        };

        const result = await onSubmit(processedData, initialData?.id);
        if (result) {
            setResult(result);
        }
    };

    const generateSlug = (name) => {
        return name
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

    const handleCopyLink = () => {
        const slug = generateSlug(result.data.client_name);
        const link = `${window.location.origin}/propostas/${slug}/${result.uuid}`;
        navigator.clipboard.writeText(link);
    };

    if (result) {
        const slug = generateSlug(result.data.client_name);
        const link = `${window.location.origin}/propostas/${slug}/${result.uuid}`;

        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl mx-auto"
            >
                <Card glow className="p-8 text-center">
                    <div className="mb-6">
                        <div className="w-16 h-16 bg-primary/10 border border-primary/20 rounded mx-auto flex items-center justify-center mb-4">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        </div>
                        <Heading level="h2" className="text-2xl uppercase tracking-wider text-primary mb-2">
                            Proposta Criada
                        </Heading>
                        <Text variant="small" className="text-white/40">
                            Sistema de Acesso Gerado
                        </Text>
                    </div>

                    <div className="space-y-4 mb-6">
                        <div className="bg-obsidian-light p-4 rounded border border-white/5">
                            <Label>PIN de Acesso (Confidencial)</Label>
                            <Text className="text-3xl font-mono text-primary tracking-widest">
                                {result.pin}
                            </Text>
                            <Text variant="small" className="text-red-400 mt-2">
                                * Envie este PIN separadamente (ex: WhatsApp)
                            </Text>
                        </div>

                        <div className="bg-obsidian-light p-4 rounded border border-white/5">
                            <Label>Link de Acesso (Público)</Label>
                            <Text variant="small" className="font-mono text-white/60 break-all">
                                {link}
                            </Text>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Button onClick={handleCopyLink} className="flex-1">
                            Copiar Link
                        </Button>
                        <Button onClick={() => setResult(null)} variant="ghost" className="flex-1">
                            Nova Proposta
                        </Button>
                    </div>
                </Card>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
            <Card className="p-6">
                <Heading level="h3" className="text-xl uppercase tracking-wider text-primary mb-6">
                    Informações Básicas
                </Heading>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Label htmlFor="client_name">Nome do Cliente</Label>
                        <Input
                            id="client_name"
                            value={formData.client_name}
                            onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <div>
                        <Label htmlFor="project_title">Título do Projeto</Label>
                        <Input
                            id="project_title"
                            value={formData.project_title}
                            onChange={(e) => setFormData({ ...formData, project_title: e.target.value })}
                            required
                            disabled={isLoading}
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <Label htmlFor="intro">Introdução</Label>
                    <TextArea
                        id="intro"
                        value={formData.intro}
                        onChange={(e) => setFormData({ ...formData, intro: e.target.value })}
                        rows={3}
                        disabled={isLoading}
                    />
                </div>

                <div className="mt-6">
                    <Label htmlFor="expires_at">Validade (Opcional)</Label>
                    <Input
                        type="datetime-local"
                        id="expires_at"
                        value={formData.expires_at}
                        onChange={(e) => setFormData({ ...formData, expires_at: e.target.value })}
                        disabled={isLoading}
                    />
                    <Text variant="small" className="text-white/40 mt-1">
                        Deixe em branco para proposta sem validade
                    </Text>
                </div>
            </Card>

            <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <Heading level="h3" className="text-xl uppercase tracking-wider text-primary">
                        Seções de Conteúdo
                    </Heading>
                    <Button type="button" onClick={handleAddSection} variant="ghost" disabled={isLoading}>
                        + Adicionar Seção
                    </Button>
                </div>

                <div className="space-y-6">
                    {formData.sections.map((section, index) => (
                        <div key={index} className="p-4 bg-obsidian-light rounded border border-white/5">
                            <div className="flex items-center justify-between mb-4">
                                <Text variant="small" className="text-white/40 uppercase tracking-widest">
                                    Seção {index + 1}
                                </Text>
                                {formData.sections.length > 1 && (
                                    <Button
                                        type="button"
                                        onClick={() => handleRemoveSection(index)}
                                        variant="destructive"
                                        className="text-xs py-1 px-3"
                                        disabled={isLoading}
                                    >
                                        Remover
                                    </Button>
                                )}
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor={`section_title_${index}`}>Título</Label>
                                    <Input
                                        id={`section_title_${index}`}
                                        value={section.title}
                                        onChange={(e) => handleSectionChange(index, 'title', e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>

                                <div>
                                    <Label htmlFor={`section_content_${index}`}>Conteúdo</Label>
                                    <TextArea
                                        id={`section_content_${index}`}
                                        value={section.content}
                                        onChange={(e) => handleSectionChange(index, 'content', e.target.value)}
                                        rows={3}
                                        disabled={isLoading}
                                    />
                                </div>

                                <div>
                                    <Label htmlFor={`section_bullets_${index}`}>Bullets (separados por ponto e vírgula)</Label>
                                    <Input
                                        id={`section_bullets_${index}`}
                                        value={section.bullets}
                                        onChange={(e) => handleSectionChange(index, 'bullets', e.target.value)}
                                        placeholder="Item 1; Item 2; Item 3"
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            <Card className="p-6">
                <Heading level="h3" className="text-xl uppercase tracking-wider text-primary mb-6">
                    Investimento
                </Heading>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Label htmlFor="investment_value">Valor</Label>
                        <div className="flex gap-2">
                            <select
                                value={formData.investment_currency}
                                onChange={(e) => setFormData({ ...formData, investment_currency: e.target.value })}
                                disabled={isLoading}
                                className="bg-obsidian-light border border-white/10 text-white px-3 py-2 rounded focus:outline-none focus:border-primary/50 transition-colors"
                            >
                                <option value="R$">R$</option>
                                <option value="$">$</option>
                                <option value="€">€</option>
                                <option value="BTC">BTC</option>
                            </select>
                            <Input
                                id="investment_value"
                                value={formData.investment_value}
                                onChange={(e) => setFormData({ ...formData, investment_value: e.target.value })}
                                placeholder="48.000,00"
                                required
                                disabled={isLoading}
                                className="flex-1"
                            />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="investment_details">Detalhes</Label>
                        <Input
                            id="investment_details"
                            value={formData.investment_details}
                            onChange={(e) => setFormData({ ...formData, investment_details: e.target.value })}
                            placeholder="Setup + 12 meses inclusos"
                            disabled={isLoading}
                        />
                    </div>
                </div>

                {/* Itemized Budget Section */}
                <div className="mt-8">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <Text variant="mono" className="text-primary text-sm">ITENS DO ORÇAMENTO (OPCIONAL)</Text>
                            <Text variant="small" className="text-white/40 mt-1">
                                Liste os itens individuais. O valor total acima pode ser diferente (ancoragem de preço).
                            </Text>
                        </div>
                        <Button type="button" variant="ghost" onClick={handleAddBudgetItem} disabled={isLoading}>
                            + Adicionar Item
                        </Button>
                    </div>

                    {formData.budget_items.length > 0 && (
                        <div className="space-y-3">
                            {formData.budget_items.map((item, index) => (
                                <div key={index} className="grid grid-cols-12 gap-3 items-end">
                                    <div className="col-span-7">
                                        <Input
                                            value={item.description}
                                            onChange={(e) => handleBudgetItemChange(index, 'description', e.target.value)}
                                            placeholder="Descrição do item"
                                            disabled={isLoading}
                                        />
                                    </div>
                                    <div className="col-span-4">
                                        <Input
                                            value={item.value}
                                            onChange={(e) => handleBudgetItemChange(index, 'value', e.target.value)}
                                            placeholder="R$ 1.000"
                                            disabled={isLoading}
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            onClick={() => handleRemoveBudgetItem(index)}
                                            disabled={isLoading}
                                            className="w-full py-2"
                                        >
                                            ×
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </Card>

            <div className="flex justify-end">
                <Button type="submit" disabled={isLoading} className="px-12">
                    {isLoading ? 'GERANDO...' : 'DEPLOY PROPOSAL'}
                </Button>
            </div>
        </form>
    );
};
