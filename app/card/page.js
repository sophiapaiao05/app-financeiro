"use client";

import React, { useState, useEffect } from 'react';
import './styles/card.css';

import TransactionForm from './components/transaction_form.js';
import DateComponent from './components/date.js';
import Statement from './components/statement.js';

const CardPage = () => {
    const [transactions, setTransactions] = useState([
        { id: 1, type: 'Depósito', amount: 'R$ 1.000,00', date: '2023-01-15' },
        { id: 2, type: 'Saque', amount: 'R$ 200,00', date: '2023-02-20' },
        { id: 3, type: 'Transferência', amount: 'R$ 300,00', date: '2023-03-10' },
        { id: 4, type: 'Pagamento', amount: 'R$ 150,00', date: '2023-04-05' },
    ]);

    const [balance, setBalance] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentTransaction, setCurrentTransaction] = useState(null);
    const [newAmount, setNewAmount] = useState('');
    const [isSelectionMode, setIsSelectionMode] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const calculateBalance = (transactions) => {
        const total = transactions.reduce((acc, transaction) => {
            const amount = parseFloat(transaction.amount.replace('R$', '').replace(/\./g, '').replace(',', '.'));
            return transaction.type === 'Depósito' ? acc + amount : acc - amount;
        }, 0);
        return total;
    };

    const addTransaction = (type, amount) => {
        const newTransaction = {
            id: transactions.length + 1,
            type,
            amount,
            date: new Date().toISOString().split('T')[0]
        };
        setTransactions([...transactions, newTransaction]);
    };

    const handleEditClick = (updatedTransaction) => {
        const updatedTransactions = transactions.map((transaction) =>
            transaction.id === updatedTransaction.id
                ? updatedTransaction
                : transaction
        );
        setTransactions(updatedTransactions);
    };

    useEffect(() => {
        setBalance(calculateBalance(transactions));
    }, [transactions]);

    const handleDeleteClick = () => {
        if (selectedTransaction) {
            setIsDeleting(true);
            setCurrentTransaction(selectedTransaction);
        } else {
            alert('Por favor, selecione uma transação para excluir.');
        }
    };

    const handleConfirmDelete = () => {
        if (currentTransaction) {
            const updatedTransactions = transactions.filter(transaction => transaction.id !== currentTransaction.id);
            setTransactions(updatedTransactions);
            setIsDeleting(false);
            setCurrentTransaction(null);
            setSelectedTransaction(null);
        }
    };

    const handleCancelDelete = () => {
        setIsDeleting(false);
        setCurrentTransaction(null);
    };

    const handleSelectionModeClick = () => {
        setIsSelectionMode(!isSelectionMode);
    };


    const handleSelect = (transaction) => {
        setSelectedTransaction(transaction);
    };

    return (
        <div className="card-page">
            <header className="card-header">
                <div className="header-content">
                </div>
                <div className="container">
                    <div className="header-info">
                        <h3 className="header-text">Sophia Alves</h3>
                        <img src="/assets/avatar.svg" alt="Avatar" className="avatar-icon" />
                    </div>
                </div>
            </header>
            <div className="card">
                <div className="top-content">
                    <h3 className="greeting-text">Olá, Sophia! :)</h3>
                    <DateComponent />
                </div>
                <div className="middle-content">
                    <div className="account-info">
                        <div className="saldo">
                            Saldo
                            <img src="/assets/eye.svg" alt="Icon" className="icon" />
                        </div>
                        <div className="line"></div>
                        <div className="account-type">Conta Corrente</div>
                        <div className="balance">R$ {balance.toFixed(2).replace('.', ',')}</div>
                    </div>
                </div>
            </div>
            <div className="right-column">
                <h2 className="column-title">
                    Extrato
                    <div className="icon-container">
                        <img src="/assets/edit.svg" alt="Extrato Icon" className="icon-extrato" onClick={handleSelectionModeClick} />
                        <img src="/assets/delete.svg" alt="Novo Icon" className="icon-extrato" onClick={handleDeleteClick} />
                    </div>
                </h2>
                <Statement
                    transactions={transactions}
                    onEditClick={handleEditClick}
                    onDeleteClick={handleDeleteClick}
                    isSelectionMode={isSelectionMode}
                    onSelect={handleSelect}
                />
            </div>
            <div className="transaction-card">
                <h2 style={{ color: 'white' }}>Nova Transação</h2>
                <TransactionForm addTransaction={addTransaction} />
            </div>
            {isDeleting && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Confirmar Exclusão</h2>
                        <p>Tem certeza de que deseja excluir esta transação?</p>
                        <button onClick={handleConfirmDelete}>Confirmar</button>
                        <button onClick={handleCancelDelete}>Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardPage;