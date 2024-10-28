import Layout from '@/Layouts/Layout.jsx';
import { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import CardContainer from '@/Components/Cards/CardContainer.jsx';
import CardBody from '@/Components/Cards/CardBody.jsx';
import CardTitle from '@/Components/Cards/CardTitle.jsx';
import { Stack, Typography } from '@mui/material';
import CampoTexto from '@/Components/CampoTexto.jsx';

const Page = () => {
    const [historicos, setHistoricos] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchhistorico = async () => {
            const response = await axios.get(route('auth.leads.historico.api.get-historico', { page: currentPage }));

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

    return (
        <Layout>
            <CardContainer>
                <CardTitle title="Histórico de Leads" children={(
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handleChange}
                    />
                )} />
                <CardBody>
                    {historicos.map(item => (
                        <Paper sx={{ marginBottom: 2, padding: 2 }} variant="outlined">
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
        </Layout>
    );
};
export default Page;
