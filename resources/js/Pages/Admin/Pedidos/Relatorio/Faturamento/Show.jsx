import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import {MenuItem, TextField} from "@mui/material";
import React, {useState} from "react";
import {router} from "@inertiajs/react";
import GraficoSemanas from './Graficos/Semanas';
import "chart.js/auto";

export default function ({consultor, produtos, fornecedores, fornecedor, mes}) {

    const [fornecedorSelecionado, setFornecedorSelecionado] = useState(fornecedor);
    const [mesSelecionado, setMesSelecionado] = useState(mes);

    function selecionarFornecedor(id) {
        setFornecedorSelecionado(id)
        router.get(route('admin.pedidos.relatorios.faturamento.show', consultor.id), {
            mes: mesSelecionado,
            fornecedor: id
        })
    }

    function selecionarMes(id) {
        setMesSelecionado(id)
        router.get(route('admin.pedidos.relatorios.faturamento.show', consultor.id),
            {mes: id, fornecedor: fornecedorSelecionado})
    }

    return (
        <Layout container titlePage="Relatório de Pedidos" voltar={route('admin.pedidos.relatorios.faturamento.index')}
                menu="pedidos" submenu="faturamento">

            <div className="row">
                <div className="col mb-4">
                    <h6>Vendedor(a): {consultor.nome}</h6>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3 mb-4">
                    <TextField select label="Mês" fullWidth defaultValue={mes}
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
                    <TextField select label="Fornecedor" fullWidth defaultValue={fornecedor}
                               onChange={e => selecionarFornecedor(e.target.value)}>
                        <MenuItem value="">Todos</MenuItem>
                        {fornecedores.map((item) => {
                            return (
                                <MenuItem value={item.id}>{item.nome}</MenuItem>
                            )
                        })}
                    </TextField>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 mb-4">
                    <div className="table-responsive">
                        <table className="table table-sm text-sm">
                            <thead>
                            <tr>
                                <th>Semanas</th>
                                <th>Total</th>
                            </tr>
                            </thead>
                            <tbody>
                            {produtos?.total_geral?.map((item, index) => {
                                return (
                                    <tr>
                                        <td>
                                            <b>{index + 1}° semana</b> <br/>
                                            {produtos?.semanas_datas?.[index]?.inicio} até {
                                            produtos?.semanas_datas?.[index]?.fim
                                        }
                                        </td>
                                        <td><b>R$ {item}</b></td>
                                    </tr>
                                )
                            })}

                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-md-6 mb-4">
                    <GraficoSemanas dados={produtos?.total_geral}/>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table text-sm">
                    <thead>
                    <tr>
                        <th></th>
                        {produtos?.semanas_datas?.map((item, index) => {
                            return (
                                <th colSpan="3" className="text-center border">
                                    {index + 1}° Semana<br/>
                                    <small>{item.inicio} até {item.fim}</small>
                                </th>
                            )
                        })}
                    </tr>
                    <tr>
                        <th className="border-end">Produtos</th>
                        {produtos?.semanas_datas?.map((item) => {
                            return (
                                <>
                                    <th>Preço</th>
                                    <th>Qtd.</th>
                                    <th className="border-end">Total</th>
                                </>
                            )
                        })}
                    </tr>
                    </thead>
                    <tbody>
                    {produtos?.produtos?.map((item, index) => {
                        return (
                            <tr key={index} className="text-center">
                                <td className="text-start border-end">
                                    <b>{item.nome}</b> <br/>
                                    <small>[ID: #{item.id_produto}]</small>
                                </td>
                                {item.vendas.map((semanas) => {
                                    return <>
                                        <td>
                                            {semanas.map((venda) => {
                                                return <span className="d-block">R$ {venda.valor}</span>
                                            })}
                                        </td>
                                        <td>
                                            {semanas.map((venda) => {
                                                return <span className="d-block">{venda.qtd}</span>
                                            })}
                                        </td>
                                        <td className="border-end">
                                            {semanas.map((venda) => {
                                                return <span className="d-block">{venda.total}</span>
                                            })}
                                        </td>
                                    </>
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
