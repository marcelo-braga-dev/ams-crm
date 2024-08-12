import CardTable from "@/Components/Cards/CardTable";
import {Stack, TextField, Typography} from "@mui/material";
import CardContainer from "@/Components/Cards/CardContainer";
import Avatar from "@mui/material/Avatar";
import convertFloatToMoney from "@/Helpers/converterDataHorario";

import React, {useCallback, useEffect, useState, useMemo} from 'react';
import {Box, BoxSeam, PencilSquare} from "react-bootstrap-icons";
import ToggleMenu from "@/Components/Inputs/ToggleMenu";
import MenuItem from "@mui/material/MenuItem";
import {router} from "@inertiajs/react";
import LinearProgress from '@mui/material/LinearProgress';
import Link from "@/Components/Link.jsx";
import {Switch as SwitchMui} from "@mui/material";
import Switch from "@/Components/Inputs/Switch.jsx";

const EstoqueModal = ({estoque, setEstoque, atualizarEstoque, recontagem, setRecontagem, incrementarQtd, setIncrementarQtd}) => (
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
                                    <Avatar variant="rounded" style={{width: 60, height: 60}} src={estoque?.selecionado?.foto}/>
                                    <Stack>
                                        <Typography variant="body1" fontWeight="bold">
                                            {estoque?.selecionado?.nome}
                                        </Typography>
                                        <Typography variant="body2">Distribuidora: {estoque?.selecionado?.fornecedor}</Typography>
                                        <Stack direction="row" spacing={3}>
                                            <Typography variant="body2" display="inline-block">Categoria: {estoque?.selecionado?.categoria_nome}</Typography>
                                            <Typography variant="body2" display="inline-flex">Unidade: {estoque?.selecionado?.unidade}</Typography>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </div>
                        </div>

                        <Stack direction="row" spacing={1} alignItems="center" alignContent="center" marginBottom={3}>
                            <SwitchMui size="small" onChange={e => setRecontagem(e.target.checked)}/>
                            <Typography>Recontagem de Estoque</Typography>
                        </Stack>

                        {!recontagem && <div className="row mb-4">
                            <div className="col">
                                <TextField label="Nº da Nota" fullWidth required value={estoque.nota ?? ''}
                                           onChange={e => setEstoque({...estoque, nota: e.target.value})}/>
                            </div>
                            <div className="col">
                                <TextField type="date" label="Data" required InputLabelProps={{shrink: true}} value={estoque.data ?? ''}
                                           onChange={e => setEstoque({...estoque, data: e.target.value})}/>
                            </div>
                        </div>}
                        <div className="row">
                            <div className="col-md-4">
                                <TextField label="Quantidade" required type="number" value={estoque.quantidade ?? ''}
                                           onChange={e => setEstoque({...estoque, quantidade: e.target.value})}/>
                            </div>
                            {/*{recontagem && <div className="col pt-2">*/}
                            {/*    <Stack direction="row" spacing={1} alignItems="center" alignContent="center" marginBottom={2}>*/}
                            {/*        <SwitchMui checked={incrementarQtd} size="small" onChange={e => setIncrementarQtd(e.target.checked)}/>*/}
                            {/*        <Typography>{incrementarQtd ? 'Adicionar' : 'Diminuir'}</Typography>*/}
                            {/*    </Stack>*/}
                            {/*</div>}*/}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary me-3" data-bs-dismiss="modal">Fechar</button>
                        <button type="submit" className="btn btn-success"
                                data-bs-dismiss={((estoque.nota && estoque.data && estoque.quantidade) || (estoque.quantidade && recontagem)) && "modal"}>Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>);

