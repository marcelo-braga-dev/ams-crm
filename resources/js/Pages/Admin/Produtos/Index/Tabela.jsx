import CardTitle from "@/Components/Cards/CardTitle";
import CardTable from "@/Components/Cards/CardTable";
import {Stack, TextField, Typography} from "@mui/material";
import CardContainer from "@/Components/Cards/CardContainer";
import Avatar from "@mui/material/Avatar";
import convertFloatToMoney from "@/Helpers/converterDataHorario";

import React, {useEffect, useState} from 'react';
import Switch from "@/Components/Inputs/Switch";
import { PencilSquare} from "react-bootstrap-icons";
import ToggleMenu from "@/Components/Inputs/ToggleMenu";
import MenuItem from "@mui/material/MenuItem";
import {router} from "@inertiajs/react";
import LinearProgress from '@mui/material/LinearProgress';

export default function Tabela({isFinanceiro, fornecedorSel, categoriaSel}) {
    const [produtos, setProdutos] = useState([])
    const [estoqueSelecionado, setEstoqueSelecionado] = useState()

    const [notaEstoque, setNotaEstoque] = useState()
    const [dataEstoque, setDataEstoque] = useState()
    const [qtdEstoque, setQtdEstoque] = useState()
    const [carregando, setCarregando] = useState(true)

    useEffect(() => {
        getProdutos()
    }, [fornecedorSel, categoriaSel]);

    function updateStatus(id, status) {
        router.post(route('admin.produtos.update-status'), {id: id, status: status}, {preserveScroll: true})
    }

    function getProdutos() {
        setCarregando(true)
        axios.get(route('admin.produtos.get-produtos', {fornecedor: fornecedorSel, categoria: categoriaSel}))
            .then(res => {
                setProdutos(res.data)
                setCarregando(false)
            })
    }

    function atualizarEstoque(e) {
        e.preventDefault()
        router.post(route('admin.produtos.update-estoque'),
            {produto_id: estoqueSelecionado.id, nota: notaEstoque, data: dataEstoque, qtd: qtdEstoque}, {preserveScroll: true})
    }

    router.on('success', () => {
        getProdutos()
        setNotaEstoque()
        setDataEstoque()
        setQtdEstoque()
    })

    return (
        <CardContainer>
            <CardTitle title="Produtos" subtitle={produtos?.length + ' produtos'}>
                <a className="btn btn-primary" href={route('admin.produtos.create')}>Cadastrar</a>
            </CardTitle>
            <CardTable>
                {!!produtos?.length &&
                    <table className="table-1" style={{width: '100%'}}>
                        <thead>
                        <tr>
                            <th></th>
                            <th className="text-center">ID</th>
                            <th>Produtos</th>
                            <th>Preços</th>
                            <th className="text-center">Estoques</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {produtos.map(item => {
                            return (
                                <tr key={item.id}>
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
                                    <td className="text-center">
                                        {item.estoque ?? 0} <PencilSquare cursor="pointer" color="green"
                                                                          data-bs-toggle="modal" data-bs-target="#exampleModal"
                                                                          onClick={() => setEstoqueSelecionado(item)}/>
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
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                }
                {carregando && <LinearProgress color="inherit"/>}
            </CardTable>

            <div className="modal fade mt-6" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Atualizar Estoque</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={atualizarEstoque}>
                            <div className="modal-body">
                                <div className="row mb-4 pb-3 border-bottom">
                                    <div className="col">
                                        <Stack direction="row" spacing={2}>
                                            <Avatar variant="rounded" style={{width: 60, height: 60}} src={estoqueSelecionado?.foto}/>
                                            <Stack>
                                                <Typography variant="body1" fontWeight="bold">
                                                    {estoqueSelecionado?.nome}
                                                </Typography>
                                                <Typography variant="body2">Distribuidora: {estoqueSelecionado?.fornecedor}</Typography>
                                                <Stack direction="row" spacing={3}>
                                                    <Typography variant="body2" display="inline-block">Categoria: {estoqueSelecionado?.categoria_nome}</Typography>
                                                    <Typography variant="body2" display="inline-flex">Unidade: {estoqueSelecionado?.unidade}</Typography>
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                    </div>
                                </div>

                                <div className="row mb-4">
                                    <div className="col">
                                        <TextField label="Nº da Nota" fullWidth required value={notaEstoque ?? ''}
                                                   onChange={e => setNotaEstoque(e.target.value)}/>
                                    </div>
                                    <div className="col">
                                        <TextField type="date" label="Data" required InputLabelProps={{shrink: true}} value={dataEstoque ?? ''}
                                                   onChange={e => setDataEstoque(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <TextField label="Quantidade" required type="number" value={qtdEstoque ?? ''}
                                                   onChange={e => setQtdEstoque(e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary me-3" data-bs-dismiss="modal">Fechar</button>
                                <button type="submit" className="btn btn-success"
                                        data-bs-dismiss={notaEstoque && dataEstoque && qtdEstoque && "modal"}>Salvar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </CardContainer>
    )
}
