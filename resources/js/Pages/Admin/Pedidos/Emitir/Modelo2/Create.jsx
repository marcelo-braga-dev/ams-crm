import Layout from "@/Layouts/Layout";
import Form from "@/Pages/Consultor/Pedidos/Create/Modelo2/Partials/Form";

export default function ({fornecedores, unidades, lead, endereco, categorias, errors}) {
    return (
        <Layout>
            <Form url="admin.pedidos.emitir.store" lead={lead} fornecedores={fornecedores} endereco={endereco}
                  unidades={unidades} categorias={categorias} errors={errors}
                  urlProdutos="admin.pedidos.pedidos.buscar-produtos-fornecedor"/>
        </Layout>
    )
}
