import Layout from "@/Layouts/VendedorLayout/LayoutConsultor";
import convertFloatToMoney from "@/Helpers/converterDataHorario";
import {sum} from "lodash";
import {router} from "@inertiajs/react";
import {useState} from "react";
import Avatar from "@mui/material/Avatar";
import * as React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import {TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import SelectMesesMultiples from "@/Components/Inputs/SelectMesesMultiples";

export default function ({vendas, usuario, mes, ano}) {
    const [mesesSelecionado, setMesesSelecionado] = useState(mes)
    const [anoSelecionado, setAnoSelecionado] = useState(ano)
    const [carregando, setCarregando] = useState(false)

    const total = sum(vendas.map(item => item.valor))

    function pesquisar() {
        setCarregando(true)
        router.get(route('consultor.relatorios.metas.show',1),
            {id: 1, mes: mesesSelecionado, ano: anoSelecionado})
    }

    function gerarPlanilha() {
        axios.post(route('consultor.relatorios.planilha'), {vendas: vendas, usuario: usuario})
            .then(res => window.location.href = res.data)
    }

    return (
        <Layout empty titlePage="Vendas do Período" menu="relatorios-metas" voltar={route('consultor.relatorios.metas.index')}>

            <div className="mb-4 card card-body">
                <div className="row">
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
            </div>

            <div className="mb-4 card card-body">
                <div className="row">
                    <div className="col">
                        <div className="row">
                            <div className="col-auto">
                                <Avatar sx={{width: 60, height: 60}} src={usuario.foto}/>
                            </div>
                            <div className="col">
                                <span className="d-block"><b>{usuario.nome}</b></span>
                                <span className="d-block">Função: {usuario.funcao}</span>
                                <span className="d-block">Setor: {usuario.setor}</span>
                            </div>
                        </div>

                    </div>
                    <div className="col">
                        <h6 className="d-block">Total: R$ {convertFloatToMoney(total)}</h6>
                        <span className="d-block">Qtd. Pedidos: {vendas?.length}</span>
                    </div>
                    <div className="col-auto">
                        <button className="btn btn-warning" onClick={() => gerarPlanilha()}>Baixar Planilha</button>
                    </div>
                </div>
            </div>

            {carregando && <LinearProgress/>}
            {!carregando &&
                <div className="mb-4 card card-body">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th>ID do Pedido</th>
                                <th>Data</th>
                                <th></th>
                                <th>Status Atual</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {vendas.map(item => {
                                return (
                                    <tr key={item.id}>
                                        <td className="text-center col-1">#{item.id}</td>
                                        <td>{item.data}</td>
                                        <td>
                                            <b>Cliente:</b> {item.cliente}<br/>
                                            <b>Integrador:</b> {item.lead}
                                            <span className="d-block mt-2"><b>Valor:</b> R$ {convertFloatToMoney(item.valor)}</span>
                                        </td>
                                        <td>{item.status}</td>
                                        <td>
                                            <a className="btn btn-primary" href={route('consultor.pedidos.show', item.id)}>Ver</a>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                    {!vendas.length && <span className="d-block text-center p-4">Não há pedidos!</span>}
                </div>
            }
        </Layout>
    )
}
