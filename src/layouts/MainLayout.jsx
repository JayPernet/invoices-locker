import React from 'react';

export const MainLayout = ({ children, scrollable = false }) => {
    return (
        <div className="fixed inset-0 bg-obsidian text-white overflow-hidden">
            {/* Global Tech Textures */}
            <div
                className="fixed inset-0 pointer-events-none z-[100] opacity-[0.04] contrast-[150%]"
                style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}
            />

            <div
                className="fixed inset-0 pointer-events-none z-[99] opacity-30"
                style={{
                    backgroundSize: '100% 4px',
                    backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)'
                }}
            />

            {/* Content Container */}
            <div className={`relative z-10 w-full h-full ${scrollable ? 'overflow-y-auto scrollbar-hide' : 'flex items-center justify-center'}`}>
                {children}
            </div>
        </div>
    );
};
