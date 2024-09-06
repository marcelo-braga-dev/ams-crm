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
import DadosPedidoFinanceiro from "@/Components/Pedidos/DadosPedidoFinanceiro.jsx";
import {Download, File, Folder} from "react-bootstrap-icons";

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
                    <DadosPedido dados={dados}/>
                </CardBody>
            </CardContainer>
            <CardContainer>
                <CardBody>
                    <DadosPedidoCliente dados={dados}/>
                </CardBody>
            </CardContainer>
            <CardContainer>
                <CardBody>
                    <DadosPedidoFinanceiro dados={dados}/>
                </CardBody>
            </CardContainer>

            <CardContainer>
                <CardTitle title="Baixar Nota/Boleto" icon={<Download size={22} color="black"/>}/>
                <CardBody>
                    <Typography variant={"body1"} component="p"></Typography>
                    <ImagePdf url={dados.pedido_files.boleto}/>
                </CardBody>
            </CardContainer>

            <CardContainer>
                <CardTitle title="Enviar Comprovantes de Pagametos"  icon={<Folder size={22} color="black"/>}/>
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
                        <button className="btn btn-success" type='submit'>
                            Enviar
                        </button>
                    </div>
                </form>
                </CardBody>
            </CardContainer>
        </Layout>
    );
}
