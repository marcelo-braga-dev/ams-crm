import {
    FormControl,
    Radio,
    RadioGroup,
    TextField
} from "@mui/material";

import FormControlLabel from "@mui/material/FormControlLabel";
import {FileText, Person} from "react-bootstrap-icons";
import CardTitle from "@/Components/Cards/CardTitle.jsx";
import CardContainer from "@/Components/Cards/CardContainer.jsx";
import CardBody from "@/Components/Cards/CardBody.jsx";

export default function Anexos({setData, data}) {

    return (
        <CardContainer>
            <CardTitle title="Documentos do Cliente" icon={<FileText size={22} color="back"/>}/>
            <CardBody>
                {data.pessoa === 'Pessoa Física' && (<>
                    <div className="row mb-3">
                        <div className="col">
                            <FormControl>
                                <RadioGroup
                                    row defaultValue="cnh" name="row-radio-buttons-group"
                                    onChange={e => setData('documentos_check', e.target.value)}>
                                    <FormControlLabel value="cnh" className="mr-4" control={<Radio/>} label="CNH"/>
                                    <FormControlLabel value="rg_cpf" control={<Radio/>} label="RG/CPF"/>
                                </RadioGroup>
                            </FormControl>
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
                </>)}

                <div className="row">
                    {data.pessoa === 'Jurídica' && (
                        <div className="col-md-6">
                            <TextField
                                required type="file" label="Cartão CNPJ" InputLabelProps={{shrink: true}}
                                onChange={e => setData('file_cartao_cnpj', e.target.files[0])}/>
                        </div>
                    )}
                    <div className="col-md-6">
                        <TextField
                            required type="file" label="Comprovante Residencia" InputLabelProps={{shrink: true}}
                            onChange={e => setData('file_comprovante_residencia', e.target.files[0])}/>
                    </div>
                </div>
            </CardBody>
        </CardContainer>
    )
}
