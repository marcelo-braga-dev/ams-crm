import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import convertFloatToMoney from "@/Helpers/converterDataHorario";

export default function ({consultores, metasMensal, metasPeriodo}) {
    return (
        <Layout container titlePage="Metas dos Consultores" menu="meta-vendas" submenu="consultores">
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
                                            <td> R$ {convertFloatToMoney(metasMensal[consultor.id]?.jan)}</td>
                                        </tr>
                                        <tr>
                                            <td><b>FEV:</b></td>
                                            <td> R$ {convertFloatToMoney(metasMensal[consultor.id]?.fev)}</td>
                                        </tr>
                                        <tr>
                                            <td><b>MAR:</b></td>
                                            <td> R$ {convertFloatToMoney(metasMensal[consultor.id]?.mar)}</td>
                                        </tr>
                                        <tr>
                                            <td><b>ABR:</b></td>
                                            <td> R$ {convertFloatToMoney(metasMensal[consultor.id]?.abr)}</td>
                                        </tr>
                                        <tr>
                                            <td><b>MAI:</b></td>
                                            <td> R$ {convertFloatToMoney(metasMensal[consultor.id]?.mai)}</td>
                                        </tr>
                                        <tr>
                                            <td><b>JUN:</b></td>
                                            <td> R$ {convertFloatToMoney(metasMensal[consultor.id]?.jun)}</td>
                                        </tr>
                                        <tr>
                                            <td><b>TOTAL:</b></td>
                                            <td><b className="ms-3">R$ {convertFloatToMoney(metasPeriodo[consultor.id]?.sem_1)}</b></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td>
                                    <table>
                                        <tbody>
                                        <tr>
                                            <td className="pe-3"><b>JUL:</b></td>
                                            <td> R$ {convertFloatToMoney(metasMensal[consultor.id]?.jul)}</td>
                                        </tr>
                                        <tr>
                                            <td><b>AGO:</b></td>
                                            <td> R$ {convertFloatToMoney(metasMensal[consultor.id]?.ago)}</td>
                                        </tr>
                                        <tr>
                                            <td><b>SET:</b></td>
                                            <td> R$ {convertFloatToMoney(metasMensal[consultor.id]?.set)}</td>
                                        </tr>
                                        <tr>
                                            <td><b>OUT:</b></td>
                                            <td> R$ {convertFloatToMoney(metasMensal[consultor.id]?.out)}</td>
                                        </tr>
                                        <tr>
                                            <td><b>NOV:</b></td>
                                            <td> R$ {convertFloatToMoney(metasMensal[consultor.id]?.nov)}</td>
                                        </tr>
                                        <tr>
                                            <td><b>DEZ:</b></td>
                                            <td> R$ {convertFloatToMoney(metasMensal[consultor.id]?.dez)}</td>
                                        </tr>
                                        <tr>
                                            <td><b>TOTAL:</b></td>
                                            <td><b className="ms-3">R$ {convertFloatToMoney(metasPeriodo[consultor.id]?.sem_2)}</b></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td>
                                    <div className="mt-2 mb-4">
                                        <b>META ANUAL</b><br/>R$ {convertFloatToMoney(metasPeriodo[consultor.id]?.total)}
                                    </div>
                                    <a href={route('admin.metas-vendas.consultores.edit', consultor.id)}
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
