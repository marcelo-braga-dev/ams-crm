import {router} from '@inertiajs/react'
import Layout from "@/Layouts/Layout";

import React from 'react';
import {useForm} from '@inertiajs/react';

import {Button, TextField, Typography} from "@mui/material";
import ImagePdf from "@/Components/Elementos/ImagePdf";
import DadosPedido from "@/Components/Pedidos/DadosPedido";
import DadosPedidoCliente from "@/Components/Pedidos/DadosPedidoCliente";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import DadosPedidoFinanceiro from "@/Components/Pedidos/DadosPedidoFinanceiro.jsx";
import CardTitle from "@/Components/Cards/CardTitle.jsx";
import {Download, FileText} from "react-bootstrap-icons";

export default function Create({pedido}) {
    const {data, setData, progress} = useForm({
        file_nota_fiscal: '', prazo: '', nota_numero: '', nota_data: ''
    });

    function submit(e) {
        e.preventDefault()
        router.post(route('admin.aguardando-faturamento.update', pedido.pedido.id), {
            _method: 'put', ...data
        })
    }

    return (<Layout voltar={route('admin.pedidos.index', {id_card: pedido.pedido.id})} titlePage="Pedido Aguardando Faturamento"
                    menu="pedidos" submenu="pedidos-lista">

            <CardContainer>
                <CardBody>
                    <DadosPedido dados={pedido}/>
                </CardBody>
            </CardContainer>
            <CardContainer>
                <CardBody>
                    <DadosPedidoCliente dados={pedido}/>
                </CardBody>
            </CardContainer>
            <CardContainer>
                <CardBody>
                    <DadosPedidoFinanceiro dados={pedido}/>
                </CardBody>
            </CardContainer>

            <CardContainer>
                <CardTitle title="Baixar Comprovante Pagamento/Recibo" icon={<Download size={22} color="black"/>}/>
                <CardBody>
                    <Typography variant={"h6"} component="h5"></Typography>
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
                <CardTitle title="Enviar Nota Fiscal do Pedido" icon={<FileText size={22} color="black"/>}/>
                <CardBody>
                    <form onSubmit={submit}>
                        <div className="row mb-4">
                            <div className="col-md-6">
                                <TextField
                                    label="N. Nota"
                                    fullWidth
                                    required
                                    onChange={e => setData('n_nota', e.target.value)}/>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-md-6">
                                <TextField
                                    type="date"
                                    label="Data da Nota"
                                    fullWidth
                                    required
                                    InputLabelProps={{shrink: true}}
                                    onChange={e => setData('nota_data', e.target.value)}/>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-md-6">
                                <TextField
                                    label="Nota Fiscal"
                                    focused
                                    fullWidth
                                    required
                                    type="file"
                                    onChange={e => setData('file_nota_fiscal', e.target.files[0])}>
                                </TextField>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-md-6">
                                <TextField
                                    label="Prazo para Verificar Rastreio"
                                    type="date"
                                    fullWidth
                                    required
                                    InputLabelProps={{shrink: true}}
                                    onChange={e => setData('prazo_rastreio', e.target.value)}/>
                            </div>
                        </div>
                        <Button type='submit' color="success">Enviar</Button>
                    </form>
                </CardBody>
            </CardContainer>
        </Layout>)
}
