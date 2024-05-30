import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import {router, useForm} from "@inertiajs/react";
import {InputAdornment, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

import "chart.js/auto";
import MetasAtingidas from "./Graficos/MetasAtingidas";
import {useState} from "react";
import {convertInputMoney} from "@/Components/Inputs/TextFieldMoney";
import convertFloatToMoney from "@/Helpers/converterDataHorario";
import {converterMesCompleto} from "@/Helpers/helper";
import * as React from "react";

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

export default function ({
                             usuario,
                             mes,
                             ano,
                             meta,
                             metasMensais,
                             vendasMensais,
                             vendasMensalUsuario,
                             vendasMensalSubordinados
                         }) {
    const [mesSelecionado, setMesSelecionado] = useState(mes)
    const [valorMeta, setValorMeta] = useState(convertFloatToMoney(meta))
    const [mostarBtn, setMostarBtn] = useState(false)

    function submit(e) {
        e.preventDefault()
        router.post(route('admin.metas-vendas.consultores.update', usuario.id), {
            mes, ano, valor: valorMeta, '_method': 'put',
        });
    }

    function selecionaPeriodo(mes, ano) {
        router.get(route('admin.metas-vendas.consultores.edit', usuario.id), {mes, ano})
    }

    router.on('success', () => setMostarBtn(false))

    return (
        <Layout container titlePage="Editar Meta de Vendas" menu="menu-meta-vendas" submenu="meta-vendas"
                voltar={route('admin.metas-vendas.consultores.index')}>
            <div className="mb-4 card card-body">
                <div className="row">
                    <div className="col"><span><b>Nome:</b> {usuario.nome}</span></div>
                    <div className="col"><span><b>Função:</b> {usuario.funcao}</span></div>
                    <div className="col"><span><b>Setor:</b> {usuario.setor}</span></div>
                </div>
            </div>
            <div className="card card-body mb-4">
                <div className="row">
                    <div className="col-2">
                        <TextField label="Mẽs" select fullWidth defaultValue={mesSelecionado}
                                   onChange={e => selecionaPeriodo(e.target.value, ano)}>
                            {meses.map(item => <MenuItem key={item.mes} value={item.mes}>{item.nome}</MenuItem>)}
                        </TextField>
                    </div>
                    <div className="col-2">
                        <TextField label="Ano" select fullWidth defaultValue={ano}
                                   onChange={e => selecionaPeriodo(mes, e.target.value)}>
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
                            <div className="row border-bottom mb-4 pb-2">
                                <div className="col"><span className="me-5"><b>Meta:</b> {converterMesCompleto(mes)}/{ano}</span></div>
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
                        <h6>Meta x Vendas de {ano} de {usuario.nome}</h6>
                        <MetasAtingidas metasMensais={metasMensais} vendasMensais={vendasMensais}/>
                    </div>
                </div>
            </div>

            <div className="card card-body">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                        <tr>
                            <th></th>
                            {meses.map(item => <th>{item.nome}</th>)}
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th>Metas</th>
                            {meses.map(item => <td>R$ {convertFloatToMoney(metasMensais[item.mes])}</td>)}
                        </tr>
                        <tr>
                            <th>Vendas</th>
                            {meses.map(item => <td>R$ {convertFloatToMoney(vendasMensais[item.mes]?.vendas)}</td>)}
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    )
}
