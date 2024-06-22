import * as React from "react";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import {Typography} from "@mui/material";

export default function HistoricoAtendimento({historicos}) {
    return (
        <>
            {historicos.map((dado, index) => (
                <CardContainer>
                    <CardBody>
                        <div key={index} className="row">
                            <div className="col">
                                <Typography className="mb-2">{historicos.length - index}. {dado.status}</Typography>
                                <Typography><b>Autor:</b> {dado.nome}</Typography>
                                {dado.meio_contato && <Typography><b>Meio de Contato:</b> {dado.meio_contato}</Typography>}
                                {dado.msg && <Typography variant="body2"><b>Anotações:</b> {dado.msg}</Typography>}
                                <Typography className="small">Data: {dado.data_criacao}</Typography>
                            </div>
                        </div>
                    </CardBody>
                </CardContainer>
            ))}
            {historicos.length === 0 && <div className="row text-center">
                <span>Não há histórico de atendimentos.</span>
            </div>}
        </>
    )
}
