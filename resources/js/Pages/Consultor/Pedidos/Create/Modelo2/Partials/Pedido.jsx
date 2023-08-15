import {Col, Row} from "reactstrap";
import {TextField, MenuItem} from "@mui/material";
import Box from "@mui/material/Box";
import TextFieldMoney from "@/Components/Inputs/TextFieldMoney";

export default function Pedido({fornecedores, setData, data}) {

    function qtdCheque(qtd) {
        setData('forma_pagamento', qtd + 'x Cheques')
    }

    return <Box>
        <Row className="my-4">
            <Col className="mb-3 col-md-4">
                <TextFieldMoney label="Preço" value={data.preco} setData={setData} index="preco" required/>
            </Col>
            <Col md="4" className="mb-3">
                <TextField label="Fornecedor" select fullWidth required defaultValue=""
                           onChange={e => setData('fornecedor', e.target.value)}>
                    {fornecedores.map((option, index) => (
                        <MenuItem key={index} value={option.id}>
                            {option.nome}
                        </MenuItem>
                    ))}
                </TextField>
            </Col>
        </Row>
        <div className="row">
            <div className="col-md-4">
                <TextField label="Formas de Pagamento" select fullWidth required defaultValue=""
                           onChange={e => setData('forma_pagamento', e.target.value)}>
                        <MenuItem value="À Vista">À Vista</MenuItem>
                        <MenuItem value="Boleto">Boleto</MenuItem>
                        <MenuItem value="Cartão de Crédito/ Cartão Débito">Cartão de Crédito/ Cartão Débito</MenuItem>
                        <MenuItem value="Dinheiro">Dinheiro</MenuItem>
                        <MenuItem value="Cheque">Cheque</MenuItem>
                </TextField>
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
