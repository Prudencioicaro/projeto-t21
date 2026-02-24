'use client';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import styles from './page.module.css';

export default function CandidatoPage() {
    const { candidato, isCandidatoLoggedIn, loginCandidato } = useApp();

    if (!isCandidatoLoggedIn) {
        return (
            <div className={styles.page}>
                <div className={styles.loginContainer}>
                    <h1>Acompanhe suas candidaturas</h1>
                    <p>
                        Se você já se candidatou, use o link que enviamos para seu e-mail.
                        Para demonstração, clique abaixo:
                    </p>
                    <button onClick={loginCandidato} className="btn btn--primary btn--lg mt-6">
                        Entrar como candidato (demonstração)
                    </button>
                </div>
            </div>
        );
    }

    const statusConfig = {
        'Recebido': { badge: 'badge--neutral', icon: '📩' },
        'Em análise': { badge: 'badge--info', icon: '🔍' },
        'Entrevista agendada': { badge: 'badge--warning', icon: '📅' },
        'Aprovado': { badge: 'badge--active', icon: '🎉' },
        'Não selecionado': { badge: 'badge--error', icon: '📋' },
    };

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.greeting}>
                    <h1>Olá, {candidato.nome.split(' ')[0]}!</h1>
                    <p>Acompanhe suas candidaturas aqui. Tudo atualizado em tempo real.</p>
                </div>

                <div className={styles.candidaturas}>
                    {candidato.candidaturas.map((c, idx) => (
                        <article key={idx} className={styles.candidaturaCard}>
                            <div className={styles.cardHeader}>
                                <div>
                                    <h2 className={styles.cardCargo}>{c.cargo}</h2>
                                    <p className={styles.cardEmpresa}>{c.empresa}</p>
                                </div>
                                <span className={`badge ${statusConfig[c.status]?.badge || 'badge--neutral'}`}>
                                    {statusConfig[c.status]?.icon} {c.status}
                                </span>
                            </div>

                            <p className={styles.cardDate}>Candidatura em {formatDate(c.dataAplicacao)}</p>

                            <div className={styles.timeline} role="list" aria-label="Linha do tempo da candidatura">
                                {c.timeline.map((step, sIdx) => (
                                    <div
                                        key={sIdx}
                                        className={`${styles.timelineStep} ${step.concluido ? styles.done : ''} ${!step.concluido && sIdx > 0 && c.timeline[sIdx - 1]?.concluido ? styles.current : ''
                                            }`}
                                        role="listitem"
                                        aria-current={!step.concluido && sIdx > 0 && c.timeline[sIdx - 1]?.concluido ? 'step' : undefined}
                                    >
                                        <div className={styles.tlDot}></div>
                                        <div className={styles.tlContent}>
                                            <span className={styles.tlLabel}>{step.etapa}</span>
                                            {step.data && (
                                                <span className={styles.tlDate}>{formatDate(step.data)}</span>
                                            )}
                                        </div>
                                        {sIdx < c.timeline.length - 1 && (
                                            <div className={`${styles.tlLine} ${step.concluido ? styles.tlLineDone : ''}`}></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>

                {candidato.candidaturas.length === 0 && (
                    <div className={styles.empty}>
                        <p>Você ainda não tem candidaturas.</p>
                        <Link href="/#vagas" className="btn btn--primary btn--lg mt-6">
                            Ver vagas abertas
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-');
    return `${d}/${m}/${y}`;
}
