import Layout from "@/Layouts/Layout";
import "chart.js/auto";
import TempoOnlineDiasUsuarios from "./Graficos/TempoOnlineDiasUsuarios";
import { MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";

const meses = [
    { id: 1, nome: 'Janeiro' },
    { id: 2, nome: 'Fevereiro' },
    { id: 3, nome: 'Março' },
    { id: 4, nome: 'Abril' },
    { id: 5, nome: 'Maio' },
    { id: 6, nome: 'Junho' },
    { id: 7, nome: 'Julho' },
    { id: 8, nome: 'Agosto' },
    { id: 9, nome: 'Setembro' },
    { id: 10, nome: 'Outubro' },
    { id: 11, nome: 'Novembro' },
    { id: 12, nome: 'Dezembro' },
]

export default function ({ tempoOnline }) {
    const[mesSelecionado, setMesSelecionado] = useState()

    useEffect(function () {

    }, [])

    return (
        <Layout>
            <div className="row mb-4">
                <div className="col-md-3">
                    <TextField label="Mês" select fullWidth
                        onChange={e => setMesSelecionado(e.target.value)}>
                        {meses.map(item => <MenuItem value={item.id}>{item.nome}</MenuItem>)}
                    </TextField>
                </div>
            </div>
            <TempoOnlineDiasUsuarios dados={tempoOnline} />
        </Layout>
    )
}
