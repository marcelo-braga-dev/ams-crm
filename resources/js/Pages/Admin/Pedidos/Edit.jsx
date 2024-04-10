import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import TextFieldMoney from "@/Components/Inputs/TextFieldMoney3";
import {useState} from "react";
import {router, usePage} from "@inertiajs/react";
import DadosPedido from "@/Components/Pedidos/DadosPedido";

export default function ({pedido}) {
    const [precoCusto, setPrecoCusto] = useState(pedido.financeiro.preco_custo)
    const isAdmin = usePage().props.auth.user.tipo === 'admin'
    const submit = (e) => {
        e.preventDefault()
        router.post(route('admin.pedidos.update', pedido.id), {
            _method: 'PUT',
            preco_custo: precoCusto
        })
    }

    return (
        <Layout titlePage="Editar Pedido" menu="pedidos"
                voltar={route('admin.pedidos.show', pedido.id)}>
            <div className="card card-body mb-4">
                <div className="row">
                    <div className="col">
                        <DadosPedido dados={pedido}/>
                    </div>
                </div>
            </div>

            <div className="card card-body mb-4">
                <span className="pb-4">Editar Informações</span>
                <form onSubmit={submit}>
                    <div className="row mb-4">
                        {isAdmin && <div className="col-md-3">
                            <TextFieldMoney label="Preço de Custo" set={setPrecoCusto} defaultValue={precoCusto}/>
                        </div>}
                    </div>
                    <div className="row">
                        <div className="col">
                            <button className="btn btn-primary">Salvar</button>
                        </div>
                    </div>
                </form>
            </div>
        </Layout>
    )
}
