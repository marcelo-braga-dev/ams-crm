import React, {useState} from 'react';
import DataTable from 'react-data-table-component';
import TextField from "@mui/material/TextField";
import Layout from '@/Layouts/AdminLayout/LayoutAdmin';
import MenuItem from "@mui/material/MenuItem";
import {router} from "@inertiajs/react";
import InfoLead from "@/Pages/Admin/Leads/Componentes/InfoLead";

const columns = [
    {
        name: 'Ordernar por nome', selector: row => row.name || row.razao_social,
        cell: row => <InfoLead dado={row}/>
        , sortable: true, grow: 3,
    }, {
        name: 'Consultor(a)',
        selector: row => <b>{row.consultor}</b>, sortable: true, grow: 2,
    }, {
        name: 'Status', selector: row => row.status, sortable: true, grow: 1,
    }, {
        cell: row => <a className="btn btn-primary btn-sm m-0"
                        href={route('admin.clientes.leads.leads-main.show', row.id)}>
            Ver
        </a>, ignoreRowClick: true, allowOverflow: true, button: true, grow: 0,
    }
];

function getFilteredItems(linhas, filtro, filterText) {
    return linhas.filter(item => filtro === 'id' && item.id && item.id.toString() === filterText || filtro === 'id' && filterText === ''

        || filtro === 'nome' && item.name && item.name.toLowerCase().includes(filterText.toLowerCase()) || filtro === 'nome' && item.razao_social && item.razao_social.toLowerCase().includes(filterText.toLowerCase())

        || filtro === 'telefone' && item.telefone && item.telefone.replace(/[^0-9]/g, '').includes(filterText.replace(/[^0-9]/g, ''))

        || filtro === 'cidade' && item.cidade && item.cidade.toLowerCase().includes(filterText.toLowerCase())

        || filtro === 'cnpj' && item.cnpj && item.cnpj.replace(/[^0-9]/g, '').includes(filterText.replace(/[^0-9]/g, ''))

        || filtro === 'consultor' && item.consultor && item.consultor.toLowerCase().includes(filterText.toLowerCase())

        || filtro === 'ddd' && item.telefone && item.telefone.toLowerCase().includes('(' + filterText.toLowerCase() + ')') || filtro === 'ddd' && filterText === '');
}

export default function Filtering({dados, categorias, categoriaAtual}) {

    const [leads, setLeads] = useState(dados)

    // Dados
    const linhas = leads.map(function (items) {
        return {
            id: items.id,
            name: items.cliente.nome,
            cnpj: items.cliente.cnpj,
            razao_social: items.cliente.razao_social,
            status: items.infos.status,
            consultor: items.consultor.nome,
            data_criacao: items.infos.data_criacao,
            telefone: items.contato.telefone,
            cidade: items.cliente.cidade,
            estado: items.cliente.estado,
        }
    });
    // Dados - fim

    const [filterText, setFilterText] = useState('');
    const [filtro, setFiltro] = useState('nome');
    const filteredItems = getFilteredItems(linhas, filtro, filterText);

    return (
        <Layout container titlePage="Leads Cadastrados" menu="leads" submenu="leads-cadastrados">
            {/*Setores*/}
            <div className="row border-bottom mb-4 pb-2">
                <div className="col-md-5">
                    <TextField label="Setor" select fullWidth
                               value={categoriaAtual ?? ''}
                               onChange={e => router.get(route('admin.clientes.leads.leads-cadastrados', {categoria: e.target.value}))}>
                        {categorias.map((option) =>
                            <MenuItem key={option.id} value={option.id}>
                                {option.nome}
                            </MenuItem>)
                        }
                    </TextField>
                </div>
            </div>

            <div className="row justify-content-between">
                <div className="col-md-auto">
                    {/*FILTRO*/}
                    <div className="row">
                        <div className="col-auto text-right">
                            <TextField
                                id="outlined-select-currency"
                                select
                                placeholder="asas"
                                label="Filtro"
                                defaultValue="nome"
                                size="small"
                                onChange={event => setFiltro(event.target.value)}
                            >
                                <MenuItem value="id">
                                    ID
                                </MenuItem>
                                <MenuItem value="nome">
                                    Nome/Razão Social
                                </MenuItem>
                                <MenuItem value="cnpj">
                                    CNPJ
                                </MenuItem>
                                <MenuItem value="cidade">
                                    Cidade
                                </MenuItem>
                                <MenuItem value="ddd">
                                    DDD
                                </MenuItem>
                                <MenuItem value="telefone">
                                    Telefone
                                </MenuItem>
                            </TextField>
                            <TextField
                                id="search"
                                type="text"
                                placeholder="Pesquisar..."
                                value={filterText}
                                onChange={e => setFilterText(e.target.value)}
                                size="small"
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-auto">
                    <a href={route('admin.clientes.leads.ocultos')} className="btn btn-dark btn-sm">
                        Ocultos</a>
                </div>
            </div>

            <DataTable
                columns={columns}
                data={filteredItems}
                pagination
                paginationPerPage={25}
                striped
                highlightOnHover
            />
        </Layout>
    );
};
