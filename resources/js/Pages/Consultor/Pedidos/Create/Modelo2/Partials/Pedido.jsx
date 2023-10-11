import {Col, Row} from "reactstrap";
import {TextField, MenuItem, InputAdornment} from "@mui/material";
import Box from "@mui/material/Box";
import convertFloatToMoney from "@/Helpers/converterDataHorario";
import React, {useEffect, useState} from "react";
import DataTable from "react-data-table-component";

let total = 0;
let total2 = 0;

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


export default function Pedido({fornecedores, buscarProdutos, produtos, data, setData}) {
    total = 0
    // const [filterText, setFilterText] = React.useState('');
    //
    // const linhas = produtos.map(function (items) {
    //     return {
    //         id: items.id,
    //         nome: items.nome,
    //         preco_fornecedor: items.preco_fornecedor,
    //         preco_venda: items.preco_venda,
    //         preco_venda_float: items.preco_venda_float,
    //         preco_fornecedor_float: items.preco_fornecedor_float,
    //         unidade: items.unidade,
    //         estoque: items.estoque,
    //         categoria: items.categoria,
    //         foto: items.foto,
    //     }
    // });

    function qtdCheque(qtd) {
        setData('forma_pagamento', qtd + 'x Cheques')
    }

    function qtdCredito(qtd) {
        setData('forma_pagamento', 'Cartão Crédito em ' + qtd + 'x')
    }

    function qtdBoletos(qtd) {
        setData('forma_pagamento', 'Boleto em ' + qtd + 'x')
    }

    // TABLE
    // const columns = [
    //     {
    //         name: 'Imagem',
    //         selector: row => <>
    //             {row.foto && <img className="rounded" src={row.foto} width="70" alt="foto"/>}
    //         </>,
    //         ignoreRowClick: true,
    //         allowOverflow: true,
    //         button: true,
    //         grow: 0,
    //     },
    //     {
    //         name: 'Nome',
    //         selector: row =>
    //             <div className="py-3 text-wrap">
    //                 <b>{row.nome}</b><br/>
    //                 ID: #{row.id}
    //             </div>,
    //         sortable: true,
    //         grow: 5,
    //     }, {
    //         name: 'Preço',
    //         selector: row =>
    //             <div className="py-3 text-wrap">
    //                 <b>R$ {row.preco_venda}</b><br/>
    //                 Und: {row.unidade}
    //             </div>,
    //         sortable: false,
    //         grow: 2,
    //     }, {
    //         name: 'Desconto Und.',
    //         selector: row =>
    //             <div className="py-3 text-wrap">
    //                 <TextField type="number" size="small" fullWidth
    //                            InputProps={{startAdornment: <span className="pe-1">R$</span>}}
    //                            inputProps={{maxLength: 13, step: "0.01"}}
    //                            onChange={e => setData('produtos', {
    //                                ...data.produtos,
    //                                [row.id]: {
    //                                    ...data?.produtos?.[row.id],
    //                                    id: row.id,
    //                                    desconto: parseFloat(e.target.value)
    //                                }
    //                            })}
    //                 />
    //             </div>,
    //         sortable: false,
    //         grow: 3,
    //     }, {
    //         name: 'Qtd',
    //         selector: row =>
    //             <div className="py-3 text-wrap">
    //                 <TextField type="number" size="small"
    //                            onChange={e => setData('produtos', {
    //                                ...data.produtos,
    //                                [row.id]: {
    //                                    ...data?.produtos?.[row.id],
    //                                    id: row.id,
    //                                    nome: row.nome,
    //                                    preco_fornecedor_float: row.preco_fornecedor_float,
    //                                    preco_venda_float: row.preco_venda_float,
    //                                    qtd: parseInt(e.target.value),
    //                                    und: row.unidade,
    //                                    foto: row.foto,
    //                                },
    //                            })}
    //                 />
    //             </div>,
    //         sortable: false,
    //         grow: 0,
    //     }, {
    //         name: 'Total',
    //         selector: row =>
    //             <div className="py-3 text-wrap">
    //                 R$ {convertFloatToMoney(
    //                 (row.preco_venda_float - (data?.produtos[row.id]?.desconto ?? 0)) *
    //                 (data?.produtos && data?.produtos[row.id]?.qtd)
    //             )}
    //                 - {total2 += ((data?.produtos?.[row.id]?.preco_venda_float ?? 0) - (data?.produtos?.[row.id]?.desconto ?? 0))
    //                     * ((data?.produtos?.[row.id]?.qtd) ?? 0)}
    //             </div>,
    //         sortable: false,
    //         grow: 3,
    //     }
    // ];
    //
    // const filteredItems = linhas.filter(
    //     item => item.nome && item.nome.toLowerCase().includes(filterText.toLowerCase())
    // );
    //
    // const subHeaderComponentMemo = React.useMemo(() => {
    //     return (
    //         <FilterComponent onFilter={e => setFilterText(e.target.value)} filterText={filterText}/>
    //     );
    // }, [filterText]);

    /// TABLE - FIM

    return <Box>
        <div className="row mb-4">
            <div className="col-md-4">
                <TextField label="Forma de Pagamento" select fullWidth required defaultValue=""
                           onChange={e => setData('forma_pagamento', e.target.value)}>
                    <MenuItem value="PIX">Pix</MenuItem>
                    <MenuItem value="Boleto">Boleto</MenuItem>
                    <MenuItem value="Cartão de Crédito">Cartão de Crédito</MenuItem>
                    <MenuItem value="Cartão de Débito">Cartão de Débito</MenuItem>
                    <MenuItem value="Dinheiro">Dinheiro</MenuItem>
                    <MenuItem value="Cheque">Cheque</MenuItem>
                    <MenuItem value="Bonificação">Bonificação</MenuItem>
                </TextField>
            </div>
            <div className="col-2">
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
                {data.forma_pagamento?.includes('Cheque') &&
                    <TextField
                        required type="file" label="Foto dos Cheque" InputLabelProps={{shrink: true}}
                        onChange={e => setData('file_cheque', e.target.files[0])}/>}
            </div>
        </div>
        <div className="row mb-3">
            <div className="col-md-5 mb-3">
                <TextField label="Fornecedor" select fullWidth required defaultValue=""
                           onChange={e => buscarProdutos(e.target.value)}
                >
                    {fornecedores.map((option, index) => (
                        <MenuItem key={index} value={option.id}>
                            {option.nome}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
            <div className="col-md-6">
                <TextField
                    label="Imagem da Lista de Pedido" required
                    fullWidth type="file" InputLabelProps={{shrink: true}}
                    onChange={e => setData('img_pedido', e.target.files[0])}>
                </TextField>
            </div>
        </div>

        {/*<div className="row">*/}
        {/*    <div className="col">*/}
        {/*        <DataTable*/}
        {/*            columns={columns}*/}
        {/*            data={filteredItems}*/}
        {/*            paginationPerPage={25}*/}
        {/*            subHeaderComponent={subHeaderComponentMemo}*/}
        {/*            striped subHeader pagination highlightOnHover*/}
        {/*        />*/}
        {/*    </div>*/}
        {/*</div>*/}

        <div className="row">
            <div className="col">

            </div>
        </div>

        {produtos.length ? <div className="row mb-4">
            <table className="table table-sm text-sm">
                <thead>
                <tr>
                    <td></td>
                    <td>Nome</td>
                    <td>Preço</td>
                    <td className="text-center">Qtd.</td>
                    <td className="col-1 text-center">Und.</td>
                    <td>Desconto Und.</td>
                    <td>Total</td>
                </tr>
                </thead>
                <tbody>
                {produtos.map((dados, index) => {
                    total += (dados.preco_venda_float - (data?.produtos?.[dados.id]?.desconto ?? 0))
                        * ((data?.produtos?.[dados.id]?.qtd) ?? 0)
                    data.preco = total
                    return (
                        <tr key={index}
                            className={(data?.produtos?.[dados.id]?.qtd) > 0 ? "bg-light font-weight-bold" : ''}>
                            <td className="col-1 text-center pe-3">
                                {dados.foto && <img className="rounded" src={dados.foto} width="70" alt="foto"/>}
                            </td>
                            <td className="text-wrap">
                                <b>{dados.nome}</b>
                                <small className="d-block">ID: #{dados.id}</small>
                            </td>
                            <td className="col-1">R$ {dados.preco_venda}</td>
                            <td className="col-1">
                                <TextField type="number" size="small" style={{width: '5rem'}}
                                           onChange={e => setData('produtos', {
                                               ...data.produtos,
                                               [dados.id]: {
                                                   ...data?.produtos?.[dados.id],
                                                   id: dados.id,
                                                   nome: dados.nome,
                                                   preco_fornecedor_float: dados.preco_fornecedor_float,
                                                   preco_venda_float: dados.preco_venda_float,
                                                   qtd: parseInt(e.target.value),
                                                   und: dados.unidade,
                                                   foto: dados.foto,
                                               },
                                           })}
                                />
                            </td>
                            <td className="col-1 text-center">{dados.unidade}</td>
                            <td className="col-2">
                                <TextField type="number" size="small" style={{width: '7rem'}} fullWidth
                                           InputProps={{
                                               startAdornment:
                                                   <InputAdornment className="ps-0 ms-0 me-1"
                                                                   position="end">R$</InputAdornment>,
                                           }}
                                           inputProps={{
                                               maxLength: 13,
                                               step: "0.01",
                                           }}
                                           onChange={e => setData('produtos', {
                                               ...data.produtos,
                                               [dados.id]: {
                                                   ...data?.produtos?.[dados.id],
                                                   id: dados.id,
                                                   desconto: parseFloat(e.target.value)
                                               }
                                           })}
                                />
                            </td>
                            <td className="col-2">
                                R$ {convertFloatToMoney(
                                (dados.preco_venda_float - (data?.produtos[dados.id]?.desconto ?? 0)) *
                                (data?.produtos && data?.produtos[dados.id]?.qtd)
                            )}
                            </td>
                        </tr>
                    )
                })}
                <tr>
                    <td colSpan="5"></td>
                    <td><h5>TOTAL</h5></td>
                    <td>
                        <h5>R$ {convertFloatToMoney(total)}</h5>
                    </td>
                </tr>
                </tbody>
            </table>
        </div> : ''}

        <Row className="mb-3 mt-4">
            <Col className="mb-3" lg="12">
                <TextField
                    label="Anotações" multiline rows="4" fullWidth
                    value={data.obs} onChange={e => setData('obs', e.target.value)}/>
            </Col>
        </Row>
    </Box>
}
