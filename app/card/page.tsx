"use client";

import React, { useState, useEffect } from 'react';
import './styles/card.css';

import TransactionForm from './components/transaction_form.tsx';
import DateComponent from './components/date.tsx';
import Statement from './components/statement.tsx';

const getSuggestedCategory = (type: string) => { const categories = { 'Depósito': 'Receita', 'Saque': 'Despesa', 'Transferência': 'Despesa', 'Pagamento': 'Despesa' }; return categories[type] || 'Outros'; };

const CardPage = () => {
    const [transactions, setTransactions] = useState([{ id: 1, type: 'Depósito', amount: 'R$ 1.000,00', date: '2023-01-15', category: getSuggestedCategory('Depósito') }, { id: 2, type: 'Saque', amount: 'R$ 200,00', date: '2023-02-20', category: getSuggestedCategory('Saque') }, { id: 3, type: 'Transferência', amount: 'R$ 300,00', date: '2023-03-10', category: getSuggestedCategory('Transferência') }, { id: 4, type: 'Pagamento', amount: 'R$ 150,00', date: '2023-04-05', category: getSuggestedCategory('Pagamento') }, { id: 5, type: 'Depósito', amount: 'R$ 1.000,00', date: '2023-01-15', category: getSuggestedCategory('Depósito') }, { id: 6, type: 'Saque', amount: 'R$ 200,00', date: '2023-02-20', category: getSuggestedCategory('Saque') }, { id: 7, type: 'Transferência', amount: 'R$ 300,00', date: '2023-03-10', category: getSuggestedCategory('Transferência') }, { id: 8, type: 'Depósito', amount: 'R$ 500,00', date: '2023-05-01', category: getSuggestedCategory('Depósito') }, { id: 9, type: 'Depósito', amount: 'R$ 750,00', date: '2023-06-15', category: getSuggestedCategory('Depósito') }, { id: 10, type: 'Depósito', amount: 'R$ 1.200,00', date: '2023-07-20', category: getSuggestedCategory('Depósito') },],);

    const [balance, setBalance] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentTransaction, setCurrentTransaction] = useState(setTransactions[0]);
    const [isSelectionMode, setIsSelectionMode] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('Todos');

    const calculateBalance = (transactions) => {
        const total = transactions.reduce((acc, transaction) => {
            const amount = parseFloat(transaction.amount.replace('R$', '').replace(/\./g, '').replace(',', '.'));
            return transaction.type === 'Depósito' ? acc + amount : acc - amount;
        }, 0);
        return total;
    };

    const addTransaction = (type, amount, category, file) => {
        const newTransaction = {
            id: transactions.length + 1,
            type,
            amount,
            date: new Date().toISOString().split('T')[0],
            category,
            file: file ? URL.createObjectURL(file) : null,
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

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilterType(event.target.value);
    };

    const filteredTransactions = transactions.filter(transaction => {
        const matchesSearchTerm = transaction.type.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilterType = filterType === 'Todos' || transaction.type === filterType;
        return matchesSearchTerm && matchesFilterType;
    });

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
                <select value={filterType} onChange={handleFilterChange} className="filter-select">
                    <option value="Todos">Todos</option>
                    <option value="Depósito">Depósito</option>
                    <option value="Saque">Saque</option>
                    <option value="Transferência">Transferência</option>
                    <option value="Pagamento">Pagamento</option>
                </select>
                <input
                    type="text"
                    placeholder="Pesquisar transações..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                <Statement
                    transactions={filteredTransactions}
                    onEditClick={handleEditClick}
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
                    {filteredTransactions.length === 0 && (
                        <div className="no-results">
                            <img src="/assets/not-found.svg" alt="Nenhum resultado encontrado" className="no-results-icon" style={{ width: '50px', height: '50px' }} />
                            <p>Nenhuma transação encontrada</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CardPage;