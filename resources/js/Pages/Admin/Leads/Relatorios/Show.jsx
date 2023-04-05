import Layout from "@/Layouts/Admin/Layout";

export default function ({id}) {
    return (
        <Layout container titlePage="Relatórios do Consultor" menu="leads" submenu="relatorios"
                voltar={route('admin.leads.relatorios.index')}>
            <div className="row">
                <div className="col">
                    <a href={route('admin.leads.consultores-cards.index', {id: id})}
                       className="btn btn-primary">Ver Cards</a>
                </div>
            </div>
        </Layout>
    )
}
