"use client";

import { useContext } from 'react';
import { TransactionContext } from '../../context/TransactionContext';
import Advantage from '../../components/design-system/advantage.js';
import Footer from '../../components/design-system/footer.js';
import '../styles.css';
import advantagesData from '../../data/advantagesData';
import { useRouter } from 'next/router';

const Home = () => {
    const context = useContext(TransactionContext);

    if (!context) {
        return <div>Erro ao carregar o contexto.</div>;
    }

    const { transactions } = context;

    const balance = transactions.reduce((acc, transaction) => {
        return transaction.type === 'deposito' ? acc + transaction.value : acc - transaction.value;
    }, 0);

    return (
        <div className="page-container">
            <div className="header">
                <div className="left-buttons">
                    <img
                        src="/assets/logo.svg"
                        alt="Logo"
                        style={{ width: '145.69px', height: '32px', marginRight: '16px' }}
                    />
                    <button className="text-button">Sobre</button>
                    <button className="text-button">Serviços</button>
                </div>
                <div className="right-buttons">
                    <button className="open-account-button" >Abrir Minha Conta</button>
                    <button className="have-account-button">Já tenho conta</button>
                </div>
            </div>

            <div className="home-container" style={{ padding: '0 360px', margin: '0' }}>
                <div className="banner-container" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', marginBottom: '40px' }}>
                    <p className="text-style" style={{ marginRight: '76px' }}>
                        Experimente mais liberdade no controle da sua vida financeira. Crie sua conta com a gente!
                    </p>
                    <img
                        src="/assets/banner.svg"
                        alt="Descrição da imagem"
                        style={{ width: '661.06px', height: '412.12px' }}
                    />
                </div>

                <h2 className="vantagens-titulo" style={{ marginTop: '40px', textAlign: 'center' }}>
                    Vantagens do nosso banco
                </h2>

                <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '24px' }}>
                    {advantagesData.map((advantage, index) => (
                        <Advantage
                            key={index}
                            title={advantage.title}
                            subtitle={advantage.subtitle}
                            icon={advantage.icon}
                        />
                    ))}
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default Home;
