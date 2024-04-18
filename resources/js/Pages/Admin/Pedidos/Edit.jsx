import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import TextFieldMoney from "@/Components/Inputs/TextFieldMoney3";
import {useState} from "react";
import {router, usePage} from "@inertiajs/react";
import DadosPedido from "@/Components/Pedidos/DadosPedido";
import {TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

export default function ({pedido, usuarios}) {
    const [precoCusto, setPrecoCusto] = useState(pedido.financeiro.preco_custo)
    const [userFaturado, setUserFaturado] = useState(pedido.pedido.user_faturamento)

    const isAdmin = usePage().props.auth.user.tipo === 'admin'
    const submit = (e) => {
        e.preventDefault()
        router.post(route('admin.pedidos.update', pedido.id), {
            _method: 'PUT',
            preco_custo: precoCusto,
            usuario_faturado: userFaturado
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
                        {isAdmin && <div className="col-md-2">
                            <TextFieldMoney label="Preço de Custo" set={setPrecoCusto} defaultValue={precoCusto}/>
                        </div>}
                        {isAdmin && <div className="col-md-3">
                            <TextField label="Vendedor(a) Faturado" select fullWidth value={userFaturado}
                                       onChange={e => setUserFaturado(e.target.value)}>
                                {usuarios.map(item => <MenuItem value={item.id}>{item.nome}</MenuItem>)}
                            </TextField>
                        </div>}
                        <div className="col-md-3">
                            <TextField label="Data Aguardando Faturamento" type="datetime-local" fullWidth 
                                 value={pedido.financeiro.data_faturamento}
                            InputLabelProps={{shrink: true}}
                                       onChange={e => setUserFaturado(e.target.value)}>
                            </TextField>
                        </div>
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
