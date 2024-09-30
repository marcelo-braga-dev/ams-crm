import {
    Divider,
    FormControl, FormLabel, MenuItem, Radio, RadioGroup, TextField, Typography,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextFieldMoney from "@/Components/Inputs/TextFieldMoney";
import CardContainer from "@/Components/Cards/CardContainer.jsx";
import CardBody from "@/Components/Cards/CardBody.jsx";
import convertFloatToMoney, {convertMoneyFloat} from "@/Helpers/converterDataHorario.jsx";
import CardTitle from "@/Components/Cards/CardTitle.jsx";
import {Coin, FileRuled} from "react-bootstrap-icons";
import {useState} from "react";

export default function Pedido({fornecedores, setData, data}) {
    const [tipoFinanciamento, setTipoFinanciamento] = useState()
    const qtdCredito = (qtd) => {
        setData('forma_pagamento', `Cartão Crédito ${qtd}x`)
    }

    return <>
        <CardContainer>
            <CardTitle title="Pedido" icon={<FileRuled size={22} color="black"/>}/>
            <CardBody>
                <div className="row">
                    <div className="mb-4 col-md-3">
                        <TextFieldMoney label="Preço" value={data.preco} setData={setData} index="preco" required/>
                    </div>
                    <div className="mb-4 col-md-4">
                        <TextField label="Distribuidora" select fullWidth required
                                   onChange={e => setData('fornecedor', e.target.value)}>
                            {fornecedores.map((option, index) => (<MenuItem key={index} value={option.id}>
                                {option.nome}
                            </MenuItem>))}
                        </TextField>
                    </div>
                    <div className="col">
                        <TextField accept="application/pdf" fullWidth
                                   required type="file" label="Orçamento" InputLabelProps={{shrink: true}}
                                   onChange={e => setData('file_orcamento', e.target.files[0])}/>
                    </div>
                </div>
            </CardBody>
        </CardContainer>

        <CardContainer>
            <CardTitle title="Formas de Pagamento" icon={<Coin size={22} color="black"/>}/>
            <CardBody>
                <FormControl>
                    <RadioGroup required row onChange={e => setData('forma_pagamento', e.target.value)}>
                        <FormControlLabel value="À Vista" control={<Radio required id="forma_pagamento"/>} label="À Vista"/>
                        <FormControlLabel value="Financiamento" control={<Radio required id="forma_pagamento"/>} label="Financiamento"/>
                        <FormControlLabel value="Boleto" control={<Radio required id="forma_pagamento"/>} label="Boleto"/>
                        <FormControlLabel value="Cartão Crédito" control={<Radio required id="forma_pagamento"/>} label="Cartão de Crédito"/>
                    </RadioGroup>
                </FormControl>
                {data.forma_pagamento === 'Financiamento' && (<>
                    <Divider className="my-2"/>
                    <div>
                        <FormControl>
                            <RadioGroup required value={tipoFinanciamento} row onChange={e => setTipoFinanciamento(e.target.value)}>
                                <FormControlLabel value="nota_final" control={<Radio required id="forma_pagamento"/>} label="Nota Final"/>
                                <FormControlLabel value="nota_futura" control={<Radio required id="forma_pagamento"/>} label="Nota Futura"/>
                            </RadioGroup>
                        </FormControl>
                    </div>

                    {tipoFinanciamento === 'nota_final' && <div className="row mt-4">
                        <div className="col mb-4">
                            <TextField label="Banco" fullWidth required
                                       onChange={e => setData({...data, tipo_financiamento: {...data?.tipo_financiamento, banco: e.target.value}})}/>
                        </div>
                        <div className="col mb-4">
                            <TextField label="Nome do Gerente" fullWidth required
                                       onChange={e => setData({...data, tipo_financiamento: {...data?.tipo_financiamento, gerente: e.target.value}})}/>
                        </div>
                        <div className="col mb-4">
                            <TextField label="Telefone do Gerente" fullWidth required className="phone"
                                       onChange={e => setData({...data, tipo_financiamento: {...data?.tipo_financiamento, telefone: e.target.value}})}/>
                        </div>
                        <div className="col mb-4">
                            <TextField label="Email do Gerente" fullWidth required
                                       onChange={e => setData({...data, tipo_financiamento: {...data?.tipo_financiamento, email: e.target.value}})}/>
                        </div>
                    </div>}

                    <div className="mt-3">
                        <TextField
                            required type="file" label="Carta de Autorização" InputLabelProps={{shrink: true}}
                            onChange={e => setData('file_carta_autorizacao', e.target.files[0])}/>
                    </div>
                </>)}

                {data?.forma_pagamento?.includes('Cartão Crédito') && <div className="row mt-4">
                    <div className="mb-4">
                        <TextField required label="Quantidade de Parcelas"
                                   onChange={e => qtdCredito(e.target.value)}/>
                    </div>
                </div>}
            </CardBody>
        </CardContainer>

        <CardContainer>
            <CardTitle title="Repasse Integrador" icon={<Coin size={22} color="black"/>}/>
            <CardBody>
                <FormControl>
                    <RadioGroup required row defaultValue="n" onChange={e => setData('is_repasse', e.target.value)}>
                        <FormControlLabel value="n" control={<Radio/>} label="Não"/>
                        <FormControlLabel value="s" control={<Radio/>} label="Sim"/>
                    </RadioGroup>
                </FormControl>

                {data.is_repasse === 's' && <div className="row mt-3 align-items-center">
                    <div className="col-auto">
                        <TextFieldMoney label="Valor do Repasse" value={data.repasse} setData={setData} index="repasse" required/>
                    </div>
                    <div className="col-auto">
                        <Typography>Desconto: 13,8%</Typography>
                    </div>
                    <div className="col-auto">
                        <Typography fontWeight="bold">
                            Total a ser repassado: R$ {convertFloatToMoney(convertMoneyFloat(data.repasse) - (convertMoneyFloat(data.repasse) * 0.138))}
                        </Typography>
                    </div>
                </div>}
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
