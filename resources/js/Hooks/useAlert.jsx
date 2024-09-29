import { useContext } from 'react';
import { AlertsContext } from '@/Contexts/AlertsContext.jsx';

export const useAlert = () => {

    const context = useContext(AlertsContext);

    if (!context) {
        throw new Error('useAlert deve ser usado dentro de um AlertProvider');
    }

    return context;
};
