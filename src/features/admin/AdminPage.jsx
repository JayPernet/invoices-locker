import React, { useState, useEffect } from 'react';
import { useAdmin } from './hooks/useAdmin';
import { LoginForm } from './components/LoginForm';
import { AdminLayout } from './components/AdminLayout';
import { ProposalForm } from './components/ProposalForm';
import { ProposalList } from './components/ProposalList';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { PinModal } from './components/PinModal';
import { MainLayout } from '../../layouts/MainLayout';
import { Button } from '../../components/ui/Button';
import { Heading } from '../../components/ui/Typography';
import { Toast } from '../../components/ui/Toast';

export const AdminPage = () => {
    const {
        session,
        loading,
        error,
        signIn,
        signOut,
        fetchProposals,
        createProposal,
        updateProposal,
        deleteProposal,
        userEmail
    } = useAdmin();

    const [view, setView] = useState('list'); // 'list' | 'form'
    const [editingProposal, setEditingProposal] = useState(null);
    const [proposals, setProposals] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loginLoading, setLoginLoading] = useState(false);
    const [pinModal, setPinModal] = useState({ isOpen: false, proposal: null });
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, proposal: null });
    const [toast, setToast] = useState({ message: '', type: 'success', isVisible: false });

    // Load proposals on mount
    useEffect(() => {
        if (session) {
            loadProposals();
        }
    }, [session]);

    const loadProposals = async () => {
        const data = await fetchProposals();
        setProposals(data);
    };

    const handleLogin = async (email, password) => {
        setLoginLoading(true);
        await signIn(email, password);
        setLoginLoading(false);
    };

    const handleCreateOrUpdate = async (formData, proposalId) => {
        setIsSubmitting(true);

        let result;
        if (proposalId) {
            // Update existing
            result = await updateProposal(proposalId, formData);
            if (result) {
                await loadProposals();
                setToast({ message: 'Proposta salva com sucesso!', type: 'success', isVisible: true });
                setView('list');
                setEditingProposal(null);
            } else {
                setToast({ message: 'Erro ao salvar proposta', type: 'error', isVisible: true });
            }
        } else {
            // Create new
            result = await createProposal(formData);
            if (!result) {
                setToast({ message: 'Erro ao criar proposta', type: 'error', isVisible: true });
            }
        }

        setIsSubmitting(false);
        return result;
    };

    const handleEdit = (proposal) => {
        setEditingProposal(proposal);
        setView('form');
    };

    const handleDelete = (proposal) => {
        setDeleteModal({ isOpen: true, proposal });
    };

    const confirmDelete = async () => {
        setIsSubmitting(true);
        const success = await deleteProposal(deleteModal.proposal.id);
        if (success) {
            await loadProposals();
            setDeleteModal({ isOpen: false, proposal: null });
        }
        setIsSubmitting(false);
    };

    const handleCopyLink = (proposal) => {
        const slug = proposal.client_name
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
        const link = `${window.location.origin}/propostas/${slug}/${proposal.id}`;
        navigator.clipboard.writeText(link);
    };

    const handleViewPin = (proposal) => {
        setPinModal({ isOpen: true, proposal });
    };

    const handleDuplicate = (proposal) => {
        // Clone proposal data without ID and timestamps
        const duplicatedData = {
            ...proposal,
            id: undefined,
            created_at: undefined,
            access_code: undefined
        };
        setEditingProposal(duplicatedData);
        setView('form');
    };

    const handleNewProposal = () => {
        setEditingProposal(null);
        setView('form');
    };

    const handleCancelForm = () => {
        setEditingProposal(null);
        setView('list');
    };

    if (loading) {
        return (
            <MainLayout>
                <div className="flex items-center justify-center h-screen">
                    <div className="text-primary text-xl uppercase tracking-widest animate-pulse">
                        Loading...
                    </div>
                </div>
            </MainLayout>
        );
    }

    if (!session) {
        return (
            <MainLayout>
                <LoginForm
                    onLogin={handleLogin}
                    error={error}
                    isLoading={loginLoading}
                />
            </MainLayout>
        );
    }

    return (
        <MainLayout scrollable={true}>
            <AdminLayout userEmail={userEmail} onSignOut={signOut}>
                {/* Header with View Toggle */}
                <div className="flex items-center justify-between mb-8">
                    <Heading level="h2" className="text-2xl uppercase tracking-wider text-primary">
                        {view === 'list' ? 'Propostas' : (editingProposal ? 'Editar Proposta' : 'Nova Proposta')}
                    </Heading>
                    {view === 'list' ? (
                        <Button onClick={handleNewProposal}>
                            + Nova Proposta
                        </Button>
                    ) : (
                        <Button variant="ghost" onClick={handleCancelForm}>
                            ← Voltar para Lista
                        </Button>
                    )}
                </div>

                {/* Content */}
                {view === 'list' ? (
                    <ProposalList
                        proposals={proposals}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onCopyLink={handleCopyLink}
                        onDuplicate={handleDuplicate}
                        onViewPin={handleViewPin}
                        isLoading={loading}
                    />
                ) : (
                    <ProposalForm
                        onSubmit={handleCreateOrUpdate}
                        isLoading={isSubmitting}
                        initialData={editingProposal}
                        onCancel={handleCancelForm}
                    />
                )}

                {error && (
                    <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-center">
                        {error}
                    </div>
                )}

                {/* PIN Modal */}
                <PinModal
                    isOpen={pinModal.isOpen}
                    proposal={pinModal.proposal}
                    onClose={() => setPinModal({ isOpen: false, proposal: null })}
                />

                {/* Delete Confirmation Modal */}
                <DeleteConfirmModal
                    isOpen={deleteModal.isOpen}
                    proposal={deleteModal.proposal}
                    onConfirm={confirmDelete}
                    onCancel={() => setDeleteModal({ isOpen: false, proposal: null })}
                    isLoading={isSubmitting}
                />

                {/* Toast Notification */}
                <Toast
                    message={toast.message}
                    type={toast.type}
                    isVisible={toast.isVisible}
                    onClose={() => setToast({ ...toast, isVisible: false })}
                />
            </AdminLayout>
        </MainLayout>
    );
};
