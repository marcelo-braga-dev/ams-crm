import Layout from "@/Layouts/Layout.jsx";
import CardContainer from "@/Components/Cards/CardContainer.jsx";
import CardTable from "@/Components/Cards/CardTable.jsx";
import {Eye, Truck} from "react-bootstrap-icons";
import {Typography} from "@mui/material";
import Link from "@/Components/Link.jsx";
import convertFloatToMoney from "@/Helpers/converterDataHorario.jsx";

const Page = ({registros}) => {
    return (
        <Layout titlePage="Fretes" menu="pedidos" submenu="pedidos-fretes">
            <CardContainer>
                <CardTable title="Fretes" icon={<Truck size={22}/>}>
                    <table className="table-1">
                        <thead>
                        <tr>
                            <th>Pedido</th>
                            <th>Valor</th>
                            <th>Transportadora</th>
                            <th>Cód. Rastreio</th>
                            {/*<th></th>*/}
                        </tr>
                        </thead>
                        <tbody>
                        {registros.map(item => (
                            <tr>
                                <td>
                                    <Typography>Cliente: {item.lead_razao_social}</Typography>
                                    <Typography>ID Pedido: #{item.pedido_id}</Typography>
                                </td>
                                <td><Typography>R$ {convertFloatToMoney(item.valor)}</Typography></td>
                                <td><Typography>{item.transportadora_nome}</Typography></td>
                                <td><Typography>{item.rastreio}</Typography></td>
                                {/*<td className="text-center"><Link href={route('admin.pedidos.fretes.show', item.id)} icon={<Eye size={22}/>}/></td>*/}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </CardTable>
            </CardContainer>
        </Layout>
    )
}
export default Page
