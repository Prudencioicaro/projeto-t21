'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import styles from './page.module.css';

export default function CadastroRHPage() {
    const router = useRouter();
    const { loginRH } = useApp();

    const [form, setForm] = useState({
        nome: '',
        empresa: '',
        cnpj: '',
        email: '',
        senha: '',
        compromisso: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        loginRH({ nome: form.nome, empresa: form.empresa, email: form.email });
        router.push('/rh/dashboard');
    };

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.formHeader}>
                    <h1>Criar conta empresarial</h1>
                    <p>
                        Crie sua conta para publicar vagas inclusivas e encontrar
                        candidatos com Trissomia 21 preparados para o mercado.
                    </p>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                    <div className="form-group">
                        <label htmlFor="nome" className="form-label form-label--required">Seu nome</label>
                        <input type="text" id="nome" name="nome" className="form-input" value={form.nome} onChange={handleChange} placeholder="Nome completo" required autoComplete="name" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="empresa" className="form-label form-label--required">Nome da empresa</label>
                        <input type="text" id="empresa" name="empresa" className="form-input" value={form.empresa} onChange={handleChange} placeholder="Ex: Supermercado Bom Preço" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="cnpj" className="form-label">CNPJ (opcional)</label>
                        <input type="text" id="cnpj" name="cnpj" className="form-input" value={form.cnpj} onChange={handleChange} placeholder="00.000.000/0000-00" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="form-label form-label--required">E-mail corporativo</label>
                        <input type="email" id="email" name="email" className="form-input" value={form.email} onChange={handleChange} placeholder="rh@suaempresa.com.br" required autoComplete="email" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="senha" className="form-label form-label--required">Senha</label>
                        <input type="password" id="senha" name="senha" className="form-input" value={form.senha} onChange={handleChange} placeholder="Mínimo 8 caracteres" required autoComplete="new-password" />
                    </div>

                    <div className={styles.compromisso}>
                        <label className="form-check">
                            <input type="checkbox" name="compromisso" checked={form.compromisso} onChange={handleChange} required />
                            <span className="form-check-label">
                                <strong>Declaro estar comprometido com políticas de inclusão</strong> e me responsabilizo por criar um ambiente acolhedor para pessoas com Trissomia 21.
                            </span>
                        </label>
                    </div>

                    <button type="submit" className="btn btn--primary btn--lg btn--full mt-6" disabled={!form.compromisso}>
                        Criar conta e acessar dashboard
                    </button>
                </form>
            </div>
        </div>
    );
}
