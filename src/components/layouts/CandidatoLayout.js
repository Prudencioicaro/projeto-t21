'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import styles from './AuthLayout.module.css';

export default function CandidatoLayout({ children }) {
    const pathname = usePathname();
    const { candidato } = useApp();

    const navItems = [
        { href: '/candidato', label: 'Candidaturas', icon: ListIcon },
        { href: '/candidato/vagas', label: 'Explorar Vagas', icon: SearchIcon },
        { href: '/', label: 'Início', icon: HomeIcon },
    ];

    return (
        <div className={styles.shell}>
            {/* Sidebar - Desktop */}
            <aside className={`${styles.sidebar} ${styles.sidebarSimple}`} role="navigation" aria-label="Menu do candidato">
                <div className={styles.sidebarTop}>
                    <Link href="/" className={styles.brand}>
                        <span className={styles.brandMark}>C21</span>
                        <span className={styles.brandText}>Conecta21</span>
                    </Link>

                    <div className={styles.userCard}>
                        <div className={`${styles.userAvatar} ${styles.userAvatarCandidate}`}>
                            {candidato.nome ? candidato.nome.charAt(0).toUpperCase() : 'C'}
                        </div>
                        <div className={styles.userInfo}>
                            <span className={styles.userName}>{candidato.nome || 'Candidato'}</span>
                            <span className={styles.userRole}>Minha conta</span>
                        </div>
                    </div>

                    <nav className={styles.nav}>
                        {navItems.map(item => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`${styles.navItem} ${pathname === item.href ? styles.navActive : ''}`}
                                aria-current={pathname === item.href ? 'page' : undefined}
                            >
                                <item.icon />
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className={styles.sidebarBottom}>
                    <div className={styles.a11yBadge}>♿ Plataforma acessível</div>
                </div>
            </aside>

            {/* Main Content */}
            <div className={styles.mainArea}>
                <header className={styles.topBar}>
                    <div className={styles.topBarLeft}>
                        <h2 className={styles.topBarTitle}>Minha Área</h2>
                    </div>
                    <div className={styles.topBarRight}>
                        <span className={styles.topBarBadgeCand}>Área do Candidato</span>
                    </div>
                </header>
                <main id="main-content" className={styles.content} role="main" tabIndex={-1}>
                    {children}
                </main>
            </div>

            {/* Bottom Bar - Mobile */}
            <nav className={styles.bottomBar} aria-label="Menu rápido">
                {navItems.map(item => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`${styles.bottomItem} ${pathname === item.href ? styles.bottomActive : ''}`}
                        aria-current={pathname === item.href ? 'page' : undefined}
                    >
                        <item.icon />
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>
        </div>
    );
}

// -- SVG Icons --
function ListIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
        </svg>
    );
}

function SearchIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
    );
}

function HomeIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    );
}
