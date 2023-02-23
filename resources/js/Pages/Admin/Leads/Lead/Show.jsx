import LeadsDados from "@/Components/Leads/LeadsDados";
import Layout from "@/Layouts/Admin/Layout";

export default function Show({dados, historicos}) {
    return (
        <Layout container titlePage="Informações do Lead" menu="leads" submenu="cadastrados">
            <div className="mb-4">
                <div className="row justify-content-end">
                    <div className="col-auto">
                        <a href={route('admin.clientes.leads.leads-main.edit', dados.id)}
                           className="btn btn-dark btn-sm">Editar Dados</a>
                    </div>
                </div>

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
                    {historicos.length === 0 && <div className="row text-center">
                        <span>Não há histórico de atendimentos.</span>
                    </div> }
                </div>
            </div>

        </Layout>
    )
}
