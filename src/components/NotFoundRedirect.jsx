import React, { useEffect, useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { Text, Heading } from '../components/ui/Typography';
import { motion } from 'framer-motion';

export const NotFoundRedirect = () => {
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    window.location.href = 'https://stariaup.com.br';
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <MainLayout>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-6"
            >
                <div className="space-y-2">
                    <Text variant="mono" className="text-primary">ERRO 404</Text>
                    <Heading level="h1" className="text-4xl">
                        Rota Não Localizada
                    </Heading>
                </div>

                <Text className="text-white/60 max-w-md mx-auto">
                    O endereço solicitado não existe ou foi removido.
                    Redirecionando para a página inicial...
                </Text>

                <div className="flex items-center justify-center gap-3 pt-8">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse-fast"></div>
                    <Text variant="mono" className="text-primary text-2xl font-bold">
                        {countdown}s
                    </Text>
                </div>
            </motion.div>
        </MainLayout>
    );
};
