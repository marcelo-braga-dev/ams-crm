import {Col, FormGroup, Input, Label, Row} from "reactstrap";
import {
    FormControl,
    Radio,
    RadioGroup,
    TextField
} from "@mui/material";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function Anexos({setData, data}) {

    return <Box>
        {data.pessoa === 'Pessoa Física' && (
            <FormControl>
                <RadioGroup
                    row defaultValue="cnh" name="row-radio-buttons-group"
                    onChange={e => setData('documentos_check', e.target.value)}>
                    <FormControlLabel value="cnh" className="mr-4" control={<Radio/>} label="CNH"/>
                    <FormControlLabel value="rg_cpf" control={<Radio/>} label="RG/CPF"/>
                </RadioGroup>
            </FormControl>
        )}

        <Row className={"mb-4"}>
            {data.pessoa === 'Pessoa Física' && (<>
                {data.documentos_check === 'rg_cpf' && (<>
                    <Col className={"mb-3"} lg={"4"}>
                        <TextField
                            required type="file" label="RG" InputLabelProps={{shrink: true}}
                            onChange={e => setData('file_rg', e.target.files[0])}/>
                    </Col>
                    <Col className={"mb-3"} lg={"4"}>
                        <TextField
                            required type="file" label="CPF" InputLabelProps={{shrink: true}}
                            onChange={e => setData('file_cpf', e.target.files[0])}/>
                    </Col>
                </>)}
                {data.documentos_check === 'cnh' && (<>
                    <Col className={"mb-3"} lg={"4"}>
                        <TextField
                            required type="file" label="CNH" InputLabelProps={{shrink: true}}
                            onChange={e => setData('file_cnh', e.target.files[0])}/>
                    </Col>
                </>)}
            </>)}
        </Row>
        <Row className={"mb-3"}>
            {data.pessoa === 'Jurídica' && (
                <Col className={"mb-3"} lg={"6"}>
                    <TextField
                        required type="file" label="Cartão CNPJ" InputLabelProps={{shrink: true}}
                        onChange={e => setData('file_cartao_cnpj', e.target.files[0])}/>
                </Col>
            )}
            <Col className={"mb-3"} lg={"6"}>
                <TextField
                    required type="file" label="Comprovante Residencia" InputLabelProps={{shrink: true}}
                    onChange={e => setData('file_comprovante_residencia', e.target.files[0])}/>
            </Col>
        </Row>
    </Box>
}
