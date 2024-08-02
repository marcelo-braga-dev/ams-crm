import * as React from "react";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import {router} from "@inertiajs/react";
import {Stack, Typography} from "@mui/material";

export default function HistoricoStatus({dados}) {
    return (
        <>
            {dados.map(item => <CardContainer>
                <CardBody>
                    <Stack spacing={1}>
                        <Typography>Status: {item.status}</Typography>
                        <Typography>Resp.: {item.nome}</Typography>
                        <Typography>Data: {item.data}</Typography>
                    </Stack>
                </CardBody>
            </CardContainer>)}
            {dados.length < 1 ? 'Não há histórico de Status' : ''}
        </>
    )
}
