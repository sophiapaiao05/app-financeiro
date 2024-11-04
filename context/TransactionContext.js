"use client";

import React, { createContext, useState } from 'react';

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([
        { id: 1, type: 'deposito', value: 100 },
        { id: 2, type: 'saque', value: 50 },
    ]);

    return (
        <TransactionContext.Provider value={{ transactions, setTransactions }}>
            {children}
        </TransactionContext.Provider>
    );
};
