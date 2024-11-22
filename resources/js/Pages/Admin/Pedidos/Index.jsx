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
import {Stack, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";

const Head = ({nome, corAba, qtdPedidos, valorTotal, index}) => {
    return (
        <th id={`th-${index}`} className="sticky-top">
            <div style={{backgroundColor: corAba, width: 310}}
                 className='row justify-content-between rounded-top text-white mx-1 p-2'>
                <div className='col-auto'>{nome}</div>
                <div className='col-auto'>Qdt: {qtdPedidos}</div>
                <small className="d-block text-end">R$ {valorTotal}</small>
            </div>
        </th>
    )
}

export default function Pedidos({fornecedores, usuarios, setores, permissoesStatus, coresAbas, goCard}) {
    const [pedidos, setPedidos] = useState()
    const [modelo, setModelo] = useState()
    const [carregando, setCarregando] = useState(true)
    const [setorSelecionado, setSetorSelecionado] = useState()
    const [fornecedorSelecionado, setFornecedorSelecionado] = useState()
    const [usuarioSelecionado, setUsuarioSelecionado] = useState()
    const [qtdPedidos, setQtdPedidos] = useState(0)
    const scrollRef = useRef(null);

    const modelo1 = useMemo(() => modelo === 1 || modelo === null, [modelo]);
    const modelo2 = useMemo(() => modelo === 2 || modelo === null, [modelo]);

    const atualizarPagina = useCallback((fornecedorId, setorId, userId) => {
        setCarregando(true);
        setPedidos(undefined);
        setSetorSelecionado(setorId);
        setFornecedorSelecionado(fornecedorId);
        setUsuarioSelecionado(userId);

        axios.get(route('admin.pedidos-cards', {setor: setorId, fornecedor: fornecedorId, usuario: userId}))
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
                <div className="col-md-7">
                    <div className="row">
                        <div className="col-md-4">
                            <TextField select label="Setores" size="small" fullWidth
                                       value={setorSelecionado ?? ''}
                                       onChange={e => atualizarPagina(fornecedorSelecionado, e.target.value, usuarioSelecionado)}>
                                <MenuItem value="todos">Todos</MenuItem>
                                {setores.map(setor => <MenuItem key={setor.id} value={setor.id}>{setor.nome}</MenuItem>)}
                            </TextField>
                        </div>
                        <div className="col-md-4">
                            <TextField select size="small" label="Fornecedores" fullWidth
                                       value={fornecedorSelecionado ?? ''}
                                       onChange={e => atualizarPagina(e.target.value, setorSelecionado, usuarioSelecionado)}>
                                <MenuItem value="">Todos</MenuItem>
                                {fornecedores.map((item, index) => <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>)}
                            </TextField>
                        </div>
                        <div className="col-md-4">
                            <TextField select size="small" label="Consultor" fullWidth
                                       value={usuarioSelecionado ?? ''}
                                       onChange={e => atualizarPagina(fornecedorSelecionado, setorSelecionado, e.target.value)}>
                                <MenuItem value="">Todos</MenuItem>
                                {usuarios.map(item => (<MenuItem key={item.id} value={item.id}>
                                    <Stack direction="row" spacing={1}>
                                        <Avatar src={item.foto} sx={{width: 20, height: 20}}/>
                                        <Typography>{item.nome}</Typography>
                                    </Stack>
                                </MenuItem>))}
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
                    <div style={{height: 'calc(100vh - 12rem)'}}>
                        <table id="table-cards" className="mx-1" ref={scrollRef}>
                            <thead>
                            <tr>
                                {permissoesStatus.some(item => item === 'revisar') && (
                                    <Head nome="Reprovados" corAba={coresAbas.reprovado} index={1} qtdPedidos={pedidos.reprovado.length}
                                          valorTotal={totalPedidos('reprovado')}/>
                                )}
                                {permissoesStatus.some(item => item === 'vencido') &&
                                    <Head nome="Vencido" corAba="purple" index={2} qtdPedidos={pedidos.vencido.length} valorTotal={totalPedidos('vencido')}/>
                                }
                                {permissoesStatus.some(item => item === 'encomenda') && modelo2 &&
                                    <Head nome="Encomenda" corAba={coresAbas.encomenda} index={3} qtdPedidos={pedidos.encomenda.length}
                                          valorTotal={totalPedidos('encomenda')}/>
                                }
                                {permissoesStatus.some(item => item === 'conferencia') && (
                                    <Head nome="Conferência" corAba={coresAbas.conferencia} index={4} qtdPedidos={pedidos.conferencia.length}
                                          valorTotal={totalPedidos('conferencia')}/>
                                )}
                                {permissoesStatus.some(item => item === 'lancado') && (
                                    <Head nome="Lançado" corAba={coresAbas.lancado} index={5} qtdPedidos={pedidos.lancado.length} valorTotal={totalPedidos('lancado')}/>
                                )}
                                {permissoesStatus.some(item => item === 'aguardando_nota') && modelo1 &&
                                    <Head nome="Aguard. Nota/Boleto" corAba={coresAbas.boleto} index={6} qtdPedidos={pedidos.nota.length}
                                          valorTotal={totalPedidos('nota')}/>
                                }
                                {permissoesStatus.some(item => item === 'aguardando_pagamento') && modelo1 &&
                                    <Head nome="Aguard. Pagamento" corAba={coresAbas.pagamento} index={7} qtdPedidos={pedidos.pagamento.length}
                                          valorTotal={totalPedidos('pagamento')}/>
                                }
                                {permissoesStatus.some(item => item === 'aguardando_faturamento') && modelo1 &&
                                    <Head nome="Aguard. Faturamento" corAba={coresAbas.faturamento} index={8} qtdPedidos={pedidos.faturamento.length}
                                          valorTotal={totalPedidos('faturamento')}/>
                                }
                                {permissoesStatus.some(item => item === 'faturado') && modelo1 &&
                                    <Head nome="Faturado" corAba={coresAbas.faturado} index={9} qtdPedidos={pedidos.faturado.length}
                                          valorTotal={totalPedidos('faturado')}/>
                                }
                                {permissoesStatus.some(item => item === 'faturado_vista') && modelo2 &&
                                    <Head nome="Faturado à Vista" corAba="#3B087AFF" index={10} qtdPedidos={pedidos.faturado_vista.length}
                                          valorTotal={totalPedidos('faturado_vista')}/>
                                }
                                {permissoesStatus.some(item => item === 'faturado_prazo') && modelo2 &&
                                    <Head nome="Faturado à Prazo" corAba="#B81919" index={11} qtdPedidos={pedidos.faturado_prazo.length}
                                          valorTotal={totalPedidos('faturado_prazo')}/>
                                }
                                {permissoesStatus.some(item => item === 'aguardando_rastreio') && modelo1 &&
                                    <Head nome="Aguardando Rastreio" corAba="blue" index={12} qtdPedidos={pedidos.aguardando_rastreio.length}
                                          valorTotal={totalPedidos('aguardando_rastreio')}/>
                                }
                                {permissoesStatus.some(item => item === 'acompanhamento') && modelo1 &&
                                    <Head nome="Acompanhamento" corAba={coresAbas.acompanhamento} index={13} qtdPedidos={pedidos.acompanhamento.length}
                                          valorTotal={totalPedidos('acompanhamento')}/>
                                }
                                {permissoesStatus.some(item => item === 'entregue') && (
                                    <Head nome="Entregue" corAba={coresAbas.entregue} index={14} qtdPedidos={pedidos.entregue.length}
                                          valorTotal={totalPedidos('entregue')}/>
                                )}
                                {permissoesStatus.some(item => item === 'cancelado') &&
                                    <Head nome="Cancelados" corAba={coresAbas.cancelados} index={15} qtdPedidos={pedidos.cancelado.length}
                                          valorTotal={totalPedidos('cancelado')}/>
                                }
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="align-top">
                                {permissoesStatus.some(item => item === 'revisar') && <td id="td-1">
                                    {pedidos.reprovado.map((dados) => {
                                        return <CardPedidos key={dados.id} dados={dados} status="reprovado" cor={coresAbas.reprovado}
                                                            permissoesStatus={permissoesStatus}/>
                                    })}
                                </td>}
                                {permissoesStatus.some(item => item === 'vencido') &&
                                    <td id="td-2">
                                        {pedidos.vencido.map((dados) => {
                                            return <CardPedidos key={dados.id} dados={dados} status="vencido" cor="purple"
                                                                permissoesStatus={permissoesStatus}/>
                                        })}
                                    </td>
                                }
                                {permissoesStatus.some(item => item === 'encomenda') && modelo2 &&
                                    <td id="td-3">
                                        {pedidos.encomenda.map((dados) => {
                                            return <CardPedidos key={dados.id} dados={dados} status="encomenda" cor={coresAbas.encomenda}
                                                                permissoesStatus={permissoesStatus}/>
                                        })}
                                    </td>
                                }
                                {permissoesStatus.some(item => item === 'conferencia') && <td id="td-4">
                                    {pedidos.conferencia.map((dados) =>
                                        <CardPedidos key={dados.id} status="conferencia" dados={dados} cor={coresAbas.conferencia} permissoesStatus={permissoesStatus}/>
                                    )}
                                </td>}
                                {permissoesStatus.some(item => item === 'lancado') && <td id="td-5">
                                    {pedidos.lancado.map((dados) => {
                                        return <CardPedidos key={dados.id} status="lancado" dados={dados} cor={coresAbas.lancado} permissoesStatus={permissoesStatus}/>
                                    })}
                                </td>}
                                {permissoesStatus.some(item => item === 'aguardando_nota') && modelo1 &&
                                    <td id="td-6">
                                        {pedidos.nota.map((dados) => {
                                            return <CardPedidos key={dados.id} dados={dados} status="nota" cor={coresAbas.boleto} permissoesStatus={permissoesStatus}/>
                                        })}
                                    </td>}
                                {permissoesStatus.some(item => item === 'aguardando_pagamento') && modelo1 &&
                                    <td id="td-7">
                                        {pedidos.pagamento.map((dados) => {
                                            return <CardPedidos key={dados.id} dados={dados} status="pagamento" cor={coresAbas.pagamento}
                                                                permissoesStatus={permissoesStatus}/>
                                        })}
                                    </td>}
                                {permissoesStatus.some(item => item === 'aguardando_faturamento') && modelo1 &&
                                    <td id="td-8">
                                        {pedidos.faturamento.map((dados) => {
                                            return <CardPedidos key={dados.id} dados={dados} status="faturamento" cor={coresAbas.faturamento}
                                                                permissoesStatus={permissoesStatus}/>
                                        })}
                                    </td>}
                                {permissoesStatus.some(item => item === 'faturado') && modelo1 &&
                                    <td id="td-9">
                                        {pedidos.faturado.map((dados) => {
                                            return <CardPedidos key={dados.id} dados={dados} status="faturado" cor={coresAbas.faturado}
                                                                permissoesStatus={permissoesStatus}/>
                                        })}
                                    </td>}
                                {permissoesStatus.some(item => item === 'faturado_vista') && modelo2 &&
                                    <td id="td-10">
                                        {pedidos.faturado_vista.map((dados) => {
                                            return (
                                                <CardPedidos key={dados.id} dados={dados} status="faturado_vista" cor={"#3B087A"} permissoesStatus={permissoesStatus}/>)
                                        })}
                                    </td>}
                                {permissoesStatus.some(item => item === 'faturado_prazo') && modelo2 &&
                                    <td id="td-11">
                                        {pedidos.faturado_prazo.map((dados) => {
                                            return <CardPedidos key={dados.id} dados={dados} status="faturado_prazo" cor={'#b81919'} permissoesStatus={permissoesStatus}/>
                                        })}
                                    </td>}
                                {permissoesStatus.some(item => item === 'aguardando_rastreio') && modelo1 &&
                                    <td id="td-12">
                                        {pedidos.aguardando_rastreio.map((dados) => {
                                            return <CardPedidos key={dados.id} dados={dados} status="aguardando_rastreio" cor="blue"
                                                                permissoesStatus={permissoesStatus}/>
                                        })}
                                    </td>}
                                {permissoesStatus.some(item => item === 'acompanhamento') && modelo1 &&
                                    <td id="td-13">
                                        {pedidos.acompanhamento.map((dados) => {
                                            return <CardPedidos key={dados.id} dados={dados} status="acompanhamento" cor={coresAbas.acompanhamento}
                                                                permissoesStatus={permissoesStatus}/>
                                        })}
                                    </td>}
                                {permissoesStatus.some(item => item === 'entregue') && <td id="td-14">
                                    {pedidos.entregue.map((dados) => {
                                        return <CardPedidos key={dados.id} dados={dados} status="entregue" cor={coresAbas.entregue} permissoesStatus={permissoesStatus}/>
                                    })}
                                </td>}
                                {permissoesStatus.some(item => item === 'cancelado') && <td id="td-15">
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
