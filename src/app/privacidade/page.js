import styles from './legal.module.css';

export const metadata = {
    title: 'Política de Privacidade – Conecta21',
    description: 'Saiba como tratamos seus dados pessoais na plataforma Conecta21.',
};

export default function PrivacidadePage() {
    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <h1>Política de Privacidade</h1>
                <p className={styles.updated}>Última atualização: Fevereiro de 2026</p>

                <section className={styles.section}>
                    <h2>1. Dados que coletamos</h2>
                    <p>
                        A Conecta21 coleta apenas os dados necessários para conectar candidatos
                        com Trissomia 21 a vagas de emprego inclusivas. Isso inclui:
                    </p>
                    <ul>
                        <li>Nome completo e dados de contato (e-mail, telefone)</li>
                        <li>Cidade de residência</li>
                        <li>Informação sobre Trissomia 21 (dado sensível, com consentimento explícito)</li>
                        <li>Necessidade de apoio no processo seletivo</li>
                        <li>Currículo e vídeo de apresentação (quando enviados voluntariamente)</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>2. Como usamos seus dados</h2>
                    <p>Seus dados são utilizados <strong>exclusivamente</strong> para:</p>
                    <ul>
                        <li>Processar sua candidatura às vagas</li>
                        <li>Comunicar atualizações sobre o processo seletivo</li>
                        <li>Adequar o processo às suas necessidades de apoio</li>
                        <li>Gerar métricas anonimizadas de impacto social</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>3. Dados sensíveis</h2>
                    <p>
                        A informação sobre Trissomia 21 é classificada como dado pessoal sensível
                        pela LGPD (Lei Geral de Proteção de Dados). Coletamos essa informação
                        <strong> somente com seu consentimento explícito</strong> e apenas para
                        adequação do processo seletivo.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>4. Compartilhamento</h2>
                    <p>
                        Não compartilhamos seus dados com terceiros. As empresas recrutadoras
                        acessam apenas as informações que você forneceu ao se candidatar.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>5. Seus direitos</h2>
                    <p>Você tem direito a:</p>
                    <ul>
                        <li>Acessar seus dados a qualquer momento</li>
                        <li>Solicitar correção de informações incorretas</li>
                        <li>Pedir a exclusão total dos seus dados</li>
                        <li>Revogar seu consentimento</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>6. Contato</h2>
                    <p>
                        Para exercer qualquer um dos seus direitos ou tirar dúvidas sobre o
                        tratamento dos seus dados, entre em contato: <strong>privacidade@conecta21.app</strong>
                    </p>
                </section>
            </div>
        </div>
    );
}
