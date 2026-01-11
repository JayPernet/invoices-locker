import React from 'react';
import { cn } from '../../utils/cn';

export const Card = ({ children, variant = 'default', glow = false, className, ...props }) => {
    const variants = {
        default: "bg-obsidian-light/80 backdrop-blur-xl border border-white/5",
        elevated: "bg-obsidian-accent shadow-[0_20px_40px_rgba(0,0,0,0.4)] border border-white/5",
        subtle: "bg-transparent border border-white/5",
    };

    return (
        <div
            className={cn(
                "rounded-lg p-10 transition-all duration-300",
                variants[variant],
                glow && "shadow-[0_0_20px_rgba(0,255,148,0.15)] border-primary/20 hover:shadow-[0_0_30px_rgba(0,255,148,0.25)]",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};
