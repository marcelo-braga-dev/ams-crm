import convertFloatToMoney from "@/Helpers/converterDataHorario";
import {Typography} from "@mui/material";
import CardContainer from "@/Components/Cards/CardContainer.jsx";
import CardTable from "@/Components/Cards/CardTable.jsx";
import {BoxSeam} from "react-bootstrap-icons";

export default function DadosProdutosCompleta({dados, valorFrete = 0, isFinanceiro}) {

    let totalForn = 0
    let totalDesconto = 0
    let totalLucro = 0
    let totalVenda = 0

    const totalQtd = dados.reduce((total, produto) => {
        return total + produto.qtd;
    }, 0);

    const totalFrete = dados.reduce((total, produto) => {
        return total + (valorFrete * produto.qtd / totalQtd)
    }, 0);

    return (
        dados.length ?
            <CardContainer>
                <CardTable title="Produtos do Pedido" icon={<BoxSeam size={22}/>}>
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
                                {isFinanceiro && <th>Total Frete</th>}
                                {isFinanceiro && <th>Total Lucro</th>}
                                <th>Total Venda</th>
                            </tr>
                            </thead>
                            <tbody>
                            {dados.map((dados, index) => {
                                totalForn += dados.preco_fornecedor * dados.qtd
                                totalDesconto += dados.desconto * dados.qtd
                                totalLucro += dados.lucro * dados.qtd
                                totalVenda += dados.preco_liquido * dados.qtd
                                const frete = valorFrete * dados.qtd / totalQtd

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
                                        <td>R$ {convertFloatToMoney(frete)}</td>
                                        {isFinanceiro && <td className="col-1">R$ {convertFloatToMoney(dados.lucro * dados.qtd - frete)}</td>}
                                        <td className="col-1 bg-light"><b>R$ {convertFloatToMoney(dados.preco_liquido * dados.qtd)}</b></td>
                                    </tr>
                                )
                            })}
                            <tr className="text-center bg-light">
                                <td colSpan={isFinanceiro ? 7 : 5}></td>
                                <td><Typography fontWeight="bold">TOTAL</Typography></td>
                                {isFinanceiro && <td><Typography fontWeight="bold">R$ {convertFloatToMoney(totalForn)}</Typography></td>}
                                <td><Typography fontWeight="bold">R$ {convertFloatToMoney(totalDesconto)}</Typography></td>
                                <td><Typography fontWeight="bold">R${convertFloatToMoney(totalFrete)}</Typography></td>
                                {isFinanceiro && <td><Typography fontWeight="bold">R$ {convertFloatToMoney(totalLucro - totalFrete)}</Typography></td>}
                                <td><Typography fontWeight="bold">R$ {convertFloatToMoney(totalVenda)}</Typography></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </CardTable>
            </CardContainer> : ''
    )
}
