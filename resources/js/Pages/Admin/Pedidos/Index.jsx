import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import Layout from "@/Layouts/Layout";

import CardPedidos from './Cards/Card';

import pesquisaCards from "@/Helpers/pesquisaCards";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import {usePage} from "@inertiajs/react";
import LinearProgress from '@mui/material/LinearProgress';

import Fab from '@mui/material/Fab';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ScrollContainer from "react-indiana-drag-scroll";

import convertFloatToMoney from "@/Helpers/converterDataHorario";
import avancarStatus from "@/Pages/Admin/Pedidos/Cards/AvancarStatus.jsx";

export default function Pedidos({fornecedores, setores, permissoesStatus, coresAbas, goCard}) {
    const [pedidos, setPedidos] = useState()
    const [modelo, setModelo] = useState()
    const [carregando, setCarregando] = useState(true)
    const [setorSelecionado, setSetorSelecionado] = useState()
    const [fornecedorSelecionado, setFornecedorSelecionado] = useState()
    const [qtdPedidos, setQtdPedidos] = useState(0)
    const scrollRef = useRef(null);

    const modelo1 = useMemo(() => modelo === 1 || modelo === null, [modelo]);
    const modelo2 = useMemo(() => modelo === 2 || modelo === null, [modelo]);

    const atualizarPagina = useCallback((fornecedorId, setorId) => {
        setCarregando(true);
        setPedidos(undefined);
        setSetorSelecionado(setorId);
        setFornecedorSelecionado(fornecedorId);

        axios.get(route('admin.pedidos-cards', {setor: setorId, fornecedor: fornecedorId}))
            .then(res => {
                setPedidos(res.data.pedidos);
                setModelo(res.data.modelo);
                setQtdPedidos(res.data.pedidos.total);
            }).finally(() => setCarregando(false));
    }, []);

    useEffect(function () {
        setCarregando(true)
        setPedidos()
        axios.get(route('admin.pedidos-cards'))
            .then(res => {
                setPedidos(res.data.pedidos)
                setModelo(res.data.modelo)
                setCarregando(false)
                setSetorSelecionado(res.data.setor)
                setFornecedorSelecionado()
                setQtdPedidos(res.data.pedidos.total)
            })
    }, [])

    useEffect(() => {
        if (pedidos && goCard) goCardPosicao()
    }, [pedidos]);

    const goCardPosicao = useCallback(() => {
        const elemento = document.getElementById("card-id-" + goCard);
        if (elemento) elemento.scrollIntoView({block: 'center', inline: 'center', behavior: 'smooth'});
    }, [goCard]);

    const totalPedidos = useCallback((status) => {
        return convertFloatToMoney(pedidos[status].reduce((acc, produto) => acc + produto.preco, 0));
    }, [pedidos]);

    return (
        <Layout titlePage="Quadro de Pedidos" menu="pedidos" submenu="pedidos-lista" empty>

            <div className="row justify-content-between mb-4">
                <div className="col-md-5">
                    <div className="row">
                        <div className="col-md-4">
                            <TextField select label="Setores" size="small" fullWidth
                                       defaultValue="" value={setorSelecionado ?? ''}
                                       onChange={e => atualizarPagina(null, e.target.value)}>
                                <MenuItem value="todos">Todos</MenuItem>
                                {setores.map(setor => <MenuItem key={setor.id} value={setor.id}>{setor.nome}</MenuItem>)}
                            </TextField>
                        </div>
                        <div className="col-md-4">
                            <TextField select size="small" label="Fornecedores" fullWidth
                                       defaultValue="" value={fornecedorSelecionado ?? ''}
                                       onChange={e => atualizarPagina(e.target.value, '')}>
                                <MenuItem value="">Todos</MenuItem>
                                {fornecedores.map((item, index) => <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>)}
                            </TextField>
                        </div>
                    </div>
                </div>

                <div className="col-md-5">
                    {/*Pesquisa*/}
                    <div className="row justify-content-end">
                        <div className="col-auto pt-2">
                            <small className="text-muted">Qtd. Total Pedidos: {qtdPedidos}</small>
                        </div>
                        <div className="col-md-6 text-end">
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

            {/*/!*Tabela*!/*/}
            {pedidos &&
                <ScrollContainer hideScrollbars={false}>
                    <div style={{height: 'calc(100vh - 11rem)'}}>
                        <table id="table-cards" className="mx-1" ref={scrollRef}>
                            <thead>
                            <tr>
                                {permissoesStatus.some(item => item === 'revisar') && <th id="th-1" style={{minWidth: 300}} className="sticky-top ps-2">
                                    <div style={{backgroundColor: coresAbas.reprovado}}
                                         className='row justify-content-between rounded-top text-white me-1 p-2'>
                                        <div className='col-auto'>Reprovados</div>
                                        <div className='col-auto'>Qdt: {pedidos.reprovado.length}</div>
                                        <small className="d-block text-end">R$ {totalPedidos('reprovado')}</small>
                                    </div>
                                </th>}
                                {permissoesStatus.some(item => item === 'encomenda') && modelo2 &&
                                    <th id="th-2" style={{minWidth: 300}} className="sticky-top">
                                        <div style={{backgroundColor: coresAbas.encomenda}}
                                             className='row justify-content-between rounded-top text-white mx-1 p-2'>
                                            <div className='col-auto'>Encomenda</div>
                                            <div className='col-auto'>Qdt: {pedidos.encomenda.length}</div>
                                            <small className="d-block text-end">R$ {totalPedidos('encomenda')}</small>
                                        </div>
                                    </th>}
                                {permissoesStatus.some(item => item === 'conferencia') && <th id="th-3" style={{minWidth: 300}} className="sticky-top">
                                    <div style={{backgroundColor: coresAbas.conferencia}}
                                         className='row justify-content-between rounded-top text-white mx-1 p-2'>
                                        <div className='col-auto'>Conferência</div>
                                        <div className='col-auto'>Qdt: {pedidos.conferencia.length}</div>
                                        <small className="d-block text-end">R$ {totalPedidos('conferencia')}</small>
                                    </div>
                                </th>}
                                {permissoesStatus.some(item => item === 'lancado') && <th id="th-4" style={{minWidth: 300}} className="sticky-top">
                                    <div style={{backgroundColor: coresAbas.lancado}}
                                         className='row justify-content-between rounded-top text-white mx-1 p-2'>
                                        <div className='col-auto'>Lançado</div>
                                        <div className='col-auto'>Qdt: {pedidos.lancado.length}</div>
                                        <small className="d-block text-end">R$ {totalPedidos('lancado')}</small>
                                    </div>
                                </th>}
                                {permissoesStatus.some(item => item === 'aguardando_nota') && modelo1 &&
                                    <th id="th-5" style={{minWidth: 300}} className="sticky-top">
                                        <div style={{backgroundColor: coresAbas.boleto}}
                                             className='row justify-content-between rounded-top text-white mx-1 p-2'>
                                            <div className='col-auto'>Aguard. Nota/Boleto</div>
                                            <div className='col-auto'>Qdt: {pedidos.nota.length}</div>
                                            <small className="d-block text-end">R$ {totalPedidos('nota')}</small>
                                        </div>
                                    </th>}
                                {permissoesStatus.some(item => item === 'aguardando_pagamento') && modelo1 &&
                                    <th id="th-6" style={{minWidth: 300}} className="sticky-top">
                                        <div style={{backgroundColor: coresAbas.pagamento}}
                                             className='row justify-content-between rounded-top text-white mx-1 p-2'>
                                            <div className='col-auto'>Aguard. Pagamento</div>
                                            <div className='col-auto'>Qdt: {pedidos.pagamento.length}</div>
                                            <small className="d-block text-end">R$ {totalPedidos('pagamento')}</small>
                                        </div>
                                    </th>}
                                {permissoesStatus.some(item => item === 'aguardando_faturamento') && modelo1 &&
                                    <th id="th-7" style={{minWidth: 300}} className="sticky-top">
                                        <div style={{backgroundColor: coresAbas.faturamento}}
                                             className='row bg-pink-600 justify-content-between rounded-top text-white mx-1 p-2'>
                                            <div className='col-auto'>Aguard. Faturamento</div>
                                            <div className='col-auto'>Qdt: {pedidos.faturamento.length}</div>
                                            <small className="d-block text-end">R$ {totalPedidos('faturamento')}</small>
                                        </div>
                                    </th>}
                                {permissoesStatus.some(item => item === 'faturado') && modelo1 &&
                                    <th id="th-8" style={{minWidth: 300}} className="sticky-top">
                                        <div style={{backgroundColor: coresAbas.faturado}}
                                             className='row justify-content-between rounded-top text-white mx-1 p-2'>
                                            <div className='col-auto'>Faturado</div>
                                            <div className='col-auto'>Qdt: {pedidos.faturado.length}</div>
                                            <small className="d-block text-end">R$ {totalPedidos('faturado')}</small>
                                        </div>
                                    </th>}
                                {permissoesStatus.some(item => item === 'faturado_vista') && modelo2 &&
                                    <th id="th-9" style={{minWidth: 300}} className="sticky-top">
                                        <div style={{backgroundColor: '#3B087AFF'}}
                                             className='row bg-pink-600 justify-content-between rounded-top text-white mx-1 p-2'>
                                            <div className='col-auto'>Faturado à Vista</div>
                                            <div className='col-auto'>Qdt: {pedidos.faturado_vista.length}</div>
                                            <small className="d-block text-end">R$ {totalPedidos('faturado_vista')}</small>
                                        </div>
                                    </th>}
                                {permissoesStatus.some(item => item === 'faturado_prazo') && modelo2 &&
                                    <th id="th-10" style={{minWidth: 300}} className="sticky-top">
                                        <div style={{backgroundColor: "#b81919"}}
                                             className='row bg-pink-600 justify-content-between rounded-top text-white mx-1 p-2'>
                                            <div className='col-auto'>Faturado à Prazo</div>
                                            <div className='col-auto'>Qdt: {pedidos.faturado_prazo.length}</div>
                                            <small className="d-block text-end">R$ {totalPedidos('faturado_prazo')}</small>
                                        </div>
                                    </th>}
                                {permissoesStatus.some(item => item === 'acompanhamento') && modelo1 &&
                                    <th id="th-11" style={{minWidth: 300}} className="sticky-top">
                                        <div style={{backgroundColor: coresAbas.acompanhamento}}
                                             className='row justify-content-between rounded-top text-white mx-1 p-2'>
                                            <div className='col-auto'>Acompanhamento</div>
                                            <div className='col-auto'>Qdt: {pedidos.acompanhamento.length}</div>
                                            <small className="d-block text-end">R$ {totalPedidos('acompanhamento')}</small>
                                        </div>
                                    </th>}
                                {permissoesStatus.some(item => item === 'entregue') && <th id="th-12" style={{minWidth: 300}} className="sticky-top">
                                    <div style={{backgroundColor: coresAbas.entregue}}
                                         className='row justify-content-between rounded-top text-white mx-1 p-2'>
                                        <div className='col-auto'>Entregue</div>
                                        <div className='col-auto'>Qdt: {pedidos.entregue.length}</div>
                                        <small className="d-block text-end">R$ {totalPedidos('entregue')}</small>
                                    </div>
                                </th>}
                                {permissoesStatus.some(item => item === 'cancelado') && <th id="th-13" style={{minWidth: 300}} className="sticky-top">
                                    <div style={{backgroundColor: coresAbas.cancelados}}
                                         className='row justify-content-between rounded-top text-white mx-1 p-2'>
                                        <div className='col-auto'>Cancelados</div>
                                        <div className='col-auto'>Qdt: {pedidos.cancelado.length}</div>
                                        <small className="d-block text-end">-</small>
                                    </div>
                                </th>}
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="align-top">
                                {permissoesStatus.some(item => item === 'revisar') && <td id="td-1" style={{minWidth: 300}}>
                                    {pedidos.reprovado.map((dados) => {
                                        return <CardPedidos key={dados.id} dados={dados} status="reprovado" cor={coresAbas.reprovado}
                                                            permissoesStatus={permissoesStatus}/>
                                    })}
                                </td>}
                                {permissoesStatus.some(item => item === 'encomenda') && modelo2 &&
                                    <td id="td-2" style={{minWidth: 300}}>
                                        {pedidos.encomenda.map((dados) => {
                                            return <CardPedidos key={dados.id} dados={dados} status="encomenda" cor={coresAbas.encomenda}
                                                                permissoesStatus={permissoesStatus}/>
                                        })}
                                    </td>
                                }
                                {permissoesStatus.some(item => item === 'conferencia') && <td id="td-3" style={{minWidth: 300}}>
                                    {pedidos.conferencia.map((dados) =>
                                        <CardPedidos key={dados.id} status="conferencia" dados={dados} cor={coresAbas.conferencia} permissoesStatus={permissoesStatus}/>
                                    )}
                                </td>}
                                {permissoesStatus.some(item => item === 'lancado') && <td id="td-4" style={{minWidth: 300}}>
                                    {pedidos.lancado.map((dados) => {
                                        return <CardPedidos key={dados.id} status="lancado" dados={dados} cor={coresAbas.lancado} permissoesStatus={permissoesStatus}/>
                                    })}
                                </td>}
                                {permissoesStatus.some(item => item === 'aguardando_nota') && modelo1 &&
                                    <td id="td-5" style={{minWidth: 300}}>
                                        {pedidos.nota.map((dados) => {
                                            return <CardPedidos key={dados.id} dados={dados} status="nota" cor={coresAbas.boleto} permissoesStatus={permissoesStatus}/>
                                        })}
                                    </td>}
                                {permissoesStatus.some(item => item === 'aguardando_pagamento') && modelo1 &&
                                    <td id="td-6" style={{minWidth: 300}}>
                                        {pedidos.pagamento.map((dados) => {
                                            return <CardPedidos key={dados.id} dados={dados} status="pagamento" cor={coresAbas.pagamento}
                                                                permissoesStatus={permissoesStatus}/>
                                        })}
                                    </td>}
                                {permissoesStatus.some(item => item === 'aguardando_faturamento') && modelo1 &&
                                    <td id="td-7" style={{minWidth: 300}}>
                                        {pedidos.faturamento.map((dados) => {
                                            return <CardPedidos key={dados.id} dados={dados} status="faturamento" cor={coresAbas.faturamento}
                                                                permissoesStatus={permissoesStatus}/>
                                        })}
                                    </td>}
                                {permissoesStatus.some(item => item === 'faturado') && modelo1 &&
                                    <td id="td-8" style={{minWidth: 300}}>
                                        {pedidos.faturado.map((dados) => {
                                            return <CardPedidos key={dados.id} dados={dados} status="faturado" cor={coresAbas.faturado}
                                                                permissoesStatus={permissoesStatus}/>
                                        })}
                                    </td>}
                                {permissoesStatus.some(item => item === 'faturado_vista') && modelo2 &&
                                    <td id="td-9" style={{minWidth: 300}}>
                                        {pedidos.faturado_vista.map((dados) => {
                                            return (
                                                <CardPedidos key={dados.id} dados={dados} status="faturado_vista" cor={"#3B087A"} permissoesStatus={permissoesStatus}/>)
                                        })}
                                    </td>}
                                {permissoesStatus.some(item => item === 'faturado_prazo') && modelo2 &&
                                    <td id="td-10" style={{minWidth: 300}}>
                                        {pedidos.faturado_prazo.map((dados) => {
                                            return <CardPedidos key={dados.id} dados={dados} status="faturado_prazo" cor={'#b81919'} permissoesStatus={permissoesStatus}/>
                                        })}
                                    </td>}
                                {permissoesStatus.some(item => item === 'acompanhamento') && modelo1 &&
                                    <td id="td-11" style={{minWidth: 300}}>
                                        {pedidos.acompanhamento.map((dados) => {
                                            return <CardPedidos key={dados.id} dados={dados} status="acompanhamento" cor={coresAbas.acompanhamento}
                                                                permissoesStatus={permissoesStatus}/>
                                        })}
                                    </td>}
                                {permissoesStatus.some(item => item === 'entregue') && <td id="td-12" style={{minWidth: 300}}>
                                    {pedidos.entregue.map((dados) => {
                                        return <CardPedidos key={dados.id} dados={dados} status="entregue" cor={coresAbas.entregue} permissoesStatus={permissoesStatus}/>
                                    })}
                                </td>}
                                {permissoesStatus.some(item => item === 'cancelado') && <td id="td-13" style={{minWidth: 300}}>
                                    {pedidos.cancelado.map((dados) => {
                                        return <CardPedidos key={dados.id} dados={dados} status="cancelado" cor={coresAbas.cancelados}
                                                            permissoesStatus={permissoesStatus}/>
                                    })}
                                </td>}
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </ScrollContainer>
            }

            {carregando && <LinearProgress color="inherit"/>}

            <Fab size="small" color="default" sx={{
                position: 'fixed',
                bottom: 25,
                right: 40,
                zIndex: 1800
            }}
                 onClick={() => scrollRef.current.scrollIntoView({behavior: 'smooth', align: 'top'})}
            >
                <ArrowUpwardIcon/>
            </Fab>
        </Layout>
    );
}
