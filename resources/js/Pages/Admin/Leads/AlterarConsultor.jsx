import React, {useEffect, useState} from 'react';
import DataTable from 'react-data-table-component';
import {Backdrop, CircularProgress, TextField} from "@mui/material";
import Layout from '@/Layouts/AdminLayout/LayoutAdmin';
import MenuItem from "@mui/material/MenuItem";
import {router} from "@inertiajs/react";
import Checkbox from "@mui/material/Checkbox";
import InfoLead from "@/Pages/Admin/Leads/Componentes/InfoLead";

import CleaningServicesOutlinedIcon from '@mui/icons-material/CleaningServicesOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

export default function Filtering({dados, consultores, categorias, categoriaAtual}) {
    const [leadsChecked, setLeadsChecked] = useState([]);
    const [consultorSelecionado, setConsultorSelecionado] = useState();
    const [open, setOpen] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(100);
    const [checkedPage, setCheckedPage] = useState(false);
    const [pageAtual, setPageAtual] = useState(1);

    const columns = [
        {
            name: 'Ordernar por nome',
            selector: row => row.name || row.razao_social,
            cell: row => <div className="row">
                <div className="col-auto">
                    <Checkbox
                        edge="start"
                        checked={leadsChecked.indexOf(row.id) !== -1}
                        tabIndex={-1}
                        disableRipple
                        onChange={() => handleToggle(row.id)}
                    />
                </div>
                <div className="col"><InfoLead dado={row}/></div>
            </div>,
            sortable: true,
            grow: 3,
        }, {
            name: 'Consultor',
            selector: row => <span className="text-wrap"><b>{row.consultor}</b></span>,
            sortable: true,
            grow: 2,
        }, {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
            grow: 1,
        }, {
            cell: row => <a className="btn btn-primary btn-sm"
                            href={route('admin.clientes.leads.leads-main.show', row.id)}>
                Abrir
            </a>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            grow: 0,
        },
    ];

    function handleToggle(value) {
        const currentIndex = leadsChecked.indexOf(value);
        const newChecked = [...leadsChecked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setLeadsChecked(newChecked);
    }

    // form - fim

    // Dados
    const linhas = dados.map(function (items) {
        return {
            id: items.id,
            name: items.cliente.nome,
            cnpj: items.cliente.cnpj,
            status: items.infos.status,
            consultor: items.consultor.nome,
            razao_social: items.cliente.razao_social,
            data_criacao: items.infos.data_criacao,
            telefone: items.contato.telefone,
            cidade: items.cliente.cidade,
            estado: items.cliente.estado,
            classificacao: items.cliente.classificacao
        }
    });
    // Dados - fim

    const [filterText, setFilterText] = useState('');
    const [filtro, setFiltro] = useState('nome');
    const [status, setStatus] = useState();

    useEffect(() => {
        if (status) setFiltro('status')
    }, [status]);


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

            || filtro === 'cnpj' &&
            item.cnpj && item.cnpj.toLowerCase().includes(filterText.toLowerCase())

            || filtro === 'consultor' &&
            item.consultor && item.consultor.toLowerCase().includes(filterText.toLowerCase())

            || filtro === 'status' &&
            item.status && item.status.toLowerCase().includes(status)

            || filtro === 'ddd' &&
            item.telefone && item.telefone.toLowerCase().includes('(' + filterText.toLowerCase() + ')')
            || filtro === 'ddd' && filterText === ''
    );

    function nomeConsultorSelecionado() {
        const nome = consultores[consultores.findIndex(i => i.id === consultorSelecionado)]?.name;
        return nome ? <>
            <b>TROCAR</b> o consultor(a) dos Leads Selecionados para:<br/>
            <h5>{nome}</h5>
        </> : <div className="alert alert-danger text-white">Selecione o Consultor</div>
    }

    function submit() {
        if (consultorSelecionado && leadsChecked) {
            setOpen(!open);
            router.post(route('admin.clientes.leads.update-consultor',
                {leadsSelecionados: leadsChecked, consultor: consultorSelecionado}))
        }
    }

    function limpar() {
        if (leadsChecked) {
            setOpen(!open);
            router.post(route('admin.clientes.leads.limpar-consultor',
                {leadsSelecionados: leadsChecked}))
        }
    }

    function excluir() {
        if (leadsChecked) {
            setOpen(!open);
            router.post(route('admin.clientes.leads.delete',
                {leadsSelecionados: leadsChecked}))
        }
    }

    router.on('success', (event) => {
        setLeadsChecked([])
        setConsultorSelecionado()
        setOpen(false)
        setCheckedPage(false)
    })

    function adicionarLeadsCheck(check) {
        setCheckedPage(check)

        let indice = (pageAtual - 1) * rowsPerPage
        const newChecked = [...leadsChecked];

        for (let i = 0; i < rowsPerPage; i++) {
            const valueID = filteredItems?.[indice + i]?.id
            if (check) newChecked.push(valueID);
            else {
                const currentIndex = leadsChecked.indexOf(valueID);
                newChecked.splice(currentIndex)
            }
        }

        const arraySemDuplicados = Array.from(new Set(newChecked));
        setLeadsChecked(arraySemDuplicados);
    }

    return (
        <Layout container titlePage="Alterar Consultor" menu="leads" submenu="leads-alterar">
            {/*Setores*/}
            <div className="row border-bottom mb-4 pb-2">
                <div className="col-md-5 mb-3">
                    <TextField label="Setor" select fullWidth
                               value={categoriaAtual ?? ''}
                               onChange={e => router.get(route('admin.clientes.leads.alterar-consultor', {categoria: e.target.value}))}>
                        {categorias.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.nome}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
            </div>

            {/*FILTRO*/}
            <div className="row">
                <div className="col-5">
                    <form onSubmit={submit}>
                        <div className="row justify-content-between">
                            <div className="col-10">
                                <div className="row mb-0">
                                    <div className="col-8 ml-4 mb-0">
                                        <TextField label="Selecione o Consultor..." select
                                                   value={consultorSelecionado ?? ''}
                                                   fullWidth required
                                                   onChange={e => setConsultorSelecionado(e.target.value)}>
                                            {consultores.map((option) => (
                                                <MenuItem key={option.id} value={option.id}>
                                                    #{option.id} - {option.name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </div>
                                    <div className="col-2">
                                        <button type="button" className="btn btn-dark" data-bs-toggle="modal"
                                                data-bs-target="#modalEnviar">
                                            ENVIAR
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-7 text-end">
                    <TextField
                        sx={{minWidth: 100}}
                        select label="Status"
                        defaultValue="" size="small"
                        onChange={event => setStatus(event.target.value)}
                        className="me-4"
                    >
                        <MenuItem value="">
                            Todos
                        </MenuItem>
                        <MenuItem value="novo">
                            Em aberto
                        </MenuItem>
                        <MenuItem value="atendimento">
                            Atendimento
                        </MenuItem>
                        <MenuItem value="ativo">
                            Ativo
                        </MenuItem>
                        <MenuItem value="finalizado">
                            Finalizados
                        </MenuItem>
                    </TextField>

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
            <div className="row">
                <div className="col ps-3">
                    <Checkbox checked={checkedPage || false} onChange={e => adicionarLeadsCheck(e.target.checked)}/>
                    {leadsChecked.length} selecionados
                </div>
                <div className="col-auto">
                    <button type="button" className="btn btn-link text-dark btn-sm m-0 p-0"
                            data-bs-toggle="modal" data-bs-target="#modalLimpar">
                        <CleaningServicesOutlinedIcon sx={{fontSize: 15}}/> Remover Consultor(a) do lead
                    </button>
                </div>
                <div className="col">
                    <button type="button" className="btn btn-link text-danger btn-sm m-0 p-0"
                            data-bs-toggle="modal" data-bs-target="#modalExcluir">
                        <DeleteOutlinedIcon sx={{fontSize: 18}}/> Excluir lead
                    </button>
                </div>
            </div>

            <DataTable
                columns={columns}
                data={filteredItems}
                pagination
                paginationPerPage={rowsPerPage}
                onChangeRowsPerPage={value => setRowsPerPage(value)}
                striped
                highlightOnHover
                onChangePage={value => {
                    setPageAtual(value)
                    setCheckedPage(false)
                }}
                paginationComponentOptions={
                    {
                        rowsPerPageText: 'Itens por página',
                        rangeSeparatorText: 'de',
                        selectAllRowsItem: false,
                        selectAllRowsItemText: 'Todos',
                    }
                }
            />


            {/*MODAL ENVIAR*/}
            <div className="modal fade mt-5" id="modalEnviar" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">ALTERAR CONSULTOR</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <small>{leadsChecked.length} selecionados.</small><br/>
                            {nomeConsultorSelecionado()}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                    onClick={() => submit()}>
                                Alterar Consultor(a).
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/*MODAL LIMPAR*/}
            <div className="modal fade mt-5" id="modalLimpar" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">LIMPAR LEAD</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Remover os Consultores(a) destes LEADS?<br/>
                            <small>{leadsChecked.length} selecionados.</small>

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
                            {leadsChecked.length ?
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
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={open}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        </Layout>
    );
};
