import Layout from '@/Layouts/AdminLayout/LayoutAdmin';
import {router} from '@inertiajs/react'
import * as React from 'react';

import {useForm} from '@inertiajs/react';
import TextFieldMoney from "@/Components/Inputs/TextFieldMoney";
import DadosPedido from "@/Components/Pedidos/DadosPedido";
import DadosPedidoCliente from "@/Components/Pedidos/DadosPedidoCliente";
import TextFieldPorcentagem from "@/Components/Inputs/TextFieldPorcentagem";

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
        <Layout container voltar={route('admin.pedidos.index', {id_card:  dados.pedido.id})} titlePage="Pedido Lançado"
                menu="pedidos" submenu="pedidos-lista">
            <div className="row mb-4 shadow p-2">
                <div className="col">
                    <DadosPedido dados={dados}/>
                </div>
                <div className="col">
                    <DadosPedidoCliente dados={dados}/>
                </div>
            </div>


            <form onSubmit={submit}>
                <div className="row shadow p-2">
                    <div className="row mb-4">
                        <h6>Preço de Venda: R$ {dados.preco.convertido}</h6>
                    </div>
                    <div className="row">
                        <div className="col-md-3 mb-4">
                            <TextFieldMoney
                                label="Preço Custo" value={data.preco_custo} required
                                setData={setData} index="preco_custo"></TextFieldMoney>
                        </div>
                    </div>

                    <div className="row">
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
                        <div className="mb-3">
                            <span>Preço Bruto: R$ {precoBruto(dados.preco.preco_float)}</span>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="mb-3">
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
        </Layout>
    )
}
