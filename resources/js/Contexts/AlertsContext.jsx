import React, { createContext, useReducer, useEffect } from 'react';
import AlertError from '@/Components/Alerts/AlertError.jsx';
import AlertSuccess from '@/Components/Alerts/AlertSuccess.jsx';
import { useAlert } from '@/Hooks/useAlert.jsx';

export const AlertsContext = createContext();

const errorReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        case 'SET_SUCCESS':
            return { ...state, success: action.payload };
        default:
            return state;
    }
};

export const AlertProvider = ({ children }) => {
    const [state, dispatch] = useReducer(errorReducer, { error: null });

    const alertError = (message) => {
        dispatch({ type: 'SET_ERROR', payload: message });
    };

    const alertSuccess = (message) => {
        dispatch({ type: 'SET_SUCCESS', payload: message });
    };

    return (
        <AlertsContext.Provider value={{ error: state.error, success: state.success, alertError, alertSuccess }}>
            {children}
        </AlertsContext.Provider>
    );
};

// Listener
export const AlertListener = () => {
    const { error, success } = useAlert();

    useEffect(() => {
        if (error) {
            console.error('Erro:', error);
            AlertError(error);
        }

        if (success) {
            console.info('Success:', success);
            AlertSuccess(success);
        }
    }, [error, success]);

    return null;
};