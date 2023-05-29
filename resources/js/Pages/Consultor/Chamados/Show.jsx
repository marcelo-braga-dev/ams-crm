import Layout from '@/Layouts/Consultor/Layout';
import DadosPedidoMinimo from "@/Components/Pedidos/DadosPedidoMinimo";
import ImagePdf from "@/Components/Inputs/ImagePdf";
import React from "react";

export default function Create({chamado, pedido, mensagens}) {
    return (
        <Layout titlePage="Informações do SAC" container voltar={route('consultor.chamados.index')}>
            <div className="row">
                <div className="col mb-4">
                    <DadosPedidoMinimo dados={pedido}/>
                </div>
            </div>
            <div className="row">
                <div className="col mb-3">
                    <h5>Título: {chamado.titulo}</h5>
                </div>
            </div>

            {/*Historico de Mensagens*/}
            {mensagens.map((dado, index) => {
                return (
                    <div key={index} className="shadow rounded p-3 mb-3">
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
            {/*Historico de Mensagens - fim*/}
        </Layout>
    )
}
