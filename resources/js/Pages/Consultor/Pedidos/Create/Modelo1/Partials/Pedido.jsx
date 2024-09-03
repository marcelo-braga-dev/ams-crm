import {
    FormControl,
    FormLabel,
    MenuItem,
    Radio,
    RadioGroup,
    TextField,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextFieldMoney from "@/Components/Inputs/TextFieldMoney";
import CardContainer from "@/Components/Cards/CardContainer.jsx";
import CardBody from "@/Components/Cards/CardBody.jsx";

export default function Pedido({fornecedores, setData, data}) {

    return <>
        <CardContainer>
            <CardBody>
                <div className="row">
                    <div className="mb-4 col-md-3">
                        <TextFieldMoney label="Preço" value={data.preco} setData={setData} index="preco" required/>
                    </div>
                    <div className="mb-4 col-md-4">
                        <TextField label="Distribuidora" select fullWidth required
                                   onChange={e => setData('fornecedor', e.target.value)}>
                            {fornecedores.map((option, index) => (
                                <MenuItem key={index} value={option.id}>
                                    {option.nome}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                </div>
                <div className="mb-4 row">
                    <div className="mb-4 col">
                        <TextField accept="application/pdf"
                                   required type="file" label="Orçamento" InputLabelProps={{shrink: true}}
                                   onChange={e => setData('file_orcamento', e.target.files[0])}/>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Formas de Pagamento</FormLabel>
                            <RadioGroup required row onChange={e => setData('forma_pagamento', e.target.value)}>
                                <FormControlLabel value="À Vista" control={<Radio required id="forma_pagamento"/>} label="À Vista"/>
                                <FormControlLabel value="Financiamento" control={<Radio required id="forma_pagamento"/>}
                                                  label="Financiamento"/>
                                <FormControlLabel value="Boleto" control={<Radio required id="forma_pagamento"/>} label="Boleto"/>
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className="mb-4">
                        {data.forma_pagamento === 'Financiamento' &&
                            <TextField
                                required type="file" label="Carta de Autorização" InputLabelProps={{shrink: true}}
                                onChange={e => setData('file_carta_autorizacao', e.target.files[0])}/>}
                    </div>
                </div>

                <div className="row">
                    <div className="col-auto">
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Repasse Integrador</FormLabel>
                            <RadioGroup required row defaultValue="n" onChange={e => setData('is_repasse', e.target.value)}>
                                <FormControlLabel value="n" control={<Radio/>} label="Não"/>
                                <FormControlLabel value="s" control={<Radio/>} label="Sim"/>
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className="col-auto pt-4">
                        {data.is_repasse === 's' &&
                            <TextFieldMoney label="Valor do Repasse" value={data.repasse} setData={setData} index="repasse"
                                            required/>}
                    </div>
                </div>
            </CardBody>
        </CardContainer>

        <CardContainer>
            <CardBody>
                <TextField
                    label="Anotações" multiline rows={2} fullWidth
                    value={data.obs} onChange={e => setData('obs', e.target.value)}/>
            </CardBody>
        </CardContainer>
    </>
}
