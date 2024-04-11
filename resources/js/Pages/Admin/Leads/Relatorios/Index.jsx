import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import "chart.js/auto";
import QtdLeadsStatus from "./Graficos/Geral/QtdLeadsStatus";
import React, {useState} from "react";
import MenuItem from "@mui/material/MenuItem";
import {TextField} from "@mui/material";
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

export default function ({qtdLeads, historicoLeads}) {
    let nomes = [], qtd = [], varQtdLeads = [];
    const [qtdStatus, setQtsStatus] = useState(qtd)

    function dadosGrafico(nome, total) {
        nomes.push(nome)
        qtd.push(total)
    }

    function qtdLeadsStatus(status) {
        varQtdLeads = []
        qtdLeads.map((value) => {
            switch (status) {
                case 'novo':
                    varQtdLeads.push(value.novo);
                    break
                case 'atendimento':
                    varQtdLeads.push(value.atendimento);
                    break
                case 'ativo':
                    varQtdLeads.push(value.ativo);
                    break
                case 'finalizado':
                    varQtdLeads.push(value.finalizado);
                    break
                default :
                    varQtdLeads = null
            }
        })
        setQtsStatus(varQtdLeads ?? qtd)
    }

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
            grow: 0.08,
        }, {
            name: 'Consultor(a)',
            selector: row => <b>{row.nome}</b>,
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
        <Layout container titlePage="Relatórios dos Leads" menu="leads" submenu="leads-relatorios">

            <div className="row">
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h6>Total de Leads</h6>
                            <TextField className="w-25" select label="Status do Leads" defaultValue="total" size="small"
                                       fullWidth
                                       onChange={event => qtdLeadsStatus(event.target.value)}>
                                <MenuItem value="novo">
                                    Novo
                                </MenuItem>
                                <MenuItem value="atendimento">
                                    Atendimento
                                </MenuItem>
                                <MenuItem value="ativo">
                                    Ativo
                                </MenuItem>
                                <MenuItem value="finalizado">
                                    Finalizado
                                </MenuItem>
                                <MenuItem value="total">
                                    Total
                                </MenuItem>
                            </TextField>

                            <QtdLeadsStatus nomes={nomes} qtd={qtdStatus}/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card mt-4">
                <div className="card-body">
                    <h6>Relatórios (clique para abrir)</h6>
                    <div className="table table-responsive">
                        <table className="table text-center text-sm table-hover cursor-pointer">
                            <thead>
                            <tr>
                                <th></th>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Novo</th>
                                <th>Atendimento</th>
                                <th>Ativo</th>
                                <th>Finalizado</th>
                                <th>Total</th>
                            </tr>
                            </thead>
                            <tbody>
                            {qtdLeads.map((dado, index) => {
                                const total = (dado.novo ?? 0) + (dado.atendimento ?? 0) + (dado.ativo ?? 0) + (dado.finalizado ?? 0)
                                dadosGrafico(dado.nome, total)
                                return (
                                    <tr key={index} className=""
                                        onClick={() => window.location.href = route('admin.leads.relatorios.show', dado.id)}>
                                        <td>
                                            <a className="btn btn-primary btn-sm mb-0 px-3 py-1"
                                               href={route('admin.leads.relatorios.show', dado.id)}>
                                                Ver
                                            </a>
                                        </td>
                                        <td>#{dado.id}</td>
                                        <td className="text-wrap text-start"><b>{dado.nome}</b></td>
                                        <td>{dado.novo ?? 0}</td>
                                        <td>{dado.atendimento ?? 0}</td>
                                        <td>{dado.ativo ?? 0}</td>
                                        <td>{dado.finalizado ?? 0}</td>
                                        <td>{total}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="card mt-4">
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
        </Layout>
    )
}
