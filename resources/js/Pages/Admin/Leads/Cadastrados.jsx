import React, {useEffect, useState} from 'react';
import DataTable from 'react-data-table-component';
import TextField from "@mui/material/TextField";
import Layout from '@/Layouts/AdminLayout/LayoutAdmin';
import MenuItem from "@mui/material/MenuItem";
import InfoLead from "@/Pages/Admin/Leads/Componentes/InfoLead";
import LinearProgress from '@mui/material/LinearProgress';
import Checkbox from "@mui/material/Checkbox";
import {router} from "@inertiajs/react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import {Stack} from "@mui/material";


export default function ({categorias, datasImportacao}) {

    const [leads, setLeads] = useState([])
    const [carregando, setCarregando] = useState(true)
    const [setorSelecionado, setSetorSelecionado] = useState()
    const [checkedPage, setCheckedPage] = useState(false);
    const [pageAtual, setPageAtual] = useState(1);
    const [leadsChecked, setLeadsChecked] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(100);
    const [status, setStatus] = useState();
    const [consultorSelecionado, setConsultorSelecionado] = useState();
    const [usuarios, setUsuarios] = useState([]);
    const [enviarLead, setEnviarLead] = useState(false);
    const [comSdr, setComSdr] = useState(false);
    const [comConsultor, setComConsultor] = useState(false);
    const [importacao, setImportacao] = useState();

    useEffect(() => {
        setCarregando(true)
        axios.get(route('admin.clientes.leads.get-leads-cadastrados',
            {setor: setorSelecionado, com_sdr: comSdr, com_consultor: comConsultor, importacao: importacao}))
            .then(res => {
                setLeads(res.data.leads)
                setUsuarios(res.data.usuarios)
                setCarregando(false)
                setLeadsChecked([])
            })
    }, [setorSelecionado, enviarLead, comSdr, comConsultor, importacao]);

    useEffect(() => {
        if (status) setFiltro('status')
    }, [status]);

    function getFilteredItems(linhas, filtro, filterText, status) {
        return linhas.filter(item => filtro === 'id' && item.id && item.id.toString() === filterText || filtro === 'id' && filterText === ''
            || filtro === 'nome' && item.name && item.name.toLowerCase().includes(filterText.toLowerCase()) || filtro === 'nome' && item.razao_social && item.razao_social.toLowerCase().includes(filterText.toLowerCase())
            || filtro === 'telefone' && item.telefone && item.telefone.replace(/[^0-9]/g, '').includes(filterText.replace(/[^0-9]/g, ''))
            || filtro === 'cidade' && item.cidade && item.cidade.toLowerCase().includes(filterText.toLowerCase())
            || filtro === 'cnpj' && item.cnpj && item.cnpj.replace(/[^0-9]/g, '').includes(filterText.replace(/[^0-9]/g, ''))
            || filtro === 'consultor' && item.consultor && item.consultor.toLowerCase().includes(filterText.toLowerCase())
            || filtro === 'status' && item.status && item.status === status
            || filtro === 'comSdr' && item.sdr && item.sdr.length > 0
            || filtro === 'ddd' && item.telefone && item.telefone.toLowerCase().includes('(' + filterText.toLowerCase() + ')')
            || filtro === 'ddd' && filterText === '');
    }

    const linhas = leads.map(function (items) {
        return {
            id: items.id,
            name: items.cliente.nome,
            sdr: items.sdr.nome,
            cnpj: items.cliente.cnpj,
            razao_social: items.cliente.razao_social,
            status: items.infos.status,
            status_nome: items.infos.status_nome,
            consultor: items.consultor.nome,
            data_criacao: items.infos.data_criacao,
            telefone: items.contato.telefone,
            cidade: items.cliente.cidade,
            estado: items.cliente.estado,
            pedido_emitido: items.infos.pedido_emitido,
        }
    });

    const [filterText, setFilterText] = useState('');
    const [filtro, setFiltro] = useState('nome');
    const filteredItems = getFilteredItems(linhas, filtro, filterText, status);

    const columns = [
        {
            name: <><Checkbox checked={checkedPage || false} onChange={e => adicionarLeadsCheck(e.target.checked)}/>
                {leadsChecked.length} selecionados</>,
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
            sortable: false,
            grow: 3,
        }, {
            // name: '',
            selector: row => <>
                <span className="d-block mb-3"><b>Status do Lead:</b> {row.status_nome}</span>
                <span className="d-block mb-3"><b>Consultor(a):</b> {row.consultor}</span>
                <span className="d-block mb-3"><b>SDR:</b> {row.sdr}</span>
            </>, sortable: true, grow: 2,
        }, {
            cell: row => <a className="btn btn-primary btn-sm m-0"
                            href={route('admin.clientes.leads.leads-main.show', row.id)}>
                Ver
            </a>, ignoreRowClick: true, allowOverflow: true, button: true, grow: 0,
        }
    ];

    function handleToggle(value) {
        const currentIndex = leadsChecked.indexOf(value);
        const newChecked = [...leadsChecked];

        if (currentIndex === -1) newChecked.push(value);
        else newChecked.splice(currentIndex, 1);

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

    function nomeConsultorSelecionado() {
        const nome = usuarios[usuarios.findIndex(i => i.id === consultorSelecionado)]?.name;
        return nome ? <>
            <b>TROCAR</b> o consultor(a) dos Leads Selecionados para:<br/>
            <h5>{nome}</h5>
        </> : <div className="alert alert-danger text-white">Selecione o Consultor</div>
    }

    function enviarLeads() {
        if (consultorSelecionado && leadsChecked.length > 0) {
            // setOpen(!open);
            setEnviarLead(e => !e)
            router.post(route('admin.clientes.leads.update-consultor',
                {leadsSelecionados: leadsChecked, consultor: consultorSelecionado}))
        }
    }

    return (
        <Layout container titlePage="Leads Cadastrados" menu="leads" submenu="leads-cadastrados">
            {/*Setores*/}
            <div className="row justify-content-between border-bottom mb-4 pb-2">
                <div className="col-md-3">
                    <TextField label="Setor" select fullWidth
                               value={setorSelecionado ?? ''}
                               onChange={e => setSetorSelecionado(e.target.value)}>
                        {categorias.map((option) =>
                            <MenuItem key={option.id} value={option.id}>
                                {option.nome}
                            </MenuItem>)
                        }
                    </TextField>
                </div>
                <div className="col-auto">
                    <TextField select label="Importação" fullWidth size="small" sx={{minWidth: 120}}
                               onChange={e => setImportacao(e.target.value)}>
                        <MenuItem>Todas as datas</MenuItem>
                        {datasImportacao.map(item => <MenuItem value={item.id}>#{item.id} {item.data}</MenuItem>)}
                    </TextField>
                </div>
                <div className="col-auto">
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
                            Iniciar Atendimento
                        </MenuItem>
                        <MenuItem value="pre_atendimento">
                            Pré-Atendimento
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
                </div>
                <div className="col-auto">
                    <TextField
                        label="Filtro" select defaultValue="nome" size="small"
                        onChange={event => setFiltro(event.target.value)}>
                        <MenuItem value="id">ID</MenuItem>
                        <MenuItem value="nome">Nome/Razão Social</MenuItem>
                        <MenuItem value="cnpj">CNPJ</MenuItem>
                        <MenuItem value="cidade">Cidade</MenuItem>
                        <MenuItem value="ddd">DDD</MenuItem>
                        <MenuItem value="telefone">Telefone</MenuItem>
                    </TextField>
                    <TextField
                        placeholder="Pesquisar..."
                        value={filterText}
                        onChange={e => setFilterText(e.target.value)}
                        size="small"
                    />
                </div>
            </div>

            <div className="row justify-content-between">
                <div className="col-4">
                    <div className="row">
                        <div className="col-9">
                            <TextField label="Selecione o Consultor para enviar..." select
                                       value={consultorSelecionado ?? ''}
                                       fullWidth required
                                       onChange={e => setConsultorSelecionado(e.target.value)}>
                                {usuarios.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        #{option.id} - {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <div className="col-2">
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                                    data-bs-target="#modalEnviar">
                                ENVIAR
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-auto">
                    <Stack direction="column" spacing="0">
                        <FormControlLabel label={<small>Apenas com SDR</small>}
                                          control={<Switch size="small"
                                                           onChange={e => setComSdr(e.target.checked)}/>}/>
                        <FormControlLabel label={<small>Apenas com Consultor(a)</small>}
                                          control={<Switch size="small"
                                                           onChange={e => setComConsultor(e.target.checked)}/>}/>
                    </Stack>
                </div>
                <div className="col-auto">
                    <Stack direction="column" spacing="0">
                        <button className="btn btn-link btn-sm p-0 text-end text-dark">Remover SDR</button>
                        <button className="btn btn-link btn-sm p-0 text-end text-dark">Remover Consultor(a)</button>
                    </Stack>
                </div>
            </div>

            {carregando && <LinearProgress/>}

            {!carregando && <DataTable
                columns={columns}
                data={filteredItems}
                pagination striped highlightOnHover
                paginationPerPage={rowsPerPage}
                onChangeRowsPerPage={value => setRowsPerPage(value)}
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
            />}

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
                                    onClick={() => enviarLeads()}>
                                Alterar Consultor(a).
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
