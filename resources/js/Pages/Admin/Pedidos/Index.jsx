import React from "react";
import Layout from '@/Layouts/Admin/Layout';

import ConferenciaCard from './Cards/Conferencia/ConferenciaCard';
import CardReprovado from './Cards/Reprovado/ReprovadoCard';
import CardLancado from './Cards/Lancado/CardLancado';
import CardBoleto from './Cards/Boleto/CardBoleto';
import CardPagamento from './Cards/Pagamento/CardPagamento';
import CardFaturando from './Cards/Faturando/CardFaturando';
import CardFaturado from './Cards/Faturado/CardFaturado';
import CardEntregue from './Cards/Entregue/CardEntregue';
import CardCancelado from './Cards/Cancelado/CardCancelado';

import pesquisaCards from "@/Helpers/pesquisaCards";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import ScrollControlHorizontal from '@/Helpers/scrollControlHorizontal'

export default function Pedidos({pedidos, fornecedores, fornecedorAtual}) {

    return (
        <Layout titlePage="Lista de Pedidos">
            {/*Fornecedores*/}
            <div className="row mb-4">
                <h6>Fornecedor</h6>
                <div className="col">
                    <div className="btn-group" role="group" aria-label="Basic outlined example">
                        {fornecedores.map((fornecedor, index) => {
                            return (
                                <a type="button" key={index}
                                   href={route('admin.pedidos.index', {fornecedor: fornecedor.id})}
                                   className={(fornecedor.id == fornecedorAtual ? 'active' : '') + " btn btn-outline-primary "}>
                                    {fornecedor.nome}
                                </a>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/*Cards*/}
            <div className='container'>
                {/*Pesquisa*/}
                <div className="row justify-content-between">
                    <div className="col-auto  text-right">
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
                    <div className="col-auto">
                        <ScrollControlHorizontal/>
                    </div>
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
                                        className='row bg-danger justify-content-between rounded-top text-white mx-1 p-2'>
                                        <div className='col-auto'>Reprovados</div>
                                        <div className='col-auto'>Qdt: {pedidos.reprovado.length}</div>
                                    </div>
                                </th>
                                <th id="th-2">
                                    <div
                                        className='row bg-warning justify-content-between rounded-top text-white mx-1 p-2'>
                                        <div className='col-auto'>Conferência</div>
                                        <div className='col-auto'>Qdt: {pedidos.conferencia.length}</div>
                                    </div>
                                </th>
                                <th id="th-3">
                                    <div
                                        className='row bg-success justify-content-between rounded-top text-white mx-1 p-2'>
                                        <div className='col-auto'>Lançado</div>
                                        <div className='col-auto'>Qdt: {pedidos.lancado.length}</div>
                                    </div>
                                </th>
                                <th id="th-4">
                                    <div
                                        className='row bg-info justify-content-between rounded-top text-white mx-1 p-2'>
                                        <div className='col-auto'>Aguard. Nota/Boleto</div>
                                        <div className='col-auto'>Qdt: {pedidos.nota.length}</div>
                                    </div>
                                </th>
                                <th id="th-5">
                                    <div
                                        className='row bg-primary justify-content-between rounded-top text-white mx-1 p-2'>
                                        <div className='col-auto'>Aguard. Pagamento</div>
                                        <div className='col-auto'>Qdt: {pedidos.pagamento.length}</div>
                                    </div>
                                </th>
                                <th id="th-6">
                                    <div
                                        className='row bg-pink-600 justify-content-between rounded-top text-white mx-1 p-2'
                                        style={{backgroundColor: 'hotpink'}}>
                                        <div className='col-auto'>Aguard. Faturamento</div>
                                        <div className='col-auto'>Qdt: {pedidos.faturamento.length}</div>
                                    </div>
                                </th>
                                <th id="th-7">
                                    <div
                                        className='row justify-content-between rounded-top text-white mx-1 p-2'
                                        style={{backgroundColor: 'purple'}}>
                                        <div className='col-auto'>Faturado</div>
                                        <div className='col-auto'>Qdt: {pedidos.faturado.length}</div>
                                    </div>
                                </th>
                                <th id="th-8">
                                    <div
                                        className='row justify-content-between rounded-top text-white mx-1 p-2'
                                        style={{backgroundColor: 'darkgreen'}}>
                                        <div className='col-auto'>Entregue</div>
                                        <div className='col-auto'>Qdt: {pedidos.entregue.length}</div>
                                    </div>
                                </th>
                                <th id="th-9">
                                    <div
                                        className='row bg-dark justify-content-between rounded-top text-white mx-1 p-2'>
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
                                        return (<CardReprovado key={dados.id} dados={dados}/>)
                                    })}
                                </td>
                                <td id="td-2" className='shadow-sm' style={{minWidth: 300}}>
                                    {pedidos.conferencia.map((dados) => {
                                        return (<ConferenciaCard key={dados.id} dados={dados}/>
                                        )
                                    })}
                                </td>
                                <td id="td-3" className='shadow-sm' style={{minWidth: 300}}>
                                    {pedidos.lancado.map((dados) => {
                                        return (<CardLancado key={dados.id} dados={dados}/>
                                        )
                                    })}
                                </td>
                                <td id="td-4" className='shadow-sm' style={{minWidth: 300}}>
                                    {pedidos.nota.map((dados) => {
                                        return (<CardBoleto key={dados.id} dados={dados}/>
                                        )
                                    })}
                                </td>
                                <td id="td-5" className='shadow-sm' style={{minWidth: 300}}>
                                    {pedidos.pagamento.map((dados) => {
                                        return (<CardPagamento key={dados.id} dados={dados}/>
                                        )
                                    })}
                                </td>
                                <td id="td-6" className='shadow-sm' style={{minWidth: 300}}>
                                    {pedidos.faturamento.map((dados) => {
                                        return (<CardFaturando key={dados.id} dados={dados}/>
                                        )
                                    })}
                                </td>
                                <td id="td-7" className='shadow-sm' style={{minWidth: 300}}>
                                    {pedidos.faturado.map((dados) => {
                                        return (<CardFaturado key={dados.id} dados={dados}/>
                                        )
                                    })}
                                </td>
                                <td id="td-8" className='shadow-sm' style={{minWidth: 300}}>
                                    {pedidos.entregue.map((dados) => {
                                        return (<CardEntregue key={dados.id} dados={dados}/>
                                        )
                                    })}
                                </td>
                                <td id="td-9" className='shadow-sm' style={{minWidth: 300}}>
                                    {pedidos.cancelado.map((dados) => {
                                        return (<CardCancelado key={dados.id} dados={dados}/>
                                        )
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
            {/*Cards - fim*/}
        </Layout>
    );
}
