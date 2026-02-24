'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
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
        target: '#vagas a.btn--accent',
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
    const tooltipRef = useRef(null);

    const positionTooltip = useCallback(() => {
        if (!visible || dismissed) return;
        const step = STEPS[currentStep];
        if (!step) return;

        const el = document.querySelector(step.target);
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const scrollY = window.scrollY;
        const padding = 12;
        const isMobile = window.innerWidth <= 768;

        // Spotlight positioning
        setSpotlightStyle({
            top: `${rect.top + scrollY - padding}px`,
            left: `${rect.left - padding}px`,
            width: `${rect.width + padding * 2}px`,
            height: `${rect.height + padding * 2}px`,
            opacity: 1
        });

        const tooltipWidth = Math.min(400, window.innerWidth - 32);

        // On mobile, keep it fixed at the bottom for better readability
        if (isMobile) {
            setTooltipStyle({
                position: 'fixed',
                bottom: '20px',
                left: '16px',
                right: '16px',
                width: 'auto',
                maxWidth: 'none',
                transform: 'none',
                zIndex: 10005
            });
            return;
        }

        // Desktop positioning logic
        let tooltipTop, tooltipLeft;
        const tooltipHeight = tooltipRef.current?.offsetHeight || 180;

        // Horizontal center
        tooltipLeft = Math.max(16, rect.left + rect.width / 2 - tooltipWidth / 2);
        tooltipLeft = Math.min(tooltipLeft, window.innerWidth - tooltipWidth - 16);

        // Vertical: check if it fits where requested, if not flip it
        const spaceAbove = rect.top;
        const spaceBelow = window.innerHeight - rect.bottom;

        if (step.position === 'bottom') {
            if (spaceBelow < tooltipHeight + 40 && spaceAbove > tooltipHeight + 40) {
                tooltipTop = rect.top + scrollY - tooltipHeight - 20;
            } else {
                tooltipTop = rect.bottom + scrollY + 20;
            }
        } else {
            if (spaceAbove < tooltipHeight + 40 && spaceBelow > tooltipHeight + 40) {
                tooltipTop = rect.bottom + scrollY + 20;
            } else {
                tooltipTop = rect.top + scrollY - tooltipHeight - 20;
            }
        }

        setTooltipStyle({
            top: `${tooltipTop}px`,
            left: `${tooltipLeft}px`,
            width: `${tooltipWidth}px`,
            position: 'absolute'
        });
    }, [currentStep, visible, dismissed]);

    useEffect(() => {
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
            // Adjust scroll to leave space for tooltip
            const isMobile = window.innerWidth <= 768;
            el.scrollIntoView({
                behavior: 'smooth',
                block: isMobile ? 'start' : 'center'
            });

            // Wait for scroll to finish
            const timer = setTimeout(positionTooltip, 600);
            return () => clearTimeout(timer);
        }
    }, [currentStep, visible, dismissed, positionTooltip]);

    useEffect(() => {
        if (!visible) return;
        window.addEventListener('resize', positionTooltip);
        window.addEventListener('scroll', positionTooltip);
        return () => {
            window.removeEventListener('resize', positionTooltip);
            window.removeEventListener('scroll', positionTooltip);
        };
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
            <div className={styles.spotlight} style={spotlightStyle} />

            <div
                ref={tooltipRef}
                className={styles.tooltip}
                style={tooltipStyle}
            >
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

