// https://egghead.io/lessons/react-move-items-between-columns-with-react-beautiful-dnd-using-ondragend
//https://www.freecodecamp.org/portuguese/news/como-adicionar-a-funcionalidade-de-arrastar-e-soltar-em-react-com-a-biblioteca-react-beautiful-dnd/
import Layout from "@/Layouts/VendedorLayout/LayoutConsultor";

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

export default function Dashboard({leads}) {

    return (
        <Layout titlePage="Lista de Leads" menu="clientes-lista">

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


            {/*Tabela*/}
            <div className="row justify-content-center my-4">
                <div className="col-auto d-none d-md-block">
                    <ScrollControlHorizontal lateral="e"/>
                </div>
                <div className="col-12 col-md-11">
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
                                        return (<NovoCards key={i} dados={dado}/>)
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
            <div className="row mb-3">
                <div className="col text-center">
                    <ScrollControlHorizontal/>
                </div>
            </div>

        </Layout>
    );
}



