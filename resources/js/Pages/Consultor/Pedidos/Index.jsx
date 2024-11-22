import React, {useCallback, useEffect, useState} from "react";
import pesquisaCards from "@/Helpers/pesquisaCards";
import Layout from "@/Layouts/Layout";

import ConferenciaCard from './Cards/Conferencia/ConferenciaCard';
import CardReprovado from './Cards/Reprovado/ReprovadoCard';
import CardLancado from './Cards/Lancado/CardLancado';
import CardBoleto from './Cards/Boleto/CardBoleto';
import CardPagamento from './Cards/Pagamento/CardPagamento';
import CardFaturando from './Cards/Faturando/CardFaturando';
import CardFaturado from './Cards/Faturado/CardFaturado';
import CardAcompanhamento from "./Cards/Acompanhamento/CardAcompanhamento";
import CardEntregue from './Cards/Entregue/CardEntregue';
import CardCancelado from './Cards/Cancelado/CardCancelado';

import InputAdornment from '@mui/material/InputAdornment';

import ScrollContainer from "react-indiana-drag-scroll";

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {TextField} from "@mui/material";
import convertFloatToMoney from "@/Helpers/converterDataHorario";

export default function Dashboard({pedidos, coresAbas, goCard}) {
    const qtdPedidos = pedidos.total

    useEffect(() => {
        if (pedidos && goCard) goCardPosicao()
    }, [pedidos]);

    function goCardPosicao() {
        const elemento = document.getElementById("card-id-" + goCard);
        if (elemento) elemento.scrollIntoView({block: 'center', inline: 'center', behavior: 'smooth'});
    }

    const totalPedidos = useCallback((status) => {
        return convertFloatToMoney(pedidos[status].reduce((acc, produto) => acc + produto.preco, 0));
    }, [pedidos]);

    return (
        <Layout titlePage="Lista de Pedidos" menu="pedidos" submenu="pedidos-lista">
            {/*Pesquisa*/}
            <div className="row justify-content-between mb-4">
                <div className="col-3 text-right">
                    <TextField fullWidth label="Pesquisar..."
                               onChange={e => pesquisaCards(e.target.value)}
                               InputProps={{endAdornment: <InputAdornment position="start"><SearchOutlinedIcon/></InputAdornment>}}/>
                </div>
                <div className="col-auto">
                    <small className="text-muted">Qtd. Total Pedidos: {qtdPedidos}</small>
                </div>
            </div>

            {/*Tabela*/}
            <ScrollContainer hideScrollbars={false}>
                <div style={{height: 'calc(100vh - 12rem)'}}>
                    <table>
                        <thead>
                        <tr>
                            <th id="th-1" className="sticky-top">
                                <div style={{backgroundColor: coresAbas.reprovado ?? 'black'}}
                                     className='row justify-content-between rounded-top text-white mx-1 p-2'>
                                    <div className='col-auto'>Reprovados</div>
                                    <div className='col-auto'>Qdt: {pedidos.reprovado.length}</div>
                                    <small className="d-block text-end">R$ {totalPedidos('reprovado')}</small>
                                </div>
                            </th>
                            <th id="th-2" className="sticky-top pt-0 mt-0">
                                <div style={{backgroundColor: coresAbas.conferencia ?? 'black'}}
                                     className='row justify-content-between rounded-top text-white mx-1 p-2 mt-0'>
                                    <div className='col-auto'>Conferência</div>
                                    <div className='col-auto'>Qdt: {pedidos.conferencia.length}</div>
                                    <small className="d-block text-end">R$ {totalPedidos('conferencia')}</small>
                                </div>
                            </th>
                            <th id="th-3" className="sticky-top">
                                <div style={{backgroundColor: coresAbas.lancado ?? 'black'}}
                                     className='row justify-content-between rounded-top text-white mx-1 p-2'>
                                    <div className='col-auto'>Lançado</div>
                                    <div className='col-auto'>Qdt: {pedidos.lancado.length}</div>
                                    <small className="d-block text-end">R$ {totalPedidos('lancado')}</small>
                                </div>
                            </th>
                            <th id="th-4" className="sticky-top">
                                <div style={{backgroundColor: coresAbas.boleto ?? 'black'}}
                                     className='row justify-content-between rounded-top text-white mx-1 p-2'>
                                    <div className='col-auto'>Aguard. Nota/Boleto</div>
                                    <div className='col-auto'>Qdt: {pedidos.nota.length}</div>
                                    <small className="d-block text-end">R$ {totalPedidos('nota')}</small>
                                </div>
                            </th>
                            <th id="th-5" className="sticky-top">
                                <div style={{backgroundColor: coresAbas.pagamento ?? 'black'}}
                                     className='row justify-content-between rounded-top text-white mx-1 p-2'>
                                    <div className='col-auto'>Aguard. Pagamento</div>
                                    <div className='col-auto'>Qdt: {pedidos.pagamento.length}</div>
                                    <small className="d-block text-end">R$ {totalPedidos('pagamento')}</small>
                                </div>
                            </th>
                            <th id="th-6" className="sticky-top">
                                <div style={{backgroundColor: coresAbas.faturamento ?? 'black'}}
                                     className='row bg-pink-600 justify-content-between rounded-top text-white mx-1 p-2'>
                                    <div className='col-auto'>Aguard. Faturamento</div>
                                    <div className='col-auto'>Qdt: {pedidos.faturamento.length}</div>
                                    <small className="d-block text-end">R$ {totalPedidos('faturamento')}</small>
                                </div>
                            </th>
                            <th id="th-7" className="sticky-top">
                                <div style={{backgroundColor: coresAbas.faturado ?? 'black'}}
                                     className='row justify-content-between rounded-top text-white mx-1 p-2'>
                                    <div className='col-auto'>Faturado</div>
                                    <div className='col-auto'>Qdt: {pedidos.faturado.length}</div>
                                    <small className="d-block text-end">R$ {totalPedidos('faturado')}</small>
                                </div>
                            </th>
                            <th id="th-8" className="sticky-top">
                                <div style={{backgroundColor: 'blue'}}
                                     className='row justify-content-between rounded-top text-white mx-1 p-2'>
                                    <div className='col-auto'>Aguardando Rastreio</div>
                                    <div className='col-auto'>Qdt: {pedidos.aguardando_rastreio.length}</div>
                                    <small className="d-block text-end">R$ {totalPedidos('aguardando_rastreio')}</small>
                                </div>
                            </th>
                            <th id="th-9" className="sticky-top">
                                <div style={{backgroundColor: coresAbas.acompanhamento ?? 'black'}}
                                     className='row justify-content-between rounded-top text-white mx-1 p-2'>
                                    <div className='col-auto'>Acompanhamento</div>
                                    <div className='col-auto'>Qdt: {pedidos.acompanhamento.length}</div>
                                    <small className="d-block text-end">R$ {totalPedidos('acompanhamento')}</small>
                                </div>
                            </th>
                            <th id="th-10" className="sticky-top">
                                <div style={{backgroundColor: coresAbas.entregue ?? 'black'}}
                                     className='row justify-content-between rounded-top text-white mx-1 p-2'>
                                    <div className='col-auto'>Entregue</div>
                                    <div className='col-auto'>Qdt: {pedidos.entregue.length}</div>
                                    <small className="d-block text-end">R$ {totalPedidos('entregue')}</small>
                                </div>
                            </th>
                            <th id="th-11" className="sticky-top">
                                <div style={{backgroundColor: coresAbas.cancelados ?? 'black'}}
                                     className='row justify-content-between rounded-top text-white mx-1 p-2'>
                                    <div className='col-12'>Cancelados</div>
                                    <div
                                        className='col-12 text-end'>Qdt: {pedidos.cancelado.length}</div>
                                </div>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="align-top">
                            <td id="td-1" style={{minWidth: 300}}>
                                {pedidos.reprovado.map((dados) => {
                                    return <CardReprovado key={dados.id} dados={dados} cor={coresAbas.reprovado}/>
                                })}
                            </td>
                            <td id="td-2" style={{minWidth: 300}}>
                                {pedidos.conferencia.map((dados) => {
                                    return <ConferenciaCard key={dados.id} dados={dados} cor={coresAbas.conferencia}/>
                                })}
                            </td>
                            <td id="td-3" style={{minWidth: 300}}>
                                {pedidos.lancado.map((dados) => {
                                    return <CardLancado key={dados.id} dados={dados} cor={coresAbas.lancado}/>
                                })}
                            </td>
                            <td id="td-4" style={{minWidth: 300}}>
                                {pedidos.nota.map((dados) => {
                                    return <CardBoleto key={dados.id} dados={dados} cor={coresAbas.boleto}/>
                                })}
                            </td>
                            <td id="td-5" style={{minWidth: 300}}>
                                {pedidos.pagamento.map((dados) => {
                                    return <CardPagamento key={dados.id} dados={dados} cor={coresAbas.pagamento}/>
                                })}
                            </td>
                            <td id="td-6" style={{minWidth: 300}}>
                                {pedidos.faturamento.map((dados) => {
                                    return <CardFaturando key={dados.id} dados={dados} cor={coresAbas.faturamento}/>
                                })}
                            </td>
                            <td id="td-7" style={{minWidth: 300}}>
                                {pedidos.faturado.map((dados) => {
                                    return <CardFaturado key={dados.id} dados={dados} cor={coresAbas.faturado}/>
                                })}
                            </td>
                            <td id="td-8" style={{minWidth: 300}}>
                                {pedidos.aguardando_rastreio.map((dados) => {
                                    return <CardLancado key={dados.id} dados={dados} cor="blue"/>
                                })}
                            </td>
                            <td id="td-9" style={{minWidth: 300}}>
                                {pedidos.acompanhamento.map((dados) => {
                                    return <CardAcompanhamento key={dados.id} dados={dados} cor={coresAbas.acompanhamento}/>
                                })}
                            </td>
                            <td id="td-10" style={{minWidth: 300}}>
                                {pedidos.entregue.map((dados) => {
                                    return <CardEntregue key={dados.id} dados={dados} cor={coresAbas.entregue}/>
                                })}
                            </td>
                            <td id="td-11" style={{minWidth: 300}}>
                                {pedidos.cancelado.map((dados) => {
                                    return <CardCancelado key={dados.id} dados={dados} cor={coresAbas.cancelados}/>
                                })}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </ScrollContainer>
        </Layout>
    )
}












