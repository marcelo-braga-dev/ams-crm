import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import ImagePdf from "@/Components/Elementos/ImagePdf";
import React, {useState} from "react";
import {router} from "@inertiajs/react";
import SacDados from "@/Partials/SAC/SacDados";

export default function Create({sac, pedido}) {
    function avancaStatus() {
        router.post(route('admin.chamado.aberto.avancar'), {id: sac.id})
    }

    return (
        <Layout empty titlePage="Informações do SAC" menu="sac" submenu="sac-chamados" voltar={route('admin.chamados.index')}>
            <div className="card card-body mb-4">
                <SacDados sac={sac} pedido={pedido}/>
            </div>

            <div className="row">
                <div className="col">
                    <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Iniciar Atendimento</button>
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
                                        <ImagePdf url={item.url} urlRaiz/>
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
