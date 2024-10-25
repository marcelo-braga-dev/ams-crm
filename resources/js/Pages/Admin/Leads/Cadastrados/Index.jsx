import React, { useEffect, useState, useMemo, useRef } from 'react';
import { TextField, MenuItem, FormControl, FormControlLabel, Switch, Autocomplete, Stack, Avatar, CircularProgress, Select, Box } from '@mui/material';
import { router } from '@inertiajs/react';

import Layout from '@/Layouts/Layout';
import Tabela from './Tabela';
import Modal from './Modals';
import CardContainer from '@/Components/Cards/CardContainer';
import CardBody from '@/Components/Cards/CardBody';
import { Trash } from 'react-bootstrap-icons';
import InputLabel from '@mui/material/InputLabel';

const FilterSection = ({
                           setFiltroValor,
                           setores,
                           datasImportacao,
                           setorSelecionado,
                           setSetorSelecionado,
                           setImportacao,
                           setStatus,
                           setFiltro,
                           carregando,
                           setComSdr,
                           setComConsultor,
                           setFiltroLeads,
                           setFiltroClassificacao,
                           setFiltroEnriquecidos,
                           statusleads
                       }) => (<>
        <div className="row justify-content-between">
            <div className="col-md-2">
                <TextField label="Setor" select fullWidth size="small" value={setorSelecionado ?? ''} className="mb-3"
                           onChange={e => setSetorSelecionado(e.target.value)}>
                    {setores.map((option) => <MenuItem key={option.id} value={option.id}>{option.nome}</MenuItem>)}
                </TextField>
            </div>
            <div className="col-md-2">
                <TextField select label="Importação" fullWidth size="small" onChange={e => setImportacao(e.target.value)}>
                    <MenuItem value="">Todas as datas</MenuItem>
                    {datasImportacao.map(item => <MenuItem key={item.id} value={item.id}>#{item.id} {item.data}</MenuItem>)}
                </TextField>
            </div>
            <div className="col-md-2">
                <TextField fullWidth select label="Status" defaultValue="" size="small"
                           onChange={event => setStatus(event.target.value)}>
                    <MenuItem value="">Todos</MenuItem>
                    {statusleads.map(item => <MenuItem value={item.id}>{item.nome} | {item.id}</MenuItem>)}
                </TextField>
            </div>
            <div className="col-md-2">
                <TextField fullWidth select label="Leads" defaultValue="" size="small"
                           onChange={event => setFiltroLeads(event.target.value)}>
                    <MenuItem value="">Todos</MenuItem>
                    <MenuItem value="novos">Novos</MenuItem>
                    <MenuItem value="atendidos">Já Atendidos</MenuItem>
                    <MenuItem value="ativados">Ativados</MenuItem>
                </TextField>
            </div>
            <div className="col-md-3">
                <Stack direction="row">
                    <TextField label="Filtro" select defaultValue="id" size="small" fullWidth sx={{ width: '10rem' }}
                               onChange={event => setFiltro(event.target.value)}>
                        <MenuItem value="id">ID</MenuItem>
                        <MenuItem value="nome">Nome/Razão Social</MenuItem>
                        <MenuItem value="cnpj">CNPJ</MenuItem>
                        <MenuItem value="cidade">Cidade</MenuItem>
                        <MenuItem value="ddd">DDD</MenuItem>
                        <MenuItem value="telefone">Telefone</MenuItem>
                    </TextField>
                    <TextField placeholder="Pesquisar..." fullWidth
                               onChange={e => setFiltroValor(e.target.value)} size="small" />
                </Stack>
            </div>
            <div className="col-auto">
                <TextField select size="small" style={{ width: 60 }} onChange={event => setFiltroClassificacao(event.target.value)}>
                    <MenuItem value="" style={{ height: 30 }}></MenuItem>
                    <MenuItem value="😁">😁</MenuItem>
                    <MenuItem value="🙂">🙂</MenuItem>
                    <MenuItem value="😐">😐</MenuItem>
                    <MenuItem value="☹️">☹️</MenuItem>
                    <MenuItem value="❌">❌</MenuItem>
                </TextField>
            </div>
        </div>
        <div className="row justify-content-between">
            <div className="col-auto">
                <Stack direction="row" spacing={4}>
                    <FormControlLabel label={<small>Apenas SEM SDR</small>}
                                      control={<Switch size="small" disabled={carregando}
                                                       onChange={e => setComSdr(e.target.checked)} />} />
                    <FormControlLabel label={<small>Apenas SEM Consultor(a)</small>}
                                      control={<Switch size="small" disabled={carregando}
                                                       onChange={e => setComConsultor(e.target.checked)} />} />
                    <FormControlLabel label={<small>Enriquecidos</small>}
                                      control={<Switch size="small" disabled={carregando}
                                                       onChange={e => setFiltroEnriquecidos(e.target.checked)} />} />
                </Stack>
            </div>
        </div>
    </>
);


const Index = ({ categorias, statusleads, datasImportacao, isLeadsEncaminhar, isLeadsExcluir }) => {
    const [leads, setLeads] = useState([]);
    const [carregando, setCarregando] = useState(true);

    const [checkedPage, setCheckedPage] = useState(false);
    const [leadsChecked, setLeadsChecked] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(100);

    const [consultorSelecionado, setConsultorSelecionado] = useState();
    const [usuarios, setUsuarios] = useState([]);
    const [enviarLead, setEnviarLead] = useState(false);
    const [filterText, setFilterText] = useState('');
    const [paginate, setPaginate] = useState(1);
    const [paginateDados, setPaginateDados] = useState([]);

    const [filtro, setFiltro] = useState('id');
    const [filtroValor, setFiltroValor] = useState();
    const [filtroSetor, setFiltroSetor] = useState(1);
    const [filtroImportacao, setFiltroImportacao] = useState(false);
    const [filtroStatus, setFiltroStatus] = useState();
    const [filtroSdr, setFiltroSdr] = useState(false);
    const [filtroConsultor, setFiltroConsultor] = useState(false);
    const [filtroLeads, setFiltroLeads] = useState(false);
    const [filtroClassificacao, setFiltroClassificacao] = useState(false);
    const [filtroOrdenar, setFiltroFiltroOrdenar] = useState('');
    const [filtroOrdenarBy, setFiltroFiltroOrdenarBy] = useState('');
    const [filtroQtdPagina, setFiltroQtdPagina] = useState(50);
    const [filtroEnriquecidos, setFiltroEnriquecidos] = useState(false);
    const isFirstRender = useRef(true);

    function getLeads() {
        setCarregando(true);
        axios.get(route('admin.clientes.leads.get-leads-cadastrados-paginate', {
            page: paginate,
            filtros: {
                setor: filtroSetor,
                importacao: filtroImportacao,
                status: filtroStatus,
                sdr: filtroSdr,
                consultor: filtroConsultor,
                filtro: filtro,
                filtro_valor: filtroValor,
                leads: filtroLeads,
                ordenar: filtroOrdenar,
                ordenar_by: filtroOrdenarBy,
                page_qtd: filtroQtdPagina,
                classificacao: filtroClassificacao,
                enriquecidos: filtroEnriquecidos,
            },
        })).then(res => {
            setLeads(res.data.leads.dados);
            setUsuarios(res.data.usuarios);
            setPaginateDados(res.data.leads.paginate);
        }).finally(() => {
            setCarregando(false);
            setLeadsChecked([]);
            setCheckedPage(false);
        });
    }

    useEffect(() => {
        setPaginate(1);
        getLeads();
    }, [filtroSetor, filtroImportacao, filtroStatus, filtroSdr, filtroConsultor, enviarLead, filtroValor,
        filtroLeads, filtroOrdenar, filtroOrdenarBy, filtroQtdPagina, filtroClassificacao, filtroEnriquecidos]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
        } else {
            getLeads();
        }
    }, [paginate]);


    const adicionarLeadsCheck = (check) => {
        setCheckedPage(check);
        const newChecked = [...leadsChecked];

        for (let i = 0; i < rowsPerPage; i++) {
            const valueID = leads[i]?.id;
            if (check) newChecked.push(valueID);
            else {
                const currentIndex = leadsChecked.indexOf(valueID);
                newChecked.splice(currentIndex);
            }
        }

        const arraySemDuplicados = Array.from(new Set(newChecked));
        setLeadsChecked(arraySemDuplicados);
    };

    const nomeConsultorSelecionado = () => {
        const nome = usuarios.find(i => i.id === consultorSelecionado)?.nome;
        return nome ? (
            <>
                <b>TROCAR</b> o consultor(a) dos Leads Selecionados para:<br />
                <h5>{nome}</h5>
            </>
        ) : <div className="alert alert-danger text-white">Selecione o Consultor</div>;
    };

    const enviarLeads = () => {
        if (consultorSelecionado && leadsChecked.length > 0) {
            setCarregando(true);
            setEnviarLead(e => !e);

            router.post(route('auth.leads.api.encaminhar', { lead_ids: leadsChecked, consultor_id: consultorSelecionado }));
        }
    };

    const removerSdr = () => {
        setEnviarLead(e => !e);
        router.post(route('admin.clientes.leads.remover-sdr', { lead: leadsChecked }));
    };

    const removerConsultor = () => {
        setEnviarLead(e => !e);
        router.post(route('admin.clientes.leads.remover-consultor', { lead: leadsChecked }));
    };

    const excluirLeads = () => {
        setEnviarLead(e => !e);
        router.post(route('admin.clientes.leads.delete', { lead: leadsChecked }));
    };

    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <Layout empty titlePage="Leads Cadastrados" menu="leads" submenu="leads-cadastrados">
            <CardContainer>
                <CardBody>
                    <FilterSection
                        setFiltroValor={setFiltroValor}
                        setores={categorias}
                        statusleads={statusleads}
                        datasImportacao={datasImportacao}
                        setorSelecionado={filtroSetor}
                        setSetorSelecionado={setFiltroSetor}
                        importacao={filtroImportacao}
                        setImportacao={setFiltroImportacao}
                        setStatus={setFiltroStatus}
                        filtro={filtro}
                        setFiltro={setFiltro}
                        filterText={filterText}
                        setFilterText={setFilterText}
                        carregando={carregando}
                        setComSdr={setFiltroSdr}
                        setComConsultor={setFiltroConsultor}
                        setFiltroLeads={setFiltroLeads}
                        setFiltroClassificacao={setFiltroClassificacao}
                        setFiltroEnriquecidos={setFiltroEnriquecidos}
                    />
                </CardBody>
            </CardContainer>

            <CardContainer>
                <CardBody>
                    <div className="row justify-content-between">
                        {isLeadsEncaminhar && (
                            <div className="col-6">
                                <Stack direction="row" spacing={2}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel id="select-label">Enviar Leads para...</InputLabel>
                                        <Select
                                            labelId="select-label"
                                            value={consultorSelecionado}
                                            onChange={e => setConsultorSelecionado(e.target.value)}
                                            label="Enviar Leads para..."
                                        >
                                            {usuarios.map((option) => (
                                                <MenuItem key={option.id} value={option.id}>
                                                    <Box display="flex" alignItems="center">
                                                        <Avatar src={option.foto} alt={option.nome} sx={{ mr: 2, width: 25, height: 25 }} />
                                                        {option.nome}
                                                    </Box>
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalEnviar">ENVIAR</button>
                                </Stack>
                            </div>
                        )}
                        <div className="col-auto">
                            {carregando && <CircularProgress />}
                        </div>
                        <div className="col-auto">
                            <Stack direction="row" spacing={4}>
                                <button className="btn btn-link btn-sm p-0 text-end text-dark" data-bs-toggle="modal" data-bs-target="#modalRemoverSdr">Remover SDR
                                </button>
                                <button className="btn btn-link btn-sm p-0 text-end text-dark" data-bs-toggle="modal" data-bs-target="#modalRemoverConsultor">Remover
                                    Consultor(a)
                                </button>
                                <Trash className="mt-1 cursor-pointer" color="red" size={18} data-bs-toggle="modal" data-bs-target="#modalExcluirLeads" />
                            </Stack>
                        </div>
                    </div>
                </CardBody>
            </CardContainer>

            <Tabela leads={leads} setPaginate={setPaginate} paginate={paginate} paginateDados={paginateDados} setOrdenar={setFiltroFiltroOrdenar}
                    setFiltroFiltroOrdenarBy={setFiltroFiltroOrdenarBy} setFiltroQtdPagina={setFiltroQtdPagina} filtroQtdPagina={filtroQtdPagina}
                    leadsChecked={leadsChecked} setLeadsChecked={setLeadsChecked} checkedPage={checkedPage} adicionarLeadsCheck={adicionarLeadsCheck} />

            <Modal id="modalEnviar" title="ALTERAR CONSULTOR" body={<>{leadsChecked.length} selecionados.<br />{nomeConsultorSelecionado()}</>}
                   confirmText="Alterar Consultor(a)" confirmAction={enviarLeads} />
            <Modal id="modalRemoverSdr" title="Remover SDR dos Leads" body="Deseja realmente remover SDR dos LEADS selecionados?" confirmText="Remover SDR"
                   confirmAction={removerSdr} />
            <Modal id="modalRemoverConsultor" title="Remover Consultor(a) dos Leads" body="Deseja realmente remover os Consultor(a) dos LEADS selecionados?"
                   confirmText="Remover Consultor(a)" confirmAction={removerConsultor} />
            <Modal id="modalExcluirLeads" title="Excluir Leads Selecionados" body="Deseja realmente EXCLUIR PERMANENTEMENTE os LEADS selecionados?" confirmText="Excluir"
                   confirmAction={excluirLeads} />
        </Layout>
    );
};

export default Index;
