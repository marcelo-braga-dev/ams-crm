import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import TextFieldMoney from "@/Components/Inputs/TextFieldMoney";
import {router, useForm} from "@inertiajs/react";
import TextFieldPorcentagem from "@/Components/Inputs/TextFieldPorcentagem";
import {InputAdornment, TextField} from "@mui/material";

export default function ({consultor, metas}) {
    const {data, setData} = useForm({
        metas: {
            jan: maskMoney((metas?.metas?.jan * 100).toString()),
            fev: metas?.metas?.fev,
            mar: metas?.metas?.mar,
            abr: metas?.metas?.abr,
            mai: metas?.metas?.mai,
            jun: metas?.metas?.jun,
            jul: metas?.metas?.jul,
            ago: metas?.metas?.ago,
            set: metas?.metas?.set,
            out: metas?.metas?.out,
            nov: metas?.metas?.nov,
            dez: metas?.metas?.dez
        },
        comissoes: {
            jan: metas?.comissoes?.jan,
            fev: metas?.comissoes?.fev,
            mar: metas?.comissoes?.mar,
            abr: metas?.comissoes?.abr,
            mai: metas?.comissoes?.mai,
            jun: metas?.comissoes?.jun,
            jul: metas?.comissoes?.jul,
            ago: metas?.comissoes?.ago,
            set: metas?.comissoes?.set,
            out: metas?.comissoes?.out,
            nov: metas?.comissoes?.nov,
            dez: metas?.comissoes?.dez
        },
        bonus: {
            jan: metas?.bonus?.jan,
            fev: metas?.bonus?.fev,
            mar: metas?.bonus?.mar,
            abr: metas?.bonus?.abr,
            mai: metas?.bonus?.mai,
            jun: metas?.bonus?.jun,
            jul: metas?.bonus?.jul,
            ago: metas?.bonus?.ago,
            set: metas?.bonus?.set,
            out: metas?.bonus?.out,
            nov: metas?.bonus?.nov,
            dez: metas?.bonus?.dez
        },
        comissoes_equipe: {
            jan: metas?.comissoes_equipe?.jan,
            fev: metas?.comissoes_equipe?.fev,
            mar: metas?.comissoes_equipe?.mar,
            abr: metas?.comissoes_equipe?.abr,
            mai: metas?.comissoes_equipe?.mai,
            jun: metas?.comissoes_equipe?.jun,
            jul: metas?.comissoes_equipe?.jul,
            ago: metas?.comissoes_equipe?.ago,
            set: metas?.comissoes_equipe?.set,
            out: metas?.comissoes_equipe?.out,
            nov: metas?.comissoes_equipe?.nov,
            dez: metas?.comissoes_equipe?.dez
        },
        bonus_equipe: {
            jan: metas?.bonus_equipe?.jan,
            fev: metas?.bonus_equipe?.fev,
            mar: metas?.bonus_equipe?.mar,
            abr: metas?.bonus_equipe?.abr,
            mai: metas?.bonus_equipe?.mai,
            jun: metas?.bonus_equipe?.jun,
            jul: metas?.bonus_equipe?.jul,
            ago: metas?.bonus_equipe?.ago,
            set: metas?.bonus_equipe?.set,
            out: metas?.bonus_equipe?.out,
            nov: metas?.bonus_equipe?.nov,
            dez: metas?.bonus_equipe?.dez
        },
    });

    function submit(e) {
        e.preventDefault()
        router.post(route('admin.metas-vendas.consultores.update', consultor.id), {
            '_method': 'put',
            ...data
        });
    }

    const items = [
        {
            mes: 'JANEIRO',
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
            mes: 'FEVEREIRO',
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
            mes: 'MARÇO',
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
            mes: 'ABRIL',
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
            mes: 'MAIO',
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
            mes: 'JUNHO',
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
            mes: 'JULHO',
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
            mes: 'AGOSTO',
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
            mes: 'SETEMBRO',
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
            mes: 'OUTUBRO',
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
            mes: 'NOVEMBRO',
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
            mes: 'DEZEMBRO',
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

    function maskMoney(valor, casas = 2) {
        let value = valor.replace('.', '').replace(',', '').replace(/\D/g, '')
        const options = {minimumFractionDigits: casas}

        return new Intl.NumberFormat('pt-BR', options).format(
            parseFloat(value) / (10 ** casas)
        )
    }

    return (
        <Layout container titlePage="Editar Meta de Venda" menu="meta-vendas" submenu="consultores"
                voltar={route('admin.metas-vendas.consultores.index')}>
            <div className="row mb-3 card card-body">
                <h6>Nome: {consultor.nome}</h6>
                <h6>Função: Supervisor</h6>
                <h6>Setor: Energia Solar</h6>
            </div>

            <form onSubmit={submit}>
                {items.map(item =>
                    <div className="row row-cols-1 p-3">
                        <div className="col mb-4">
                            <div className='row card card-body flex-row'>
                                <div className="row border-bottom mb-2">
                                    <h5>MÊS: {item.mes}</h5>
                                </div>
                                <div className="row">
                                    <div className="row mb-3">
                                        <div className="col">
                                            <span>INDIVIDUAL</span>
                                        </div>
                                        <div className="col">
                                            <span className={'text-danger'}> Alcançado: R$ 564.564,00 (-23%)</span>
                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className='col'>
                                            <TextField
                                                label="Meta" fullWidth defaultValue={item.meta}
                                                value={data.metas?.[item.meta_index] ?? ''}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">R$</InputAdornment>
                                                }}
                                                onChange={e => setData({
                                                    ...data,
                                                    metas: {...data.metas, [item.meta_index]: maskMoney(e.target.value)}
                                                })}/>
                                        </div>
                                        <div className='col'>
                                            <TextField
                                                label="Comissão" fullWidth defaultValue={item.comissao}
                                                value={data.comissoes?.[item.meta_index] ?? ''}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="start">%</InputAdornment>
                                                }}
                                                onChange={e => setData({
                                                    ...data,
                                                    comissoes: {
                                                        ...data.comissoes,
                                                        [item.meta_index]: maskMoney(e.target.value, 3)
                                                    }
                                                })}/>
                                        </div>
                                        <div className='col'>
                                            <TextField
                                                label="Bônus" fullWidth defaultValue={item.bonus}
                                                value={data.bonus?.[item.meta_index] ?? ''}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">R$</InputAdornment>
                                                }}
                                                onChange={e => setData({
                                                    ...data,
                                                    bonus: {...data.bonus, [item.meta_index]: maskMoney(e.target.value)}
                                                })}/>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col">
                                            <span>EQUIPE</span>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-4">
                                            <span>Meta Equipe: R$ 300.000,00</span>
                                            <span className={'text-success d-block'}>
                                            Alcançado: R$ 447.564,00 (+15,3%)
                                        </span>
                                        </div>
                                        <div className='col-md-4'>
                                            <TextField
                                                label="Comissão Equipe" fullWidth defaultValue={item.comissao_equipe}
                                                value={data.comissoes_equipe?.[item.meta_index] ?? ''}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="start">%</InputAdornment>
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
                                                    startAdornment: <InputAdornment position="start">R$</InputAdornment>
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

                                    <div className="row">
                                        <table className="table">
                                            <thead>
                                            <tr>
                                                <td>Consultor(a)</td>
                                                <td>Meta</td>
                                                <td>Alcançado</td>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>
                                                    PESSOA 1
                                                </td>
                                                <td>R$150.00,00</td>
                                                <td>R$180.00,00</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    PESSOA 2
                                                </td>
                                                <td>R$150.00,00</td>
                                                <td>R$180.00,00</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    PESSOA 3
                                                </td>
                                                <td>R$150.00,00</td>
                                                <td>R$180.00,00</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)
                }


                <div className="col text-center">
                    <button type="submit" className="btn btn-primary">Salvar</button>
                </div>
            </form>

        </Layout>
    )
}
