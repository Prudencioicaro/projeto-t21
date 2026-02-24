'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import AccessibilityToolbar from '@/components/AccessibilityToolbar';
import LGPDBanner from '@/components/LGPDBanner';
import ToastContainer from '@/components/ToastContainer';
import RHLayout from '@/components/layouts/RHLayout';
import CandidatoLayout from '@/components/layouts/CandidatoLayout';

export default function LayoutShell({ children }) {
    const { fontScale, highContrast } = useApp();
    const pathname = usePathname();

    // Apply font-scale and contrast to <html> element directly
    useEffect(() => {
        const html = document.documentElement;
        if (fontScale !== 1) {
            html.setAttribute('data-font-scale', fontScale.toString());
        } else {
            html.removeAttribute('data-font-scale');
        }
        if (highContrast) {
            html.setAttribute('data-contrast', 'high');
        } else {
            html.removeAttribute('data-contrast');
        }
    }, [fontScale, highContrast]);

    const isRHArea = pathname.startsWith('/rh/');
    const isCandidatoArea = pathname.startsWith('/candidato');

    // Logged-in RH area
    if (isRHArea) {
        return (
            <>
                <RHLayout>{children}</RHLayout>
                <AccessibilityToolbar />
                <ToastContainer />
            </>
        );
    }

    // Logged-in Candidate area
    if (isCandidatoArea) {
        return (
            <>
                <CandidatoLayout>{children}</CandidatoLayout>
                <AccessibilityToolbar />
                <ToastContainer />
            </>
        );
    }

    // Public area
    return (
        <>
            <a href="#main-content" className="skip-link">
                Pular para o conteúdo principal
            </a>
            <Header />
            <main id="main-content" role="main" tabIndex={-1}>
                {children}
            </main>
            <Footer />
            <AccessibilityToolbar />
            <LGPDBanner />
            <ToastContainer />
        </>
    );
}
