import React from 'react';
import { cn } from '../../utils/cn';

export const Input = React.forwardRef(({ className, type = 'text', error, ...props }, ref) => {
    return (
        <input
            type={type}
            className={cn(
                "w-full px-4 py-3 bg-obsidian-light border-b-2 transition-all duration-300",
                "text-white font-body placeholder:text-white/30",
                "focus:outline-none focus:border-primary focus:shadow-[0_4px_12px_rgba(0,255,148,0.2)]",
                error ? "border-red-500/50" : "border-white/10",
                className
            )}
            ref={ref}
            {...props}
        />
    );
});

Input.displayName = 'Input';
