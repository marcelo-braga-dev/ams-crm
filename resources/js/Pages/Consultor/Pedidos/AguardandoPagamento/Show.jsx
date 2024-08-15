import Layout from "@/Layouts/Layout";
import { router } from '@inertiajs/react'

import React from 'react';
import {useForm, usePage} from '@inertiajs/react';
import {Container, Row, Col, Form, Button} from 'reactstrap';

//step
import {TextField, Typography} from "@mui/material";
import ImagePdf from "@/Components/Elementos/ImagePdf";

export default function Create({dados}) {
    const {data, setData, progress} = useForm();

    function submit(e) {
        e.preventDefault()
        router.post(route('consultor.aguardando-pagamento.update', dados.pedido.id), {
            _method: 'put',
            ...data
        })
    }

    return (<Layout titlePage="Pedidos" url={route('consultor.pedidos.index', {id_card:  dados.pedido.id})} textButton="Voltar">
            {/*Baixar Nota*/}
            <Container fluid="lg" className="bg-white px-lg-6 py-lg-5 mb-4">
                <div className="row mb-4">
                    <div className="col">
                        <Typography><b>ID do Pedido:</b> #{dados.pedido.id}</Typography>
                        <Typography><b>Cliente:</b> {dados.pedido.cliente}</Typography>
                        <Typography><b>Integrador:</b> {dados.pedido.integrador}</Typography>
                    </div>
                </div>
                <Row>
                    <Col>
                        <Typography variant={"body1"} component="p">Baixar Nota/Boleto</Typography>
                        <ImagePdf url={dados.pedido_files.boleto}/>
                    </Col>
                </Row>
            </Container>

            {/*Envio de Comprovantes*/}
            <Container fluid="lg" className="bg-white px-lg-6 py-lg-5">
                <Form onSubmit={submit}>
                    <Typography className="mb-3" variant="h5">Enviar Comprovantes de Pagametos</Typography>
                    <Typography variant={"body1"}>Recibo do Pagamento</Typography>
                    <Row className="mb-4">
                        <Col className={"mb-3"} lg={"6"}>
                            <TextField
                                fullWidth required type="file"
                                onChange={e => setData('file_recibo_1', e.target.files[0])}>
                            </TextField>
                        </Col>
                        <Col className={"mb-3"} lg={"6"}>
                            <TextField
                                fullWidth type="file"
                                onChange={e => setData('file_recibo_2', e.target.files[0])}>
                            </TextField>
                        </Col>
                    </Row>
                    <div className="text-center">
                        <Button variant="contained" type='submit' color="primary">
                            Enviar
                        </Button>
                    </div>
                </Form>
            </Container>

        </Layout>
    )
}

