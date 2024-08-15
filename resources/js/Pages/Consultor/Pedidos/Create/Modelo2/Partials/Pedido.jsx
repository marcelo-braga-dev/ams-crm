import React, {useEffect, useState} from "react";
import {MenuItem, Stack, TextField, Typography} from "@mui/material";
import convertFloatToMoney from "@/Helpers/converterDataHorario";
import DataTable from "react-data-table-component";
import ClearIcon from "@mui/icons-material/Clear";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import CardContainer from "@/Components/Cards/CardContainer.jsx";
import CardBody from "@/Components/Cards/CardBody.jsx";
import CardTitle from "@/Components/Cards/CardTitle.jsx";
import {Box, CardText, Coin, FileEarmarkRuled, PersonVcard} from "react-bootstrap-icons";

let total = 0;
let somasArray = []
let totalGeral = 0

const FilterComponent = ({filterText, onFilter}) => (
    <TextField
        fullWidth placeholder="Pesquisar Produto..."
        value={filterText}
        onChange={onFilter}
    />
);

export default function Pedido({fornecedores, unidades, categorias, urlProdutos, data, setData}) {
    total = 0
    const [filterText, setFilterText] = React.useState('');
    const [qtdChequeParcelas, setQtdChequeParcelas] = useState(0);
    const [fornecedorSelecionado, setFornecedorSelecionado] = useState();
    const [categoriaSelecionado, setCategoriaSelecionado] = useState();
    const [unidadeSelecionado, setUnidadeSelecionado] = useState();
    const [produtos, setProdutos] = useState([]);
    const [documento, setDocumento] = useState('cnh');

    function fornecedorSelecionar(id) {
        setFornecedorSelecionado(id)
        buscarProdutos(id, categoriaSelecionado, unidadeSelecionado)
    }

    function categoriaSelecionar(id) {
        setCategoriaSelecionado(id)
        buscarProdutos(fornecedorSelecionado, id, unidadeSelecionado)
    }

    function unidadeSelecionar(id) {
        setUnidadeSelecionado(id)
        buscarProdutos(fornecedorSelecionado, categoriaSelecionado, id)
    }

    useEffect(function () {
        buscarProdutos()
    }, [])

    function buscarProdutos(fornecedor, categoria, unidade) {
        axios.post(route(urlProdutos, {
            fornecedor: fornecedor, categoria: categoria, unidade: unidade
        })).then(response => {
            setProdutos(response.data)
        })
    }

    const linhas = produtos.map(function (items) {
        return {
            id: items.id,
            nome: items.nome,
            descricao: items.descricao,
            preco_fornecedor: items.preco_fornecedor,
            preco_venda: items.preco_venda,
            preco_venda_float: items.preco_venda_float,
            preco_fornecedor_float: items.preco_fornecedor_float,
            unidade: items.unidade,
            estoque: items.estoque,
            estoque_consultor: items.estoque_consultor,
            categoria: items.categoria,
            fornecedor: items.fornecedor,
            fornecedor_id: items.fornecedor_id,
            foto: items.foto,
        }
    });

    function qtdCheque(qtd) {
        setQtdChequeParcelas(qtd)
        setData('forma_pagamento', qtd + 'x Cheques')
    }

    let camposCheques = []

    function chequesCampos() {
        for (let i = 1; i <= qtdChequeParcelas; i++)
            camposCheques.push(
                <div key={i} className="row align-items-center">
                    <div className="col-6 mb-4">
                        <TextField
                            label={i + "° Cheque"} fullWidth type="file" InputLabelProps={{shrink: true}} required
                            onChange={e => setData('file_cheques', {
                                ...data.file_cheques,
                                [i]: {
                                    ...data?.file_cheques?.[i],
                                    file: e.target.files[0]
                                }
                            })}>
                        </TextField>
                    </div>
                    <div className="col mb-4">
                        <TextField type="date" label="Data Vencimento" fullWidth
                                   InputLabelProps={{shrink: true}} required
                                   onChange={e => setData('file_cheques', {
                                       ...data.file_cheques,
                                       [i]: {
                                           ...data?.file_cheques?.[i],
                                           vencimento: e.target.value
                                       }
                                   })}/>
                    </div>
                    <div className="col mb-4">

                        {(i == qtdChequeParcelas && qtdChequeParcelas > 1) &&
                            <ClearIcon className="text-danger cursor-pointer"
                                       onClick={() => removeCheque()}/>
                        }
                    </div>
                </div>
            )

        return camposCheques
    }

    function removeCheque() {
        setQtdChequeParcelas(qtdChequeParcelas - 1)
        data.file_cheques[qtdChequeParcelas] = {}
    }

    function qtdCredito(qtd) {
        setData('forma_pagamento', 'Cartão Crédito em ' + qtd + 'x')
    }

    function qtdBoletos(qtd) {
        setData('forma_pagamento', 'Boleto em ' + qtd + 'x')
    }


    function somador(id, valor, dados) {
        const index = somasArray.findIndex(i => i.id === id)
        if (index >= 0) {
            somasArray[index] = {id: id, valor: valor, dados: dados}
        } else
            somasArray.push({id: id, valor: valor, dados: dados})

        totalGeral = 0
        somasArray.map((item) => {
            totalGeral += (item.dados.preco_venda_float - (item.dados.desconto ?? 0)) * item.dados.qtd//item.valor
        })

        return totalGeral
    }

    function quantidade(row, valor, desconto) {
        const dados = {
            ...data?.produtos?.[row.id],
            id: row.id,
            nome: row.nome,
            preco_fornecedor_float: row.preco_fornecedor_float,
            preco_venda_float: row.preco_venda_float,
            qtd: parseInt(valor),
            und: row.unidade,
            foto: row.foto,
            fornecedor_id: row.fornecedor_id,
            desconto: desconto ?? data?.produtos?.[row.id]?.desconto
        }

        const valorVenda = (row.preco_venda_float - (desconto ?? 0)) * parseInt(valor)
        data.preco = somador(row.id, valorVenda, dados)

        setData('produtos', {
            ...data.produtos,
            [row.id]: dados,
        })
    }

    function desconto(row, valor) {
        setData('produtos', {
            ...data.produtos,
            [row.id]: {
                ...data?.produtos?.[row.id],
                id: row.id,
                desconto: parseFloat(valor)
            }
        })

        quantidade(row, data?.produtos?.[row.id]?.qtd ?? 0, parseFloat(valor))
    }


    function calcTotalItem(row) {
        return convertFloatToMoney(
            (row.preco_venda_float - (data?.produtos[row.id]?.desconto ?? 0)) *
            (data?.produtos && data?.produtos[row.id]?.qtd)
        )
    }

    // TABLE
    const columns = [
        {
            selector: row =>
                <div className="row justify-content-center">
                    <div className="col-auto text-center p-3">
                        {row.foto && <img className="rounded" src={row.foto} style={{maxWidth: 100, maxHeight: 100}} alt="produto"/>}
                    </div>
                </div>,
            grow: 1,
        }, {
            selector: row =>
                <div className="row align-items-start py-3">
                    <div className="col-12">
                        <Typography variant="h5" marginBottom={1}>{row.nome}</Typography>
                        <Stack direction="row" spacing={2}>
                            <Typography variant="h5" color="green">R$ {row.preco_venda}</Typography>
                            <Typography variant="body2">({row.unidade})</Typography>
                        </Stack>

                        <Typography variant="body2">Categoria: {row.categoria}</Typography>
                        <Typography variant="body2">Distribuidor: {row.fornecedor}</Typography>
                        <Typography variant="body2">Estoque: {row.estoque} und.</Typography>
                    </div>
                </div>,
            grow: 4,
        }, {
            selector: row =>
                <div className="row align-items-start">
                    <div className="col-12 mb-4">
                        <div className="row">
                            <div className="col">
                                <span className="d-block text-sm text-muted">Quantidade:</span>
                                <TextField type="number" size="small" style={{width: '6rem'}} fullWidth
                                           id="bootstrap-input"
                                           onChange={e => quantidade(row, e.target.value)}
                                />
                            </div>
                            <div className="col">
                                <span className="d-block text-sm text-muted">Desconto p/ Und.:</span>
                                <TextField type="number" size="small" fullWidth
                                           InputProps={{startAdornment: <span className="pe-1">R$</span>}}
                                           inputProps={{maxLength: 13, step: "0.01"}}
                                           onChange={e => desconto(row, e.target.value)}
                                />
                            </div>
                        </div>

                    </div>
                    <div className="col-12">
                        <span className="fs-5 fw-bold">
                            TOTAL: R$ {calcTotalItem(row)}
                        </span>
                    </div>
                </div>,
            grow: 3,
        },
    ];

    const filteredItems = linhas.filter(
        item => item.nome && item.nome.toLowerCase().includes(filterText.toLowerCase())
    );

    const subHeaderComponentMemo = React.useMemo(() => {
        return (
            <FilterComponent onFilter={e => setFilterText(e.target.value)} filterText={filterText}/>
        );
    }, [filterText]);

    /// TABLE - FIM

    return (<>
        <CardContainer>
            <CardTitle title="Documentos do Cliente" icon={<PersonVcard size={22}/>}/>
            <CardBody>
                <div className="row">
                    <div className="col-auto">
                        <FormControl>
                            <RadioGroup row value={documento}
                                        onChange={event => setDocumento(event.target.value)}>
                                <FormControlLabel value="cnh" control={<Radio size="small"/>} label="CNH"/>
                                <FormControlLabel value="rg" control={<Radio size="small"/>} label="RG/CPF"/>
                            </RadioGroup>
                        </FormControl>
                    </div>

                    {documento === 'cnh' && <div className="col-md-4 pt-4">
                        <TextField
                            label="CNH" required fullWidth type="file" InputLabelProps={{shrink: true}}
                            onChange={e => setData('img_cnh', e.target.files[0])}>
                        </TextField>
                    </div>}
                    {documento === 'rg' && <>
                        <div className="col-md-4 pt-4">
                            <TextField
                                label="RG" required fullWidth type="file" InputLabelProps={{shrink: true}}
                                onChange={e => setData('img_rg', e.target.files[0])}>
                            </TextField>
                        </div>
                        <div className="col-md-4 pt-4">
                            <TextField
                                label="CPF" required fullWidth type="file" InputLabelProps={{shrink: true}}
                                onChange={e => setData('img_cpf', e.target.files[0])}>
                            </TextField>
                        </div>
                    </>}
                </div>
            </CardBody>
        </CardContainer>


        <CardContainer>
            <CardTitle title="Pagamento" icon={<Coin size={20}/>}/>
            <CardBody>
                <div className="row">
                    <div className="col-md-4">
                        <TextField label="Forma de Pagamento" select fullWidth required defaultValue=""
                                   onChange={e => setData('forma_pagamento', e.target.value)}>
                            <MenuItem value="PIX">PIX</MenuItem>
                            <MenuItem value="Boleto">Boleto</MenuItem>
                            <MenuItem value="Cartão de Crédito">Cartão de Crédito</MenuItem>
                            <MenuItem value="Cartão de Débito">Cartão de Débito</MenuItem>
                            <MenuItem value="Dinheiro">Dinheiro</MenuItem>
                            <MenuItem value="Cheque">Cheque</MenuItem>
                            <MenuItem value="Bonificação">Bonificação</MenuItem>
                        </TextField>
                    </div>
                    <div className="col-auto">
                        {data.forma_pagamento?.includes('Crédito') &&
                            <TextField
                                required type="number" label="Qtd. de Parcelas"
                                onChange={e => qtdCredito(e.target.value)}/>}
                        {data.forma_pagamento?.includes('Boleto') &&
                            <TextField
                                required type="number" label="Qtd. de Parcelas"
                                onChange={e => qtdBoletos(e.target.value)}/>}
                        {data.forma_pagamento?.includes('Cheque') &&
                            <TextField
                                required type="number" label="Qtd. de Cheques"
                                onChange={e => qtdCheque(e.target.value)}/>}
                    </div>
                    <div className="col">
                        {data.forma_pagamento?.includes('PIX') &&
                            <TextField
                                type="file" label="Comprovante de Pagamento" InputLabelProps={{shrink: true}}
                                onChange={e => setData('file_pix', e.target.files[0])}/>}
                    </div>
                </div>

                {data.forma_pagamento?.includes('Cheque') && chequesCampos()}
            </CardBody>
        </CardContainer>

        <CardContainer>
            <CardTitle title="Orçamento" icon={<FileEarmarkRuled size={20}/>}/>
            <CardBody>
                <div className="row">
                    <div className="col-md-6">
                        <TextField
                            label="Orçamento do Pedido" required
                            fullWidth type="file" InputLabelProps={{shrink: true}}
                            onChange={e => setData('img_pedido', e.target.files[0])}>
                        </TextField>
                    </div>
                </div>
            </CardBody>
        </CardContainer>

        <CardContainer>
            <CardTitle title="Produtos" icon={<Box size={20}/>}/>
            <CardBody>
                <div className="row">
                    <div className="col">
                        <FilterComponent onFilter={e => setFilterText(e.target.value)} filterText={filterText}/>
                    </div>
                    <div className="col">
                        <TextField label="Fornecedor" select fullWidth defaultValue=""
                                   onChange={e => fornecedorSelecionar(e.target.value)}>
                            <MenuItem value="">Todos</MenuItem>
                            {fornecedores.map((option, index) => (
                                <MenuItem key={index} value={option.id}>
                                    {option.nome}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div className="col">
                        <TextField label="Categoria" select fullWidth defaultValue=""
                                   onChange={e => categoriaSelecionar(e.target.value)}>
                            <MenuItem value="">Todos</MenuItem>
                            {categorias.map((option, index) => (
                                <MenuItem key={index} value={option.id}>
                                    {option.nome}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div className="col">
                        <TextField label="Unidade de Medida" select fullWidth defaultValue=""
                                   onChange={e => unidadeSelecionar(e.target.value)}>
                            <MenuItem value="">Todos</MenuItem>
                            {unidades.map((option, index) => (
                                <MenuItem key={index} value={option.id}>
                                    {option.valor} {option.nome}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                </div>

                {produtos.length ?
                    <DataTable
                        columns={columns}
                        data={filteredItems}
                        pagination paginationPerPage="5"
                    /> : ''}

                {somasArray.length > 0 && <>
                    <h5 className="mt-5">Confirmar Produtos</h5>
                    <small className="d-block mb-4">Verifique as informações dos produtos e clique para confirmar</small>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                            <tr>
                                <th className="col-1"></th>
                                <th className="col-1"></th>
                                <th>Produtos</th>
                                <th className="col-1">Desc. p/ Und.</th>
                                <th className="col-1">Quantidade</th>
                                <th className="col-1">Total</th>
                            </tr>
                            </thead>
                            <tbody>
                            {somasArray.map((item, index) => {
                                if (item.dados.qtd < 1) return ''
                                return (
                                    <tr key={index}>
                                        <td className="col-1">
                                            <FormControlLabel required control={<Checkbox/>} label=""/>
                                        </td>
                                        <td className="p-3">
                                            {item.dados.foto &&
                                                <img className="rounded" src={item.dados.foto} width="100" alt="foto"/>}
                                        </td>
                                        <td>
                                            <Typography variant="h5" marginBottom={1}>{item.dados.nome}</Typography>
                                            <Stack direction="row" spacing={2}>
                                                <Typography variant="h5" color="green">R$ {convertFloatToMoney(item.dados.preco_venda_float)}</Typography>
                                                <Typography variant="body2">{item.dados.und}</Typography>
                                            </Stack>
                                        </td>
                                        <td className="text-center">R$ {convertFloatToMoney(item.dados.desconto)}</td>
                                        <td className="text-center">{item.dados.qtd} und.</td>
                                        <td className="text-center">R$ {convertFloatToMoney((item.dados.preco_venda_float - (item.dados.desconto ?? 0)) * item.dados.qtd)}</td>
                                    </tr>
                                )
                            })}
                            <tr className="fs-4" style={{color: 'green'}}>
                                <th colSpan="4"></th>
                                <th>TOTAL GERAL:</th>
                                <th className="text-center">
                                    {convertFloatToMoney(totalGeral)}
                                </th>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </>}
            </CardBody>
        </CardContainer>

        <CardContainer>
            <CardTitle title="Anotações" icon={<CardText size={20}/>}/>
            <CardBody>
                <div className="row">
                    <div className="col">
                        <TextField
                            label="Anotações..." multiline rows="2" fullWidth
                            value={data.obs} onChange={e => setData('obs', e.target.value)}/>
                    </div>
                </div>
            </CardBody>
        </CardContainer>
    </>)
}
