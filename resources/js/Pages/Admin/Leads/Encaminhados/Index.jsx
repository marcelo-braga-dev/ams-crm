import Layout from "@/Layouts/Layout";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import CardTitle from "@/Components/Cards/CardTitle";
import Chip from "@mui/material/Chip";
import CardTable from "@/Components/Cards/CardTable";

export default function ({historicos, listaEnvio, proximo}) {
    return (
        <Layout titlePage="Leads Encaminhados" menu="leads" submenu="leads-encaminhados">
            <div className="row">
                <div className="col-md-4">
                    <CardContainer>
                        <CardTitle title="Sequência de Envios de Leads"/>
                        <CardTable>
                            <table className="table-1">
                                <thead>
                                <tr>
                                    <th></th>
                                    <th>Consultor(a)</th>
                                </tr>
                                </thead>
                                <tbody>
                                {listaEnvio.map(item => (
                                        <tr>
                                            <td className="col-1">{proximo === item.id ? <Chip label="Próximo" color="success"/> : ''}</td>
                                            <td>{item.nome}</td>
                                        </tr>
                                    )
                                )}
                                </tbody>
                            </table>
                        </CardTable>
                    </CardContainer>
                </div>
                <div className="col">
                    <CardContainer>
                        <CardTitle title="Histórico de Envios de Leads"/>
                        <CardTable>
                            <table className="table-1">
                                <thead>
                                <tr>
                                    <th>Consultor(a)</th>
                                    <th>SDR</th>
                                    <th>Cliente</th>
                                    <th>Data</th>
                                </tr>
                                </thead>
                                <tbody>
                                {historicos.map(item => (
                                        <tr>
                                            <td>{item.destino}</td>
                                            <td>{item.nome}</td>
                                            <td>{item.lead_nome} [#{item.lead_id}]</td>
                                            <td>{item.data}</td>
                                        </tr>
                                    )
                                )}
                                </tbody>
                            </table>
                        </CardTable>
                    </CardContainer>
                </div>
            </div>
        </Layout>
    )
}
