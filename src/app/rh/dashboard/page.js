'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import styles from './page.module.css';

export default function DashboardRHPage() {
    const router = useRouter();
    const { vagas, empresa, isRHLoggedIn, loginRH } = useApp();

    if (!isRHLoggedIn) {
        return (
            <div className={styles.page}>
                <div className={styles.loginPrompt}>
                    <h1>Dashboard RH</h1>
                    <p>Faça login para acessar o painel. Para demonstração:</p>
                    <button className="btn btn--primary btn--lg mt-6" onClick={() => loginRH({ nome: 'Carlos Mendes', empresa: 'Supermercado Bom Preço', email: 'carlos@bompreco.com.br' })}>
                        Entrar como RH (demonstração)
                    </button>
                </div>
            </div>
        );
    }

    const statusBadge = (status) => {
        switch (status) {
            case 'Ativa': return 'badge--active';
            case 'Em seleção': return 'badge--warning';
            case 'Encerrada': return 'badge--neutral';
            default: return 'badge--neutral';
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.topBar}>
                    <div>
                        <h1>Dashboard</h1>
                        <p className={styles.welcome}>Olá, {empresa.nome}! Empresa: {empresa.empresa}</p>
                    </div>
                    <Link href="/rh/criar-vaga" className="btn btn--primary">
                        + Criar nova vaga
                    </Link>
                </div>

                {/* Impact Dashboard */}
                <section className={styles.impactSection} aria-labelledby="impact-title">
                    <h2 id="impact-title" className={styles.sectionTitle}>Impacto Social (ESG)</h2>
                    <div className={styles.statsGrid}>
                        <div className={styles.statCard}>
                            <span className={styles.statNum}>{empresa.dashboard.pessoasT21Cadastradas}</span>
                            <span className={styles.statLabel}>Candidatos T21 cadastrados</span>
                        </div>
                        <div className={styles.statCard}>
                            <span className={styles.statNum}>{empresa.dashboard.contratacoes}</span>
                            <span className={styles.statLabel}>Contratações realizadas</span>
                        </div>
                        <div className={styles.statCard}>
                            <span className={styles.statNum}>{empresa.dashboard.taxaRetencao}%</span>
                            <span className={styles.statLabel}>Taxa de retenção</span>
                        </div>
                        <div className={styles.statCard}>
                            <span className={styles.statNum}>{empresa.dashboard.vagasAtivas}</span>
                            <span className={styles.statLabel}>Vagas ativas</span>
                        </div>
                    </div>
                </section>

                {/* Vagas List */}
                <section aria-labelledby="vagas-title">
                    <h2 id="vagas-title" className={styles.sectionTitle}>Suas vagas</h2>
                    <div className={styles.vagasList}>
                        {vagas.map(vaga => (
                            <article key={vaga.id} className={styles.vagaRow}>
                                <div className={styles.vagaRowInfo}>
                                    <h3 className={styles.vagaRowCargo}>{vaga.cargo}</h3>
                                    <p className={styles.vagaRowMeta}>
                                        {vaga.localizacao} · {vaga.tipoTrabalho} · Criada em {formatDate(vaga.dataCriacao)}
                                    </p>
                                </div>
                                <div className={styles.vagaRowRight}>
                                    <span className={`badge ${statusBadge(vaga.status)}`}>{vaga.status}</span>
                                    <span className={styles.candidateCount}>
                                        {vaga.candidatos.length} candidato{vaga.candidatos.length !== 1 ? 's' : ''}
                                    </span>
                                    <Link href={`/rh/vaga/${vaga.id}`} className="btn btn--secondary btn--sm">
                                        Gerenciar
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-');
    return `${d}/${m}/${y}`;
}
