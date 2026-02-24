import styles from '../privacidade/legal.module.css';

export const metadata = {
    title: 'Termos de Uso – Conecta21',
    description: 'Termos e condições de uso da plataforma Conecta21.',
};

export default function TermosPage() {
    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <h1>Termos de Uso</h1>
                <p className={styles.updated}>Última atualização: Fevereiro de 2026</p>

                <section className={styles.section}>
                    <h2>1. Sobre a plataforma</h2>
                    <p>
                        A Conecta21 é uma plataforma de empregabilidade inclusiva que conecta
                        pessoas com Trissomia 21 a empresas comprometidas com a inclusão.
                        Esta versão é uma Prova de Conceito (POC) com dados simulados.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>2. Uso responsável</h2>
                    <p>
                        Ao utilizar a plataforma, tanto candidatos quanto empresas se comprometem com
                        o respeito, a dignidade e a inclusão no ambiente de trabalho.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>3. Compromisso das empresas</h2>
                    <p>
                        As empresas que utilizam a Conecta21 declaram estar comprometidas com
                        políticas de inclusão e se responsabilizam por manter um ambiente de
                        trabalho acolhedor e adaptado.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>4. Contato</h2>
                    <p>
                        Para questões relacionadas aos termos de uso: <strong>contato@conecta21.app</strong>
                    </p>
                </section>
            </div>
        </div>
    );
}
