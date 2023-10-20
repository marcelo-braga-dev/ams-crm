import Layout from "@/Layouts/Admin/Layout";

export default function ({fornecedor}) {
    return (
        <Layout titlePage="Cadastrar Categoria" container menu="produtos" submenu="categorias"
                voltar={route('admin.produtos-categorias.index')}>
            <div className="row justify-content-between mb-4">
                <div className="col-auto">
                    <span>Fornecedor:</span>
                    <h6>FORNECEDOR ....</h6>
                </div>
            </div>
            <div className="row">
                <div className="col-auto">
                    <a className="btn btn-primary">Cadastrar Categoria</a>
                </div>
            </div>
        </Layout>
    )
}
