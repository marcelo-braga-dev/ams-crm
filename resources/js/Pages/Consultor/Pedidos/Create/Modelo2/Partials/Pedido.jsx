import {Col, Row} from "reactstrap";
import {TextField, MenuItem} from "@mui/material";
import Box from "@mui/material/Box";
import convertFloatToMoney from "@/Helpers/converterDataHorario";
import TextFieldMoney from "@/Components/Inputs/TextFieldMoney";

let total = 0;

export default function Pedido({fornecedores, buscarProdutos, produtos, data, setData}) {
    total = 0

    function qtdCheque(qtd) {
        setData('forma_pagamento', qtd + 'x Cheques')
    }

    function qtdCredito(qtd) {
        setData('forma_pagamento', 'Cartão Crédito em ' + qtd + 'x')
    }

    return <Box>
        <Row className="my-4">
            <Col md="4" className="mb-3">
                <TextField label="Fornecedor" select fullWidth required defaultValue=""
                           onChange={e => buscarProdutos(e.target.value)}
                >
                    {fornecedores.map((option, index) => (
                        <MenuItem key={index} value={option.id}>
                            {option.nome}
                        </MenuItem>
                    ))}
                </TextField>
            </Col>
        </Row>
        {produtos.length ? <div className="row mb-4">
            <table className="table">
                <thead>
                <tr>
                    <td className="text-center">ID</td>
                    <td>Nome</td>
                    <td>Preço</td>
                    <td className="text-center">Qtd.</td>
                    <td>Und.</td>
                    <td>Total</td>
                </tr>
                </thead>
                <tbody>
                {produtos.map((dados, index) => {
                    total += (dados.preco_venda_float * (data['i' + dados.id] ? data['i' + dados.id].qtd : 0))

                    return (
                        <tr key={index}>
                            <td className="col-1 text-center">#{dados.id}</td>
                            <td className="text-wrap">{dados.nome}</td>
                            <td>R$ {dados.preco_venda}</td>
                            <td className="col-1">
                                <TextField type="number" size="small"
                                           onChange={e => setData('i' + dados.id, {
                                               qtd: parseInt(e.target.value),
                                               id: dados.id
                                           })}
                                />
                            </td>
                            <td>{dados.unidade}</td>
                            <td className="col-2">
                                R$ {convertFloatToMoney(dados.preco_venda_float * (data['i' + dados.id] ? data['i' + dados.id].qtd : 0))}
                            </td>
                        </tr>
                    )
                })}
                <tr>
                    <td colSpan="4"></td>
                    <td><b>TOTAL</b></td>
                    <td>
                        <b>R$ {convertFloatToMoney(total)}</b>
                    </td>
                </tr>
                </tbody>
            </table>
        </div> : ''}

        <div className="row">
            <div className="mb-3 col-md-3">
                <TextFieldMoney label="Preço" value={data.preco} setData={setData} index="preco" required/>
            </div>
            <div className="col-md-3">
                <TextField label="Formas de Pagamento" select fullWidth required defaultValue=""
                           onChange={e => setData('forma_pagamento', e.target.value)}>
                    <MenuItem value="À Vista">À Vista</MenuItem>
                    <MenuItem value="Boleto">Boleto</MenuItem>
                    <MenuItem value="Cartão de Crédito">Cartão de Crédito</MenuItem>
                    <MenuItem value="Cartão de Débito">Cartão de Débito</MenuItem>
                    <MenuItem value="Dinheiro">Dinheiro</MenuItem>
                    <MenuItem value="Cheque">Cheque</MenuItem>
                </TextField>
            </div>
            <div className="col-2">
                {data.forma_pagamento?.includes('Crédito') &&
                    <TextField
                        required type="number" label="Qtd. de Parcelas"
                        onChange={e => qtdCredito(e.target.value)}/>}
            </div>
            <div className="col-3">
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
        <Row className="mb-3 mt-4">
            <Col className="mb-3" lg="12">
                <TextField
                    label="Anotações" multiline rows="4" fullWidth
                    value={data.obs} onChange={e => setData('obs', e.target.value)}/>
            </Col>
        </Row>
    </Box>
}
