import * as React from 'react';
import {router} from '@inertiajs/react'
import Layout from '@/Layouts/Layout';
import Typography from "@mui/material/Typography";

import {useForm} from '@inertiajs/react'
import Modal from "@mui/material/Modal";
import {Alert, InputAdornment, TextField} from "@mui/material";
import DadosPedido from "@/Components/Pedidos/DadosPedido";
import DadosPedidoCliente from "@/Components/Pedidos/DadosPedidoCliente";
import DadosPedidoClienteFiles from "@/Components/Pedidos/DadosPedidoClienteFiles";
import DadosPedidoFiles from "@/Components/Pedidos/DadosPedidoFiles";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import DadosProdutosCompleta from "@/Components/Pedidos/DadosProdutosCompleta.jsx";
import CardTable from "@/Components/Cards/CardTable.jsx";
import {Box} from "react-bootstrap-icons";
import DadosPedidoFinanceiroFiles from "@/Components/Pedidos/DadosPedidoFinanceiroFiles.jsx";
import DadosPedidoFinanceiro from "@/Components/Pedidos/DadosPedidoFinanceiro.jsx";

export default function Pedidos({pedido, produtos}) {

    const {data, setData} = useForm({
        'reprovado': ''
    })

    function submit(e) {
        e.preventDefault()
        router.post(route('admin.conferencia.update', pedido.pedido.id), {
            _method: 'put',
            ...data
        })
    }

    return (
        <Layout container voltar={route('admin.pedidos.index', {id_card: pedido.pedido.id})}
                titlePage="Pedido em Conferência" menu="pedidos" submenu="pedidos-lista">

            {pedido.pedido.alerta && <Alert severity="info">
                <b>PEDIDO PASSOU POR REVISÃO</b><br/>
                {pedido.pedido.alerta}
            </Alert>}
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

            {!!produtos.length &&
                <CardContainer>
                    <CardTable title="Produtos do Pedido" icon={<Box size={20}/>}>
                        <DadosProdutosCompleta dados={produtos} isFinanceiro={pedido.financeiro.is_financeiro}/>
                    </CardTable>
                </CardContainer>
            }

            <CardContainer>
                <CardBody>
                    <DadosPedidoFiles dados={pedido}/>
                    <DadosPedidoFinanceiroFiles dados={pedido}/>
                    <DadosPedidoClienteFiles dados={pedido}/>
                </CardBody>
            </CardContainer>

            <CardContainer>
                <CardBody>
                    <form onSubmit={submit}>
                        <div className="row text-center">
                            <div className="col">
                                <button type="button" className="btn btn-info" data-bs-toggle="modal"
                                        data-bs-target="#modalEncomenda">
                                    Enviar para Encomenda
                                </button>
                            </div>
                            <div className="col">
                                <button className="btn btn-success" type="submit">Aprovar Pedido</button>
                            </div>
                            <div className="col">
                                <button className="btn btn-danger" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Reprovar Pedido
                                </button>
                            </div>
                        </div>
                    </form>
                </CardBody>
            </CardContainer>

            {/*MODAL*/}
            <div className="modal fade mt-6" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Reprovar Pedido</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={submit}>
                            <div className="modal-body">
                                <TextField
                                    className="mb-4"
                                    label="Motivos da reprovação"
                                    multiline fullWidth rows={6} required
                                    onChange={event => setData('reprovado', event.target.value)}/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                                <button type="submit" className="btn btn-danger" data-bs-dismiss="modal">Reprovar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="modal fade mt-5" id="modalEncomenda" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Encomenda</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <form onSubmit={submit}>
                            <div className="modal-body">
                                Prazo para a encomenda do pedido?
                                <div className="row mt-3">
                                    <div className="col-4">
                                        <TextField label="Prazo" size="small" type="number" required
                                                   InputProps={{
                                                       endAdornment: <InputAdornment
                                                           position="start">dias</InputAdornment>
                                                   }}
                                                   onChange={e => setData('prazo', e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                    Fechar
                                </button>
                                <button type="submit" className="btn btn-primary"
                                        data-bs-dismiss={data.prazo ? "modal" : ''}
                                        onClick={event => setData('encomenda', true)}>
                                    Enviar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>)
}
