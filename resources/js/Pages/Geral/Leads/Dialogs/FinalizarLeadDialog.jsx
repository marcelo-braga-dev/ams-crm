import { TbCheck, TbX } from 'react-icons/tb';
import { Button, DialogActions, DialogContent, DialogTitle, Divider, IconButton, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import { useFunilVendas } from '@/Pages/Admin/Leads/Kanban/FunilVendasContext.jsx';
import { router } from '@inertiajs/react';

const FinalizarLeadDialog = ({ leadId }) => {
    const { handleAtualizar } = useFunilVendas();

    const [motivo, setMotivo] = useState('');
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const submit = (e) => {
        e.preventDefault();
        setOpenDialog(false);
        router.post(route('auth.leads.api.finalizar'), { lead_id: leadId, motivo }, {
            onSuccess: () => {
                handleCloseDialog();
                handleAtualizar();
                setMotivo('');
            },
        });

    };

    return (<>
            <IconButton onClick={handleOpenDialog}>
                <TbX color="red" size={18} />
            </IconButton>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>
                    <Typography variant="h5">FINALIZAR LEAD</Typography>
                    <Divider />
                </DialogTitle>
                <form onSubmit={submit}>
                    <DialogContent>
                        <TextField
                            label="Motivo da finalização..."
                            required
                            fullWidth
                            multiline
                            minRows={3}
                            onChange={e => setMotivo(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button startIcon={<TbX />} color="secondary" type="button" onClick={handleCloseDialog}>Fechar</Button>
                        <Button startIcon={<TbCheck />} color="success" type="submit">Confimar</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};
export default FinalizarLeadDialog;
