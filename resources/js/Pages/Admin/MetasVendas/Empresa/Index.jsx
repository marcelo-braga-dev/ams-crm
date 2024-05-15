import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import {router, useForm} from "@inertiajs/react";
import {InputAdornment, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

import "chart.js/auto";
import MetasAtingidas from "./Graficos/MetasAtingidas";
import {useState} from "react";

export default function ({dados, mes, ano, vendasMensalUsuario}) {
    const [mesSelecionado, setMesSelecionado] = useState(mes)
    const [valorMeta, setValorMeta] = useState()
console.log(vendasMensalUsuario)
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
        }
    });

    function submit(e) {
        router.post(route('admin.metas-vendas.empresa.update', 1), {
            ...data, valor: valorMeta,
            _method: 'put',

        });
        e.preventDefault()
    }

    const meses = [
        {mes: '1', abv: 'jan', nome: 'Janeiro'},
        {mes: '2', abv: 'fev', nome: 'Fevereiro'},
        {mes: '3', abv: 'mar', nome: 'Março'},
        {mes: '4', abv: 'abr', nome: 'Abril'},
        {mes: '5', abv: 'mai', nome: 'Maio'},
        {mes: '6', abv: 'jun', nome: 'Junho'},
        {mes: '7', abv: 'jul', nome: 'Julho'},
        {mes: '8', abv: 'ago', nome: 'Agosto'},
        {mes: '9', abv: 'set', nome: 'Setembro'},
        {mes: '10', abv: 'out', nome: 'Outubro'},
        {mes: '11', abv: 'nov', nome: 'Novembro'},
        {mes: '12', abv: 'dez', nome: 'Dezembro'},
    ]

    return (
        <Layout container titlePage="Editar Meta de Vendas da Empresa" menu="menu-meta-vendas"
                submenu="meta-vendas-empresa"
                voltar={route('admin.metas-vendas.consultores.index')}>

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
                                   onChange={e => router.get(route('admin.metas-vendas.consultores.edit', 0), {ano: e.target.value})}>
                            <MenuItem value="2023">2023</MenuItem>
                            <MenuItem value="2024">2024</MenuItem>
                        </TextField>
                    </div>
                </div>
            </div>


            <form onSubmit={submit}>
                <div className="row row-cols-1 p-3">
                    <div className="col mb-4">
                        <div className='row card card-body flex-row'>
                            <div className="row border-bottom mb-2">
                                <div className="col"><h6>MÊS: {mes}</h6></div>
                            </div>
                            <div className="row">
                                <div className="row mb-3">
                                    <div className="col">
                                        <span>Meta de Vendas Da Empresa</span>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className='col-md-2 mb-3'>
                                        <TextField
                                            label="Meta" fullWidth defaultValue={''}
                                            // value={data.metas?.[item.meta_index] ?? ''}
                                            InputProps={{
                                                startAdornment: <InputAdornment
                                                    position="start">R$</InputAdornment>
                                            }}
                                            onChange={e => setValorMeta(e.target.value)}/>
                                    </div>
                                    <div className="col-auto">
                                        <button type="submit" className="btn btn-success">Salvar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <div className="card card-body mb-4">
                <div className="row">
                    <div className="col">
                        {/*<h6>Meta x Vendas de {ano} de {usuario.nome}</h6>*/}
                        <MetasAtingidas items={meses} dados={data} vendasMensalUsuario={vendasMensalUsuario}/>
                    </div>
                </div>
            </div>

        </Layout>
)
}
