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

export default function Pedido({fornecedores, integradores, setData, data}) {

    return <Box>
        <Row className="my-4">
            <Col className="mb-3 col-md-4">
                <TextFieldMoney label="Preço" value={data.preco} setData={setData} index="preco" required/>
            </Col>
            <Col className="mb-3 text-red-600">
                <TextField label="Integrador" select fullWidth required defaultValue={""}
                           onChange={e => setData('integrador', e.target.value)}>
                    {integradores.map((option, index) => (
                        <MenuItem key={index} value={option.id}>
                            {option.nome}
                        </MenuItem>
                    ))}
                </TextField>
            </Col>
            <Col className="mb-3 text-red-600">
                <TextField label="Fornecedor" select fullWidth required defaultValue={""}
                           onChange={e => setData('fornecedor', e.target.value)}>
                    {fornecedores.map((option, index) => (
                        <MenuItem key={index} value={option.id}>
                            {option.nome}
                        </MenuItem>
                    ))}
                </TextField>
            </Col>
        </Row>
        <Row className={"mb-3"}>
            <Col className={"mb-3"} lg={"6"}>
                <TextField accept="application/pdf"
                    required type="file" label="Orçamento" InputLabelProps={{shrink: true}}
                    onChange={e => setData('file_orcamento', e.target.files[0])}/>
            </Col>
        </Row>
        <Row className={"my-4"}>
            <Col>
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Formas de Pagamento</FormLabel>
                    <RadioGroup required row onChange={e => setData('forma_pagamento', e.target.value)}>
                        <FormControlLabel value="À Vista" control={<Radio id="forma_pagamento"/>} label="À Vista"/>
                        <FormControlLabel value="Financiamento" control={<Radio id="forma_pagamento"/>}
                                          label="Financiamento"/>
                        <FormControlLabel value="Boleto" control={<Radio id="forma_pagamento"/>} label="Boleto"/>
                    </RadioGroup>
                </FormControl>
            </Col>
            <Col className={"mb-3"} lg={"6"}>
                {data.forma_pagamento === 'Financiamento' &&
                    <TextField
                        required type="file" label="Carta de Autorização" InputLabelProps={{shrink: true}}
                        onChange={e => setData('file_carta_autorizacao', e.target.files[0])}/>}
            </Col>
        </Row>
        <Row className={"mb-3"}>
            <Col className={"mb-3"} lg={"12"}>
                <TextField
                    label="Anotações" multiline rows={4} fullWidth
                    value={data.obs} onChange={e => setData('obs', e.target.value)}/>
            </Col>
        </Row>
    </Box>
}
