'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import styles from './page.module.css';

export default function VagaPublicaPage() {
    const params = useParams();
    const { vagas } = useApp();
    const vaga = vagas.find(v => v.id === params.id);

    if (!vaga) {
        return (
            <div className="container" style={{ padding: 'var(--space-32) 0', textAlign: 'center' }}>
                <h1>Vaga não encontrada</h1>
                <p>Essa vaga pode ter sido encerrada ou removida.</p>
                <Link href="/" className="btn btn--primary mt-8">Voltar para o início</Link>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <Link href="/" className={styles.backLink}>
                    ← Voltar para vagas
                </Link>

                <div className={styles.header}>
                    <div className={styles.logo}>{vaga.logoInicial}</div>
                    <div>
                        <h1 className={styles.cargo}>{vaga.cargo}</h1>
                        <p className={styles.empresa}>{vaga.empresa}</p>
                    </div>
                    {vaga.seloInclusivo && (
                        <div className={`badge badge--selo ${styles.selo}`}>
                            ✓ Empresa Inclusiva Nível {vaga.nivelSelo}
                        </div>
                    )}
                </div>

                <div className={styles.metaGrid}>
                    <div className={styles.metaItem}>
                        <span className={styles.metaLabel}>Localização</span>
                        <span className={styles.metaValue}>{vaga.localizacao}</span>
                    </div>
                    <div className={styles.metaItem}>
                        <span className={styles.metaLabel}>Tipo</span>
                        <span className={styles.metaValue}>{vaga.tipoTrabalho}</span>
                    </div>
                    <div className={styles.metaItem}>
                        <span className={styles.metaLabel}>Jornada</span>
                        <span className={styles.metaValue}>{vaga.jornada}</span>
                    </div>
                    {vaga.faixaSalarial && (
                        <div className={styles.metaItem}>
                            <span className={styles.metaLabel}>Faixa salarial</span>
                            <span className={styles.metaValue}>{vaga.faixaSalarial}</span>
                        </div>
                    )}
                </div>

                <div className={styles.content}>
                    <div className={styles.mainContent}>
                        <section className={styles.section}>
                            <h2>O que você vai fazer</h2>
                            <p className={styles.descSimple}>{vaga.descricaoSimplificada}</p>
                            <details className={styles.details}>
                                <summary>Ver descrição formal</summary>
                                <p>{vaga.descricaoFormal}</p>
                            </details>
                        </section>

                        <section className={styles.section}>
                            <h2>Habilidades desejadas</h2>
                            <div className={styles.skillsGroup}>
                                <div>
                                    <h4>Habilidades do dia a dia</h4>
                                    <div className={styles.skills}>
                                        {vaga.habilidadesTecnicas.map(h => (
                                            <span key={h} className="badge badge--neutral">{h}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4>Como você trabalha</h4>
                                    <div className={styles.skills}>
                                        {vaga.habilidadesComportamentais.map(h => (
                                            <span key={h} className="badge badge--info">{h}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <aside className={styles.sidebar}>
                        <div className={styles.sideCard}>
                            <h3>Ambiente de trabalho</h3>
                            <ul className={styles.ambienteList}>
                                <li>
                                    <span className={vaga.ambiente.adaptacaoFisica ? styles.checkYes : styles.checkNo}>
                                        {vaga.ambiente.adaptacaoFisica ? '✓' : '✕'}
                                    </span>
                                    Adaptação física
                                </li>
                                <li>
                                    <span className={vaga.ambiente.profissionalApoio ? styles.checkYes : styles.checkNo}>
                                        {vaga.ambiente.profissionalApoio ? '✓' : '✕'}
                                    </span>
                                    Profissional de apoio
                                </li>
                                <li>
                                    <span className={vaga.ambiente.treinamentoInicial ? styles.checkYes : styles.checkNo}>
                                        {vaga.ambiente.treinamentoInicial ? '✓' : '✕'}
                                    </span>
                                    Treinamento inicial
                                </li>
                                <li>
                                    <span className={vaga.ambiente.supervisorDesignado ? styles.checkYes : styles.checkNo}>
                                        {vaga.ambiente.supervisorDesignado ? '✓' : '✕'}
                                    </span>
                                    Supervisor designado
                                </li>
                                <li className={styles.ambienteTipo}>
                                    Ambiente: <strong>{vaga.ambiente.tipoAmbiente}</strong>
                                </li>
                            </ul>
                        </div>

                        <Link
                            href={`/vaga/${vaga.id}/aplicar`}
                            className="btn btn--accent btn--lg btn--full"
                            aria-label={`Candidatar-se para ${vaga.cargo}`}
                        >
                            Quero me candidatar
                        </Link>
                    </aside>
                </div>
            </div>
        </div>
    );
}
