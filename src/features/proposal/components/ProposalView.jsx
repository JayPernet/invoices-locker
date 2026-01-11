import React from 'react';
import { motion } from 'framer-motion';
import { ProposalHero } from './ProposalHero';
import { ProposalSection } from './ProposalSection';
import { InvestmentPanel } from './InvestmentPanel';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
};

export const ProposalView = ({ data, isLocked, onAccept }) => {
    if (!data) return null;

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className={`relative w-full h-full overflow-y-auto scrollbar-hide transition-all duration-1000 ${isLocked ? 'blur-[60px] opacity-30 select-none pointer-events-none scale-[0.98]' : 'blur-0 opacity-100'
                }`}
        >
            <div className="max-w-[1280px] mx-auto px-[clamp(24px,6vw,64px)] py-[clamp(40px,6vw,80px)]">

                <ProposalHero
                    clientName={data.client_name}
                    title={data.project_title}
                    intro={data.content_json?.intro}
                />

                <div className="grid grid-cols-12 gap-8 items-start">
                    {/* Content Column */}
                    <div className="col-span-12 lg:col-span-7 space-y-24">
                        {data.content_json?.sections?.map((section, idx) => (
                            <ProposalSection key={idx} {...section} />
                        ))}
                    </div>

                    {/* Sidebar Column */}
                    <div className="col-span-12 lg:col-span-4 lg:col-start-9">
                        <InvestmentPanel
                            investment={data.content_json?.investment}
                            status={data.status}
                            onAccept={onAccept}
                        />
                    </div>
                </div>

            </div>
        </motion.div>
    );
};
