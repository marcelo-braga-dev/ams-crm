import Layout from "@/Layouts/Admin/Layout";

export default function ({dados}) {
    return (
        <Layout container titlePage="Informações do Setor" voltar={route('admin.config.categorias.index')}
                menu="config" submenu="setores">

            <div className="row justify-content-between">
                <div className="col mb-4">
                    <span className="d-block"><b>ID:</b> #{dados.id}</span>
                    <span className="d-block"><b>Nome da Categoria:</b> {dados.nome}</span>
                </div>
                <div className="col-auto">
                    <a href={route('admin.config.categorias.edit', dados.id)} className="btn btn-primary">Editar</a>
                </div>
            </div>
        </Layout>
    )
}
