import Layout from "@/Layouts/Consultor/Layout";
import LeadsDados from "@/Components/Leads/LeadsDados";
import {useForm} from "@inertiajs/react";
import {router} from '@inertiajs/react'
import HistoricoLista from "@/Components/Leads/HistoricoLista";
import * as React from "react";

export default function Edit({dados, historicos}) {
    const {data, setData, post} = useForm({
        msg: '',
        classificacao: dados.cliente.classificacao
    });

    function onSubmit(e) {
        e.preventDefault();

        router.post(route('consultor.leads.novo.update', dados.id), {
            _method: 'put',
            ...data
        })
    }

    function enviarComentario(tag, id) {

        post(route('consultor.leads.add-comentarios', {id: id, comentario: data[tag]}));
        window.location.reload()
    }

    return (
        <Layout container titlePage="Lead - Em Aberto" voltar={route('consultor.leads.main.index')}>
            <LeadsDados dados={dados}/>
            <form onSubmit={onSubmit}>
                <div className="text-center mt-4">
                    <button className="btn btn-primary" type="submit">Iniciar Atendimento</button>
                </div>
            </form>

            <div className="row mt-4">
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
