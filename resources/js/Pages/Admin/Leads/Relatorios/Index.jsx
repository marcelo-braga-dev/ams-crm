import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import "chart.js/auto";
import QtdLeadsStatus from "./Graficos/Geral/QtdLeadsStatus";
import React, { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import { TextField } from "@mui/material";
import DataTable from "react-data-table-component";
import LinearProgress from '@mui/material/LinearProgress';

const FilterComponent = ({ filterText, onFilter }) => (
    <TextField
        id="search"
        type="text"
        placeholder="Pesquisar..."
        value={filterText}
        onChange={onFilter}
        size="small"
    />
)

export default function ({ setores, setor }) {
    let nomes = [], qtd = [];
    const [setorSelecionado, setSetorSelecionado] = useState(setor)

    const [statusLeads, setStatusLeads] = useState([])
    const [historicoLeads, setHistoricoLeads] = useState([])
    const [carregando, setCarregando] = useState(true)

    function dadosGrafico(nome, total) {
        nomes.push(nome)
        qtd.push(total)
    }

    useEffect(() => {
        setCarregando(true)
        axios.get(route('admin.clientes.leads.leads-dados-relatorio', { setor: setorSelecionado }))
            .then(res => {
                setStatusLeads(res.data.status_leads)
                setHistoricoLeads(res.data.historico_leads)
                setCarregando(false)
            })
    }, [setorSelecionado]);

    // Dados
    const linhas = historicoLeads.map(function (items) {
        return {
            nome: items.nome,
            data: items.data,
            msg: items.msg
        }
    });
    // Dados - fim

    const columns = [
        {
            name: 'Data',
            selector: row => row.data,
            sortable: true,
            grow: 1,
        }, {
            name: 'Consultor(a)',
            selector: row => <b>{row.nome}</b>,
            sortable: true,
            grow: 1,
        }, {
            name: 'Mensagem',
            selector: row => <span>{row.msg}</span>,
            sortable: true,
            grow: 8,
        },
    ];

    const [filterText, setFilterText] = React.useState('');

    const filteredItems = linhas.filter(
        item =>
            item.data && item.data.toLowerCase().includes(filterText.toLowerCase())
            || item.msg && item.msg.toLowerCase().includes(filterText.toLowerCase())
    );

    const subHeaderComponentMemo = React.useMemo(() => {
        return (
            <FilterComponent onFilter={e => setFilterText(e.target.value)}
                filterText={filterText} />
        );
    }, [filterText]);

    let totalLeads = 0
    let totalNovo = 0
    let totalPreAtendimento = 0
    let totalAberto = 0
    let totalAtendimento = 0
    let totalAtivo = 0
    let totalFinalizado = 0

    return (
        <Layout container titlePage="Relatórios dos Leads" menu="leads" submenu="leads-relatorios">

            <div className="mb-3 card card-body">
                <div className="row">
                    <div className="col-md-3">
                        <TextField select label="Setor" defaultValue={setor} fullWidth
                            onChange={e => setSetorSelecionado(e.target.value)}>
                            {setores.map(item => <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>)}
                        </TextField>
                    </div>
                </div>
            </div>

            <div className="mb-3 card card-body">
                <div className="row">
                    <div className="col">
                        <a className="btn btn-warning btn-sm" target="_blank"
                            href={route('admin.clientes.leads.leads-relatorio', { setor: setorSelecionado })}>Baixar
                            Relatório de Leads</a>
                    </div>
                </div>
            </div>

            {carregando && <LinearProgress />}

            {!carregando &&
                <div className="mt-4 card">
                    <div className="card-body">
                        <h6>Relatórios (clique para abrir)</h6>
                        <div className="table table-responsive">
                            <table className="table text-sm text-center cursor-pointer table-hover">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Iniciar Atendimento</th>
                                        <th>Pré Atendimento</th>
                                        <th>Em Aberto</th>
                                        <th>Atendimento</th>
                                        <th>Ativo</th>
                                        <th>Finalizado</th>
                                        <th>Total</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {statusLeads.map((dado, index) => {
                                        const total = (dado.novo ?? 0) + (dado.pre_atendimento ?? 0) + (dado.aberto ?? 0) + (dado.atendimento ?? 0) + (dado.ativo ?? 0) + (dado.finalizado ?? 0)
                                        totalLeads += total
                                        totalNovo += dado.novo ?? 0
                                        totalPreAtendimento += dado.pre_atendimento ?? 0
                                        totalAberto += dado.aberto ?? 0
                                        totalAtendimento += dado.atendimento ?? 0
                                        totalAtivo += dado.ativo ?? 0
                                        totalFinalizado += dado.finalizado ?? 0

                                        dadosGrafico(dado.nome, total)

                                        return (
                                            <tr key={index} className=""
                                                onClick={() => window.location.href = route('admin.leads.relatorios.show', dado.id)}>
                                                <td className="text-wrap text-start"><b>{dado.nome}</b></td>
                                                <td>{dado.novo ?? 0}</td>
                                                <td>{dado.pre_atendimento ?? 0}</td>
                                                <td>{dado.aberto ?? 0}</td>
                                                <td>{dado.atendimento ?? 0}</td>
                                                <td>{dado.ativo ?? 0}</td>
                                                <td>{dado.finalizado ?? 0}</td>
                                                <td>{total}</td>
                                                <td>
                                                    {/*<a className="px-3 py-1 mb-0 btn btn-primary btn-sm"*/}
                                                    {/*    href={route('admin.leads.relatorios.show', dado.id)}>*/}
                                                    {/*    Ver*/}
                                                    {/*</a>*/}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    <tr className="bg-light">
                                        <td><b>TOTAL</b></td>
                                        <td>{totalNovo}</td>
                                        <td>{totalPreAtendimento}</td>
                                        <td>{totalAberto}</td>
                                        <td>{totalAtendimento}</td>
                                        <td>{totalAtivo}</td>
                                        <td>{totalFinalizado}</td>
                                        <td>{totalLeads}</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            }

            {!carregando &&
                <div className="mt-4 card">
                    <div className="card-body">
                        <h6>Histórico de Envio de Leads</h6>
                        <DataTable
                            columns={columns}
                            data={filteredItems}
                            pagination
                            paginationPerPage="10"
                            subHeader
                            subHeaderComponent={subHeaderComponentMemo}
                            persistTableHead
                            striped
                            highlightOnHover
                            selectableRowsHighlight
                        />
                    </div>

                </div>
            }
        </Layout>
    )
}
