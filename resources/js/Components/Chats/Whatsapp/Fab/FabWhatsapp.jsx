import { TbBrandWhatsapp } from 'react-icons/tb';
import Fab from '@mui/material/Fab';
import React, { useMemo } from 'react';
import Dialog from '@mui/material/Dialog';
import { useWhatsapp } from '@/Hooks/useWhatsapp.jsx';
import { Badge } from '@mui/material';
import GetTicketsByStatus from '@/Components/Chats/Whatsapp/Fab/utils/getTicketsByStatus.jsx';

const whatsappButton = (error) => ({
    position: 'fixed',
    bottom: 80,
    right: 20,
    zIndex: 1000,
    backgroundColor: error ? 'red' : '#25d366', // Define a cor vermelha se houver erro
});

const whatsappBadge = {
    '& .MuiBadge-badge': {
        fontSize: '0.8rem',
        height: '25px',
        minWidth: '25px',
        borderRadius: '15px',
    },
};

const FabWhatsapp = () => {
    const { urlFrontend } = useWhatsapp();
    const [open, setOpen] = React.useState(false);
    const [qtdMsg, setQtdMsg] = React.useState(0);
    const [error, setError] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const dialogWhatsapp = useMemo(() => {
        return (<>
            <GetTicketsByStatus qtdOpen={setQtdMsg} setError={setError} />
            <Fab aria-label="edit" sx={whatsappButton(error)} onClick={handleClickOpen} color="success">
                <Badge badgeContent={qtdMsg} color="error"
                       sx={whatsappBadge}>
                    <TbBrandWhatsapp size={35} />
                </Badge>
            </Fab>

            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="md"
                fullWidth
            >
                <iframe
                    src={urlFrontend}
                    allow="microphone"
                    style={{ width: '100%', height: 'calc(100vh - 15em)' }}
                    title="Whaticket"
                />
            </Dialog>
        </>)
    }, [handleClickOpen, setQtdMsg, setError]);

    // getTicketsByStatus();
    return (
        dialogWhatsapp
    );
};
export default FabWhatsapp;
