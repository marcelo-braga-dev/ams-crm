import React from "react";
import {Stack, Typography} from "@mui/material";
import Link from "@/Components/Link.jsx";

const Card = ({dados, btn}) => {
    return (
        <div className="row bg-white shadow p-1 m-1 mb-3" style={{width: 300}}>
            <Stack spacing={1} marginBottom={2}>
                <Typography fontWeight="bold">{dados.titulo}</Typography>
                <Typography variant="body2">{dados.descricao}</Typography>
            </Stack>

            <div className="row row-cols-2 mb-3">
                <div className="col">
                    <Typography variant="body2">Prioridade:</Typography>
                    {dados.prioridade === 'urgente' ? <span className="badge rounded-pill bg-danger">Urgente</span> : "Normal"}
                </div>
                <div className="col">
                    <Typography variant="body2">Setor:</Typography>
                    <Typography variant="body2">{dados.setor}</Typography>
                </div>
            </div>

            <div className="row row-cols-2">
                <div className="col">
                    <small className="d-block mb-3">
                        <b>Área:</b><br/>
                        {dados.area}
                    </small>
                </div>
                {dados.sequencia && <div className="col">
                    <small className="d-block mb-3">
                        <b>Sequência:</b><br/>
                        <span className="badge rounded-pill bg-primary text-dark text-white">
                                {dados.sequencia}
                            </span>
                    </small>
                </div>}
            </div>

            <div className="row row-cols-2">
                <div className="col">
                    <small className="d-block mb-3">
                        <b>Prazo Inicial:</b><br/>{dados.prazo_inicial}
                    </small>
                </div>
                {dados.prazo_final &&
                    <div className="col">
                        <small className="d-block mb-3">
                            <b>Prazo Final:</b><br/>{dados.prazo_final}
                        </small>
                    </div>}
            </div>

            <div className="col-12 text-center mb-3">
                {btn && <Link href={btn} label="Ver"/>}
            </div>
        </div>
    )
}
export default Card
