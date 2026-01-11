import React from 'react';
import { cn } from '../../utils/cn';

const variants = {
    primary: "bg-primary text-obsidian hover:bg-white shadow-emerald-glow",
    ghost: "border border-primary/20 text-primary/60 hover:text-primary hover:border-primary/60",
    destructive: "bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500/30"
};

export const Button = React.forwardRef(({
    className,
    variant = 'primary',
    children,
    disabled,
    ...props
}, ref) => {
    return (
        <button
            className={cn(
                "px-6 py-3 font-bold uppercase tracking-wider transition-all duration-300 rounded",
                "disabled:opacity-30 disabled:cursor-not-allowed",
                variants[variant],
                className
            )}
            disabled={disabled}
            ref={ref}
            {...props}
        >
            {children}
        </button>
    );
});

Button.displayName = 'Button';
