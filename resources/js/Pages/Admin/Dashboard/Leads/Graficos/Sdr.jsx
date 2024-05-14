import React from "react";
import {Pie, Bar} from "react-chartjs-2";

export default function Sdr({dados}) {

    const status = [
        'Iniciar Atendimento',
        'Pré Atendimento',
        'Em Aberto',
        'Em Atendimento',
        'Ativo',
        'Finalizado',
    ]
    const nome = dados.map(item => item.status)
    const qtd = dados.map(item => item.qtd)

    const data = {
        labels: status,
        datasets: [
            {
                label: "Qtd. Leads",
                data: qtd,
                backgroundColor: "#0c7a08",
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: false,
                text: '',
            },
        },
    };

    return (
        <Bar options={options} data={data}
             height={80}/>
    )
}
