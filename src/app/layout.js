import './globals.css';
import { AppProvider } from '@/context/AppContext';
import LayoutShell from '@/components/LayoutShell';

export const metadata = {
  title: 'Conecta21 – Plataforma de Empregabilidade Inclusiva',
  description: 'Plataforma de recrutamento especializada em pessoas com Trissomia 21. Vagas inclusivas, linguagem simples e acessibilidade total.',
  keywords: 'empregabilidade inclusiva, trissomia 21, síndrome de down, vagas inclusivas, recrutamento inclusivo, WCAG',
  openGraph: {
    title: 'Conecta21 – Empregabilidade Inclusiva',
    description: 'Conectando talentos com empresas comprometidas com a inclusão.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <AppProvider>
          <LayoutShell>{children}</LayoutShell>
        </AppProvider>
      </body>
    </html>
  );
}
