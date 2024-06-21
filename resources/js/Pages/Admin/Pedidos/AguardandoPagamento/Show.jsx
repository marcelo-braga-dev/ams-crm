import Layout from '@/Layouts/Layout';

import {router} from '@inertiajs/react'
import {Button, Card, Col, Container, Form, Row} from "reactstrap";
import Typography from "@mui/material/Typography";

import {useForm} from '@inertiajs/react'
import ImagePdf from "@/Components/Elementos/ImagePdf";
import {TextField} from "@mui/material";
import React from "react";
import DadosPedido from "@/Components/Pedidos/DadosPedido";
import DadosPedidoCliente from "@/Components/Pedidos/DadosPedidoCliente";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import CardTitle from "@/Components/Cards/CardTitle";

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
        <Layout container titlePage="Pedido Aguardando Pagamento" voltar={route('admin.pedidos.index', {id_card:  dados.pedido.id})}
                menu="pedidos" submenu="pedidos-lista">
            <CardContainer>
                <CardBody>
                    <div className="row">
                        <div className="row mb-4">
                            <div className="col">
                                <DadosPedido dados={dados}/>
                            </div>
                            <div className="col">
                                <DadosPedidoCliente dados={dados}/>
                            </div>
                        </div>
                        <Row>
                            <Col>
                                <Typography variant={"body1"} component="p">Baixar Nota/Boleto</Typography>
                                <ImagePdf url={dados.pedido_files.boleto}/>
                            </Col>
                        </Row>
                    </div>
                </CardBody>
            </CardContainer>


            <CardContainer>
                <CardTitle title="Enviar Comprovantes de Pagametos"/>
                <CardBody>
                <form onSubmit={submit}>
                    <span>Recibo do Pagamento</span>
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
                </form>
                </CardBody>
            </CardContainer>
        </Layout>
    );
}
