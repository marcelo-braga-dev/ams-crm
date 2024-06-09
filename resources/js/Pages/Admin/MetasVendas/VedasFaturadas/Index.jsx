import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import convertFloatToMoney from "@/Helpers/converterDataHorario";
import {sum} from "lodash";
import {router} from "@inertiajs/react";
import {Stack, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import SelectMesesMultiples from "@/Components/Inputs/SelectMesesMultiples";
import * as React from "react";
import {useState} from "react";
import Avatar from "@mui/material/Avatar";
import LinearProgress from "@mui/material/LinearProgress";

export default function ({vendas, usuario, usuarios, mes, ano}) {
    const [usuarioSelecionado, setusuarioSelecionado] = useState(usuario.id)
    const [mesesSelecionado, setMesesSelecionado] = useState(mes)
    const [anoSelecionado, setAnoSelecionado] = useState(ano)

    const [carregando, setCarregando] = useState(false)

    const total = sum(vendas.map(item => item.valor))

    function pesquisar() {
        setCarregando(true)
        router.get(route('admin.metas-vendas.vendas-faturadas.index',
            {id: usuarioSelecionado, mes: mesesSelecionado, ano: anoSelecionado}))
    }

    function gerarPlanilha() {
        axios.post(route('admin.metas-vendas.planilha'), {vendas: vendas, usuario: usuario})
            .then(res => window.location.href = res.data)
    }

    return (
        <Layout empty titlePage="Vendas Realizadas" menu="dashboard" submenu="dashboard-vendas"
                voltar={route('admin.dashboard.vendas.index')}>
            <div className="mb-4 card card-body">
                <div className="row">
                    <div className="col-3">
                        <TextField label="Consultor" select fullWidth defaultValue={usuarioSelecionado}
                                   onChange={e => setusuarioSelecionado(e.target.value)}>
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
            </div>

            {usuario && <>
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
                    </div>
                </div>

                <div className="card card-body mb-4">
                    <div className="row">
                        <div className="col">
                            <h6 className="d-block">Total: R$ {convertFloatToMoney(total)}</h6>
                        </div>
                        <div className="col">
                            <span className="d-block">Qtd. Pedidos: {vendas?.length}</span>
                        </div>
                        <div className="col-auto">
                            <button className="btn btn-warning d-block mb-0 btn-sm" onClick={() => gerarPlanilha()}>Baixar Planilha</button>
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
                                                <a className="btn btn-primary" href={route('admin.pedidos.show', item.id)}>Ver</a>
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
            </>}
        </Layout>
    )
}
