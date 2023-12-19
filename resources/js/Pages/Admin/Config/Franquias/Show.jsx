import Layout from "@/Layouts/AdminLayout/LayoutAdmin";

export default function ({franquia}) {
    return (
        <Layout container titlePage="Informações do Setor" voltar={route('admin.franquias.index')}
                menu="config" submenu="setores">

            <div className="row justify-content-between">
                <div className="col mb-4">
                    <h6 className="d-block"><b>Nome da Franquia:</b> {franquia.nome}</h6>
                    <span className="d-block"><b>ID:</b> #{franquia.id}</span>


                </div>
                <div className="col-auto">
                    <a href={route('admin.franquias.edit', franquia.id)} className="btn btn-primary">Editar</a>
                </div>
            </div>
        </Layout>
    )
}
