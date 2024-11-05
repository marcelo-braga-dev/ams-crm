import Layout from "@/Layouts/Layout";
import ImagePdf from "@/Components/Elementos/ImagePdf";
import SacDados from "@/Partials/SAC/SacDados";
import CardBody from "@/Components/Cards/CardBody";
import CardContainer from "@/Components/Cards/CardContainer";
import CardTitle from "@/Components/Cards/CardTitle";
import React from "react";
import {ChatLeftText} from "react-bootstrap-icons";

export default function Create({sac, pedido}) {

    return (
        <Layout empty titlePage="Informações do SAC" menu="sac" submenu="sac-chamados" container voltar={route('admin.chamados.index')}>

            <SacDados sac={sac} pedido={pedido} urlPedido={route('admin.pedidos.show', sac.pedido_id)}/>

            <CardContainer>
                <CardTitle icon={<ChatLeftText size={25}/>} title="Mensagens"/>
                <CardBody>
                    {sac.mensagens.map((dado) => {
                        return (
                            <CardContainer key={dado.id}>
                                <CardBody>
                                    <div className="row">
                                        <div className="col mb-2">{sac.mensagens.length > 0}
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
                                </CardBody>
                            </CardContainer>
                        )
                    })}
                </CardBody>
            </CardContainer>
        </Layout>
    )
}
