import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import {router, useForm} from "@inertiajs/react";
import {InputAdornment, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

import "chart.js/auto";
import MetasAtingidas from "./Graficos/MetasAtingidas";
import {useState} from "react";
import {convertInputMoney} from "@/Components/Inputs/TextFieldMoney";
import convertFloatToMoney from "@/Helpers/converterDataHorario";
import * as React from "react";
import {converterMes, converterMesCompleto} from "@/Helpers/helper";

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

export default function ({meta, mes, ano, metasMensais, vendasMensais, setores, setor, vendasMensalUsuario}) {
    // const [mesSelecionado, setMesSelecionado] = useState(mes)
    // const [setorSelecionado, setSetorSelecionado] = useState(setor)
    const [valorMeta, setValorMeta] = useState(convertFloatToMoney(meta))
    const [mostarBtn, setMostarBtn] = useState(false)

    function submit(e) {
        e.preventDefault()
        router.post(route('admin.metas-vendas.empresa.update', 1), {
            valor: valorMeta, mes, ano, setor,
            _method: 'put',
        });
    }

    function selecionaPeriodo(mes, ano, setor) {
        router.get(route('admin.metas-vendas.empresa.index'), {mes, ano, setor})
    }

    router.on('success', () => setMostarBtn(false))

    return (
        <Layout container titlePage="Editar Meta de Vendas da Empresa" menu="menu-meta-vendas"
                submenu="meta-vendas-empresa"
                voltar={route('admin.metas-vendas.consultores.index')}>

            <div className="card card-body mb-4">
                <div className="row">
                    <div className="col-2">
                        <TextField label="Mẽs" select fullWidth defaultValue={mes}
                                   onChange={e => selecionaPeriodo(e.target.value, ano, setor)}>
                            {meses.map(item => <MenuItem key={item.mes} value={item.mes}>{item.nome}</MenuItem>)}
                        </TextField>
                    </div>
                    <div className="col-2">
                        <TextField label="Ano" select fullWidth defaultValue={ano}
                                   onChange={e => selecionaPeriodo(mes, e.target.value, setor)}>
                            <MenuItem value="2023">2023</MenuItem>
                            <MenuItem value="2024">2024</MenuItem>
                        </TextField>
                    </div>
                    <div className="col-2">
                        <TextField label="Setor" select fullWidth defaultValue={setor}
                                   onChange={e => selecionaPeriodo(mes, ano, e.target.value)}>
                            {setores.map(item => <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>)}
                        </TextField>
                    </div>
                </div>
            </div>

            <form onSubmit={submit}>
                <div className="row row-cols-1 p-3">
                    <div className="col mb-4">
                        <div className='row card card-body flex-row'>
                            <div className="row border-bottom mb-4 pb-2">
                                <div className="col">
                                    <span className="me-5"><b>Meta:</b> {converterMesCompleto(mes)}/{ano}</span>
                                    <span> <b>Setor:</b> {(setores.find(item => item.id == setor)).nome}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className='col-md-2 mb-3'>
                                    <TextField
                                        label="Meta" fullWidth required defaultValue={valorMeta}
                                        InputProps={{
                                            startAdornment: <InputAdornment
                                                position="start">R$</InputAdornment>
                                        }}
                                        onChange={e => {
                                            setValorMeta(convertInputMoney(e))
                                            setMostarBtn(true)
                                        }}/>
                                </div>
                                {mostarBtn && <div className="col-auto">
                                    <button type="submit" className="btn btn-success">Salvar</button>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <div className="card card-body mb-4">
                <div className="row">
                    <div className="col">
                        {/*<h6>Meta x Vendas de {ano} de {usuario.nome}</h6>*/}
                        <MetasAtingidas metasMensais={metasMensais} vendasMensais={vendasMensais}/>
                    </div>
                </div>
            </div>

        </Layout>
    )
}
