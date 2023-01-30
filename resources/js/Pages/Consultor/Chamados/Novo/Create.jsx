import Layout from '@/Layouts/Consultor/Layout';

import React from 'react';
import {useForm} from '@inertiajs/react';
import {Container, Row, Col, Form, Button} from 'reactstrap';
import {TextField, Typography} from "@mui/material";

export default function Create({pedido}) {

    const {setData, post} = useForm();

    function submit(e) {
        e.preventDefault()
        post(route('consultor.chamado.novo.store', {id: pedido.id}))
    }

    return (
        <Layout
            titlePage="Abrir SAQ"
            url={route('consultor.pedidos.index')} textButton={'Voltar'}>

            <Form onSubmit={submit}>
                <Container fluid="lg" className="bg-white px-lg-6 py-lg-5 mb-4">
                    <Row className="mb-4">
                        <Col>
                            <Typography className="mb-3" variant="h5">Abrir SAC</Typography>
                            <Typography><b>Cliente:</b> {pedido.cliente}</Typography>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6" className="mb-4">
                            <TextField label="Título" fullWidth required
                                       onChange={e => setData('titulo', e.target.value)}></TextField>
                        </Col>
                        <Col md="6" className="mb-4">
                            <TextField
                                type="file" label="Foto/PDF" InputLabelProps={{shrink: true}} fullWidth
                                onChange={e => setData('img_1', e.target.files[0])}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12" className="mb-4">
                            <TextField multiline rows={6} label="Mensagem" fullWidth required
                                       onChange={e => setData('mensagem', e.target.value)}></TextField>
                        </Col>
                    </Row>
                    <Row className="text-center">
                        <Col>
                            <Button color="primary">Abrir SAC</Button>
                        </Col>
                    </Row>
                </Container>
            </Form>
        </Layout>
    )
}









