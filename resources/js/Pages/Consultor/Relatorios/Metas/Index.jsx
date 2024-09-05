import Layout from "@/Layouts/Layout";
import MetasAtingidas from "./Graficos/MetasAtingidas";
import {router} from "@inertiajs/react";
import convertFloatToMoney from "@/Helpers/converterDataHorario";
import {round} from "lodash";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import CardTitle from "@/Components/Cards/CardTitle";
import {BarChart, Truck} from "react-bootstrap-icons";
import MetasDistribuidoras from "./Graficos/MetasDistribuidoras.jsx";

export default function ({idUsuario, vendas, vendasDistribuidoras, metas, ano}) {

    const meses = [
        {abv: 'jan', mes: 1, nome: 'Janeiro'},
        {abv: 'fev', mes: 2, nome: 'Fevereiro'},
        {abv: 'mar', mes: 3, nome: 'Março'},
        {abv: 'abr', mes: 4, nome: 'Abril'},
        {abv: 'mai', mes: 5, nome: 'Maio'},
        {abv: 'jun', mes: 6, nome: 'Junho'},
        {abv: 'jul', mes: 7, nome: 'Junho'},
        {abv: 'ago', mes: 8, nome: 'Agosto'},
        {abv: 'set', mes: 9, nome: 'Setembro'},
        {abv: 'out', mes: 10, nome: 'Outubro'},
        {abv: 'nov', mes: 11, nome: 'Novembro'},
        {abv: 'dez', mes: 12, nome: 'Dezembro'}
    ]

    function verVendas() {
        router.get(route('consultor.relatorios.metas.show', idUsuario), {mes: '', ano: ''})
    }

    return (
        <Layout empty titlePage="Metas de Vendas" menu="dashboards" submenu="dashboards-vendas">
            <div className="row">
                <div className="col-md-8">
                    <CardContainer>
                        <CardTitle title="Meta x Vendas" icon={<BarChart size={22}/>}/>
                        <CardBody>
                            <MetasAtingidas vendas={vendas} metas={metas} meses={meses}/>
                        </CardBody>
                    </CardContainer>
                </div>
                <div className="col">
                    <CardContainer>
                        <CardTitle title="Vendas por Distribuidora" icon={<Truck size={22}/>}/>
                        <CardBody>
                            <MetasDistribuidoras vendasDistribuidoras={vendasDistribuidoras} metas={metas}/>
                        </CardBody>
                    </CardContainer>
                </div>
            </div>


            <CardContainer>
                <CardBody>
                    <table className="table table-sm">
                        <thead>
                        <tr>
                            <td className="text-center"><b>Mês</b></td>
                            <td><b>Metas</b></td>
                            <td><b>Vendas</b></td>
                            <td className="text-center"><b>Qtd.</b></td>
                            <td><b>Meta x Vendas</b></td>
                            <td></td>
                        </tr>
                        </thead>
                        <tbody>
                        {meses.map(item => {
                            const meta = metas?.[item.mes] ?? 0
                            const vendasMes = vendas?.[item.mes]?.vendas ?? 0
                            const qtd = vendas?.[item.mes]?.qtd

                            const dif = vendasMes - meta
                            const margem = round((dif / meta * 100) + 100, 2)

                            return (
                                <tr>
                                    <td className="text-center"><b>{item.abv.toUpperCase()}</b></td>
                                    <td>R$ {convertFloatToMoney(meta)}</td>
                                    <td>R$ {convertFloatToMoney(vendasMes)}</td>
                                    <td className="text-center">{qtd}</td>
                                    <td className={dif > 0 ? 'text-success' : (vendasMes > 0 ? 'text-danger' : '')}>
                                        {vendasMes > 0 ? <span>R$ {convertFloatToMoney(dif)} ({margem}%)</span> : 'R$ 0,00'}
                                    </td>
                                    <td>
                                        <a className="btn btn-link btn-sm p-0 m-0"
                                           href={route('consultor.relatorios.metas.show', [{id: idUsuario}, {mes: item.mes}, {ano: ano}])}>
                                            Ver Vendas
                                        </a>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </CardBody>
            </CardContainer>
        </Layout>
    )
}
