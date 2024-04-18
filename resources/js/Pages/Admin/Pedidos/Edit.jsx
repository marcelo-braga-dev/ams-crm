import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import TextFieldMoney from "@/Components/Inputs/TextFieldMoney3";
import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import DadosPedido from "@/Components/Pedidos/DadosPedido";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

export default function ({ pedido, usuarios }) {
    const [valorPedido, setValorPedido] = useState(pedido.financeiro.preco)
    const [precoCusto, setPrecoCusto] = useState(pedido.financeiro.preco_custo)
    const [repasse, setRepasse] = useState(pedido.financeiro.repasse)
    const [userFaturado, setUserFaturado] = useState(pedido.pedido.user_faturamento)
    const [dataFaturamento, setDataFaturamento] = useState(pedido.financeiro.data_faturamento)

    const isAdmin = usePage().props.auth.user.tipo === 'admin'

    const submit = (e) => {
        e.preventDefault()
        router.post(route('admin.pedidos.update', pedido.id), {
            _method: 'PUT',
            preco: valorPedido,
            preco_custo: precoCusto,
            repasse: repasse,
            usuario_faturado: userFaturado,
            data_faturamento: dataFaturamento,
        })
    }

    return (
        <Layout titlePage="Editar Pedido" menu="pedidos"
            voltar={route('admin.pedidos.show', pedido.id)}>
            <div className="card card-body mb-4">
                <div className="row">
                    <div className="col">
                        <DadosPedido dados={pedido} />
                    </div>
                </div>
            </div>

            <div className="card card-body mb-4">
                <span className="pb-4">Editar Informações</span>
                <form onSubmit={submit}>
                    <div className="row">
                        {isAdmin && <div className="col-md-3 mb-4">
                            <TextField label="Vendedor(a) Faturado" select fullWidth value={userFaturado}
                                onChange={e => setUserFaturado(e.target.value)}>
                                {usuarios.map(item => <MenuItem value={item.id}>{item.nome}</MenuItem>)}
                            </TextField>
                        </div>}

                        <div className="col"></div>
                    </div>
                    <div className="row mb-4">
                        {isAdmin &&
                            <div className="col-md-2">
                                <TextFieldMoney label="Valor do Pedido" set={setValorPedido} defaultValue={valorPedido} />
                            </div>
                        }
                        {isAdmin &&
                            <div className="col-md-2">
                                <TextFieldMoney label="Preço de Custo" set={setPrecoCusto} defaultValue={precoCusto} />
                            </div>
                        }
                        {isAdmin &&
                            <div className="col-md-2">
                                <TextFieldMoney label="Repasse" set={setRepasse} defaultValue={repasse} />
                            </div>
                        }
                        <div className="col-md-2">
                            <TextField label="Data Aguardando Faturamento" type="datetime-local" fullWidth
                                value={dataFaturamento}
                                InputLabelProps={{ shrink: true }}
                                onChange={e => setDataFaturamento(e.target.value)}>
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
