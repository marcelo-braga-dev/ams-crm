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



    function submit(e) {
        e.preventDefault()
        router.post(route('admin.metas-vendas.consultores.update', usuario.id), {
            '_method': 'put',
            ...data
        });
    }

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
        <Layout container titlePage="Editar Meta de Vendas" menu="menu-meta-vendas" submenu="meta-vendas"
                voltar={route('admin.metas-vendas.consultores.index')}>
            <div className="row mb-3 card card-body">
                <div className="row">
                    <div className="col"><span>Nome: {usuario.nome}</span></div>
                    <div className="col"><span>Função: {usuario.funcao}</span></div>
                    <div className="col"><span>Setor: {usuario.setor}</span></div>
                </div>
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
                <div className="row row-cols-1 p-3">
                    <div className="col mb-4">
                        <div className='row card card-body flex-row'>
                            <div className="row border-bottom mb-4">
                                <div className="col"><h6>MÊS: </h6></div>
                            </div>
                            <div className="row">
                                <div className="row">
                                    <div className='col-md-2 mb-3'>
                                        <TextField
                                            label="Meta" fullWidth //defaultValue={item?.meta}
                                            //value={data.metas?.[item?.meta_index] ?? ''}
                                            InputProps={{
                                                startAdornment: <InputAdornment
                                                    position="start">R$</InputAdornment>
                                            }}
                                            onChange={e => setData({
                                                ...data,
                                                metas: {
                                                    ...data.metas,
                                                   // [item?.meta_index]: maskMoney(e.target.value)
                                                }
                                            })}/>
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

            <div className="row">
                <div className="col">
                    <h6>Meta x Vendas de {ano} de {usuario.nome}</h6>
                    {/*<MetasAtingidas items={items} dados={data} vendasMensalUsuario={vendasMensalUsuario}/>*/}
                </div>
            </div>

        </Layout>
    )
}
