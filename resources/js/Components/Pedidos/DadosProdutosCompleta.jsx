import convertFloatToMoney from "@/Helpers/converterDataHorario";
import {useState} from "react";
import {round} from "lodash/math";

export default function DadosProdutosCompleta({dados}) {

    let totalForn = 0
    let totalVenda = 0
    let totalLucro = 0

    function calcVenda(dados) {
        const total = dados.preco_venda_float * dados.qtd * (1 - (dados.desconto / 100))
        totalVenda += total
        return total
    }

    function calcForn(dados) {
        const total = dados.preco_fornecedor_float * dados.qtd
        totalForn += total
        return total
    }

    function calcLucro(dados) {
        const total = (dados.preco_venda_float - dados.preco_fornecedor_float) * dados.qtd
        totalLucro += total
        return total
    }

    return (
        dados.length ?
            <div className="row">
                <div className="col">
                    <h6>Produtos do Pedido</h6>
                    <div className="table-responsive">
                        <table className="table table-sm text-sm table-bordered">
                            <thead>
                            <tr>
                                <th></th>
                                <th>Produto</th>
                                <th>Preço</th>
                                <th>Preço Fornec.</th>
                                <th className="text-center">Qtd.</th>
                                <th className="col-1 text-center">Und.</th>
                                <th className="text-center">Desconto</th>
                                <th>Total Forn.</th>
                                <th>Lucro</th>
                                <th className="bg-light">Total Venda</th>
                            </tr>
                            </thead>
                            <tbody>
                            {dados.map((dados, index) => {
                                return (
                                    <tr className="text-center" key={index}>
                                        <td className="col-1 pe-3">
                                            {dados.foto &&
                                                <img className="rounded" src={dados.foto} width="70" alt="foto"/>}
                                        </td>
                                        <td className="text-wrap text-start"><b>{dados.nome}</b></td>
                                        <td className="col-1">R$ {dados.preco_venda}</td>
                                        <td className="col-1">R$ {dados.preco_fornecedor}</td>
                                        <td className="col-1">{dados.qtd}</td>
                                        <td className="col-1">{dados.unidade}</td>
                                        <td className="col-2">{dados.desconto}%</td>
                                        <td className="col-2">
                                            R$ {convertFloatToMoney(calcForn(dados))}
                                        </td>
                                        <td>
                                            R$ {convertFloatToMoney(calcLucro(dados))}
                                        </td>
                                        <td className="col-2 bg-light">
                                            <b>R$ {convertFloatToMoney(calcVenda(dados))}</b>
                                        </td>
                                    </tr>
                                )
                            })}
                            <tr className="text-center bg-light">
                                <td colSpan="6"></td>
                                <td><h6>TOTAL</h6></td>
                                <td><h6>R$ {convertFloatToMoney(totalForn)}</h6></td>
                                <td><h6>R$ {convertFloatToMoney(totalLucro)}</h6></td>
                                <td><h6>R$ {convertFloatToMoney(totalVenda)}</h6></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div> : ''
    )
}
