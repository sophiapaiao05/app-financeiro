"use client";
import { TransactionProvider } from '../context/TransactionContext';
import '../app/styles.css';

export default function RootLayout({ children }) {
    return (
        <html>
            <body>
                <TransactionProvider>
                    {children}
                </TransactionProvider>
            </body>
        </html>
    );
}
