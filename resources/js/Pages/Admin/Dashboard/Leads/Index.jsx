import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import "chart.js/auto";
import {Stack, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Status from "./Graficos/Status";
import {useEffect, useState} from "react";
import SelectMesesMultiples from "@/Components/Inputs/SelectMesesMultiples";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import {round} from "lodash";
import LinearProgress from "@mui/material/LinearProgress";

export default function ({mes, ano, setores}) {

    const [usuariosSdr, setUsuariosSdr] = useState([])
    const [usuariosConsultores, setUsuariosConsultores] = useState([])
    const [registrosUsuario, setRegistrosUsuario] = useState([])
    const [registrosStatus, setRegistrosStatus] = useState([])
    const [registrosQtds, setRegistrosQtds] = useState([])
    const [statusQtd, setStatusQtd] = useState([])

    const [usuarioSelecionado, setUsuarioSelecionado] = useState();
    const [mesesSelecionado, setMesesSelecionado] = useState(mes);
    const [anoSelecionado, setAnoSelecionado] = useState(ano);
    const [setorSelecionado, setSetorSelecionado] = useState(1);

    const [carregando, setCarregando] = useState(true);

    let totalLeadsCadastrados = 0, totalUsuarios = 0, totalConsultores = 0
    let totalAtendimento = 0, totalEncaminhados = 0, totalAtivos = 0, totalFinalizados = 0, totalConversao = 0
    let totalAbertoC = 0, totalAtendimentoC = 0, totalAtivosC = 0, totalFinalizadosC = 0, totalConversaoC = 0

    useEffect(() => {
        setCarregando(true)
        axios.get(route('admin.dashboard.leads.relatorio',
            {id: usuarioSelecionado, mes: mesesSelecionado, ano: anoSelecionado, setor: setorSelecionado}))
            .then(res => {
                setUsuariosSdr(res.data.usuarios_sdr)
                setUsuariosConsultores(res.data.usuarios_consultores)
                setRegistrosUsuario(res.data.registros_usuario)
                setRegistrosStatus(res.data.registros_status)
                setRegistrosQtds(res.data.status_qtds)
                setStatusQtd(res.data.status_qtd)

                setRegistrosUsuario(res.data.registros_usuario)
                setCarregando(false)
            })

    }, [usuarioSelecionado, mesesSelecionado, anoSelecionado, setorSelecionado]);

    return (
        <Layout empty titlePage="Indicadores de Leads" menu="dashboard" submenu="dashboard-leads">
            <div className="mb-4 card card-body">
                <div className="row">
                    <div className="col-2">
                        <TextField label="Setor" select fullWidth defaultValue={setorSelecionado}
                                   onChange={e => setSetorSelecionado(e.target.value)}>
                            {setores.map(item => <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>)}
                        </TextField>
                    </div>
                    <div className="col-2">
                        <SelectMesesMultiples label="Mês Referência" value={mesesSelecionado} useState={setMesesSelecionado}/>
                    </div>
                    <div className="col-2">
                        <TextField label="Ano" select fullWidth defaultValue={ano}
                                   onChange={e => setAnoSelecionado(e.target.value)}>
                            <MenuItem value="2023">2023</MenuItem>
                            <MenuItem value="2024">2024</MenuItem>
                        </TextField>
                    </div>
                </div>
            </div>

            {carregando && <LinearProgress/>}

            {!carregando && <>
                <div className="row">
                    <div className="col">
                        <div className="card card-body mb-4">
                            <h6>Histórico dos SDR</h6>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th className="text-center">Atendimento</th>
                                    <th className="text-center">Encaminhados</th>
                                    <th className="text-center">Ativados</th>
                                    <th className="text-center">Finalizados</th>
                                    <th className="text-center bg-light">Total</th>
                                    <th className="text-center">Conversão</th>
                                </tr>
                                </thead>
                                <tbody>
                                {usuariosSdr.map(item => {
                                    const calcConversao = (registrosQtds.ativos?.[item.id] ?? 0) / (registrosQtds.encaminhados?.[item.id] ?? 0) * 100
                                    const conversao = (calcConversao > 0 && isFinite(calcConversao)) ? round(calcConversao, 2) : 0
                                    const totalUsuario = (registrosQtds.pre_atendimento?.[item.id] ?? 0) +
                                        (registrosQtds.encaminhados?.[item.id] ?? 0) +
                                        (registrosQtds.ativos?.[item.id] ?? 0) +
                                        (registrosQtds.finalizados?.[item.id] ?? 0)

                                    totalUsuarios += totalUsuario

                                    totalAtendimento += (registrosQtds.pre_atendimento?.[item.id] ?? 0)
                                    totalEncaminhados += (registrosQtds.encaminhados?.[item.id] ?? 0)
                                    totalAtivos += (registrosQtds.ativos?.[item.id] ?? 0)
                                    totalFinalizados += (registrosQtds.finalizados?.[item.id] ?? 0)
                                    totalConversao += conversao

                                    return (
                                        <tr key={item.id}>
                                            <td>
                                                <Stack direction="row" spacing={1}>
                                                    <Avatar src={item.foto} sx={{width: 24, height: 24}}/>
                                                    <b>{item.status ? item.nome : <del> {item.nome}</del>}</b>
                                                </Stack>
                                            </td>
                                            <td className="text-center">{registrosQtds.pre_atendimento?.[item.id] ?? 0}</td>
                                            <td className="text-center">{registrosQtds.encaminhados?.[item.id] ?? 0}</td>
                                            <td className="text-center">{registrosQtds.ativos?.[item.id] ?? 0}</td>
                                            <td className="text-center">{registrosQtds.finalizados?.[item.id] ?? 0}</td>
                                            <td className="text-center bg-light">{totalUsuario}</td>
                                            <td className="text-center">{conversao}%</td>
                                        </tr>
                                    )
                                })}
                                <tr className="bg-light text-center">
                                    <td className="text-start"><b>TOTAL</b></td>
                                    <td>{totalAtendimento}</td>
                                    <td>{totalEncaminhados}</td>
                                    <td>{totalAtivos}</td>
                                    <td>{totalFinalizados}</td>
                                    <td>{totalUsuarios}</td>
                                    <td>{totalConversao}%</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="card card-body mb-4">
                            <h6>Histórico dos Consultores(as)</h6>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th className="text-center">Em Aberto</th>
                                    <th className="text-center">Em Atendimento</th>
                                    <th className="text-center">Ativo</th>
                                    <th className="text-center">Finalizados</th>
                                    <th className="text-center bg-light">TOTAL</th>
                                    <th className="text-center">Conversão</th>
                                </tr>
                                </thead>
                                <tbody>
                                {usuariosConsultores.map(item => {
                                    const calcConversao = (statusQtd?.[item.id]?.ativo ?? 0) / (statusQtd?.[item.id]?.atendimento ?? 0) * 100
                                    const conversao = (calcConversao > 0 && isFinite(calcConversao)) ? round(calcConversao, 2) : 0

                                    const totalConsultor = (statusQtd?.[item.id]?.aberto ?? 0) +
                                        (statusQtd?.[item.id]?.atendimento ?? 0) +
                                        (statusQtd?.[item.id]?.ativo ?? 0) +
                                        (statusQtd?.[item.id]?.finalizado ?? 0)

                                    totalConsultores += totalConsultor
                                    totalAbertoC += (statusQtd?.[item.id]?.aberto ?? 0)
                                    totalAtendimentoC += (statusQtd?.[item.id]?.atendimento ?? 0)
                                    totalAtivosC += (statusQtd?.[item.id]?.ativo ?? 0)
                                    totalFinalizadosC += (statusQtd?.[item.id]?.finalizado ?? 0)
                                    totalConversaoC += conversao

                                    return (
                                        <tr key={item.id} className="text-center">
                                            <td className="text-start">
                                                <Stack direction="row" spacing={1}>
                                                    <Avatar src={item.foto} sx={{width: 24, height: 24}}/>
                                                    <b>{item.status ? item.nome : <del> {item.nome}</del>}</b>
                                                </Stack>
                                            </td>
                                            <td>{statusQtd?.[item.id]?.aberto ?? 0}</td>
                                            <td>{statusQtd?.[item.id]?.atendimento ?? 0}</td>
                                            <td>{statusQtd?.[item.id]?.ativo ?? 0}</td>
                                            <td>{statusQtd?.[item.id]?.finalizado ?? 0}</td>
                                            <td className="bg-light">{totalConsultor}</td>
                                            <td>{conversao}%</td>
                                        </tr>
                                    )
                                })}
                                <tr className="bg-light text-center">
                                    <td className="text-start"><b>TOTAL</b></td>
                                    <td>{totalAbertoC}</td>
                                    <td>{totalAtendimentoC}</td>
                                    <td>{totalAtivosC}</td>
                                    <td>{totalFinalizadosC}</td>
                                    <td className="bg-light">{totalConsultores}</td>
                                    <td></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="card card-body mb-4">
                    <div className="row">
                        <div className="col-md-8">
                            <h6>Total de Leads com Usuários</h6>
                            <Status dados={registrosStatus}/>
                        </div>
                        <div className="col-md-4">
                            <table className="table table-sm">
                                <thead>
                                <tr>
                                    <th>Status</th>
                                    <th className="text-center">Qtd.</th>
                                </tr>
                                </thead>

                                <tbody>
                                {registrosStatus.map(item => {
                                    totalLeadsCadastrados += item.qtd
                                    return (
                                        <tr key={item.status}>
                                            <td>{item.status}</td>
                                            <td className="text-center">{item.qtd}</td>
                                        </tr>
                                    )
                                })}
                                <tr className="bg-light">
                                    <td>Total</td>
                                    <td className="text-center">{totalLeadsCadastrados}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>}
        </Layout>
    )
}
