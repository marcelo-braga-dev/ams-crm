import CardTitle from "@/Components/Cards/CardTitle.jsx";
import CardBody from "@/Components/Cards/CardBody.jsx";
import Grid from "@mui/material/Grid2";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import {Button, CircularProgress, Divider} from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import CardContainer from "@/Components/Cards/CardContainer.jsx";
import React, {useState} from "react";
import {useForm} from "@inertiajs/react";

const PlanilhaForm = ({setores}) => {
    const {data, setData} = useForm({
        tipo_planilha: '',
    });
    const [pregress, setPregress] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setPregress(true);

        try {
            await axios.post(route('admin.clientes.leads.importar.store'), {...data});
        } finally {
            setPregress(false);
        }
    }

    return (
        <CardContainer>
            <CardTitle title="Importar Planilhas de Leads">
                {/*<a href={modelo} className="btn btn-primary btn-sm mb-0">Baixar Modelo</a>*/}
            </CardTitle>
            <CardBody>
                <form onSubmit={submit}>
                    <Grid container>
                        <Grid size={{xs: 12}}>
                            <FormControl>
                                <RadioGroup
                                    row
                                    value={data.tipo_planilha}
                                    onChange={e => setData('tipo_planilha', e.target.value)}
                                >
                                    <FormControlLabel value="entrada" control={<Radio required size="small"/>} sx={{marginInlineEnd: 2}} label="Planilha de Entrada"/>
                                    <FormControlLabel value="enriquecimento" control={<Radio required size="small"/>} label="Planilha de Enriquecimento"/>
                                </RadioGroup>
                            </FormControl>
                            <Divider sx={{marginBottom: 1}}/>
                        </Grid>
                        <Grid size={{xs: 12}}>
                            <FormControl>
                                <RadioGroup
                                    row
                                    value={data.pessoa}
                                    onChange={e => setData('pessoa', e.target.value)}
                                >
                                    <FormControlLabel value="pf" control={<Radio required size="small"/>} label="Pessoa Física"/>
                                    <FormControlLabel value="pj" control={<Radio required size="small"/>} label="Pessoa Jurídica"/>
                                </RadioGroup>
                            </FormControl>
                            <Divider sx={{marginBottom: 1}}/>
                        </Grid>
                    </Grid>
                    <div className="row">
                        <div className="col-md-4 mb-4">
                            <span className="d-block">Setor</span>
                            <TextField select label="" fullWidth defaultValue="" required
                                       onChange={e => setData('setor', e.target.value)}>
                                {setores.map((setor, index) => {
                                    return (
                                        <MenuItem key={index} value={setor.id}>{setor.nome}</MenuItem>
                                    );
                                })}
                            </TextField>
                        </div>
                        <div className="col mb-4">
                            <span className="d-block">Arquivo de Importação (.csv)</span>
                            <TextField
                                type="file"
                                required
                                fullWidth
                                slotProps={{htmlInput: {accept: '.csv'}}}
                                onChange={e => setData('arquivo', e.target.files[0])}/>
                        </div>
                        <div className="col-auto mt-4">
                            {pregress ? <CircularProgress/> : <Button color="success" type="submit">Enviar</Button>}
                        </div>
                    </div>
                </form>
            </CardBody>
        </CardContainer>
    )
}
export default PlanilhaForm
