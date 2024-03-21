import Layout from "@/Layouts/VendedorLayout/LayoutConsultor";
import {useEffect, useState} from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {router} from "@inertiajs/react";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import CardTravelOutlinedIcon from "@mui/icons-material/CardTravelOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";

export default function ({coresPedidos}) {

    const [registrosPedidos, setRegistrosPedidos] = useState([]);
    const [registrosReunioes, setRegistrosReunioes] = useState([]);
    const [tipoSelecionado, setTipoSelecionado] = useState(['pedidos', 'reunioes', 'visitas', 'anotacoes']);

    const handleFormat = (event, newFormats) => setTipoSelecionado(newFormats);

    function buscarRegistros(tipos) {
        axios.post(route('consultor.calendario.registros', {tipos: tipoSelecionado}))
            .then(res => {
                setRegistrosPedidos(res.data.pedidos)
                setRegistrosReunioes(res.data.reunioes)
            })
    }

    useEffect(() => {
        buscarRegistros()
    }, [tipoSelecionado]);

    const months = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    const nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    const [activeDate, setActiveDate] = useState(new Date());
    const [matrix, setMatriz] = useState(generateMatrix());

    function generateMatrix() {
        let matrix = [];

        const year = activeDate.getFullYear();
        const month = activeDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        let maxDays = nDays[month];

        if (month === 1) { // ano bisexto
            if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
                maxDays += 1;
            }
        }

        let counter = 1;
        for (let row = 0; row < 6; row++) {
            matrix[row] = [];
            for (let col = 0; col < 7; col++) {
                matrix[row][col] = '';
                if (row === 0 && col >= firstDay) {
                    matrix[row][col] = counter++;
                } else if (row > 0 && counter <= maxDays) {
                    matrix[row][col] = counter++;
                }
            }
        }

        return matrix;
    }

    function mudarMes(n) {
        activeDate.setMonth(
            activeDate.getMonth() + n
        )
        setMatriz(generateMatrix())
    }

    const dataAtual = (new Date()).getDate()
    const mesAtual = (new Date()).getMonth()

    function corPedidos(valor) {
        switch (valor) {
            case 'revisar':
                return {backgroundColor: coresPedidos.reprovado};
            case 'conferencia':
                return {backgroundColor: coresPedidos.conferencia};
            case 'lancado':
                return {backgroundColor: coresPedidos.lancado};
            case 'aguardando_nota':
                return {backgroundColor: coresPedidos.boleto};
            case 'aguardando_pagamento':
                return {backgroundColor: coresPedidos.pagamento};
            case 'aguardando_faturamento':
                return {backgroundColor: coresPedidos.faturamento};
            case 'faturado':
                return {backgroundColor: coresPedidos.faturado};
            case 'acompanhamento':
                return {backgroundColor: coresPedidos.acompanhamento};
            case 'entregue':
                return {backgroundColor: coresPedidos.entregue};
            case 'cancelado':
                return {backgroundColor: coresPedidos.cancelados};
        }
    }

    return (
        <Layout titlePage="Agenda" menu="calendario-agenda">

            <div className="row mb-3">
                <div className="col-md-3">
                    <div className="row">
                        <div className="col-auto">
                            <button className="btn btn-link p-0 m-2" onClick={() => mudarMes(-1)}>
                                <ArrowBackIosIcon/>
                            </button>
                            <button className="btn btn-link p-0 m-0" onClick={() => mudarMes(1)}>
                                <ArrowForwardIosIcon/>
                            </button>
                        </div>
                        <div className="col-auto mt-2">
                            {months[activeDate.getMonth()]}/{activeDate.getFullYear()}
                        </div>
                    </div>
                </div>
                <div className="col-auto">
                    <a href={route('consultor.calendario.agenda.create')} className="btn btn-primary btn-sm">
                        Novo registro
                    </a>
                </div>
            </div>

            <div className="mb-4">
                <ToggleButtonGroup value={tipoSelecionado} onChange={handleFormat}>
                    <ToggleButton value="pedidos">
                        Pedidos
                    </ToggleButton>
                    <ToggleButton value="reunioes">
                        Reuniões
                    </ToggleButton>
                    <ToggleButton value="visitas">
                        Visitas
                    </ToggleButton>
                    <ToggleButton value="anotacoes">
                        Anotacões
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>

            <div className="mb-2">
                <small className="d-block text-muted">Status Pedidos</small>
                <small style={{backgroundColor: coresPedidos.reprovado}}
                       className="badge rounded-pill mb-2 me-2 text-white">
                    Reprovado
                </small>
                <small style={{backgroundColor: coresPedidos.conferencia}}
                       className="badge rounded-pill mb-2 me-2 text-white">
                    Conferência
                </small>
                <small style={{backgroundColor: coresPedidos.lancado}}
                       className="badge rounded-pill mb-2 me-2 text-white">
                    Lançado
                </small>
                <small style={{backgroundColor: coresPedidos.boleto}}
                       className="badge rounded-pill mb-2 me-2 text-white">
                    Nota/Boleto
                </small>
                <small style={{backgroundColor: coresPedidos.pagamento}}
                       className="badge rounded-pill mb-2 me-2 text-white">
                    Aguard. Pagamento
                </small>
                <small style={{backgroundColor: coresPedidos.faturamento}}
                       className="badge rounded-pill mb-2 me-2 text-white">
                    Aguard. Faturamento
                </small>
                <small style={{backgroundColor: coresPedidos.faturado}}
                       className="badge rounded-pill mb-2 me-2 text-white">
                    Faturado
                </small>
                <small style={{backgroundColor: coresPedidos.acompanhamento}}
                       className="badge rounded-pill mb-2 me-2 text-white">
                    Acompanhamento
                </small>
                <small style={{backgroundColor: coresPedidos.entregue}}
                       className="badge rounded-pill mb-2 me-2 text-white">
                    Entregue
                </small>
            </div>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                    <tr className="text-center ">
                        <th className="border text-sm text-danger" style={{width: '14.28%'}}>DOM</th>
                        <th className="border text-sm">SEG</th>
                        <th className="border text-sm" style={{width: '14.28%'}}>TER</th>
                        <th className="border text-sm" style={{width: '14.28%'}}>QUA</th>
                        <th className="border text-sm" style={{width: '14.28%'}}>QUI</th>
                        <th className="border text-sm" style={{width: '14.28%'}}>SEX</th>
                        <th className="border text-sm" style={{width: '14.28%'}}>SAB</th>
                    </tr>
                    </thead>
                    <tbody className="align-text-top">
                    {matrix.map((row, indexRow) => {
                        return (
                            <tr key={indexRow}>
                                {row.map((dia, indexCol) => {
                                    let pedidos = []

                                    function pedidosPrazo() {
                                        try {
                                            pedidos.push(registrosPedidos[activeDate.getFullYear()][activeDate.getMonth() + 1][dia])
                                        } catch (e) {
                                        }
                                        return pedidos[0] &&
                                            <span className="d-block border shadow p-1 border-success rounded">
                                            Fim Prazo Pedidos:<br/>
                                                {pedidos[0]?.map((dado, index) => {
                                                    return (
                                                        <span key={index} className="badge m-1"
                                                              style={corPedidos(dado.status)}>
                                                         <a className="text-white"
                                                            href={route('consultor.pedidos.show', dado.id)}>#{dado.id}</a>
                                                     </span>
                                                    )
                                                })}
                                        </span>
                                    }

                                    let registroReunioes = []
                                    let registroVisitas = []
                                    let registroAnotacoes = []

                                    function infos(item, Icon) {
                                        return (<>
                                            <div className="row">
                                                <div className="col">
                                                    <small><Icon sx={{fontSize: 15}}/> {item.categoria}</small>
                                                </div>
                                                <div className="col-auto text-end">


                                                </div>
                                            </div>
                                            {item.status === 'novo' ?
                                                <div className="d-block text-end mb-2"><span className="badge bg-success">{item.status_nome}</span></div> :
                                                <small className="d-block text-end mb-2"><b>{item.status_nome}</b></small>
                                            }
                                            <span className="d-block text-center"><b>{item.titulo}</b></span>
                                            <small className="d-block text-muted mb-2 text-center">{item.data}</small>
                                            <span className="d-block text-start mb-2">{item.msg}</span>
                                            <small className="d-block text-end font-italic"><b>{item.autor}</b></small>
                                        </>)
                                    }

                                    function avisosCalendarioTag() {
                                        try {
                                            registroReunioes.push(registrosReunioes[activeDate.getFullYear()][activeDate.getMonth() + 1][dia]['reuniao'])
                                            registroVisitas.push(registrosReunioes[activeDate.getFullYear()][activeDate.getMonth() + 1][dia]['visita'])
                                            registroAnotacoes.push(registrosReunioes[activeDate.getFullYear()][activeDate.getMonth() + 1][dia]['anotacoes'])
                                        } catch (e) {
                                        }

                                        const reunioes = registroReunioes[0]?.map((item) => {
                                            return (
                                                <div key={item.id}
                                                     onClick={() => router.get(route('consultor.calendario.agenda.show', item.id))}
                                                     className="mb-3 p-2 border border-warning rounded text-wrap shadow cursor-pointer">
                                                    {infos(item, GroupsOutlinedIcon)}
                                                </div>
                                            )
                                        })

                                        const visitas = registroVisitas[0]?.map((item, index) => {
                                            return (
                                                <div key={item.id}
                                                     onClick={() => router.get(route('consultor.calendario.agenda.show', item.id))}
                                                     className="mb-3 p-2 border border-info rounded text-wrap shadow cursor-pointer">
                                                    {infos(item, CardTravelOutlinedIcon)}
                                                </div>
                                            )
                                        })

                                        const anotacoes = registroAnotacoes[0]?.map((item, index) => {
                                            return (
                                                <div key={item.id}
                                                     onClick={() => router.get(route('consultor.calendario.agenda.show', item.id))}
                                                     className="mb-3 p-2 border border-dark rounded text-wrap shadow cursor-pointer">
                                                    {infos(item, ArticleOutlinedIcon)}
                                                </div>
                                            )
                                        })

                                        return ([reunioes, visitas, anotacoes])
                                    }

                                    return (
                                        <td key={indexCol} className="border text-wrap">
                                            <div className="row mb-4 text-wrap">
                                                <span
                                                    className={(indexCol === 0 ? 'text-danger ' : '') + "d-block text-end text-wrap fs-6 mb-2"}>
                                                    {dia === dataAtual && activeDate.getMonth() === mesAtual ?
                                                        <span className="badge rounded-pill bg-dark">{dia}</span> : dia}
                                                </span>
                                                <span className="m-1">
                                                    {avisosCalendarioTag()}
                                                    {pedidosPrazo()}
                                                </span>
                                            </div>
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}
