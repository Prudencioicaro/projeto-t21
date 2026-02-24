'use client';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import styles from './page.module.css';

export default function AplicarPage() {
    const params = useParams();
    const router = useRouter();
    const { vagas, aplicarVaga, addToast } = useApp();
    const vaga = vagas.find(v => v.id === params.id);

    const [form, setForm] = useState({
        nome: '',
        email: '',
        telefone: '',
        cidade: '',
        temT21: '',
        precisaApoio: '',
        consentimento: false,
        dadosSensiveis: false,
    });

    const [enviado, setEnviado] = useState(false);
    const [emailSimulado, setEmailSimulado] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.nome || !form.email || !form.telefone || !form.cidade || !form.temT21 || !form.precisaApoio) {
            addToast('Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }

        if (!form.consentimento || !form.dadosSensiveis) {
            addToast('Você precisa aceitar os termos para continuar.', 'error');
            return;
        }

        aplicarVaga(params.id, {
            nome: form.nome,
            email: form.email,
            telefone: form.telefone,
            cidade: form.cidade,
            temT21: form.temT21,
            precisaApoio: form.precisaApoio === 'Sim',
        });

        setEmailSimulado({
            para: form.email,
            assunto: `Candidatura recebida – ${vaga?.cargo}`,
            corpo: `Olá ${form.nome}! Sua candidatura para ${vaga?.cargo} na ${vaga?.empresa} foi recebida. Acesse sua área: conecta21.app/entrar/abc123`,
        });

        setEnviado(true);
    };

    if (!vaga) {
        return (
            <div className="container" style={{ padding: 'var(--space-32) 0', textAlign: 'center' }}>
                <h1>Vaga não encontrada</h1>
                <Link href="/" className="btn btn--primary mt-8">Voltar</Link>
            </div>
        );
    }

    if (enviado) {
        return (
            <div className={styles.page}>
                <div className={styles.successContainer}>
                    <div className={styles.successIcon}>✓</div>
                    <h1>Candidatura enviada!</h1>
                    <p>
                        Sua candidatura para <strong>{vaga.cargo}</strong> na{' '}
                        <strong>{vaga.empresa}</strong> foi recebida com sucesso.
                    </p>

                    <div className={styles.emailPreview}>
                        <h3>📧 E-mail simulado enviado para você:</h3>
                        <div className={styles.emailCard}>
                            <p><strong>Para:</strong> {emailSimulado.para}</p>
                            <p><strong>Assunto:</strong> {emailSimulado.assunto}</p>
                            <hr className="divider" />
                            <p>{emailSimulado.corpo}</p>
                        </div>
                    </div>

                    <div className={styles.emailPreview}>
                        <h3>📧 E-mail simulado enviado para o RH:</h3>
                        <div className={styles.emailCard}>
                            <p><strong>Para:</strong> rh@{vaga.empresa.toLowerCase().replace(/\s/g, '')}.com.br</p>
                            <p><strong>Assunto:</strong> Novo candidato – {vaga.cargo}</p>
                            <hr className="divider" />
                            <p>Um novo candidato se inscreveu para a vaga de {vaga.cargo}: {form.nome}. Acesse o dashboard para gerenciar.</p>
                        </div>
                    </div>

                    <div className={styles.successActions}>
                        <Link href="/candidato" className="btn btn--primary btn--lg">
                            Ver minhas candidaturas
                        </Link>
                        <Link href="/" className="btn btn--secondary btn--lg">
                            Voltar ao início
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <div className={styles.formContainer}>
                <Link href={`/vaga/${vaga.id}`} className={styles.backLink}>
                    ← Voltar para a vaga
                </Link>

                <div className={styles.formHeader}>
                    <h1>Candidatar-se</h1>
                    <p>
                        Vaga: <strong>{vaga.cargo}</strong> na <strong>{vaga.empresa}</strong>
                    </p>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                    <div className="form-group">
                        <label htmlFor="nome" className="form-label form-label--required">
                            Seu nome completo
                        </label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            className="form-input"
                            value={form.nome}
                            onChange={handleChange}
                            placeholder="Digite seu nome completo"
                            required
                            autoComplete="name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="form-label form-label--required">
                            Seu e-mail
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-input"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="seu@email.com"
                            required
                            autoComplete="email"
                        />
                        <span className="form-hint">Vamos enviar confirmações para esse e-mail</span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="telefone" className="form-label form-label--required">
                            Seu telefone
                        </label>
                        <input
                            type="tel"
                            id="telefone"
                            name="telefone"
                            className="form-input"
                            value={form.telefone}
                            onChange={handleChange}
                            placeholder="(00) 00000-0000"
                            required
                            autoComplete="tel"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="cidade" className="form-label form-label--required">
                            Sua cidade
                        </label>
                        <input
                            type="text"
                            id="cidade"
                            name="cidade"
                            className="form-input"
                            value={form.cidade}
                            onChange={handleChange}
                            placeholder="Ex: Cubatão, SP"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label form-label--required">
                            Você tem Trissomia 21?
                        </label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                            {['Sim', 'Não', 'Prefiro não informar'].map(opt => (
                                <label key={opt} className="form-check">
                                    <input
                                        type="radio"
                                        name="temT21"
                                        value={opt}
                                        checked={form.temT21 === opt}
                                        onChange={handleChange}
                                    />
                                    <span className="form-check-label">{opt}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label form-label--required">
                            Precisa de apoio no processo seletivo?
                        </label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                            {['Sim', 'Não'].map(opt => (
                                <label key={opt} className="form-check">
                                    <input
                                        type="radio"
                                        name="precisaApoio"
                                        value={opt}
                                        checked={form.precisaApoio === opt}
                                        onChange={handleChange}
                                    />
                                    <span className="form-check-label">{opt}</span>
                                </label>
                            ))}
                        </div>
                        <span className="form-hint">Se precisar, a empresa vai adaptar as etapas para você</span>
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            Vídeo de apresentação (opcional)
                        </label>
                        <input type="file" accept="video/*" className="form-input" aria-label="Enviar vídeo de apresentação" />
                        <span className="form-hint">Grave um vídeo curto se apresentando — não é obrigatório</span>
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            Currículo (opcional)
                        </label>
                        <input type="file" accept=".pdf,.doc,.docx" className="form-input" aria-label="Enviar currículo" />
                    </div>

                    <hr className="divider" />

                    <div className={styles.lgpdSection}>
                        <div className={styles.lgpdBadge}>
                            🔒 Proteção de dados
                        </div>

                        <label className="form-check">
                            <input
                                type="checkbox"
                                name="consentimento"
                                checked={form.consentimento}
                                onChange={handleChange}
                                required
                            />
                            <span className="form-check-label">
                                Concordo que meus dados sejam utilizados exclusivamente para fins de recrutamento inclusivo, conforme a LGPD.
                            </span>
                        </label>

                        <label className="form-check">
                            <input
                                type="checkbox"
                                name="dadosSensiveis"
                                checked={form.dadosSensiveis}
                                onChange={handleChange}
                                required
                            />
                            <span className="form-check-label">
                                Autorizo o tratamento de dados sensíveis (informações sobre deficiência) para adequação da vaga e do processo seletivo.
                            </span>
                        </label>
                    </div>

                    <button type="submit" className="btn btn--accent btn--lg btn--full mt-8">
                        Enviar minha candidatura
                    </button>
                </form>
            </div>
        </div>
    );
}
