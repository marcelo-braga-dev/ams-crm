import React, {useEffect} from 'react';
import DataTable from 'react-data-table-component';
import {TextField} from "@mui/material";
import Layout from '@/Layouts/Admin/Layout';
import MenuItem from "@mui/material/MenuItem";
import {useForm} from "@inertiajs/react";
import Checkbox from "@mui/material/Checkbox";

const FilterComponent = ({filterText, onFilter}) => (
    <TextField
        id="search"
        type="text"
        placeholder="Pesquisar..."
        value={filterText}
        onChange={onFilter}
        size="small"
    />
);

const columns = [
    {
        name: 'ID',
        selector: row => row.id,
        sortable: true,
        grow: 0,
    },
    {
        name: 'Consultor',
        selector: row => row.consultor,
        sortable: true,
    },
    {
        name: 'Status',
        selector: row => row.status,
        sortable: true,
        grow: 0,
    },
    {
        name: 'Nome/Nome Fantasia',
        selector: row => row.name,
        sortable: true,
    },
    {
        name: 'Razão Social',
        selector: row => row.razao_social,
        sortable: true,
    },
    {
        name: 'Telefone',
        selector: row => row.telefone,
        sortable: true,
    },
    {
        name: 'Data',
        selector: row => row.data_criacao,
        sortable: true,
    },
    {
        cell: row => <a className="btn btn-link btn-sm" href={route('admin.clientes.leads.leads-main.show', row.id)}>
            Abrir
        </a>,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
        grow: 0,
    },
];

export default function Filtering({dados}) {
    // Form
    const {data, post, setData, reset} = useForm({
        'leads': []
    });

    function submit() {
        if (data.consultor && data.leads) post(route('admin.clientes.leads.update-consultor'))
        window.location.reload();
    }

    // form - fim

    // Dados
    const linhas = dados.map(function (items) {
        return {
            id: items.id,
            name: items.cliente.nome,
            status: items.infos.status,
            consultor: items.consultor.nome,
            razao_social: items.cliente.razao_social,
            data_criacao: items.infos.data_criacao,
            telefone: items.contato.telefone,
        }
    });
    // Dados - fim

    const [filterText, setFilterText] = React.useState('');

    const filteredItems = linhas.filter(
        item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
            || item.razao_social && item.razao_social.toLowerCase().includes(filterText.toLowerCase())
            || item.consultor && item.consultor.toLowerCase().includes(filterText.toLowerCase())
            || item.id && item.id.toString() === filterText
            || item.telefone && item.telefone.toLowerCase().includes(filterText.toLowerCase())
    );

    const subHeaderComponentMemo = React.useMemo(() => {
        return (
            <FilterComponent onFilter={e => setFilterText(e.target.value)} filterText={filterText}/>
        );
    }, [filterText]);

    const handleChange = row => {
        setData('leads', row.selectedRows)
    };

    function nomeConsultorSelecionado() {
        const nome = consultores[consultores.findIndex(i => i.id === data.consultor)]?.name;
        return nome ? <>
            <b>TROCAR</b> o consultor(a) dos Leads Selecionados para:<br/>
            <h5>{nome}</h5>
        </> : <div className="alert alert-danger text-white">Selecione o Consultor</div>
    }

    function limpar() {
        if (data.leads) post(route('admin.clientes.leads.limpar-consultor'))
        window.location.reload();
    }

    return (
        <Layout titlePage="Alterar Consultor">
            <div className="container bg-white p-2 py-4 rounded">

                <form onSubmit={submit}>
                    <h5 className="mx-4 mb-3">Leads do Consultor</h5>
                </form>
                <DataTable
                    columns={columns}
                    data={filteredItems}
                    pagination
                    paginationPerPage={25}
                    subHeader
                    subHeaderComponent={subHeaderComponentMemo}
                    selectableRows
                    persistTableHead
                    onSelectedRowsChange={handleChange}
                    striped
                    highlightOnHover
                    selectableRowsHighlight
                    selectableRowsComponent={Checkbox}
                />

            </div>
        </Layout>
    );
};
