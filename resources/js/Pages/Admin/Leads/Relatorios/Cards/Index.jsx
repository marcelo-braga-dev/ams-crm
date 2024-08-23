import Layout from '@/Layouts/Layout';

import React, {useEffect, useState} from 'react';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import pesquisaCards from "@/Helpers/pesquisaCards";

import NovoCards from './Cards/NovoCard';
import AtendimentoCards from './Cards/AtendimentoCard';
import FinalizadoCard from "./Cards/FinalizadoCard";
import AtivoCard from "./Cards/AtivoCard";
import AbertoCards from "./Cards/AbertoCards";
import PreAtendimentoCard from "./Cards/PreAtendimentoCard";

import {router, useForm} from "@inertiajs/react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import {Avatar, Box, Divider, Stack, Typography} from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import Switch from "@mui/material/Switch";
import {Trash} from "react-bootstrap-icons";

let idLeads = []
const styleCard = 'p-2 mx-1 text-white row justify-content-between rounded-top'

export default function Dashboard({usuario, consultores, sdrs, isLeadsLimpar, isLeadsEncaminhar}) {
    const {data, setData, post} = useForm();

    const [carregando, setCarregando] = useState(false)
    const [carregandoRegistros, setCarregandoRegistros] = useState(true)
    const [leads, setRegistros] = useState([])
    const [enviadoLead, setEnviadoLead] = useState(false)
    const [limparStatus, setLimparStatus] = useState('')

    const [alterarStatusConsultor, setAlterarStatusConsultor] = useState(true)
    const [alterarStatusSdr, setAlterarStatusSdr] = useState(true)

    const [toggleAlterarConsultor, setToggleAlterarConsultor] = useState(false)
    const [toggleAlterarSdr, setToggleAlteraSdr] = useState(false)
    const [toggleRemoverStatus, setToglleRemoverStatus] = useState(false)

    useEffect(() => {
        fetchLeads();
    }, [enviadoLead]);

    const fetchLeads = async () => {
        setCarregandoRegistros(true);
        try {
            const res = await axios.get(route('admin.leads.registros', {id: usuario.id}));
            setRegistros(res.data.registros);
        } finally {
            setCarregandoRegistros(false);
        }
    };

    function leadsSelecionados(idLead) {
        const index = idLeads.indexOf(idLead)
        if (index >= 0) idLeads.splice(index)
        else idLeads.push(idLead)
    }

    function alterarConsultor() {
        setCarregando(true)
        if (data?.novo_consultor === 'vazio') {
            router.post(route('admin.leads.limpar-consultor'), {
                ...data, idLeads: idLeads, alterarStatus: alterarStatusConsultor
            })
        } else {
            router.post(route('admin.clientes.leads.alterar-consultor'), {
                _method: 'put',
                ...data, idLeads: idLeads, alterarStatus: alterarStatusConsultor
            })
        }
    }

    function alterarSdr() {
        setCarregando(true)
        if (data?.novo_sdr === 'vazio') {
            router.post(route('admin.leads.limpar-sdr'), {
                ...data, idLeads: idLeads, alterarStatus: alterarStatusConsultor
            })
        } else {
            router.post(route('admin.clientes.leads.alterar-sdr'), {
                ...data, idLeads: idLeads, alterarStatus: alterarStatusConsultor, _method: 'PUT'
            })
        }
    }

    const excluirLeads = () => {
        setCarregando(true)
        router.post(route('admin.clientes.leads.delete', {lead: idLeads, return_back: true}));
    };

    router.on('success', () => setEnviadoLead(e => !e))

    function nomeConsultorSelecionado() {
        if (data?.novo_consultor === 'vazio') {
            return <Typography variant="body1">Deseja remover o consultor(a) destes LEADS?</Typography>
        }

        const nome = consultores[consultores.findIndex(i => i.id === data.novo_consultor)]?.nome;
        return nome ? <>
            <b>TROCAR</b> o consultor(a) do Lead para:<br/>
            <h5>{nome}</h5>
        </> : <div className="text-white alert alert-danger">Selecione o Consultor</div>
    }

    function nomeSdrSelecionado() {
        if (data?.novo_sdr === 'vazio') {
            return <Typography variant="body1">Deseja remover o SDR destes LEADS?</Typography>
        }

        const nome = sdrs[sdrs.findIndex(i => i.id === data.novo_sdr)]?.nome;
        return nome ? <>
            <b>TROCAR</b> o SDR do Lead para:<br/>
            <h5>{nome}</h5>
        </> : <div className="text-white alert alert-danger">Selecione o SDR</div>
    }

    function limpar() {
        setLimparStatus('')
        limparStatus && router.post(route('admin.leads.cards-leads.limpar-finalizados', {id: usuario.id, status: limparStatus}))
    }


    const handdleAltararConsultor = () => {
        setToggleAlterarConsultor(e => !e)
        setToggleAlteraSdr(e => false)
        setToglleRemoverStatus(e => false)
    }

    const handdleAltararSdr = () => {
        setToggleAlterarConsultor(e => false)
        setToggleAlteraSdr(e => !e)
        setToglleRemoverStatus(e => false)
    }

    const handdleRemoverStatus = () => {
        setToggleAlterarConsultor(e => false)
        setToggleAlteraSdr(e => false)
        setToglleRemoverStatus(e => !e)
    }

    return (
        <Layout empty titlePage="Lista de Leads" menu="leads" submenu="leads-cards" voltar={route('admin.leads.cards-leads.index')}>

            <div className="row">
                <div className="col-md-10">
                    {carregandoRegistros && <LinearProgress/>}
                    {!carregandoRegistros &&
                        <div className='row justify-content-center overflow-scroll' style={{height: '85vh'}}>
                            <div className='col-auto'>
                                <div>
                                    <table>
                                        <thead>
                                        <tr>
                                            <th className="sticky-top" id="th-1">
                                                <div className={styleCard} style={{backgroundColor: 'blue'}}>
                                                    <div className='col-auto'>Iniciar Atendimento</div>
                                                    <div className='col-auto'>Qdt: {leads.novo.length}</div>
                                                </div>
                                            </th>
                                            <th className="sticky-top" id="th-2">
                                                <div className={styleCard} style={{backgroundColor: 'orange'}}>
                                                    <div className='col-auto'>
                                                        Pré Atendimento
                                                    </div>
                                                    <div className='col-auto'><Typography variant="body1">Qdt: {leads.pre_atendimento.length}</Typography></div>
                                                </div>
                                            </th>
                                            <th className="sticky-top" id="th-3">
                                                <div className={styleCard} style={{backgroundColor: 'green'}}>
                                                    <div className='col-auto'>
                                                        Em Aberto
                                                    </div>
                                                    <div className='col-auto'>Qdt: {leads.aberto.length}</div>
                                                </div>
                                            </th>
                                            <th className="sticky-top" id="th-4">
                                                <div className={styleCard} style={{backgroundColor: 'yellowgreen'}}>
                                                    <div className='col-auto'>Em Atendimento</div>
                                                    <div className='col-auto'>Qdt: {leads.atendimento.length}</div>
                                                </div>
                                            </th>
                                            <th className="sticky-top" id="th-5">
                                                <div className={styleCard} style={{backgroundColor: 'brown'}}>
                                                    <div className='col-auto'>Ativo</div>
                                                    <div className='col-auto'>Qdt: {leads.ativo.length}</div>
                                                </div>
                                            </th>
                                            <th className="sticky-top" id="th-6">
                                                <div className={styleCard} style={{backgroundColor: 'black'}}>
                                                    <div className='col-auto'>Finalizados</div>
                                                    <div className='col-auto'>Qdt: {leads.finalizado.length}</div>
                                                </div>
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr className="align-top bg-white">
                                            <td id="td-1" style={{minWidth: 300}}>
                                                {leads.novo.map((dado) => {
                                                    return <NovoCards key={dado.id} dados={dado} leadsSelecionados={leadsSelecionados}/>
                                                })}
                                            </td>
                                            <td id="td-2" style={{minWidth: 300}}>
                                                {leads.pre_atendimento.map((dado) => {
                                                    return <PreAtendimentoCard key={dado.id} dados={dado} leadsSelecionados={leadsSelecionados}/>
                                                })}
                                            </td>
                                            <td id="td-3" style={{minWidth: 300}}>
                                                {leads.aberto.map((dado) => {
                                                    return <AbertoCards key={dado.id} dados={dado} leadsSelecionados={leadsSelecionados}/>
                                                })}
                                            </td>
                                            <td id="td-4" style={{minWidth: 300}}>
                                                {leads.atendimento.map((dado) => {
                                                    return <AtendimentoCards key={dado.id} dados={dado} leadsSelecionados={leadsSelecionados}/>
                                                })}
                                            </td>
                                            <td id="td-5" style={{minWidth: 300}}>
                                                {leads.ativo.map((dado) => {
                                                    return <AtivoCard key={dado.id} dados={dado} leadsSelecionados={leadsSelecionados}/>
                                                })}
                                            </td>
                                            <td id="td-6" style={{minWidth: 300}}>
                                                {leads.finalizado.map((dado) => {
                                                    return <FinalizadoCard key={dado.id} dados={dado} leadsSelecionados={leadsSelecionados}/>
                                                })}
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div className="col-md-2">
                    <Stack direction="row" spacing={3} marginBottom={2}>
                        <Trash cursor="pointer" size="15" color="red" data-bs-toggle="modal" data-bs-target="#modalExcluir"/>
                    </Stack>
                    <CardContainer>
                        <CardBody>
                            <FormControl variant="outlined" className="bg-white" size="small">
                                <InputLabel htmlFor="search">Pesquisar...</InputLabel>
                                <OutlinedInput id="search" label="Pesquisar..."
                                               endAdornment={<InputAdornment position="end"><SearchOutlinedIcon/></InputAdornment>}
                                               onChange={e => pesquisaCards(e.target.value)}/>
                            </FormControl>
                        </CardBody>
                    </CardContainer>
                    <CardContainer>
                        <CardBody>
                            <Stack spacing={1}>
                                <Typography className="d-block"><b>Nome:</b> {usuario.nome}</Typography>
                                <Typography className="d-block"><b>Funcão:</b> {usuario.funcao}</Typography>
                                <Typography className="d-block"><b>Setor:</b> {usuario.setor}</Typography>
                            </Stack>
                        </CardBody>
                    </CardContainer>

                    {isLeadsEncaminhar &&
                        <CardContainer>
                            <CardBody>
                                <Typography className="cursor-pointer" variant="body2"
                                            onClick={handdleAltararConsultor} marginBottom={2}>+ Alterar Consultor</Typography>
                                {toggleAlterarConsultor &&
                                    <div className="row g-2">
                                        <Typography variant="body1">Alterar CONSULTOR(A) dos Leads Selecionados:</Typography>

                                        <TextField label="Selecione o Consultor..." select
                                                   fullWidth required size="small" defaultValue=""
                                                   onChange={e => setData('novo_consultor', e.target.value)}>
                                            <MenuItem value="vazio" className="text-muted ps-3">Nenhum Consultor(a)</MenuItem>
                                            <Divider/>
                                            {consultores.map((option) => <MenuItem key={option.id} value={option.id}>
                                                <Box display="flex" alignItems="center">
                                                    <Avatar src={option.foto} alt={option.nome} sx={{mr: 1, width: 20, height: 20}}/>
                                                    {option.nome}
                                                </Box>
                                            </MenuItem>)}
                                        </TextField>

                                        <button type="button" className="btn btn-dark btn-sm px-3" data-bs-toggle="modal" data-bs-target="#alterarConsultor">
                                            ENVIAR
                                        </button>
                                        <div>
                                            <Switch checked={alterarStatusConsultor} size="small"
                                                    onChange={e => setAlterarStatusConsultor(e.target.checked)}/>
                                            <Typography variant="body2" display="inline">Alterar Status para "EM ABERTO" ao atualizar?</Typography>
                                        </div>
                                    </div>
                                }
                            </CardBody>
                        </CardContainer>
                    }
                    {isLeadsEncaminhar &&
                        <CardContainer>
                            <CardBody>
                                <Typography className="cursor-pointer" variant="body2"
                                            onClick={handdleAltararSdr} marginBottom={3}>+ Alterar SDR</Typography>
                                {toggleAlterarSdr && <div className="row g-2">
                                    <Typography variant="body1">Alterar SDR dos Leads selecionados:</Typography>

                                    <TextField label="Selecione o SDR..." select
                                               fullWidth required size="small" defaultValue=""
                                               onChange={e => setData('novo_sdr', e.target.value)}>
                                        <MenuItem value="vazio" className="text-muted ps-5">Nenhum SDR</MenuItem>
                                        <Divider/>
                                        {sdrs.map((option) => <MenuItem key={option.id} value={option.id}>
                                            <Box display="flex" alignItems="center">
                                                <Avatar src={option.foto} alt={option.nome} sx={{mr: 1, width: 20, height: 20}}/>
                                                <Typography variant="body1">{option.nome}</Typography>
                                            </Box>
                                        </MenuItem>)}
                                    </TextField>
                                    <button type="button" className="btn btn-dark btn-sm px-3" data-bs-toggle="modal" data-bs-target="#alterarSdr">
                                        ENVIAR
                                    </button>
                                    <div className="">
                                        <Switch checked={alterarStatusSdr} onChange={e => setAlterarStatusSdr(e.target.checked)} size="small"/>
                                        <Typography variant="body2" display="inline">Alterar Status para "INICIAR ATENDIMENTO" ao atualizar?</Typography>
                                    </div>
                                </div>}
                            </CardBody>
                        </CardContainer>
                    }
                    {isLeadsLimpar &&
                        <CardContainer>
                            <CardBody>
                                <Typography marginBottom={3} className="cursor-pointer" variant="body2"
                                            onClick={handdleRemoverStatus}>+ Alterar Status</Typography>
                                {toggleRemoverStatus && <div className="row">
                                    <Typography variant="body1" marginBottom={3}>Remover todos os Leads do status:</Typography>

                                    <TextField label="Status" select value={limparStatus ?? ''} className="mb-4"
                                               fullWidth required size="small" defaultValue=""
                                               onChange={e => setLimparStatus(e.target.value)}>
                                        <MenuItem value="pre_atendimento">Pré Atendiemnto</MenuItem>
                                        <MenuItem value="aberto">Em Aberto</MenuItem>
                                        <MenuItem value="atendimento">Atendimento</MenuItem>
                                        <MenuItem value="finalizado">Finalizado</MenuItem>
                                    </TextField>

                                    <button type="button" className="btn btn-success btn-sm"
                                            data-bs-toggle="modal" data-bs-target="#modalLimpar">
                                        Remover
                                    </button>

                                </div>}
                            </CardBody>
                        </CardContainer>
                    }
                </div>
            </div>

            {/*Alterar consultor*/}
            <div className="mt-5 modal fade" id="alterarConsultor" tabIndex="-1" aria-labelledby="limparLeadLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="limparLeadLabel">Alterar consultor</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {nomeConsultorSelecionado()}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                    onClick={() => alterarConsultor()}>Alterar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/*Alterar SDR*/}
            <div className="mt-5 modal fade" id="alterarSdr" tabIndex="-1" aria-labelledby="limparLeadLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="limparLeadLabel">Alterar SDR</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {nomeSdrSelecionado()}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                    onClick={() => alterarSdr()}>Alterar SDR
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/*MODAL LIMPAR*/}
            <div className="mt-5 modal fade" id="modalLimpar" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Remover LEADs</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Deseja realmente remover estes Leads?
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

            {/*MODAL Excluir*/}
            <div className="mt-6 modal fade" id="modalExcluir" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Excluir LEADs</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Deseja realmente EXCLUIR estes Leads?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                                    onClick={() => excluirLeads()}>
                                Excluir
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}



