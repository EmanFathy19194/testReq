'use client';

import React, { useState, ReactNode, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/lib/store'; // assuming store import path

interface StoreProviderProps {
    children: ReactNode;
}

const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
    const [isStoreReady, setIsStoreReady] = useState<boolean>(false);

    useEffect(() => {
        // Here, we simulate setting up the store or doing any async operations if needed
        setIsStoreReady(true); // This would indicate that the store is ready for use
    }, []);

    if (!isStoreReady) {
        return null; // Don't render anything until the store is ready
    }

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};

export default StoreProvider;
