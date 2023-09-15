import convertFloatToMoney from "@/Helpers/converterDataHorario";

export default function DadosProdutos({dados}) {
    let total = 0

    return (
        dados.length ?
            <div className="row">
                <div className="col">
                    <h6>Produtos do Pedido</h6>
                    <div className="table-responsive">
                        <table className="table table-sm text-sm">
                            <thead>
                            <tr>
                                <th></th>
                                <th>Produto</th>
                                <th>Preço</th>
                                <th className="text-center">Qtd.</th>
                                <th className="col-1 text-center">Und.</th>
                                <th className="text-center">Desconto</th>
                                <th>Total</th>
                            </tr>
                            </thead>
                            <tbody>
                            {dados.map((dados, index) => {
                                total += dados.preco_venda_float * dados.qtd * (1 - (dados.desconto / 100))
                                return (
                                    <tr key={index}>
                                        <td className="col-1 text-center pe-3">
                                            {dados.foto &&
                                                <img className="rounded" src={dados.foto} width="70" alt="foto"/>}
                                        </td>
                                        <td className="text-wrap"><b>{dados.nome}</b></td>
                                        <td className="col-1">R$ {dados.preco_venda}</td>
                                        <td className="col-1 text-center">{dados.qtd}</td>
                                        <td className="col-1 text-center">{dados.unidade}</td>
                                        <td className="col-2 text-center">{dados.desconto}%</td>
                                        <td className="col-2">
                                            R$ {convertFloatToMoney(dados.preco_venda_float * dados.qtd * (1 - (dados.desconto / 100)))}
                                        </td>
                                    </tr>
                                )
                            })}
                            <tr>
                                <td colSpan="5"></td>
                                <td><h6>TOTAL</h6></td>
                                <td>
                                    <h6>R$ {convertFloatToMoney(total)}</h6>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div> : ''
    )
}
