import CardTitle from "@/Components/Cards/CardTitle";
import CardTable from "@/Components/Cards/CardTable";
import {Stack, TextField, Typography} from "@mui/material";
import CardContainer from "@/Components/Cards/CardContainer";
import Avatar from "@mui/material/Avatar";
import convertFloatToMoney from "@/Helpers/converterDataHorario";
import CircularProgress from '@mui/material/CircularProgress';

import React, {useEffect, useState} from 'react';
import Switch from "@/Components/Inputs/Switch";
import {Check, PencilSquare, X} from "react-bootstrap-icons";
import ToggleMenu from "@/Components/Inputs/ToggleMenu";
import MenuItem from "@mui/material/MenuItem";
import {router} from "@inertiajs/react";

export default function Tabela({isFinanceiro, fornecedorSel}) {
    const [editEstoqueLocal, setEditEstoqueLocal] = useState(false)
    const [qtdEtoqueLocal, setQtdEtoqueLocal] = useState()
    const [carregando, setCarregando] = useState(false)
    const [produtos, setProdutos] = useState([])

    useEffect(() => {
        getProdutos()
    }, [fornecedorSel]);

    function updateEstoqueLocal(id) {
        setCarregando(true)
        setEditEstoqueLocal(false)
        router.post(route('admin.produtos.update-estoque-local'), {id: id, estoque: qtdEtoqueLocal}, {preserveScroll: true})
    }

    function updateStatus(id, status) {
        router.post(route('admin.produtos.update-status'), {id: id, status: status}, {preserveScroll: true})
    }

    function getProdutos() {
        axios.get(route('admin.produtos.get-produtos', {fornecedor: fornecedorSel}))
            .then(res => {
                setProdutos(res.data)
            })
    }

    router.on('success', () => {
        setCarregando(false)
        getProdutos()
    })

    return (
        <CardContainer>
            <CardTitle title="Produtos">
                <a className="btn btn-primary" href={route('admin.produtos.create')}>Cadastrar</a>
            </CardTitle>
            <CardTable>
                <table className="table-1" style={{width: '100%'}}>
                    <thead>
                    <tr>
                        <th></th>
                        <th className="text-center">ID</th>
                        <th>Produtos</th>
                        <th>Preços</th>
                        <th>Estoques</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {produtos.map(item => {
                        const difEstoque = (item.estoque ?? 0) + (item.estoque_transito ?? 0)

                        return (<tr key={item.id}>
                            <td className="text-center" style={{width: 70}}>
                                <Switch onChange={value => updateStatus(item.id, value)} checked={item.status} size="small"/>
                            </td>
                            <td className="text-center" style={{padding: 0}}>
                                <Typography variant="body2">#{item.id}</Typography></td>
                            <td>
                                <Stack direction="row" spacing={2}>
                                    <a href={route('admin.produtos.show', item.id)}>
                                        <Avatar variant="rounded" style={{width: 60, height: 60}} src={item.foto}/>
                                    </a>
                                    <Stack>
                                        <Typography component="a" href={route('admin.produtos.show', item.id)} variant="body1" fontWeight="bold">
                                            {item.nome}
                                        </Typography>
                                        <Typography variant="body2">Distribuidora: {item.fornecedor}</Typography>
                                        <Stack direction="row" spacing={3}>
                                            <Typography variant="body2" display="inline-block">Categoria: {item.categoria_nome}</Typography>
                                            <Typography variant="body2" display="inline-flex">Unidade: {item.unidade}</Typography>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </td>
                            <td>
                                <Typography>R$ {convertFloatToMoney(item.preco)}</Typography>
                                {isFinanceiro && <Typography variant="body2" marginTop={1}>R$ {convertFloatToMoney(item.preco_custo)}</Typography>}
                            </td>
                            <td>
                                <div className="row g-0">
                                    <div className="col-4"><Typography variant="body1">Local:</Typography></div>
                                    <div className="col-auto">
                                        {editEstoqueLocal !== item.id && <>
                                            <Typography display="inline" variant="body1" className="me-2">{item.estoque}</Typography>
                                            {carregando
                                                ? <CircularProgress size={12}/>
                                                : <PencilSquare cursor="pointer" size={13} onClick={() => {
                                                    setEditEstoqueLocal(item.id)
                                                    setQtdEtoqueLocal(item.estoque)
                                                }}/>
                                            }
                                        </>}
                                        {editEstoqueLocal === item.id && <>
                                            <TextField size="small" defaultValue={item.estoque} className="me-1" variant="standard" sx={{width: 30}}
                                                       onChange={e => setQtdEtoqueLocal(e.target.value)}/>
                                            <Check cursor="pointer" size={25} color="green" className="me-1" onClick={() => updateEstoqueLocal(item.id)}/>
                                            <X cursor="pointer" size={25} color="red" onClick={() => setEditEstoqueLocal(false)}/>
                                        </>}
                                    </div>
                                </div>
                                <div className="row g-0">
                                    <div className="col-4"><Typography variant="body2">Trans.:</Typography></div>
                                    <div className="col-auto"><Typography variant="body2">{item.estoque_transito}</Typography></div>
                                </div>

                                <div className="row g-0">
                                    <div className="col-4"><Typography variant="body2">Total:</Typography></div>
                                    <div className="col-auto"><Typography variant="body2">{difEstoque}</Typography></div>
                                </div>
                            </td>
                            <td className="text-center">
                                <ToggleMenu>
                                    <MenuItem onClick={() => router.get(route('admin.produtos.show', item.id))}>
                                        Visualizar
                                    </MenuItem>
                                    <MenuItem onClick={() => router.get(route('admin.produtos.edit', item.id))}>
                                        Editar
                                    </MenuItem>
                                </ToggleMenu>
                            </td>
                        </tr>)
                    })}
                    </tbody>
                </table>
            </CardTable>
        </CardContainer>
    )
}
