import Layout from '@/Layouts/Admin/Layout';

import React, {useState} from 'react';
import {Container, Row, Col, Button} from 'reactstrap';
import {TextField, Typography} from "@mui/material";
import ImagePdf from "@/Components/Inputs/ImagePdf";
import {useForm} from "@inertiajs/react";
import { router } from '@inertiajs/react'
import DadosPedidoMinimo from "@/Components/Pedidos/DadosPedidoMinimo";

export default function Create({chamado, pedido,  mensagens}) {
    // Envio da Resposta
    const {data, setData} = useForm(
        {id_chamado: chamado.id, id_pedido: chamado.id_pedido});

    function submit(e) {
        e.preventDefault()
        router.post(route('admin.chamado.update', chamado.id), {
            _method: 'put',
            ...data
        })
    }
    // Envio da Resposta - fim

    return (
        <Layout
            titlePage="Abrir SAQ"
            url={route('admin.chamado.index')} textButton={'Voltar'}>

            <Container fluid="lg" className="bg-white px-lg-6 py-lg-5 mb-4">
                <div className="row justify-content-between mb-4">
                    <div className="col">
                        <DadosPedidoMinimo dados={pedido} />
                    </div>
                </div>
                <Row>
                    <Col md="12" className="mb-3">
                        <Typography variant="subtitle1">
                            <b>Título:</b> {chamado.titulo}
                        </Typography>
                    </Col>
                </Row>
                {/*Historico de Mensagens*/}
                {mensagens.map((dado, i) => {
                    return (<Row key={i} className="border rounded p-2 mb-3">
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
                {/*Historico de Mensagens - fim */}

                {/*Resposta*/}
                <form onSubmit={submit}>
                    <Row className="pt-4">
                        <Col>
                            <TextField
                                multiline rows={6} label="Resposta" fullWidth required
                                onChange={e => setData('mensagem', e.target.value)}/>
                        </Col>
                    </Row>

                    <Row className="pt-4 text-center">
                        <div className="col-lg-4 text-right">
                        </div>
                        <div className="col mb-3">
                            <Button color="primary">Enviar Resposta</Button>
                        </div>

                        <div className="col text-right">
                            <button className="btn btn-danger" type="submit"
                                    onClick={e => setData('finalizar', true)}>Finalizar SAC</button>
                        </div>
                    </Row>
                </form>
                {/*Resposta - fim */}
            </Container>
        </Layout>
    )
}
