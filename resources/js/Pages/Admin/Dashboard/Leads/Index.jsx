import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import "chart.js/auto";
import {TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Sdr from "./Graficos/Sdr";
import Status from "./Graficos/Status";
import {useState} from "react";
import SelectMesesMultiples from "@/Components/Inputs/SelectMesesMultiples";
import * as React from "react";

export default function ({registrosStatus, sdr, mes, ano, setores, setor}) {

    const [registrosSdr, setRegistrosSdr] = useState([])
    const [mesesSelecionado, setMesesSelecionado] = useState([]);
    const [anoSelecionado, setAnoSelecionado] = useState(2024);
    const [setorSelecionado, setSetorSelecionado] = useState([setor]);
    const [mesesSelecionadoComp, setMesesSelecionadoComp] = useState([]);
    const [anoSelecionadoComp, setAnoSelecionadoComp] = useState();

    function getDados(id) {
        axios.get(route('admin.dashboard.leads.relatorio', {id: id}))
            .then(res => setRegistrosSdr(res.data.sdr))
    }

    return (
        <Layout titlePage="Indicadores de Leads" menu="dashboard" submenu="dashboard-leads">

            <div className="mb-4 card card-body">
                <div className="row">
                    <div className="col-2">
                        <TextField label="Setor" select fullWidth defaultValue={setor}
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
                    <div className="col-2">
                        <button className="btn btn-primary btn-sm"
                                onClick={() => setFiltrar(e => !e)}>Filtrar
                        </button>
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
                        <TextField label="Comparar Ano" select fullWidth
                                   onChange={e => setAnoSelecionadoComp(e.target.value)}>
                            <MenuItem value="2023">2023</MenuItem>
                            <MenuItem value="2024">2024</MenuItem>
                        </TextField>
                    </div>
                </div>
            </div>

            <div className="card card-body mb-4">
                <div className="row mb-3">
                    <div className="col-md-3">
                        <TextField select fullWidth label="Usuário"
                                   onChange={e => getDados(e.target.value)}>
                            {sdr.map(item => <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>)}
                        </TextField>
                    </div>
                </div>
                {registrosSdr.length > 0 ? <>
                    <div className="row">
                        <div className="col-auto mb-4">
                            <small className="d-block">Total de Leads recebidos no período: 0.</small>
                        </div>
                        <div className="col-auto mb-4">
                            <small>Total de Leads ativados no período: 0.</small>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-7">
                            <Sdr dados={registrosSdr}/>
                        </div>
                        <div className="col-md-5">
                            <table className="table text-center table-sm">
                                <thead>
                                <tr>
                                    <th className="text-start">Status</th>
                                    <th>Referência</th>
                                    <th>Comparado</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="text-start">Iniciar Atendimento</td>
                                    <td>0</td>
                                    <td>0</td>
                                </tr>
                                <tr>
                                    <td className="text-start">Pré Atendimento</td>
                                    <td>0</td>
                                    <td>0</td>
                                </tr>
                                <tr>
                                    <td className="text-start">Em Aberto</td>
                                    <td>0</td>
                                    <td>0</td>
                                </tr>
                                <tr>
                                    <td className="text-start">Em Atendimento</td>
                                    <td>0</td>
                                    <td>0</td>
                                </tr>
                                <tr>
                                    <td className="text-start">Ativo</td>
                                    <td>0</td>
                                    <td>0</td>
                                </tr>
                                <tr>
                                    <td className="text-start">Finalizado</td>
                                    <td>0</td>
                                    <td>0</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </> : 'Nenhum registro encontrado.'}
            </div>


            <div className="row">
                <div className="col-md-6">
                    <div className="card card-body mb-4">
                        <span>Total de Leads Encaminhados no Período</span>
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Nome</th>
                                <th className="text-center">Recebidos</th>
                                <th className="text-center">Ativados</th>
                            </tr>
                            </thead>
                            <tbody>
                            {sdr.map(item => (
                                <tr>
                                    <td>{item.nome}</td>
                                    <td className="text-center">0</td>
                                    <td className="text-center">0</td>
                                </tr>
                            ))}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="card card-body mb-4">
                <div className="row">
                    <div className="col-md-6">
                        <span>Total de Leads</span>
                        <Status dados={registrosStatus}/>
                    </div>
                    <div className="col-md-6">
                        <table className="table table-sm">
                            <thead>
                            <tr>
                                <th>Status</th>
                                <th className="text-center">Referência</th>
                                <th className="text-center">Média Tempo</th>
                            </tr>
                            </thead>

                            <tbody>
                            {registrosStatus.map(item => (
                                <tr>
                                    <td>{item.status}</td>
                                    <td className="text-center">{item.qtd}</td>
                                    <td className="text-center">0 dias</td>
                                </tr>
                            ))}
                            <tr className="bg-light">
                                <td>Total</td>
                                <td className="text-center">0</td>
                                <td className="text-center">0 dias</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </Layout>
    )
}
