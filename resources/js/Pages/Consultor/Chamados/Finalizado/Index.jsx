import Layout from "@/Layouts/VendedorLayout/LayoutConsultor";
import ImagePdf from "@/Components/Elementos/ImagePdf";
import React, {useState} from "react";
import {useForm} from "@inertiajs/inertia-react";
import {router} from "@inertiajs/react";
import SacDados from "@/Partials/SAC/SacDados";
import CardTitle from "@/Components/Cards/CardTitle";
import {ChatLeftText} from "react-bootstrap-icons";
import CardBody from "@/Components/Cards/CardBody";
import CardContainer from "@/Components/Cards/CardContainer";

export default function Create({sac, pedido}) {

    function avancaStatus() {
        router.post(route('consultor.chamado.aberto.avancar'), {id: sac.id})
    }

    return (
        <Layout empty titlePage="Informações do SAC" menu="sac-chamados" container voltar={route('consultor.chamados.index')}>

            <SacDados sac={sac} pedido={pedido} urlPedido={route('consultor.pedidos.show', sac.pedido_id)}/>

            <CardContainer>
                <CardTitle icon={<ChatLeftText size={25}/>} title="Mensagens"/>
                <CardBody>
                    {sac.mensagens.map((dado) => {
                        return (
                            <CardContainer key={dado.id}>
                                <CardBody>
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
                                </CardBody>
                            </CardContainer>
                        )
                    })}
                </CardBody>
            </CardContainer>
        </Layout>
    )
}
