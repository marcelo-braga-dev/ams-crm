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

import ScrollControlHorizontal from '@/Helpers/scrollControlHorizontal';
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

export default function Pedidos({pedidos, setores, coresAbas, setorAtual, fornecedores, fornecedorAtual}) {

    function atualizarPagina(forcededorId, setorId) {
        window.location.href = route('admin.pedidos.index', {setor: setorId, fornecedor: forcededorId})
    }

    return (
        <Layout titlePage="Lista de Pedidos" menu="pedidos" submenu="lista">
            {/*Setores*/}
            <div className="container">
                <div className="row mb-2 bg-white p-3 shadow rounded">
                    <div className="col-md-4">
                        <TextField select label="Setores" fullWidth defaultValue={setorAtual ?? ''}
                                   onChange={e => atualizarPagina(null, e.target.value)}>
                            <MenuItem value="">Todos</MenuItem>
                            {setores.map((setor, index) => {
                                return (
                                    <MenuItem key={index} value={setor.id}>{setor.nome}</MenuItem>
                                )
                            })}
                        </TextField>
                    </div>
                    <div className="col-md-4">
                        <TextField select label="Fornecedores" fullWidth defaultValue={fornecedorAtual ?? ''}
                                   onChange={e => atualizarPagina(e.target.value, setorAtual)}>
                            <MenuItem value="">Todos</MenuItem>
                            {fornecedores.map((item, index) => {
                                return (
                                    <MenuItem key={index} value={item.id}>{item.nome}</MenuItem>
                                )
                            })}
                        </TextField>
                    </div>
                </div>
            </div>

            {/*Cards*/}
            <div className='container mt-4'>
                {/*Pesquisa*/}
                <div className="row justify-content-between">
                    <div className="col-auto  text-right">
                        <FormControl variant="outlined" className="bg-white" size="small">
                            <InputLabel htmlFor="search">Pesquisar...</InputLabel>
                            <OutlinedInput
                                id="search" label="Pesquisar..."
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
                                    <div style={{backgroundColor: coresAbas.reprovado}}
                                         className='row justify-content-between rounded-top text-white mx-1 p-2'>
                                        <div className='col-auto'>Reprovados</div>
                                        <div className='col-auto'>Qdt: {pedidos.reprovado.length}</div>
                                    </div>
                                </th>
                                <th id="th-2">
                                    <div style={{backgroundColor: coresAbas.conferencia}}
                                         className='row justify-content-between rounded-top text-white mx-1 p-2'>
                                        <div className='col-auto'>Conferência</div>
                                        <div className='col-auto'>Qdt: {pedidos.conferencia.length}</div>
                                    </div>
                                </th>
                                <th id="th-3">
                                    <div style={{backgroundColor: coresAbas.lancado}}
                                         className='row justify-content-between rounded-top text-white mx-1 p-2'>
                                        <div className='col-auto'>Lançado</div>
                                        <div className='col-auto'>Qdt: {pedidos.lancado.length}</div>
                                    </div>
                                </th>
                                <th id="th-4">
                                    <div style={{backgroundColor: coresAbas.boleto}}
                                         className='row justify-content-between rounded-top text-white mx-1 p-2'>
                                        <div className='col-auto'>Aguard. Nota/Boleto</div>
                                        <div className='col-auto'>Qdt: {pedidos.nota.length}</div>
                                    </div>
                                </th>
                                <th id="th-5">
                                    <div style={{backgroundColor: coresAbas.pagamento}}
                                         className='row justify-content-between rounded-top text-white mx-1 p-2'>
                                        <div className='col-auto'>Aguard. Pagamento</div>
                                        <div className='col-auto'>Qdt: {pedidos.pagamento.length}</div>
                                    </div>
                                </th>
                                <th id="th-6">
                                    <div style={{backgroundColor: coresAbas.faturamento}}
                                         className='row bg-pink-600 justify-content-between rounded-top text-white mx-1 p-2'>
                                        <div className='col-auto'>Aguard. Faturamento</div>
                                        <div className='col-auto'>Qdt: {pedidos.faturamento.length}</div>
                                    </div>
                                </th>
                                <th id="th-7">
                                    <div style={{backgroundColor: coresAbas.faturado}}
                                         className='row justify-content-between rounded-top text-white mx-1 p-2'>
                                        <div className='col-auto'>Faturado</div>
                                        <div className='col-auto'>Qdt: {pedidos.faturado.length}</div>
                                    </div>
                                </th>
                                {/*<th id="th-8">*/}
                                {/*    <div style={{backgroundColor: coresAbas.acompanhamento}}*/}
                                {/*         className='row justify-content-between rounded-top text-white mx-1 p-2'>*/}
                                {/*        <div className='col-auto'>Acompanhamento</div>*/}
                                {/*        <div className='col-auto'>Qdt: {pedidos.faturado.length}</div>*/}
                                {/*    </div>*/}
                                {/*</th>*/}
                                <th id="th-8">
                                    <div style={{backgroundColor: coresAbas.entregue}}
                                         className='row justify-content-between rounded-top text-white mx-1 p-2'>
                                        <div className='col-auto'>Entregue</div>
                                        <div className='col-auto'>Qdt: {pedidos.entregue.length}</div>
                                    </div>
                                </th>
                                <th id="th-9">
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
                                        return (<CardReprovado key={dados.id} dados={dados} cor={coresAbas.reprovado}/>)
                                    })}
                                </td>
                                <td id="td-2" className='shadow-sm' style={{minWidth: 300}}>
                                    {pedidos.conferencia.map((dados) => {
                                        return (<ConferenciaCard key={dados.id} dados={dados} cor={coresAbas.conferencia}/>)
                                    })}
                                </td>
                                <td id="td-3" className='shadow-sm' style={{minWidth: 300}}>
                                    {pedidos.lancado.map((dados) => {
                                        return (<CardLancado key={dados.id} dados={dados} cor={coresAbas.lancado}/>)
                                    })}
                                </td>
                                <td id="td-4" className='shadow-sm' style={{minWidth: 300}}>
                                    {pedidos.nota.map((dados) => {
                                        return (<CardBoleto key={dados.id} dados={dados} cor={coresAbas.boleto}/>)
                                    })}
                                </td>
                                <td id="td-5" className='shadow-sm' style={{minWidth: 300}}>
                                    {pedidos.pagamento.map((dados) => {
                                        return (<CardPagamento key={dados.id} dados={dados} cor={coresAbas.pagamento}/>)
                                    })}
                                </td>
                                <td id="td-6" className='shadow-sm' style={{minWidth: 300}}>
                                    {pedidos.faturamento.map((dados) => {
                                        return (<CardFaturando key={dados.id} dados={dados} cor={coresAbas.faturamento}/>)
                                    })}
                                </td>
                                <td id="td-7" className='shadow-sm' style={{minWidth: 300}}>
                                    {pedidos.faturado.map((dados) => {
                                        return (<CardFaturado key={dados.id} dados={dados} cor={coresAbas.faturado}/>)
                                    })}
                                </td>
                                <td id="td-8" className='shadow-sm' style={{minWidth: 300}}>
                                    {/*{pedidos.entregue.map((dados) => {*/}
                                    {/*    return (<CardEntregue key={dados.id} dados={dados} cor={coresAbas.entregue}/>)*/}
                                    {/*})}*/}
                                </td>
                                <td id="td-9" className='shadow-sm' style={{minWidth: 300}}>
                                    {pedidos.cancelado.map((dados) => {
                                        return (<CardCancelado key={dados.id} dados={dados} cor={coresAbas.cancelados}/>)
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
