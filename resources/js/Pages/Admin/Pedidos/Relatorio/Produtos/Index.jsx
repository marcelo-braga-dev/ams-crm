import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import {Card, MenuItem, TextField} from "@mui/material";
import React, {useState} from "react";
import {router} from "@inertiajs/react";
import FileDownloadIcon from '@mui/icons-material/FileDownload';

export default function ({historicos, fornecedores, fornecedor, mes, consultores, consultor, urlPlanilha}) {

    const [fornecedorSelecionado, setFornecedorSelecionado] = useState(fornecedor);
    const [mesSelecionado, setMesSelecionado] = useState(mes);
    const [consultorSelecionado, setConsultorSelecionado] = useState(consultor);

    function selecionarFornecedor(id) {
        setFornecedorSelecionado(id)
        router.get(route('admin.pedidos.relatorios.produtos.index', {
            mes: mesSelecionado,
            fornecedor: id,
            consultor: consultorSelecionado
        }))
    }

    function selecionarMes(id) {
        setMesSelecionado(id)
        router.get(route('admin.pedidos.relatorios.produtos.index', {
            mes: id,
            fornecedor: fornecedorSelecionado,
            consultor: consultorSelecionado
        }))
    }

    function selecionarConsultor(id) {
        setConsultorSelecionado(id)
        router.get(route('admin.pedidos.relatorios.produtos.index', {
            mes: mesSelecionado,
            fornecedor: fornecedorSelecionado,
            consultor: id
        }))
    }

    return (
        <Layout container titlePage="Relatório de Produtos" menu="pedidos" submenu="produtos">

            <div className="row">
                <div className="col-md-3 mb-4">
                    <TextField select label="Mês" fullWidth defaultValue={mes ?? undefined}
                               onChange={e => selecionarMes(e.target.value)}>
                        <MenuItem value="1">Janeiro</MenuItem>
                        <MenuItem value="2">Fevereiro</MenuItem>
                        <MenuItem value="3">Março</MenuItem>
                        <MenuItem value="4">Abril</MenuItem>
                        <MenuItem value="5">Maio</MenuItem>
                        <MenuItem value="6">Junho</MenuItem>
                        <MenuItem value="7">Julho</MenuItem>
                        <MenuItem value="8">Agosto</MenuItem>
                        <MenuItem value="9">Setembro</MenuItem>
                        <MenuItem value="10">Outubro</MenuItem>
                        <MenuItem value="11">Novembro</MenuItem>
                        <MenuItem value="12">Dezembro</MenuItem>
                    </TextField>
                </div>
                <div className="col-md-3 mb-4">
                    <TextField select label="Fornecedor" fullWidth defaultValue={fornecedor ?? undefined}
                               onChange={e => selecionarFornecedor(e.target.value)}>
                        <MenuItem value="">Todos</MenuItem>
                        {fornecedores.map((item, index) => {
                            return (
                                <MenuItem key={index} value={item.id}>{item.nome}</MenuItem>
                            )
                        })}
                    </TextField>
                </div>
                <div className="col-md-3 mb-4">
                    <TextField select label="Vendedor(a)" fullWidth defaultValue={consultor ?? undefined}
                               onChange={e => selecionarConsultor(e.target.value)}>
                        <MenuItem value="">Todos</MenuItem>
                        {consultores.map((item, index) => {
                            return (
                                <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                            )
                        })}
                    </TextField>
                </div>
            </div>

            <div className="row">
                <div className="col mb-3">
                    <a className="btn btn-success" href={urlPlanilha}>
                        <FileDownloadIcon /> Baixar Planilha
                    </a>
                </div>
            </div>

            {/*Tabela de Produtos*/}
            {/*     Separa por categorias*/}
            {historicos.map(({produtos, categoria_nome}) => {
                return (<>
                        <Card className="p-3 mb-4">


                            <h6>CATEGORIA: {categoria_nome}</h6>
                            {/*    Object.values(produtos).map((item) => {*/}
                            <div className="table-responsive">
                                <table className="table text-sm">
                                    <thead>
                                    <tr>
                                        <th></th>
                                        {Object.values(produtos)?.[0]?.[0].semanas_datas.map((item, index) => {
                                            return (
                                                <th colSpan="4" className="text-center border">
                                                    {index + 1}° Semana<br/>
                                                    <small>{item.inicio} até {item.fim}</small>
                                                </th>
                                            )
                                        })}
                                    </tr>
                                    <tr>
                                        <th className="border-end">Produtos</th>
                                        {Object.values(produtos)?.[0]?.[0].semanas_datas.map((item) => {
                                            return (
                                                <>
                                                    <th>Trânsito</th>
                                                    <th>Loja</th>
                                                    <th>Vendidos</th>
                                                    <th className="border-end">Total</th>
                                                </>
                                            )
                                        })}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {/*Separa por produtos*/}
                                    {Object.values(produtos).map((produto, index) => {
                                        return produto.map((item) => {
                                            return (
                                                <tr key={index} className="text-center">
                                                    <td className="text-start border-end">
                                                        <b>{item.nome}</b> <br/>
                                                        <small className="d-block">[ID: #{item.id_produto}]</small>
                                                        <small
                                                            className="d-block text-wrap">Forn.: {item.fornecedor}</small>
                                                    </td>
                                                    {item.vendas_semanas.map((dados) => {
                                                        return <>
                                                            <td>{dados.transito}</td>
                                                            <td>{dados.estoque_local}</td>
                                                            <td>{dados.vendas}</td>
                                                            <td className="border-end">{dados.total}</td>
                                                        </>
                                                    })}
                                                </tr>
                                            )
                                        })
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </>
                )

            })}

            {historicos.length === 0 && <h6>Não há registros no histórico.</h6>}
        </Layout>
    )
}
