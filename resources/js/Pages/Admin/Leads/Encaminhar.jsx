import React, {useState} from 'react';
import DataTable from 'react-data-table-component';
import {Backdrop, CircularProgress, TextField} from "@mui/material";
import Layout from '@/Layouts/AdminLayout/LayoutAdmin';
import MenuItem from "@mui/material/MenuItem";
import {useForm} from "@inertiajs/react";

import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
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
            <MenuItem value="cnpj">
                CNPJ
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
        selector: row => <>
            #{row.id}<br/>
            {row.data_criacao}
        </>,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
        grow: 0,
    },
    {
        name: 'Cliente',
        selector: row => <div className="py-3 text-wrap">
            <b>{row.name}</b>,<br/>
            {row.razao_social}<br/>
            {row.cnpj && <span className="d-block">{row.cnpj}</span>}
            { row.telefone}
        </div>,
        sortable: true,
        grow: 3,
    },
    {
        cell: row => <a className="btn btn-primary btn-sm" href={route('admin.clientes.leads.leads-main.show', row.id)}>
            Abrir
        </a>,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
        grow: 0,
    },
];

export default function Filtering({dados, consultores, categorias, categoriaAtual}) {
    // loading
    const [open, setOpen] = useState(false);

    // Form
    const {data, post, setData} = useForm({
        'leads': []
    });

    function submit() {
        if (data.consultor && data.leads) {
            setOpen(!open);
            post(route('admin.clientes.leads.update-consultor'))
            window.location.reload();
        }
    }

    // form - fim

    // Dados
    const linhas = dados.map(function (items) {
        return {
            id: items.id,
            name: items.cliente.nome,
            razao_social: items.cliente.razao_social,
            cnpj: items.cliente.cnpj,
            data_criacao: items.infos.data_criacao,
            telefone: items.contato.telefone,
            cidade: items.cliente.cidade,
        }
    });
    // Dados - fim

    const [filterText, setFilterText] = React.useState('');

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

            || filtro === 'cnpj' &&
            item.cnpj && item.cnpj.toLowerCase().includes(filterText.toLowerCase())

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

    // Form Excluir
    function excluir() {
        post(route('admin.clientes.leads.delete'))
        window.location.reload();
    }

    // Form Excluir - fim

    // Form Ocultar
    function ocultar() {
        post(route('admin.clientes.leads.ocultar'))
        window.location.reload();
    }

    // Form Ocultar - fim

    function nomeConsultorSelecionado() {
        const nome = consultores[consultores.findIndex(i => i.id === data.consultor)]?.name;
        return nome ? <>
            Enviar <b>{data.leads.length}</b> Leads Selecionados para:<br/>
            <h5>{nome}</h5>
        </> : <div className="alert alert-danger text-white">Selecione o Consultor</div>
    }

    return (
        <Layout container titlePage="Enviar Leads para Consultores" menu="leads" submenu="encaminhar">
            <h6>Setores</h6>
            <div className="btn-group mb-4" role="group" aria-label="Basic outlined example">
                {categorias.map((categoria, index) => {
                    return (
                        <a type="button" key={index}
                           href={route('admin.clientes.leads.leads-main.index', {categoria: categoria.id})}
                           className={(categoria.id == categoriaAtual ? 'active' : '') + " btn btn-outline-dark"}>
                            {categoria.nome}
                        </a>
                    )
                })}
            </div>

                <form onSubmit={submit}>
                    <div className="row justify-content-between mb-4">
                        <div className="col-md-6">
                            <div className="row mx-3">
                                <div className="col-8 ml-4">
                                    <TextField label="Selecione o Consultor..." select
                                               fullWidth required size="small" defaultValue=""
                                               onChange={e => setData('consultor', e.target.value)}>
                                        {consultores.map((option) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                #{option.id} - {option.name}
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
                        <div className="col-md-auto ">
                            <button type="button" className="btn btn-link" data-bs-toggle="modal"
                                    data-bs-target="#modalEsconder">
                                <VisibilityOffIcon/>
                                OCULTAR
                            </button>
                            <button type="button" className="btn btn-link text-danger" data-bs-toggle="modal"
                                    data-bs-target="#modalExcluir">
                                <DeleteIcon/>
                                EXCLUIR
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
            <div className="modal fade mt-5" id="modalEnviar" tabIndex="-1" aria-labelledby="exampleModalLabel"
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
                            {!data.leads.length &&
                                <div className="alert alert-danger text-white">Selecione os Leads</div>}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-secondary me-4"
                                    data-bs-dismiss="modal">Fechar
                            </button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                    onClick={() => submit()} disabled={!data.leads.length || !data.consultor}>
                                Enviar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/*MODAL EXCLUIR*/}
            <div className="modal fade mt-5" id="modalExcluir" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Excluir Leads</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {data.leads.length ?
                                <>EXCLUIR LEADS SELECIONADOS?</> :
                                <div className="alert alert-danger text-white">Selecione os leads para excluir.</div>
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                                    onClick={() => excluir()}>Excluir
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/*MODAL ESCONDER*/}
            <div className="modal fade mt-5" id="modalEsconder" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Ocultar</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {data.leads.length ?
                                <>Ocultar Leads Selecionados?</> :
                                <div className="alert alert-danger text-white">Selecione os leads para ocultar.</div>
                            }

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                    onClick={() => ocultar()}>
                                Ocultar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Backdrop
                    sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                    open={open}>
                    <CircularProgress color="inherit"/>
                </Backdrop>
            </div>
        </Layout>
    );
};
