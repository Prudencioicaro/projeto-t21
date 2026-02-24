'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import styles from './page.module.css';

const HABILIDADES_TECNICAS = [
    'Organização', 'Atendimento', 'Digitação básica', 'Apoio administrativo',
    'Controle de estoque', 'Limpeza', 'Separação de materiais', 'Embalagem',
    'Arquivo de documentos', 'Reposição de produtos'
];

const HABILIDADES_COMPORTAMENTAIS = [
    'Trabalho em equipe', 'Comunicação simples', 'Foco em rotina',
    'Seguir instruções', 'Pontualidade', 'Cuidado com materiais'
];

function gerarDescricaoSimplificada(formal) {
    if (!formal) return '';
    const simplifications = {
        'responsável por': 'vai',
        'responsável pela': 'vai cuidar da',
        'controle documental': 'organizar papéis e documentos',
        'gestão de': 'cuidar de',
        'suporte à': 'ajudar a',
        'suporte ao': 'ajudar o',
        'conferência': 'verificação',
        'auxílio em': 'ajuda em',
        'manutenção': 'cuidar da',
        'atendimento direto ao público': 'conversar com as pessoas que chegam',
        'disposição dos produtos': 'arrumar os produtos nos lugares certos',
    };

    let simplified = formal;
    Object.entries(simplifications).forEach(([key, value]) => {
        simplified = simplified.replace(new RegExp(key, 'gi'), value);
    });

    if (!simplified.startsWith('Você')) {
        simplified = 'Você ' + simplified.charAt(0).toLowerCase() + simplified.slice(1);
    }

    return simplified;
}

