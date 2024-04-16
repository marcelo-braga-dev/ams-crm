import Layout from "@/Layouts/VendedorLayout/LayoutConsultor";
import "chart.js/auto";
import MetasAtingidas from "./Graficos/MetasAtingidas";
import {router} from "@inertiajs/react";
import {TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import convertFloatToMoney, {convertMoneyFloat} from "@/Helpers/converterDataHorario";

export default function ({vendasMensalUsuario, ano, dados}) {

    const items = [
        {
            meta_index: 'jan',
        }, {
            meta_index: 'fev',
        }, {
            meta_index: 'mar',
        }, {
            meta_index: 'abr',
        }, {
            meta_index: 'mai',
        }, {
            meta_index: 'jun',
        }, {
            meta_index: 'jul',
        }, {
            meta_index: 'ago',
        }, {
            meta_index: 'set',
        }, {
            meta_index: 'out',
        }, {
            meta_index: 'nov',
        }, {
            meta_index: 'dez',
        }
    ]


    return (
        <Layout titlePage="Metas de Vendas" menu="relatorios-metas">
            <div className="row">
                <div className="col-auto mb-4 pt-2">
                    <h6>Metas x Vendas de</h6>
                </div>
                <div className="col-md-2 mb-4">
                    <TextField label="Ano" select fullWidth defaultValue={ano}
                               onChange={e => router.get(route('consultor.relatorios.metas.index'), {ano: e.target.value})}>
                        <MenuItem value="2023">2023</MenuItem>
                        <MenuItem value="2024">2024</MenuItem>
                    </TextField>
                </div>
            </div>

            <MetasAtingidas vendasMensalUsuario={vendasMensalUsuario} dados={dados} items={items}/>

            <div className="row">
                <div className="col">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                            <tr>
                                <th></th>
                                <th>JAN/{ano}</th>
                                <th>FEV/{ano}</th>
                                <th>MAR/{ano}</th>
                                <th>ABR/{ano}</th>
                                <th>MAI/{ano}</th>
                                <th>JUN/{ano}</th>
                                <th>JUL/{ano}</th>
                                <th>AGO/{ano}</th>
                                <th>SET/{ano}</th>
                                <th>OUT/{ano}</th>
                                <th>NOV/{ano}</th>
                                <th>DEZ/{ano}</th>
                            </tr>

                            </thead>
                            <tbody>
                            <tr>
                                <td><b>META</b></td>
                                {items.map(item =>
                                    <td key={item.meta_index}>
                                        R$ {dados.metas?.[item.meta_index] ?? 0}
                                    </td>
                                )}
                            </tr>
                            <tr>
                                <td><b>VENDAS</b></td>
                                {items.map(item =>
                                    <td key={item.meta_index}>
                                        R$ {convertFloatToMoney(vendasMensalUsuario[item.meta_index].vendas ?? 0)}
                                    </td>
                                )}
                            </tr>
                            <tr>
                                <td><b>DIFERENÇA</b></td>
                                {items.map(item => {
                                    const valor = convertMoneyFloat(dados.metas?.[item.meta_index] ?? 0) - (vendasMensalUsuario[item.meta_index].vendas ?? 0)

                                    return (
                                        <td key={item.meta_index}
                                            className={valor > 0 ? 'text-danger' : 'text-success'}>
                                            R$ {convertFloatToMoney(-valor)}
                                        </td>
                                    )
                                })}
                            </tr>
                            <tr>
                                <td><b>MARGEM</b></td>
                                {items.map(item => {
                                        const vendaMensal = vendasMensalUsuario[item.meta_index].vendas
                                        const metaMensal = convertMoneyFloat(dados?.metas?.[item?.meta_index] ?? 0)
                                        const margemAtingida = -(((metaMensal - vendaMensal) / (metaMensal) * 100) - 100)

                                        return (
                                            <td key={item.meta_index}
                                                className={margemAtingida >= 100 ? 'text-success' : 'text-danger'}>
                                                {convertFloatToMoney(margemAtingida)}%
                                            </td>
                                        )
                                    }
                                )}
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
