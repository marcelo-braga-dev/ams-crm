import Layout from "@/Layouts/Layout";
import ImagePdf from "@/Components/Elementos/ImagePdf";
import {router} from "@inertiajs/react";
import SacDados from "@/Partials/SAC/SacDados";
import CardTitle from "@/Components/Cards/CardTitle";
import {ChatLeftText} from "react-bootstrap-icons";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";

export default function Create({sac, pedido}) {

    function avancaStatus() {
        router.post(route('consultor.chamado.aberto.avancar'), {id: sac.id})
    }

    return (
        <Layout empty titlePage="Informações do SAC - Aberto" menu="sac-chamados" container voltar={route('consultor.chamados.index')}>

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
