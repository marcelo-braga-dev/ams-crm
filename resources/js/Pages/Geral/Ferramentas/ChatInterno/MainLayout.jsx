import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import { usePage } from '@inertiajs/react';

const MainLayout = () => {
    const userId = usePage().props.auth.user.id;

    const [chats, setChats] = useState([
        { id: 1, name: 'Usuário 1' },
        { id: 2, name: 'Usuário 2' },
    ]);
    const [selectedChat, setSelectedChat] = useState(null);

    const handleChatSelect = (chatId) => {
        setSelectedChat(chatId);
    };

    const handleSearchChange = (searchTerm) => {
        // Lógica de busca para filtrar a lista de chats
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            {selectedChat} / {userId}
            <Sidebar chats={chats} onChatSelect={handleChatSelect} onSearchChange={handleSearchChange} />
            {selectedChat ? <ChatWindow selectedChat={selectedChat} userId={userId} /> : <div style={{ flex: 1, padding: '20px' }}>Selecione um chat para começar</div>}
        </div>
    );
};

export default MainLayout;
