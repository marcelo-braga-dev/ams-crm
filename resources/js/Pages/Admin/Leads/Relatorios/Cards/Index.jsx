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

let idLeads = []

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
        </> : <div className="alert alert-danger text-white">Selecione o Consultor</div>
    }

    return (
        <Layout titlePage="Lista de Leads" menu="leads" submenu="relatorios">
            <div className="container">
                <div className="row justify-content-between bg-white shadow rounded p-3 mb-4">
                    <div className="col-auto">
                        <small className="d-block">Consultor(a)</small>
                        <span className="d-block">{usuario.nome}</span>
                    </div>
                    <div className="col-auto">
                        <a href={route('admin.leads.relatorios.show', usuario.id)} className="btn btn-link mb-0">
                            <i className="fas fa-arrow-left me-1"></i> Voltar
                        </a>
                    </div>
                </div>
            </div>
            {/*Pesquisa*/}
            <div className="row justify-content-between">
                <div className="col">
                    <div className="row">
                        <span>Alterar consultor</span>
                        <div className="col-md-4">
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
                        <div className="col-4 p-0">
                            <button type="button" className="btn btn-dark" data-bs-toggle="modal"
                                    data-bs-target="#alterarConsultor">
                                ENVIAR
                            </button>
                        </div>
                    </div>
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

            {/*Tabela*/}
            <div className="row flex my-4">
                <div className="col-1 pt-5 d-none d-md-block">
                    <ScrollControlHorizontal lateral="e"/>
                </div>
                <div className="col-12 col-md-10">
                    <div id="scrollControlHorizontal" className="overflow-scroll">
                        <table>
                            <thead>
                            <tr>
                                <th id="th-1">
                                    <div
                                        className='row bg-primary justify-content-between rounded-top text-white mx-1 p-2'>
                                        <div className='col-auto'>Em Aberto</div>
                                        <div className='col-auto'>Qdt: {leads.novo.length}</div>
                                    </div>
                                </th>
                                <th id="th-2">
                                    <div
                                        className='row bg-warning justify-content-between rounded-top text-white mx-1 p-2'>
                                        <div className='col-auto'>Em Atendimento</div>
                                        <div className='col-auto'>Qdt: {leads.atendimento.length}</div>
                                    </div>
                                </th>

                                <th id="th-3">
                                    <div
                                        className='row bg-success justify-content-between rounded-top text-white mx-1 p-2'>
                                        <div className='col-auto'>Ativo</div>
                                        <div className='col-auto'>Qdt: {leads.ativo.length}</div>
                                    </div>
                                </th>
                                <th id="th-4">
                                    <div
                                        className='row bg-dark justify-content-between rounded-top text-white mx-1 p-2'>
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
                                        return (<NovoCards key={i} dados={dado}
                                                           leadsSelecionados={leadsSelecionados}/>)
                                    })}
                                </td>
                                <td id="td-2" className="shadow-sm" style={{minWidth: 300}}>
                                    {leads.atendimento.map((dado) => {
                                        return (<AtendimentoCards key={dado.id} dados={dado}
                                                                  leadsSelecionados={leadsSelecionados}/>)
                                    })}
                                </td>
                                <td id="td-3" className="shadow-sm" style={{minWidth: 300}}>
                                    {leads.ativo.map((dado) => {
                                        return (<AtivoCard key={dado.id} dados={dado}
                                                           leadsSelecionados={leadsSelecionados}/>)
                                    })}
                                </td>
                                <td id="td-4" className="shadow-sm" style={{minWidth: 300}}>
                                    {leads.finalizado.map((dado) => {
                                        return (<FinalizadoCard key={dado.id} dados={dado}
                                                                leadsSelecionados={leadsSelecionados}/>)
                                    })}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-1 pt-5 d-none d-md-block">
                    <ScrollControlHorizontal lateral="d"/>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col text-center">
                    <ScrollControlHorizontal/>
                </div>
            </div>

            {/*Alterar consultor*/}
            <div className="modal fade mt-5" id="alterarConsultor" tabIndex="-1" aria-labelledby="limparLeadLabel"
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
        </Layout>
    );
}



