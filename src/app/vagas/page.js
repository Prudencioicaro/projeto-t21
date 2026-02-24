'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import styles from './page.module.css';

export default function VagasPage() {
    const { vagas } = useApp();

    const [search, setSearch] = useState('');
    const [filtroArea, setFiltroArea] = useState('');
    const [filtroLocal, setFiltroLocal] = useState('');
    const [filtroTipo, setFiltroTipo] = useState('');
    const [filtroSelo, setFiltroSelo] = useState(false);

    const areas = useMemo(() => [...new Set(vagas.map(v => v.area))], [vagas]);
    const locais = useMemo(() => [...new Set(vagas.map(v => v.localizacao))], [vagas]);

    const vagasFiltradas = useMemo(() => {
        return vagas.filter(v => {
            if (v.status !== 'Ativa' && v.status !== 'Em seleção') return false;
            if (search && !v.cargo.toLowerCase().includes(search.toLowerCase()) && !v.empresa.toLowerCase().includes(search.toLowerCase())) return false;
            if (filtroArea && v.area !== filtroArea) return false;
            if (filtroLocal && v.localizacao !== filtroLocal) return false;
            if (filtroTipo && v.tipoTrabalho !== filtroTipo) return false;
            if (filtroSelo && !v.seloInclusivo) return false;
            return true;
        });
    }, [vagas, search, filtroArea, filtroLocal, filtroTipo, filtroSelo]);

    const limparFiltros = () => {
        setSearch('');
        setFiltroArea('');
        setFiltroLocal('');
        setFiltroTipo('');
        setFiltroSelo(false);
    };

    const temFiltrosAtivos = search || filtroArea || filtroLocal || filtroTipo || filtroSelo;

    return (
        <div className={styles.page}>
            {/* Header */}
            <section className={styles.header}>
                <div className="container">
                    <Link href="/" className={styles.backLink}>← Voltar ao início</Link>
                    <h1 className={styles.title}>Todas as vagas</h1>
                    <p className={styles.subtitle}>
                        Encontre a oportunidade ideal. Use os filtros para refinar sua busca.
                    </p>
                </div>
            </section>

            <div className="container">
                <div className={styles.layout}>
                    {/* Filters Sidebar */}
                    <aside className={styles.filtersSidebar} aria-label="Filtros de vagas">
                        <div className={styles.filtersHeader}>
                            <h2 className={styles.filtersTitle}>
                                <FilterIcon /> Filtros
                            </h2>
                            {temFiltrosAtivos && (
                                <button className={styles.clearBtn} onClick={limparFiltros}>
                                    Limpar
                                </button>
                            )}
                        </div>

                        <div className={styles.filterGroup}>
                            <label htmlFor="search" className={styles.filterLabel}>Buscar</label>
                            <div className={styles.searchWrap}>
                                <SearchIcon />
                                <input
                                    type="text"
                                    id="search"
                                    className={styles.searchInput}
                                    placeholder="Cargo ou empresa..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className={styles.filterGroup}>
                            <label htmlFor="filtroArea" className={styles.filterLabel}>Área</label>
                            <select id="filtroArea" className="form-select" value={filtroArea} onChange={(e) => setFiltroArea(e.target.value)}>
                                <option value="">Todas as áreas</option>
                                {areas.map(a => <option key={a} value={a}>{a}</option>)}
                            </select>
                        </div>

                        <div className={styles.filterGroup}>
                            <label htmlFor="filtroLocal" className={styles.filterLabel}>Localização</label>
                            <select id="filtroLocal" className="form-select" value={filtroLocal} onChange={(e) => setFiltroLocal(e.target.value)}>
                                <option value="">Todos os locais</option>
                                {locais.map(l => <option key={l} value={l}>{l}</option>)}
                            </select>
                        </div>

                        <div className={styles.filterGroup}>
                            <label htmlFor="filtroTipo" className={styles.filterLabel}>Tipo de trabalho</label>
                            <select id="filtroTipo" className="form-select" value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
                                <option value="">Todos os tipos</option>
                                <option value="Presencial">Presencial</option>
                                <option value="Híbrido">Híbrido</option>
                                <option value="Remoto">Remoto</option>
                            </select>
                        </div>

                        <div className={styles.filterGroup}>
                            <label className={`form-check ${styles.seloCheck}`}>
                                <input
                                    type="checkbox"
                                    checked={filtroSelo}
                                    onChange={(e) => setFiltroSelo(e.target.checked)}
                                />
                                <span className="form-check-label">
                                    <strong>Selo Inclusivo</strong>
                                    <small className={styles.seloHint}>
                                        Empresas com treinamento, supervisor e adaptação
                                    </small>
                                </span>
                            </label>
                        </div>
                    </aside>

                    {/* Results */}
                    <div className={styles.results}>
                        <div className={styles.resultsHeader}>
                            <span className={styles.resultsCount}>
                                {vagasFiltradas.length} vaga{vagasFiltradas.length !== 1 ? 's' : ''} encontrada{vagasFiltradas.length !== 1 ? 's' : ''}
                            </span>
                            {temFiltrosAtivos && (
                                <div className={styles.activeTags}>
                                    {search && <span className={styles.filterTag}>"{search}" <button onClick={() => setSearch('')}>✕</button></span>}
                                    {filtroArea && <span className={styles.filterTag}>{filtroArea} <button onClick={() => setFiltroArea('')}>✕</button></span>}
                                    {filtroLocal && <span className={styles.filterTag}>{filtroLocal} <button onClick={() => setFiltroLocal('')}>✕</button></span>}
                                    {filtroTipo && <span className={styles.filterTag}>{filtroTipo} <button onClick={() => setFiltroTipo('')}>✕</button></span>}
                                    {filtroSelo && <span className={styles.filterTag}>Selo Inclusivo <button onClick={() => setFiltroSelo(false)}>✕</button></span>}
                                </div>
                            )}
                        </div>

                        {vagasFiltradas.length === 0 ? (
                            <div className={styles.emptyState}>
                                <EmptyIcon />
                                <h3>Nenhuma vaga encontrada</h3>
                                <p>Tente ajustar os filtros ou volte mais tarde. Novas vagas são publicadas frequentemente.</p>
                                <button className="btn btn--secondary" onClick={limparFiltros}>Limpar filtros</button>
                            </div>
                        ) : (
                            <div className={styles.vagasList}>
                                {vagasFiltradas.map((vaga) => (
                                    <article key={vaga.id} className={styles.vagaCard}>
                                        <div className={styles.vagaCardLeft}>
                                            <div className={styles.vagaLogo}>{vaga.logoInicial}</div>
                                        </div>
                                        <div className={styles.vagaCardContent}>
                                            <div className={styles.vagaCardTop}>
                                                <div>
                                                    <h3 className={styles.vagaCargo}>{vaga.cargo}</h3>
                                                    <p className={styles.vagaEmpresa}>{vaga.empresa}</p>
                                                </div>
                                                {vaga.seloInclusivo && (
                                                    <span className="badge badge--selo">
                                                        <CheckIcon /> Selo Inclusivo
                                                    </span>
                                                )}
                                            </div>

                                            <div className={styles.vagaMeta}>
                                                <span className={styles.metaItem}><LocationIcon />{vaga.localizacao}</span>
                                                <span className={styles.metaItem}><ClockIcon />{vaga.jornada}</span>
                                                <span className={styles.metaItem}><BuildingIcon />{vaga.tipoTrabalho}</span>
                                            </div>

                                            <p className={styles.vagaDesc}>{vaga.descricaoSimplificada}</p>

                                            <div className={styles.vagaBottom}>
                                                <div className={styles.vagaSkills}>
                                                    {vaga.habilidadesTecnicas.slice(0, 3).map(h => (
                                                        <span key={h} className="badge badge--neutral">{h}</span>
                                                    ))}
                                                </div>
                                                {vaga.faixaSalarial && (
                                                    <span className={styles.vagaSalario}>{vaga.faixaSalarial}</span>
                                                )}
                                            </div>

                                            <div className={styles.vagaActions}>
                                                <Link href={`/vaga/${vaga.id}`} className="btn btn--secondary btn--sm">
                                                    Ver detalhes
                                                </Link>
                                                <Link href={`/vaga/${vaga.id}/aplicar`} className="btn btn--accent btn--sm">
                                                    Candidatar-se
                                                </Link>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ── SVG Icons ──
function FilterIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
    );
}
function SearchIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
    );
}
function CheckIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}
function LocationIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
        </svg>
    );
}
function ClockIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
        </svg>
    );
}
function BuildingIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="4" y="2" width="16" height="20" rx="2" /><line x1="9" y1="6" x2="9.01" y2="6" /><line x1="15" y1="6" x2="15.01" y2="6" /><line x1="9" y1="10" x2="9.01" y2="10" /><line x1="15" y1="10" x2="15.01" y2="10" /><line x1="9" y1="14" x2="9.01" y2="14" /><line x1="15" y1="14" x2="15.01" y2="14" /><line x1="9" y1="18" x2="15" y2="18" />
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
