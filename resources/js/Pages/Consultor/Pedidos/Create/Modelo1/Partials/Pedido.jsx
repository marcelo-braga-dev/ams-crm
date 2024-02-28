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

export default function Pedido({fornecedores, setData, data}) {

    return <>
        <div className="row">
            <div className="col-md-4 mb-3">
                <TextFieldMoney label="Preço" value={data.preco} setData={setData} index="preco" required/>
            </div>
            <div className="col-md-4 mb-3">
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
        <div className="row mb-3">
            <div className="col mb-3">
                <TextField accept="application/pdf"
                           required type="file" label="Orçamento" InputLabelProps={{shrink: true}}
                           onChange={e => setData('file_orcamento', e.target.files[0])}/>
            </div>
        </div>

        {/*<div className="row mb-4">*/}
        {/*<div className="col">*/}
        {/*    <TextField label="Marca do Inversor" select fullWidth required defaultValue={""}*/}
        {/*               onChange={e => setData('fornecedor', e.target.value)}>*/}
        {/*        {fornecedores.map((option, index) => (*/}
        {/*            <MenuItem key={index} value={option.id}>*/}
        {/*                {option.nome}*/}
        {/*            </MenuItem>*/}
        {/*        ))}*/}
        {/*    </TextField>*/}
        {/*</div>*/}
        {/*<div className="col">*/}
        {/*    <TextField label="" select fullWidth required defaultValue={""}*/}
        {/*               onChange={e => setData('fornecedor', e.target.value)}>*/}
        {/*        {fornecedores.map((option, index) => (*/}
        {/*            <MenuItem key={index} value={option.id}>*/}
        {/*                {option.nome}*/}
        {/*            </MenuItem>*/}
        {/*        ))}*/}
        {/*    </TextField>*/}
        {/*</div>*/}
        {/*<div className="col">*/}
        {/*    <TextField label="Fornecedor" select fullWidth required defaultValue={""}*/}
        {/*               onChange={e => setData('fornecedor', e.target.value)}>*/}
        {/*        {fornecedores.map((option, index) => (*/}
        {/*            <MenuItem key={index} value={option.id}>*/}
        {/*                {option.nome}*/}
        {/*            </MenuItem>*/}
        {/*        ))}*/}
        {/*    </TextField>*/}
        {/*</div>*/}
        {/*<div className="col">*/}
        {/*    <TextField label="Fornecedor" select fullWidth required defaultValue={""}*/}
        {/*               onChange={e => setData('fornecedor', e.target.value)}>*/}
        {/*        {fornecedores.map((option, index) => (*/}
        {/*            <MenuItem key={index} value={option.id}>*/}
        {/*                {option.nome}*/}
        {/*            </MenuItem>*/}
        {/*        ))}*/}
        {/*    </TextField>*/}
        {/*</div>*/}
        {/*</div>*/}

        <div className="row">
            <div className="col">
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Formas de Pagamento</FormLabel>
                    <RadioGroup required row onChange={e => setData('forma_pagamento', e.target.value)}>
                        <FormControlLabel value="À Vista" control={<Radio id="forma_pagamento"/>} label="À Vista"/>
                        <FormControlLabel value="Financiamento" control={<Radio id="forma_pagamento"/>}
                                          label="Financiamento"/>
                        <FormControlLabel value="Boleto" control={<Radio id="forma_pagamento"/>} label="Boleto"/>
                    </RadioGroup>
                </FormControl>
            </div>
            <div className="mb-3">
                {data.forma_pagamento === 'Financiamento' &&
                    <TextField
                        required type="file" label="Carta de Autorização" InputLabelProps={{shrink: true}}
                        onChange={e => setData('file_carta_autorizacao', e.target.files[0])}/>}
            </div>
        </div>

        <div className="row mb-4">
            <div className="col-auto">
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Repasse Integrador</FormLabel>
                    <RadioGroup required row defaultValue="n" onChange={e => setData('is_repasse', e.target.value)}>
                        <FormControlLabel value="n" control={<Radio/>} label="Não"/>
                        <FormControlLabel value="s" control={<Radio/>} label="Sim"/>
                    </RadioGroup>
                </FormControl>
            </div>
            <div className="col-auto mb-3 pt-4">
                {data.is_repasse === 's' &&
                    <TextFieldMoney label="Valor do Repasse" value={data.repasse} setData={setData} index="repasse"
                                    required/>}
            </div>
        </div>

        <div className="row">
            <div className="mb-3">
                <TextField
                    label="Anotações" multiline rows={4} fullWidth
                    value={data.obs} onChange={e => setData('obs', e.target.value)}/>
            </div>
        </div>
    </>
}