const ProdutoRow = React.memo(({item, updateStatus, isFinanceiro, setEstoque, estoque}) => (<tr key={item.id}>
    <td className="text-center" style={{width: 70}}>
        <Switch onChange={value => updateStatus(item.id, value)} checked={item.status} size="small"/>
    </td>
    <td className="text-center" style={{padding: 0}}>
        <Typography variant="body2">#{item.id}</Typography>
    </td>
    <td>
        <Stack direction="row" spacing={2}>
            <Link href={route('admin.produtos.show', item.id)}>
                <Avatar variant="rounded" style={{width: 60, height: 60}} src={item.foto}><Box size={26}/></Avatar>
            </Link>
            <Stack>
                <Link href={route('admin.produtos.show', item.id)}>
                    <Typography variant="body1" fontWeight="bold">
                        {item.nome}
                    </Typography>
                </Link>
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
    {isFinanceiro && <td>
        <Typography>R$ {convertFloatToMoney(item.preco_custo)}</Typography>
    </td>}
    <td className="text-center">
        {item.estoque ?? 0} <PencilSquare cursor="pointer" color="green"
                                          data-bs-toggle="modal" data-bs-target="#exampleModal"
                                          onClick={() => setEstoque({
                                              ...estoque, selecionado: item,
                                          })}/>
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
</tr>));

const Tabela = ({isFinanceiro, filtros}) => {
    const [produtos, setProdutos] = useState([])
    const [carregando, setCarregando] = useState(true)
    const [paginate, setPaginate] = useState(1)
    const [paginateDados, setPaginateDados] = useState(true)
    const [recontagem, setRecontagem] = useState(false)
    const [incrementarQtd, setIncrementarQtd] = useState(true)
    const [estoque, setEstoque] = useState({
        nota: '', data: '', quantidade: null, selecionado: null,
    });

    const updateStatus = useCallback((id, status) => {
        axios.post(route('admin.produtos.update-status'), {id, status}, {preserveScroll: true});
    }, []);

    const getProdutos = useCallback(() => {
        setCarregando(true);
        axios.get(route('admin.produtos.get-produtos', {page: paginate, filtros}))
            .then(res => {
                setProdutos(res.data.dados);
                setPaginateDados(res.data.paginate);
            }).finally(() => setCarregando(false));
    }, [filtros, paginate]);

    useEffect(() => {
        getProdutos();
    }, [getProdutos]);
    useEffect(() => {
        setPaginate(1);
    }, [filtros]);

    const atualizarEstoque = (e) => {
        e.preventDefault();
        axios.post(route('admin.produtos.update-estoque'), {
            produto_id: estoque.selecionado.id, nota: estoque.nota, data: estoque.data, qtd: estoque.quantidade, recontagem
        }).then(() => {
            getProdutos()
            setRecontagem(false)
        });
    }

    return (
        <CardContainer>
            <CardTable title="Produtos" icon={<BoxSeam size={22}/>} paginate={paginate} setPaginate={setPaginate} paginateDados={paginateDados}>
                {!!produtos?.length && (<table className="table-1" style={{width: '100%'}}>
                    <thead>
                    <tr>
                        <th></th>
                        <th className="text-center" style={{width: '5rem'}}>ID</th>
                        <th>Produtos</th>
                        <th>Valor</th>
                        {isFinanceiro && <th style={{width: '10rem'}}>Custo</th>}
                        <th className="text-center" style={{width: '10rem'}}>Estoques</th>
                        <th style={{width: '5rem'}}></th>
                    </tr>
                    </thead>
                    <tbody>
                    {produtos.map(item => (
                        <ProdutoRow key={item.id} item={item} updateStatus={updateStatus} isFinanceiro={isFinanceiro} setEstoque={setEstoque} estoque={estoque}/>))}
                    </tbody>
                </table>)}
                {carregando && <LinearProgress color="inherit"/>}
            </CardTable>

            <EstoqueModal estoque={estoque} setEstoque={setEstoque} atualizarEstoque={atualizarEstoque} recontagem={recontagem} setRecontagem={setRecontagem}
                          incrementarQtd={incrementarQtd} setIncrementarQtd={setIncrementarQtd}/>
        </CardContainer>
    );
}

export default Tabela
