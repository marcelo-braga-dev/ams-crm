import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import {TextField} from "@mui/material";
import {router, useForm} from "@inertiajs/react";

export default function ({categoria, id, nome}) {
    const {post, setData} = useForm({
        categoria_id: id
    })

    function atualizar(index, status_id) {
        console.log(document.getElementById(index).value)
        router.post(route('admin.clientes.leads.status.update', id), {
            '_method': 'put',
            'status_id': status_id,
            'valor': document.getElementById(index).value
        })
    }

    function submit(e) {
        e.preventDefault()
        post(route('admin.clientes.leads.status.store'))
        window.location.reload()
    }

    return (
        <Layout container menu="leads" submenu="status" voltar={route('admin.clientes.leads.status.index')}>
            <small>Categoria:</small>
            <h5>{nome}</h5>
            <table className="table">
                <tbody>
                {categoria.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td className="col-4 pt-2">
                                <TextField size="small" id={"status-" + index} defaultValue={item.nome}/>
                            </td>
                            <td>
                                <button className="btn btn-success btn-sm mt-1"
                                        onClick={() => atualizar("status-" + index, item.id)}>Atualizar
                                </button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            <form onSubmit={submit}>
                <div className="row border-top pt-4">
                    <div className="col-12">
                        <h6>Cadastrar Novo Status</h6>
                    </div>
                    <div className="col-auto">
                        <TextField size="small" label="Nome" required
                                   onChange={e => setData('nome', e.target.value)}/>
                    </div>
                    <div className="col-auto">
                        <button className="btn btn-success">Salvar</button>
                    </div>
                </div>
            </form>
        </Layout>
    )
}
