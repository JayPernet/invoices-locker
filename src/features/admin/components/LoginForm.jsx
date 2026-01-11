import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { Label } from '../../../components/ui/Label';
import { Card } from '../../../components/ui/Card';
import { Heading, Text } from '../../../components/ui/Typography';

export const LoginForm = ({ onLogin, error: externalError, isLoading }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(email, password);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-obsidian p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <Card glow className="p-8">
                    <div className="text-center mb-8">
                        <Heading level="h2" className="text-2xl uppercase tracking-wider text-primary mb-2">
                            Admin Access
                        </Heading>
                        <Text variant="small" className="text-white/40 uppercase tracking-widest">
                            The Factory // Secure Login
                        </Text>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@stariaup.com"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        {externalError && (
                            <Text variant="small" className="text-red-400 text-center">
                                {externalError}
                            </Text>
                        )}

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? 'AUTHENTICATING...' : 'ENTER THE FACTORY'}
                        </Button>
                    </form>
                </Card>
            </motion.div>
        </div>
    );
};
