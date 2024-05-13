import Layout from '@/Layouts/AdminLayout/LayoutAdmin';

import React, {useState} from 'react';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import pesquisaCards from "@/Helpers/pesquisaCards";
import ScrollControlHorizontal from "@/Helpers/scrollControlHorizontal";

import NovoCards from './Cards/NovoCard';
import AtendimentoCards from './Cards/AtendimentoCard';
import FinalizadoCard from "./Cards/FinalizadoCard";
import AtivoCard from "./Cards/AtivoCard";
import {router, useForm} from "@inertiajs/react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import PreAtendimentoCard from "./Cards/PreAtendimentoCard";
import AbertoCards from "./Cards/AbertoCards";

let idLeads = []
const styleCard = 'p-2 mx-1 text-white row justify-content-between rounded-top'

export default function Dashboard({leads, usuario, consultores}) {
    const {data, setData, post} = useForm();

    function leadsSelecionados(idLead) {
        const index = idLeads.indexOf(idLead)
        if (index >= 0) {
            idLeads.splice(index)
        } else {
            idLeads.push(idLead);
        }
    }

    function alterarConsultor() {
        router.post(route('admin.leads.consultores-cards.update', 1000), {
            _method: 'put',
            ...data, idLeads: idLeads
        })
        window.location.reload()
    }

    function nomeConsultorSelecionado() {
        const nome = consultores[consultores.findIndex(i => i.id === data.novo_consultor)]?.name;
        return nome ? <>
            <b>TROCAR</b> o consultor(a) do Lead para:<br/>
            <h5>{nome}</h5>
        </> : <div className="text-white alert alert-danger">Selecione o Consultor</div>
    }

    function limpar() {
        router.post(route('admin.leads.cards-leads.limpar-finalizados',
            {id: usuario.id}))
    }

    return (
        <Layout titlePage="Lista de Leads" menu="leads" submenu="leads-cards"
                voltar={route('admin.leads.cards-leads.index')}>

            <div className="mb-4 card card-body">
                <div className="col-auto">
                    <h6 className="d-block">Nome: {usuario.nome}</h6>
                </div>
            </div>

            {/*Pesquisa*/}
            <div className='mb-4 card card-body'>
                <div className="row justify-content-between">
                    <div className="col">
                        <div className="row">
                            <span>Alterar consultor</span>
                            <div className="col-md-6">
                                <TextField label="Selecione o Consultor..." select
                                           fullWidth required size="small" defaultValue=""
                                           onChange={e => setData('novo_consultor', e.target.value)}>
                                    {consultores.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className="p-0 col-4">
                                <button type="button" className="btn btn-dark btn-sm" data-bs-toggle="modal"
                                        data-bs-target="#alterarConsultor">
                                    ENVIAR
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <button type="button" className="p-0 m-0 btn btn-link text-dark btn-sm"
                                data-bs-toggle="modal" data-bs-target="#modalLimpar">
                            Remover Finaliados
                        </button>
                    </div>
                    <div className="col-auto text-right">
                        <FormControl variant="outlined" className="bg-white" size="small">
                            <InputLabel htmlFor="search">Pesquisar...</InputLabel>
                            <OutlinedInput id="search" label="Pesquisar..."
                                           endAdornment={
                                               <InputAdornment position="end">
                                                   <SearchOutlinedIcon></SearchOutlinedIcon>
                                               </InputAdornment>
                                           }
                                           onChange={e => pesquisaCards(e.target.value)}/>
                        </FormControl>
                    </div>
                </div>
            </div>


            {/*Tabela*/}
            <div className='row justify-content-center'>
                <div className='col-auto'>
                    <table>
                        <thead>
                        <tr>
                            <th id="th-1">
                                <div className={styleCard} style={{backgroundColor: 'blue'}}>
                                    <div className='col-auto'>Iniciar Atendimento</div>
                                    <div className='col-auto'>Qdt: {leads.novo.length}</div>
                                </div>
                            </th>
                            <th id="th-2">
                                <div className={styleCard} style={{backgroundColor: 'orange'}}>
                                    <div className='col-auto'>Pré Atendimento</div>
                                    <div className='col-auto'>Qdt: {leads.pre_atendimento.length}</div>
                                </div>
                            </th>
                            <th id="th-1">
                                <div className={styleCard} style={{backgroundColor: 'green'}}>
                                    <div className='col-auto'>Em Aberto</div>
                                    <div className='col-auto'>Qdt: {leads.aberto.length}</div>
                                </div>
                            </th>
                            <th id="th-2">
                                <div className={styleCard} style={{backgroundColor: 'yellowgreen'}}>
                                    <div className='col-auto'>Em Atendimento</div>
                                    <div className='col-auto'>Qdt: {leads.atendimento.length}</div>
                                </div>
                            </th>
                            <th id="th-3">
                                <div className={styleCard} style={{backgroundColor: 'brown'}}>
                                    <div className='col-auto'>Ativo</div>
                                    <div className='col-auto'>Qdt: {leads.ativo.length}</div>
                                </div>
                            </th>
                            <th id="th-4">
                                <div className={styleCard} style={{backgroundColor: 'black'}}>
                                    <div className='col-auto'>Finalizados</div>
                                    <div className='col-auto'>Qdt: {leads.finalizado.length}</div>
                                </div>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="align-top">
                            <td id="td-1" className="shadow-sm" style={{minWidth: 300}}>
                                {leads.novo.map((dado, i) => {
                                    return (<NovoCards key={i} dados={dado}/>)
                                })}
                            </td>
                            <td id="td-2" className="shadow-sm" style={{minWidth: 300}}>
                                {leads.pre_atendimento.map((dado) => {
                                    return (<PreAtendimentoCard key={dado.id} dados={dado}/>)
                                })}
                            </td>
                            <td id="td-1" className="shadow-sm" style={{minWidth: 300}}>
                                {leads.aberto.map((dado, i) => {
                                    return (<AbertoCards key={i} dados={dado}/>)
                                })}
                            </td>
                            <td id="td-2" className="shadow-sm" style={{minWidth: 300}}>
                                {leads.atendimento.map((dado) => {
                                    return (<AtendimentoCards key={dado.id} dados={dado}/>)
                                })}
                            </td>
                            <td id="td-3" className="shadow-sm" style={{minWidth: 300}}>
                                {leads.ativo.map((dado) => {
                                    return (<AtivoCard key={dado.id} dados={dado}/>)
                                })}
                            </td>
                            <td id="td-4" className="shadow-sm" style={{minWidth: 300}}>
                                {leads.finalizado.map((dado) => {
                                    return (<FinalizadoCard key={dado.id} dados={dado}/>)
                                })}
                            </td>
                        </tr>
                        </tbody>
                    </table>
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

            {/*MODAL LIMPAR*/}
            <div className="mt-5 modal fade" id="modalLimpar" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">LIMPAR LEAD</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Limpar cards FINALIZADOS?

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



