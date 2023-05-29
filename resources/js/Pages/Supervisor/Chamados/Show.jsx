import Layout from '@/Layouts/Supervisor/Layout';

import React, {useState} from 'react';
import {Container, Row, Col, Button} from 'reactstrap';
import {TextField, Typography} from "@mui/material";
import ImagePdf from "@/Components/Inputs/ImagePdf";
import {useForm} from "@inertiajs/react";
import {router} from '@inertiajs/react'
import DadosPedidoMinimo from "@/Components/Pedidos/DadosPedidoMinimo";

export default function Create({chamado, pedido, mensagens}) {
    // Envio da Resposta
    const {data, setData} = useForm(
        {id_chamado: chamado.id, id_pedido: chamado.id_pedido});

    function submit(e) {
        e.preventDefault()
        router.post(route('supervisor.chamado.update', chamado.id), {
            _method: 'put',
            ...data
        })
    }

    // Envio da Resposta - fim

    return (
        <Layout container voltar={route('supervisor.chamados.index')} titlePage="Abrir SAQ">
            <div className="row justify-content-between mb-4">
                <div className="col">
                    <DadosPedidoMinimo dados={pedido}/>
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
                    </Col>

                    <div className="row">
                        <div className="col-auto">
                            <ImagePdf url={dado.anexo_1}/>
                        </div>
                        <div className="col">
                            <ImagePdf url={dado.anexo_2}/>
                        </div>
                    </div>
                </Row>)
            })}
            {/*Historico de Mensagens - fim */}
        </Layout>
    )
}
