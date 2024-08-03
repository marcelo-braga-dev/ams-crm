import React from 'react';
import {router, useForm} from '@inertiajs/react';

//step
import {TextField, Typography} from "@mui/material";
import Layout from "@/Layouts/Layout";
import DadosPedidoMinimo from "@/Components/Pedidos/DadosPedidoMinimo";
import ImagePdf from "@/Components/Elementos/ImagePdf.jsx";
import DadosPedido from "@/Components/Pedidos/DadosPedido.jsx";
import CardContainer from "@/Components/Cards/CardContainer.jsx";
import CardBody from "@/Components/Cards/CardBody.jsx";
import CardTitle from "@/Components/Cards/CardTitle.jsx";

export default function Create({pedido, historicos, infoEntrega}) {

    const {data, setData, post} = useForm({
        msg: '',
        idPedido: pedido.pedido.id,
        msgStatus: ''
    });

    function enviarMsg(e) {
        e.preventDefault()
        post(route('consultor.acompanhamento.store'))
        setData('msg', '')
    }

    function avancarStatus() {
        if (data.msgStatus.length && data.msgStatus.length <= 500) {
            router.post(route('consultor.acompanhamento.update', pedido.pedido.id), {
                _method: 'put',
                ...data
            })
        }
    }

    return (
        <Layout container titlePage="Acompanhamento do Pedido" menu="pedidos" submenu="pedidos-lista"
                voltar={route('consultor.pedidos.index', {id_card: pedido.pedido.id})}>
            <CardContainer>
                <CardBody>
                    <div className="row mb-4">
                        <div className="col">
                            <DadosPedido dados={pedido}/>
                        </div>
                        <div className="col-auto">
                            <h6>Baixar Nota/Boleto</h6>
                            <ImagePdf url={pedido.pedido_files.nota_fiscal}/>
                        </div>
                    </div>
                    <div className="col-12">
                        <span><b>Informações de Entrega:</b> {infoEntrega}</span>
                    </div>
                </CardBody>
            </CardContainer>

            <CardContainer>
                <CardBody>
                    <div className="row justify-content-center">
                        <div className="col-auto">
                            <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalAvancarStatus">
                                Alterar para Entregue
                            </button>
                        </div>
                    </div>
                </CardBody>
            </CardContainer>

            <CardContainer>
                <CardTitle title="Anotações"/>
                <CardBody>
                    {historicos.map((item, index) => {
                        return (
                            <CardContainer key={index}>
                                <CardBody>
                                    <Typography><b>Nome:</b> {item.nome}</Typography>
                                    <Typography><b>Mensagem:</b> {item.msg}</Typography>
                                </CardBody>
                            </CardContainer>
                        )
                    })}
                    {historicos.length === 0 ? 'Não há registros.' : ''}
                </CardBody>
            </CardContainer>

            {/*Modal*/}
            <div className="modal fade mt-5" id="modalAvancarStatus" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Anotações da Entrega</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <TextField label="Anotações da Entrega" required multiline fullWidth rows="4"
                                       onChange={e => setData('msgStatus', e.target.value)}/>
                            <small className={data.msgStatus.length > 500 ? "text-danger" : "text-muted"}>
                                {data.msgStatus.length}/500
                            </small>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal"
                                    onClick={() => avancarStatus()}>
                                Avançar Status
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    )
}
