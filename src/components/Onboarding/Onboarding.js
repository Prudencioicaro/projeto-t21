'use client';
import { useState, useEffect, useCallback } from 'react';
import styles from './Onboarding.module.css';

const STEPS = [
    {
        target: '#hero-title',
        title: 'Bem-vindo ao Conecta21!',
        text: 'Esta é uma plataforma feita para conectar pessoas com Trissomia 21 a vagas de emprego inclusivas.',
        position: 'bottom',
    },
    {
        target: '#como-funciona',
        title: 'Veja como funciona',
        text: 'Aqui você aprende o passo a passo para se candidatar. É muito simples!',
        position: 'top',
    },
    {
        target: '#vagas',
        title: 'Vagas abertas',
        text: 'Estas são as vagas disponíveis. Cada card mostra a empresa, o cargo e se o local é adaptado.',
        position: 'top',
    },
    {
        target: '#vagas .btn--accent',
        title: 'Candidate-se!',
        text: 'Quando encontrar uma vaga que goste, clique em "Quero me candidatar". Você não precisa criar conta antes.',
        position: 'top',
    },
];

export default function Onboarding() {
    const [currentStep, setCurrentStep] = useState(0);
    const [visible, setVisible] = useState(false);
    const [spotlightStyle, setSpotlightStyle] = useState({});
    const [tooltipStyle, setTooltipStyle] = useState({});
    const [dismissed, setDismissed] = useState(false);

    const positionTooltip = useCallback(() => {
        if (!visible || dismissed) return;
        const step = STEPS[currentStep];
        if (!step) return;

        const el = document.querySelector(step.target);
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const scrollY = window.scrollY;
        const padding = 12;

        setSpotlightStyle({
            top: `${rect.top + scrollY - padding}px`,
            left: `${rect.left - padding}px`,
            width: `${rect.width + padding * 2}px`,
            height: `${rect.height + padding * 2}px`,
        });

        const tooltipWidth = Math.min(380, window.innerWidth - 32);
        let tooltipTop, tooltipLeft;

        if (step.position === 'bottom') {
            tooltipTop = rect.bottom + scrollY + 20;
            tooltipLeft = Math.max(16, rect.left + rect.width / 2 - tooltipWidth / 2);
        } else {
            tooltipTop = rect.top + scrollY - 200;
            tooltipLeft = Math.max(16, rect.left + rect.width / 2 - tooltipWidth / 2);
        }

        // Keep within viewport
        tooltipLeft = Math.min(tooltipLeft, window.innerWidth - tooltipWidth - 16);

        setTooltipStyle({
            top: `${tooltipTop}px`,
            left: `${tooltipLeft}px`,
            width: `${tooltipWidth}px`,
        });
    }, [currentStep, visible, dismissed]);

    useEffect(() => {
        // Check if the user has been here before
        const seen = sessionStorage.getItem('conecta21_onboarding');
        if (!seen) {
            const timer = setTimeout(() => setVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    useEffect(() => {
        if (!visible || dismissed) return;

        const step = STEPS[currentStep];
        if (!step) return;

        const el = document.querySelector(step.target);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            const timer = setTimeout(positionTooltip, 500);
            return () => clearTimeout(timer);
        }
    }, [currentStep, visible, dismissed, positionTooltip]);

    useEffect(() => {
        if (!visible) return;
        window.addEventListener('resize', positionTooltip);
        return () => window.removeEventListener('resize', positionTooltip);
    }, [visible, positionTooltip]);

    const handleNext = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            handleDismiss();
        }
    };

    const handleDismiss = () => {
        setDismissed(true);
        setVisible(false);
        sessionStorage.setItem('conecta21_onboarding', 'true');
    };

    if (!visible || dismissed) return null;

    const step = STEPS[currentStep];

    return (
        <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Guia de navegação">
            {/* Spotlight */}
            <div className={styles.spotlight} style={spotlightStyle} />

            {/* Tooltip */}
            <div className={styles.tooltip} style={tooltipStyle}>
                <div className={styles.tooltipHeader}>
                    <span className={styles.stepIndicator}>
                        Passo {currentStep + 1} de {STEPS.length}
                    </span>
                    <button className={styles.dismissBtn} onClick={handleDismiss} aria-label="Fechar guia">
                        ✕
                    </button>
                </div>
                <h3 className={styles.tooltipTitle}>{step.title}</h3>
                <p className={styles.tooltipText}>{step.text}</p>
                <div className={styles.tooltipActions}>
                    {currentStep > 0 && (
                        <button className={styles.backBtn} onClick={() => setCurrentStep(prev => prev - 1)}>
                            ← Voltar
                        </button>
                    )}
                    <button className={styles.nextBtn} onClick={handleNext}>
                        {currentStep === STEPS.length - 1 ? 'Entendi!' : 'Próximo →'}
                    </button>
                </div>
                <div className={styles.dots}>
                    {STEPS.map((_, i) => (
                        <span key={i} className={`${styles.dot} ${i === currentStep ? styles.dotActive : ''}`} />
                    ))}
                </div>
            </div>
        </div>
    );
}
