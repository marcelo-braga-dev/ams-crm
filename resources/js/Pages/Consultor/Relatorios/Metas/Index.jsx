import Layout from "@/Layouts/VendedorLayout/LayoutConsultor";
import "chart.js/auto";
import MetasAtingidas from "./Graficos/MetasAtingidas";
import { router } from "@inertiajs/react";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import convertFloatToMoney, { convertMoneyFloat } from "@/Helpers/converterDataHorario";

export default function ({ idUsuario, vendasMensalUsuario, ano, dados }) {

    const items = [
        {
            meta_index: 'jan', mes: 1
        }, {
            meta_index: 'fev', mes: 2
        }, {
            meta_index: 'mar', mes: 3
        }, {
            meta_index: 'abr', mes: 4
        }, {
            meta_index: 'mai', mes: 5
        }, {
            meta_index: 'jun', mes: 6
        }, {
            meta_index: 'jul', mes: 7
        }, {
            meta_index: 'ago', mes: 8
        }, {
            meta_index: 'set', mes: 9
        }, {
            meta_index: 'out', mes: 10
        }, {
            meta_index: 'nov', mes: 11
        }, {
            meta_index: 'dez', mes: 12
        }
    ]

    function verVendas() {
        router.get(route('consultor.relatorios.metas.show', idUsuario), { mes: '', ano: '' })
    }


    return (
        <Layout titlePage="Metas de Vendas" menu="relatorios-metas">
            <div className="row">
                <div className="col-auto pt-2 mb-4">
                    <h6>Metas x Vendas de</h6>
                </div>
                <div className="mb-4 col-md-2">
                    <TextField label="Ano" select fullWidth defaultValue={ano}
                        onChange={e => router.get(route('consultor.relatorios.metas.index'), { ano: e.target.value })}>
                        <MenuItem value="2023">2023</MenuItem>
                        <MenuItem value="2024">2024</MenuItem>
                    </TextField>
                </div>
            </div>

            <MetasAtingidas vendasMensalUsuario={vendasMensalUsuario} dados={dados} items={items} />

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

                                <tr>
                                    <td></td>
                                    {items.map(item =>
                                        <td key={item.meta_index}>
                                            <button onClick={() => router.get(route('consultor.relatorios.metas.show', idUsuario), { mes: item.mes, ano: ano })} >Ver Vendas</button>
                                        </td>
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
