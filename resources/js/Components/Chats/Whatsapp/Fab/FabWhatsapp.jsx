import { TbBrandWhatsapp } from 'react-icons/tb';
import Fab from '@mui/material/Fab';
import React from 'react';
import Dialog from '@mui/material/Dialog';
import { useWhatsapp } from '@/Hooks/useWhatsapp.jsx';

const whatsappButton = {
    position: 'fixed',
    bottom: 30,
    right: 20,
    zIndex: 1000,
    backgroundColor: '#25d366',
};

const FabWhatsapp = () => {
    const { urlFrontend } = useWhatsapp();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Fab color="success" aria-label="edit" sx={whatsappButton} onClick={handleClickOpen}>
                <TbBrandWhatsapp size={35} />
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
        </>
    );
};
export default FabWhatsapp;
