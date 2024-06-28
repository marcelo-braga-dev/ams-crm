import Layout from "@/Layouts/Layout";
import {router, useForm} from "@inertiajs/react";
import {InputAdornment, Stack, TextField, Typography} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

import "chart.js/auto";
import MetasAtingidas from "./Graficos/MetasAtingidas";
import {useState} from "react";
import {convertInputMoney} from "@/Components/Inputs/TextFieldMoney";
import convertFloatToMoney from "@/Helpers/converterDataHorario";
import {converterMesCompleto} from "@/Helpers/helper";
import * as React from "react";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import CardTitle from "@/Components/Cards/CardTitle";
import Avatar from "@mui/material/Avatar";

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
                             usuarios,
                             mes,
                             ano,
                             meta,
                             metasMensais,
                             vendasMensais,
                         }) {
    const [mesSelecionado, setMesSelecionado] = useState(mes)
    const [valorMeta, setValorMeta] = useState(convertFloatToMoney(meta))
    const [mostarBtn, setMostarBtn] = useState(false)

    function submit(e) {
        e.preventDefault()
        router.post(route('admin.metas-vendas.consultores.update', usuario.id), {
            mes, ano, valor: valorMeta, _method: 'put',
        });
    }

    const selecionaPeriodo = (mes, ano) => {
        router.get(route('admin.metas-vendas.consultores.index'), {id: usuario.id, mes, ano})
    }

    const selecionarusuario = (id) => {
        router.get(route('admin.metas-vendas.consultores.index'), {id, mes, ano})
    }

    router.on('success', () => setMostarBtn(false))

    return (
        <Layout container titlePage="Editar Meta de Vendas" menu="menu-meta-vendas" submenu="meta-vendas"
                voltar={route('admin.metas-vendas.consultores.index')}>
            <CardContainer>
                <CardBody>
                    <div className="row">
                        <div className="col-md-3">
                            <TextField label="Usuário" fullWidth select value={usuario.id}
                                       onChange={e => selecionarusuario(e.target.value)}>
                                {usuarios.map(item => <MenuItem key={item.id} value={item.id}>
                                    <Stack direction="row" spacing={1}>
                                        <Avatar src={item.foto} sx={{width: 25, height: 25}}/>
                                        <Typography>{item.nome}</Typography>
                                    </Stack>
                                </MenuItem>)}
                            </TextField>
                        </div>
                    </div>
                </CardBody>
            </CardContainer>
            <CardContainer>
                <CardBody>
                    <div className="row">
                        <div className="col"><span><b>Nome:</b> {usuario.nome}</span></div>
                        <div className="col"><span><b>Função:</b> {usuario.funcao}</span></div>
                        <div className="col"><span><b>Setor:</b> {usuario.setor}</span></div>
                    </div>
                </CardBody>
            </CardContainer>

            <CardContainer>
                <CardBody>
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
                </CardBody>
            </CardContainer>

            <form onSubmit={submit}>
                <CardContainer>
                    <CardBody>
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
                    </CardBody>
                </CardContainer>
            </form>

            <CardContainer>
                <CardTitle title={`Meta x Vendas de ${ano} de ${usuario.nome}`}/>
                <CardBody>
                    <div className="row">
                        <div className="col">
                            <h6></h6>
                            <MetasAtingidas metasMensais={metasMensais} vendasMensais={vendasMensais}/>
                        </div>
                    </div>

                    <div className="table-responsive mt-4">
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
                </CardBody>
            </CardContainer>
        </Layout>
    )
}
