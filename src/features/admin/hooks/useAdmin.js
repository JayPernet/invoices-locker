import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';

export const useAdmin = () => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        });

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signIn = async (email, password) => {
        setError(null);
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            return false;
        }

        setSession(data.session);
        return true;
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        setSession(null);
    };

    const fetchProposals = async () => {
        setError(null);
        const { data, error } = await supabase
            .from('proposals')
            .select('*')
            .neq('status', 'ARCHIVED')
            .order('created_at', { ascending: false });

        if (error) {
            setError(error.message);
            return [];
        }

        return data;
    };

    const createProposal = async (proposalData) => {
        setError(null);

        // Generate UUID and PIN
        const uuid = crypto.randomUUID();
        const pin = Math.floor(100000 + Math.random() * 900000).toString();

        const { data, error } = await supabase
            .from('proposals')
            .insert([
                {
                    id: uuid,
                    access_code: pin,
                    client_name: proposalData.client_name,
                    project_title: proposalData.project_title,
                    content_json: {
                        intro: proposalData.intro || '',
                        sections: proposalData.sections || [],
                        investment: {
                            value: proposalData.investment_value,
                            details: proposalData.investment_details || '',
                            items: proposalData.budget_items || []
                        }
                    },
                    status: 'ONLINE',
                    expires_at: proposalData.expires_at || null
                }
            ])
            .select();

        if (error) {
            setError(error.message);
            return null;
        }

        return { uuid, pin, data: data[0] };
    };

    const updateProposal = async (id, proposalData) => {
        setError(null);

        const { data, error } = await supabase
            .from('proposals')
            .update({
                client_name: proposalData.client_name,
                project_title: proposalData.project_title,
                content_json: {
                    intro: proposalData.intro || '',
                    sections: proposalData.sections || [],
                    investment: {
                        value: proposalData.investment_value,
                        details: proposalData.investment_details || '',
                        items: proposalData.budget_items || []
                    }
                },
                expires_at: proposalData.expires_at || null
            })
            .eq('id', id)
            .select();

        if (error) {
            setError(error.message);
            return null;
        }

        return data[0];
    };

    const deleteProposal = async (id) => {
        setError(null);

        const { error } = await supabase
            .from('proposals')
            .update({ status: 'ARCHIVED' })
            .eq('id', id);

        if (error) {
            setError(error.message);
            return false;
        }

        return true;
    };

    return {
        session,
        loading,
        error,
        signIn,
        signOut,
        fetchProposals,
        createProposal,
        updateProposal,
        deleteProposal,
        isAuthenticated: !!session,
        userEmail: session?.user?.email
    };
};
