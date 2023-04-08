import {Pie, Bar} from "react-chartjs-2";
import React from "react";

export default function QtdLeadsConsultor({dados}) {

    const data = {
        labels: [
            'Novo: ' + (dados.novo ?? 0),
            'Atendimento: ' + (dados.atendimento ?? 0),
            'Ativo: ' + (dados.ativo ?? 0),
            'Finalizado: ' + (dados.finalizado ?? 0)
        ],
        datasets: [
            {
                label: "Qtd.",
                data: [dados.novo, dados.atendimento, dados.ativo, dados.finalizado],
            }
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Quantidade de Leads do Consultor(a)',
            },
        },
    };

    return (
        <Bar options={options} data={data}/>
    )
}
