import Layout from "@/Layouts/VendedorLayout/LayoutConsultor";
import ImagePdf from "@/Components/Elementos/ImagePdf";
import React, {useState} from "react";
import {useForm} from "@inertiajs/inertia-react";
import {router} from "@inertiajs/react";

export default function Create({sac, pedido}) {

    function avancaStatus() {
        router.post(route('consultor.chamado.aberto.avancar'), {id: sac.id})
    }

    return (
        <Layout empty titlePage="Informações do SAC" menu="sac-chamados" container voltar={route('consultor.chamados.index')}>
            <div className="card card-body mb-4">
                <h5>Título: {sac.titulo}</h5>
                <div className="row">
                    <div className="col">
                        <span className="d-block">Autor: {sac.autor}</span>
                        <span className="d-block">Stataus do SAC: {sac.status}</span>
                        <span className="d-block">Data de abertura: {sac.data}</span>
                    </div>
                    <div className="col">
                        <span className="d-block">ID do Pedido: #{sac.pedido_id}
                            <a className="btn btn-link btn-sm text-dark p-0 m-0 ms-4" href={route('consultor.pedidos.show', sac.pedido_id)}>Ver Pedido</a></span>
                        <span className="d-block">Integrador: {pedido.integrador.nome}</span>
                        <span className="d-block">Cliente: {pedido.cliente.nome}</span>
                        <span className="d-block">Status do Pedido: {pedido.pedido.status}</span>

                    </div>
                </div>
            </div>

            {/*Historico de Mensagens*/}
            {sac.mensagens.map((dado) => {
                return (
                    <div key={dado.id} className="card card-body mb-4">
                        <div className="row">
                            <div className="col mb-2">
                                <span><b>Autor:</b> {dado.autor}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col mb-2">
                                <small className="d-block">
                                    <b>Data:</b> {dado.data}
                                </small>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <span><b>Mensagem:</b> {dado.msg}</span>
                            </div>
                        </div>
                        {!!dado.anexos.length &&
                            <div className="row row-cols-4 mt-3">
                                {dado.anexos.map(item => (
                                    <div className="col">
                                        <ImagePdf url={item.url}/>
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                )
            })}

            <div className="modal fade mt-6" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Avançar Status</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Iniciar atendimento deste SAC?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => avancaStatus()}>Confirmar</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
