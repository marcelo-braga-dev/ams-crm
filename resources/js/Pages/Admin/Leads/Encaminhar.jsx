import React, {useEffect, useState} from 'react';
import DataTable from 'react-data-table-component';
import {
    Backdrop,
    CircularProgress,
    ListItemButton,
    TextField
} from "@mui/material";
import Layout from '@/Layouts/Layout';
import MenuItem from "@mui/material/MenuItem";
import {router} from "@inertiajs/react";

import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Checkbox from "@mui/material/Checkbox";
import ListItem from "@mui/material/ListItem";
import InfoLead from "@/Pages/Admin/Leads/Componentes/InfoLead";
import Switch from "@mui/material/Switch";
import LinearProgress from "@mui/material/LinearProgress";

export default function Filtering({
                                      categorias,
                                      datasImportacao,
                                      idImportacao
                                  }) {
    const [dados, setDados] = useState([]);
    const [usuariosSdr, setUsuariosSdr] = useState([]);
    const [usuariosVendedor, setUsuariosVendedor] = useState([]);

    const [filterText, setFilterText] = React.useState('');
    const [filtro, setFiltro] = useState('nome');
    const [open, setOpen] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(100);
    const [pageAtual, setPageAtual] = useState(1);
    const [checkedPage, setCheckedPage] = useState(false);
    const [leadsChecked, setLeadsChecked] = useState([]);
    const [consultorSelecionado, setConsultorSelecionado] = useState();
    const [sdr, setSdr] = useState(true);
    const [usuarios, setUsuarios] = useState(usuariosSdr);
    const [setorSelecionado, setSetorSelecionado] = useState();
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        setCarregando(true)
        axios.get(route('admin.clientes.leads.registros-encaminhar', {setor: setorSelecionado}))
            .then(res => {
                setDados(res.data.registros)
                setUsuarios(res.data.usuarios_sdr)
                setUsuariosSdr(res.data.usuarios_sdr)
                setUsuariosVendedor(res.data.usuarios_vendedor)
                setCarregando(false)
            })
    }, [setorSelecionado]);

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

    const columns = [
        {
            name: 'Ordernar por nome',
            selector: row => row.name || row.razao_social,
            sortable: true,
            cell: row =>
                <div key={row.id} className="row w-100">
                    <div className="col p-0">
                        <ListItem
                            disablePadding
                            secondaryAction={
                                <a className="btn btn-primary btn-sm mt-2"
                                   href={route('admin.clientes.leads.leads-main.show', row.id)}>
                                    Abrir
                                </a>
                            }>
                            <ListItemButton role={undefined} onClick={() => handleToggle(row.id)} dense>
                                <div className="row w-100 py-1">
                                    <div className="col-auto">
                                        <Checkbox
                                            edge="start"
                                            checked={leadsChecked.indexOf(row.id) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                        />
                                    </div>
                                    <div className="col-6">
                                        <InfoLead dado={row}/>
                                    </div>
                                    <div className="col">
                                        <span className="d-block mb-2">Setor: {row.setor}</span>
                                        {(row.consultor || row.status) && <>
                                            {row.status === 'finalizado' && <span>Status: {row.status}<br/></span>}
                                            {row.status === 'finalizado' &&
                                                <small>Data: {row.status_data}<br/><br/></small>}
                                            {row.consultor &&
                                                <span>Último Vendedor(a):<br/>
                                                    {row.consultor}</span>
                                            }
                                        </>
                                        }
                                    </div>
                                </div>
                            </ListItemButton>
                        </ListItem>
                    </div>
                </div>
            ,
        },
    ];
    // form - fim

    // Dados
    const linhas = dados.map(function (items) {
        return {
            id: items.id,
            name: items.cliente.nome?.toUpperCase(),
            setor: items.infos.setor,
            consultor: items.consultor.nome?.toUpperCase(),
            razao_social: items.cliente.razao_social?.toUpperCase(),
            cnpj: items.cliente.cnpj,
            data_criacao: items.infos.data_criacao,
            telefone: items.contato.telefone,
            cidade: items.cliente.cidade,
            estado: items.cliente.estado,
            status: items.infos.status,
            status_data: items.infos.status_data,
        }
    });
    // Dados - fim

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

            || filtro === 'ddd' &&
            item.telefone && item.telefone.toLowerCase().includes('(' + filterText.toLowerCase() + ')')
            || filtro === 'ddd' && filterText === ''
    );

    function encaminharLead() {
        if (consultorSelecionado && leadsChecked) {
            setOpen(!open);
            router.post(route('admin.clientes.leads.update-consultor',
                {leadsSelecionados: leadsChecked, consultor: consultorSelecionado, is_sdr: sdr}))
        }
    }

    // Form Excluir
    function excluir() {
        if (leadsChecked) {
            setOpen(!open);
            router.post(route('admin.clientes.leads.delete',
                {leadsSelecionados: leadsChecked}))
        }
    }

    // Form Excluir - fim

    // Form Ocultar
    function ocultar() {
        if (leadsChecked) {
            setOpen(!open);
            router.post(route('admin.clientes.leads.ocultar',
                {leadsSelecionados: leadsChecked}))
        }
    }

    function selecionarImportacao(idImportacao) {
        setOpen(!open);
        router.get(route('admin.clientes.leads.leads-cadastrados',
            {importacao_id: idImportacao}))

    }

    router.on('success', (event) => {
        setLeadsChecked([])
        setConsultorSelecionado()
        setOpen(false)
        setCheckedPage(false)
    })

    // Form Ocultar - fim

    function nomeConsultorSelecionado() {
        const nome = usuarios[usuarios.findIndex(i => i.id === consultorSelecionado)]?.nome;

        return nome ? <>
            Enviar <b>{leadsChecked.length}</b> Leads Selecionados para:<br/>
            <h5>{nome}</h5>
        </> : <div className="alert alert-danger text-white">Selecione o Consultor</div>
    }

    return (
        <Layout container titlePage="Enviar Leads para Consultores" menu="leads" submenu="leads-encaminhar">
            {/*Setores*/}
            <div className="row border-bottom mb-4 pb-2">
                <div className="col-md-3 mb-2">
                    <TextField label="Setor" select fullWidth
                               onChange={e => setSetorSelecionado(e.target.value)}>
                        {categorias.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.nome}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
            </div>

            <div className="card card-body mb-4">
                <form onSubmit={encaminharLead}>
                    <div className="row justify-content-between mt-3">
                        <div className="col-md-8">
                            <div className="row">
                                <div className="col-auto text-center">
                                    <Switch defaultChecked={sdr} onChange={e => {
                                        setUsuarios(e.target.checked ? usuariosSdr : usuariosVendedor)
                                        setSdr(e.target.checked)
                                    }}/>
                                    <br/><small>SDR</small>
                                </div>
                                <div className="col-6 ml-4">
                                    <TextField label="Selecione o Usuário para enviar os leads..." select
                                               value={consultorSelecionado ?? ''}
                                               fullWidth required
                                               onChange={e => setConsultorSelecionado(e.target.value)}>
                                        {usuarios.map(item => <MenuItem key={item.id}
                                                                        value={item.id}>{item.nome}</MenuItem>)}
                                    </TextField>

                                </div>
                                <div className="col-auto p-0">
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
            </div>

            {carregando && <LinearProgress/>}

            {!carregando && <div className="card card-body mb-4">
                {/*FILTRO*/}
                <div className="row">
                    <div className="col ps-3">
                        <Checkbox checked={checkedPage || false} onChange={e => adicionarLeadsCheck(e.target.checked)}/>
                        {leadsChecked.length} selecionados
                    </div>
                    <div className="col-2 text-right">
                        <TextField select label="Importação" defaultValue={idImportacao} fullWidth size="small"
                                   onChange={e => selecionarImportacao(e.target.value)}>
                            <MenuItem>Todas as datas</MenuItem>
                            {datasImportacao.map(item => <MenuItem value={item.id}>#{item.id} {item.data}</MenuItem>)}
                        </TextField>
                    </div>
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

                <DataTable
                    columns={columns}
                    data={filteredItems}
                    pagination
                    paginationPerPage={rowsPerPage}
                    onChangeRowsPerPage={value => setRowsPerPage(value)}
                    onChangePage={value => {
                        setPageAtual(value)
                        setCheckedPage(false)
                    }}
                    paginationComponentOptions={{
                        rowsPerPageText: 'Itens por página',
                        rangeSeparatorText: 'de',
                    }}
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
                                {!leadsChecked.length &&
                                    <div className="alert alert-danger text-white">Selecione os Leads</div>}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-outline-secondary me-4"
                                        data-bs-dismiss="modal">Fechar
                                </button>
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                        onClick={() => encaminharLead()}
                                        disabled={!leadsChecked.length || !consultorSelecionado}>
                                    Enviar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}

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
                                <div className="alert alert-danger text-white">Selecione os leads para
                                    excluir.</div>
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar
                            </button>
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
                            {leadsChecked.length ?
                                <>Ocultar Leads Selecionados?</> :
                                <div className="alert alert-danger text-white">Selecione os leads para
                                    ocultar.</div>
                            }

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar
                            </button>
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
