import Layout from "@/Layouts/Layout";
import {router} from '@inertiajs/react'
import {useForm} from '@inertiajs/react';

import {TextField} from "@mui/material";
import DadosPedido from "@/Components/Pedidos/DadosPedido";
import DadosPedidoCliente from "@/Components/Pedidos/DadosPedidoCliente";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import * as React from "react";
import DadosPedidoFinanceiro from "@/Components/Pedidos/DadosPedidoFinanceiro.jsx";

export default function Create({dados}) {

    const {data, setData, progress} = useForm({
        file_boleto: ''
    });

    function submit(e) {
        e.preventDefault()
        router.post(route('admin.aguardando-nota.update', dados.pedido.id), {
            _method: 'put', ...data
        })
    }

    return (
        <Layout container voltar={route('admin.pedidos.index', {id_card: dados.pedido.id})} titlePage="Pedido Aguardando Nota"
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
                <CardBody>
                    <div className="row">
                        <h6 className="mb-4">Enviar Nota/Boleto</h6>
                        <form onSubmit={submit}>
                            <div className="row mb-4">
                                <div className="col-md-4 mb-4">
                                    <TextField
                                        label="Nota/Boleto" type="file" fullWidth required InputLabelProps={{shrink: true}}
                                        onChange={e => setData('file_boleto', e.target.files[0])}>
                                    </TextField>
                                </div>
                                <div className="col-md-3 mb-4">
                                    <TextField type="date" label="Data Vencimento" required InputLabelProps={{shrink: true}} fullWidth
                                               onChange={e => setData('pagamento_vencimento_data', e.target.value)}
                                    />
                                </div>
                            </div>
                            <button className="btn btn-primary" type='submit'>
                                Salvar
                            </button>
                        </form>
                    </div>
                </CardBody>
            </CardContainer>
        </Layout>
    )
}
