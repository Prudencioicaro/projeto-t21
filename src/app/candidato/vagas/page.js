'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import styles from './page.module.css';

export default function CandidatoVagasPage() {
    const { vagas, candidato, addToast } = useApp();
    const [search, setSearch] = useState('');
    const [filtroArea, setFiltroArea] = useState('');
    const [filtroSelo, setFiltroSelo] = useState(false);
    const [salvos, setSalvos] = useState([]);

    const areas = useMemo(() => [...new Set(vagas.map(v => v.area))], [vagas]);

    const vagasFiltradas = useMemo(() => {
        return vagas.filter(v => {
            if (v.status !== 'Ativa' && v.status !== 'Em seleção') return false;
            if (search && !v.cargo.toLowerCase().includes(search.toLowerCase()) && !v.empresa.toLowerCase().includes(search.toLowerCase())) return false;
            if (filtroArea && v.area !== filtroArea) return false;
            if (filtroSelo && !v.seloInclusivo) return false;
            return true;
        });
    }, [vagas, search, filtroArea, filtroSelo]);

    const jaCandidatou = (vagaId) => {
        return candidato.candidaturas?.some(c => c.vagaId === vagaId);
    };

    const toggleSalvar = (vagaId) => {
        setSalvos(prev => {
            if (prev.includes(vagaId)) {
                addToast('Vaga removida dos salvos.', 'info');
                return prev.filter(id => id !== vagaId);
            } else {
                addToast('Vaga salva! Você pode revisá-la com calma.', 'success');
                return [...prev, vagaId];
            }
        });
    };

    const getMatchClass = (score) => {
        if (score >= 80) return styles.matchHigh;
        if (score >= 60) return styles.matchMed;
        return styles.matchLow;
    };

    return (
        <div className={styles.page}>
            <div className={styles.pageHeader}>
                <div>
                    <h1 className={styles.title}>Explorar vagas</h1>
                    <p className={styles.subtitle}>Vagas compatíveis com seu perfil, {candidato.nome?.split(' ')[0] || 'Candidato'}.</p>
                </div>
            </div>

            {/* Filtros inline (sem sidebar, pois já tem sidebar do layout) */}
            <div className={styles.filtersBar}>
                <div className={styles.searchWrap}>
                    <SearchIcon />
                    <input
                        type="text"
                        className={styles.searchInput}
                        placeholder="Buscar cargo ou empresa..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        aria-label="Buscar vagas"
                    />
                </div>
                <select className="form-select" value={filtroArea} onChange={(e) => setFiltroArea(e.target.value)} aria-label="Filtrar por área" style={{ maxWidth: '200px' }}>
                    <option value="">Todas as áreas</option>
                    {areas.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
                <label className={styles.seloToggle}>
                    <input type="checkbox" checked={filtroSelo} onChange={(e) => setFiltroSelo(e.target.checked)} />
                    <span>Selo Inclusivo</span>
                </label>
                <span className={styles.countBadge}>
                    {vagasFiltradas.length} resultado{vagasFiltradas.length !== 1 ? 's' : ''}
                </span>
            </div>

            {/* Saved indicator */}
            {salvos.length > 0 && (
                <div className={styles.savedBar}>
                    <BookmarkIcon />
                    <span>{salvos.length} vaga{salvos.length !== 1 ? 's' : ''} salva{salvos.length !== 1 ? 's' : ''}</span>
                </div>
            )}

            {/* Vagas Grid */}
            {vagasFiltradas.length === 0 ? (
                <div className={styles.emptyState}>
                    <EmptyIcon />
                    <h3>Nenhuma vaga encontrada</h3>
                    <p>Tente ajustar os filtros. Novas vagas são publicadas frequentemente!</p>
                </div>
            ) : (
                <div className={styles.vagasGrid}>
                    {vagasFiltradas.map(vaga => {
                        const applied = jaCandidatou(vaga.id);
                        const saved = salvos.includes(vaga.id);
                        // Simulated match score
                        const matchScore = vaga.candidatos?.[0]?.matchScore || Math.floor(60 + Math.random() * 35);

                        return (
                            <article key={vaga.id} className={`${styles.vagaCard} ${saved ? styles.vagaSaved : ''}`}>
                                {/* Top: match + bookmark */}
                                <div className={styles.cardTopRow}>
                                    <div className={`${styles.matchBadge} ${getMatchClass(matchScore)}`}>
                                        {matchScore}% match
                                    </div>
                                    <button
                                        className={`${styles.bookmarkBtn} ${saved ? styles.bookmarkActive : ''}`}
                                        onClick={() => toggleSalvar(vaga.id)}
                                        aria-label={saved ? 'Remover dos salvos' : 'Salvar vaga para depois'}
                                        aria-pressed={saved}
                                    >
                                        <BookmarkIcon filled={saved} />
                                    </button>
                                </div>

                                {/* Card body */}
                                <div className={styles.cardBody}>
                                    <div className={styles.cardLogo}>{vaga.logoInicial}</div>
                                    <div className={styles.cardInfo}>
                                        <h3 className={styles.cardCargo}>{vaga.cargo}</h3>
                                        <p className={styles.cardEmpresa}>{vaga.empresa}</p>
                                    </div>
                                </div>

                                <div className={styles.cardMeta}>
                                    <span><LocationIcon />{vaga.localizacao}</span>
                                    <span><ClockIcon />{vaga.tipoTrabalho}</span>
                                </div>

                                {vaga.seloInclusivo && (
                                    <div className={styles.seloLine}>
                                        <CheckIcon /> Empresa com selo inclusivo
                                    </div>
                                )}

                                <p className={styles.cardDesc}>{vaga.descricaoSimplificada}</p>

                                {vaga.faixaSalarial && (
                                    <p className={styles.salario}>{vaga.faixaSalarial}</p>
                                )}

                                <div className={styles.cardSkills}>
                                    {vaga.habilidadesTecnicas.slice(0, 3).map(h => (
                                        <span key={h} className="badge badge--neutral">{h}</span>
                                    ))}
                                </div>

                                <div className={styles.cardActions}>
                                    {applied ? (
                                        <span className={styles.appliedBadge}>
                                            <CheckIcon /> Já candidatado
                                        </span>
                                    ) : (
                                        <>
                                            <Link href={`/vaga/${vaga.id}`} className="btn btn--secondary btn--sm" style={{ flex: 1 }}>
                                                Detalhes
                                            </Link>
                                            <Link href={`/vaga/${vaga.id}/aplicar`} className="btn btn--accent btn--sm" style={{ flex: 1 }}>
                                                Candidatar-se
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </article>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

// ── SVG Icons ──
function SearchIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
    );
}
function CheckIcon() {
    return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}
function LocationIcon() {
    return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
        </svg>
    );
}
function ClockIcon() {
    return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
        </svg>
    );
}
function BookmarkIcon({ filled }) {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
    );
}
function EmptyIcon() {
    return (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: 'var(--color-text-muted)' }}>
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="8" y1="11" x2="14" y2="11" />
        </svg>
    );
}
