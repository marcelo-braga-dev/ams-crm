import Layout from "@/Layouts/Layout";
import React, {useCallback, useEffect, useState} from "react";
import CardContainer from "@/Components/Cards/CardContainer";
import CardTable from "@/Components/Cards/CardTable";
import {Box, Eye, PencilSquare} from "react-bootstrap-icons";
import {Stack, TextField, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import convertFloatToMoney from "@/Helpers/converterDataHorario";
import {router} from "@inertiajs/react";
import Chip from "@mui/material/Chip";
import CardBody from "@/Components/Cards/CardBody";
import MenuItem from "@mui/material/MenuItem";
import Link from "@/Components/Link";

const Page = ({categorias}) => {
    const [produtos, setProdutos] = useState([])
    const [paginate, setPaginate] = useState([])
    const [paginateDados, setPaginateDados] = useState(true)
    const [filtros, setFiltros] = useState({
        filtro: 'nome',
        filtro_valor: null,
        fornecedor: null,
        categoria: null,
    })

    const getProdutos = useCallback(() => {
        axios.get(route('consultor.produtos.get-produtos', {page: paginate, filtros}))
            .then(res => {
                setProdutos(res.data.dados);
                setPaginateDados(res.data.paginate);
            })
    }, [filtros, paginate]);

    useEffect(() => {
        getProdutos();
    }, [getProdutos]);

    useEffect(() => {
        setPaginate(1);
    }, [filtros]);

    return (
        <Layout titlePage="Produtos Cadastrados" menu="produtos" submenu="produtos-cadastrados">
            <CardContainer>
                <CardBody>
                    <div className="row">
                        <div className="col-md-4">
                            <Stack direction="row">
                                <TextField label="Filtro" select fullWidth sx={{width: '10rem'}} value={filtros.filtro}
                                           onChange={e => {
                                               setFiltros({...filtros, filtro: e.target.value})
                                               setPaginate(1)
                                           }}>
                                    <MenuItem value="id">ID</MenuItem>
                                    <MenuItem value="nome">Nome</MenuItem>
                                </TextField>
                                <TextField label="Pesquisar..." fullWidth
                                           onChange={e => {
                                               setFiltros({...filtros, filtro_valor: e.target.value})
                                               setPaginate(1)
                                           }}/>
                            </Stack>
                        </div>
                        <div className="col-md-4">
                            <TextField label="Categoria" select fullWidth onChange={e => {
                                setFiltros({...filtros, categoria: e.target.value})
                            }}>
                                <MenuItem value="">Todos</MenuItem>
                                {categorias.map(item => <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>)}
                            </TextField>
                        </div>
                    </div>
                </CardBody>
            </CardContainer>

            <CardContainer>
                <CardTable title="Produtos" paginate={paginate} setPaginate={setPaginate} paginateDados={paginateDados}>
                    {!!produtos?.length && (
                        <table className="table-1" style={{width: '100%'}}>
                            <thead>
                            <tr>
                                <th className="text-center" style={{width: '5rem'}}>ID</th>
                                <th>Produtos</th>
                                <th>Valor</th>
                                <th className="text-center" style={{width: '10rem'}}>Estoques</th>
                                <th>Status</th>
                                <th style={{width: '5rem'}}></th>
                            </tr>
                            </thead>
                            <tbody>
                            {produtos.map(item => (
                                <tr key={item.id}>
                                    <td className="text-center" style={{padding: 0}}>
                                        <Typography variant="body2">#{item.id}</Typography>
                                    </td>
                                    <td>
                                        <Stack direction="row" spacing={2}>
                                            <Link href={route('consultor.produtos.show', item.id)}>
                                                <Avatar variant="rounded" style={{width: 60, height: 60}} src={item.foto}/>
                                            </Link>
                                            <Stack>
                                                <Typography component="a" href={route('consultor.produtos.show', item.id)} variant="body1" fontWeight="bold">
                                                    {item.nome}
                                                </Typography>
                                                <Typography variant="body2">Distribuidora: {item.fornecedor}</Typography>
                                                <Stack direction="row" spacing={3}>
                                                    <Typography variant="body2" display="inline-block">Categoria: {item.categoria_nome}</Typography>
                                                    <Typography variant="body2" display="inline-flex">Unidade: {item.unidade}</Typography>
                                                    {item.sku && <Typography variant="body2">SKU: {item.sku}</Typography>}
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                    </td>
                                    <td>
                                        <Typography>R$ {convertFloatToMoney(item.preco)}</Typography>
                                    </td>
                                    <td className="text-center">
                                        {item.estoque ?? 0}
                                    </td>
                                    <td className="text-center" style={{width: 70}}>
                                        {item.status
                                            ? <Chip label="atvo" size="small" color="success" variant="outlined"/>
                                            : <Chip label="bloqueado" size="small" color="error" variant="outlined"/>}
                                    </td>
                                    <td className="text-center">
                                        <Eye size={22} color="black" cursor="pointer" onClick={() => router.get(route('consultor.produtos.show', item.id))}/>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>)}
                </CardTable>
            </CardContainer>
        </Layout>
    )
}
export default Page
