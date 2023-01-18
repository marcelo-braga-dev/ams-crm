import Layout from '@/Layouts/Supervisor/Layout';
import {Button, Card, Col, Container, Row, Table} from "reactstrap";
import Typography from "@mui/material/Typography";
import * as React from 'react';
import Box from '@mui/material/Box';

export default function Historico({pedidos}) {

    return (
        <Layout titlePage="Histórico de Pedidos" button={true} url={route('supervisor.pedidos.index')} textButton={'Voltar'}>

            <Container fluid="lg" className="bg-white px-lg-6 py-lg-5 rounded">
                <Box sx={{width: '100%'}}>
                    <Typography variant="h6" className="mb-3">Histórico de Pedidos</Typography>
                    <Table hover responsive>
                        <thead>
                        <tr>
                            <th>Data</th>
                            <th>Prazo</th>
                            <th>Consultor</th>
                            <th>Cliente</th>
                            <th>Status</th>
                            <th>Anotações</th>
                            <th>Ação</th>
                        </tr>
                        </thead>
                        <tbody>
                        {pedidos.map((dado) => {
                            return (
                                <tr key={dado.id} className={"align-middle"}>
                                    <th scope="row">
                                        {dado.data}
                                    </th>
                                    <td>
                                        {dado.prazo} ({dado.prazoDias} dias)
                                    </td>
                                    <td>
                                        {dado.nome}
                                    </td>
                                    <td>
                                        {dado.cliente}
                                    </td>
                                    <td>
                                        {dado.status}
                                    </td>
                                    <td>
                                        {dado.obs}
                                    </td>
                                    <td>
                                        <Button color={"primary"} href={route('supervisor.pedidos.show', dado.id)}
                                                size="sm">Ver</Button>
                                    </td>
                                </tr>)
                        })}
                        </tbody>
                    </Table>
                </Box>
            </Container>
        </Layout>)
}







