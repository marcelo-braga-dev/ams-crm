import Layout from '@/Layouts/Layout';
import TextField from '@mui/material/TextField';
import {router, useForm} from '@inertiajs/react';
import MenuItem from '@mui/material/MenuItem';
import React, {useState} from 'react';
import {Button, CircularProgress, Divider, Stack, Typography} from '@mui/material';
import CardContainer from '@/Components/Cards/CardContainer';
import CardBody from '@/Components/Cards/CardBody';
import CardTitle from '@/Components/Cards/CardTitle';
import {Eye} from 'react-bootstrap-icons';
import Link from '@/Components/Link.jsx';
import {TbDownload} from 'react-icons/tb';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Grid from "@mui/material/Grid2";

export default function ({setores, modelo, historicos}) {
    const {data, setData} = useForm({
        tipo_planilha: '',
    });
    const [pregress, setPregress] = useState(false);

    function submit(e) {
        e.preventDefault();
        setPregress(true);
        router.post(route('admin.clientes.leads.importar.store'), {...data});
    }

    router.on('success', () => setPregress(false));

    const [selectedValue, setSelectedValue] = React.useState('a');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    return (
        <Layout titlePage="Importar Planilhas de Leads" menu="leads" submenu="leads-importar">
            <CardContainer>
                <CardTitle title="Importar Planilhas de Leads">
                    <a href={modelo} className="btn btn-primary btn-sm mb-0">Baixar Modelo</a>
                </CardTitle>
                <CardBody>
                    <form onSubmit={submit}>
                        <Grid container>
                            <Grid item size={{xs: 12}}>
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
                            <Grid item size={{xs: 12}}>
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
                            <div className="col-auto mb-4">
                                {/*<FormControl>*/}
                                {/*    <FormLabel id="demo-controlled-radio-buttons-group">Tipo de PLanilha</FormLabel>*/}
                                {/*    <RadioGroup*/}
                                {/*        row*/}
                                {/*        name="controlled-radio-buttons-group"*/}
                                {/*        value={data.tipo_planilha}*/}
                                {/*        onChange={e => setData('tipo_planilha', e.target.value)}*/}
                                {/*    >*/}
                                {/*        <FormControlLabel value="pj" control={<Radio required/>} label="Pessoa Física"/>*/}
                                {/*        <FormControlLabel value="pf" control={<Radio required/>} label="Pessoa Jurídica"/>*/}
                                {/*    </RadioGroup>*/}
                                {/*</FormControl>*/}
                            </div>
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
                                <TextField type="file" required inputProps={{accept: '.csv'}} fullWidth
                                           onChange={e => setData('arquivo', e.target.files[0])}/>
                            </div>
                            <div className="col-auto mt-4">
                                {pregress ? <CircularProgress/> : <Button color="success" type="submit">Enviar</Button>}
                            </div>
                        </div>
                    </form>
                </CardBody>
            </CardContainer>

            <CardContainer>
                <CardTitle title="Histórico de Importação"/>
                <div style={{height: '50vh', overflow: 'auto'}}>
                    <div className="table-responsive">
                        <table className="table-1 table-sm">
                            <thead>
                            <tr>
                                <th className="text-center">ID</th>
                                <th>Importação</th>
                                <th className="text-center">Novos</th>
                                <th className="text-center">Enriquecidos</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {historicos.map((dado, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="text-center">#{dado.id}</td>
                                        <td>
                                            <Typography variant="body1" fontWeight="bold">{dado.nome}</Typography>
                                            <Typography variant="body2">{dado.setor}</Typography>
                                            <Typography variant="body2">{dado.data}</Typography>
                                        </td>
                                        <td className="text-center">
                                            <Typography variant="body1">{dado.qtd}</Typography>
                                        </td>
                                        <td className="text-center">
                                            <Typography variant="body1">{dado.enriquecidas}</Typography></td>
                                        <td>
                                            <Stack direction="row" spacing={2}>
                                                {dado.url_file && <a download href={dado.url_file}><TbDownload size="22"/></a>}
                                                <Link href={route('admin.clientes.leads.importar-historico.show', dado.id)} icon={<Eye size="22"/>}/>
                                            </Stack>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </CardContainer>
        </Layout>
    );
}
