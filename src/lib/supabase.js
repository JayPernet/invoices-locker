import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Fetches ONLY public metadata for a proposal (locked state).
 * Does NOT return content_json or access_code.
 * @param {string} proposalId - UUID of the proposal
 * @returns {Promise<Object|null>} Public metadata or null if not found/expired
 */
export async function fetchProposalPublicMetadata(proposalId) {
    if (!proposalId || typeof proposalId !== 'string') {
        console.error('Invalid proposal ID');
        return null;
    }

    const { data, error } = await supabase.rpc('get_proposal_public_metadata', {
        p_id: proposalId
    });

    if (error) {
        console.error('Error fetching proposal metadata:', error);
        return null;
    }

    return data?.[0] || null;
}

/**
 * Fetches a proposal by its access code using a secure RPC call.
 * This prevents exposure of all proposals to the client.
 * @param {string} code - 6-digit PIN
 * @returns {Promise<Object|null>} Full proposal or null
 */
export async function fetchProposalByCode(code) {
    if (!code || typeof code !== 'string') {
        console.error('Invalid access code');
        return null;
    }

    const { data, error } = await supabase.rpc('get_proposal_by_code', {
        p_code: code
    });

    if (error) {
        console.error('Error fetching proposal:', error);
        throw error;
    }

    return data?.[0] || null;
}

/**
 * Tracks an interaction event in the analytics table.
 * @param {string} proposalId - UUID
 * @param {string} eventType - 'unlock' | 'view' | 'accept' | 'question'
 * @param {Object} metadata - Additional event data
 */
export async function trackEvent(proposalId, eventType, metadata = {}) {
    const { error } = await supabase
        .from('proposal_analytics')
        .insert([
            {
                proposal_id: proposalId,
                event_type: eventType,
                metadata
            }
        ]);

    if (error) {
        console.warn('Failed to track event:', error);
    }
}
