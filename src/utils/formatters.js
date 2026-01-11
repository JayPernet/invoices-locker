const STATUS_MAP = {
    'active': 'ONLINE',
    'ONLINE': 'ONLINE',
    'draft': 'RASCUNHO',
    'expired': 'EXPIRADO',
    'archived': 'ARQUIVADO'
};

export const formatStatus = (status) => {
    return STATUS_MAP[status] || status?.toUpperCase() || 'RASCUNHO';
};
