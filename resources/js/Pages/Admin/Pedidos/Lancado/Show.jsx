import Layout from '@/Layouts/Layout';
import {router} from '@inertiajs/react'
import * as React from 'react';

import {useForm} from '@inertiajs/react';
import TextFieldMoney from "@/Components/Inputs/TextFieldMoney";
import DadosPedido from "@/Components/Pedidos/DadosPedido";
import DadosPedidoCliente from "@/Components/Pedidos/DadosPedidoCliente";
import TextFieldPorcentagem from "@/Components/Inputs/TextFieldPorcentagem";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";

export default function Pedidos({dados}) {
    const {data, put, setData} = useForm({
        'preco_custo': null
    })

    function submit(e) {
        e.preventDefault()
        router.post(route('admin.lancado.update', dados.pedido.id), {
            _method: 'put',
            ...data
        })
    }

    // ConvertMoney
    let valor = 0
    if (data.preco_custo) {
        valor = data.preco_custo.replace('.', '').replace(',', '').replace(/\D/g, '');
        valor /= 100
    }

    let imposto = 0
    if (data.imposto) {
        imposto = data.imposto.replace('.', '').replace(',', '').replace(/\D/g, '');
        imposto /= 100
    }

    function precoBruto(venda) {
        return new Intl.NumberFormat('pt-BR', {minimumFractionDigits: 2}).format(
            parseFloat((venda - valor) * (1 - imposto / 100)))
    }

    function valorNota(preco, repasse) {
        return new Intl.NumberFormat('pt-BR', {minimumFractionDigits: 2}).format(
            parseFloat(preco + repasse))
    }

    // ConvertMoney - fim

    return (
        <Layout container voltar={route('admin.pedidos.index', {id_card: dados.pedido.id})} titlePage="Pedido Lançado"
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
                    <form onSubmit={submit}>
                        <div className="row ">
                            <div className="row mb-4">
                                <h6>Preço de Venda: R$ {dados.preco.convertido}</h6>
                            </div>
                            <div className="row">
                                <div className="col-md-3 mb-4">
                                    <TextFieldMoney
                                        label="Preço Custo" value={data.preco_custo} required
                                        setData={setData} index="preco_custo"></TextFieldMoney>
                                </div>
                                <div className="col-md-3 mb-4">
                                    <TextFieldPorcentagem
                                        label="Imposto Distribuidor" value={data.imposto}
                                        setData={setData} index="imposto"/>
                                </div>
                            </div>

                            {dados.financeiro.repasse_float &&
                                <div className="row">
                                    <div className="mb-3 col-md-3">
                                        <span>Repasse Integrador: R$ {dados.financeiro.repasse}</span>
                                    </div>
                                </div>
                            }
                            <div className="row mb-4">
                                <div className="col-auto">
                                    <span>Lucro Bruto: R$ {precoBruto(dados.preco.preco_float)}</span>
                                </div>
                                <div className="col-auto">
                                    <span><b>VALOR NOTA: R$ {valorNota(dados.preco.preco_float, dados.financeiro.repasse_float)}</b></span>
                                </div>
                            </div>

                            <div className="row">
                                <div className="mb-3">
                                    <button className="btn btn-primary" color={"primary"}>Salvar</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </CardBody>
            </CardContainer>
        </Layout>
    )
}
