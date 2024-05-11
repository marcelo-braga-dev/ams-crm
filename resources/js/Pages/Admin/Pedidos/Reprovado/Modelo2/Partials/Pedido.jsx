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
import React, {useState} from "react";
import ClearIcon from "@mui/icons-material/Clear";

export default function Pedido({setData, data}) {

    const qtdParcelas = data.forma_pagamento.replace(/[^0-9]/g,'');
    const [qtdChequeParcelas, setQtdChequeParcelas] = useState(qtdParcelas);
    const [documento, setDocumento] = useState('cnh');

    let camposCheques = []

    function chequesCampos() {
        for (let i = 1; i <= qtdChequeParcelas; i++)
            camposCheques.push(
                <div key={i} className="row align-items-center">
                    <div className="col-6 mb-4">
                        <TextField
                            label={i + "° Cheque"} fullWidth type="file" InputLabelProps={{shrink: true}} required
                            onChange={e => setData('file_cheques', {
                                ...data.file_cheques,
                                [i]: {
                                    ...data?.file_cheques?.[i],
                                    file: e.target.files[0]
                                }
                            })}>
                        </TextField>
                    </div>
                    <div className="col mb-4">
                        <TextField type="date" label="Data Vencimento" fullWidth
                                   InputLabelProps={{shrink: true}} required
                                   onChange={e => setData('file_cheques', {
                                       ...data.file_cheques,
                                       [i]: {
                                           ...data?.file_cheques?.[i],
                                           vencimento: e.target.value
                                       }
                                   })}/>

                    </div>
                    <div className="col mb-4">

                        {(i == qtdChequeParcelas && qtdChequeParcelas > 1) &&
                            <ClearIcon className="text-danger cursor-pointer"
                                       onClick={() => removeCheque()}/>
                        }
                    </div>
                </div>
            )

        return camposCheques
    }

    function removeCheque() {
        setQtdChequeParcelas(qtdChequeParcelas - 1)
        data.file_cheques[qtdChequeParcelas] = {}
    }

    function qtdCredito(qtd) {
        setData('forma_pagamento', 'Cartão Crédito em ' + qtd + 'x')
    }

    function qtdBoletos(qtd) {
        setData('forma_pagamento', 'Boleto em ' + qtd + 'x')
    }

    function qtdCheque(qtd) {
        setQtdChequeParcelas(qtd)
        setData('forma_pagamento', qtd + 'x Cheques')
    }

    function formaPagamento() {
         if (data.forma_pagamento?.includes('Crédito')) return 'Cartão de Crédito';
         if (data.forma_pagamento?.includes('Boleto')) return 'Boleto';
         if (data.forma_pagamento?.includes('Cheque')) return 'Cheque';
         return data.forma_pagamento
    }

    return <Box>
        <div className="row">
            <div className="col mb-4">TOTAL: R$ {data.preco}</div>
        </div>


        {/*Forma pagamento*/}
        <div className="row mb-4">
            <div className="col-md-4">
                <TextField label="Forma de Pagamento" select fullWidth required defaultValue={formaPagamento()}
                           onChange={e => setData('forma_pagamento', e.target.value)}>
                    <MenuItem value="PIX">PIX</MenuItem>
                    <MenuItem value="Boleto">Boleto</MenuItem>
                    <MenuItem value="Cartão de Crédito">Cartão de Crédito</MenuItem>
                    <MenuItem value="Cartão de Débito">Cartão de Débito</MenuItem>
                    <MenuItem value="Dinheiro">Dinheiro</MenuItem>
                    <MenuItem value="Cheque">Cheque</MenuItem>
                    <MenuItem value="Bonificação">Bonificação</MenuItem>
                </TextField>
            </div>
            <div className="col-auto">
                {data.forma_pagamento?.includes('Crédito') &&
                    <TextField
                        required type="number" label="Qtd. de Parcelas" defaultValue={qtdParcelas}
                        onChange={e => qtdCredito(e.target.value)}/>}
                {data.forma_pagamento?.includes('Boleto') &&
                    <TextField
                        required type="number" label="Qtd. de Parcelas" defaultValue={qtdParcelas}
                        onChange={e => qtdBoletos(e.target.value)}/>}
                {data.forma_pagamento?.includes('Cheque') &&
                    <TextField
                        required type="number" label="Qtd. de Cheques" defaultValue={qtdParcelas}
                        onChange={e => qtdCheque(e.target.value)}/>}
            </div>
            <div className="col">
                {data.forma_pagamento?.includes('PIX') &&
                    <TextField
                        type="file" label="Comprovante de Pagamento" InputLabelProps={{shrink: true}}
                        onChange={e => setData('file_pix', e.target.files[0])}/>}
            </div>
        </div>

        {data.forma_pagamento?.includes('Cheque') && chequesCampos()}

        <div className="row border-bottom pb-4 mb-5">
            <div className="col-md-6">
                <TextField
                    label="Imagem da Lista de Pedido"
                    fullWidth type="file" InputLabelProps={{shrink: true}}
                    onChange={e => setData('img_pedido', e.target.files[0])}>
                </TextField>
            </div>
            <div className="col">
                <FormControl>
                    <FormLabel>Documentos do Cliente</FormLabel>
                    <RadioGroup row value={documento}
                                onChange={event => setDocumento(event.target.value)}>
                        <FormControlLabel value="cnh" control={<Radio size="small"/>} label="CNH"/>
                        <FormControlLabel value="rg" control={<Radio size="small"/>} label="RG/CPF"/>
                    </RadioGroup>
                </FormControl>
                {documento === 'cnh' && <>
                    <TextField
                        label="CNH"  className="mb-4"
                        fullWidth type="file" InputLabelProps={{shrink: true}}
                        onChange={e => setData('img_cnh', e.target.files[0])}>
                    </TextField>
                </>}
                {documento === 'rg' && <>
                    <TextField
                        label="RG"  className="mb-4"
                        fullWidth type="file" InputLabelProps={{shrink: true}}
                        onChange={e => setData('img_rg', e.target.files[0])}>
                    </TextField>
                    <TextField
                        label="CPF"
                        fullWidth type="file" InputLabelProps={{shrink: true}}
                        onChange={e => setData('img_cpf', e.target.files[0])}>
                    </TextField>
                </>}
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
