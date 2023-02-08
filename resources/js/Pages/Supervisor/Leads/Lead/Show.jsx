import LeadsDados from "@/Components/Leads/LeadsDados";
import Layout from "@/Layouts/Supervisor/Layout";

export default function Show({dados, historicos}) {
    return (
        <Layout container titlePage="Lead - Em Atendimento">
            <div className="mb-4 border-bottom">
                <div className="row justify-content-between">
                    <div className="col-auto"><h6>Lead em Atendimento</h6></div>
                    <div className="col-auto">
                        <a href={route('supervisor.clientes.leads.leads-main.edit', dados.id)}
                           className="btn btn-outline-primary btn-sm">Editar Dados</a>
                    </div>
                </div>
                <LeadsDados dados={dados}/>
                <div className="row mt-4">
                    {historicos.map((dado, index) => (
                        <div key={index} className="card mb-3 border">
                            <div className="card-body">
                                <h6 className="card-subtitle text-muted">
                                    {index + 1}. {dado.status}
                                </h6>
                                <span className="d-block"><b>Meio de Contato:</b> {dado.meio_contato}</span>
                                <span className="d-block"><b>Anotações:</b> {dado.msg}</span>

                                <span className="small">Data: {dado.data_criacao}</span>
                            </div>
                        </div>
                    ))}
                    {historicos.length === 0 && <div className="row text-center">
                        <span>Não há histórico de atendimentos.</span>
                    </div> }
                </div>
            </div>

        </Layout>
    )
}
