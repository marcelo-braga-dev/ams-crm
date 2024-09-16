import Layout from "@/Layouts/Layout";
import React, {useEffect, useState} from "react";
import Switch from "@mui/material/Switch";
import {Card, TextField, Typography} from "@mui/material";
import {router} from "@inertiajs/react";

import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import FormControlLabel from '@mui/material/FormControlLabel';

import convertFloatToMoney from "@/Helpers/converterDataHorario";
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";

import Filtros from "./Index/Filtros.jsx"
import CreateDialog from "./Create/CreateDialog.jsx"
import CardTitle from "@/Components/Cards/CardTitle.jsx";
import {ArrowDownShort, ArrowUpShort, ListCheck} from "react-bootstrap-icons";
import ProximosPagamentos from "@/Pages/Admin/Financeiro/FluxoCaixa/Index/ProximosPagamentos.jsx";

export default function ({fornecedores, franquias, empresas}) {
    const [filtros, setFiltros] = useState({
        tipo: '',
        status: '',
        fornecedor: '',
        franquia: '',
        empresa: '',
        periodoInicio: '',
        periodoFim: '',
    })

    const [dados, setDados] = useState([])
    const [registrosSalarios, setRegistrosSalarios] = useState([])
    const [chaveStatus, setChaveStatus] = useState()
    const [idStatus, setIdStatus] = useState()

    const [atualizarStatus, setAtualizarStatus] = useState(false)

    const [totalSaida, setTotalSaida] = useState(0)
    const [totalEntrada, setTotalEntrada] = useState(0)

    const alterarStatus = (status) => {
        axios.post(route('admin.financeiro.fluxo-caixa.alterar-status', {id: idStatus, status: status}))
        setChaveStatus(undefined)
        setAtualizarStatus(res => !res)
    }

    router.on('success', () => window.location.reload())

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(route('admin.financeiro.registros', {...filtros}));

                setDados(response.data.registros);
                setRegistrosSalarios(response.data.salarios.registros);
                setTotalEntrada(0);
                setTotalSaida(0);

                Object.values(response.data.registros).forEach(a =>
                    a.forEach(item => {
                        if (item.tipo === 'entrada') {
                            setTotalEntrada(prevState => prevState + item.valor_float);
                        } else {
                            setTotalSaida(prevState => prevState + item.valor_float);
                        }
                    })
                );

                setTotalSaida(prevState => prevState + response.data.salarios.total);
            } catch (error) {
                console.error('Erro ao buscar registros:', error);
            }
        };

        fetchData();
    }, [filtros, atualizarStatus]);


    const dias = Array.from({length: 31}, (_, i) => i + 1);
    let fluxo = 0

    return (
        <Layout titlePage="Fluxo de Caixa" menu="financeiro" submenu="fluxo-caixa">
            <CreateDialog/>

            <div className="mb-2 row justify-content-ce nter">
                <div className="col-md-8">
                    <Filtros filtros={filtros} setFiltros={setFiltros} empresas={empresas} franquias={franquias} fornecedores={fornecedores}/>
                </div>
                <div className="col-2">
                    <CardContainer>
                        <CardTitle icon={<ArrowUpShort size={28} color="green"/>} title={<Typography>R$ {convertFloatToMoney(totalEntrada)}</Typography>}/>
                    </CardContainer>
                </div>
                <div className="col-2">
                    <CardContainer>
                        <CardTitle icon={<ArrowDownShort size={28} color="red"/>} title={<Typography>R$ {convertFloatToMoney(totalSaida)}</Typography>}/>
                    </CardContainer>
                </div>
            </div>

            <div className="row">
                <div className="col-md-8">
                    <CardContainer>
                        <CardTitle title="Pagamentos Filtrados" icon={<ListCheck size={25} color="black"/>}/>
                        <CardBody>
                        </CardBody>
                    </CardContainer>
                </div>
                <div className="col-md-4">
                    <ProximosPagamentos/>
                </div>
            </div>

            {/*<CardEntradaFinanceiro/>*/}

            {dias.map((dia, index) => {
                    fluxo = 1
                    return (
                        <div key={index}>
                            {dados?.[dia]?.map((item) =>
                                <div key={item.id}>
                                    <Card className="mb-4 shadow"
                                          style={{
                                              borderLeft: '3px solid ' + (item.tipo === 'entrada' ? 'green' : 'red')
                                          }}>
                                        <div key={item.id}
                                             className={'row p-3 ' +
                                                 (item.status === 'pago' ? '' : (item.tipo === 'entrada' ? 'text-success' : ' text-danger')) +
                                                 (item.atrasado ? ' bg-danger text-white' : '')
                                             }>
                                            <div className="pt-4 text-center col">
                                                {item.tipo === 'entrada' ? <ArrowUpwardOutlinedIcon color="success"/> :
                                                    <ArrowDownwardOutlinedIcon color="error"/>}
                                                <small className="d-block">{item.tipo}</small>
                                            </div>
                                            <div className="col-auto text-center">
                                                <FormControlLabel
                                                    value="bottom"
                                                    control={
                                                        <Switch checked={item.status === 'pago'} data-bs-toggle="modal"
                                                                className="mt-3"
                                                                onClick={() => setIdStatus(item.id)}
                                                                data-bs-target="#exampleModal"/>
                                                    }
                                                    label={<small>{item.status}</small>}
                                                    className="text-muted"
                                                    labelPlacement="bottom"
                                                />
                                            </div>
                                            <div className="cursor-pointer col-6"
                                                 onClick={() => router.get(route('admin.financeiro.fluxo-caixa.show', item.id))}>
                                            <span className="d-blo ck text-truncate">
                                                <b>Data:</b> {item.data}
                                            </span>
                                                <span className="d-b lock text-truncate ps-4">
                                                <b>NF n°:</b> {item.nota_fiscal}
                                            </span>
                                                <span className="d-block text-truncate">
                                                <b>Fornecedor:</b> {item.fornecedor}
                                            </span>
                                                <span className="d-block text-truncate">
                                                <b>Empresa:</b> {item.empresa}
                                            </span>
                                                <span className="d-block text-truncate">
                                                <b>Banco:</b> {item.banco}
                                            </span>
                                                <span className="d-block">
                                                <b>Franquia:</b> {item.franquia}
                                            </span>
                                            </div>
                                            <div className="cursor-pointer col-3"
                                                 onClick={() => router.get(route('admin.financeiro.fluxo-caixa.show', item.id))}>
                                            <span className="mt-3 fs-6">
                                                <b>R$ {item.valor}</b> <br/>
                                            </span>
                                                <span className="mt-3">
                                                <b>Parcela:</b> {item.qtd_parcelas} <br/>
                                            </span>
                                                <span className="d-block">
                                                <b>Valor Baixa:</b> {item.valor_baixa && <>R$ {item.valor_baixa}</>}
                                            </span>
                                                <span className="d-block">
                                                <b>Data Baixa:</b> {item.data_baixa}
                                            </span>
                                            </div>
                                            <div className="cursor-pointer col"
                                                 onClick={() => router.get(route('admin.financeiro.fluxo-caixa.show', item.id))}>
                                                <a className="p-0 btn btn-link btn-sm"
                                                   href={route('admin.financeiro.fluxo-caixa.show', item.id)}>
                                                    <RemoveRedEyeOutlinedIcon/>
                                                </a>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            )}

                            {/*Salario*/}
                            {registrosSalarios?.[dia]?.map(item => {
                                const link = () => router.get(route('admin.financeiro.salarios.index', item.user_id), {mes: item.mes})
                                return (
                                    <Card key={item.id} className="mb-4 shadow"
                                          style={{
                                              borderLeft: '3px solid orange'
                                          }}>
                                        <div
                                            className={'row p-3 ' +
                                                (item.status === 1 ? '' : (item.status === "1" ? 'text-success' : ' text-danger')) +
                                                (item.atrasado ? ' bg-danger text-white' : '')
                                            }>
                                            <div className="pt-4 text-center col">
                                                <LocalAtmOutlinedIcon/>
                                                <small className="d-block">{item.tipo}</small>
                                            </div>
                                            <div className="col-auto text-center">
                                                <FormControlLabel
                                                    control={
                                                        <Switch checked={item.status === '1'} data-bs-toggle="modal"
                                                                className="mt-3"
                                                                onClick={() => setIdStatus(item.id)}
                                                                data-bs-target="#exampleModal"/>
                                                    }
                                                    label={<small>{item.status === '1' ? 'Pago' : 'Aberto'}</small>}
                                                    className="text-muted" labelPlacement="bottom"
                                                />
                                            </div>
                                            <div className="cursor-pointer col-4"
                                                 onClick={() => link()}>
                                                Nome: {item.nome}<br/>
                                                Data Pagamento: {item.data}<br/>
                                            </div>
                                            <div className="cursor-pointer col-5"
                                                 onClick={() => link()}>
                                                Valor: R$ {convertFloatToMoney(item.valor) ?? '-'}<br/>
                                                Status: {item.status === "1" ? 'Pago' : 'Em Aberto'}
                                            </div>
                                            <div className="cursor-pointer col"
                                                 onClick={() => link()}>
                                                <a className="p-0 btn btn-link btn-sm">
                                                    <RemoveRedEyeOutlinedIcon/>
                                                </a>
                                            </div>
                                        </div>
                                    </Card>
                                )
                            })}

                            {registrosSalarios[dia] = []}
                        </div>
                    )
                }
            )}

            {/*Modal*/}
            <div className="mt-6 modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Digite "ALTERAR" para atualizar o Status:<br/>
                            <TextField value={chaveStatus ?? ''} onChange={e => setChaveStatus(e.target.value)}/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar
                            </button>
                            <button type="button" data-bs-dismiss="modal" className="btn btn-primary"
                                    disabled={chaveStatus !== 'ALTERAR'}
                                    onClick={() => alterarStatus('pago')}>
                                Alterar Status
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
