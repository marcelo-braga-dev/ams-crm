import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import {TextField} from "@mui/material";

export default function ({categorias}) {
    return (
        <Layout titlePage="Status dos Leads" container menu="config" submenu="config-leads">
            <div className="row row-cols-3">
                {categorias.map((categoria, index) => {
                    return (
                        <div key={index} className="col">
                            <ul className="list-group">
                                <li className="list-group-item bg-dark text-white">
                                    <small><b>Categoria:</b></small><br/>
                                    {categoria.nome}
                                </li>
                                {categoria.itens.map((item, index2) => {
                                    return <li key={index2} className="list-group-item">{item.nome}</li>
                                })}

                                <li className="list-group-item d-flex justify-content-end align-items-center">
                                    <a className="btn btn-primary btn-sm"
                                       href={route('admin.clientes.leads.status.edit', categoria.id)}>Editar</a>
                                </li>
                            </ul>
                        </div>
                    )
                })}
            </div>
        </Layout>
    )
}
