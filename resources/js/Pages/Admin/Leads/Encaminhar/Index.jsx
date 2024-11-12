import React, {useEffect, useState, useRef, useCallback} from 'react';
import {TextField, MenuItem, FormControl, FormControlLabel, Switch, Stack, Avatar, CircularProgress, Select, Box, Button} from '@mui/material';
import {router} from '@inertiajs/react';

import Layout from '@/Layouts/Layout';
import Tabela from './Tabela';
import Modal from './Modals';
import CardContainer from '@/Components/Cards/CardContainer';
import CardBody from '@/Components/Cards/CardBody';
import {Trash} from 'react-bootstrap-icons';
import InputLabel from '@mui/material/InputLabel';
import FiltrosLead from "@/Pages/Admin/Leads/Encaminhar/FiltrosLead.jsx";
import {useAtualizarDados} from "@/Hooks/useAtualizarDados.jsx";

const Index = ({categorias, statusleads, datasImportacao, isLeadsEncaminhar, isLeadsExcluir}) => {
    const {atualizarDados, handle} = useAtualizarDados();

    const [leads, setLeads] = useState([]);
    const [carregando, setCarregando] = useState(true);

    const [checkedPage, setCheckedPage] = useState(false);
    const [leadsChecked, setLeadsChecked] = useState([]);

    const [consultorSelecionado, setConsultorSelecionado] = useState();
    const [usuarios, setUsuarios] = useState([]);
    const [enviarLead, setEnviarLead] = useState(false);
    const [paginate, setPaginate] = useState(1);
    const [paginateDados, setPaginateDados] = useState([]);

    const [filtros, setFiltros] = useState({
        filtro: 'id',
        filtro_valor: '',
        valor: '',
        setor: '',
        importacao: '',
        status: '',
        sdr: '',
        consultor: '',
        leads: '',
        classificacao: '',
        ordear: '',
        ordearBy: '',
        qtdPagina: '',
        enriquecidos: '',
        contato: '',
    });

    const [filtroOrdenar, setFiltroFiltroOrdenar] = useState('');
    const [filtroOrdenarBy, setFiltroFiltroOrdenarBy] = useState('');
    const [filtroQtdPagina, setFiltroQtdPagina] = useState(50);
    const isFirstRender = useRef(true);

    const getLeads = async () => {
        setCarregando(true);
        try {
            const response = await axios.get(route('admin.clientes.leads.get-leads-cadastrados-paginate', {
                page: paginate,
                filtros: {
                    ...filtros,
                    ordenar: filtroOrdenar,
                    ordenar_by: filtroOrdenarBy,
                    page_qtd: filtroQtdPagina,
                },
            }));

            setLeads(response.data.leads.dados);
            setUsuarios(response.data.usuarios);
            setPaginateDados(response.data.leads.paginate);
        } finally {
            setCarregando(false);
            setLeadsChecked([]);
            setCheckedPage(false);
        }
    };

    useEffect(() => {
        setPaginate(1);
        getLeads();
    }, [filtros, enviarLead]);

    useEffect(() => {
        if (!isFirstRender.current) {
            getLeads();
        }
        isFirstRender.current = false;
    }, [paginate, atualizarDados]);

    const adicionarLeadsCheck = (check) => {
        setCheckedPage(check);
        const newChecked = [...leadsChecked];

        for (let i = 0; i < filtroQtdPagina; i++) {
            const valueID = leads[i]?.id;
            const status = leads[i]?.infos?.status;

            if (status !== 'ativo') {
                if (check) newChecked.push(valueID);
                else {
                    const currentIndex = leadsChecked.indexOf(valueID);
                    newChecked.splice(currentIndex);
                }
            }
        }

        const arraySemDuplicados = Array.from(new Set(newChecked));
        setLeadsChecked(arraySemDuplicados);
    };

    const nomeConsultorSelecionado = () => {
        const nome = usuarios.find(i => i.id === consultorSelecionado)?.nome;
        return nome ? (
            <>
                <b>TROCAR</b> o consultor(a) dos Leads Selecionados para:<br/>
                <h5>{nome}</h5>
            </>
        ) : <div className="alert alert-danger text-white">Selecione o Consultor</div>;
    };

    const enviarLeads = () => {
        if (consultorSelecionado && leadsChecked.length > 0) {
            try {
                axios.post(route('auth.leads.api.encaminhar', {lead_ids: leadsChecked, consultor_id: consultorSelecionado}));
            } finally {
                handle()
            }
        }
    };

    const removerSdr = () => {
        router.post(route('admin.clientes.leads.remover-sdr', {lead: leadsChecked}));
    };

    const removerConsultor = () => {
        router.post(route('admin.clientes.leads.remover-consultor', {lead: leadsChecked}));
    };

    const excluirLeads = () => {
        router.post(route('admin.clientes.leads.delete', {lead: leadsChecked}));
    };

    router.on('success', () => setEnviarLead(e => !e))

    return (
        <Layout empty titlePage="Encaminhar Leads" menu="leads" submenu="leads-cadastrados">
            <FiltrosLead
                filtros={filtros}
                setFiltros={setFiltros}
                setores={categorias}
                statusleads={statusleads}
                datasImportacao={datasImportacao}
                carregando={carregando}
            />

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
                                                        <Avatar src={option.foto} alt={option.nome} sx={{mr: 2, width: 25, height: 25}}/>
                                                        {option.nome}
                                                    </Box>
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <Button data-bs-toggle="modal" data-bs-target="#modalEnviar">ENVIAR</Button>
                                </Stack>
                            </div>
                        )}
                        <div className="col-auto">
                            {carregando && <CircularProgress/>}
                        </div>
                        <div className="col-auto">
                            <Stack direction="row" spacing={4}>
                                <button className="btn btn-link btn-sm p-0 text-end text-dark" data-bs-toggle="modal" data-bs-target="#modalRemoverSdr">Remover SDR
                                </button>
                                <button className="btn btn-link btn-sm p-0 text-end text-dark" data-bs-toggle="modal" data-bs-target="#modalRemoverConsultor">Remover
                                    Consultor(a)
                                </button>
                                <Trash className="mt-1 cursor-pointer" color="red" size={18} data-bs-toggle="modal" data-bs-target="#modalExcluirLeads"/>
                            </Stack>
                        </div>
                    </div>
                </CardBody>
            </CardContainer>

            <Tabela
                leads={leads}
                carregando={carregando}
                setPaginate={setPaginate}
                paginate={paginate}
                paginateDados={paginateDados}
                setOrdenar={setFiltroFiltroOrdenar}
                setFiltroFiltroOrdenarBy={setFiltroFiltroOrdenarBy}
                setFiltroQtdPagina={setFiltroQtdPagina}
                filtroQtdPagina={filtroQtdPagina}
                leadsChecked={leadsChecked}
                setLeadsChecked={setLeadsChecked}
                checkedPage={checkedPage}
                adicionarLeadsCheck={adicionarLeadsCheck}
            />

            <Modal id="modalEnviar" title="ALTERAR CONSULTOR" body={<>{leadsChecked.length} selecionados.<br/>{nomeConsultorSelecionado()}</>}
                   confirmText="Alterar Consultor(a)" confirmAction={enviarLeads}/>
            <Modal id="modalRemoverSdr" title="Remover SDR dos Leads" body="Deseja realmente remover SDR dos LEADS selecionados?" confirmText="Remover SDR"
                   confirmAction={removerSdr}/>
            <Modal id="modalRemoverConsultor" title="Remover Consultor(a) dos Leads" body="Deseja realmente remover os Consultor(a) dos LEADS selecionados?"
                   confirmText="Remover Consultor(a)" confirmAction={removerConsultor}/>
            <Modal id="modalExcluirLeads" title="Excluir Leads Selecionados" body="Deseja realmente EXCLUIR PERMANENTEMENTE os LEADS selecionados?" confirmText="Excluir"
                   confirmAction={excluirLeads}/>
        </Layout>
    );
};

export default Index;
