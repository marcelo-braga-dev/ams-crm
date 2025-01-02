import Layout from "@/Layouts/Layout";
import * as React from "react";
import {TextField, Typography} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import SelectMesesMultiples from "@/Components/Inputs/SelectMesesMultiples";
import {useState} from "react";
import {router} from "@inertiajs/react";
import DistribuidorasGrafico from "@/Pages/Admin/Dashboard/Vendas/Graficos/DistribuidorasGrafico";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import convertFloatToMoney from "@/Helpers/converterDataHorario";
import CardTitle from "@/Components/Cards/CardTitle";
import CardTable from "@/Components/Cards/CardTable";

export default function ({fornecedoresVendas, setores, mes, ano, mesComp, anoComp, setor}) {
    const [mesesSelecionado, setMesesSelecionado] = useState(mes);
    const [anoSelecionado, setAnoSelecionado] = useState(ano);
    const [setorSelecionado, setSetorSelecionado] = useState(setor);
    const [mesesSelecionadoComp, setMesesSelecionadoComp] = useState(mesComp);
    const [anoSelecionadoComp, setAnoSelecionadoComp] = useState(anoComp);
    const [vendasFornecedor, setVendasFornecedor] = useState([]);

    function atualizarPeriodo() {
        router.get(route('admin.dashboard.vendas.fornecedores'),
            {mes: mesesSelecionado, ano: anoSelecionado, mesComp: mesesSelecionadoComp, anoComp: anoSelecionadoComp, setor: setorSelecionado})
    }

    const fetchVendas = (fornecedor) => {
        axios.get(route('admin.dashboard.get-vendas.fornecedores',
                {fornecedor, mes: mesesSelecionado, ano: anoSelecionado, setor: setorSelecionado}))
            .then(res => setVendasFornecedor(res.data));
    };

    return (
        <Layout empty titlePage="Vendas por Distribuidoras" menu="dashboard" submenu="dashboard-vendas"
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

            <div className="row">
                <div className="col">
                    <CardContainer>
                        <CardBody>
                            <DistribuidorasGrafico dados={fornecedoresVendas}/>
                        </CardBody>
                    </CardContainer>
                </div>
                <div className="col">
                    <CardContainer>
                        <CardBody>
                            <table className="table-1">
                                <thead>
                                <tr>
                                    <th>Distribuidoras</th>
                                    <th>Qtd</th>
                                    <th>Vendas</th>
                                </tr>
                                </thead>
                                <tbody>
                                {fornecedoresVendas.map(item => (
                                    <tr>
                                        <td>{item.fornecedor_nome}</td>
                                        <td>{item.qtd}</td>
                                        <td className="text-nowrap">R$ {convertFloatToMoney(item.valor)}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </CardBody>
                    </CardContainer>
                </div>
            </div>

            <CardContainer>
                <CardTitle title="Vendas por Distribuidoras"/>
                <CardBody>
                    <TextField label="Distribuidora" select fullWidth style={{width: '15rem'}}
                               onChange={e => fetchVendas(e.target.value)}>
                        {fornecedoresVendas.map(item => <MenuItem key={item.fornecedor_id} value={item.fornecedor_id}>{item.fornecedor_nome}</MenuItem>)}
                    </TextField>

                    <CardTable>
                        <table className="table-1">
                            <thead>
                            <tr>
                                <th className="text-center">ID do Pedido</th>
                                <th>Cliente</th>
                                <th>Integrador</th>
                                <th>Consultor(a)</th>
                                <th>Valor</th>
                                <th>Data</th>
                            </tr>
                            </thead>
                            <tbody>
                            {vendasFornecedor.map(item => (
                                <tr>
                                    <td className="text-center">#{item.pedido_id}</td>
                                    <td>
                                        <Typography>{item.cliente_nome}</Typography>
                                        <Typography>{item.cliente_razao_social}</Typography>
                                    </td>
                                    <td>{item.lead_nome}</td>
                                    <td>{item.consultor_nome}</td>
                                    <td>R$ {convertFloatToMoney(item.valor)}</td>
                                    <td>{item.data}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </CardTable>
                </CardBody>
            </CardContainer>
        </Layout>
    )
}
