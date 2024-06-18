import CardTitle from "@/Components/Cards/CardTitle";
import CardTable from "@/Components/Cards/CardTable";
import {Button, Stack, Typography} from "@mui/material";
import CardContainer from "@/Components/Cards/CardContainer";
import Avatar from "@mui/material/Avatar";
import convertFloatToMoney from "@/Helpers/converterDataHorario";

// Switch.js
import React, {useState} from 'react';
import Switch from "@/Components/Inputs/Switch";
import Checkbox2 from "@/Components/Inputs/Checkbox";
import Checkbox from '@mui/material/Checkbox';
import {BoxArrowUpRight, Eye, PencilSquare} from "react-bootstrap-icons";
import {toInteger} from "lodash";
import ToggleMenu from "@/Components/Inputs/ToggleMenu";
import MenuItem from "@mui/material/MenuItem";
import {router} from "@inertiajs/react";

const flexTable = {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #ccc'
}

const row = {
    display: 'flex',
    width: 'auto'
}

const cell = {
    flex: 1,
    padding: 80,
    border: '1px solid #ccc',
    whiteSpace: 'nowrap'
}

const url = [
    {nome: 'Visualizar', url: '/'},
    {nome: 'Editar', url: '/'},
];

export default function Tabela({produtos}) {

    return (
        <CardContainer>
            <CardTitle title="Produtos"/>
            <CardTable>
                <table className="table-1" style={{width: '100%'}}>
                    <thead>
                    <tr>
                        <th></th>
                        <th className="text-center">ID</th>
                        <th>Produto</th>
                        <th>Preço</th>
                        <th>Estoque</th>
                        <th>UND</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {produtos.map(item => {
                        const difEstoque = (item.estoque ?? 0) + (item.estoque_transito ?? 0)

                        return (
                            <tr>
                                <td className="text-center" style={{width: 70}}>
                                    <Switch keyx={item.id} size="small"/>
                                </td>
                                <td className="text-center" style={{padding: 0}}>
                                    <Typography variant="body2">#{item.id}</Typography></td>
                                <td>
                                    <Stack direction="row" spacing={2}>
                                        <a href={route('admin.produtos.show', item.id)}>
                                            <Avatar variant="rounded" style={{width: 60, height: 60}} src={item.foto}/>
                                        </a>
                                        <Stack>
                                            <Typography variant="body1" fontWeight="bold">{item.nome}</Typography>
                                            <Typography variant="body2">Distribuidora: NOME</Typography>
                                            <Typography variant="body2">Categoria: {item.categoria_nome}</Typography>
                                        </Stack>
                                    </Stack>
                                </td>
                                <td>
                                    <Typography>R$ {convertFloatToMoney(item.preco)} <PencilSquare cursor="pointer" size={13}/></Typography>
                                    <Typography variant="body2" marginTop={1}>
                                        R$ {convertFloatToMoney(item.preco_custo)} <PencilSquare cursor="pointer" size={13}/></Typography>
                                </td>
                                <td>
                                    <div className="row g-0">
                                        <div className="col-4"><Typography variant="body1">Local:</Typography></div>
                                        <div className="col-auto">
                                            <Typography display="inline" variant="body1">{item.estoque} </Typography> <PencilSquare cursor="pointer" size={13}/>
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
                                <td><Typography variant="body1">{item.unidade}</Typography></td>
                                <td className="text-center">
                                    <ToggleMenu>
                                        <MenuItem onClick={() => router.get(route('admin.produtos.show', item.id))}>
                                            Visualizar
                                        </MenuItem>
                                        <MenuItem onClick={() => router.get(route('admin.produtos-fornecedores.edit', item.id))}>
                                            Editar
                                        </MenuItem>
                                    </ToggleMenu>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </CardTable>
        </CardContainer>
    )
}
