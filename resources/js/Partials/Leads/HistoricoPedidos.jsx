import * as React from "react";
import CardContainer from "@/Components/Cards/CardContainer";
import {IconButton, Stack, Typography} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import {BoxFill, Eye} from "react-bootstrap-icons";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";

export default function HistoricoPedidos({historicos}) {
    return (
        <div style={{maxHeight: 500, overflowY: 'auto', paddingInline: 20}}>
            <List>
                {historicos.map((item) => (
                    <CardContainer>
                        <ListItem
                            secondaryAction={
                                <IconButton href={route('admin.pedidos.show', item.id)}>
                                    <Eye/>
                                </IconButton>
                            }
                        >
                            <ListItemAvatar>
                                <Avatar sx={{bgcolor: '#cf0e0e'}}>
                                    <BoxFill/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                // primary={}
                                secondary={<>
                                    <Stack spacing={0} direction="row" justifyContent="space-between">
                                        <Typography variant="body2" fontWeight="bold">{item.consultor}</Typography>
                                        <Typography variant="body2" marginRight={2}>{item.data_criacao}</Typography>
                                    </Stack>
                                    <Stack direction="row" spacing={4}>
                                        <Typography variant="body2">#{item.id}</Typography>
                                        <Typography variant="body2">R$ {item.valor}</Typography>
                                    </Stack>
                                    <Typography variant="body2">{item.status}</Typography>
                                </>}
                            />
                        </ListItem>
                    </CardContainer>
                ))}
            </List>

            {historicos.length === 0 && <div className="row text-center">
                <span>Não há histórico de pedidos.</span>
            </div>}
        </div>
    )
}
