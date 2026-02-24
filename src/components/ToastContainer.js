'use client';
import { useApp } from '@/context/AppContext';

export default function ToastContainer() {
    const { toasts } = useApp();

    if (toasts.length === 0) return null;

    return (
        <div aria-live="assertive" aria-atomic="true" style={{ position: 'fixed', top: 0, right: 0, zIndex: 10000 }}>
            {toasts.map((toast, i) => (
                <div
                    key={toast.id}
                    className={`toast ${toast.type === 'info' ? 'toast--info' : ''} ${toast.type === 'error' ? 'toast--error' : ''}`}
                    role="status"
                    style={{ top: `${24 + i * 80}px` }}
                >
                    <p style={{ margin: 0, fontSize: 'var(--text-sm)' }}>
                        {toast.type === 'success' && '✓ '}
                        {toast.type === 'info' && 'ℹ '}
                        {toast.type === 'error' && '✕ '}
                        {toast.message}
                    </p>
                </div>
            ))}
        </div>
    );
}
