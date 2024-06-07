import Layout from '@/Layouts/AdminLayout/LayoutAdmin';

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
import {CircularProgress} from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';

let idLeads = []
const styleCard = 'p-2 mx-1 text-white row justify-content-between rounded-top'

export default function Dashboard({usuario, consultores, isLeadsLimpar, isLeadsEncaminhar}) {
    const {data, setData, post} = useForm();
    const [carregando, setCarregando] = useState(false)
    const [carregandoRegistros, setCarregandoRegistros] = useState(true)
    const [leads, setRegistros] = useState([])
    const [enviadoLead, setEnviadoLead] = useState(false)
    const [limparStatus, setLimparStatus] = useState('')

    useEffect(() => {
        setCarregandoRegistros(true)
        axios.get(route('admin.leads.registros', {id: usuario.id}))
            .then(res => {
                setRegistros(res.data.registros)
                setCarregandoRegistros(false)
            })
    }, [enviadoLead]);

    function leadsSelecionados(idLead) {
        const index = idLeads.indexOf(idLead)
        if (index >= 0) idLeads.splice(index)
        else idLeads.push(idLead)
    }

    function alterarConsultor() {
        setCarregando(true)
        router.post(route('admin.leads.consultores-cards.update', 1000), {
            _method: 'put',
            ...data, idLeads: idLeads
        })
        setEnviadoLead(e => !e)
    }

    router.on('success', () => setCarregandoRegistros(false))

    function nomeConsultorSelecionado() {
        const nome = consultores[consultores.findIndex(i => i.id === data.novo_consultor)]?.name;
        return nome ? <>
            <b>TROCAR</b> o consultor(a) do Lead para:<br/>
            <h5>{nome}</h5>
        </> : <div className="text-white alert alert-danger">Selecione o Consultor</div>
    }

    function limpar() {
        setLimparStatus('')
        limparStatus && router.post(route('admin.leads.cards-leads.limpar-finalizados', {id: usuario.id, status: limparStatus}))

        setEnviadoLead(e => !e)
    }

    return (
        <Layout empty titlePage="Kanban de Leads" menu="leads" submenu="leads-cards"
                voltar={route('admin.leads.cards-leads.index')}>

            <div className="mb-4 card card-body">
                <div className="row justify-content-between">
                    <div className="col-auto">
                        <span className="d-block"><b>Nome:</b> {usuario.nome}</span>
                    </div>
                    <div className="col-auto">
                        <span className="d-block"><b>Funcão:</b> {usuario.funcao}</span>
                    </div>
                    <div className="col-auto">
                        <span className="d-block"><b>Setor:</b> {usuario.setor}</span>
                    </div>
                </div>
            </div>

            {/*Pesquisa*/}
            <div className="row justify-content-between mb-4">
                {isLeadsEncaminhar &&
                    <div className="col-4">
                        <div className="card card-body">
                            <div className="row mx-0">
                                <span>Alterar consultor dos Leads</span>
                                <div className="col-md-9">
                                    <TextField label="Selecione o Consultor..." select
                                               fullWidth required size="small" defaultValue=""
                                               onChange={e => setData('novo_consultor', e.target.value)}>
                                        {consultores.map((option) => (
                                            <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                <div className="p-0 col-3">
                                    <button type="button" className="btn btn-dark btn-sm" data-bs-toggle="modal"
                                            data-bs-target="#alterarConsultor">
                                        ENVIAR
                                    </button>
                                </div>
                                {carregando && <div className="col">
                                    <CircularProgress/>
                                </div>}
                            </div>
                        </div>
                    </div>
                }
                {isLeadsLimpar && <div className="col-3">
                    <div className="card card-body">
                        Remover todos os Leads do status
                        <div className="row">
                            <div className="col-7">
                                <TextField label="Status" select value={limparStatus ?? ''}
                                           fullWidth required size="small" defaultValue=""
                                           onChange={e => setLimparStatus(e.target.value)}>
                                    <MenuItem value="pre_atendimento">Pré Atendiemnto</MenuItem>
                                    <MenuItem value="aberto">Em Aberto</MenuItem>
                                    <MenuItem value="atendimento">Atendimento</MenuItem>
                                    <MenuItem value="finalizado">Finalizado</MenuItem>
                                </TextField>
                            </div>
                            <div className="col-auto">
                                <button type="button" className="btn btn-success btn-sm"
                                        data-bs-toggle="modal" data-bs-target="#modalLimpar">
                                    Remover
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
                }
                <div className="col-3 text-end">
                    <div className="card card-body">
                        <FormControl variant="outlined" className="bg-white" size="small">
                            <InputLabel htmlFor="search">Pesquisar...</InputLabel>
                            <OutlinedInput id="search" label="Pesquisar..."
                                           endAdornment={<InputAdornment position="end"><SearchOutlinedIcon/></InputAdornment>}
                                           onChange={e => pesquisaCards(e.target.value)}/>
                        </FormControl>
                    </div>
                </div>
            </div>


            {/*Tabela*/}
            {carregandoRegistros && <LinearProgress/>}

            {!carregandoRegistros &&
                <div className='row justify-content-center'>
                    <div className='col-auto'>
                        <div className="overflow-scroll" style={{height: '65vh'}}>
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
                                            <div className='col-auto'>Pré Atendimento</div>
                                            <div className='col-auto'>Qdt: {leads.pre_atendimento.length}</div>
                                        </div>
                                    </th>
                                    <th className="sticky-top" id="th-3">
                                        <div className={styleCard} style={{backgroundColor: 'green'}}>
                                            <div className='col-auto'>Em Aberto</div>
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

            {/*Alterar consultor*/
            }
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

            {/*MODAL LIMPAR*/
            }
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
        </Layout>
    );
}



