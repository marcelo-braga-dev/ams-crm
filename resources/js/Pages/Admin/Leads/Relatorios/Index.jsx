import Layout from "@/Layouts/Layout";
import "chart.js/auto";
import React, {useEffect, useState} from "react";
import MenuItem from "@mui/material/MenuItem";
import {TextField} from "@mui/material";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";

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

export default function ({setores, setor}) {
    const [setorSelecionado, setSetorSelecionado] = useState(setor)

    return (
        <Layout container titlePage="Relatórios dos Leads" menu="leads" submenu="leads-relatorios">
            <CardContainer>
                <CardBody>
                    <div className="row">
                        <div className="col-md-3">
                            <TextField select label="Setor" defaultValue={setor} fullWidth
                                       onChange={e => setSetorSelecionado(e.target.value)}>
                                {setores.map(item => <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>)}
                            </TextField>
                        </div>
                    </div>
                </CardBody>
            </CardContainer>
            <CardContainer>
                <CardBody>
                    <div className="row">
                        <div className="col">
                            <a className="btn btn-warning btn-sm mb-0" target="_blank"
                               href={route('admin.clientes.leads.leads-relatorio', {setor: setorSelecionado})}>Baixar
                                Relatório de Leads</a>
                        </div>
                    </div>
                </CardBody>
            </CardContainer>
        </Layout>
    )
}
