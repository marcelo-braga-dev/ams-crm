import {Col, Row} from "reactstrap";
import {
    FormControl,
    FormLabel,
    InputAdornment,
    InputLabel, MenuItem,
    OutlinedInput,
    Radio,
    RadioGroup,
    TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextFieldMoney from "@/Components/Inputs/TextFieldMoney";

export default function Pedido({fornecedores, setData, data, pedido}) {

    function qtdCheque(qtd) {
        setData('forma_pagamento', qtd + 'x Cheques')
    }

    return <Box>
        <Row className="my-4">
            <Col className="mb-3 col-md-4">
                <TextFieldMoney label="Preço" value={data.preco} setData={setData} index="preco" required/>
            </Col>
            <Col md="4" className="mb-3">
                <TextField label="Fornecedor" select fullWidth required defaultValue={pedido.fornecedor}
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
            <div className="col">
                <FormControl>
                    <FormLabel>Formas de Pagamento</FormLabel>
                    <RadioGroup required row onChange={e => setData('forma_pagamento', e.target.value)}
                                defaultValue={pedido.forma_pagamento}>
                        <FormControlLabel value="À Vista" control={<Radio id="forma_pagamento"/>} label="À Vista"/>
                        <FormControlLabel value="Financiamento" control={<Radio id="forma_pagamento"/>}
                                          label="Financiamento"/>
                        <FormControlLabel value="Boleto" control={<Radio id="forma_pagamento"/>} label="Boleto"/>
                        <FormControlLabel value="Cartão de Crédito/ Cartão Débito"
                                          control={<Radio id="forma_pagamento"/>}
                                          label="Cartão de Crédito/ Cartão Débito"/>
                        <FormControlLabel value="Dinheiro" control={<Radio id="forma_pagamento"/>} label="Dinheiro"/>
                        <FormControlLabel value="Cheque" control={<Radio id="forma_pagamento"/>} label="Cheque"/>
                    </RadioGroup>
                </FormControl>
            </div>
        </div>
        <div className="row">
            <div className="col-12">
                {(pedido.forma_pagamento)}
            </div>
            <div className="col-3">
                {data.forma_pagamento?.includes('Cheque') &&
                    <TextField
                        required type="number" label="Qtd. de Cheques"
                        onChange={e => qtdCheque(e.target.value)}/>
                }
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
