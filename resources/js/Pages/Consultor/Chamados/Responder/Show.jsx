import Layout from '@/Layouts/Consultor/Layout';

import React, {useState} from 'react';
import {useForm} from '@inertiajs/inertia-react'
import {Container, Row, Col, Button} from 'reactstrap';
import {TextField, Typography} from "@mui/material";
import ImagePdf from "@/Components/Inputs/ImagePdf";
import {Inertia} from "@inertiajs/inertia";

export default function Create({chamado, mensagens}) {
    const {data, setData} = useForm({id: chamado.id});

    function submit(e) {
        e.preventDefault()
        Inertia.post(route('consultor.chamado.responder.update', chamado.id), {
            _method: 'put',
            ...data
        })
    }

    return (
        <Layout
            titlePage="Abrir SAQ"
            url={route('consultor.chamados.index')} textButton={'Voltar'}>

            <Container fluid="lg" className="bg-white px-lg-6 py-lg-5 mb-4">
                <Row>
                    <Col className="mb-4">
                        <Typography className="mb-3" variant="h5">Informações do SAC</Typography>
                        <Typography><b>Cliente:</b> {chamado.cliente}</Typography>
                        <Typography><b>Status Atual:</b> {chamado.status}</Typography>
                    </Col>
                </Row>
                <Row>
                    <Col md="12" className="mb-3">
                        <Typography variant="subtitle1">
                            <b>Título:</b> {chamado.titulo}
                        </Typography>
                    </Col>
                </Row>
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
                <Row className="pt-4">
                    <Col>
                        <TextField
                            multiline rows={6} label="Resposta" fullWidth
                            onChange={e => setData('mensagem', e.target.value)}/>
                    </Col>
                </Row>
                <form onSubmit={submit}>
                    <Row className="pt-4 text-center">
                        <Col>
                            <Button type="submit" color="primary"
                                    onClick={e => setData('finalizar', '')}>Enviar Resposta</Button>
                        </Col>
                    </Row>
                </form>

            </Container>
        </Layout>
    )
}
