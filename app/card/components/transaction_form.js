'use client';

import { useState } from 'react';

const categories = ['Alimentação', 'Transporte', 'Lazer', 'Saúde', 'Educação'];

const TransactionForm = ({ addTransaction }) => {
    const [value, setValue] = useState('');
    const [type, setType] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [file, setFile] = useState(null);

    const handleValueChange = (e) => {
        let inputValue = e.target.value;
        inputValue = inputValue.replace(/\D/g, '');
        inputValue = (inputValue / 100).toFixed(2) + '';
        inputValue = inputValue.replace('.', ',');
        inputValue = inputValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        setValue(`R$ ${inputValue}`);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFileUploadClick = () => {
        document.getElementById('file-upload').click();
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (type && value && selectedCategory) {
            addTransaction(type, value, selectedCategory);
            setValue('');
            setType('');
            setSelectedCategory(null);
            setFile(null);
        }
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
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
            <div className="category-selection">
                {categories.map((category) => (
                    <div
                        key={category}
                        className={`category-item ${selectedCategory === category ? 'selected' : ''}`}
                        onClick={() => handleCategoryClick(category)}
                    >
                        {category}
                    </div>
                ))}
            </div>
            <div className="file-upload-section">
                <input
                    type="file"
                    id="file-upload"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                <button type="button" onClick={handleFileUploadClick} className="transaction-button">
                    Upload de Recibo
                </button>
                {file && <span className="file-name">{file.name}</span>}
            </div>
            <button type="submit" className="btn-concluir">Concluir transação</button>
        </form>
    );
};

export default TransactionForm;