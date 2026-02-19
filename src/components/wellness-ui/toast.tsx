'use client';

import * as React from 'react';
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
    id: string;
    type: ToastType;
    title: string;
    message?: string;
    duration?: number;
}

interface ToastContextType {
    toasts: Toast[];
    addToast: (toast: Omit<Toast, 'id'>) => void;
    removeToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export function useToast() {
    const context = React.useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = React.useState<Toast[]>([]);

    React.useEffect(() => {
        console.log('ToastProvider mounted');
    }, []);

    const addToast = React.useCallback(({ duration = 5000, ...rest }: Omit<Toast, 'id'>) => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { id, duration, ...rest }]);

        if (duration > 0) {
            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== id));
            }, duration);
        }
    }, []);

    const removeToast = React.useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
            {children}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </ToastContext.Provider>
    );
}

function ToastContainer({ toasts, removeToast }: { toasts: Toast[]; removeToast: (id: string) => void }) {
    return (
        <div className="fixed bottom-0 right-0 z-[100] flex flex-col gap-2 p-6 sm:max-w-[420px] w-full pointer-events-none">
            {/* CSS Transition Group would be better here but simple mapping works for RSC/Standard React without external deps */}
            {toasts.map((toast) => (
                <ToastItem key={toast.id} toast={toast} onRemove={() => removeToast(toast.id)} />
            ))}
        </div>
    );
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: () => void }) {
    // Icons mapping
    const icons = {
        success: <CheckCircle2 className="h-5 w-5 text-green-600" />,
        error: <AlertCircle className="h-5 w-5 text-red-600" />,
        warning: <AlertTriangle className="h-5 w-5 text-amber-600" />,
        info: <Info className="h-5 w-5 text-blue-600" />,
    };

    return (
        <div
            className={cn(
                "pointer-events-auto relative flex w-full items-start gap-4 overflow-hidden rounded-xl border p-4 shadow-lg transition-all animate-in slide-in-from-right-full duration-300",
                "bg-white border-stone-100" // Default base
            )}
            role="alert"
        >
            <div className="flex-shrink-0 pt-0.5">
                {icons[toast.type]}
            </div>
            <div className="flex-1 grid gap-1">
                <h3 className="text-sm font-semibold text-stone-900">{toast.title}</h3>
                {toast.message && <p className="text-sm text-stone-500">{toast.message}</p>}
            </div>
            <button
                onClick={onRemove}
                className="absolute right-2 top-2 rounded-md p-1 text-stone-400 opacity-0 transition-opacity hover:text-stone-900 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2"
            >
                <X className="h-4 w-4" />
            </button>
        </div>
    )
}
