import Layout from "@/Layouts/Layout.jsx";
import CardContainer from "@/Components/Cards/CardContainer.jsx";
import CardBody from "@/Components/Cards/CardBody.jsx";
import {Stack, TextField, Typography} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import SelectMesesMultiples from "@/Components/Inputs/SelectMesesMultiples.jsx";
import convertFloatToMoney from "@/Helpers/converterDataHorario.jsx";
import LinearProgress from "@mui/material/LinearProgress";
import CardTable from "@/Components/Cards/CardTable.jsx";
import * as React from "react";
import {useState} from "react";
import {sum} from "lodash";
import {router} from "@inertiajs/react";
import Checkbox from "@mui/material/Checkbox";
import {Check, Download, Eye} from "react-bootstrap-icons";
import Link from "@/Components/Link.jsx";
import CardTitle from "@/Components/Cards/CardTitle.jsx";

const Page = ({vendas, usuario, planilhasGeradas, usuarios, mes, ano}) => {
    const [usuarioSelecionado, setusuarioSelecionado] = useState(usuario?.id)
    const [mesesSelecionado, setMesesSelecionado] = useState(mes)
    const [anoSelecionado, setAnoSelecionado] = useState(ano)

    const total = sum(vendas.map(item => item.valor))
    const [carregando, setCarregando] = useState(false)

    function pesquisar() {
        setCarregando(true)
        router.get(route('admin.financeiro.faturamento.index',
            {id: usuarioSelecionado, mes: mesesSelecionado, ano: anoSelecionado}))
    }

    const gerarPlanilha = () => {
        router.post(route('admin.financeiro.faturamento.planilha'), {vendas: vendas})
    }

    return (
        <Layout titlePage="Faturamento de Pedidos" menu="financeiro" submenu="financeiro-faturamento">
            <CardContainer>
                <CardBody>
                    <div className="row">
                        <div className="col-3">
                            <TextField label="Consultor" select fullWidth defaultValue={usuarioSelecionado}
                                       onChange={e => setusuarioSelecionado(e.target.value)}>
                                <MenuItem value="">TODOS</MenuItem>
                                {usuarios.map(item => <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>)}
                            </TextField>
                        </div>
                        <div className="col-2">
                            <SelectMesesMultiples value={mesesSelecionado} useState={setMesesSelecionado}/>
                        </div>
                        <div className="col-2">
                            <TextField label="Ano" select fullWidth defaultValue={anoSelecionado}
                                       onChange={e => setAnoSelecionado(e.target.value)}>
                                <MenuItem value="2023">2023</MenuItem>
                                <MenuItem value="2024">2024</MenuItem>
                            </TextField>
                        </div>
                        <div className="col-2">
                            <button className="btn btn-primary" onClick={() => pesquisar()}>Pesquisar</button>
                        </div>
                    </div>
                </CardBody>
            </CardContainer>

            <CardContainer>
                <CardBody>
                    <div className="row">
                        <div className="col">
                            <h6 className="d-block">Total: R$ {convertFloatToMoney(total)}</h6>
                        </div>
                        <div className="col">
                            <span className="d-block">Qtd. Pedidos: {vendas?.length}</span>
                        </div>
                    </div>
                </CardBody>
            </CardContainer>

            <div className="row">
                <div className="col-md-8">
                    {carregando && <LinearProgress/>}
                    {!carregando &&
                        <CardContainer>
                            <CardTable title="Pedidos" btn={<Typography>Quantidade: {vendas.length}</Typography>}>
                                <table className="table-1 table-hover">
                                    <thead>
                                    <tr>
                                        {/*<th style={{width: 20}}></th>*/}
                                        <th style={{width: 10}}>Exportação</th>
                                        <th>Pedido</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {vendas.map(item => {
                                        return (
                                            <tr key={item.id}>
                                                {/*<td className="text-center">*/}
                                                {/*    <Checkbox size="small"/>*/}
                                                {/*</td>*/}
                                                <td className="text-center">
                                                    {item.exportacao_id ? <Typography>#{item.exportacao_id}</Typography> : '-'}
                                                </td>
                                                <td>
                                                    <Typography>{item.status}</Typography>
                                                    <Typography>#{item.id}</Typography>
                                                    <Typography variant="body2">{item.data}</Typography>
                                                </td>
                                                <td>
                                                    <Typography><b>Cliente:</b> {item.cliente}</Typography>
                                                    <Typography><b>Integrador:</b> {item.lead}</Typography>
                                                    <Typography><b>Valor:</b> R$ {convertFloatToMoney(item.valor)}</Typography>
                                                </td>
                                                <td className="text-center">
                                                    <Link icon={<Eye size={22}/>} href={route('admin.pedidos.show', item.id)}></Link>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                                {!vendas.length && <span className="d-block text-center p-4">Não há pedidos!</span>}
                            </CardTable>
                        </CardContainer>
                    }
                </div>
                <div className="col">
                    <CardContainer>
                        <CardTitle title="Planilhas Geradas"
                                   children={<button className="btn btn-success d-block mb-0 btn-sm" onClick={() => gerarPlanilha()}>Gerar Planilha</button>}/>
                        <CardBody>
                            {planilhasGeradas.map(item =>
                                <CardContainer>
                                    <CardBody>
                                        <div className="row">
                                            <div className="col-auto">#{item.id}</div>
                                            <div className="col"><Typography>{item.data}</Typography></div>
                                            <div className="col-auto">
                                                <a href={item.url}>
                                                    <Download size={20}/>
                                                </a>
                                            </div>
                                        </div>
                                    </CardBody>
                                </CardContainer>
                            )}
                        </CardBody>
                    </CardContainer>
                </div>
            </div>
        </Layout>
    )
}

export default Page
