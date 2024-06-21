import {router} from '@inertiajs/react'
import Layout from "@/Layouts/Layout";

import React from 'react';
import {useForm} from '@inertiajs/react';
import {Container, Row, Col} from 'reactstrap';

import {TextField, Typography} from "@mui/material";
import ImagePdf from "@/Components/Elementos/ImagePdf";
import DadosPedido from "@/Components/Pedidos/DadosPedido";
import DadosPedidoCliente from "@/Components/Pedidos/DadosPedidoCliente";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";

export default function Create({pedido}) {

    const {data, setData, progress} = useForm({
        file_nota_fiscal: '',
        prazo: ''
    });

    function submit(e) {
        e.preventDefault()
        router.post(route('admin.aguardando-faturamento.update', pedido.pedido.id), {
            _method: 'put',
            ...data
        })
    }

    return (
        <Layout container voltar={route('admin.pedidos.index', {id_card: pedido.pedido.id})} titlePage="Pedido Aguardando Faturamento"
                menu="pedidos" submenu="pedidos-lista">
            <CardContainer>
                <CardBody>
                    <div className="row">
                        <div className="col mb-4">
                            <DadosPedido dados={pedido}/>
                        </div>
                        <div className="col mb-4">
                            <DadosPedidoCliente dados={pedido}/>
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
                </CardBody>
            </CardContainer>
            <CardContainer>
                <CardBody>
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
                </CardBody>
            </CardContainer>

        </Layout>
    )
}
