import {Stack, Typography} from "@mui/material";
import {useForm} from "@inertiajs/inertia-react";
import {router} from "@inertiajs/react";
import Dialog from "@mui/material/Dialog";
import * as React from "react";
import {PencilFill} from "react-bootstrap-icons";
import EditForms from "./Partials/EditForms.jsx";

const EditModal = ({lead}) => {

    const {data, setData} = useForm({
        id_lead: lead.id,

        // pessoa: dados.cnpj ? 'Jurídica' : 'Pessoa Física',
        nome: lead.cliente.nome,
        razao_social: lead.cliente.razao_social,
        cnpj: lead.cliente.cnpj,
        rg: lead.cliente.rg,
        cpf: lead.cliente.cpf,
        email: lead.contato.email,
        inscricao_estadual: lead.cliente.inscricao_estadual,
        nascimento: lead.cliente.data_nascimento,
        telefones: lead.contato.telefones ?? [],

        endereco: {
            id: lead.endereco.id,
            cep: lead.endereco.cep,
            rua: lead.endereco.rua,
            numero: lead.endereco.numero,
            complemento: lead.endereco.complemento,
            bairro: lead.endereco.bairro,
            cidade: lead.endereco.cidade,
            estado: lead.endereco.estado
        },
    })

    const onSubmit = (e) => {
        e.preventDefault()
        router.post(route('auth.leads.update', lead.id), {...data, _method: 'PUT'})
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    router.on('success', () => handleClose())

    return (
        <>
            <button className="btn btn-success" onClick={handleClickOpen}>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <PencilFill size={15}/>
                    <Typography>Editar</Typography>
                </Stack>
            </button>

            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth={'lg'}
            >
                <div className="p-4">
                    <form onSubmit={onSubmit}>
                        <EditForms setData={setData} data={data}/>

                        <Stack direction="row" justifyContent="center" spacing={6}>
                            <button type="button" className="btn btn-secondary" onClick={handleClose}>Fechar</button>
                            <button type="submit" className="btn btn-success">Salvar</button>
                        </Stack>
                    </form>
                </div>
            </Dialog>

        </>
    )
}
export default EditModal
