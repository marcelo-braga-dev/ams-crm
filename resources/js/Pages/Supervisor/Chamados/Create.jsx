import Layout from '@/Layouts/Supervisor/Layout';

import React from 'react';
import {useForm} from '@inertiajs/react';
import {Container, Row, Col, Form, Button} from 'reactstrap';
import {TextField, Typography} from "@mui/material";
import DadosPedidoMinimo from "@/Components/Pedidos/DadosPedidoMinimo";

export default function Create({pedido}) {

    const {setData, post} = useForm({
        id: pedido.pedido.id
    });

    function submit(e) {
        e.preventDefault()
        post(route('supervisor.chamados.store'))
    }

    return (
        <Layout container>

            <Form onSubmit={submit}>
                <Row className="mb-4">
                    <Col>
                        <DadosPedidoMinimo dados={pedido}/>
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
            </Form>
        </Layout>
    )
}









