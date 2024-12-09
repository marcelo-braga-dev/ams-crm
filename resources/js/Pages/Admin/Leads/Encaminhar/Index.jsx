import React, {useEffect, useState, useRef, useCallback} from 'react';
import {TextField, MenuItem, FormControl, FormControlLabel, Switch, Stack, Avatar, CircularProgress, Select, Box, Button, Typography, DialogActions} from '@mui/material';
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
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Chip from "@mui/material/Chip";
import CampoTexto from "@/Components/CampoTexto.jsx";

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
                page: paginate, filtros: {
                    ...filtros, ordenar: filtroOrdenar, ordenar_by: filtroOrdenarBy, page_qtd: filtroQtdPagina,
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
    }, [paginate]);

    const adicionarLeadsCheck = (check) => {
        setCheckedPage(check);
        const newChecked = [...leadsChecked];

        for (let i = 0; i < filtroQtdPagina; i++) {
            if (i < leads.length) {
                const valueID = leads[i]?.id;
                const status = leads[i]?.infos?.status;

                if (status !== 'ativo') {
                    if (check) newChecked.push(valueID); else {
                        const currentIndex = leadsChecked.indexOf(valueID);
                        newChecked.splice(currentIndex);
                    }
                }
            }
        }

        const arraySemDuplicados = Array.from(new Set(newChecked));
        setLeadsChecked(arraySemDuplicados);
    };

    const nomeConsultorSelecionado = () => {
        if (consultorSelecionado === '0') {
            return <Typography>Remover o consultor(a) dos leads selecionados?</Typography>
        }

        const nome = usuarios.find(i => i.id === consultorSelecionado)?.nome;
        return nome ? (<>
            <b>TROCAR</b> o consultor(a) dos Leads Selecionados para:<br/>
            <h5>{nome}</h5>
        </>) : <div className="alert alert-danger text-white">Selecione o Consultor</div>;
    };

    const enviarLeads = () => {
        if (consultorSelecionado && leadsChecked.length > 0) {

            axios.post(route('auth.leads.api.encaminhar',
                {lead_ids: leadsChecked, consultor_id: consultorSelecionado}
            )).then(res => {
                // handle()

                handleCloseDialogEncaminhar()
                setLeadsChecked([])
            }).finally(() => getLeads());
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

    const [openDialogEncaminha, setOpenDialogEncaminha] = useState(false)
    const handleOpenDialogEncaminhar = () => {
        setOpenDialogEncaminha(true)
    }
    const handleCloseDialogEncaminhar = () => {
        setOpenDialogEncaminha(false)
    }

    return (<Layout empty titlePage="Encaminhar Leads" menu="leads" submenu="leads-cadastrados">
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
                        {isLeadsEncaminhar && (<div className="col-6">
                            <Stack direction="row" spacing={2}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel id="select-label">Enviar Leads para...</InputLabel>
                                    <Select
                                        labelId="select-label"
                                        value={consultorSelecionado}
                                        onChange={e => setConsultorSelecionado(e.target.value)}
                                        label="Enviar Leads para..."
                                    >
                                        <MenuItem value="0">Sem Consultor(a)</MenuItem>

                                        {usuarios.map((option) => (<MenuItem key={option.id} value={option.id}>
                                            <Box display="flex" alignItems="center">
                                                <Avatar src={option.foto} alt={option.nome} sx={{mr: 2, width: 25, height: 25}}/>
                                                {option.nome}
                                            </Box>
                                        </MenuItem>))}
                                    </Select>
                                </FormControl>

                                <Button onClick={handleOpenDialogEncaminhar}>Encaminhar</Button>
                            </Stack>
                        </div>)}
                        <div className="col-auto">
                            {carregando && <CircularProgress/>}
                        </div>
                        <div className="col-auto">
                            <Stack direction="row" spacing={4}>
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
            <Dialog
                open={openDialogEncaminha}
                onClose={handleCloseDialogEncaminhar}
                fullWidth
                maxWidth="md"
            >
                <DialogContent>
                    <Stack marginBottom={2}>
                        <CampoTexto titulo="Enviar Para" texto={usuarios.find(i => i.id === consultorSelecionado)?.nome}/>
                        <CampoTexto titulo="Quantidade" texto={leadsChecked.length}/>
                    </Stack>
                    <table className="table-1">
                        <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Consultor</th>
                        </tr>
                        </thead>
                        <tbody>
                        {leadsChecked.map(id => {
                            const lead = leads.find(lead => lead.id === id);
                            return (
                                <tr>
                                    <td>
                                        <Typography fontWeight="bold">{lead.cliente.nome}</Typography>
                                        <Typography>ID: #{lead.id}</Typography>
                                        <Typography>CNPJ: {lead.cliente.cnpj}</Typography>
                                        <Typography>Status: {lead.infos.status_nome.nome}</Typography>
                                        <Chip
                                            label={lead.infos.status_nome.nome}
                                            variant="outlined"
                                            sx={{borderColor: lead.infos.status_nome.cor, color: lead.infos.status_nome.cor, marginBottom: 3, marginTop: 2}}
                                            size="small"/>
                                    </td>
                                    <td>
                                        {lead.consultor.nome && <Stack direction="row" spacing={1}>
                                            <Avatar sx={{width: 25, height: 25}} src={lead.consultor.avatar}/>
                                            <Typography>{lead.consultor.nome ?? '-'}</Typography>
                                        </Stack>}
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </DialogContent>
                <DialogActions sx={{padding: 3}}>
                    <Button onClick={enviarLeads} color="success">Enviar</Button>
                </DialogActions>
            </Dialog>
        </Layout>
    );
};

export default Index;
