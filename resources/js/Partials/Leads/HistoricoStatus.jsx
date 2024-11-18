import * as React from 'react';
import CardContainer from '@/Components/Cards/CardContainer';
import { Stack, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { TagFill } from 'react-bootstrap-icons';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';

export default function HistoricoStatus({ historico }) {

    return (
        <div style={{ maxHeight: 500, overflowY: 'auto', paddingInline: 20 }}>
            <List>
                {historico.map((item) => (
                    <CardContainer key={item.id}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: '#eabe0b' }}>
                                    <TagFill />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={<Typography variant="body2" fontWeight="bold">{item?.status_nome}</Typography>}
                                secondary={
                                    <Stack spacing={0}>
                                        <Typography variant="body2">{item?.user?.nome}</Typography>
                                        {item.anotacao && <Typography variant="body2">{item.anotacao}</Typography>}
                                        <Typography variant="body2" marginRight={2}>{item.status_data}</Typography>
                                    </Stack>
                                }
                            />
                        </ListItem>
                    </CardContainer>
                ))}
            </List>

            {historico?.length === 0 && <div className="row text-center">
                <Typography>Não há histórico de status.</Typography>
            </div>}
        </div>
    );
}
