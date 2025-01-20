import React from 'react';
import '../styles.css';
import TransactionForm from './components/transaction_form.js';

const NovaTransacao = () => {
    return (
        <div className="card-page">
            <h1 className="transaction-title">Nova Transação</h1>
            <div className="transaction-card">
                <TransactionForm addTransaction={undefined} />
            </div>
        </div>
    );
};

export default NovaTransacao;