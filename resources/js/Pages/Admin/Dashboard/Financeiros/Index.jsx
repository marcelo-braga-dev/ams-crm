import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import "chart.js/auto";
import Faturamento from "./Graficos/Faturamento";
import Prazos from "./Graficos/Prazos";
import {TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {router} from "@inertiajs/react";

import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import convertFloatToMoney from "@/Helpers/converterDataHorario";

export default function ({fluxoCaixa, salarios, faturamento, prazos, mes, ano, setores, setor}) {
    function filtrar(mes, ano, setor) {
        router.get(route('admin.dashboard.financeiros.index'), {mes: mes, ano: ano, setor: setor})
    }

    return (
        <Layout empty titlePage="Indicadores Financeiros" menu="dashboard" submenu="dashboard-financeiro">

            {/*Filtro*/}
            <div className="card card-body mb-4">
                <div className="row">
                    <div className="col-2">
                        <TextField label="Setor" select fullWidth defaultValue={setor}
                                   onChange={e => filtrar(mes, ano, e.target.value)}>
                            {setores.map(item => <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>)}
                        </TextField>
                    </div>
                    <div className="col-2">
                        <TextField label="Mês" select fullWidth defaultValue={mes}
                                   onChange={e => filtrar(e.target.value, ano, setor)}>
                            <MenuItem value="1">Janeiro</MenuItem>
                            <MenuItem value="2">Fevereiro</MenuItem>
                            <MenuItem value="3">Março</MenuItem>
                            <MenuItem value="4">Abril</MenuItem>
                            <MenuItem value="5">Maio</MenuItem>
                            <MenuItem value="6">Junho</MenuItem>
                            <MenuItem value="7">Julho</MenuItem>
                            <MenuItem value="8">Agosto</MenuItem>
                            <MenuItem value="9">Setembro</MenuItem>
                            <MenuItem value="10">Outubro</MenuItem>
                            <MenuItem value="11">Novembro</MenuItem>
                            <MenuItem value="12">Dezembro</MenuItem>
                        </TextField>
                    </div>
                    <div className="col-2">
                        <TextField label="Ano" select fullWidth defaultValue={ano}
                                   onChange={e => filtrar(mes, e.target.value, setor)}>
                            <MenuItem value="2023">2023</MenuItem>
                            <MenuItem value="2024">2024</MenuItem>
                        </TextField>
                    </div>
                </div>
            </div>

            <div className="row">
                {/*Receitas*/}
                <div className="col mb-4">
                    <div className="card card-body pb-0">
                        <div className="row">
                            <div className="col-1 text-center">
                                <ArrowUpwardOutlinedIcon color="success" sx={{fontSize: 24}}/>
                            </div>
                            <div className="col"><span className=" mt-2 fs-6">Receitas</span></div>
                        </div>

                        <div className="row border-bottom mb-3">
                            <div className="col text-center pb-3">
                                <span className="fs-4"> R$ {convertFloatToMoney(fluxoCaixa.totais.entrada)}</span>
                            </div>
                        </div>

                        <table className="table">
                            <tbody>
                            <tr>
                                <td className="col-4">Em aberto:</td>
                                <td>R$ {convertFloatToMoney(fluxoCaixa.totais.entrada_aberto)}</td>
                            </tr>
                            <tr>
                                <td className="col-4">Liquidado:</td>
                                <td>R$ {convertFloatToMoney(fluxoCaixa.totais.entrada_pago)}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/*Despesas*/}
                <div className="col mb-4">
                    <div className="card card-body pb-0">
                        <div className="row">
                            <div className="col-1 text-center">
                                <ArrowDownwardOutlinedIcon color="error" sx={{fontSize: 24}}/>
                            </div>
                            <div className="col"><span className=" mt-2 fs-6">Despesas</span></div>
                        </div>

                        <div className="row border-bottom mb-3">
                            <div className="col text-center pb-3">
                                <span className="fs-4"> R$ {convertFloatToMoney(fluxoCaixa.totais.saida)}</span>
                            </div>
                        </div>

                        <table className="table">
                            <tbody>
                            <tr>
                                <td className="col-4">Em aberto:</td>
                                <td>R$ {convertFloatToMoney(fluxoCaixa.totais.saida_aberto)}</td>
                            </tr>
                            <tr>
                                <td className="col-4">Liquidado:</td>
                                <td>R$ {convertFloatToMoney(fluxoCaixa.totais.saida_pago)}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/*Salarios*/}
                <div className="col mb-4">
                    <div className="card card-body pb-0">
                        <div className="row">
                            <div className="col-1 text-center">
                                <AttachMoneyOutlinedIcon color="error" sx={{fontSize: 24}}/>
                            </div>
                            <div className="col"><span className=" mt-2 fs-6">Salários</span></div>
                        </div>

                        <div className="row border-bottom mb-3">
                            <div className="col text-center pb-3">
                                <span className="fs-4"> R$ {convertFloatToMoney(salarios.total)}</span>
                            </div>
                        </div>

                        <table className="table">
                            <tbody>
                            <tr>
                                <td className="col-4">Em aberto:</td>
                                <td>R$ {convertFloatToMoney(salarios.aberto)}</td>
                            </tr>
                            <tr>
                                <td className="col-4">Liquidado:</td>
                                <td>R$ {convertFloatToMoney(salarios.pago)}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col mb-4">
                    <div className="card card-body pb-0">
                        <div className="row">
                            <div className="col-1 text-center">
                                <ShowChartOutlinedIcon color="success" sx={{fontSize: 22}}/>
                            </div>
                            <div className="col"><span className=" mt-2 fs-6">Saldo</span></div>
                        </div>

                        <div className="row border-bottom mb-3">
                            <div className="col text-center pb-3">
                                <span className="fs-4"> R$ {convertFloatToMoney(fluxoCaixa.totais.entrada - fluxoCaixa.totais.saida - salarios.total)}</span>
                            </div>
                        </div>

                        <table className="table">
                            <tbody>
                            <tr>
                                <td className="col-4">Em aberto:</td>
                                <td>R$ {convertFloatToMoney(fluxoCaixa.totais.entrada_aberto - fluxoCaixa.totais.saida_aberto - salarios.aberto)}</td>
                            </tr>
                            <tr>
                                <td className="col-4">Liquidado:</td>
                                <td>R$ {convertFloatToMoney(fluxoCaixa.totais.entrada_pago - fluxoCaixa.totais.saida_pago - salarios.pago)}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-body">
                    <h6>Faturamento</h6>
                    <Faturamento dados={fluxoCaixa} salarios={salarios}/>
                </div>
            </div>

            {/*<div className="card mt-4">*/}
            {/*    <div className="card-body">*/}
            {/*        <h6>Prazos Médios Pagamentos <br/><small>(Faturando p/ Faturado)</small></h6>*/}
            {/*        <Prazos dados={prazos}/>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </Layout>
    )
}
