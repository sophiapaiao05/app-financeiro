import React, { useState } from 'react';

const Statement = ({ transactions, onEditClick, isSelectionMode, onSelect }) => {
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [newAmount, setNewAmount] = useState('');

    const handleTransactionClick = (transaction) => {
        if (isSelectionMode) {
            onSelect(transaction);
            setSelectedTransaction(transaction);
            setNewAmount(transaction.amount);
            setIsEditing(true);
        }
    };

    const handleSaveClick = () => {
        if (selectedTransaction) {
            console.log('Valor de newAmount antes de salvar:', newAmount);
            const formattedAmount = newAmount.startsWith('R$') ? newAmount : `R$ ${newAmount}`;
            const updatedTransaction = { ...(selectedTransaction as object), amount: formattedAmount };
            onEditClick(updatedTransaction);
            setSelectedTransaction(null);
            setIsEditing(false);
            setNewAmount('');
        }
    };

    const handleCloseModal = () => {
        setSelectedTransaction(null);
        setIsEditing(false);
        setNewAmount('');
    };

    return (
        <div className="statement">
            <div className="transactions-container">
                {transactions.map((transaction) => {
                    const month = new Date(transaction.date).toLocaleString('pt-BR', { month: 'long' });
                    return (
                        <div
                            key={transaction.id}
                            className={`transaction ${isSelectionMode ? 'selectable' : ''}`}
                            onClick={() => handleTransactionClick(transaction)}
                        >
                            <div className="month-header">{month}</div>
                            <div className="transaction-header">
                                <div className="transaction-type">{transaction.type}</div>
                                <div className="transaction-date">
                                    {new Date(transaction.date).toLocaleDateString('pt-BR')}
                                </div>

                            </div>
                            <div className="transaction-amount">{transaction.amount}</div>
                            <div className="transaction-category">{transaction.category}</div>
                            {transaction.file && (
                                <div className="file-link">
                                    <a href={transaction.file} target="_blank" rel="noopener noreferrer" className="ver-recibo-link">
                                        Ver Recibo
                                    </a>
                                </div>
                            )}
                            {isSelectionMode && (
                                <input
                                    type="radio"
                                    name="select-transaction"
                                    onChange={() => handleTransactionClick(transaction)}
                                />
                            )}
                            <div className="transaction-divider"></div>
                        </div>
                    );
                })}
            </div>
            {isEditing && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Editar Transação</h2>
                        <input
                            type="text"
                            value={newAmount}
                            onChange={(e) => setNewAmount(e.target.value)}
                        />
                        <button onClick={handleSaveClick}>Salvar</button>
                        <button onClick={handleCloseModal}>Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Statement;