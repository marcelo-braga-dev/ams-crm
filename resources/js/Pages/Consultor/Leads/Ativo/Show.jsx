import Layout from "@/Layouts/Consultor/Layout";
import LeadsDados from "@/Components/Leads/LeadsDados";
import {useForm} from "@inertiajs/react";
import {TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {router} from '@inertiajs/react'

export default function Show({dados, status, contatos, historicos}) {
    const {data, setData} = useForm({
        msg: ''
    });

    function onSubmit(e) {
        e.preventDefault();
        router.post(route('consultor.leads.atendimento.update', dados.id), {
            _method: 'put',
            ...data
        })
    }

    return (
        <Layout container voltar={route('consultor.leads.main.index')} titlePage="Lead - Em Atendimento">
            <div className="mb-4 border-bottom">

                <LeadsDados dados={dados}/>

                <div className="mt-4 p-4">
                    <h6 className="mb-3">Histórico de Atendimento</h6>
                    {historicos.map((dado, index) => (
                        <div key={index} className="row shadow p-2 mb-3 rounded">
                            <div className="col">
                                <h6 className="mb-2">{index + 1}. {dado.status}</h6>
                                <span className="d-block"><b>Autor:</b> {dado.nome}</span>
                                <span className="d-block"><b>Meio de Contato:</b> {dado.meio_contato}</span>
                                <span className="d-block"><b>Anotações:</b> {dado.msg}</span>
                                <span className="small">Data: {dado.data_criacao}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </Layout>
    )
}
