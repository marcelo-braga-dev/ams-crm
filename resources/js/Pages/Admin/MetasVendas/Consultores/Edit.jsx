import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import {router, useForm} from "@inertiajs/react";
import {InputAdornment, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import convertFloatToMoney, {convertMoneyFloat} from "@/Helpers/converterDataHorario";

import "chart.js/auto";
import MetasAtingidas from "./Graficos/MetasAtingidas";
import {useState} from "react";

export default function ({usuario, dados, mes, ano, vendasMensalUsuario, vendasMensalSubordinados}) {
    const [mesSelecionado, setMesSelecionado] = useState(mes)

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

    function submit(e) {
        e.preventDefault()
        router.post(route('admin.metas-vendas.consultores.update', usuario.id), {
            '_method': 'put',
            ...data
        });
    }

    const items = [
        {
            mes: 'JANEIRO/' + ano,
            meta: data?.metas?.jan,
            meta_index: 'jan',
            mes_num: 1,
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
            mes_num: 2,
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
            mes_num: 3,
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
            mes_num: 4,
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
            mes_num: 5,
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
            mes_num: 6,
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
            mes_num: 7,
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
            mes_num: 8,
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
            mes_num: 9,
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
            mes_num: 10,
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
            mes_num: 11,
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
            mes_num: 12,
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

    function maskMoney(valor, casas = 2) {
        let value = valor.replace('.', '').replace(',', '').replace(/\D/g, '')
        const options = {minimumFractionDigits: casas}

        return new Intl.NumberFormat('pt-BR', options).format(
            parseFloat(value) / (10 ** casas)
        )
    }

    const meses = [
        {mes: '1', nome: 'Janeiro'},
        {mes: '2', nome: 'Fevereiro'},
        {mes: '3', nome: 'Março'},
        {mes: '4', nome: 'Abril'},
        {mes: '5', nome: 'Maio'},
        {mes: '6', nome: 'Junho'},
        {mes: '7', nome: 'Julho'},
        {mes: '8', nome: 'Agosto'},
        {mes: '9', nome: 'Setembro'},
        {mes: '10', nome: 'Outubro'},
        {mes: '11', nome: 'Novembro'},
        {mes: '12', nome: 'Dezembro'},
    ]

    return (
        <Layout container titlePage="Editar Meta de Venda" menu="menu-meta-vendas" submenu="meta-vendas"
                voltar={route('admin.metas-vendas.consultores.index')}>
            <div className="row mb-3 card card-body">
                <h6>Nome: {usuario.nome}</h6>
                <h6>Função: {usuario.tipo}</h6>
                <h6>Setor: {usuario.setor}</h6>
            </div>
            <div className="card card-body mb-4">
                <div className="row">
                    <div className="col-2">
                        <TextField label="Mẽs" select fullWidth defaultValue={mesSelecionado}
                                   onChange={e => setMesSelecionado(e.target.value)}>
                            {meses.map(item => <MenuItem value={item.mes}>{item.nome}</MenuItem>)}
                        </TextField>
                    </div>
                    <div className="col-2">
                        <TextField label="Ano" select fullWidth defaultValue={ano}
                                   onChange={e => router.get(route('admin.metas-vendas.consultores.edit', usuario.id), {ano: e.target.value})}>
                            <MenuItem value="2023">2023</MenuItem>
                            <MenuItem value="2024">2024</MenuItem>
                        </TextField>
                    </div>
                </div>
            </div>

            <form onSubmit={submit}>
                {items.map(item => {
                        const vendaMensal = vendasMensalUsuario[item.meta_index]
                        const metaMensal = convertMoneyFloat(data.metas?.[item?.meta_index] ?? 0)
                        const margemAtingida = metaMensal > 0 ? (vendaMensal / metaMensal * 100) : null
                        let somaAlcancadoSubordinados = 0
                        let somaMetasSubordinados = 0
                        let margemTotal = 0

                        return (
                            (item.mes_num == mesSelecionado) &&
                            <div className="row row-cols-1 p-3">
                                <div className="col mb-4">
                                    <div className='row card card-body flex-row'>
                                        <div className="row border-bottom mb-2">
                                            <div className="col"><h6>MÊS: {item.mes}</h6></div>
                                            <div className="col-auto">
                                                {margemAtingida ? <a className="btn btn-primary btn-sm mb-1 py-1"
                                                                     href={route('admin.metas-vendas.vendas-faturadas.index', {
                                                                         id: usuario.id,
                                                                         mes: item.mes_num,
                                                                         ano: ano
                                                                     })}>
                                                    Ver Vendas
                                                </a> : ''}
                                            </div>

                                        </div>
                                        <div className="row">
                                            <div className="row mb-3">
                                                <div className="col">
                                                    <span>INDIVIDUAL</span>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className='col-md-2 mb-3'>
                                                    <TextField
                                                        label="Meta" fullWidth defaultValue={item.meta}
                                                        value={data.metas?.[item.meta_index] ?? ''}
                                                        InputProps={{
                                                            startAdornment: <InputAdornment
                                                                position="start">R$</InputAdornment>
                                                        }}
                                                        onChange={e => setData({
                                                            ...data,
                                                            metas: {
                                                                ...data.metas,
                                                                [item.meta_index]: maskMoney(e.target.value)
                                                            }
                                                        })}/>
                                                </div>
                                                <div className="col-3 pt-2">
                                                    <span
                                                        className={margemAtingida ? (margemAtingida >= 100 ? 'text-success' : 'text-danger') : ''}>
                                                        Alcançado: R$ {convertFloatToMoney(vendaMensal)} {margemAtingida ? `(${convertFloatToMoney(margemAtingida)}%)` : ''}
                                                    </span>
                                                </div>
                                                <div className="col-auto">
                                                    <button type="submit" className="btn btn-success">Salvar</button>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-2 mb-3">
                                                    <TextField
                                                        label="Comissão" fullWidth defaultValue={item.comissao}
                                                        value={data.comissoes?.[item.meta_index] ?? ''}
                                                        InputProps={{
                                                            endAdornment: <InputAdornment
                                                                position="start">%</InputAdornment>
                                                        }}
                                                        onChange={e => setData({
                                                            ...data,
                                                            comissoes: {
                                                                ...data.comissoes,
                                                                [item.meta_index]: maskMoney(e.target.value, 3)
                                                            }
                                                        })}/>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-2 mb-3">
                                                    <TextField
                                                        label="Bônus" fullWidth defaultValue={item.bonus}
                                                        value={data.bonus?.[item.meta_index] ?? ''}
                                                        InputProps={{
                                                            startAdornment: <InputAdornment
                                                                position="start">R$</InputAdornment>
                                                        }}
                                                        onChange={e => setData({
                                                            ...data,
                                                            bonus: {
                                                                ...data.bonus,
                                                                [item.meta_index]: maskMoney(e.target.value)
                                                            }
                                                        })}/>
                                                </div>
                                            </div>

                                            {usuario.tipo === 'supervisor' && <>
                                                <div className="row mb-3 pt-4 border-top">
                                                    <div className="col">
                                                        <span>EQUIPE</span>
                                                    </div>
                                                </div>

                                                <div className="row mb-3">
                                                    <div className='col-md-4'>
                                                        <TextField
                                                            label="Comissão Equipe" fullWidth
                                                            defaultValue={item.comissao_equipe}
                                                            value={data.comissoes_equipe?.[item.meta_index] ?? ''}
                                                            InputProps={{
                                                                endAdornment: <InputAdornment
                                                                    position="start">%</InputAdornment>
                                                            }}
                                                            onChange={e => setData({
                                                                ...data,
                                                                comissoes_equipe: {
                                                                    ...data.comissoes_equipe,
                                                                    [item.meta_index]: maskMoney(e.target.value, 3)
                                                                }
                                                            })}/>
                                                    </div>
                                                    <div className='col-md-4'>
                                                        <TextField
                                                            label="Bônus" fullWidth defaultValue={item.bonus_equipe}
                                                            value={data.bonus_equipe?.[item.meta_index] ?? ''}
                                                            InputProps={{
                                                                startAdornment: <InputAdornment
                                                                    position="start">R$</InputAdornment>
                                                            }}
                                                            onChange={e => setData({
                                                                ...data,
                                                                bonus_equipe: {
                                                                    ...data.bonus_equipe,
                                                                    [item.meta_index]: maskMoney(e.target.value)
                                                                }
                                                            })}/>
                                                    </div>
                                                </div>

                                                {/*Tabela comissões subordinados*/}
                                                <div className="row">
                                                    <table className="table">
                                                        <thead>
                                                        <tr>
                                                            <td>Consultor(a)</td>
                                                            <td>Meta</td>
                                                            <td>Alcançado</td>
                                                            <td></td>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {vendasMensalSubordinados.map(subordinado => {
                                                                const meta = subordinado.metas[item.meta_index]
                                                                const vendas = subordinado.vendas[item.meta_index]
                                                                const margem = meta > 0 ? (vendas / meta * 100) : null
                                                                somaAlcancadoSubordinados += (vendas ?? 0)
                                                                somaMetasSubordinados += (meta ?? 0)
                                                                margemTotal = somaMetasSubordinados > 0 ? (somaAlcancadoSubordinados / somaMetasSubordinados * 100) : null

                                                                return (
                                                                    <tr className={margem ? (margem >= 100 ? 'text-success' : 'text-danger') : ''}>
                                                                        <td>
                                                                            {subordinado.nome}
                                                                        </td>
                                                                        <td>R$ {convertFloatToMoney(meta)}</td>
                                                                        <td>R$ {convertFloatToMoney(vendas)} ({convertFloatToMoney(margem)}%)</td>
                                                                        <td>
                                                                            {margem ?
                                                                                <a className="btn btn-link text-dark btn-sm mb-0"
                                                                                   href={route('admin.metas-vendas.vendas-faturadas.index', {
                                                                                       id: subordinado.id,
                                                                                       mes: item.mes_num,
                                                                                       ano: ano
                                                                                   })}>
                                                                                    Ver Vendas
                                                                                </a> : ''}
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            }
                                                        )}
                                                        <tr className={'bg-light ' + (margemTotal ? (margemTotal >= 100 ? 'text-success' : 'text-danger') : '')}>
                                                            <td>
                                                                TOTAL
                                                            </td>
                                                            <td>R$ {convertFloatToMoney(somaMetasSubordinados)}</td>
                                                            <td>R$ {convertFloatToMoney(somaAlcancadoSubordinados)} ({convertFloatToMoney(margemTotal)}%)</td>
                                                            <td></td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                )
                }
            </form>

            <div className="row">
                <div className="col">
                    <h6>Meta x Vendas de {ano} de {usuario.nome}</h6>
                    <MetasAtingidas items={items} dados={data} vendasMensalUsuario={vendasMensalUsuario}/>
                </div>
            </div>

        </Layout>
    )
}
