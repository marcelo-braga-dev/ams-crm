import Layout from "@/Layouts/Layout";
import TextFieldMoney from "@/Components/Inputs/TextFieldMoney3";
import {useState} from "react";
import {router, usePage} from "@inertiajs/react";
import DadosPedido from "@/Components/Pedidos/DadosPedido";
import {TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import CardTitle from "@/Components/Cards/CardTitle";
import {Pencil} from "react-bootstrap-icons";

export default function ({pedido, usuarios}) {
    const [valorPedido, setValorPedido] = useState(pedido.financeiro.preco)
    const [precoCusto, setPrecoCusto] = useState(pedido.financeiro.preco_custo)
    const [repasse, setRepasse] = useState(pedido.financeiro.repasse)
    const [userFaturado, setUserFaturado] = useState(pedido.pedido.user_faturamento)
    const [dataFaturamento, setDataFaturamento] = useState(pedido.financeiro.data_faturamento)
    const [notaPedido, setNotaPedido] = useState(pedido.financeiro.nota_numero)

    const isAdmin = usePage().props.auth.user.is_financeiro == 1

    const submit = (e) => {
        e.preventDefault()
        router.post(route('admin.pedidos.update', pedido.id), {
            _method: 'PUT',
            preco: valorPedido,
            preco_custo: precoCusto,
            repasse: repasse,
            usuario_faturado: userFaturado,
            data_faturamento: dataFaturamento,
            nota_pedido: notaPedido,
        })
    }

    return (
        <Layout titlePage="Editar Pedido" menu="pedidos" voltar={route('admin.pedidos.show', pedido.id)}>

            <CardContainer>
                <CardBody>
                    <DadosPedido dados={pedido}/>
                </CardBody>
            </CardContainer>

            <CardContainer>
                <CardTitle title="Editar Informações" icon={<Pencil size="18"/>}/>
                <CardBody>
                    <span className="pb-4"></span>
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
                                    <TextFieldMoney label="Valor do Pedido" set={setValorPedido} defaultValue={valorPedido}/>
                                </div>
                            }
                            {isAdmin &&
                                <div className="col-md-2">
                                    <TextFieldMoney label="Preço de Custo" set={setPrecoCusto} defaultValue={precoCusto}/>
                                </div>
                            }
                            {isAdmin &&
                                <div className="col-md-2">
                                    <TextFieldMoney label="Repasse" set={setRepasse} defaultValue={repasse}/>
                                </div>
                            }
                            {isAdmin &&
                                <div className="col-md-2">
                                    <TextField label="N. Nota Pedido" fullWidth value={notaPedido}
                                               onChange={e => setNotaPedido(e.target.value)}/>
                                </div>
                            }
                            <div className="col-md-2">
                                <TextField label="Data Aguardando Faturamento" type="datetime-local" fullWidth
                                           value={dataFaturamento}
                                           InputLabelProps={{shrink: true}}
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
                </CardBody>
            </CardContainer>
        </Layout>
    )
}
