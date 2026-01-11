import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../../utils/cn';

export const PinInput = ({ length = 6, onComplete, disabled, error, onPinChange }) => {
    const [pin, setPin] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        if (!disabled) {
            inputRef.current?.focus();
        }
    }, [disabled]);

    const handleChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '').slice(0, length);
        setPin(value);

        // Notify parent of PIN changes
        if (onPinChange) {
            onPinChange(value);
        }

        if (value.length === length) {
            onComplete(value);
        }
    };

    return (
        <div className="relative group">
            <input
                ref={inputRef}
                type="text"
                inputMode="numeric"
                value={pin}
                onChange={handleChange}
                disabled={disabled}
                className="sr-only"
                autoFocus
            />

            <div
                onClick={() => inputRef.current?.focus()}
                className={cn(
                    "flex justify-center gap-4 cursor-text",
                    error && "animate-shake"
                )}
            >
                {Array.from({ length }).map((_, i) => (
                    <div
                        key={i}
                        className={cn(
                            "w-12 h-16 border-b-2 flex items-center justify-center transition-all duration-300",
                            pin.length === i && !disabled ? "border-primary shadow-[0_4px_12px_rgba(0,255,148,0.2)]" : "border-white/10",
                            pin.length > i ? "text-primary border-primary/40" : "text-white/20",
                            error && "border-red-500/50"
                        )}
                    >
                        <span className="text-2xl font-mono font-bold tracking-widest">
                            {pin[i] ? '*' : ''}
                        </span>
                        {pin.length === i && !disabled && (
                            <span className="absolute w-[1px] h-8 bg-primary animate-pulse" />
                        )}
                    </div>
                ))}
            </div>

            {error && (
                <p className="mt-6 text-center text-xs text-red-400 font-mono uppercase tracking-widest animate-fade-in">
                    {error}
                </p>
            )}
        </div>
    );
};
