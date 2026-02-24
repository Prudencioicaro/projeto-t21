'use client';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import Onboarding from '@/components/Onboarding/Onboarding';
import styles from './page.module.css';

export default function LandingPage() {
  const { vagas } = useApp();
  const vagasAtivas = vagas.filter(v => v.status === 'Ativa');

  return (
    <>
      <Onboarding />

      {/* ── HERO ── */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <AccessibleIcon />
              <span>Plataforma 100% acessível</span>
            </div>
            <h1 id="hero-title" className={styles.heroTitle}>
              Conectando talentos<br />
              <span className={styles.heroHighlight}>com empresas inclusivas</span>
            </h1>
            <p className={styles.heroDesc}>
              A Conecta21 é uma plataforma de recrutamento feita para pessoas com
              Trissomia 21. Vagas com linguagem simples, ambiente adaptado e apoio real.
            </p>
            <div className={styles.heroActions}>
              <a href="#vagas" className="btn btn--primary btn--lg">
                Ver vagas abertas
              </a>
              <Link href="/rh/cadastro" className="btn btn--secondary btn--lg">
                Sou empresa
              </Link>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.heroCard}>
              <div className={styles.heroCardTop}>
                <div className={styles.heroCardAvatar}>SB</div>
                <div>
                  <strong>Auxiliar de Estoque</strong>
                  <span>Supermercado Bom Preço</span>
                </div>
              </div>
              <div className={styles.heroCardMatch}>
                <div className={styles.matchCircle}>87<small>%</small></div>
                <span>Compatibilidade</span>
              </div>
              <div className={styles.heroCardBadges}>
                <span className="badge badge--selo">
                  <CheckIcon /> Selo Inclusivo
                </span>
                <span className="badge badge--info">Presencial</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.heroStatsBar}>
          <div className="container">
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>{vagasAtivas.length}</span>
                <span className={styles.statLabel}>Vagas ativas</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>28</span>
                <span className={styles.statLabel}>Candidatos</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>4</span>
                <span className={styles.statLabel}>Contratações</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WALKTHROUGH ── */}
      <section className={styles.walkthrough} id="como-funciona" aria-labelledby="walkthrough-title">
        <div className="container">
          <div className="section-header">
            <h2 id="walkthrough-title">Como funciona?</h2>
            <p>O caminho do candidato em 4 passos simples.</p>
          </div>

          <div className={styles.stepsRow}>
            {[
              {
                num: '1',
                title: 'Encontre uma vaga',
                text: 'Navegue pela lista de vagas. Cada uma mostra a empresa, o cargo e se o local é adaptado para você.',
                icon: <SearchJobIcon />,
              },
              {
                num: '2',
                title: 'Preencha seus dados',
                text: 'Coloque seu nome, e-mail e telefone. Sem criar conta antes. Rápido e fácil.',
                icon: <FormIcon />,
              },
              {
                num: '3',
                title: 'Envie sua candidatura',
                text: 'Clique em enviar. Você recebe um e-mail de confirmação e um link para acompanhar.',
                icon: <SendIcon />,
              },
              {
                num: '4',
                title: 'Acompanhe o resultado',
                text: 'Na sua área, veja cada etapa: recebido, em análise, entrevista e resultado.',
                icon: <TimelineIcon />,
              },
            ].map((step, i) => (
              <div key={i} className={styles.stepCard}>
                <div className={styles.stepIconWrap}>
                  {step.icon}
                </div>
                <div className={styles.stepNum}>{step.num}</div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepText}>{step.text}</p>
              </div>
            ))}
          </div>

          <div className={styles.walkthroughCTA}>
            <Link href="/vagas" className="btn btn--primary btn--lg">
              Ver todas as vagas
            </Link>
          </div>
        </div>
      </section>

      {/* ── DEPOIMENTO ── */}
      <section className={styles.testimonial} aria-labelledby="testimonial-title">
        <div className="container container--narrow">
          <h2 id="testimonial-title" className="sr-only">Depoimento</h2>
          <div className={styles.quoteWrap}>
            <span className={styles.quoteGlyph} aria-hidden="true">&ldquo;</span>
            <blockquote className={styles.quote}>
              <p className={styles.quoteText}>
                Meu filho conseguiu o primeiro emprego pela Conecta21.
                O processo foi simples e a empresa estava preparada para recebê-lo.
                Estamos muito felizes.
              </p>
              <footer className={styles.quoteAuthor}>
                <div className={styles.quoteAvatar}>MR</div>
                <div>
                  <strong>Maria Regina</strong>
                  <span>Mãe do Gabriel, contratado pela Biblioteca Municipal</span>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ── VAGAS ── */}
      <section className={styles.vagasSection} id="vagas" aria-labelledby="vagas-title">
        <div className="container">
          <div className="section-header">
            <h2 id="vagas-title">Vagas abertas</h2>
            <p>Oportunidades em empresas comprometidas com a inclusão.</p>
          </div>

          <div className={styles.vagasGrid}>
            {vagasAtivas.map((vaga, idx) => (
              <article key={vaga.id} className={`${styles.vagaCard} ${idx === 0 ? styles.vagaFeatured : ''}`}>
                {vaga.seloInclusivo && (
                  <div className={styles.vagaSelo}>
                    <CheckIcon /> Empresa Inclusiva
                  </div>
                )}
                <div className={styles.vagaCardTop}>
                  <div className={styles.vagaLogo}>{vaga.logoInicial}</div>
                  <div className={styles.vagaInfo}>
                    <h3 className={styles.vagaCargo}>{vaga.cargo}</h3>
                    <p className={styles.vagaEmpresa}>{vaga.empresa}</p>
                  </div>
                </div>

                <div className={styles.vagaMeta}>
                  <span className={styles.metaItem}>
                    <LocationIcon /> {vaga.localizacao}
                  </span>
                  <span className={styles.metaItem}>
                    <ClockIcon /> {vaga.jornada}
                  </span>
                </div>

                <p className={styles.vagaDesc}>{vaga.descricaoSimplificada}</p>

                {vaga.faixaSalarial && (
                  <p className={styles.vagaSalario}>{vaga.faixaSalarial}</p>
                )}

                <div className={styles.vagaSkills}>
                  {vaga.habilidadesTecnicas.slice(0, 3).map(h => (
                    <span key={h} className="badge badge--neutral">{h}</span>
                  ))}
                </div>

                <Link
                  href={`/vaga/${vaga.id}`}
                  className="btn btn--accent btn--full"
                  aria-label={`Candidatar-se para ${vaga.cargo} na ${vaga.empresa}`}
                >
                  Quero me candidatar
                </Link>
              </article>
            ))}
          </div>

          <div className={styles.walkthroughCTA} style={{ marginTop: 'var(--space-10)' }}>
            <Link href="/vagas" className="btn btn--secondary btn--lg">
              Ver todas as vagas com filtros
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOR COMPANIES ── */}
      <section className={styles.forCompanies} aria-labelledby="companies-title">
        <div className="container">
          <div className={styles.companiesInner}>
            <div className={styles.companiesText}>
              <h2 id="companies-title">Para empresas</h2>
              <p className={styles.companiesDesc}>
                Crie vagas inclusivas com nossa ferramenta guiada.
                Receba o Selo Empresa Inclusiva e faça parte de um
                movimento que transforma vidas.
              </p>
              <ul className={styles.companiesList}>
                <li><ArrowIcon /> Estruturador inteligente de vagas</li>
                <li><ArrowIcon /> Tradução automática para linguagem simples</li>
                <li><ArrowIcon /> Dashboard com métricas de impacto ESG</li>
                <li><ArrowIcon /> Match por habilidades e ambiente</li>
              </ul>
              <Link href="/rh/cadastro" className="btn btn--primary btn--lg">
                Criar conta empresarial
              </Link>
            </div>
            <div className={styles.companiesVisual}>
              <div className={styles.dashPreview}>
                <div className={styles.dashHeader}>
                  <strong>Dashboard de Impacto</strong>
                  <span className="badge badge--active">ESG</span>
                </div>
                <div className={styles.dashStats}>
                  <div className={styles.dashStat}>
                    <span className={styles.dashNum}>28</span>
                    <span className={styles.dashLabel}>Candidatos T21</span>
                  </div>
                  <div className={styles.dashStat}>
                    <span className={styles.dashNum}>4</span>
                    <span className={styles.dashLabel}>Contratações</span>
                  </div>
                  <div className={styles.dashStat}>
                    <span className={styles.dashNum}>87%</span>
                    <span className={styles.dashLabel}>Retenção</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ── SVG Icons ──
function AccessibleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-1-13a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm3 4h-1.5v1l1.5 4h-2l-1-3-1 3H8l1.5-4V11H8V9h6v2z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function SearchJobIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function FormIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function TimelineIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0, marginTop: '3px' }}>
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
