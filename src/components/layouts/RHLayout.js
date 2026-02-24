'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import styles from './AuthLayout.module.css';

export default function RHLayout({ children }) {
    const pathname = usePathname();
    const { empresa } = useApp();

    const navItems = [
        { href: '/rh/dashboard', label: 'Dashboard', icon: DashIcon },
        { href: '/rh/criar-vaga', label: 'Nova Vaga', icon: PlusIcon },
        { href: '/', label: 'Ver Portal', icon: GlobeIcon },
    ];

    return (
        <div className={styles.shell}>
            {/* Sidebar - Desktop */}
            <aside className={styles.sidebar} role="navigation" aria-label="Menu RH">
                <div className={styles.sidebarTop}>
                    <Link href="/" className={styles.brand}>
                        <span className={styles.brandMark}>C21</span>
                        <span className={styles.brandText}>Conecta21</span>
                    </Link>

                    <div className={styles.userCard}>
                        <div className={styles.userAvatar}>
                            {empresa.nome ? empresa.nome.charAt(0).toUpperCase() : 'R'}
                        </div>
                        <div className={styles.userInfo}>
                            <span className={styles.userName}>{empresa.nome || 'RH'}</span>
                            <span className={styles.userRole}>{empresa.empresa || 'Empresa'}</span>
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
                    <div className={styles.sidebarStats}>
                        <div className={styles.sidebarStat}>
                            <span className={styles.sidebarStatNum}>{empresa.dashboard?.vagasAtivas || 0}</span>
                            <span className={styles.sidebarStatLabel}>Vagas ativas</span>
                        </div>
                        <div className={styles.sidebarStat}>
                            <span className={styles.sidebarStatNum}>{empresa.dashboard?.totalCandidatos || 0}</span>
                            <span className={styles.sidebarStatLabel}>Candidatos</span>
                        </div>
                    </div>
                    <div className={styles.a11yBadge}>♿ WCAG 2.1</div>
                </div>
            </aside>

            {/* Main Content */}
            <div className={styles.mainArea}>
                <header className={styles.topBar}>
                    <div className={styles.topBarLeft}>
                        <h2 className={styles.topBarTitle}>Painel RH</h2>
                    </div>
                    <div className={styles.topBarRight}>
                        <span className={styles.topBarBadge}>Área Empresarial</span>
                    </div>
                </header>
                <main id="main-content" className={styles.content} role="main" tabIndex={-1}>
                    {children}
                </main>
            </div>

            {/* Bottom Bar - Mobile */}
            <nav className={styles.bottomBar} aria-label="Menu rápido RH">
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

// -- SVG Icons (inline, no dependencies) --
function DashIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
        </svg>
    );
}

function PlusIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
    );
}

function GlobeIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
    );
}
