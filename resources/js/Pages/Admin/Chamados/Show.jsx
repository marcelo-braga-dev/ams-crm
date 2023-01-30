import Layout from '@/Layouts/Admin/Layout';

import React from 'react';
import {Container, Row, Col, Button} from 'reactstrap';
import {TextField, Typography} from "@mui/material";
import ImagePdf from "@/Components/Inputs/ImagePdf";
import {useForm} from "@inertiajs/react";
import { router } from '@inertiajs/react'

export default function Create({chamado, mensagens}) {
    // Envio da Resposta
    const {data, setData} = useForm(
        {id_chamado: chamado.id, id_pedido: chamado.id_pedido});

    function submit(e) {
        e.preventDefault()
        router.post(route('admin.chamado.update', chamado.id), {
            _method: 'put',
            ...data
        })
    }
    // Envio da Resposta - fim

    return (
        <Layout
            titlePage="Abrir SAQ"
            url={route('admin.chamado.index')} textButton={'Voltar'}>

            <Container fluid="lg" className="bg-white px-lg-6 py-lg-5 mb-4">
                <div className="row justify-content-between">
                    <div className="col">
                        <Typography className="mb-3" variant="h5">Informações do SAC</Typography>
                        <Typography><b>Cliente:</b> {chamado.cliente}</Typography>
                        <Typography><b>Status Atual:</b> {chamado.status}</Typography>
                    </div>
                </div>
                <Row>
                    <Col md="12" className="mb-3">
                        <Typography variant="subtitle1">
                            <b>Título:</b> {chamado.titulo}
                        </Typography>
                    </Col>
                </Row>
                {/*Historico de Mensagens*/}
                {mensagens.map((dado, i) => {
                    return (<Row key={i} className="border rounded p-2 mb-3">
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
                {/*Historico de Mensagens - fim */}
            </Container>
        </Layout>
    )
}
