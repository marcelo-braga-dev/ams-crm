import Layout from "@/Layouts/VendedorLayout/LayoutConsultor";
import ImagePdf from "@/Components/Elementos/ImagePdf";
import React, {useState} from "react";
import {useForm} from "@inertiajs/inertia-react";
import {router} from "@inertiajs/react";
import SacDados from "@/Partials/SAC/SacDados";

export default function Create({sac, pedido}) {

    function avancaStatus() {
        router.post(route('consultor.chamado.aberto.avancar'), {id: sac.id})
    }

    return (
        <Layout empty titlePage="Informações do SAC" menu="sac-chamados" container voltar={route('consultor.chamados.index')}>
            <div className="card card-body mb-4">
                <SacDados sac={sac} pedido={pedido} />
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
        </Layout>
    )
}
