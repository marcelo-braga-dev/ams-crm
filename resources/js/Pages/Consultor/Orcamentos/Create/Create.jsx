import Layout from "@/Layouts/Layout";
import {Grid, Radio, RadioGroup, Stack, TextField, Typography} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import CardTitle from "@/Components/Cards/CardTitle";
import {BoxSeam, Calculator, Person} from "react-bootstrap-icons";
import convertFloatToMoney from "@/Helpers/converterDataHorario";
import React, {useCallback, useState} from "react";
import {router} from "@inertiajs/react";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function Create({lead, estruturas}) {

    const [tipoCalculo, setTipoCalculo] = useState('kwh')
    const [potencia, setPotencia] = useState()
    const [estrutura, setEstrutura] = useState()
    const [tensao, setTensao] = useState()
    const [kits, setKits] = useState([])
    const [calculadaPotencia, setCalculadaPotencia] = useState()

    const handleTipoCalculo = useCallback((e) => setTipoCalculo(e.target.value), []);
    const handlePotencia = useCallback((e) => setPotencia(e.target.value), []);
    const handleEstrutura = useCallback((e) => setEstrutura(e.target.value), []);
    const handleTensao = useCallback((e) => setTensao(e.target.value), []);

    const fetchGeradores = useCallback(async () => {
        try {
            const response = await axios.get(route('consultor.orcamentos.buscar-geradores',
                {tipoCalculo, potencia, estrutura, tensao}));
            setKits(response.data.kits);
            setCalculadaPotencia(response.data.potencia)
        } catch (error) {
            console.error("Erro ao buscar geradores:", error);
        }
    }, [tipoCalculo, potencia, estrutura, tensao]);

    const gerarOrcamento = (id) => {
        router.post(route('consultor.orcamentos.store', {kit_id: id, lead_id: lead.id, tipoCalculo, potencia, estrutura, tensao}))
    }

    return (<Layout menu="orcamentos" submenu="orcamentos-solar" titlePage="Gerar Orçamento" voltar={route('consultor.orcamentos.index')}>
        <CardContainer>
            <CardTitle title="Cliente" icon={<Person size="21" color="black"/>}/>
            <CardBody>
                <div className="row">
                    <div className="col">
                        <Typography fontSize={15}><b>Nome:</b> {lead.nome} (#{lead.id})</Typography>
                    </div>
                    <div className="col">
                        <Typography fontSize={15}><b>Localidade:</b> {lead.cidade}/{lead.estado}</Typography>
                    </div>
                </div>
            </CardBody>
        </CardContainer>

        <CardContainer>
            <CardTitle title="Calcular Potência do Gerador" icon={<Calculator size="21"/>}/>
            <CardBody>
                <RadioGroup defaultValue={tipoCalculo} row className="ms-3 mb-2" onChange={handleTipoCalculo}>
                    <FormControlLabel label="kW/h" className="me-4" control={<Radio value="kwh" className="p-0" size="small"/>}/>
                    <FormControlLabel label="kWp" control={<Radio value="kwp" className="p-0" size="small"/>}/>
                </RadioGroup>
                <div className="row mb-4">
                    <div className="col-md-2">
                        <TextField label="Média Consumo" fullWidth onChange={handlePotencia} type="number"
                                   InputProps={{endAdornment: <InputAdornment position="end">{tipoCalculo === 'kwh' ? 'kW/h' : 'kWp'}</InputAdornment>}}/>
                    </div>
                    <div className="col-md-3">
                        <TextField label="Estrutura" select fullWidth onChange={handleEstrutura}>
                            {Object.values(estruturas).map(item => <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>)}
                        </TextField>
                    </div>
                    <div className="col-md-2">
                        <TextField label="Tensão" select fullWidth onChange={handleTensao}>
                            <MenuItem value={220}>220V</MenuItem>
                            <MenuItem value={380}>380V</MenuItem>
                        </TextField>
                    </div>
                </div>
                <div>
                    <button className="btn btn-warning" disabled={!(potencia && estrutura && tensao)} onClick={fetchGeradores}>Pesquisar Kits</button>
                </div>
            </CardBody>
        </CardContainer>

        {kits.length > 0 &&
            <CardContainer>
                <CardTitle title="Escolha o Gerador" icon={<BoxSeam size="23"/>} subtitle={`Potência Calculada: ${calculadaPotencia} kWp`}/>
                <CardBody>
                    <div className="row row-cols-4">
                        {kits.map(item => (
                            <div key={item.id} className="col">
                                <CardContainer>
                                    <CardBody>
                                        <Grid container direction="row" spacing={2} marginBottom={2}>
                                            <Grid item sm={6} display="flex" alignItems="center" justifyContent="center">
                                                <img alt="" style={{width: "100%"}} src={item.inversor_logo}/>
                                            </Grid>
                                            <Grid item sm={6} display="flex" alignItems="center" justifyContent="center">
                                                <img alt="" style={{width: "100%"}} src={item.painel_logo}/>
                                            </Grid>
                                        </Grid>

                                        <Typography fontWeight="bold" align="center">{item.titulo}</Typography>
                                        <Typography fontSize={11} align="right" color="gray">SKU {item.sku}</Typography>
                                        <Typography variant="body2"><span style={{fontWeight: 600}}>Gerador:</span> {item.potencia_kit} kWp</Typography>
                                        <Typography variant="body2"><span
                                            style={{fontWeight: 600}}>Inversor:</span> {item.inversor_nome} {item.potencia_inversor}k</Typography>
                                        <Typography variant="body2"><span
                                            style={{fontWeight: 600}}>Módulos:</span> {item.painel_nome} {item.potencia_modulo}W</Typography>
                                        <Typography variant="body2"><span style={{fontWeight: 600}}>Tensão:</span> {item.tensao}V</Typography>
                                        <Stack marginTop={2}>
                                            <Typography color="green" variant="h4">R$ {convertFloatToMoney(item.preco_venda)}</Typography>
                                            <button className="btn btn-warning mt-3"
                                                    onClick={() => gerarOrcamento(item.id)}>Selecionar
                                            </button>
                                        </Stack>
                                    </CardBody>
                                </CardContainer>
                            </div>
                        ))}
                    </div>
                </CardBody>
            </CardContainer>
        }
    </Layout>)
}









