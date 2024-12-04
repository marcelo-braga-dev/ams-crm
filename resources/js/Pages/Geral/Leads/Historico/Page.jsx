import Layout from '@/Layouts/Layout.jsx';
import {useEffect, useState} from 'react';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import CardContainer from '@/Components/Cards/CardContainer.jsx';
import CardBody from '@/Components/Cards/CardBody.jsx';
import CardTitle from '@/Components/Cards/CardTitle.jsx';
import {Button, DialogContent, Stack} from '@mui/material';
import CampoTexto from '@/Components/CampoTexto.jsx';
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Grid from '@mui/material/Grid2';
import Dialog from "@mui/material/Dialog";
import LeadDialog from "@/Pages/Geral/Leads/Dialogs/LeadDialog.jsx";
import LeadShow from "@/Pages/Geral/Leads/Dialogs/LeadShow.jsx";
import {Eye} from "react-bootstrap-icons";

const Page = ({encaminhados}) => {
    console.log(encaminhados)
    const [historicos, setHistoricos] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const [valueTab, setValueTab] = React.useState('1');

    const [openDialog, setOpenDialog] = React.useState(false);

    const [leadsEncaminhados, setLeadsEncaminhados] = React.useState([]);

    const handleChangeTab = (event, newValue) => {
        setValueTab(newValue);
    };

    useEffect(() => {
        const fetchhistorico = async () => {
            const response = await axios.get(route('auth.leads.historico.api.get-historico', {page: currentPage}));

            setHistoricos(response.data.data);
            setTotalPages(response.data.last_page);
        };
        fetchhistorico();
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page); // Atualiza a página ao trocar
    };

    const handleChange = (event, value) => {
        handlePageChange(value); // Chama a função de callback ao trocar de página
    };

    const handleOpenDialog = (leads) => {
        setOpenDialog(true)
        setLeadsEncaminhados(leads)
        console.log(leads)
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }

    return (
        <Layout titlePage="Histórico de Leads" menu="leads" submenu="leads-historico">
            <TabContext value={valueTab}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                        <Tab label="Histórico de Encaminhamento" value="1"/>
                        <Tab label="Histórico dos Leads" value="2"/>
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <CardContainer>
                        <CardBody>
                            {encaminhados.map(item => (
                                <Paper sx={{marginBottom: 2, padding: 2}} variant="outlined">
                                    <Grid container spacing={2}>
                                        <Grid size={10}>
                                            <CampoTexto titulo="Enviado Para" texto={item.destinatario.nome}/>

                                            <CampoTexto titulo="Autor" texto={item.autor.nome}/>

                                            <CampoTexto titulo="Quantidade de Leads" texto={item?.qtd}/>

                                            <CampoTexto titulo="Data do Envio" texto={item?.criado_em}/>
                                        </Grid>
                                        <Grid size={2}>
                                            <Button onClick={() => handleOpenDialog(item.leads)}>Ver Enviados</Button>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            ))}
                        </CardBody>
                    </CardContainer>
                </TabPanel>
                <TabPanel value="2">
                    <CardContainer>
                        <CardTitle title="Histórico de Encaminhados" children={(
                            <Pagination
                                count={totalPages}
                                page={currentPage}
                                onChange={handleChange}
                            />
                        )}/>
                        <CardBody>
                            {historicos.map(item => (
                                <Paper sx={{marginBottom: 2, padding: 2}} variant="outlined">
                                    <Stack>
                                        <CampoTexto titulo="Status" texto={item.status_nome}/>
                                    </Stack>
                                    <Stack>
                                        <CampoTexto titulo="Lead" texto={`${item?.lead?.nome ?? item?.lead?.razao_social} [#${item?.lead?.id}]`}/>
                                    </Stack>
                                    <Stack>
                                        <CampoTexto titulo="Enviado para:" texto={item?.destinatario?.nome}/>
                                    </Stack>
                                    <Stack>
                                        <CampoTexto titulo="Data do Envio:" texto={item?.status_data}/>
                                    </Stack>
                                </Paper>
                            ))}
                        </CardBody>
                    </CardContainer>
                </TabPanel>
            </TabContext>

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                maxWidth="md"
                fullWidth
            >
                <DialogContent>
                    <table className="table-1">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>CNPJ/CPF</th>
                            <th>Nome</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {leadsEncaminhados.map(item => (
                            <tr>
                                <td>#{item.id}</td>
                                <td>{item.cnpj}</td>
                                <td>{item.razao_social ?? item.nome}</td>
                                <td className="text-center">
                                    <LeadShow leadId={item.id} iconButton={<Eye/>}/>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </DialogContent>
            </Dialog>
        </Layout>
    );
};
export default Page;
