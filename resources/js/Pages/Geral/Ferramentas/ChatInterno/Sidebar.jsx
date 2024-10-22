import React, { useState } from 'react';
import { List, ListItem, ListItemText, TextField, Divider } from '@mui/material';

const Sidebar = ({ chats, onChatSelect, onSearchChange }) => {
    const [search, setSearch] = useState('');

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        onSearchChange(e.target.value);
    };

    return (
        <div style={{ width: 300, borderRight: '1px solid #ddd', height: '100vh' }}>
            <TextField
                label="Pesquisar"
                variant="outlined"
                fullWidth
                value={search}
                onChange={handleSearchChange}
                style={{ margin: '10px' }}
            />
            <List>
                {chats.map((chat) => (
                    <div key={chat.id}>
                        <ListItem button onClick={() => onChatSelect(chat.id)}>
                            <ListItemText primary={chat.name} />
                        </ListItem>
                        <Divider />
                    </div>
                ))}
            </List>
        </div>
    );
};

export default Sidebar;
