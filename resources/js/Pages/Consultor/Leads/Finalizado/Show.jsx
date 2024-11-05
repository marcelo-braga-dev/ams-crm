import Layout from "@/Layouts/Layout";
import LeadsDados from "@/Components/Leads/LeadsDados";
import * as React from "react";
import HistoricoLista from "@/Components/Leads/HistoricoLista";
import {useForm} from "@inertiajs/react";

export default function Show({dados, status, contatos, historicos}) {
    const {data, setData, post} = useForm({
        msg: '',
        classificacao: dados.cliente.classificacao
    });

    function enviarComentario(tag, id) {
        console.log(data[tag])
        post(route('consultor.leads.add-comentarios', {id: id, comentario: data[tag]}));
        window.location.reload()
    }

    return (
        <Layout container voltar={route('consultor.leads.main.index')}
                menu="leads" titlePage="Lead Finalizado">

            <div className="row justify-content-between">
                <div className="col-auto"><h6>Lead Finalizado</h6></div>
            </div>

            <div className="card mb-3">
                <div className="card-body">
                    <LeadsDados dados={dados}/>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="mb-3">Histórico de Atendimento</h6>
                            <HistoricoLista
                                historicos={historicos} enviarComentario={enviarComentario}
                                setData={setData} urlPedidos="consultor.pedidos.show"
                            />

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
