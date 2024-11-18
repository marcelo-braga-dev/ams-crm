import * as React from "react";
import CardContainer from "@/Components/Cards/CardContainer";
import {IconButton, Stack, Typography} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import {BoxFill, Eye} from "react-bootstrap-icons";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import convertFloatToMoney from "@/Helpers/converterDataHorario.jsx";

export default function HistoricoPedidos({pedidos}) {
    console.log(pedidos)
    return (
        <div style={{maxHeight: 500, overflowY: 'auto', paddingInline: 20}}>
            <List>
                {pedidos.map((item) => (
                    <CardContainer>
                        <ListItem
                            secondaryAction={
                                <IconButton href={route('auth.pedidos.show', item.id)}>
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
                                secondary={<>
                                    <Typography variant="body2" fontWeight="bold">{item.consultor.nome}</Typography>

                                    <Stack direction="row" spacing={4}>
                                        <Typography variant="body2">#{item.id}</Typography>
                                        <Typography variant="body2">R$ {convertFloatToMoney(item.preco_venda)}</Typography>
                                    </Stack>
                                    <Typography variant="body2">{item.status_nome}</Typography>
                                    <Typography variant="body2" marginRight={2}>{item.pedido_data}</Typography>
                                </>}
                            />
                        </ListItem>
                    </CardContainer>
                ))}
            </List>

            {pedidos.length === 0 && <div className="row text-center">
                <Typography>Não há histórico de pedidos.</Typography>
            </div>}
        </div>
    )
}
