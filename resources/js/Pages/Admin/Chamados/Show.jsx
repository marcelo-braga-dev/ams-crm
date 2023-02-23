import Layout from '@/Layouts/Admin/Layout';
import {useForm} from "@inertiajs/react";
import {router} from '@inertiajs/react'
import DadosPedidoMinimo from "@/Components/Pedidos/DadosPedidoMinimo";

export default function Create({chamado, pedido, mensagens}) {
    // Envio da Resposta
    const {data, setData} = useForm(
        {id_chamado: chamado.id, id_pedido: chamado.id_pedido});

    function submit(e) {
        e.preventDefault()
        router.post(route('admin.chamado.update', chamado.id), {
            _method: 'put',
            ...data
        })
    }

    // Envio da Resposta - fim

    return (
        <Layout container voltar={route('admin.chamado.index')} titlePage="Abrir SAQ"
                menu="sac" submenu="chamados">
            <div className="row justify-content-between mb-4">
                <div className="col">
                    <DadosPedidoMinimo dados={pedido}/>
                </div>
            </div>
            <div className="row">
                <div className="col mb-3">
                    <h5>Título: {chamado.titulo}</h5>
                </div>
            </div>
            {/*Historico de Mensagens*/}
            {mensagens.map((dado, i) => {
                return (
                    <div key={i} className="shadow rounded p-3 mb-3">
                        <div className="row">
                            <div className="col mb-2">
                                <span><b>Autor:</b> {dado.nome}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col mb-2">
                                <small className="d-block">
                                    <b>Data:</b> {dado.data}
                                </small>
                                <small className="d-block">
                                    <b>Status:</b> {dado.status}
                                </small>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <span><b>Mensagem:</b> {dado.msg}</span>
                            </div>
                        </div>
                    </div>
                )
            })}
            {/*Historico de Mensagens - fim */}
        </Layout>
    )
}
