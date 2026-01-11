import React from 'react';
import { cn } from '../../utils/cn';

export const TextArea = React.forwardRef(({ className, error, rows = 4, ...props }, ref) => {
    return (
        <textarea
            rows={rows}
            className={cn(
                "w-full px-4 py-3 bg-obsidian-light border-b-2 transition-all duration-300",
                "text-white font-body placeholder:text-white/30 resize-none",
                "focus:outline-none focus:border-primary focus:shadow-[0_4px_12px_rgba(0,255,148,0.2)]",
                error ? "border-red-500/50" : "border-white/10",
                className
            )}
            ref={ref}
            {...props}
        />
    );
});

TextArea.displayName = 'TextArea';
