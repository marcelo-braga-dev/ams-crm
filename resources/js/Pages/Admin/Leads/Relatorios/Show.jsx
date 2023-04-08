import Layout from "@/Layouts/Admin/Layout";

import React from "react";
import "chart.js/auto";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

import convertFloatToMoney from "@/Helpers/converterDataHorario";
import QtdAtendimento from "./Graficos/QtdAtendimento";
import QtdLeadsConsultor from "./Graficos/QtdLeadsConsultor";
import QtdTipoAtendimento from "./Graficos/QtdTipoAtendimento";
import DataTable from "react-data-table-component";

const FilterComponent = ({filterText, onFilter}) => (
    <TextField
        id="search"
        type="text"
        placeholder="Pesquisar..."
        value={filterText}
        onChange={onFilter}
        size="small"
    />
)

export default function ({id, qtdLeadsStatus, qtdAtendimentoTipo, meioContato, historicoLeads, usuario}) {

    const linhas = historicoLeads.map(function (items) {
        return {
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
            grow: 0.1,
        }, {
            name: 'Mensagem',
            selector: row => row.msg,
            sortable: true,
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
                             filterText={filterText}/>
        );
    }, [filterText]);

    return (
        <Layout container titlePage="Relatórios do Consultor" menu="leads" submenu="relatorios"
                voltar={route('admin.leads.relatorios.index')}>
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-auto">
                            <small className="d-block">Consultor(a):</small>
                            <span className="d-block font-weight-bold">{usuario.nome}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mb-3 mt-4 ms-4">
                <div className="col">
                    <a href={route('admin.leads.consultores-cards.index', {id: id})}
                       className="btn btn-primary">Ver Cards</a>
                </div>
            </div>

            <div className="card mb-4">
                <div className="card-body">
                    <span>Período</span>
                    <div className="row mb-3">
                        <div className="col-md-3">
                            <TextField select label="Mês" size="small" fullWidth defaultValue="" required
                                       onChange={e => setData('mes', e.target.value)}>
                                <MenuItem value="">2023</MenuItem>
                            </TextField>
                        </div>
                        <div className="col-md-3">
                            <TextField select label="Ano" size="small" fullWidth defaultValue="" required
                                       onChange={e => setData('ano', e.target.value)}>
                                <MenuItem value="">2023</MenuItem>
                            </TextField>
                        </div>
                    </div>
                </div>
            </div>

            {/*Qtd Leads Consultos*/}
            <div className="row">
                <div className="col-md-7">
                    <div className="card">
                        <div className="card-body">
                            <QtdLeadsConsultor dados={qtdLeadsStatus}/>
                        </div>
                    </div>
                    <div className="row row-cols-2 mt-2">
                        <div className="col">
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="card-title mb-0">Conversão de Leads</h6>
                                    <small className="d-block text-muted">(Atendimento para Ativo)</small>
                                    <h2 className="text-center">{convertFloatToMoney(qtdLeadsStatus.ativo / qtdLeadsStatus.atendimento * 100)}%</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-5">
                    <div className="card mt-2">
                        <div className="card-body">
                            <h6>Tipos de Contato</h6>
                            <QtdTipoAtendimento dados={meioContato}/>
                        </div>
                    </div>
                </div>
            </div>

            {/*Tipo Atendimento*/}
            <div className="row mt-4">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <h6>Quantidade e Status dos Atendimentos</h6>
                            <QtdAtendimento dados={qtdAtendimentoTipo}/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card mt-4">
                <div className="card-body">
                    <h6>Histórico de Recebimento de Leads</h6>
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
        </Layout>
    )
}
