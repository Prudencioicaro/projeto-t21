'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import styles from './Header.module.css';

export default function Header() {
    const { isRHLoggedIn, isCandidatoLoggedIn } = useApp();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className={styles.header} role="banner">
            <div className={styles.inner}>
                <Link href="/" className={styles.logo} aria-label="Conecta21 – Página inicial">
                    <span className={styles.logoMark}>C21</span>
                    <span className={styles.logoText}>Conecta21</span>
                </Link>

                <button
                    className={styles.menuToggle}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-expanded={menuOpen}
                    aria-label="Abrir menu de navegação"
                >
                    <span className={styles.menuBar}></span>
                    <span className={styles.menuBar}></span>
                    <span className={styles.menuBar}></span>
                </button>

                <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`} role="navigation" aria-label="Menu principal">
                    <Link href="/" className={styles.navLink} onClick={() => setMenuOpen(false)}>
                        Início
                    </Link>
                    <Link href="/vagas" className={styles.navLink} onClick={() => setMenuOpen(false)}>
                        Vagas
                    </Link>
                    <Link href="/#como-funciona" className={styles.navLink} onClick={() => setMenuOpen(false)}>
                        Como funciona
                    </Link>

                    {isCandidatoLoggedIn && (
                        <Link href="/candidato" className={styles.navLink} onClick={() => setMenuOpen(false)}>
                            Minhas candidaturas
                        </Link>
                    )}

                    <div className={styles.navActions}>
                        {isRHLoggedIn ? (
                            <Link href="/rh/dashboard" className="btn btn--primary btn--sm" onClick={() => setMenuOpen(false)}>
                                Dashboard RH
                            </Link>
                        ) : (
                            <Link href="/rh/cadastro" className="btn btn--primary btn--sm" onClick={() => setMenuOpen(false)}>
                                Sou Empresa
                            </Link>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
}
