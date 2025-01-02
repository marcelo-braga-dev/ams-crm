import Layout from "@/Layouts/Layout";
import "chart.js/auto";
import Faturamento from "./Graficos/Faturamento";
import {Stack, TextField, Typography} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {router} from "@inertiajs/react";

import convertFloatToMoney from "@/Helpers/converterDataHorario";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import {ArrowDownShort, ArrowUp, ArrowUpShort, GraphUp, Person, Wallet2} from "react-bootstrap-icons";
import CardTitle from "@/Components/Cards/CardTitle";

export default function ({fluxoCaixa, salarios, faturamento, prazos, mes, ano, setores, setor}) {
    function filtrar(mes, ano, setor) {
        router.get(route('admin.dashboard.financeiros.index'), {mes: mes, ano: ano, setor: setor})
    }

    return (
        <Layout empty titlePage="Indicadores Financeiros" menu="dashboard" submenu="dashboard-financeiro">

            {/*Filtro*/}
            <CardContainer>
                <CardBody>
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
                                <MenuItem value="2025">2025</MenuItem>
                            </TextField>
                        </div>
                    </div>
                </CardBody>
            </CardContainer>

            <div className="row">
                {/*Receitas*/}
                <div className="col">
                    <CardContainer>
                        <CardBody>
                            <Stack direction="row" spacing={1}>
                                <ArrowUpShort color="green" size={24}/>
                                <Typography className="">Receitas</Typography>
                            </Stack>

                            <div className="row border-bottom mb-3 pb-3">
                                <div className="col text-center">
                                    <Typography variant="h4"> R$ {convertFloatToMoney(fluxoCaixa.totais.entrada)}</Typography>
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
                        </CardBody>
                    </CardContainer>
                </div>

                {/*Despesas*/}
                <div className="col mb-4">
                    <CardContainer>
                        <CardBody>
                            <Stack direction="row" spacing={1}>
                                <ArrowDownShort color="red" size={24}/>
                                <Typography className="">Despesas</Typography>
                            </Stack>

                            <div className="row border-bottom mb-3">
                                <div className="col text-center pb-3">
                                    <Typography variant="h4"> R$ {convertFloatToMoney(fluxoCaixa.totais.saida)}</Typography>
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
                        </CardBody>
                    </CardContainer>
                </div>

                {/*Salarios*/}
                <div className="col mb-4">
                    <CardContainer>
                        <CardBody>
                            <Stack direction="row" spacing={1}>
                                <Person color="red" size={21}/>
                                <Typography>Salários</Typography>
                            </Stack>

                            <div className="row border-bottom mb-3">
                                <div className="col text-center pb-3">
                                    <Typography variant="h4"> R$ {convertFloatToMoney(salarios.total)}</Typography>
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
                        </CardBody>
                    </CardContainer>
                </div>
                <div className="col mb-4">
                    <CardContainer>
                        <CardBody>
                            <Stack direction="row" spacing={1}>
                                <Wallet2 color="blue" size={20}/>
                                <Typography>Saldo</Typography>
                            </Stack>

                            <div className="row border-bottom mb-3">
                                <div className="col text-center pb-3">
                                    <Typography variant="h4"> R$ {convertFloatToMoney(fluxoCaixa.totais.entrada - fluxoCaixa.totais.saida - salarios.total)}</Typography>
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
                        </CardBody>
                    </CardContainer>
                </div>
            </div>

            <CardContainer>
                <CardTitle title="Faturamento" icon={<GraphUp size={22} /> }/>
                <CardBody>
                    <Faturamento dados={fluxoCaixa} salarios={salarios}/>
                </CardBody>
            </CardContainer>
        </Layout>
    )
}
