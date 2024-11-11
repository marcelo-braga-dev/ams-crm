import * as React from 'react';
import CardContainer from '@/Components/Cards/CardContainer';
import {Button, Grid, Stack, TextField, Typography} from '@mui/material';
import ListItem from '@mui/material/ListItem';
import {TelephoneFill, Whatsapp} from 'react-bootstrap-icons';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import {useEffect, useState} from 'react';
import {TbBrandWhatsapp, TbLocation, TbPlus} from 'react-icons/tb';
import {router} from '@inertiajs/react';
import Paper from "@mui/material/Paper";
import CardBody from "@/Components/Cards/CardBody.jsx";

export default function HistoricoAtendimento({leadId}) {
    const [historicos, setHistoricos] = useState([]);
    const [anotacoes, setAnotacoes] = useState('');
    const [contatoId, setContatoId] = useState(null);

    const fetchHistorico = async () => {
        const response = await axios.get(route('auth.leads.get-historico-contato', leadId));
        setHistoricos(response.data);
    };

    useEffect(() => {
        fetchHistorico()
    }, []);

    const submit = (e) => {
        e.preventDefault()
        if (contatoId && anotacoes) {
            try {
                axios.post(route('auth.leads.set-anotacao-contato', contatoId), {msg: anotacoes});
            } finally {
                fetchHistorico()
                setContatoId(null)
                setAnotacoes('')
            }
        }
    };

    return (
        <div style={{maxHeight: 500, overflowY: 'auto', paddingInline: 20}}>

            {historicos.map((dado, index) => (
                <CardContainer key={dado.id}>
                    <CardBody>
                        <Grid container>
                            <Grid item xs={1} textAlign="center">
                                <TbBrandWhatsapp size={40} color="green"/>
                            </Grid>
                            <Grid item xs={11}>
                                <Stack direction="row" spacing={1} alignItems="center" marginBottom={1}>
                                    <Avatar src={dado.usuario.avatar} sx={{width: 20, height: 20}}/>
                                    <Typography variant="body2">{dado.usuario.nome}</Typography>
                                </Stack>

                                <Stack direction="row" spacing={0.5} alignItems="center">
                                    <TbLocation/>
                                    <Typography variant="body2">Funil de Vendas</Typography>
                                </Stack>

                                <Stack direction="row" spacing={3} marginBottom={2}>
                                    <Typography variant="caption">#{historicos.length - index}</Typography>
                                    <Typography variant="caption">{dado.data_contato}</Typography>
                                </Stack>

                                {contatoId !== dado.id && (
                                    <Button
                                        size="small" color="warning"
                                        startIcon={<TbPlus size={15}/>}
                                        onClick={() => setContatoId(dado.id)}
                                        sx={{marginBottom: 1}}
                                    >
                                        Anotação
                                    </Button>
                                )}

                                {contatoId === dado.id &&
                                    <form onSubmit={submit}>
                                        <Stack direction="row" spacing={3} marginBottom={2}>
                                            <TextField label="Anotações" size="small" fullWidth onChange={e => setAnotacoes(e.target.value)}/>
                                            <Button type="submit" size="small">Salvar</Button>
                                        </Stack>
                                    </form>
                                }

                                {dado.anotacoes.map(anotacao => (
                                    <CardContainer key={anotacao.id}>
                                        <CardBody>
                                            <Grid container justifyContent="space-between">
                                                <Grid item xs={12} md={11}>
                                                    <Grid container justifyContent="space-between" spacing={1}>
                                                        <Grid item xs={12} md={2}>
                                                            <Stack direction="row" spacing={1}>
                                                                <Avatar src={anotacao.autor.avatar} sx={{width: 25, height: 25}}/>
                                                                <Typography fontWeight={500}>{anotacao.autor.nome}:</Typography>
                                                            </Stack>
                                                        </Grid>
                                                        <Grid item xs={12} md={10}>
                                                            <Typography>{anotacao.msg}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item textAlign="end" xs={12} md={1}>
                                                    <Typography variant="body2">{anotacao.criado_em}</Typography>
                                                </Grid>
                                            </Grid>
                                        </CardBody>
                                    </CardContainer>
                                ))}
                            </Grid>
                        </Grid>
                    </CardBody>
                </CardContainer>
            ))}

            {historicos.length === 0 && <div className="row text-center">
                <span>Não há histórico de atendimentos.</span>
            </div>}
        </div>
    );
}
