import React, {useState} from 'react';
import DataTable from 'react-data-table-component';
import {
    Backdrop,
    CircularProgress,
    ListItemButton, Stack,
    TextField, Typography
} from "@mui/material";
import Layout from '@/Layouts/Layout';
import MenuItem from "@mui/material/MenuItem";
import {router} from "@inertiajs/react";

import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from "@mui/material/Checkbox";
import ListItem from "@mui/material/ListItem";
import InfoLead from "@/Pages/Admin/Leads/Componentes/InfoLead";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import CardTable from "@/Components/Cards/CardTable";
import CampoTexto from "@/Components/CampoTexto.jsx";
import Switch from "@mui/material/Switch";
import Chip from "@mui/material/Chip";
import LeadShow from "@/Pages/Geral/Leads/Dialogs/LeadShow.jsx";
import {Eye} from "react-bootstrap-icons";

export default function Filtering({leads, dadosimportacao}) {
    // loading
    const [filterText, setFilterText] = React.useState('');
    const [filtro, setFiltro] = useState('nome');
    const [open, setOpen] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(100);
    const [pageAtual, setPageAtual] = useState(1);
    const [checkedPage, setCheckedPage] = useState(false);
    const [leadsChecked, setLeadsChecked] = useState([]);
    const [consultorSelecionado, setConsultorSelecionado] = useState();
    const [filtroEnriquecidos, setFiltroEnriquecidos] = useState(false);

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
                                <LeadShow leadId={row.id} iconButton={<Eye size={20} color="black"/>}/>
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
                                        <span>Status: {row.status}<br/><br/></span>
                                        {row.enriquecida > 0 &&
                                            <Chip label='Enriquecida'/>}
                                        {row.consultor &&
                                            <span>Último Vendedor(a):<br/>
                                                {row.consultor}</span>
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
    const linhas = leads.map(function (items) {
        return {
            id: items.id,
            name: items.cliente.nome?.toUpperCase(),
            consultor: items.consultor.nome?.toUpperCase(),
            razao_social: items.cliente.razao_social?.toUpperCase(),
            cnpj: items.cliente.cnpj,
            data_criacao: items.infos.data_criacao,
            telefone: items.contato.telefone,
            cidade: items.cliente.cidade,
            estado: items.cliente.estado,
            status: items.infos.status,
            enriquecida: items.enriquecida.qtd,
            telefones: items.contato.numeros,
        }
    });
    // Dados - fim
    console.log(filtroEnriquecidos)
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

    const filteredEnriquecidas = filteredItems.filter(
        item => filtroEnriquecidos ? (filtroEnriquecidos && item.enriquecida > 0) : true
    );


    // Form Excluir
    function excluir() {
        if (leadsChecked) {
            setOpen(!open);
            router.post(route('admin.clientes.leads.delete',
                {leadsSelecionados: leadsChecked}))
        }
    }

    function excluirImportacao() {
        if (leadsChecked) {
            setOpen(!open);
            router.post(route('admin.clientes.leads.importar-historico.destroy', dadosimportacao.id), {_method: 'DELETE'})

        }
    }

    // Form Excluir - fim

    router.on('success', (event) => {
        setLeadsChecked([])
        setConsultorSelecionado()
        setOpen(false)
        setCheckedPage(false)
    })

    const handleToggleEnriquecidos = () => setFiltroEnriquecidos(e => !e)

    // Form Ocultar - fim
    return (
        <Layout container titlePage="Histórico da Importação" menu="leads" submenu="leads-importar"
                voltar={route('admin.clientes.leads.importar-historico.index')}>

            <CardContainer>
                <CardBody>
                    <div className="row justify-content-between mb-4">
                        <div className="col">
                            <Stack spacing={2}>
                                <CampoTexto titulo="Data da Importação" texto={dadosimportacao.data}/>
                                <CampoTexto titulo="Responsável pela Importação" texto={dadosimportacao.nome}/>
                                <CampoTexto titulo="ID da Importação" texto={dadosimportacao.id}/>
                            </Stack>
                        </div>
                        <div className="col">
                            <Stack spacing={2}>

                                {/*<CampoTexto titulo="" texto={}/>*/}
                                <CampoTexto titulo="Setor" texto={dadosimportacao.setor}/>
                                <CampoTexto titulo="Qtd. Enriquecidos" texto={dadosimportacao.enriquecidas}/>
                                <CampoTexto titulo="Qtd. Novos" texto={dadosimportacao.qtd}/>
                            </Stack>
                        </div>
                        <div className="col-auto">
                            <button className="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#modalExcluirImportacao">
                                Excluir Importação
                            </button>
                        </div>
                    </div>
                    <Stack spacing={0} direction="row" alignItems="center">
                        <Switch checked={filtroEnriquecidos} onChange={handleToggleEnriquecidos}/>
                        <Typography>Enriquecidos</Typography>
                    </Stack>
                </CardBody>
            </CardContainer>

            <CardContainer>
                <CardTable>
                    {/*FILTRO*/}
                    <div className="row">
                        <div className="col ps-3">
                            <Checkbox checked={checkedPage || false}
                                      onChange={e => adicionarLeadsCheck(e.target.checked)}/>
                            {leadsChecked.length} selecionados
                            <button className="btn btn-link text-danger btn-sm mt-2" data-bs-toggle="modal"
                                    data-bs-target="#modalExcluir">
                                <DeleteIcon sx={{fontSize: 22}}/>
                            </button>
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
                        data={filteredEnriquecidas}
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
                </CardTable>
            </CardContainer>

            {/*MODAL EXCLUIR*/}
            <div className="modal fade mt-5" id="modalExcluirImportacao" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Excluir Importação</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Excluir TODOS os Leads dessa importação?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                                    onClick={() => excluirImportacao()}>Excluir
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
