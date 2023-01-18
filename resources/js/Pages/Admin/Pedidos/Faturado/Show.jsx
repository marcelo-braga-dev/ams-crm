import {Inertia} from '@inertiajs/inertia'
import Layout from "@/Layouts/Admin/Layout";

import React, {useState} from 'react';
import {useForm, usePage} from '@inertiajs/inertia-react';
import {Container, Row, Col, Form, Button} from 'reactstrap';
import {Typography} from "@mui/material";
import DadosPedidoMinimo from "@/Components/Pedidos/DadosPedidoMinimo";

export default function Create({pedido}) {
    const {data} = useForm();

    function submit(e) {
        e.preventDefault()
        Inertia.post(route('admin.faturado.update', pedido.pedido.id), {
            _method: 'put',
            ...data
        })
    }

    return (
        <Layout titlePage="Pedido Faturado">
            <Container fluid="lg" className="bg-white px-lg-6 py-lg-5">
                <div className="row mb-4">
                    <div className="col">
                        <DadosPedidoMinimo dados={pedido} />
                    </div>
                </div>

                <form onSubmit={submit}>
                    <button className="btn btn-primary" type='submit'>
                        Atualizar Status para Entregue
                    </button>
                </form>
            </Container>
        </Layout>
    )
}
