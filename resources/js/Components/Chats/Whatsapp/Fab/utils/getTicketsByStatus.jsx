import axios from 'axios';
import { useEffect } from 'react';
import { useWhatsapp } from '@/Hooks/useWhatsapp.jsx';

const optionsFetch = (apiKey) => ({
    headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
    },
});

const GetTicketsByStatus = ({ qtdOpen, setError }) => {
    const { urlBackend, apiKey, userId } = useWhatsapp();

    const url = `${urlBackend}/api/tickets/status?status=open&userId=${userId}`;

    const fetchTickets = async () => {
        try {
            const response = await axios.get(url, optionsFetch(apiKey));

            qtdOpen(response.data.length);
            setError(false);
        } catch (error) {
            setError(true);
            console.error('Erro ao buscar os tickets:', error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        if (urlBackend) fetchTickets();

        const intervalId = setInterval(() => {
            if (urlBackend) fetchTickets();
        }, 5000);
        return () => clearInterval(intervalId);
    }, [urlBackend]);

    return null;
};

export default GetTicketsByStatus;
