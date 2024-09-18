import Layout from "@/Layouts/Layout";
import React, {useEffect, useState} from "react";
import {Card, TextField, Typography} from "@mui/material";

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import Filtros from "./Index/Filtros.jsx"
import CreateDialog from "./Create/CreateDialog.jsx"
import ProximosPagamentos from "@/Pages/Admin/Financeiro/FluxoCaixa/Index/ProximosPagamentos.jsx";
import PagamentosFiltrados from "@/Pages/Admin/Financeiro/FluxoCaixa/Index/PagamentosFiltrados.jsx";

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

    return (
        <Layout titlePage="Fluxo de Caixa" menu="financeiro" submenu="fluxo-caixa">
            <CreateDialog/>

            <div className="mb-2 row justify-content-ce nter">
                <div className="col-md-8">
                    <Filtros filtros={filtros} setFiltros={setFiltros} empresas={empresas} franquias={franquias} fornecedores={fornecedores}/>
                    <PagamentosFiltrados filtros={filtros}/>
                </div>
                <div className="col-md-4">
                    <ProximosPagamentos/>
                </div>
            </div>

            {/*{dias.map((dia, index) => {*/}
            {/*        fluxo = 1*/}
            {/*        return (*/}
            {/*            <div key={index}>*/}
            {/*                {dados?.[dia]?.map((item) =>*/}
            {/*                    <div key={item.id}>*/}
            {/*                        <Card className="mb-4 shadow"*/}
            {/*                              style={{*/}
            {/*                                  borderLeft: '3px solid ' + (item.tipo === 'entrada' ? 'green' : 'red')*/}
            {/*                              }}>*/}
            {/*                            <div key={item.id}*/}
            {/*                                 className={'row p-3 ' +*/}
            {/*                                     (item.status === 'pago' ? '' : (item.tipo === 'entrada' ? 'text-success' : ' text-danger')) +*/}
            {/*                                     (item.atrasado ? ' bg-danger text-white' : '')*/}
            {/*                                 }>*/}
            {/*                                <div className="pt-4 text-center col">*/}
            {/*                                    {item.tipo === 'entrada' ? <ArrowUpwardOutlinedIcon color="success"/> :*/}
            {/*                                        <ArrowDownwardOutlinedIcon color="error"/>}*/}
            {/*                                    <small className="d-block">{item.tipo}</small>*/}
            {/*                                </div>*/}
            {/*                                <div className="col-auto text-center">*/}
            {/*                                    <FormControlLabel*/}
            {/*                                        value="bottom"*/}
            {/*                                        control={*/}
            {/*                                            <Switch checked={item.status === 'pago'} data-bs-toggle="modal"*/}
            {/*                                                    className="mt-3"*/}
            {/*                                                    onClick={() => setIdStatus(item.id)}*/}
            {/*                                                    data-bs-target="#exampleModal"/>*/}
            {/*                                        }*/}
            {/*                                        label={<small>{item.status}</small>}*/}
            {/*                                        className="text-muted"*/}
            {/*                                        labelPlacement="bottom"*/}
            {/*                                    />*/}
            {/*                                </div>*/}
            {/*                                <div className="cursor-pointer col-6"*/}
            {/*                                     onClick={() => router.get(route('admin.financeiro.fluxo-caixa.show', item.id))}>*/}
            {/*                                <span className="d-blo ck text-truncate">*/}
            {/*                                    <b>Data:</b> {item.data}*/}
            {/*                                </span>*/}
            {/*                                    <span className="d-b lock text-truncate ps-4">*/}
            {/*                                    <b>NF n°:</b> {item.nota_fiscal}*/}
            {/*                                </span>*/}
            {/*                                    <span className="d-block text-truncate">*/}
            {/*                                    <b>Fornecedor:</b> {item.fornecedor}*/}
            {/*                                </span>*/}
            {/*                                    <span className="d-block text-truncate">*/}
            {/*                                    <b>Empresa:</b> {item.empresa}*/}
            {/*                                </span>*/}
            {/*                                    <span className="d-block text-truncate">*/}
            {/*                                    <b>Banco:</b> {item.banco}*/}
            {/*                                </span>*/}
            {/*                                    <span className="d-block">*/}
            {/*                                    <b>Franquia:</b> {item.franquia}*/}
            {/*                                </span>*/}
            {/*                                </div>*/}
            {/*                                <div className="cursor-pointer col-3"*/}
            {/*                                     onClick={() => router.get(route('admin.financeiro.fluxo-caixa.show', item.id))}>*/}
            {/*                                <span className="mt-3 fs-6">*/}
            {/*                                    <b>R$ {item.valor}</b> <br/>*/}
            {/*                                </span>*/}
            {/*                                    <span className="mt-3">*/}
            {/*                                    <b>Parcela:</b> {item.qtd_parcelas} <br/>*/}
            {/*                                </span>*/}
            {/*                                    <span className="d-block">*/}
            {/*                                    <b>Valor Baixa:</b> {item.valor_baixa && <>R$ {item.valor_baixa}</>}*/}
            {/*                                </span>*/}
            {/*                                    <span className="d-block">*/}
            {/*                                    <b>Data Baixa:</b> {item.data_baixa}*/}
            {/*                                </span>*/}
            {/*                                </div>*/}
            {/*                                <div className="cursor-pointer col"*/}
            {/*                                     onClick={() => router.get(route('admin.financeiro.fluxo-caixa.show', item.id))}>*/}
            {/*                                    <a className="p-0 btn btn-link btn-sm"*/}
            {/*                                       href={route('admin.financeiro.fluxo-caixa.show', item.id)}>*/}
            {/*                                        <RemoveRedEyeOutlinedIcon/>*/}
            {/*                                    </a>*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                        </Card>*/}
            {/*                    </div>*/}
            {/*                )}*/}

            {/*                /!*Salario*!/*/}
            {/*                {registrosSalarios?.[dia]?.map(item => {*/}
            {/*                    const link = () => router.get(route('admin.financeiro.salarios.index', item.user_id), {mes: item.mes})*/}
            {/*                    return (*/}
            {/*                        <Card key={item.id} className="mb-4 shadow"*/}
            {/*                              style={{*/}
            {/*                                  borderLeft: '3px solid orange'*/}
            {/*                              }}>*/}
            {/*                            <div*/}
            {/*                                className={'row p-3 ' +*/}
            {/*                                    (item.status === 1 ? '' : (item.status === "1" ? 'text-success' : ' text-danger')) +*/}
            {/*                                    (item.atrasado ? ' bg-danger text-white' : '')*/}
            {/*                                }>*/}
            {/*                                <div className="pt-4 text-center col">*/}
            {/*                                    <LocalAtmOutlinedIcon/>*/}
            {/*                                    <small className="d-block">{item.tipo}</small>*/}
            {/*                                </div>*/}
            {/*                                <div className="col-auto text-center">*/}
            {/*                                    <FormControlLabel*/}
            {/*                                        control={*/}
            {/*                                            <Switch checked={item.status === '1'} data-bs-toggle="modal"*/}
            {/*                                                    className="mt-3"*/}
            {/*                                                    onClick={() => setIdStatus(item.id)}*/}
            {/*                                                    data-bs-target="#exampleModal"/>*/}
            {/*                                        }*/}
            {/*                                        label={<small>{item.status === '1' ? 'Pago' : 'Aberto'}</small>}*/}
            {/*                                        className="text-muted" labelPlacement="bottom"*/}
            {/*                                    />*/}
            {/*                                </div>*/}
            {/*                                <div className="cursor-pointer col-4"*/}
            {/*                                     onClick={() => link()}>*/}
            {/*                                    Nome: {item.nome}<br/>*/}
            {/*                                    Data Pagamento: {item.data}<br/>*/}
            {/*                                </div>*/}
            {/*                                <div className="cursor-pointer col-5"*/}
            {/*                                     onClick={() => link()}>*/}
            {/*                                    Valor: R$ {convertFloatToMoney(item.valor) ?? '-'}<br/>*/}
            {/*                                    Status: {item.status === "1" ? 'Pago' : 'Em Aberto'}*/}
            {/*                                </div>*/}
            {/*                                <div className="cursor-pointer col"*/}
            {/*                                     onClick={() => link()}>*/}
            {/*                                    <a className="p-0 btn btn-link btn-sm">*/}
            {/*                                        <RemoveRedEyeOutlinedIcon/>*/}
            {/*                                    </a>*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                        </Card>*/}
            {/*                    )*/}
            {/*                })}*/}

            {/*                {registrosSalarios[dia] = []}*/}
            {/*            </div>*/}
            {/*        )*/}
            {/*    }*/}
            {/*)}*/}
        </Layout>
    )
}
