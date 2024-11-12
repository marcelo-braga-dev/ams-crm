import {Box, Button, Grid, Stack, Typography} from "@mui/material";
import CardContainer from "@/Components/Cards/CardContainer.jsx";
import CardBody from "@/Components/Cards/CardBody.jsx";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import {TbCheck, TbX} from "react-icons/tb";
import * as React from "react";
import {useState} from "react";

const AvalizacaoModulo = ({avaliacoes}) => {

    const [respostas, setRespostas] = useState({})

    return (
        <Box>
            <Grid container justifyContent="space-between" spacing={3}>
                {avaliacoes.map((item, index) => {
                    return (
                        <Grid item md={6}>
                            <CardContainer>
                                <CardBody>
                                    <Typography>
                                        {index + 1}) {item.titulo}
                                    </Typography>
                                    <FormControl>
                                        <RadioGroup
                                            name="radio-buttons-group"
                                            onChange={e => setRespostas({...respostas, [item.id]: e.target.value})}
                                        >
                                            {item.alternativas.map(alternativa => (
                                                <FormControlLabel
                                                    value={alternativa.alternativa}
                                                    control={<Radio size="small"
                                                                    disabled={!!respostas?.[item.id]}/>}
                                                    label={`${alternativa.alternativa}) ${alternativa.titulo}`}/>
                                            ))}
                                        </RadioGroup>
                                    </FormControl>

                                    {respostas?.[item.id] && <Box>
                                        {respostas?.[item.id] === item.altenativa_correta ?
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <TbCheck color="green" size={25}/>
                                                <Typography>Alternativa Correta</Typography>
                                            </Stack>
                                            :
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <TbX color="red" size={25}/>
                                                <Typography>Alternativa Correta: "{item.altenativa_correta}"</Typography>
                                            </Stack>
                                        }
                                    </Box>}
                                </CardBody>
                            </CardContainer>
                        </Grid>
                    )
                })}
            </Grid>

            <Box textAlign="center" marginBottom={2}>
                <Button color="success">Finalizar Módulo</Button>
            </Box>
        </Box>
    )
}
export default AvalizacaoModulo
