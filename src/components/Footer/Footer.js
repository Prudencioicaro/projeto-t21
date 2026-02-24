import styles from './Footer.module.css';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className={styles.footer} role="contentinfo">
            <div className={styles.inner}>
                <div className={styles.top}>
                    <div className={styles.brand}>
                        <div className={styles.logo}>
                            <span className={styles.logoMark}>C21</span>
                            <span className={styles.logoText}>Conecta21</span>
                        </div>
                        <p className={styles.tagline}>
                            Plataforma de empregabilidade inclusiva para pessoas com Trissomia 21.
                        </p>
                    </div>

                    <div className={styles.links}>
                        <div className={styles.linkGroup}>
                            <h4 className={styles.linkTitle}>Plataforma</h4>
                            <Link href="/#vagas">Ver vagas</Link>
                            <Link href="/rh/cadastro">Para empresas</Link>
                            <Link href="/#como-funciona">Como funciona</Link>
                        </div>
                        <div className={styles.linkGroup}>
                            <h4 className={styles.linkTitle}>Legal</h4>
                            <Link href="/privacidade">Privacidade</Link>
                            <Link href="/termos">Termos de uso</Link>
                            <Link href="/acessibilidade">Acessibilidade</Link>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>© 2026 Conecta21. Todos os direitos reservados.</p>
                    <p className={styles.a11y}>
                        ♿ Plataforma acessível conforme WCAG 2.1
                    </p>
                </div>
            </div>
        </footer>
    );
}
