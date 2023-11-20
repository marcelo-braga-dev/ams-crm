import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import convertFloatToMoney from "@/Helpers/converterDataHorario";

export default function ({consultores, comissoes}) {
    return (
        <Layout container titlePage="Comissões" menu="meta-vendas" submenu="comissoes">
            <div className="table-responsive">
                <table className="table align-items-center">
                    <thead>
                    <tr>
                        <th>Consultor(a)</th>
                        <th>1° Semestre</th>
                        <th>2° Semestre</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {consultores.map((consultor, index) => {
                        return (
                            <tr key={index} className="">
                                <td className="text-wrap">
                                    <div className="mb-1"><b>{consultor.name}</b></div>
                                    ID: #{consultor.id}
                                </td>
                                <td>
                                    <table>
                                        <tbody>
                                        <tr>
                                            <td className="pe-3"><b>JAN:</b></td>
                                            <td>{convertFloatToMoney(comissoes[consultor.id]?.jan)}%</td>
                                        </tr>
                                        <tr>
                                            <td><b>FEV:</b></td>
                                            <td>{convertFloatToMoney(comissoes[consultor.id]?.fev)}%</td>
                                        </tr>
                                        <tr>
                                            <td><b>MAR:</b></td>
                                            <td>{convertFloatToMoney(comissoes[consultor.id]?.mar)}%</td>
                                        </tr>
                                        <tr>
                                            <td><b>ABR:</b></td>
                                            <td>{convertFloatToMoney(comissoes[consultor.id]?.abr)}%</td>
                                        </tr>
                                        <tr>
                                            <td><b>MAI:</b></td>
                                            <td>{convertFloatToMoney(comissoes[consultor.id]?.mai)}%</td>
                                        </tr>
                                        <tr>
                                            <td><b>JUN:</b></td>
                                            <td>{convertFloatToMoney(comissoes[consultor.id]?.jun)}%</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td>
                                    <table>
                                        <tbody>
                                        <tr>
                                            <td className="pe-3"><b>JUL:</b></td>
                                            <td>{convertFloatToMoney(comissoes[consultor.id]?.jul)}%</td>
                                        </tr>
                                        <tr>
                                            <td><b>AGO:</b></td>
                                            <td>{convertFloatToMoney(comissoes[consultor.id]?.ago)}%</td>
                                        </tr>
                                        <tr>
                                            <td><b>SET:</b></td>
                                            <td>{convertFloatToMoney(comissoes[consultor.id]?.set)}%</td>
                                        </tr>
                                        <tr>
                                            <td><b>OUT:</b></td>
                                            <td>{convertFloatToMoney(comissoes[consultor.id]?.out)}%</td>
                                        </tr>
                                        <tr>
                                            <td><b>NOV:</b></td>
                                            <td>{convertFloatToMoney(comissoes[consultor.id]?.nov)}%</td>
                                        </tr>
                                        <tr>
                                            <td><b>DEZ:</b></td>
                                            <td>{convertFloatToMoney(comissoes[consultor.id]?.dez)}%</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td>
                                    <a href={route('admin.metas-vendas.comissoes.edit', consultor.id)}
                                       className="btn btn-primary btn-sm">Editar</a>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}
