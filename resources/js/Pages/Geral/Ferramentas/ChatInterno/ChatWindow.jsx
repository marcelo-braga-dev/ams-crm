import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const ChatWindow = ({ selectedChat, userId }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // if (selectedChat) {
        setMessages([]);

        // Ouve o evento de mensagem
        window.Echo.private(`chat.2`)
            .listen('MessageSent', (e) => {
                console.log('XXXXXXXXXXXXXXXXXXXXXXXXXX', e);
                // setMessages((prevMessages) => [...prevMessages, e.message]);
            });
        // }

        // Limpa o listener quando o componente é desmontado
        return () => {
            window.Echo.leave(`private-chat.${selectedChat}`);
        };
    }, [selectedChat]);

    const handleSendMessage = async () => {
        if (message.trim()) {
            try {
                // Envia a mensagem para o backend
                await axios.post(route('auth.ferramentas.chat-interno.api.send-message'), {
                    chat_id: selectedChat,
                    user_id: userId,
                    content: message,
                    recipient_id: selectedChat,
                });

                // Adiciona a mensagem localmente para visualização imediata
                // setMessages((prevMessages) => [
                //     ...prevMessages,
                //     { content: message, user_id: userId }
                // ]);

                setMessage(''); // Limpa o campo de mensagem
            } catch (error) {
                console.error('Erro ao enviar a mensagem:', error);
            }
        }
    };

    return (
        <Box style={{ flex: 1, padding: '20px', height: '50vh', display: 'flex', flexDirection: 'column' }}>
            <Box style={{ flex: 1, overflowY: 'auto', marginBottom: '20px' }}>
                {messages.map((msg, index) => (
                    <Typography key={index} variant="body1">
                        {msg.content}
                    </Typography>
                ))}
            </Box>
            <Box style={{ display: 'flex', gap: '10px' }}>
                <TextField
                    variant="outlined"
                    fullWidth
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Digite uma mensagem"
                />
                <Button variant="contained" color="primary" onClick={handleSendMessage}>
                    Enviar
                </Button>
            </Box>
        </Box>
    );
};

export default ChatWindow;
