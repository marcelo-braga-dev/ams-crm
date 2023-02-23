import Layout from '@/Layouts/Admin/Layout';
import {router} from '@inertiajs/react'
import * as React from 'react';

import {useForm} from '@inertiajs/react';
import TextFieldMoney from "@/Components/Inputs/TextFieldMoney";
import DadosPedido from "@/Components/Pedidos/DadosPedido";
import DadosPedidoCliente from "@/Components/Pedidos/DadosPedidoCliente";

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

    function precoBruto(venda) {
        return new Intl.NumberFormat('pt-BR', {minimumFractionDigits: 2}).format(
            parseFloat(venda - valor))
    }

    // ConvertMoney - fim

    return (
        <Layout container voltar={route('admin.pedidos.index')} titlePage="Pedido Lançado"
                menu="pedidos" submenu="lista">
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
                        <div className="col-md-4 mb-4">
                            <TextFieldMoney
                                label="Preço Custo" value={data.preco_custo} required
                                setData={setData} index="preco_custo"></TextFieldMoney>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="mb-3">
                            <span>Preço Bruto: R$ {precoBruto(dados.preco.preco_float)}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-3">
                            <button className="btn btn-primary" color={"primary"}>Salvar</button></div>
                    </div>
                </div>
            </form>

        </Layout>
    )
}
