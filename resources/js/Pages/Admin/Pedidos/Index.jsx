import React, {useEffect, useState} from "react";
import Layout from '@/Layouts/AdminLayout/LayoutAdmin';

import ConferenciaCard from './Cards/Conferencia/ConferenciaCard';
import CardReprovado from './Cards/Reprovado/ReprovadoCard';
import CardLancado from './Cards/Lancado/CardLancado';
import CardEncomenda from './Cards/Encomenda/EncomendaCard';
import CardBoleto from './Cards/Boleto/CardBoleto';
import CardPagamento from './Cards/Pagamento/CardPagamento';
import CardFaturando from './Cards/Faturando/CardFaturando';
import CardFaturado from './Cards/Faturado/CardFaturado';
import CardAcompanhamento from './Cards/Acompanhamento/CardAcompanhamento';
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
import {useForm, usePage} from "@inertiajs/react";
import LinearProgress from '@mui/material/LinearProgress';

export default function Pedidos({fornecedores, setores, coresAbas}) {
    const [pedidos, setPedidos] = useState()
    const [modelo, setModelo] = useState()
    const [carregando, setCarregando] = useState(true)

    function atualizarPagina(forcededorId, setorId) {
        setCarregando(true)
        setPedidos()
        axios.get(route('admin.pedidos-cards', {setor: setorId, fornecedor: forcededorId}))
            .then(res => {
                setPedidos(res.data)
            }).finally(() => setCarregando(false))
    }

    useEffect(function () {
        setCarregando(true)
        setPedidos()
        axios.get(route('admin.pedidos-cards'))
            .then(res => {
                setPedidos(res.data)
                setCarregando(false)
            })
    }, [usePage().props.franquia_selecionada])

    return (
        <Layout titlePage="Lista de Pedidos" menu="pedidos" submenu="pedidos-lista">

            <div className="row justify-content-around mb-2">
                <div className="col-md-5">
                    <div className="row">
                        <div className="col-md-5">
                            <TextField select label="Setores" size="small" fullWidth
                                       defaultValue=""
                                       onChange={e => atualizarPagina(null, e.target.value)}>
                                <MenuItem value="">Todos</MenuItem>
                                {setores.map((setor, index) => {
                                    return (
                                        <MenuItem key={index} value={setor.id}>{setor.nome}</MenuItem>
                                    )
                                })}
                            </TextField>
                        </div>
                        <div className="col-md-5">
                            <TextField select size="small" label="Fornecedores" fullWidth
                                       defaultValue=""
                                       onChange={e => atualizarPagina(e.target.value, '')}>
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

                <div className="col-md-2">
                    <ScrollControlHorizontal/>
                </div>
                <div className="col-md-5">
                    <div className="bg-white">
                        {/*Pesquisa*/}
                        <div className="row justify-content-between">
                            <div className="col-md-4">
                                <div className="mt-2">
                                    {/*<span className="badge" style={{backgroundColor: dadosSetor?.cor}}>*/}
                                    {/*{dadosSetor?.nome}*/}
                                    {/*</span>*/}
                                </div>
                            </div>
                            <div className="col-md-8">
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
                        </div>
                    </div>
                </div>
            </div>

            {/*/!*Tabela*!/*/}
            {pedidos &&
                <div className="row my-4 g-">
                    <div className="col-auto pt-5 d-none d-md-block">
                        <ScrollControlHorizontal lateral="e"/>
                    </div>
                    <div className="col-12 col-md-11">
                        <div id="scrollControlHorizontal" className="overflow-scroll">
                            <table>
                                <thead>
                                <tr>
                                    <th id="th-1" style={{minWidth: 300}}>
                                        <div style={{backgroundColor: coresAbas.reprovado}}
                                             className='row justify-content-between rounded-top text-white mx-1 p-2'>
                                            <div className='col-auto'>Reprovados</div>
                                            <div className='col-auto'>Qdt: {pedidos.reprovado.length}</div>
                                            <small
                                                className="d-block text-end">R$ {(pedidos.reprovado[0]?.faturamento ?? '0,00')}</small>
                                        </div>
                                    </th>
                                    <th id="th-2" style={{minWidth: 300}}>
                                        <div style={{backgroundColor: coresAbas.encomenda}}
                                             className='row justify-content-between rounded-top text-white mx-1 p-2'>
                                            <div className='col-auto'>Encomenda</div>
                                            <div className='col-auto'>Qdt: {pedidos.encomenda.length}</div>
                                            <small
                                                className="d-block text-end">R$ {(pedidos.encomenda[0]?.faturamento ?? '0,00')}</small>
                                        </div>
                                    </th>
                                    <th id="th-3" style={{minWidth: 300}}>
                                        <div style={{backgroundColor: coresAbas.conferencia}}
                                             className='row justify-content-between rounded-top text-white mx-1 p-2'>
                                            <div className='col-auto'>Conferência</div>
                                            <div className='col-auto'>Qdt: {pedidos.conferencia.length}</div>
                                            <small
                                                className="d-block text-end">R$ {(pedidos.conferencia[0]?.faturamento ?? '0,00')}</small>
                                        </div>
                                    </th>
                                    <th id="th-4" style={{minWidth: 300}}>
                                        <div style={{backgroundColor: coresAbas.lancado}}
                                             className='row justify-content-between rounded-top text-white mx-1 p-2'>
                                            <div className='col-auto'>Lançado</div>
                                            <div className='col-auto'>Qdt: {pedidos.lancado.length}</div>
                                            <small
                                                className="d-block text-end">R$ {(pedidos.lancado[0]?.faturamento ?? '0,00')}</small>
                                        </div>
                                    </th>
                                    <th id="th-5" style={{minWidth: 300}}>
                                        <div style={{backgroundColor: coresAbas.boleto}}
                                             className='row justify-content-between rounded-top text-white mx-1 p-2'>
                                            <div className='col-auto'>Aguard. Nota/Boleto</div>
                                            <div className='col-auto'>Qdt: {pedidos.nota.length}</div>
                                            <small
                                                className="d-block text-end">R$ {(pedidos.nota[0]?.faturamento ?? '0,00')}</small>
                                        </div>
                                    </th>
                                    <th id="th-6" style={{minWidth: 300}}>
                                        <div style={{backgroundColor: coresAbas.pagamento}}
                                             className='row justify-content-between rounded-top text-white mx-1 p-2'>
                                            <div className='col-auto'>Aguard. Pagamento</div>
                                            <div className='col-auto'>Qdt: {pedidos.pagamento.length}</div>
                                            <small
                                                className="d-block text-end">R$ {(pedidos.pagamento[0]?.faturamento ?? '0,00')}</small>
                                        </div>
                                    </th>
                                    <th id="th-7" style={{minWidth: 300}}>
                                        <div style={{backgroundColor: coresAbas.faturamento}}
                                             className='row bg-pink-600 justify-content-between rounded-top text-white mx-1 p-2'>
                                            <div className='col-auto'>Aguard. Faturamento</div>
                                            <div className='col-auto'>Qdt: {pedidos.faturamento.length}</div>
                                            <small
                                                className="d-block text-end">R$ {(pedidos.faturamento[0]?.faturamento ?? '0,00')}</small>
                                        </div>
                                    </th>
                                    <th id="th-8" style={{minWidth: 300}}>
                                        <div style={{backgroundColor: coresAbas.faturado}}
                                             className='row justify-content-between rounded-top text-white mx-1 p-2'>
                                            <div className='col-auto'>Faturado</div>
                                            <div className='col-auto'>Qdt: {pedidos.faturado.length}</div>
                                            <small
                                                className="d-block text-end">R$ {(pedidos.faturado[0]?.faturamento ?? '0,00')}</small>
                                        </div>
                                    </th>
                                    <th id="th-9" style={{minWidth: 300}}>
                                        <div style={{backgroundColor: 'rgba(59,189,13,0.6)'}}
                                             className='row bg-pink-600 justify-content-between rounded-top text-white mx-1 p-2'>
                                            <div className='col-auto'>Faturado à Vista</div>
                                            <div className='col-auto'>Qdt: {pedidos.faturado_vista.length}</div>
                                            <small
                                                className="d-block text-end">R$ {(pedidos.faturado_vista[0]?.faturamento ?? '0,00')}</small>
                                        </div>
                                    </th>
                                    <th id="th-10" style={{minWidth: 300}}>
                                        <div style={{backgroundColor: "#854787"}}
                                             className='row bg-pink-600 justify-content-between rounded-top text-white mx-1 p-2'>
                                            <div className='col-auto'>Faturado à Prazo</div>
                                            <div className='col-auto'>Qdt: {pedidos.faturado_prazo.length}</div>
                                            <small
                                                className="d-block text-end">R$ {(pedidos.faturado_prazo[0]?.faturamento ?? '0,00')}</small>
                                        </div>
                                    </th>
                                    <th id="th-11" style={{minWidth: 300}}>
                                        <div style={{backgroundColor: coresAbas.acompanhamento}}
                                             className='row justify-content-between rounded-top text-white mx-1 p-2'>
                                            <div className='col-auto'>Acompanhamento</div>
                                            <div className='col-auto'>Qdt: {pedidos.acompanhamento.length}</div>
                                            <small
                                                className="d-block text-end">R$ {(pedidos.acompanhamento[0]?.faturamento ?? '0,00')}</small>
                                        </div>
                                    </th>
                                    <th id="th-12" style={{minWidth: 300}}>
                                        <div style={{backgroundColor: coresAbas.entregue}}
                                             className='row justify-content-between rounded-top text-white mx-1 p-2'>
                                            <div className='col-auto'>Entregue</div>
                                            <div className='col-auto'>Qdt: {pedidos.entregue.length}</div>
                                            <small
                                                className="d-block text-end">R$ {(pedidos.entregue[0]?.faturamento ?? '0,00')}</small>
                                        </div>
                                    </th>
                                    <th id="th-13" style={{minWidth: 300}}>
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
                                        {pedidos.encomenda.map((dados) => {
                                            return (
                                                <CardEncomenda key={dados.id} dados={dados}
                                                               cor={coresAbas.encomenda}/>
                                            )
                                        })}
                                    </td>
                                    <td id="td-3" className='shadow-sm' style={{minWidth: 300}}>
                                        {pedidos.conferencia.map((dados) => {
                                            return (
                                                <ConferenciaCard key={dados.id} dados={dados}
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
                                        {pedidos.nota.map((dados) => {
                                            return (
                                                <CardBoleto key={dados.id} dados={dados}
                                                            cor={coresAbas.boleto}/>)
                                        })}
                                    </td>
                                        <td id="td-6" className='shadow-sm' style={{minWidth: 300}}>
                                            {pedidos.pagamento.map((dados) => {
                                                return (<CardPagamento key={dados.id} dados={dados}
                                                                       cor={coresAbas.pagamento}/>)
                                            })}
                                        </td>
                                        <td id="td-7" className='shadow-sm' style={{minWidth: 300}}>
                                    {pedidos.faturamento.map((dados) => {
                                        return (
                                            <CardFaturando key={dados.id} dados={dados}
                                                           cor={coresAbas.faturamento}/>)
                                    })}
                                </td>
                                <td id="td-8" className='shadow-sm' style={{minWidth: 300}}>
                                    {pedidos.faturado.map((dados) => {
                                        return (<CardFaturado key={dados.id} dados={dados}
                                                              cor={coresAbas.faturado}/>)
                                    })}
                                </td>
                                <td id="td-9" className='shadow-sm' style={{minWidth: 300}}>
                                    {pedidos.faturado_vista.map((dados) => {
                                        return (
                                            <CardFaturado key={dados.id} dados={dados}
                                                          cor={"rgba(59,189,13,0.6)"}/>)
                                    })}
                                </td>
                                <td id="td-10" className='shadow-sm' style={{minWidth: 300}}>
                                    {pedidos.faturado_prazo.map((dados) => {
                                        return (
                                            <CardFaturado key={dados.id} dados={dados}
                                                          cor={'#854787'}/>)
                                    })}
                                </td>
                                <td id="td-11" className='shadow-sm' style={{minWidth: 300}}>
                                    {pedidos.acompanhamento.map((dados) => {
                                        return (
                                            <CardEntregue key={dados.id} dados={dados} status="acompanhamento"
                                                          cor={coresAbas.acompanhamento}/>)
                                    })}
                                </td>
                                <td id="td-12" className='shadow-sm' style={{minWidth: 300}}>
                                    {pedidos.entregue.map((dados) => {
                                        return (<CardEntregue key={dados.id} dados={dados}
                                                              cor={coresAbas.entregue}/>)
                                    })}
                                </td>
                                <td id="td-13" className='shadow-sm' style={{minWidth: 300}}>
                                    {pedidos.cancelado.map((dados) => {
                                        return (
                                            <CardCancelado key={dados.id} dados={dados}
                                                           cor={coresAbas.cancelados}/>)
                                    })}
                                </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-auto pt-5 d-none d-md-block">
                <ScrollControlHorizontal lateral="d"/>
                </div>
                </div>
            }
            {carregando && <LinearProgress color="inherit"/>}
                </Layout>
                );
            }
