import "chart.js/auto";
import MetasAtingidas from "./Graficos/MetasAtingidas";
import {router, useForm} from "@inertiajs/react";
import {TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import convertFloatToMoney, {convertMoneyFloat} from "@/Helpers/converterDataHorario";
import Layout from "@/Layouts/AdminLayout/LayoutAdmin";

export default function ({vendasMensalUsuario, ano, dados, vendasMensalSubordinados}) {

    const {data, setData} = useForm({
        ano: ano,
        metas: {
            jan: dados?.metas?.jan,
            fev: dados?.metas?.fev,
            mar: dados?.metas?.mar,
            abr: dados?.metas?.abr,
            mai: dados?.metas?.mai,
            jun: dados?.metas?.jun,
            jul: dados?.metas?.jul,
            ago: dados?.metas?.ago,
            set: dados?.metas?.set,
            out: dados?.metas?.out,
            nov: dados?.metas?.nov,
            dez: dados?.metas?.dez
        },
        comissoes: {
            jan: dados?.comissoes?.jan,
            fev: dados?.comissoes?.fev,
            mar: dados?.comissoes?.mar,
            abr: dados?.comissoes?.abr,
            mai: dados?.comissoes?.mai,
            jun: dados?.comissoes?.jun,
            jul: dados?.comissoes?.jul,
            ago: dados?.comissoes?.ago,
            set: dados?.comissoes?.set,
            out: dados?.comissoes?.out,
            nov: dados?.comissoes?.nov,
            dez: dados?.comissoes?.dez
        },
        bonus: {
            jan: dados?.bonus?.jan,
            fev: dados?.bonus?.fev,
            mar: dados?.bonus?.mar,
            abr: dados?.bonus?.abr,
            mai: dados?.bonus?.mai,
            jun: dados?.bonus?.jun,
            jul: dados?.bonus?.jul,
            ago: dados?.bonus?.ago,
            set: dados?.bonus?.set,
            out: dados?.bonus?.out,
            nov: dados?.bonus?.nov,
            dez: dados?.bonus?.dez
        },
        comissoes_equipe: {
            jan: dados?.comissoes_equipe?.jan,
            fev: dados?.comissoes_equipe?.fev,
            mar: dados?.comissoes_equipe?.mar,
            abr: dados?.comissoes_equipe?.abr,
            mai: dados?.comissoes_equipe?.mai,
            jun: dados?.comissoes_equipe?.jun,
            jul: dados?.comissoes_equipe?.jul,
            ago: dados?.comissoes_equipe?.ago,
            set: dados?.comissoes_equipe?.set,
            out: dados?.comissoes_equipe?.out,
            nov: dados?.comissoes_equipe?.nov,
            dez: dados?.comissoes_equipe?.dez
        },
        bonus_equipe: {
            jan: dados?.bonus_equipe?.jan,
            fev: dados?.bonus_equipe?.fev,
            mar: dados?.bonus_equipe?.mar,
            abr: dados?.bonus_equipe?.abr,
            mai: dados?.bonus_equipe?.mai,
            jun: dados?.bonus_equipe?.jun,
            jul: dados?.bonus_equipe?.jul,
            ago: dados?.bonus_equipe?.ago,
            set: dados?.bonus_equipe?.set,
            out: dados?.bonus_equipe?.out,
            nov: dados?.bonus_equipe?.nov,
            dez: dados?.bonus_equipe?.dez
        },
    });

    const items = [
        {
            mes: 'JANEIRO/' + ano,
            meta: data?.metas?.jan,
            meta_index: 'jan',
            comissao: data?.comissoes?.jan,
            comissao_index: 'comissao_jan',
            bonus: data.bonus_jan,
            bonus_index: 'bonus_jan',
            comissao_equipe: data.comissao_equipe_jan,
            comissao_equipe_index: 'comissao_equipe_jan',
            bonus_equipe: data.bonus_equipe_jan,
            bonus_equipe_index: 'bonus_equipe_jan',
        }, {
            mes: 'FEVEREIRO/' + ano,
            meta: data?.metas?.fev,
            meta_index: 'fev',
            comissao: data?.comissoes?.fev,
            comissao_index: 'comissao_fev',
            bonus: data.bonus_fev,
            bonus_index: 'bonus_fev',
            comissao_equipe: data.comissao_equipe_fev,
            comissao_equipe_index: 'comissao_equipe_fev',
            bonus_equipe: data.bonus_equipe_fev,
            bonus_equipe_index: 'bonus_equipe_fev',
        }, {
            mes: 'MARÇO/' + ano,
            meta: data?.metas?.mar,
            meta_index: 'mar',
            comissao: data?.comissoes?.mar,
            comissao_index: 'comissao_mar',
            bonus: data.bonus_mar,
            bonus_index: 'bonus_mar',
            comissao_equipe: data.comissao_equipe_mar,
            comissao_equipe_index: 'comissao_equipe_mar',
            bonus_equipe: data.bonus_equipe_mar,
            bonus_equipe_index: 'bonus_equipe_mar',
        }, {
            mes: 'ABRIL/' + ano,
            meta: data?.metas?.abr,
            meta_index: 'abr',
            comissao: data?.comissoes?.abr,
            comissao_index: 'comissao_abr',
            bonus: data.bonus_abr,
            bonus_index: 'bonus_abr',
            comissao_equipe: data.comissao_equipe_abr,
            comissao_equipe_index: 'comissao_equipe_abr',
            bonus_equipe: data.bonus_equipe_abr,
            bonus_equipe_index: 'bonus_equipe_abr',
        }, {
            mes: 'MAIO/' + ano,
            meta: data?.metas?.mai,
            meta_index: 'mai',
            comissao: data?.comissoes?.mai,
            comissao_index: 'comissao_mai',
            bonus: data.bonus_mai,
            bonus_index: 'bonus_mai',
            comissao_equipe: data.comissao_equipe_mai,
            comissao_equipe_index: 'comissao_equipe_mai',
            bonus_equipe: data.bonus_equipe_mai,
            bonus_equipe_index: 'bonus_equipe_mai',
        }, {
            mes: 'JUNHO/' + ano,
            meta: data?.metas?.jun,
            meta_index: 'jun',
            comissao: data?.comissoes?.jun,
            comissao_index: 'comissao_jun',
            bonus: data.bonus_jun,
            bonus_index: 'bonus_jun',
            comissao_equipe: data.comissao_equipe_jun,
            comissao_equipe_index: 'comissao_equipe_jun',
            bonus_equipe: data.bonus_equipe_jun,
            bonus_equipe_index: 'bonus_equipe_jun',
        }, {
            mes: 'JULHO/' + ano,
            meta: data?.metas?.jul,
            meta_index: 'jul',
            comissao: data?.comissoes?.jul,
            comissao_index: 'comissao_jul',
            bonus: data.bonus_jul,
            bonus_index: 'bonus_jul',
            comissao_equipe: data.comissao_equipe_jul,
            comissao_equipe_index: 'comissao_equipe_jul',
            bonus_equipe: data.bonus_equipe_jul,
            bonus_equipe_index: 'bonus_equipe_jul',
        }, {
            mes: 'AGOSTO/' + ano,
            meta: data?.metas?.ago,
            meta_index: 'ago',
            comissao: data?.comissoes?.ago,
            comissao_index: 'comissao_ago',
            bonus: data.bonus_ago,
            bonus_index: 'bonus_ago',
            comissao_equipe: data.comissao_equipe_ago,
            comissao_equipe_index: 'comissao_equipe_ago',
            bonus_equipe: data.bonus_equipe_ago,
            bonus_equipe_index: 'bonus_equipe_ago',
        }, {
            mes: 'SETEMBRO/' + ano,
            meta: data?.metas?.set,
            meta_index: 'set',
            comissao: data?.comissoes?.set,
            comissao_index: 'comissao_set',
            bonus: data.bonus_set,
            bonus_index: 'bonus_set',
            comissao_equipe: data.comissao_equipe_set,
            comissao_equipe_index: 'comissao_equipe_set',
            bonus_equipe: data.bonus_equipe_set,
            bonus_equipe_index: 'bonus_equipe_set',
        }, {
            mes: 'OUTUBRO/' + ano,
            meta: data?.metas?.out,
            meta_index: 'out',
            comissao: data?.comissoes?.out,
            comissao_index: 'comissao_out',
            bonus: data.bonus_out,
            bonus_index: 'bonus_out',
            comissao_equipe: data.comissao_equipe_out,
            comissao_equipe_index: 'comissao_equipe_out',
            bonus_equipe: data.bonus_equipe_out,
            bonus_equipe_index: 'bonus_equipe_out',
        }, {
            mes: 'NOVEMBRO/' + ano,
            meta: data?.metas?.nov,
            meta_index: 'nov',
            comissao: data?.comissoes?.nov,
            comissao_index: 'comissao_nov',
            bonus: data.bonus_nov,
            bonus_index: 'bonus_nov',
            comissao_equipe: data.comissao_equipe_nov,
            comissao_equipe_index: 'comissao_equipe_nov',
            bonus_equipe: data.bonus_equipe_nov,
            bonus_equipe_index: 'bonus_equipe_nov',
        }, {
            mes: 'DEZEMBRO/' + ano,
            meta: data?.metas?.dez,
            meta_index: 'dez',
            comissao: data?.comissoes?.dez,
            comissao_index: 'comissao_dez',
            bonus: data.bonus_dez,
            bonus_index: 'bonus_dez',
            comissao_equipe: data.comissao_equipe_dez,
            comissao_equipe_index: 'comissao_equipe_dez',
            bonus_equipe: data.bonus_equipe_dez,
            bonus_equipe_index: 'bonus_equipe_dez',
        }
    ]

    let somaAlcancadoSubordinados = 0
    let somaMetasSubordinados = 0
    let margemTotal = 0

    return (
        <Layout titlePage="Metas de Vendas" menu="relatorios" submenu="metas-vendas">
            <div className="row">
                <div className="col-auto mb-4 pt-2">
                    <h6>Metas x Vendas de</h6>
                </div>
                <div className="col-md-2 mb-4">
                    <TextField label="Ano" select fullWidth defaultValue={ano}
                               onChange={e => router.get(route('admin.relatorios.meta-vendas.index'), {ano: e.target.value})}>
                        <MenuItem value="2023">2023</MenuItem>
                        <MenuItem value="2024">2024</MenuItem>
                    </TextField>
                </div>
            </div>
            <MetasAtingidas vendasMensalUsuario={vendasMensalUsuario} items={items} dados={data}/>
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
                                        R$ {convertFloatToMoney(vendasMensalUsuario[item.meta_index] ?? 0)}
                                    </td>
                                )}
                            </tr>
                            <tr>
                                <td><b>DIFERENÇA</b></td>
                                {items.map(item => {
                                    const valor = convertMoneyFloat(dados.metas?.[item.meta_index] ?? 0) - (vendasMensalUsuario[item.meta_index] ?? 0)

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
                                        const vendaMensal = vendasMensalUsuario[item.meta_index]
                                        const metaMensal = convertMoneyFloat(data.metas?.[item?.meta_index] ?? 0)
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

            <div className="table-responsive mt-5">
                <table className="table table-sm">
                    <thead>
                    <tr>
                        <th>Consultor(a)</th>
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
                    {vendasMensalSubordinados.map(subordinado => {
                        const meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']
                        const meta = subordinado.metas['jan']
                        const vendas = subordinado.vendas['jan']
                        const margem = -(meta - vendas) / (meta) * 100

                        somaAlcancadoSubordinados += (vendas ?? 0)
                        somaMetasSubordinados += (meta ?? 0)
                        margemTotal = -(somaMetasSubordinados - somaAlcancadoSubordinados) / (somaMetasSubordinados) * 100

                        return (<>
                                <tr>
                                    <td rowSpan={3} className="text-wrap"><b>{subordinado.nome}</b></td>
                                    <td><b>METAS</b></td>
                                    {meses.map(mes => <td>R$ {convertFloatToMoney(subordinado.vendas[mes])}</td>)}
                                </tr>
                                <tr>
                                    <td><b>VENDAS</b></td>
                                    {meses.map(mes => <td>R$ {convertFloatToMoney(subordinado?.metas?.[mes])}</td>)}
                                </tr>
                                <tr>
                                    <td><b>MARGEM</b></td>
                                    {meses.map(mes => {
                                        const margem = -((((subordinado.vendas?.[mes] ?? 0) - (subordinado?.metas?.[mes] ?? 0)) / (subordinado.vendas?.[mes] ?? 1) * 100) - 100)

                                        return (
                                                <td className={margem >= 100 ? 'text-success' : 'text-danger'}>
                                                    {convertFloatToMoney(margem)}%
                                                </td>
                                            )
                                        }
                                    )}
                                </tr>
                                <tr>
                                    <td className="p-4 border-0"></td>
                                </tr>
                            </>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}
