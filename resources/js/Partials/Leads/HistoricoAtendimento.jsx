import * as React from 'react';
import CardContainer from '@/Components/Cards/CardContainer';
import { Button, Stack, TextField, Typography } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import { TelephoneFill, Whatsapp } from 'react-bootstrap-icons';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import { useEffect, useState } from 'react';
import { TbBrandWhatsapp, TbLocation } from 'react-icons/tb';
import { router } from '@inertiajs/react';

const tipoContato = {
    'Whatsapp': { icone: <Whatsapp />, cor: 'green' },
    'Ligação Telefônica': { icone: <TelephoneFill />, cor: 'blue' },
};

export default function HistoricoAtendimento({ leadId }) {
    const [historicos, setHistoricos] = useState([]);
    const [anotacoes, setAnotacoes] = useState('');

    useEffect(() => {
        const fetchHistorico = async () => {
            const response = await axios.get(route('auth.leads.get-historico-contato', leadId));
            setHistoricos(response.data);
        };
        fetchHistorico();
    }, []);

    const submit = () => {
        router.post('');
    };

    return (
        <div style={{ maxHeight: 500, overflowY: 'auto', paddingInline: 20 }}>
            <List>
                {historicos.map((dado, index) => (
                    <CardContainer key={dado.id}>
                        <ListItem>
                            <ListItemAvatar>
                                <TbBrandWhatsapp size={40} color="green" />
                            </ListItemAvatar>
                            <ListItemText
                                primary={<Stack direction="row" spacing={1} alignItems="center" marginBottom={1}>
                                    <Avatar src={dado.usuario.avatar} sx={{ width: 20, height: 20 }} />
                                    <Typography variant="body2">{dado.usuario.nome}</Typography>
                                </Stack>}
                                secondary={<>

                                    <Stack direction="row" spacing={0.5} alignItems="center">
                                        <TbLocation />
                                        <Typography variant="body2">Funil de Vendas</Typography>
                                        {/*<Typography variant="body2">{dado.meta}</Typography>*/}
                                    </Stack>

                                    <Stack direction="row" spacing={3} marginBottom={2}>
                                        <Typography variant="caption">#{historicos.length - index}</Typography>
                                        <Typography variant="caption">{dado.data_contato}</Typography>
                                    </Stack>

                                    <form onSubmit={submit}>
                                        <Stack direction="row" spacing={3} marginBottom={2}>
                                            <TextField label="Anotações" size="small" fullWidth onChange={e => setAnotacoes(e.target.value)} />
                                            <Button type="submit">Salvar</Button>
                                        </Stack>
                                    </form>
                                </>}
                            />
                        </ListItem>
                    </CardContainer>
                ))}
            </List>
            {historicos.length === 0 && <div className="row text-center">
                <span>Não há histórico de atendimentos.</span>
            </div>}
        </div>
    );
}
