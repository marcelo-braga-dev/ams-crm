import React from "react";
import {Stack, Typography} from "@mui/material";
import CardContainer from "@/Components/Cards/CardContainer.jsx";
import CardBody from "@/Components/Cards/CardBody.jsx";
import Avatar from "@mui/material/Avatar";

export default function TarefasParticipantes({dados}) {
    return (
        <div className="row row-cols-4">
            {dados.participantes.map(item => {
                return (
                    <div className="col">
                        <CardContainer>
                            <CardBody>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Avatar src={item.foto}/>
                                    <Stack spacing={0}>
                                        <Typography fontWeight="bold">{item.nome}</Typography>
                                    </Stack>
                                </Stack>
                            </CardBody>
                        </CardContainer>
                    </div>
                )
            })}
        </div>
    )
}
