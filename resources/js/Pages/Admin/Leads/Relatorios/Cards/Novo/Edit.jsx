import Layout from "@/Layouts/Admin/Layout";
import LeadsDados from "@/Components/Leads/LeadsDados";
import {useForm} from "@inertiajs/react";

export default function Edit({dados}) {

    const {data, setData, post} = useForm();
    function remover() {
        post(route('admin.leads.limpar-consultor', {id: dados.id, consultor: dados.consultor.id}))
    }
    return (
        <Layout container titlePage="Lead - Atendimento"
                voltar={route('admin.leads.consultores-cards.index', {id: dados.consultor.id})}>
            <div className="card card-body mb-3">
                <small>Consultor(a)</small>
                <h5>{dados.consultor.nome}</h5>
            </div>

            <div className="card card-body mb-3">
                <LeadsDados dados={dados}/>
            </div>

            <div className=" mb-6">
                <div className="col">
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                            data-bs-target="#limparLead">Limpar LEAD
                    </button>
                </div>
            </div>

            <div className="modal fade" id="limparLead" tabIndex="-1" aria-labelledby="limparLeadLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="limparLeadLabel">Limpar LEAD</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Remover esse Lead deste consultor(a)?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                    onClick={() => remover()}>Remover</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
