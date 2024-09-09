import * as React from "react";
import CardContainer from "@/Components/Cards/CardContainer";
import {Stack, Typography} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import {ChatFill, Person, TelephoneFill, Whatsapp} from "react-bootstrap-icons";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";

const tipoContato = {
    'Whatsapp': {icone: <Whatsapp/>, cor: 'green'},
    'Ligação Telefônica': {icone: <TelephoneFill/>, cor: 'blue'},
}

export default function HistoricoAtendimento({historicos}) {
    return (
        <div style={{maxHeight: 500, overflowY: 'auto', paddingInline: 20}}>
            <List>
                {historicos.map((dado, index) => (
                    dado.msg !== 'Pedido Emitido' && dado.msg &&
                    <CardContainer>
                        <ListItem
                            // secondaryAction={
                            //     <IconButton>
                            //         <Eye/>
                            //     </IconButton>
                            // }
                        >
                            <ListItemAvatar>
                                <Avatar sx={{bgcolor: tipoContato?.[dado.meio_contato]?.cor ?? 'orange'}}>
                                    {tipoContato?.[dado.meio_contato]?.icone ?? <ChatFill/>}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={<Typography variant="body2" fontWeight="bold">{dado.msg}</Typography>}
                                secondary={<>
                                    <Stack direction="row" spacing={0.5} alignItems="center">
                                        <Person/>
                                        <Typography variant="body2">{dado.nome}</Typography>
                                    </Stack>

                                    <Stack direction="row" spacing={3}>
                                        <Typography variant="caption">#{historicos.length - index}</Typography>
                                        <Typography variant="caption">{dado.data_criacao}</Typography>
                                        {/*<Typography variant="caption">{dado.meio_contato}</Typography>*/}
                                    </Stack>
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
    )
}
