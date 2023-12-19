import Layout from "@/Layouts/VendedorLayout/LayoutConsultor";
import Form from "./Partials/Form";

export default function Create({fornecedores, lead, endereco}) {

    return (
        <Layout menu="pedidos" container titlePage="Cadastrar Pedido" voltar={route('consultor.pedidos.index')}>
            <div className="border-bottom mb-4">
                <h5>LEAD: {lead.nome} (#{lead.id})</h5>
            </div>

            <Form url="consultor.pedidos.store" fornecedores={fornecedores} lead={lead}/>
        </Layout>
    )
}









