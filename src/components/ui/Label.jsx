import React from 'react';
import { cn } from '../../utils/cn';

export const Label = ({ className, children, htmlFor, ...props }) => {
    return (
        <label
            htmlFor={htmlFor}
            className={cn(
                "block text-sm font-heading uppercase tracking-widest text-white/60 mb-2",
                className
            )}
            {...props}
        >
            {children}
        </label>
    );
};
