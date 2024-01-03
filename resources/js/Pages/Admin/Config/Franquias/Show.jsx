import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import Color from "@/Components/Elementos/Color";

export default function ({franquia}) {
    return (
        <Layout container titlePage="Informações da Franquia" voltar={route('admin.franquias.index')}
                menu="config" submenu="config-franquias">
            <div className="row justify-content-between">
                <div className="col mb-4">
                    <span className="d-block"><b>Nome da Franquia:</b> {franquia.nome}</span>
                    <span className="d-block"><b>ID:</b> #{franquia.id}</span>
                    <span className="d-block"><b>Cor:</b> <Color valor={franquia.cor}/></span>
                </div>
                <div className="col-auto">
                    <a href={route('admin.franquias.edit', franquia.id)} className="btn btn-primary">Editar</a>
                </div>
            </div>
        </Layout>
    )
}
