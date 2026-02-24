'use client';
import { createContext, useContext, useState, useCallback } from 'react';
import vagasData from '@/data/vagas.json';
import empresaData from '@/data/empresaRH.json';
import candidatoData from '@/data/candidato.json';

const AppContext = createContext();

export function AppProvider({ children }) {
    const [vagas, setVagas] = useState(vagasData);
    const [empresa, setEmpresa] = useState(empresaData);
    const [candidato, setCandidato] = useState(candidatoData);
    const [isRHLoggedIn, setIsRHLoggedIn] = useState(false);
    const [isCandidatoLoggedIn, setIsCandidatoLoggedIn] = useState(false);
    const [toasts, setToasts] = useState([]);
    const [fontScale, setFontScale] = useState(1);
    const [highContrast, setHighContrast] = useState(false);

    const addToast = useCallback((message, type = 'success') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 5000);
    }, []);

    const loginRH = useCallback((data) => {
        setEmpresa(prev => ({ ...prev, ...data }));
        setIsRHLoggedIn(true);
        addToast('Login realizado com sucesso!');
    }, [addToast]);

    const loginCandidato = useCallback(() => {
        setIsCandidatoLoggedIn(true);
        addToast('Bem-vindo de volta! Acompanhe suas candidaturas.');
    }, [addToast]);

    const criarVaga = useCallback((novaVaga) => {
        const vaga = {
            ...novaVaga,
            id: `vaga-${Date.now()}`,
            status: 'Ativa',
            dataCriacao: new Date().toISOString().split('T')[0],
            candidatos: [],
            seloInclusivo: novaVaga.ambiente?.treinamentoInicial && novaVaga.ambiente?.supervisorDesignado && novaVaga.ambiente?.adaptacaoFisica,
            nivelSelo: (novaVaga.ambiente?.treinamentoInicial && novaVaga.ambiente?.supervisorDesignado && novaVaga.ambiente?.adaptacaoFisica) ? 1 : 0
        };
        setVagas(prev => [vaga, ...prev]);
        setEmpresa(prev => ({
            ...prev,
            dashboard: {
                ...prev.dashboard,
                totalVagas: prev.dashboard.totalVagas + 1,
                vagasAtivas: prev.dashboard.vagasAtivas + 1
            }
        }));
        addToast('Vaga criada e publicada com sucesso!');
        return vaga;
    }, [addToast]);

    const aplicarVaga = useCallback((vagaId, dadosCandidato) => {
        // Add candidate to the vaga
        const matchScore = Math.floor(Math.random() * 30) + 65;
        const novoCandidato = {
            id: `cand-${Date.now()}`,
            ...dadosCandidato,
            status: 'Recebido',
            dataAplicacao: new Date().toISOString().split('T')[0],
            matchScore
        };

        setVagas(prev => prev.map(v =>
            v.id === vagaId
                ? { ...v, candidatos: [...v.candidatos, novoCandidato] }
                : v
        ));

        // Update candidato state
        const vagaInfo = vagas.find(v => v.id === vagaId);
        setCandidato(prev => ({
            ...prev,
            nome: dadosCandidato.nome,
            email: dadosCandidato.email,
            telefone: dadosCandidato.telefone,
            cidade: dadosCandidato.cidade,
            candidaturas: [
                ...prev.candidaturas,
                {
                    vagaId,
                    empresa: vagaInfo?.empresa || '',
                    cargo: vagaInfo?.cargo || '',
                    status: 'Recebido',
                    dataAplicacao: new Date().toISOString().split('T')[0],
                    timeline: [
                        { etapa: 'Recebido', data: new Date().toISOString().split('T')[0], concluido: true },
                        { etapa: 'Em análise', data: null, concluido: false },
                        { etapa: 'Entrevista agendada', data: null, concluido: false },
                        { etapa: 'Resultado', data: null, concluido: false }
                    ]
                }
            ]
        }));

        setIsCandidatoLoggedIn(true);
        addToast('Candidatura enviada com sucesso! Verifique seu e-mail.');
        return novoCandidato;
    }, [vagas, addToast]);

    const atualizarStatusCandidato = useCallback((vagaId, candidatoId, novoStatus) => {
        setVagas(prev => prev.map(v =>
            v.id === vagaId
                ? {
                    ...v,
                    candidatos: v.candidatos.map(c =>
                        c.id === candidatoId
                            ? { ...c, status: novoStatus }
                            : c
                    )
                }
                : v
        ));
        addToast(`Status atualizado para: ${novoStatus}`);
    }, [addToast]);

    const cycleFontScale = useCallback(() => {
        setFontScale(prev => {
            if (prev === 1) return 1.15;
            if (prev === 1.15) return 1.3;
            if (prev === 1.3) return 1.5;
            return 1;
        });
    }, []);

    const toggleContrast = useCallback(() => {
        setHighContrast(prev => !prev);
    }, []);

    return (
        <AppContext.Provider value={{
            vagas,
            empresa,
            candidato,
            isRHLoggedIn,
            isCandidatoLoggedIn,
            toasts,
            fontScale,
            highContrast,
            loginRH,
            loginCandidato,
            criarVaga,
            aplicarVaga,
            atualizarStatusCandidato,
            addToast,
            cycleFontScale,
            toggleContrast,
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (!context) throw new Error('useApp must be used within AppProvider');
    return context;
}
