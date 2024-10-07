import React, { useMemo } from 'react';
import Dialog from '@mui/material/Dialog';
import { IconButton, Stack } from '@mui/material';
import LeadShow from '@/Pages/Geral/Leads/Dialogs/LeadShow.jsx';
import { TbEye, TbX } from 'react-icons/tb';

const DialogIflame = ({ openIflame, handleClose, urlFrontend, leadId, noDialogLead }) => {

    return useMemo(() => {
        return (
            <Dialog
                open={openIflame}
                onClose={handleClose}
                fullWidth maxWidth="xs">
                {openIflame && (<>
                        <Stack direction="row" spacing={2} justifyContent="end" paddingInline={2}>
                            {!noDialogLead && <LeadShow leadId={leadId} iconButton={<TbEye size={24} color="#555" />} />}
                            <IconButton onClick={handleClose}><TbX color="red" /></IconButton>
                        </Stack>
                        <iframe
                            src={urlFrontend}
                            allow="microphone"
                            style={{ width: '100%', height: '700px', border: 'none' }}
                            title="WhatsApp"
                        />
                    </>
                )}
            </Dialog>
        );
    }, [openIflame, handleClose, urlFrontend]);
};
export default DialogIflame;
