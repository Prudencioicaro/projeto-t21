import styles from '../privacidade/legal.module.css';

export const metadata = {
    title: 'Acessibilidade – Conecta21',
    description: 'Informações sobre os recursos de acessibilidade da plataforma Conecta21.',
};

export default function AcessibilidadePage() {
    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <h1>Acessibilidade</h1>
                <p className={styles.updated}>Nosso compromisso com a inclusão digital</p>

                <section className={styles.section}>
                    <h2>Conformidade WCAG 2.1</h2>
                    <p>
                        A Conecta21 foi projetada seguindo as diretrizes de acessibilidade WCAG 2.1
                        nível AA, garantindo que todas as pessoas possam utilizar a plataforma,
                        independentemente de suas habilidades.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>Recursos disponíveis</h2>
                    <ul>
                        <li><strong>Alto contraste:</strong> Botão para ativar modo de alto contraste</li>
                        <li><strong>Aumento de fonte:</strong> 4 níveis de tamanho de texto (100%, 115%, 130%, 150%)</li>
                        <li><strong>Navegação por teclado:</strong> Todos os elementos são acessíveis via Tab</li>
                        <li><strong>Pular para o conteúdo:</strong> Link para pular diretamente para o conteúdo principal</li>
                        <li><strong>Labels claros:</strong> Todos os campos possuem rótulos descritivos</li>
                        <li><strong>Ícones com texto:</strong> Nenhum ícone é usado sem texto acompanhante</li>
                        <li><strong>Linguagem simples:</strong> Descrições de vagas traduzidas para linguagem acessível</li>
                        <li><strong>Formulários claros:</strong> Campos com feedback visual e mensagens de erro compreensíveis</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>Problemas de acessibilidade?</h2>
                    <p>
                        Se encontrar qualquer barreira de acessibilidade na plataforma,
                        entre em contato: <strong>acessibilidade@conecta21.app</strong>
                    </p>
                </section>
            </div>
        </div>
    );
}
