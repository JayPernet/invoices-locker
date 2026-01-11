import React from 'react';
import { Button } from '../../../components/ui/Button';
import { Heading, Text } from '../../../components/ui/Typography';

export const AdminLayout = ({ children, userEmail, onSignOut }) => {
    return (
        <div className="min-h-screen bg-obsidian">
            {/* Header */}
            <header className="border-b border-white/5 bg-obsidian-light/50 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div>
                        <Heading level="h1" className="text-xl uppercase tracking-wider text-primary">
                            The Factory
                        </Heading>
                        <Text variant="small" className="text-white/40 uppercase tracking-widest">
                            Invoice Unlocker // Admin
                        </Text>
                    </div>

                    <div className="flex items-center gap-4">
                        <Text variant="small" className="text-white/60 font-mono">
                            {userEmail}
                        </Text>
                        <Button onClick={onSignOut} variant="ghost" className="text-xs py-2 px-4">
                            Sair
                        </Button>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-7xl mx-auto px-6 py-12">
                {children}
            </main>
        </div>
    );
};
