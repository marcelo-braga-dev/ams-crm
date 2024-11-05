import { TbCheck, TbX } from 'react-icons/tb';
import { Button, DialogActions, DialogContent, DialogTitle, Divider, IconButton, MenuItem, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import { useFunilVendas } from '@/Pages/Admin/Leads/Kanban/FunilVendasContext.jsx';
import { router } from '@inertiajs/react';
import Stack from '@mui/material/Stack';
import CampoTexto from '@/Components/CampoTexto.jsx';
import Paper from '@mui/material/Paper';

const FinalizarLeadDialog = ({ leadId, lead }) => {
    const { handleAtualizar } = useFunilVendas();

    const [motivo, setMotivo] = useState('');
    const [motivoAnotacao, setMotivoAnotacao] = useState('');
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
        router.post(route('auth.leads.api.finalizar'), { lead_id: leadId, motivo: `${motivo}: ${motivoAnotacao}` }, {
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
                        <Paper variant="outlined" sx={{ padding: 2, marginBottom: 4 }}>
                            <Stack>
                                {lead.nome && <CampoTexto titulo="Nome" texto={lead.nome} />}
                                {lead.razao_social && <CampoTexto titulo="Razão Social" texto={lead.razao_social} />}
                                {lead.cnpj && <CampoTexto titulo="CNPJ" texto={lead.cnpj} />}
                                {lead.id && <CampoTexto titulo="ID" texto={`#${lead.id}`} />}
                            </Stack>
                        </Paper>
                        <Paper variant="outlined" sx={{ padding: 2 }}>
                            <Stack spacing={4}>
                                <TextField
                                    label="Selecionar motivo"
                                    select
                                    required
                                    fullWidth
                                    marginBottom={2}
                                    onChange={e => setMotivo(e.target.value)}>
                                    <MenuItem value="Não Responde">Não Responde</MenuItem>
                                    <MenuItem value="Não Tem Interesse">Não Tem Interesse</MenuItem>
                                    <MenuItem value="Número Inválido">Número Inválido</MenuItem>
                                    <MenuItem value="Contato Errado">Contato Errado</MenuItem>
                                </TextField>

                                <TextField
                                    label="Anotações sobre o motivo da finalização..."
                                    required
                                    fullWidth
                                    multiline
                                    minRows={3}
                                    onChange={e => setMotivoAnotacao(e.target.value)}
                                />
                            </Stack>
                        </Paper>
                    </DialogContent>
                    <Divider sx={{ marginBlock: 1 }} />
                    <DialogActions sx={{ marginInlineEnd: 3 }}>
                        <Button startIcon={<TbX />} color="secondary" type="button" onClick={handleCloseDialog}>Fechar</Button>
                        <Button startIcon={<TbCheck />} color="success" type="submit">Confimar</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};
export default FinalizarLeadDialog;
