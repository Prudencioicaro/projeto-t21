'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import styles from './page.module.css';

export default function GerenciarVagaPage() {
    const params = useParams();
    const { vagas, atualizarStatusCandidato, isRHLoggedIn, loginRH, addToast } = useApp();
    const vaga = vagas.find(v => v.id === params.id);

    const [filtroApoio, setFiltroApoio] = useState('todos');
    const [filtroCidade, setFiltroCidade] = useState('');

    if (!isRHLoggedIn) {
        return (
            <div style={{ padding: 'var(--space-24) var(--space-6)', textAlign: 'center', maxWidth: 'var(--max-width-form)', margin: '0 auto' }}>
                <h1>Gerenciar vaga</h1>
                <p style={{ fontSize: 'var(--text-lg)', marginTop: 'var(--space-4)' }}>Faça login para acessar.</p>
                <button className="btn btn--primary btn--lg mt-6" onClick={() => loginRH({ nome: 'Carlos', empresa: 'Supermercado Bom Preço' })}>
                    Entrar como RH (demonstração)
                </button>
            </div>
        );
    }

    if (!vaga) {
        return (
            <div className="container" style={{ padding: 'var(--space-32) 0', textAlign: 'center' }}>
                <h1>Vaga não encontrada</h1>
                <Link href="/rh/dashboard" className="btn btn--primary mt-8">Voltar ao dashboard</Link>
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

    const statusOptions = ['Recebido', 'Em análise', 'Entrevista agendada', 'Aprovado', 'Não selecionado'];

    let candidatos = [...vaga.candidatos];

    if (filtroApoio !== 'todos') {
        candidatos = candidatos.filter(c =>
            filtroApoio === 'sim' ? c.precisaApoio : !c.precisaApoio
        );
    }

    if (filtroCidade) {
        candidatos = candidatos.filter(c =>
            c.cidade.toLowerCase().includes(filtroCidade.toLowerCase())
        );
    }

    const handleStatusChange = (candidatoId, novoStatus) => {
        atualizarStatusCandidato(vaga.id, candidatoId, novoStatus);
        addToast(`📧 E-mail simulado: notificação enviada ao candidato sobre status "${novoStatus}".`, 'info');
    };

    const getMatchClass = (score) => {
        if (score >= 80) return 'match-score__ring--high';
        if (score >= 60) return 'match-score__ring--medium';
        return 'match-score__ring--low';
    };

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <Link href="/rh/dashboard" className={styles.backLink}>← Voltar ao dashboard</Link>

                <div className={styles.header}>
                    <div>
                        <h1>{vaga.cargo}</h1>
                        <p className={styles.headerMeta}>
                            {vaga.empresa} · {vaga.localizacao} · {vaga.candidatos.length} candidato{vaga.candidatos.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                    <span className={`badge ${vaga.status === 'Ativa' ? 'badge--active' : 'badge--neutral'}`}>
                        {vaga.status}
                    </span>
                </div>

                {/* Filters */}
                <div className={styles.filters}>
                    <div className="form-group" style={{ marginBottom: 0, flex: 1 }}>
                        <label htmlFor="filtroApoio" className="form-label">Precisa de apoio?</label>
                        <select id="filtroApoio" className="form-select" value={filtroApoio} onChange={(e) => setFiltroApoio(e.target.value)}>
                            <option value="todos">Todos</option>
                            <option value="sim">Sim</option>
                            <option value="nao">Não</option>
                        </select>
                    </div>
                    <div className="form-group" style={{ marginBottom: 0, flex: 1 }}>
                        <label htmlFor="filtroCidade" className="form-label">Cidade</label>
                        <input type="text" id="filtroCidade" className="form-input" placeholder="Filtrar por cidade" value={filtroCidade} onChange={(e) => setFiltroCidade(e.target.value)} />
                    </div>
                </div>

                {/* Candidate List */}
                <div className={styles.candidatosList}>
                    {candidatos.length === 0 ? (
                        <div className={styles.empty}>
                            <p>Nenhum candidato encontrado.</p>
                        </div>
                    ) : (
                        candidatos.map(c => (
                            <article key={c.id} className={styles.candidatoCard}>
                                <div className={styles.candidatoTop}>
                                    <div className={styles.candidatoInfo}>
                                        <h3>{c.nome}</h3>
                                        <p>{c.email} · {c.telefone}</p>
                                        <p>{c.cidade}</p>
                                        {c.precisaApoio && (
                                            <span className="badge badge--warning" style={{ marginTop: 'var(--space-2)' }}>
                                                Precisa de apoio
                                            </span>
                                        )}
                                    </div>

                                    <div className="match-score">
                                        <div className={`match-score__ring ${getMatchClass(c.matchScore)}`}>
                                            {c.matchScore}%
                                        </div>
                                        <div>
                                            <strong style={{ fontSize: 'var(--text-sm)', display: 'block' }}>Compatibilidade</strong>
                                            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Score de match</span>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.candidatoBottom}>
                                    <div className={styles.candidatoStatus}>
                                        <span className={`badge ${statusConfig[c.status]?.badge || 'badge--neutral'}`}>
                                            {statusConfig[c.status]?.icon} {c.status}
                                        </span>
                                        <span className={styles.dateInfo}>Aplicou em {formatDate(c.dataAplicacao)}</span>
                                    </div>

                                    <div className={styles.candidatoActions}>
                                        {statusOptions
                                            .filter(s => s !== c.status)
                                            .map(s => (
                                                <button
                                                    key={s}
                                                    className={`btn btn--sm ${s === 'Aprovado' ? 'btn--success' : s === 'Não selecionado' ? 'btn--ghost' : 'btn--secondary'}`}
                                                    onClick={() => handleStatusChange(c.id, s)}
                                                    aria-label={`Alterar status de ${c.nome} para ${s}`}
                                                >
                                                    {s === 'Em análise' && '🔍 '}
                                                    {s === 'Entrevista agendada' && '📅 '}
                                                    {s === 'Aprovado' && '✓ '}
                                                    {s === 'Não selecionado' && '✕ '}
                                                    {s}
                                                </button>
                                            ))
                                        }
                                    </div>
                                </div>
                            </article>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-');
    return `${d}/${m}/${y}`;
}
