'use client';
import { useState } from 'react';

export default function LGPDBanner() {
    const [accepted, setAccepted] = useState(false);

    if (accepted) return null;

    return (
        <div className="lgpd-banner" role="alert" aria-live="polite">
            <div className="lgpd-banner__inner">
                <p className="lgpd-banner__text">
                    <strong>Aviso de Privacidade:</strong> Seus dados serão usados exclusivamente para fins de recrutamento inclusivo,
                    conforme a Lei Geral de Proteção de Dados (LGPD). Não compartilhamos informações com terceiros.{' '}
                    <a href="/privacidade" aria-label="Ler nossa política de privacidade completa">Saiba mais</a>
                </p>
                <div className="lgpd-banner__actions">
                    <button
                        className="btn btn--primary btn--sm"
                        onClick={() => setAccepted(true)}
                        aria-label="Aceitar política de privacidade"
                    >
                        Aceitar
                    </button>
                    <button
                        className="btn btn--ghost btn--sm"
                        onClick={() => setAccepted(true)}
                        aria-label="Fechar aviso de privacidade"
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
}
