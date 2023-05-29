import Layout from '@/Layouts/Admin/Layout';
import {TextField} from "@mui/material";
import {useForm} from "@inertiajs/react";
import {router} from '@inertiajs/react'
import DadosPedidoMinimo from "@/Components/Pedidos/DadosPedidoMinimo";
import React from "react";
import ImagePdf from "@/Components/Inputs/ImagePdf";

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
        window.location.reload()
    }

    // Envio da Resposta - fim

    return (
        <Layout container titlePage="Abrir SAQ" voltar={route('admin.chamado.index')}
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
                            <div className="col mb-2">
                                <span><b>Mensagem:</b> {dado.msg}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-auto">
                                <ImagePdf url={dado.anexo_1}/>
                            </div>
                            <div className="col">
                                <ImagePdf url={dado.anexo_2}/>
                            </div>
                        </div>
                    </div>
                )
            })}
            {/*Historico de Mensagens - fim */}

            {/*Resposta*/}
            <form onSubmit={submit}>
                <div className="row pt-4 mb-3">
                    <div className="col">
                        <TextField
                            multiline rows={6} label="Resposta" fullWidth required
                            onChange={e => setData('mensagem', e.target.value)}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <TextField type="file" fullWidth
                                   onChange={e => setData('anexo_1', e.target.files[0])}>
                        </TextField>
                    </div>
                    <div className="col-md-6 mb-3">
                        <TextField type="file" fullWidth
                                   onChange={e => setData('anexo_2', e.target.files[0])}>
                        </TextField>
                    </div>
                </div>

                <div className="row pt-4 text-center">
                    <div className="col-lg-4 text-right"></div>
                    <div className="col mb-3">
                        <button type="submit" className="btn btn-primary">Enviar Resposta</button>
                    </div>

                    <div className="col text-right">
                        <button className="btn btn-danger" type="submit"
                                onClick={e => setData('finalizar', true)}>Finalizar SAC
                        </button>
                    </div>
                </div>
            </form>
            {/*Resposta - fim */}
        </Layout>
    )
}
