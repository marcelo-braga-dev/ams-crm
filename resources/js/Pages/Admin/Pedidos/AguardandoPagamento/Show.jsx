import Layout from '@/Layouts/AdminLayout/LayoutAdmin';

import {router} from '@inertiajs/react'
import {Button, Card, Col, Container, Form, Row} from "reactstrap";
import Typography from "@mui/material/Typography";

import {useForm} from '@inertiajs/react'
import ImagePdf from "@/Components/Elementos/ImagePdf";
import {TextField} from "@mui/material";
import React from "react";
import DadosPedidoMinimo from "@/Components/Pedidos/DadosPedidoMinimo";
import BoxShadow from "@/Components/Layout/BoxShadow";

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
        <Layout container titlePage="Pedido Aguardando Pagamento" voltar={route('admin.pedidos.index')}
                menu="pedidos" submenu="lista">
            <div className="row shadow p-2 mb-4">
                <div className="row mb-4">
                    <div className="col">
                        <DadosPedidoMinimo dados={dados}/>
                    </div>
                </div>
                <Row>
                    <Col>
                        <Typography variant={"body1"} component="p">Baixar Nota/Boleto</Typography>
                        <ImagePdf url={dados.pedido_files.boleto}/>
                    </Col>
                </Row>
            </div>

            <BoxShadow>
                <form onSubmit={submit}>
                    <h5 className="mb-3">Enviar Comprovantes de Pagametos</h5>
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
            </BoxShadow>
        </Layout>);
}
