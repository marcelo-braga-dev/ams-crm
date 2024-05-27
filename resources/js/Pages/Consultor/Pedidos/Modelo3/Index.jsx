import React, {useEffect, useState} from "react";
import Layout from "@/Layouts/VendedorLayout/LayoutConsultor";
import pesquisaCards from "@/Helpers/pesquisaCards";

import ConferenciaCard from './Cards/Conferencia/ConferenciaCard';
import CardReprovado from './Cards/Reprovado/ReprovadoCard';
import CardEncomenda from './Cards/Encomenda/EncomendaCard';
import CardLancado from './Cards/Lancado/CardLancado';
import CardFaturado from './Cards/Faturado/CardFaturado';
import CardEntregue from './Cards/Entregue/CardEntregue';
import CardCancelado from './Cards/Cancelado/CardCancelado';

import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import Card from "@mui/material/Card";

import ScrollContainer from "react-indiana-drag-scroll";

export default function Dashboard({pedidos, coresAbas, goCard}) {
    const [qtdPedidos, setQtdPedidos] = useState(pedidos.total)

    useEffect(() => {
        if (pedidos && goCard) goCardPosicao()
    }, [pedidos]);

    function goCardPosicao() {
        const elemento = document.getElementById("card-id-" + goCard);
        if (elemento) elemento.scrollIntoView({block: 'center', inline: 'center', behavior: 'smooth'});
    }

    return (
        <Layout titlePage="Lista de Pedidos" menu="pedidos-lista" empty>
            {/*Pesquisa*/}
            <Card className="p-3 mb-3">
                <div className="row justify-content-between px-4">
                    <div className="col-auto text-right">
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
                        <small className="text-muted me-5">Qtd. Total Pedidos: {qtdPedidos}</small>
                    </div>
                </div>
            </Card>

            {/*Tabela*/}
            <Card className="p-3">
                <ScrollContainer hideScrollbars={false}>
                    <div style={{height: '75vh'}}>
                        <table>
                            <thead>
                            <tr>
                                <th id="th-1" className="sticky-top">
                                    <div style={{backgroundColor: coresAbas.reprovado ?? 'black'}}
                                         className='row justify-content-between rounded-top text-white mx-1 p-2'>
                                        <div className='col-auto'>Reprovados</div>
                                        <div className='col-auto'>Qdt: {pedidos.reprovado.length}</div>
                                            <small
                                                className="d-block text-end">R$ {(pedidos.reprovado[0]?.faturamento ?? '0,00')}</small>
                                        </div>
                                    </th>
                                    <th id="th-2" className="sticky-top">
                                        <div style={{backgroundColor: coresAbas.encomenda ?? 'black'}}
                                             className='row justify-content-between rounded-top text-white mx-1 p-2'>
                                            <div className='col-auto'>Encomenda</div>
                                            <div className='col-auto'>Qdt: {pedidos.encomenda.length}</div>
                                            <small
                                                className="d-block text-end">R$ {(pedidos.encomenda[0]?.faturamento ?? '0,00')}</small>
                                        </div>
                                    </th>
                                    <th id="th-3" className="sticky-top">
                                        <div style={{backgroundColor: coresAbas.conferencia ?? 'black'}}
                                             className='row justify-content-between rounded-top text-white mx-1 p-2'>
                                            <div className='col-auto'>Conferência</div>
                                            <div className='col-auto'>Qdt: {pedidos.conferencia.length}</div>
                                            <small
                                                className="d-block text-end">R$ {(pedidos.conferencia[0]?.faturamento ?? '0,00')}</small>
                                        </div>
                                    </th>
                                    <th id="th-4" className="sticky-top">
                                        <div style={{backgroundColor: coresAbas.lancado ?? 'black'}}
                                             className='row justify-content-between rounded-top text-white mx-1 p-2'>
                                            <div className='col-auto'>Lançado</div>
                                            <div className='col-auto'>Qdt: {pedidos.lancado.length}</div>
                                            <small
                                                className="d-block text-end">R$ {(pedidos.lancado[0]?.faturamento ?? '0,00')}</small>
                                        </div>
                                    </th>
                                    <th id="th-5" className="sticky-top">
                                        <div style={{backgroundColor: 'rgba(59,189,13,0.6)'}}
                                             className='row bg-pink-600 justify-content-between rounded-top text-white mx-1 p-2'>
                                            <div className='col-auto'>Faturado à Vista</div>
                                            <div className='col-auto'>Qdt: {pedidos.faturado_vista.length}</div>
                                            <small
                                                className="d-block text-end">R$ {(pedidos.faturado_vista[0]?.faturamento ?? '0,00')}</small>
                                        </div>
                                    </th>
                                    <th id="th-6" className="sticky-top">
                                        <div style={{backgroundColor: "#854787"}}
                                             className='row bg-pink-600 justify-content-between rounded-top text-white mx-1 p-2'>
                                            <div className='col-auto'>Faturado à Prazo</div>
                                            <div className='col-auto'>Qdt: {pedidos.faturado_prazo.length}</div>
                                            <small
                                                className="d-block text-end">R$ {(pedidos.faturado_prazo[0]?.faturamento ?? '0,00')}</small>
                                        </div>
                                    </th>
                                    <th id="th-8" className="sticky-top">
                                        <div style={{backgroundColor: coresAbas.entregue ?? 'black'}}
                                             className='row justify-content-between rounded-top text-white mx-1 p-2'>
                                            <div className='col-auto'>Entregue</div>
                                            <div className='col-auto'>Qdt: {pedidos.entregue.length}</div>
                                            <small className="d-block text-end">TOTAL
                                                R$ {(pedidos.entregue[0]?.faturamento ?? '0,00')}</small>
                                        </div>
                                    </th>
                                    <th id="th-9" className="sticky-top">
                                        <div style={{backgroundColor: coresAbas.cancelados ?? 'black'}}
                                             className='row justify-content-between rounded-top text-white mx-1 p-2'>
                                            <div className='col-12'>Cancelados</div>
                                            <div className='col-12 text-end'>Qdt: {pedidos.cancelado.length}</div>
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
                                        {pedidos.encomenda.map((dados) => {
                                            return (<CardEncomenda key={dados.id} dados={dados}
                                                                   cor={coresAbas.encomenda}/>)
                                        })}
                                    </td>
                                    <td id="td-3" className='shadow-sm' style={{minWidth: 300}}>
                                        {pedidos.conferencia.map((dados) => {
                                            return (<ConferenciaCard key={dados.id} dados={dados}
                                                                     cor={coresAbas.conferencia}/>)
                                        })}
                                    </td>
                                    <td id="td-4" className='shadow-sm' style={{minWidth: 300}}>
                                        {pedidos.lancado.map((dados) => {
                                            return (
                                                <CardLancado key={dados.id} dados={dados} cor={coresAbas.lancado}/>)
                                        })}
                                    </td>
                                    <td id="td-5" className='shadow-sm' style={{minWidth: 300}}>
                                        {pedidos.faturado_vista.map((dados) => {
                                            return (
                                                <CardFaturado key={dados.id} dados={dados}
                                                              cor={"rgba(59,189,13,0.6)"}/>)
                                        })}
                                    </td>
                                    <td id="td-6" className='shadow-sm' style={{minWidth: 300}}>
                                        {pedidos.faturado_prazo.map((dados) => {
                                            return (
                                                <CardFaturado key={dados.id} dados={dados}
                                                              cor={'#854787'}/>)
                                        })}
                                    </td>
                                    <td id="td-8" className='shadow-sm' style={{minWidth: 300}}>
                                        {pedidos.entregue.map((dados) => {
                                            return (<CardEntregue key={dados.id} dados={dados}
                                                                  cor={coresAbas.entregue}/>)
                                        })}
                                    </td>
                                    <td id="td-9" className='shadow-sm' style={{minWidth: 300}}>
                                        {pedidos.cancelado.map((dados) => {
                                            return (<CardCancelado key={dados.id} dados={dados}
                                                                   cor={coresAbas.cancelados}/>)
                                        })}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                </ScrollContainer>
            </Card>

        </Layout>
    )
}












