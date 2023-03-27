import React from 'react';
import {useForm} from '@inertiajs/react';

//step
import {TextField} from "@mui/material";
import Layout from "@/Layouts/Supervisor/Layout";
import DadosPedidoMinimo from "@/Components/Pedidos/DadosPedidoMinimo";

export default function Create({pedido, historicos}) {

    const {data, setData, post} = useForm({
        msg: '',
        idPedido: pedido.pedido.id
    });

    function enviarMsg(e) {
        e.preventDefault()
        post(route('supervisor.pedidos.acompanhamento.store'))
        setData('msg', '')
    }

    return (
        <Layout container titlePage="Acompanhamento do Pedido" menu="pedidos" submenu="lista"
                voltar={route('supervisor.pedidos.index')}>
            <div className="row mb-4">
                <div className="col">
                    <DadosPedidoMinimo dados={pedido}/>
                </div>
            </div>

            <h6>Anotações</h6>
            <div className="row">
                {historicos.map((item, index) => {
                    return (
                        <div key={index} className="col-12 shadow p-2 mb-3">
                            <b>Nome:</b> {item.nome}<br/>
                            <b>Mensagem:</b> {item.msg}
                        </div>
                    )
                })}
            </div>

            <form onSubmit={enviarMsg}>
                <div className="row my-4">
                    <TextField
                        label="Anotações" fullWidth multiline rows={3} required value={data.msg}
                        onChange={e => setData('msg', e.target.value)}/>
                </div>

                <button className="btn btn-primary" type="submit">
                    Salvar
                </button>
            </form>

        </Layout>
    )
}
