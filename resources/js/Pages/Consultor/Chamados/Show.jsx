import Layout from '@/Layouts/Consultor/Layout';

import React, {useState} from 'react';
import {Container, Row, Col, Form, Button} from 'reactstrap';
import {TextField, Typography} from "@mui/material";
import ImagePdf from "@/Components/Inputs/ImagePdf";
import DadosPedidoMinimo from "@/Components/Pedidos/DadosPedidoMinimo";

export default function Create({chamado, pedido, mensagens}) {
    return (
        <Layout
            titlePage="Abrir SAQ"
            url={route('consultor.chamados.index')} textButton={'Voltar'}>

                <Container fluid="lg" className="bg-white px-lg-6 py-lg-5 mb-4">
                    <Row>
                        <Col className="mb-4">
                            <Typography className="mb-3" variant="h5">Informações do SAC</Typography>
                            <DadosPedidoMinimo dados={pedido} />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="mb-3">
                            <Typography variant="subtitle1">
                                <b>Título:</b> {chamado.titulo}
                            </Typography>
                        </Col>
                    </Row>

                    {/*Historico de Mensagens*/}
                    {mensagens.map((dado) => {
                        return (<Row className="border rounded p-2 mb-3">
                            <Col className="mb-2" md="12">
                                <Typography variant="caption" component="p">
                                    <b>Data:</b> {dado.data}
                                </Typography>
                                <Typography variant="caption">
                                    <b>Status:</b> {dado.status}
                                </Typography>
                            </Col>
                            <Col md="12">
                                <Typography variant="body1"><b>Mensagem:</b> {dado.msg}</Typography>
                                <ImagePdf url={dado.img}></ImagePdf>
                            </Col>
                        </Row>)
                    })}
                    {/*Historico de Mensagens - fim*/}

                </Container>
        </Layout>
    )
}
