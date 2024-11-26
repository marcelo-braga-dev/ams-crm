import Layout from '@/Layouts/Layout';

import {router} from '@inertiajs/react'
import {Button, Card, Col, Container, Form, Row} from "reactstrap";
import Typography from "@mui/material/Typography";

import {useForm} from '@inertiajs/react'
import ImagePdf from "@/Components/Elementos/ImagePdf";
import {Grid, TextField} from "@mui/material";
import React from "react";
import DadosPedido from "@/Components/Pedidos/DadosPedido";
import DadosPedidoCliente from "@/Components/Pedidos/DadosPedidoCliente";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import CardTitle from "@/Components/Cards/CardTitle";
import DadosPedidoFinanceiro from "@/Components/Pedidos/DadosPedidoFinanceiro.jsx";
import {Download, File, Folder, Truck} from "react-bootstrap-icons";

export default function Pedidos({dados}) {
    const {data, setData} = useForm()

    function submit(e) {
        e.preventDefault()
        router.post(route('admin.aguardando-rastreio.update', dados.pedido.id), {
            _method: 'put',
            ...data
        })
    }

    return (
        <Layout container titlePage="Pedido Aguardando Rastreio" voltar={route('admin.pedidos.index', {id_card: dados.pedido.id})}
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
                <CardTitle title="Inserir Rastreio" icon={<Truck size={22} color="black"/>}/>
                <CardBody>
                    <form onSubmit={submit}>
                        <Grid container>
                            <Grid item xs={12} md={3}>
                                <TextField
                                    label="Data de Previsão Entrega"
                                    type="date"
                                    required
                                    fullWidth
                                    InputLabelProps={{shrink: true}}
                                    onChange={e => setData('rastreio_data',e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <div className="mt-3">
                            <Button color="success" type='submit'>
                                Enviar
                            </Button>
                        </div>
                    </form>
                </CardBody>
            </CardContainer>
        </Layout>
    );
}
