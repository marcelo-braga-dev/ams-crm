import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import Color from "@/Components/Elementos/Color";

export default function ({dados}) {
    return (
        <Layout container titlePage="Informações do Setor" voltar={route('admin.config.categorias.index')}
                menu="config" submenu="config-setores">
            <div className="row justify-content-between">
                <div className="col mb-4">
                    <span className="d-block"><b>ID:</b> #{dados.id}</span>
                    <span className="d-block"><b>Nome da Categoria:</b> {dados.nome}</span>
                    <span className="d-block"><b>Franquia:</b> {dados.franquia}</span>
                    <span className="d-block"><b>Pedidos:</b> {dados.modelo}</span>
                    <span className="d-block"><b>Cor:</b><Color valor={dados.cor} /></span>

                </div>
                <div className="col-auto">
                    <a href={route('admin.config.categorias.edit', dados.id)} className="btn btn-primary">Editar</a>
                </div>
            </div>
        </Layout>
    )
}
