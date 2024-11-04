'use client';

import { useState } from 'react';

const TransactionForm = ({ addTransaction }) => {
    const [value, setValue] = useState('');
    const [type, setType] = useState('');

    const handleValueChange = (e) => {
        let inputValue = e.target.value;
        inputValue = inputValue.replace(/\D/g, '');
        inputValue = (inputValue / 100).toFixed(2) + '';
        inputValue = inputValue.replace('.', ',');
        inputValue = inputValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        setValue(`R$ ${inputValue}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (type && value) {
            addTransaction(type, value);
            setValue('');
            setType('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="transaction-type" style={{ display: 'block', textAlign: 'left', marginBottom: '8px', marginLeft: '0', marginRight: '0' }}>
                <select id="transaction-type" className="select-transaction-type" value={type} onChange={(e) => setType(e.target.value)} required>
                    <option value="" disabled>Selecione o tipo de transação</option>
                    <option value="Depósito">Depósito</option>
                    <option value="Transferência">Transferência</option>
                    <option value="Pagamento">Pagamento</option>
                    <option value="Saque">Saque</option>
                </select>
            </label>
            <label htmlFor="transaction-value" style={{ display: 'block', textAlign: 'left', marginBottom: '8px', marginLeft: '0', marginRight: '0', marginTop: '8x' }}>
                <span className="label-valor">Valor</span>
                <input
                    type="text"
                    id="transaction-value"
                    className="input-valor"
                    required
                    placeholder="Insira o valor"
                    value={value}
                    onChange={handleValueChange}
                />
            </label>
            <button type="submit" className="btn-concluir">Concluir transação</button>
        </form>
    );
};

export default TransactionForm;