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
    const [setorSelecionado, setSetorSelecionado] = useState(setor)

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
        </Layout>
    )
}
