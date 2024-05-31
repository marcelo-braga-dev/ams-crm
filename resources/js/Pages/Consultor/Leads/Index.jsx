import Layout from "@/Layouts/VendedorLayout/LayoutConsultor";

import React, {useEffect, useState} from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import pesquisaCards from "@/Helpers/pesquisaCards";

import NovoCards from './Cards/NovoCard';
import PreAtendimentoCard from './Cards/PreAtendimentoCard';
import AbertoCards from './Cards/AbertoCards';
import AtendimentoCards from './Cards/AtendimentoCard';
import FinalizadoCard from "./Cards/FinalizadoCard";
import AtivoCard from "./Cards/AtivoCard";
import {InputAdornment, TextField} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const styleCard = 'p-2 mx-1 text-white row justify-content-between rounded-top'

export default function Dashboard({isSdr}) {
    const [leads, setLeads] = useState()

    useEffect(function () {
        axios.get(route('consultor.leads.get-leads'))
            .then(res => {
                setLeads(res.data)
            })
    }, [])

    return (
        <Layout empty titlePage="Lista de Clientes" menu="clientes-lista">
            {/*Pesquisa*/}
            <div className="card card-body mb-4">
                <div className="row justify-content-between">
                    <div className="col-3">
                        <TextField fullWidth label="Pesquisar..."
                                   onChange={e => pesquisaCards(e.target.value)}
                                   InputProps={{endAdornment: <InputAdornment position="start"><SearchOutlinedIcon/></InputAdornment>}}
                        />
                    </div>
                </div>
            </div>

            {!leads && <LinearProgress className="my-4"/>}

            {/*Tabela*/}
            {leads &&
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <div className="overflow-scroll bg-white" style={{height: '78vh'}}>
                            <table>
                                <thead>
                                <tr>
                                    {isSdr && <th className="sticky-top" id="th-1">
                                        <div className={styleCard} style={{backgroundColor: 'blue'}}>
                                            <div className='col-auto'>Iniciar Atendimento</div>
                                            <div className='col-auto'>Qdt: {leads.novo.length}</div>
                                        </div>
                                    </th>}
                                    {isSdr && <th className="sticky-top" id="th-2">
                                        <div className={styleCard} style={{backgroundColor: 'orange'}}>
                                            <div className='col-auto'>Pré Atendimento</div>
                                            <div className='col-auto'>Qdt: {leads.pre_atendimento.length}</div>
                                        </div>
                                    </th>}
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
                                <tr className="align-top">
                                    {isSdr && <td id="td-1" style={{minWidth: 300}}>
                                        {leads.novo.map((dado) => {
                                            return (<NovoCards key={dado.id} dados={dado}/>)
                                        })}
                                    </td>}
                                    {isSdr && <td id="td-2" style={{minWidth: 300}}>
                                        {leads.pre_atendimento.map((dado) => {
                                            return (<PreAtendimentoCard key={dado.id} dados={dado}/>)
                                        })}
                                    </td>}
                                    <td id="td-3" style={{minWidth: 300}}>
                                        {leads.aberto.map((dado) => {
                                            return (<AbertoCards key={dado.id} dados={dado}/>)
                                        })}
                                    </td>
                                    <td id="td-4" style={{minWidth: 300}}>
                                        {leads.atendimento.map((dado) => {
                                            return (<AtendimentoCards key={dado.id} dados={dado}/>)
                                        })}
                                    </td>
                                    <td id="td-5" style={{minWidth: 300}}>
                                        {leads.ativo.map((dado) => {
                                            return (<AtivoCard key={dado.id} dados={dado}/>)
                                        })}
                                    </td>
                                    <td id="td-6" style={{minWidth: 300}}>
                                        {leads.finalizado.map((dado) => {
                                            return (<FinalizadoCard key={dado.id} dados={dado}/>)
                                        })}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            }
        </Layout>
    );
}



