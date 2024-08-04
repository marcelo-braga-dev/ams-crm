import convertFloatToMoney from "@/Helpers/converterDataHorario";
import {Typography} from "@mui/material";

export default function DadosProdutosCompleta({dados, isFinanceiro}) {

    let totalForn = 0
    let totalDesconto = 0
    let totalLucro = 0
    let totalVenda = 0

    return (
        dados.length ?
            <div className="table-responsive">
                <table className="table-1 table-sm">
                    <thead>
                    <tr className="text-center">
                        <th></th>
                        <th className="text-start">Produtos</th>
                        <th>Preço Bruto</th>
                        <th>Desconto</th>
                        <th>Preço Líquido</th>
                        {isFinanceiro && <th>Preço Forn.</th>}
                        {isFinanceiro && <th>Lucro</th>}
                        <th>Qtd.</th>
                        {isFinanceiro && <th>Total Forn.</th>}
                        <th>Total Desconto</th>
                        {isFinanceiro && <th>Total Lucro.</th>}
                        <th>Total Venda</th>
                    </tr>
                    </thead>
                    <tbody>
                    {dados.map((dados, index) => {
                        totalForn += dados.preco_fornecedor * dados.qtd
                        totalDesconto += dados.desconto * dados.qtd
                        totalLucro += dados.lucro * dados.qtd
                        totalVenda += dados.preco_liquido * dados.qtd

                        return (
                            <tr className="text-center" key={index}>
                                <td className="col-1 p-2">
                                    {dados.foto && <img className="rounded" src={dados.foto} width="60" alt="foto"/>}
                                </td>
                                <td className="text-wrap text-start">
                                    <Typography><b>{dados.nome}</b> ({dados.unidade})</Typography>
                                    <Typography>#{dados.id_produto}</Typography>
                                    <Typography>{dados.fornecedor_nome}</Typography>
                                </td>
                                <td className="col-1">R$ {convertFloatToMoney(dados.preco_venda)}</td>
                                <td className="col-1">R$ {convertFloatToMoney(dados.desconto)}</td>
                                <td className="col-1">R$ {convertFloatToMoney(dados.preco_liquido)}</td>
                                {isFinanceiro && <td className="col-1">R$ {convertFloatToMoney(dados.preco_fornecedor)}</td>}
                                {isFinanceiro && <td className="col-1">R$ {convertFloatToMoney(dados.lucro)}</td>}
                                <td className="col-1">{dados.qtd}</td>
                                {isFinanceiro && <td className="col-1">R$ {convertFloatToMoney(dados.preco_fornecedor * dados.qtd)}</td>}
                                <td className="col-1">R$ {convertFloatToMoney(dados.desconto * dados.qtd)}</td>
                                {isFinanceiro && <td className="col-1">R$ {convertFloatToMoney(dados.lucro * dados.qtd)}</td>}
                                <td className="col-1 bg-light"><b>R$ {convertFloatToMoney(dados.preco_liquido * dados.qtd)}</b></td>
                            </tr>
                        )
                    })}
                    <tr className="text-center bg-light">
                        <td colSpan={isFinanceiro ? 7 : 5}></td>
                        <td><h6>TOTAL</h6></td>
                        {isFinanceiro && <td><h6>R$ {convertFloatToMoney(totalForn)}</h6></td>}
                        <td><h6>R$ {convertFloatToMoney(totalDesconto)}</h6></td>
                        {isFinanceiro && <td><h6>R$ {convertFloatToMoney(totalLucro)}</h6></td>}
                        <td><h6>R$ {convertFloatToMoney(totalVenda)}</h6></td>
                    </tr>
                    </tbody>
                </table>
            </div> : ''
    )
}
