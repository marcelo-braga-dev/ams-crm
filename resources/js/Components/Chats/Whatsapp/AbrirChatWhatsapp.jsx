import React, {useState} from "react";

import Dialog from '@mui/material/Dialog';
import {Whatsapp} from "react-bootstrap-icons";


function AbrirChatWhatsapp() {
    const apiURL = 'http://localhost:8082/api';
    const apiToken = 'ecec8e23-e5ec-4a5a-b78a-cb8a2e55142e';

    const [contactNumber, setContactNumber] = useState('');
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [contactID, setContactID] = useState(false);


    const checkAndOpenChat = async () => {
        try {
            // Passo 1: Verificar se o contato existe
            let response = await fetch(`${apiURL}/contacts?number=${encodeURIComponent(contactNumber)}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${apiToken}`,
                    'Content-Type': 'application/json',
                }
            });
            console.log(response)
            let contacts = await response.json();

            let contactId;
            if (contacts.length > 0) {
                // Contato existe
                contactId = contacts[0].id;
            } else {
                // Passo 2: Contato não existe, criar novo contato
                response = await fetch(`${apiURL}/contacts`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${apiToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        number: contactNumber,
                        name: 'TESTE',
                    })
                });
                const newContact = await response.json();
                contactId = newContact.id;
            }

            // Passo 3: Abrir chat com o contato
            response = await fetch(`${apiURL}/tickets`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contactId: contactId,
                    firstMessage: message
                })
            });
            const ticket = await response.json();
            alert(`Chat com o contato ID ${contactId} aberto, ticket ID: ${ticket.id}`);
        } catch (error) {
            console.error('Erro ao abrir chat:', error);
        }
    };

    const enviarMensagem = async () => {
        fetch(`${apiURL}/messages/contacts`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                number: '5516992644769',
                name: 'MARCELO',
            }),
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
            .then(data => {
                setContactID(data?.data?.contactId);
            })
            .catch(error => {
                console.error('Failed to create contact:', error);
            });
    };

    const handleOpen = () => {
        enviarMensagem()
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            {/*<button onClick={enviarMensagem}>CADASTRAR</button>*/}
            <Whatsapp cursor="pointer" size={19} color="green" onClick={handleOpen}/>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="whaticket-modal-title"
                fullWidth={true}
                maxWidth="md"
            >
                {open && <iframe
                    src={`http://localhost:3000/tickets/${contactID}`}
                    style={{width: '100%', height: '500px', border: 'none'}}
                    title="WhatsApp"
                />}
            </Dialog>
        </>
    );
}

export default AbrirChatWhatsapp;



