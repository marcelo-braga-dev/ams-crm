import {Col, FormGroup, Row} from "reactstrap";
import {MenuItem, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import convertFloatToMoney from "@/Helpers/converterDataHorario";
import React, {useEffect, useState} from "react";
import DataTable from "react-data-table-component";
import ClearIcon from "@mui/icons-material/Clear";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

let total = 0;

let somasArray = []
let totalGeral = 0

const FilterComponent = ({filterText, onFilter}) => (
    <>
        <TextField
            id="search"
            type="text"
            placeholder="Pesquisar..."
            value={filterText}
            onChange={onFilter}
            size="small"
        />
    </>
);


export default function Pedido({fornecedores, unidades, categorias, produtosX, data, setData}) {
    total = 0
    const [filterText, setFilterText] = React.useState('');
    const [qtdChequeParcelas, setQtdChequeParcelas] = useState(0);
    const [fornecedorSelecionado, setFornecedorSelecionado] = useState();
    const [categoriaSelecionado, setCategoriaSelecionado] = useState();
    const [unidadeSelecionado, setUnidadeSelecionado] = useState();
    const [produtos, setProdutos] = useState([])

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
        axios.post(route('consultor.pedidos.buscar-produtos-fornecedor', {
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
            // name: 'Imagem',
            selector: row =>
                <div className="py-3">
                    <div className="row">
                        <div className="col">
                            {row.foto && <img className="rounded" src={row.foto} width="100%" alt="foto"/>}
                        </div>
                    </div>
                </div>,
            grow: 2,
        }, {
            // name: 'Imagem',
            selector: row =>
                <div className="row align-items-start py-3">
                    <div className="col-12">
                        <h6 className="mb-0">{row.nome}</h6>
                        <span className="d-block mb-3">{row.descricao}</span>
                        <span className="mb-3 d-block">
                            <span className="fs-5 fw-bold me-3 text-warning">R$ {row.preco_venda}</span>
                            <span className="fs-5 fw-bold">{row.unidade}</span>
                        </span>

                        <span className="d-block">Categoria: {row.categoria}</span>
                        <span className="d-block mb-3">Distribuidor: {row.fornecedor}</span>

                        <span className="d-block"><b>Estoque:</b></span>
                        <span className="me-4">Trânsito: {row.estoque_consultor}</span>
                        <span className="">Loja: {row.estoque}</span>
                    </div>
                </div>,
            grow: 4,
        }, {
            // name: 'Imagem',
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

    return <Box>
        <div className="row mb-4">
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
                        required type="file" label="Comprovante de Pagamento" InputLabelProps={{shrink: true}}
                        onChange={e => setData('file_pix', e.target.files[0])}/>}
            </div>
        </div>

        {data.forma_pagamento?.includes('Cheque') && chequesCampos()}

        <div className="border-bottom pb-3 mb-5"/>

        <div className="row border-bottom pb-4 mb-5">
            <div className="col-md-6">
                <TextField
                    label="Imagem da Lista de Pedido" required
                    fullWidth type="file" InputLabelProps={{shrink: true}}
                    onChange={e => setData('img_pedido', e.target.files[0])}>
                </TextField>
            </div>
        </div>

        <div className="row mb-3">
            <div className="col-md-5 mb-3">
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
            <div className="col-md-4 mb-3">
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
            <div className="col-md-3 mb-3">
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

        {produtos.length ? <>
            <div className="row">
                <div className="col">
                    <DataTable
                        columns={columns}
                        data={filteredItems}
                        paginationPerPage="5"
                        subHeaderComponent={subHeaderComponentMemo}
                        subHeader pagination
                    />
                </div>
            </div>
        </> : ''}

        {somasArray.length > 0 && <>
            <h5 className="mt-5">Confirmar Pedido</h5>
            <small className="d-block mb-4">Verifique as informações dos produtos e clique para confirmar</small>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                    <tr>
                        <th className="col-1"></th>
                        <th className="col-1"></th>
                        <th>Produtos</th>
                        <th className="col-1">Unidade</th>
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
                                    <h6 className="mb-0 text-wrap">{item.dados.nome} {item.dados.nome}{item.dados.nome}</h6>
                                    <span
                                        className="mb-0 text-warning fw-bold">R$ {convertFloatToMoney(item.dados.preco_venda_float)}</span>
                                </td>
                                <td className="text-center">{item.dados.und}</td>
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


        <div className="border-bottom pb-3 mb-5"/>
        <Row className="mb-3 mt-4">
            <Col className="mb-3" lg="12">
                <TextField
                    label="Anotações" multiline rows="4" fullWidth
                    value={data.obs} onChange={e => setData('obs', e.target.value)}/>
            </Col>
        </Row>
    </Box>
}
