import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import Form from "@/Pages/Consultor/Pedidos/Create/Modelo1/Partials/Form";

export default function ({fornecedores, lead}) {
    return (
        <Layout titlePage="Cadastrar Pedido" menu="pedidos" voltar={route('admin.pedidos.index')}>
            <div className="border-bottom mb-4">
                <h5>LEAD: {lead.nome} (#{lead.id})</h5>
            </div>

            <Form url="admin.pedidos.emitir.store" fornecedores={fornecedores} lead={lead}/>

        </Layout>
    )
}
