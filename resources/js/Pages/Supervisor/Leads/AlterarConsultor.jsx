import React, {useEffect} from 'react';
import DataTable from 'react-data-table-component';
import {TextField} from "@mui/material";
import Layout from '@/Layouts/Supervisor/Layout';
import MenuItem from "@mui/material/MenuItem";
import {useForm} from "@inertiajs/react";

import Checkbox from '@mui/material/Checkbox';

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
        cell: row => <a className="btn btn-link btn-sm" href={route('supervisor.clientes.leads.leads-main.show', row.id)}>
            Abrir
        </a>,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
        grow: 0,
    },
];

export default function Filtering({dados, consultores}) {
    // Form
    const {data, post, setData, reset} = useForm({
        'leads': []
    });

    function submit() {
        if (data.consultor && data.leads) {
            post(route('supervisor.clientes.leads.update-consultor'))
            window.location.reload()
        }
    }

    // form - fim

    // Dados
    const linhas = dados.map(function (items) {
        return {
            id: items.id,
            name: items.cliente.nome,
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

    return (
        <Layout titlePage="Alterar Consultor">
            <div className="container bg-white p-2 py-4 rounded">

                <form onSubmit={submit}>
                    <h5 className="mx-4 mb-3">Alterar Consultor</h5>
                    <div className="row justify-content-between">
                        <div className="col-md-6">
                            <div className="row mx-3">
                                <div className="col-8 ml-4">
                                    <TextField label="Selecione o Consultor..." select
                                               fullWidth required size="small" defaultValue=""
                                               onChange={e => setData('consultor', e.target.value)}>
                                        {consultores.map((option) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                <div className="col-4 p-0">
                                    <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                                            data-bs-target="#modalEnviar">
                                        ENVIAR
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
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

            {/*MODAL ENVIAR*/}
            <div className="modal fade" id="modalEnviar" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Enviar Leads</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {nomeConsultorSelecionado()}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                    onClick={() => submit()}>
                                Enviar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
