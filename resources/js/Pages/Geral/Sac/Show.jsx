import Layout from "@/Layouts/Layout";
import ImagePdf from "@/Components/Elementos/ImagePdf";
import React, {useState} from "react";
import {Stack, TextField} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import {useForm} from "@inertiajs/inertia-react";
import {router} from "@inertiajs/react";
import SacDados from "@/Partials/SAC/SacDados";
import CardBody from "@/Components/Cards/CardBody";
import CardContainer from "@/Components/Cards/CardContainer";
import CardTitle from "@/Components/Cards/CardTitle";
import {ChatLeftText, Dash, Plus} from "react-bootstrap-icons";

export default function Create({sac, pedido}) {
    return (
        <Layout empty titlePage="Informações do SAC - Atendimento" menu="sac" submenu="sac-chamados" voltar={route('admin.chamados.index')}>
            <SacDados sac={sac} pedido={pedido} urlPedido={route('admin.pedidos.show', sac.pedido_id)}/>
            <CardContainer>
                <CardTitle icon={<ChatLeftText size={25}/>} title="Mensagens"/>
                <CardBody>
                    {sac.mensagens.map((dado) => {
                        return (
                            <CardContainer key={dado.id}>
                                <CardBody>
                                    <div>
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
                                                    <div key={item.url} className="col">
                                                        <ImagePdf url={item.url} urlRaiz/>
                                                    </div>
                                                ))}
                                            </div>
                                        }
                                    </div>
                                </CardBody>
                            </CardContainer>
                        )
                    })}
                </CardBody>
            </CardContainer>
        </Layout>
    )
}
