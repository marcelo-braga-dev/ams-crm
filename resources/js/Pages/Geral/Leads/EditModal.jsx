import { Button, Stack, Typography } from '@mui/material';
import { useForm } from '@inertiajs/inertia-react';
import { router } from '@inertiajs/react';
import Dialog from '@mui/material/Dialog';
import * as React from 'react';
import { PencilFill } from 'react-bootstrap-icons';
import EditForms from './Partials/EditForms.jsx';
import { useContext, useMemo } from 'react';
import { LeadContext } from '@/Pages/Geral/Leads/Dialogs/LeadContext.jsx';
import {useAtualizarDados} from "@/Hooks/useAtualizarDados.jsx";

const EditModal = () => {
    const {handle} = useAtualizarDados()
    const { lead, fetchLead } = useContext(LeadContext);

    const [openDialog, setOpenDialog] = React.useState(false);
    const { data, setData } = useForm();

    // Memorize the form data when lead changes
    const leadData = useMemo(() => ({
        id_lead: lead.id,
        nome: lead.nome,
        razao_social: lead.razao_social,
        cnpj: lead.cnpj,
        rg: lead.rg,
        cpf: lead.cpf,
        email: lead.email,
        inscricao_estadual: lead.inscricao_estadual,
        nascimento: lead.extras.data_nascimento,
        telefones: lead.telefones ?? [],
        endereco: {
            id: lead.endereco?.id,
            cep: lead.endereco?.cep,
            rua: lead.endereco?.rua,
            numero: lead.endereco?.numero,
            complemento: lead.endereco?.complemento,
            bairro: lead.endereco?.bairro,
            cidade: lead.endereco?.cidade,
            estado: lead.endereco?.estado,
        },
    }), [lead]); // Dependência do lead

    const onSubmit = (e) => {
        e.preventDefault();
        router.post(route('auth.lead.update', lead.id), { ...data, _method: 'PUT' }, {
            onSuccess: () => {
                handleClose();
                handle()
                fetchLead(lead.id);
            },
        });
    };

    const handleClickOpen = () => {
        setData(leadData);
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    return (
        <>
            <Button
                startIcon={<PencilFill size={15} />}
                color="success"
                onClick={handleClickOpen}>
                Editar
            </Button>

            <Dialog
                open={openDialog}
                onClose={handleClose}
                fullWidth
                maxWidth="lg"
                className="m-4"
            >
                <div className="p-4">
                    <form onSubmit={onSubmit}>
                        <EditForms setData={setData} data={data}  closeModal={handleClose} />
                        <Stack direction="row" justifyContent="center" spacing={6}>
                            <button type="button" className="btn btn-secondary" onClick={handleClose}>Fechar</button>
                            <button type="submit" className="btn btn-success">Salvar</button>
                        </Stack>
                    </form>
                </div>
            </Dialog>
        </>
    );
};

export default EditModal;
