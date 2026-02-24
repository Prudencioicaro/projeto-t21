'use client';
import { useApp } from '@/context/AppContext';

export default function AccessibilityToolbar() {
    const { fontScale, highContrast, cycleFontScale, toggleContrast } = useApp();

    return (
        <div className="a11y-toolbar" role="toolbar" aria-label="Ferramentas de acessibilidade">
            <button
                className={`a11y-toolbar__btn ${highContrast ? 'a11y-toolbar__btn--active' : ''}`}
                onClick={toggleContrast}
                aria-label={highContrast ? 'Desativar alto contraste' : 'Ativar alto contraste'}
                aria-pressed={highContrast}
                title="Alto contraste"
            >
                ◐
            </button>

            <button
                className="a11y-toolbar__btn"
                onClick={cycleFontScale}
                aria-label={`Aumentar tamanho da fonte. Atual: ${Math.round(fontScale * 100)}%`}
                title={`Tamanho da fonte: ${Math.round(fontScale * 100)}%`}
            >
                {fontScale === 1 ? 'A' : fontScale === 1.15 ? 'A+' : fontScale === 1.3 ? 'A++' : '↩'}
            </button>
        </div>
    );
}
