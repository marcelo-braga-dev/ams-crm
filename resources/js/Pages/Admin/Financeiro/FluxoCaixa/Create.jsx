import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import {FormControl, Radio, RadioGroup, TextField} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import {useState} from "react";
import TextFieldMoney from "@/Components/Inputs/TextFieldMoney";
import MenuItem from "@mui/material/MenuItem";

export default function () {
    const [tipo, setTipo] = useState()

    return (
        <Layout titlePage="Inserir Informações" menu="financeiro" submenu="fluxo-caixa">
            <div className="row">
                <div className="col">
                    Tipo de Entrada<br/>
                    <FormControl>
                        <RadioGroup
                            row aria-labelledby="pessoa"
                            name="row-radio-buttons-group" onChange={e => setTipo(e.target.value)}>
                            <FormControlLabel value="entrada" control={<Radio/>} label="Entrada"/>
                            <FormControlLabel value="saida" control={<Radio/>} label="Saída"/>
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
            {tipo && <>
                <div className="row">
                    <div className="col mb-4">
                        <TextField type="date"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-4">
                        <TextField select label="Empresa" fullWidth>
                            <MenuItem value="1">CASSARIN</MenuItem>
                            <MenuItem value="2">AMS 360</MenuItem>
                            <MenuItem value="3">AGGRO</MenuItem>
                        </TextField>
                    </div>
                    <div className="col mb-4">
                        <TextField select label="Fornecedores" fullWidth>
                            <MenuItem value="1">Fornecedor 1</MenuItem>
                            <MenuItem value="2">Fornecedor 2</MenuItem>
                            <MenuItem value="3">Fornecedor 3</MenuItem>
                        </TextField>
                    </div>
                    <div className="col mb-4">
                        <TextField fullWidth label="N° NF"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-4">
                        <TextFieldMoney fullWidth label="Valor"/>
                    </div>
                    {tipo === 'saida' && <div className="col mb-4">
                        <TextField type="date" fullWidth label="Data Vencimento" InputLabelProps={{shrink: true}}/>
                    </div>}
                    {tipo === 'entrada' && <div className="col mb-4">
                        <TextField type="date" fullWidth label="Previsão do Recebimento"
                                   InputLabelProps={{shrink: true}}/>
                    </div>}
                    {tipo === 'saida' && <div className="col mb-4">
                        <TextFieldMoney fullWidth label="Valor Baixa"/>
                    </div>}
                    {tipo === 'saida' && <div className="col mb-4">
                        <TextField fullWidth type="date" label="Data Baixa" InputLabelProps={{shrink: true}}/>
                    </div>}
                    <div className="col mb-4">
                        <TextField select label="Banco" fullWidth defaultValue="1">
                            <MenuItem value="1">Sicoob</MenuItem>
                            <MenuItem value="2">Unicred</MenuItem>
                            <MenuItem value="2">Santander</MenuItem>
                        </TextField>
                    </div>
                    <div className="col mb-4">
                        <TextField select label="Status" fullWidth defaultValue="1">
                            <MenuItem value="1">Aberto</MenuItem>
                            <MenuItem value="2">Pago</MenuItem>
                        </TextField>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <button className="btn btn-primary">Salvar</button>
                    </div>
                </div>
            </>}
        </Layout>
    )
}
