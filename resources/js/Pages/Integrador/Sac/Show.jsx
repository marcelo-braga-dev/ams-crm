import SacDados from '@/Partials/SAC/SacDados.jsx';
import CardContainer from '@/Components/Cards/CardContainer.jsx';
import CardBody from '@/Components/Cards/CardBody.jsx';
import CardTitle from '@/Components/Cards/CardTitle.jsx';
import { ChatLeftText } from 'react-bootstrap-icons';
import ImagePdf from '@/Components/Elementos/ImagePdf.jsx';
import Layout from '@/Layouts/Layout.jsx';
import React, { useState } from 'react';

const Page = ({ sac, pedido }) => {

    return (
        <Layout empty titlePage="Informações do SAC - Atendimento" menu="sac" submenu="sac-chamados" voltar={route('admin.chamados.index')}>
            <SacDados sac={sac} pedido={pedido} urlPedido={route('admin.pedidos.show', sac.pedido_id)} />

            <CardContainer>
                <CardTitle icon={<ChatLeftText size={25} />} title="Mensagens" />
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
                                                        <ImagePdf url={item.url} urlRaiz />
                                                    </div>
                                                ))}
                                            </div>
                                        }
                                    </div>
                                </CardBody>
                            </CardContainer>
                        );
                    })}
                </CardBody>
            </CardContainer>
        </Layout>
    );
};
export default Page;
