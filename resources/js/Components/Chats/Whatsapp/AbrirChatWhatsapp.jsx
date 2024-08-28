import React, {useState} from "react";

import Dialog from '@mui/material/Dialog';
import {Whatsapp} from "react-bootstrap-icons";
import {Badge, Menu} from "@mui/material";

function AbrirChatWhatsapp({telefones}) {
    const apiURL = 'http://localhost:8082/api';
    const apiToken = 'ecec8e23-e5ec-4a5a-b78a-cb8a2e55142e';

    const [open, setOpen] = useState(false);
    const [contactID, setContactID] = useState(false);

    const fetchCadastrarContato = async ({telefone}) => {
        await fetch(`${apiURL}/messages/contacts`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                number: telefone,
                name: 'TESTE',
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
    }

    const enviarMensagem = async () => {
        telefones.map(telefone => {
            if (telefone) fetchCadastrarContato(telefone)
        })

    };

    const handleOpenWhatsapp = () => {
        enviarMensagem()
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            {telefones.length > 0
                ? <Whatsapp size={19} cursor="pointer" color="green" onClick={handleOpenWhatsapp}/>
                : <Whatsapp size={19} color="gray"/>}

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="whaticket-modal-title"
                fullWidth={true}
                maxWidth="md"
            >
                {open && contactID && <iframe
                    src={`http://localhost:3000/tickets/${contactID}`}
                    style={{width: '100%', height: '700px', border: 'none'}}
                    title="WhatsApp"
                />}
            </Dialog>
        </>
    );
}

export default AbrirChatWhatsapp;



