import React, {useEffect, useState} from 'react';
import DataTable from 'react-data-table-component';
import {TextField} from "@mui/material";
import Layout from '@/Layouts/Supervisor/Layout';
import MenuItem from "@mui/material/MenuItem";
import {useForm} from "@inertiajs/react";
import Checkbox from "@mui/material/Checkbox";

const FilterComponent = ({filterText, onFilter, setFiltro}) => (
    <>
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
            <MenuItem value="consultor">
                Consultor
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
            onChange={onFilter}
            size="small"
        />
    </>
);

const columns = [
    {
        name: 'ID',
        selector: row => row.id,
        sortable: true,
        grow: 0,
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
        name: 'Cidade',
        selector: row => row.cidade,
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
    }
];

export default function Filtering({dados, consultores}) {
    // Form
    const {data, post, setData} = useForm({
        'leads': []
    });

    function submit() {
        if (data.consultor && data.leads) post(route('supervisor.clientes.leads.update-consultor'))
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
            cidade: items.cliente.cidade,
        }
    });
    // Dados - fim

    const [filterText, setFilterText] = useState('');

    const [filtro, setFiltro] = useState('nome');

    const filteredItems = linhas.filter(
        item => filtro === 'id' &&
            item.id && item.id.toString() === filterText
            || filtro === 'id' && filterText === ''

            || filtro === 'nome' &&
            item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
            || filtro === 'nome' &&
            item.razao_social && item.razao_social.toLowerCase().includes(filterText.toLowerCase())

            || filtro === 'telefone' &&
            item.telefone && item.telefone.toLowerCase().includes(filterText.toLowerCase())

            || filtro === 'cidade' &&
            item.cidade && item.cidade.toLowerCase().includes(filterText.toLowerCase())

            || filtro === 'consultor' &&
            item.consultor && item.consultor.toLowerCase().includes(filterText.toLowerCase())

            || filtro === 'ddd' &&
            item.telefone && item.telefone.toLowerCase().includes('(' + filterText.toLowerCase() + ')')
            || filtro === 'ddd' && filterText === ''
    );

    const subHeaderComponentMemo = React.useMemo(() => {
        return (
            <FilterComponent onFilter={e => setFilterText(e.target.value)}
                             filterText={filterText}
                             setFiltro={setFiltro}/>
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
        if (data.leads) post(route('supervisor.clientes.leads.limpar-consultor'))
        window.location.reload();
    }

    return (
        <Layout container titlePage="Alterar Consultor" menu="leads" submenu="alterar">
            <h4 className="mb-4">Alterar Consultor</h4>

            <form onSubmit={submit}>
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
                                <button type="button" className="btn btn-dark" data-bs-toggle="modal"
                                        data-bs-target="#modalEnviar">
                                    ENVIAR
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-auto">
                        <button type="button" className="btn btn-dark btn-sm"
                                data-bs-toggle="modal"
                                data-bs-target="#modalLimpar"
                        >
                            Limpar
                        </button>
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


            {/*MODAL ENVIAR*/}
            <div className="modal fade" id="modalEnviar" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">ALTERAR CONSULTOR</h5>
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
                                Alterar Consultor(a)
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/*MODAL LIMPAR*/}
            <div className="modal fade" id="modalLimpar" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">LIMPAR LEAD</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Remover os Consultores(a) destes LEADS?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                    onClick={() => limpar()}>
                                Limpar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
