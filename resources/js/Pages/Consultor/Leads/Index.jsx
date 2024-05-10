import Layout from "@/Layouts/VendedorLayout/LayoutConsultor";

import React, {useEffect, useState} from 'react';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LinearProgress from '@mui/material/LinearProgress';
import pesquisaCards from "@/Helpers/pesquisaCards";
import ScrollControlHorizontal from "@/Helpers/scrollControlHorizontal";

import NovoCards from './Cards/NovoCard';
import PreAtendimentoCard from './Cards/PreAtendimentoCard';
import AbertoCards from './Cards/AbertoCards';
import AtendimentoCards from './Cards/AtendimentoCard';
import FinalizadoCard from "./Cards/FinalizadoCard";
import AtivoCard from "./Cards/AtivoCard";

const styleCard = 'p-2 mx-1 text-white row justify-content-between rounded-top'

export default function Dashboard({}) {
    const [leads, setLeads] = useState()

    useEffect(function () {
        axios.get(route('consultor.leads.get-leads'))
            .then(res => {
                setLeads(res.data)
            })
    }, [])

    return (
        <Layout titlePage="Lista de Clientes" menu="clientes-lista">
            {/*Pesquisa*/}
            <div className="row justify-content-end">
                <div className="col-auto">
                    <ScrollControlHorizontal/>
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

            {!leads && <LinearProgress className="my-4"/>}

            {/*Tabela*/}
            {leads && <>
                <div className="my-4 row justify-content-center">
                    <div className="col-auto d-none d-md-block">
                        <ScrollControlHorizontal lateral="e"/>
                    </div>
                    <div className="col-12 col-md-12">
                        <div id="scrollControlHorizontal" className="overflow-scroll">
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
                    <div className="col-auto d-none d-md-block">
                        <ScrollControlHorizontal lateral="d"/>
                    </div>
                </div>

                <div className="mb-3 row">
                    <div className="text-center col">
                        <ScrollControlHorizontal/>
                    </div>
                </div>
            </>}
        </Layout>
    );
}



