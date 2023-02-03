import Layout from '@/Layouts/Admin/Layout';

import { router } from '@inertiajs/react'
import {Button, Card, Col, Container, Form, Row} from "reactstrap";
import Typography from "@mui/material/Typography";

import {useForm} from '@inertiajs/react'
import ImagePdf from "@/Components/Inputs/ImagePdf";
import {TextField} from "@mui/material";
import React from "react";
import DadosPedidoMinimo from "@/Components/Pedidos/DadosPedidoMinimo";


export default function Pedidos({dados}) {
    const {data, setData} = useForm()

    function submit(e) {
        e.preventDefault()
        router.post(route('admin.aguardando-pagamento.update', dados.pedido.id), {
            _method: 'put',
            ...data
        })
    }

    return (
        <Layout container titlePage="Pedidos" voltar={route('admin.pedidos.index')}>

        {/*Baixar Nota*/}
        <Container fluid="lg" className="bg-white px-lg-6 py-lg-5 mb-4">
            <div className="row mb-4">
                <div className="col">
                    <DadosPedidoMinimo dados={dados} />
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
    </Layout>);
}
