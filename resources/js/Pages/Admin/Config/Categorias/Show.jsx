import Layout from "@/Layouts/Admin/Layout";

export default function ({dados}) {
    return (
        <Layout container titlePage="Informações da Categoria" voltar={route('admin.config.categorias.index')}>
            <div className="row justify-content-between mb-4">
                <div className="col-auto"><h5>Informações da Categoria</h5></div>
                <div className="col-auto">
                    <a href={route('admin.config.categorias.edit', dados.id)} className="btn btn-primary">Editar</a>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <span className="d-block"><b>ID:</b> #{dados.id}</span>
                    <span className="d-block"><b>Nome da Categoria:</b> {dados.nome}</span>
                </div>
            </div>
        </Layout>
    )
}