export default function CriarVagaPage() {
    const router = useRouter();
    const { criarVaga, isRHLoggedIn, loginRH } = useApp();
    const [blocoAtivo, setBlocoAtivo] = useState(1);

    const [form, setForm] = useState({
        cargo: '',
        area: '',
        localizacao: '',
        tipoTrabalho: 'Presencial',
        jornada: '',
        faixaSalarial: '',
        habilidadesTecnicas: [],
        habilidadesComportamentais: [],
        adaptacaoFisica: false,
        profissionalApoio: false,
        tipoAmbiente: '',
        treinamentoInicial: false,
        supervisorDesignado: false,
        descricaoFormal: '',
        descricaoSimplificada: '',
        logoInicial: '',
        empresa: 'Supermercado Bom Preço',
    });

    if (!isRHLoggedIn) {
        return (
            <div style={{ padding: 'var(--space-24) var(--space-6)', textAlign: 'center', maxWidth: 'var(--max-width-form)', margin: '0 auto' }}>
                <h1>Criar nova vaga</h1>
                <p style={{ fontSize: 'var(--text-lg)', marginTop: 'var(--space-4)' }}>Faça login para criar vagas.</p>
                <button className="btn btn--primary btn--lg mt-6" onClick={() => { loginRH({ nome: 'Carlos', empresa: 'Supermercado Bom Preço' }); }}>
                    Entrar como RH (demonstração)
                </button>
            </div>
        );
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const toggleSkill = (type, skill) => {
        setForm(prev => ({
            ...prev,
            [type]: prev[type].includes(skill)
                ? prev[type].filter(s => s !== skill)
                : [...prev[type], skill]
        }));
    };

    const handleFormalChange = (e) => {
        const formal = e.target.value;
        setForm(prev => ({
            ...prev,
            descricaoFormal: formal,
            descricaoSimplificada: gerarDescricaoSimplificada(formal),
        }));
    };

    const handlePublicar = () => {
        const vaga = criarVaga({
            ...form,
            logoInicial: form.empresa.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
            ambiente: {
                adaptacaoFisica: form.adaptacaoFisica,
                profissionalApoio: form.profissionalApoio,
                tipoAmbiente: form.tipoAmbiente,
                treinamentoInicial: form.treinamentoInicial,
                supervisorDesignado: form.supervisorDesignado,
            }
        });
        router.push('/rh/dashboard');
    };

    const isSeloInclusivo = form.treinamentoInicial && form.supervisorDesignado && form.adaptacaoFisica;

    const blocos = [
        { num: 1, label: 'Informações básicas' },
        { num: 2, label: 'Competências' },
        { num: 3, label: 'Ambiente' },
        { num: 4, label: 'Descrição' },
    ];

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <Link href="/rh/dashboard" className={styles.backLink}>← Voltar ao dashboard</Link>

                <h1 className={styles.title}>Criar nova vaga inclusiva</h1>

                {/* Block Navigation */}
                <nav className={styles.blocoNav} aria-label="Etapas de criação da vaga">
                    {blocos.map(b => (
                        <button
                            key={b.num}
                            className={`${styles.blocoBtn} ${blocoAtivo === b.num ? styles.blocoActive : ''}`}
                            onClick={() => setBlocoAtivo(b.num)}
                            aria-current={blocoAtivo === b.num ? 'step' : undefined}
                        >
                            <span className={styles.blocoNum}>{b.num}</span>
                            <span className={styles.blocoLabel}>{b.label}</span>
                        </button>
                    ))}
                </nav>

                {/* BLOCO 1 */}
                {blocoAtivo === 1 && (
                    <section className={styles.blocoSection} aria-labelledby="bloco1-title">
                        <h2 id="bloco1-title" className={styles.blocoTitle}>Informações básicas</h2>
                        <p className={styles.blocoDesc}>Dados gerais sobre a vaga que será publicada.</p>

                        <div className={styles.formGrid}>
                            <div className="form-group">
                                <label htmlFor="cargo" className="form-label form-label--required">Cargo</label>
                                <input type="text" id="cargo" name="cargo" className="form-input" value={form.cargo} onChange={handleChange} placeholder="Ex: Auxiliar de Estoque" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="area" className="form-label form-label--required">Área</label>
                                <select id="area" name="area" className="form-select" value={form.area} onChange={handleChange}>
                                    <option value="">Selecione</option>
                                    <option>Logística</option>
                                    <option>Atendimento</option>
                                    <option>Administração</option>
                                    <option>Alimentação</option>
                                    <option>Cultura</option>
                                    <option>Limpeza</option>
                                    <option>Manutenção</option>
                                    <option>Outra</option>
                                </select>
                            </div>
                        </div>

                        <div className={styles.formGrid}>
                            <div className="form-group">
                                <label htmlFor="localizacao" className="form-label form-label--required">Localização</label>
                                <input type="text" id="localizacao" name="localizacao" className="form-input" value={form.localizacao} onChange={handleChange} placeholder="Ex: Cubatão, SP" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="tipoTrabalho" className="form-label form-label--required">Tipo de trabalho</label>
                                <select id="tipoTrabalho" name="tipoTrabalho" className="form-select" value={form.tipoTrabalho} onChange={handleChange}>
                                    <option>Presencial</option>
                                    <option>Híbrido</option>
                                    <option>Remoto</option>
                                </select>
                            </div>
                        </div>

                        <div className={styles.formGrid}>
                            <div className="form-group">
                                <label htmlFor="jornada" className="form-label form-label--required">Jornada</label>
                                <input type="text" id="jornada" name="jornada" className="form-input" value={form.jornada} onChange={handleChange} placeholder="Ex: Segunda a sexta, 6h/dia" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="faixaSalarial" className="form-label">Faixa salarial (opcional)</label>
                                <input type="text" id="faixaSalarial" name="faixaSalarial" className="form-input" value={form.faixaSalarial} onChange={handleChange} placeholder="Ex: R$ 1.400 – R$ 1.600" />
                            </div>
                        </div>

                        <div className={styles.blocoActions}>
                            <button className="btn btn--primary" onClick={() => setBlocoAtivo(2)}>Próximo: Competências →</button>
                        </div>
                    </section>
                )}

                {/* BLOCO 2 */}
                {blocoAtivo === 2 && (
                    <section className={styles.blocoSection} aria-labelledby="bloco2-title">
                        <h2 id="bloco2-title" className={styles.blocoTitle}>Competências desejadas</h2>
                        <p className={styles.blocoDesc}>
                            Em vez de exigências rígidas, selecione habilidades que o candidato pode ter.
                            Isso gera um match mais justo.
                        </p>

                        <div className={styles.skillSection}>
                            <h3>Habilidades do dia a dia</h3>
                            <div className={styles.skillGrid}>
                                {HABILIDADES_TECNICAS.map(skill => (
                                    <button
                                        key={skill}
                                        type="button"
                                        className={`${styles.skillChip} ${form.habilidadesTecnicas.includes(skill) ? styles.skillSelected : ''}`}
                                        onClick={() => toggleSkill('habilidadesTecnicas', skill)}
                                        aria-pressed={form.habilidadesTecnicas.includes(skill)}
                                    >
                                        {form.habilidadesTecnicas.includes(skill) ? '✓ ' : ''}{skill}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className={styles.skillSection}>
                            <h3>Como a pessoa trabalha</h3>
                            <div className={styles.skillGrid}>
                                {HABILIDADES_COMPORTAMENTAIS.map(skill => (
                                    <button
                                        key={skill}
                                        type="button"
                                        className={`${styles.skillChip} ${form.habilidadesComportamentais.includes(skill) ? styles.skillSelected : ''}`}
                                        onClick={() => toggleSkill('habilidadesComportamentais', skill)}
                                        aria-pressed={form.habilidadesComportamentais.includes(skill)}
                                    >
                                        {form.habilidadesComportamentais.includes(skill) ? '✓ ' : ''}{skill}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className={styles.blocoActions}>
                            <button className="btn btn--secondary" onClick={() => setBlocoAtivo(1)}>← Voltar</button>
                            <button className="btn btn--primary" onClick={() => setBlocoAtivo(3)}>Próximo: Ambiente →</button>
                        </div>
                    </section>
                )}

                {/* BLOCO 3 */}
                {blocoAtivo === 3 && (
                    <section className={styles.blocoSection} aria-labelledby="bloco3-title">
                        <h2 id="bloco3-title" className={styles.blocoTitle}>Ambiente de trabalho</h2>
                        <p className={styles.blocoDesc}>
                            Essas informações são o diferencial real. Elas mostram ao candidato
                            que sua empresa está preparada.
                        </p>

                        <div className={styles.ambienteGrid}>
                            <label className={`${styles.ambienteCard} ${form.adaptacaoFisica ? styles.ambienteActive : ''}`}>
                                <input type="checkbox" name="adaptacaoFisica" checked={form.adaptacaoFisica} onChange={handleChange} />
                                <div className={styles.ambienteCardContent}>
                                    <strong>Adaptação física</strong>
                                    <span>A empresa possui acessibilidade no espaço físico</span>
                                </div>
                            </label>

                            <label className={`${styles.ambienteCard} ${form.profissionalApoio ? styles.ambienteActive : ''}`}>
                                <input type="checkbox" name="profissionalApoio" checked={form.profissionalApoio} onChange={handleChange} />
                                <div className={styles.ambienteCardContent}>
                                    <strong>Profissional de apoio</strong>
                                    <span>Há alguém para ajudar na adaptação inicial</span>
                                </div>
                            </label>

                            <label className={`${styles.ambienteCard} ${form.treinamentoInicial ? styles.ambienteActive : ''}`}>
                                <input type="checkbox" name="treinamentoInicial" checked={form.treinamentoInicial} onChange={handleChange} />
                                <div className={styles.ambienteCardContent}>
                                    <strong>Treinamento inicial</strong>
                                    <span>Oferece treinamento para a pessoa se ambientar</span>
                                </div>
                            </label>

                            <label className={`${styles.ambienteCard} ${form.supervisorDesignado ? styles.ambienteActive : ''}`}>
                                <input type="checkbox" name="supervisorDesignado" checked={form.supervisorDesignado} onChange={handleChange} />
                                <div className={styles.ambienteCardContent}>
                                    <strong>Supervisor designado</strong>
                                    <span>Um supervisor acompanha o colaborador</span>
                                </div>
                            </label>
                        </div>

                        <div className="form-group" style={{ marginTop: 'var(--space-6)' }}>
                            <label htmlFor="tipoAmbiente" className="form-label form-label--required">Tipo de ambiente</label>
                            <select id="tipoAmbiente" name="tipoAmbiente" className="form-select" value={form.tipoAmbiente} onChange={handleChange}>
                                <option value="">Selecione</option>
                                <option>Silencioso</option>
                                <option>Dinâmico</option>
                                <option>Atendimento ao público</option>
                            </select>
                        </div>

                        {isSeloInclusivo && (
                            <div className={styles.seloPreview}>
                                <span className="badge badge--selo" style={{ fontSize: 'var(--text-base)', padding: 'var(--space-3) var(--space-5)' }}>
                                    ✓ Selo Empresa Inclusiva Nível 1
                                </span>
                                <p>Sua vaga receberá o selo automaticamente por oferecer treinamento, supervisor e adaptação física.</p>
                            </div>
                        )}

                        <div className={styles.blocoActions}>
                            <button className="btn btn--secondary" onClick={() => setBlocoAtivo(2)}>← Voltar</button>
                            <button className="btn btn--primary" onClick={() => setBlocoAtivo(4)}>Próximo: Descrição →</button>
                        </div>
                    </section>
                )}

                {/* BLOCO 4 */}
                {blocoAtivo === 4 && (
                    <section className={styles.blocoSection} aria-labelledby="bloco4-title">
                        <h2 id="bloco4-title" className={styles.blocoTitle}>Descrição da vaga</h2>
                        <p className={styles.blocoDesc}>
                            Escreva a descrição formal e a versão simplificada será gerada automaticamente.
                            A versão simplificada é o que o candidato com T21 vai ler.
                        </p>

                        <div className={styles.descDual}>
                            <div className="form-group">
                                <label htmlFor="descricaoFormal" className="form-label form-label--required">
                                    Descrição formal
                                </label>
                                <textarea
                                    id="descricaoFormal"
                                    name="descricaoFormal"
                                    className="form-textarea"
                                    value={form.descricaoFormal}
                                    onChange={handleFormalChange}
                                    placeholder="Ex: Auxiliar administrativo responsável por controle documental e apoio ao setor..."
                                    rows={6}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    Versão simplificada (gerada automaticamente)
                                </label>
                                <div className={styles.simplifiedPreview}>
                                    {form.descricaoSimplificada || 'A versão simplificada aparecerá aqui conforme você digitar a descrição formal.'}
                                </div>
                                <span className="form-hint">
                                    Essa é a versão que o candidato vai ver. Você pode editar abaixo se quiser ajustar.
                                </span>
                                <textarea
                                    className="form-textarea"
                                    value={form.descricaoSimplificada}
                                    onChange={(e) => setForm(prev => ({ ...prev, descricaoSimplificada: e.target.value }))}
                                    placeholder="Edite aqui se necessário..."
                                    rows={4}
                                    style={{ marginTop: 'var(--space-3)' }}
                                />
                            </div>
                        </div>

                        <div className={styles.blocoActions}>
                            <button className="btn btn--secondary" onClick={() => setBlocoAtivo(3)}>← Voltar</button>
                            <button className="btn btn--accent btn--lg" onClick={handlePublicar}>
                                Publicar vaga agora
                            </button>
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
