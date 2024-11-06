import Dialog from "@mui/material/Dialog";
import {useEffect, useState} from "react";
import {DialogContent, Grid, IconButton, Stack, Typography} from "@mui/material";
import CampoTexto from "@/Components/CampoTexto.jsx";
import LeadShow from "@/Pages/Geral/Leads/Dialogs/LeadShow.jsx";
import {TbEye, TbX} from "react-icons/tb";
import CardTitle from "@/Components/Cards/CardTitle.jsx";
import MenuItem from "@mui/material/MenuItem";

const LeadsStatusDialog = ({user, status, onClose}) => {
    const [leads, setLeads] = useState([])

    const [openDialog, setOpenDialog] = useState(false)

    const fetchRegistros = async () => {
        if (openDialog) {
            const response = await axios.get(route('admin.leads.gerenciar.get-leads-status', {consultor: user, status}))
            setLeads(response.data)
        }
    }

    useEffect(() => {
        fetchRegistros()
    }, [openDialog]);

    const handleOpenDialog = () => {
        setOpenDialog(true)
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
        onClose()
    }

    return (<>
        <MenuItem onClick={handleOpenDialog}>
            Ver Leads
        </MenuItem>

        <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            maxWidth="md"
            fullWidth
        >
            {leads.length > 0 && <DialogContent>
                <CardTitle title="Leads" children={<IconButton onClick={handleCloseDialog}><TbX color="red"/></IconButton>}/>
                <table className="table-1">
                    {/*<thead>*/}
                    {/*<tr>*/}
                    {/*    <th>Leads</th>*/}
                    {/*</tr>*/}
                    {/*</thead>*/}
                    <tbody>
                    {leads.map(item => (
                        <tr>
                            <td>
                                <Grid container spacing={2}>
                                    <Grid item xs={11}>
                                        {item.razao_social && <CampoTexto titulo="Razão Social" texto={item.razao_social}/>}
                                        {item.nome && <CampoTexto titulo="Nome" texto={item.nome}/>}
                                        {item.nome_fantasia && <CampoTexto titulo="Nome Fantasia" texto={item.nome_fantasia}/>}
                                        {item.cnpj && <CampoTexto titulo="CNPJ" texto={item.cnpj}/>}
                                        {item.cpf && <CampoTexto titulo="CPF" texto={item.cpf}/>}
                                        <Stack direction="row" spacing={2}>
                                            <CampoTexto titulo="ID" texto={`#${item.id}`}/>
                                            <CampoTexto titulo="Setor" texto={item.setor.nome}/>
                                        </Stack>
                                        <CampoTexto titulo="Status" texto={`${item.status_nome} (desde ${item.status_date})`}/>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <LeadShow leadId={item.id} action={<TbEye size={20}/>}/>
                                    </Grid>
                                </Grid>

                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </DialogContent>}
        </Dialog>
    </>)
}
export default LeadsStatusDialog
