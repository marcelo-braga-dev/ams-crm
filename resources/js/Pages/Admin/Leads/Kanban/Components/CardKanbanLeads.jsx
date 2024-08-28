import React, {useEffect, useState} from 'react';
import {Grid, Stack, Typography, Divider, Chip, Box} from "@mui/material";
import {Envelope, Person, PersonVideo2, Telephone, Whatsapp} from "react-bootstrap-icons";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import Modal from "@mui/material/Modal";
import AbrirChatWhatsapp from "@/Components/Chats/Whatsapp/AbrirChatWhatsapp.jsx";

const CardKanbanLeads = ({item: {razao_social, nome, cnpj, cpf, id, telefones}}) => {

    return (
        <CardContainer>
            <CardBody>
                <Grid container gap={1} marginBottom={1}>
                    <Grid item md={1}>
                        <Person size={18}/>
                    </Grid>
                    <Grid item md={10}>
                        <Stack>
                            <Typography fontWeight="bold">{razao_social || nome}</Typography>
                        </Stack>
                    </Grid>
                </Grid>

                {cnpj && (
                    <Grid container gap={1} alignItems="center">
                        <Grid item md={1}>
                            <PersonVideo2 size={18}/>
                        </Grid>
                        <Grid item md={10}>
                            <Stack>
                                <Typography>{cnpj}</Typography>
                                <Typography>{cpf}</Typography>
                            </Stack>
                        </Grid>
                    </Grid>
                )}

                <Stack marginTop={2}>
                    <Typography variant="body2">ID: #{id}</Typography>
                </Stack>

                <Divider sx={{marginTop: 2}}/>

                <Stack direction="row" spacing={2} marginTop={2}>
                    <AbrirChatWhatsapp/>
                    <Telephone cursor="pointer" size={18} color="blue"/>
                    <Envelope cursor="pointer" size={20} color="orange"/>
                </Stack>

                <Divider sx={{marginTop: 2}}/>

                <Stack direction="row" spacing={2} marginTop={2}>
                    <Typography variant="body2">Origem:</Typography>
                    <Chip label="Instagram" size="small" variant="outlined"/>
                </Stack>
            </CardBody>


        </CardContainer>
    );
};

export default CardKanbanLeads;
