import Layout from "@/Layouts/Layout";
import TopLeadsGrafico from "@/Pages/Admin/Dashboard/Vendas/Graficos/TopLeadsGrafico";
import * as React from "react";
import convertFloatToMoney from "@/Helpers/converterDataHorario";
import {TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import SelectMesesMultiples from "@/Components/Inputs/SelectMesesMultiples";
import {useState} from "react";
import {router} from "@inertiajs/react";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";

export default function ({leads, vendasLeads, vendasLeadsComp, setores, mes, ano, mesComp, anoComp, setor}) {
    const [mesesSelecionado, setMesesSelecionado] = useState(mes);
    const [anoSelecionado, setAnoSelecionado] = useState(ano);
    const [setorSelecionado, setSetorSelecionado] = useState(setor);
    const [mesesSelecionadoComp, setMesesSelecionadoComp] = useState(mesComp);
    const [anoSelecionadoComp, setAnoSelecionadoComp] = useState(anoComp);

    let vendasTotal = 0, qtdTotal = 0, mediaTotal = 0
    let valorTotalComp = 0, qtdTotalComp = 0, mediaTotalComp = 0

    const isComparar = !!mesComp.length && anoComp

    function atualizarPeriodo() {
        router.get(route('admin.dashboard.vendas.leads'),
            {mes: mesesSelecionado, ano: anoSelecionado, mesComp: mesesSelecionadoComp, anoComp: anoSelecionadoComp, setor: setorSelecionado})
    }

    return (
        <Layout empty titlePage="Vendas por Cliente (Leads)" menu="dashboard" submenu="dashboard-vendas"
                voltar={route('admin.dashboard.vendas.index')}>
            <CardContainer>
                <CardBody>
                    <div className="row">
                        <div className="col-2">
                            <TextField label="Setor" select fullWidth defaultValue={setor}
                                       onChange={e => setSetorSelecionado(e.target.value)}>
                                {setores.map(item => <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>)}
                            </TextField>
                        </div>
                        <div className="col-2">
                            <SelectMesesMultiples value={mesesSelecionado} useState={setMesesSelecionado}/>
                        </div>
                        <div className="col-2">
                            <TextField label="Ano" select fullWidth defaultValue={ano} onChange={e => setAnoSelecionado(e.target.value)}>
                                <MenuItem value="2023">2023</MenuItem>
                                <MenuItem value="2024">2024</MenuItem>
                                <MenuItem value="2025">2025</MenuItem>
                            </TextField>
                        </div>
                        <div className="col-2">
                            <button className="btn btn-primary btn-sm" onClick={() => atualizarPeriodo()}>Filtrar</button>
                        </div>
                    </div>
                    <div className="mt-2 row">
                        <div className="col-2">
                        </div>
                        <div className="col-2">
                            <SelectMesesMultiples value={mesesSelecionadoComp} label="Comparar Meses"
                                                  useState={setMesesSelecionadoComp}/>
                        </div>
                        <div className="col-2">
                            <TextField label="Comparar Ano" select fullWidth value={anoSelecionadoComp}
                                       onChange={e => setAnoSelecionadoComp(e.target.value)}>
                                <MenuItem value="">...</MenuItem>
                                <MenuItem value="2023">2023</MenuItem>
                                <MenuItem value="2024">2024</MenuItem>
                                <MenuItem value="2025">2025</MenuItem>
                            </TextField>
                        </div>
                    </div>
                </CardBody>
            </CardContainer>

            <CardContainer>
                <CardBody>
                    <TopLeadsGrafico leads={leads} dados={vendasLeads} vendasLeadsComp={vendasLeadsComp}/>
                </CardBody>
            </CardContainer>

            <CardContainer>
                <CardBody>
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th>
                                <div className="row justify-content-between">
                                    <div className="col">Clientes</div>
                                    <div className="col-auto"><small>Qtd. {leads.length}</small></div>
                                </div>
                            </th>
                            {isComparar && <th></th>}
                            <th className="text-center col-1">Qtd. Pedidos</th>
                            <th className="text-center">Valor Total</th>
                            <th className="text-center">Valor Médio</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {leads.map(item => {
                            const qtd = vendasLeads?.[item.lead_id]?.qtd ?? 0
                            const valor = vendasLeads?.[item.lead_id]?.valor ?? 0

                            qtdTotal += qtd
                            vendasTotal += valor

                            const media = valor / qtd

                            const valorComp = vendasLeadsComp?.[item.lead_id]?.valor ?? 0
                            const qtdComp = vendasLeadsComp?.[item.lead_id]?.qtd ?? 0
                            const mediaComp = valorComp / (qtdComp > 0 ? qtdComp : 1)

                            mediaTotal += media
                            mediaTotalComp += mediaComp

                            const difValor = valor - valorComp
                            const difQtd = qtdComp - qtd
                            const difMedia = mediaComp - media

                            const textColor = 'd-block ' + (difValor > 0 ? 'text-success' : 'text-danger')

                            qtdTotalComp += qtdComp
                            valorTotalComp += valorComp

                            return (
                                <tr key={item.lead_id}>
                                    <td className="text-wrap" style={{maxWidth: 300}}>
                                        <b>{item.lead_nome}</b><br/>
                                        ID: #{item.lead_id}<br/>
                                        Último Pedido: {item.pedido_data}, {item.pedido_data_dif} dias atrás
                                    </td>
                                    {isComparar && <td>
                                        Referência
                                        <span className="d-block border-bottom border-top">Comparar</span>
                                        <span className={textColor}>Diferença</span>
                                    </td>}
                                    <td className="text-center">
                                        {qtd}
                                        {isComparar && <>
                                            <span className="d-block border-bottom border-top">{qtdComp}</span>
                                            <span>{difQtd}</span>
                                        </>}
                                    </td>
                                    <td className="text-center">
                                        R$ {convertFloatToMoney(valor)}
                                        {isComparar && <>
                                            <span className="d-block border-bottom border-top">R$ {convertFloatToMoney(valorComp)}</span>
                                            <span className={textColor}>R$ {convertFloatToMoney(difValor)}</span>
                                        </>}
                                    </td>
                                    <td className="text-center">
                                        R$ {convertFloatToMoney(media)}
                                        {isComparar && <>
                                            <span className="d-block border-bottom border-top"> R$ {convertFloatToMoney(mediaComp)}</span>
                                            <span> R$ {convertFloatToMoney(difMedia)}</span>
                                        </>}
                                    </td>
                                    <td className="text-center">
                                        <a className="btn btn-link btn-sm p-0 m-0" href={route('admin.clientes.leads.leads-main.show', item.lead_id)}>Ver</a>
                                    </td>
                                </tr>
                            )
                        })}
                        <tr className="bg-light">
                            <td><b>TOTAL</b></td>
                            {isComparar && <td>
                                Referência
                                <span className="d-block border-bottom border-top">Comparar</span>
                                <span className={(valorTotalComp - vendasTotal) >= 0 ? 'text-success' : 'text-danger'}>Diferença</span>
                            </td>}
                            <td className="text-center">
                                {qtdTotal}
                                {isComparar && <>
                                    <span className="d-block border-bottom border-top">{qtdTotalComp}</span>
                                    <span>{qtdTotalComp - qtdTotal}</span>
                                </>}
                            </td>
                            <td className="text-center">
                                R$ {convertFloatToMoney(vendasTotal)}
                                {isComparar && <>
                                    <span className="d-block border-bottom border-top">R$ {convertFloatToMoney(valorTotalComp)}</span>
                                    <span className={(valorTotalComp - vendasTotal) >= 0 ? 'text-success' : 'text-danger'}>
                                    R$ {convertFloatToMoney(valorTotalComp - vendasTotal)}
                                </span>
                                </>}
                            </td>
                            <td className="text-center">
                                R$ {convertFloatToMoney(mediaTotal)}
                                {isComparar && <>
                                    <span className="d-block border-bottom border-top"> R$ {convertFloatToMoney(mediaTotalComp)}</span>
                                    <span> R$ {convertFloatToMoney(mediaTotalComp - mediaTotal)}</span>
                                </>}
                            </td>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                </CardBody>
            </CardContainer>
        </Layout>
    )
}
