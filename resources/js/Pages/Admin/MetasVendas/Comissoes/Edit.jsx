import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import TextFieldMoney from "@/Components/Inputs/TextFieldMoney";
import {router, useForm} from "@inertiajs/react";
import {InputAdornment, TextField} from "@mui/material";

export default function ({consultor, dados}) {
    const {data, setData} = useForm({
        jan: dados?.jan,
        fev: dados?.fev,
        mar: dados?.mar,
        abr: dados?.abr,
        mai: dados?.mai,
        jun: dados?.jun,
        jul: dados?.jul,
        ago: dados?.ago,
        set: dados?.set,
        out: dados?.out,
        nov: dados?.nov,
        dez: dados?.dez,
    });

    function submit(e) {
        e.preventDefault()
        router.post(route('admin.metas-vendas.comissoes.update', consultor.id), {
            '_method': 'put',
            ...data
        });
    }

    return (
        <Layout container titlePage="Editar Meta de Venda" menu="meta-vendas" submenu="comissoes"
                voltar={route('admin.metas-vendas.comissoes.index')}>
            <div className="row mb-4">
                <span>{consultor.nome}</span>
            </div>

            <form onSubmit={submit}>
                <div className="row row-cols-2 row-cols-md-6">
                    <div className="col mb-4">
                        <TextField type="number" label="Janeiro" required inputProps={{step: 0.01}}
                                   defaultValue={data.jan}
                                   InputProps={{endAdornment: <InputAdornment position="start">%</InputAdornment>}}
                                   onChange={e => setData('jan', e.target.value)}/>
                    </div>
                    <div className="col mb-4">
                        <TextField type="number" label="Fevereiro" required inputProps={{step: 0.01}}
                                   defaultValue={data.fev}
                                   InputProps={{endAdornment: <InputAdornment position="start">%</InputAdornment>}}
                                   onChange={e => setData('fev', e.target.value)}/>
                    </div>
                    <div className="col mb-4">
                        <TextField type="number" label="Março" required inputProps={{step: 0.01}}
                                   defaultValue={data.mar}
                                   InputProps={{endAdornment: <InputAdornment position="start">%</InputAdornment>}}
                                   onChange={e => setData('mar', e.target.value)}/>
                    </div>
                    <div className="col mb-4">
                        <TextField type="number" label="Abril" required inputProps={{step: 0.01}}
                                   defaultValue={data.abr}
                                   InputProps={{endAdornment: <InputAdornment position="start">%</InputAdornment>}}
                                   onChange={e => setData('abr', e.target.value)}/>
                    </div>
                    <div className="col mb-4">
                        <TextField type="number" label="Maio" required inputProps={{step: 0.01}}
                                   defaultValue={data.mai}
                                   InputProps={{endAdornment: <InputAdornment position="start">%</InputAdornment>}}
                                   onChange={e => setData('mai', e.target.value)}/>
                    </div>
                    <div className="col mb-4">
                        <TextField type="number" label="Junho" required inputProps={{step: 0.01}}
                                   defaultValue={data.jun}
                                   InputProps={{endAdornment: <InputAdornment position="start">%</InputAdornment>}}
                                   onChange={e => setData('jun', e.target.value)}/>
                    </div>
                    <div className="col mb-4">
                        <TextField type="number" label="Julho" required inputProps={{step: 0.01}}
                                   defaultValue={data.jul}
                                   InputProps={{endAdornment: <InputAdornment position="start">%</InputAdornment>}}
                                   onChange={e => setData('jul', e.target.value)}/>
                    </div>
                    <div className="col mb-4">
                        <TextField type="number" label="Agosto" required inputProps={{step: 0.01}}
                                   defaultValue={data.ago}
                                   InputProps={{endAdornment: <InputAdornment position="start">%</InputAdornment>}}
                                   onChange={e => setData('ago', e.target.value)}/>
                    </div>
                    <div className="col mb-4">
                        <TextField type="number" label="Setembro" required inputProps={{step: 0.01}}
                                   defaultValue={data.set}
                                   InputProps={{endAdornment: <InputAdornment position="start">%</InputAdornment>}}
                                   onChange={e => setData('set', e.target.value)}/>
                    </div>
                    <div className="col mb-4">
                        <TextField type="number" label="Outubro" required inputProps={{step: 0.01}}
                                   defaultValue={data.out}
                                   InputProps={{endAdornment: <InputAdornment position="start">%</InputAdornment>}}
                                   onChange={e => setData('out', e.target.value)}/>
                    </div>
                    <div className="col mb-4">
                        <TextField type="number" label="Novembro" required inputProps={{step: 0.01}}
                                   defaultValue={data.nov}
                                   InputProps={{endAdornment: <InputAdornment position="start">%</InputAdornment>}}
                                   onChange={e => setData('nov', e.target.value)}/>
                    </div>
                    <div className="col mb-4">
                        <TextField type="number" label="Dezembro" required inputProps={{step: 0.01}}
                                   defaultValue={data.dez}
                                   InputProps={{endAdornment: <InputAdornment position="start">%</InputAdornment>}}
                                   onChange={e => setData('dez', e.target.value)}/>
                    </div>
                </div>
                <div className="col text-center">
                    <button type="submit" className="btn btn-primary">Salvar</button>
                </div>
            </form>

        </Layout>
    )
}
