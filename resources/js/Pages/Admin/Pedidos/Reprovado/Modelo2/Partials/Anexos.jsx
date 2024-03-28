import {
    FormControl,
    Radio,
    RadioGroup,
    TextField
} from "@mui/material";

import FormControlLabel from "@mui/material/FormControlLabel";

export default function Anexos({setData, data}) {

    return <>
        <div className="row mb-3">
            <div className="col">
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
            </div>
        </div>

        <div className="row mb-4">
            {data.pessoa === 'Pessoa Física' && (<>
                {data.documentos_check === 'rg_cpf' && (<>
                    <div className="col-md-4 mb-3">
                        <TextField
                            required type="file" label="RG" InputLabelProps={{shrink: true}}
                            onChange={e => setData('file_rg', e.target.files[0])}/>
                    </div>
                    <div className="col-md-4 mb-3">
                        <TextField
                            required type="file" label="CPF" InputLabelProps={{shrink: true}}
                            onChange={e => setData('file_cpf', e.target.files[0])}/>
                    </div>
                </>)}
                {data.documentos_check === 'cnh' && (<>
                    <div className="col-md-4 mb-3">
                        <TextField
                            required type="file" label="CNH" InputLabelProps={{shrink: true}}
                            onChange={e => setData('file_cnh', e.target.files[0])}/>
                    </div>
                </>)}
            </>)}
        </div>
        <div className="row mb-3">
            {data.pessoa === 'Jurídica' && (
                <div className="col-md-6 mb-3">
                    <TextField
                        required type="file" label="Cartão CNPJ" InputLabelProps={{shrink: true}}
                        onChange={e => setData('file_cartao_cnpj', e.target.files[0])}/>
                </div>
            )}
        </div>
    </>
}
