import Layout from "@/Layouts/VendedorLayout/LayoutConsultor";

import Form from "./Partials/Form";

export default function Create({fornecedores, integradores, unidades, lead, endereco, categorias, errors}) {

    return (
        <Layout container titlePage="Cadastrar Pedido" voltar={route('consultor.pedidos.index')}>
            <Form url="consultor.pedidos.store" lead={lead} fornecedores={fornecedores} endereco={endereco}
                  integradores={integradores} unidades={unidades} categorias={categorias} errors={errors}
                  urlProdutos="consultor.pedidos.buscar-produtos-fornecedor"/>
        </Layout>
    )
}









