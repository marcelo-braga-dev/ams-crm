import ConferenciaCard from './Cards/Conferencia/ConferenciaCard';
import CardReprovado from './Cards/Reprovado/ReprovadoCard';
import CardLancado from './Cards/Lancado/CardLancado';
import CardFaturado from './Cards/Faturado/CardFaturado';
import CardEntregue from './Cards/Entregue/CardEntregue';
import CardCancelado from './Cards/Cancelado/CardCancelado';

import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import pesquisaCards from "@/Helpers/pesquisaCards";
import React from "react";
import ScrollControlHorizontal from "@/Helpers/scrollControlHorizontal";
import Layout from "@/Layouts/VendedorLayout/LayoutConsultor";

export default function Dashboard({pedidos, coresAbas}) {

    return (
        <Layout titlePage="Lista de Pedidos">
            <div className="card">
                <div className="card-body">
                    <div className='container'>
                        {/*Pesquisa*/}
                        <div className="row justify-content-between mb-3">
                            <div className="col-auto">AGRONEGÓCIOS</div>
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
                    <div className="row flex my-2">
                        <div className="col-1 pt-5 d-none d-md-block">
                            <ScrollControlHorizontal lateral="e"/>
                        </div>
                        <div className="col-12 col-md-10">
                            <div id="scrollControlHorizontal" className="overflow-scroll">
                                <table>
                                    <thead>
                                    <tr>
                                        <th id="th-1">
                                            <div style={{backgroundColor: coresAbas.reprovado}}
                                                 className='row justify-content-between rounded-top text-white mx-1 p-2'>
                                                <div className='col-auto'>Reprovados</div>
                                                <div className='col-auto'>Qdt: {pedidos.reprovado.length}</div>
                                                <small
                                                    className="d-block text-end">R$ {(pedidos.reprovado[0]?.faturamento ?? '0,00')}</small>
                                            </div>
                                        </th>
                                        <th id="th-2">
                                            <div style={{backgroundColor: coresAbas.conferencia}}
                                                 className='row justify-content-between rounded-top text-white mx-1 p-2'>
                                                <div className='col-auto'>Conferência</div>
                                                <div className='col-auto'>Qdt: {pedidos.conferencia.length}</div>
                                                <small
                                                    className="d-block text-end">R$ {(pedidos.conferencia[0]?.faturamento ?? '0,00')}</small>
                                            </div>
                                        </th>
                                        <th id="th-3">
                                            <div style={{backgroundColor: coresAbas.lancado}}
                                                 className='row justify-content-between rounded-top text-white mx-1 p-2'>
                                                <div className='col-auto'>Lançado</div>
                                                <div className='col-auto'>Qdt: {pedidos.lancado.length}</div>
                                                <small
                                                    className="d-block text-end">R$ {(pedidos.lancado[0]?.faturamento ?? '0,00')}</small>
                                            </div>
                                        </th>
                                        <th id="th-7">
                                            <div style={{backgroundColor: coresAbas.faturado}}
                                                 className='row justify-content-between rounded-top text-white mx-1 p-2'>
                                                <div className='col-auto'>Faturado</div>
                                                <div className='col-auto'>Qdt: {pedidos.faturado.length}</div>
                                                <small
                                                    className="d-block text-end">R$ {(pedidos.faturado[0]?.faturamento ?? '0,00')}</small>
                                            </div>
                                        </th>
                                        <th id="th-9">
                                            <div style={{backgroundColor: coresAbas.entregue}}
                                                 className='row justify-content-between rounded-top text-white mx-1 p-2'>
                                                <div className='col-auto'>Entregue</div>
                                                <div className='col-auto'>Qdt: {pedidos.entregue.length}</div>
                                                <small className="d-block text-end">TOTAL
                                                    R$ {(pedidos.entregue[0]?.faturamento ?? '0,00')}</small>
                                            </div>
                                        </th>
                                        <th id="th-10">
                                            <div style={{backgroundColor: coresAbas.cancelados}}
                                                 className='row justify-content-between rounded-top text-white mx-1 p-2'>
                                                <div className='col-auto'>Cancelados</div>
                                                <div className='col-auto'>Qdt: {pedidos.cancelado.length}</div>
                                            </div>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr className="align-top">
                                        <td id="td-1" className='shadow-sm' style={{minWidth: 300}}>
                                            {pedidos.reprovado.map((dados) => {
                                                return (<CardReprovado key={dados.id} dados={dados}
                                                                       cor={coresAbas.reprovado}/>)
                                            })}
                                        </td>
                                        <td id="td-2" className='shadow-sm' style={{minWidth: 300}}>
                                            {pedidos.conferencia.map((dados) => {
                                                return (<ConferenciaCard key={dados.id} dados={dados}
                                                                         cor={coresAbas.conferencia}/>)
                                            })}
                                        </td>
                                        <td id="td-3" className='shadow-sm' style={{minWidth: 300}}>
                                            {pedidos.lancado.map((dados) => {
                                                return (
                                                    <CardLancado key={dados.id} dados={dados} cor={coresAbas.lancado}/>)
                                            })}
                                        </td>
                                        <td id="td-7" className='shadow-sm' style={{minWidth: 300}}>
                                            {pedidos.faturado.map((dados) => {
                                                return (<CardFaturado key={dados.id} dados={dados}
                                                                      cor={coresAbas.faturado}/>)
                                            })}
                                        </td>
                                        <td id="td-9" className='shadow-sm' style={{minWidth: 300}}>
                                            {pedidos.entregue.map((dados) => {
                                                return (<CardEntregue key={dados.id} dados={dados}
                                                                      cor={coresAbas.entregue}/>)
                                            })}
                                        </td>
                                        <td id="td-10" className='shadow-sm' style={{minWidth: 300}}>
                                            {pedidos.cancelado.map((dados) => {
                                                return (<CardCancelado key={dados.id} dados={dados}
                                                                       cor={coresAbas.cancelados}/>)
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
                </div>
            </div>
        </Layout>
    )
}












