import { router } from '@inertiajs/react'
import Layout from "@/Layouts/Supervisor/Layout";

import React from 'react';
import {useForm} from '@inertiajs/react';
import {Container, Row, Col} from 'reactstrap';

import {TextField, Typography} from "@mui/material";
import ImagePdf from "@/Components/Elementos/ImagePdf";
import DadosPedidoMinimo from "@/Components/Pedidos/DadosPedidoMinimo";

export default function Create({pedido}) {

    const {data, setData, progress} = useForm({
        file_nota_fiscal: '',
        prazo: ''
    });

    function submit(e) {
        e.preventDefault()
        router.post(route('supervisor.pedidos.aguardando-faturamento.update', pedido.pedido.id), {
            _method: 'put',
            ...data
        })
    }

    return (<Layout titlePage="Pedidos">

            <Container fluid="lg" className="bg-white px-lg-6 py-lg-5 mb-4">
                <div className="row">
                    <div className="col mb-4">
                        <DadosPedidoMinimo dados={pedido} />
                    </div>
                </div>
                <Typography variant={"h6"} component="h5">Baixar Comprovante Pagamento/Recibo</Typography>
                <div className="row">
                    <div className="col-md-4">
                        <ImagePdf url={pedido.pedido_files.recibo_1}/>
                    </div>
                    <div className="col-md-4">
                        <ImagePdf url={pedido.pedido_files.recibo_2}/>
                    </div>
                </div>
            </Container>
            <Container fluid="lg" className="bg-white px-lg-6 py-lg-5">
                <form onSubmit={submit}>
                    <Typography variant="h6">Enviar Nota Fiscal do Pedido</Typography>
                    <Row className={"mt-3"}>
                        <Col className={"mb-4"} lg={"6"}>
                            <TextField
                                label="Nota Fiscal" focused
                                fullWidth required type="file"
                                onChange={e => setData('file_nota_fiscal', e.target.files[0])}>
                            </TextField>
                        </Col>
                    </Row>
                    <Row className={"mt-2"}>
                        <Col className={"mb-3"} lg={"6"}>
                            <TextField label="Prazo Entrega" type="number" required
                                       onChange={e => setData('prazo', e.target.value)}></TextField>
                        </Col>
                    </Row>

                    <button className="btn btn-primary" type='submit' color="primary">
                        Enviar
                    </button>
                </form>
            </Container>

        </Layout>
    )
}
