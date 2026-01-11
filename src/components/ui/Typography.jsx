import React from 'react';
import { cn } from '../../utils/cn';

export const Heading = ({ level: Tag = 'h1', children, className, ...props }) => {
    const styles = {
        h1: "text-[clamp(2.5rem,6vw,4.5rem)] font-heading leading-[1.05] tracking-[-0.04em]",
        h2: "text-[clamp(2rem,4vw,3rem)] font-heading leading-[1.1] tracking-[-0.02em]",
        h3: "text-2xl font-heading font-semibold leading-tight",
    };

    return (
        <Tag className={cn(styles[Tag] || styles.h1, "text-white", className)} {...props}>
            {children}
        </Tag>
    );
};

export const Text = ({ children, variant = 'body', className, ...props }) => {
    const styles = {
        body: "text-[1.125rem] leading-relaxed font-body text-white/80",
        small: "text-sm font-body text-white/50",
        mono: "font-mono text-xs uppercase tracking-[0.3em] text-primary",
    };

    return (
        <p className={cn(styles[variant], className)} {...props}>
            {children}
        </p>
    );
};
